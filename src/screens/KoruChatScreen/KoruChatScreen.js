// KoruApp/screens/KoruChat/KoruChatScreen.js
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./KoruChatScreen.styles";

// ─── Constantes ────────────────────────────────────────────────────────────────

const WS_URL = "wss://koru-ws-server-79285172899.us-central1.run.app"; // ← tu URL de Cloud Run
const RECONNECT_DELAY_MS = 3000;
const MAX_RECONNECT_ATTEMPTS = 5;
const HEARTBEAT_INTERVAL_MS = 25_000;

const STATUS_LABELS = {
  idle: "Toca para hablar",
  listening: "Escuchando...",
  processing: "Procesando...",
  speaking: "Koru está hablando...",
};

const genId = () => Math.random().toString(36).slice(2, 9);

// ─── Componente ────────────────────────────────────────────────────────────────

export function KoruChatScreen() {
  const [appState, setAppState] = useState("idle");
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("connecting");

  // Animaciones
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseOpacity = useRef(new Animated.Value(0.6)).current;
  const pulseLoopRef = useRef(null);

  // WebSocket
  const wsRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimerRef = useRef(null);
  const heartbeatRef = useRef(null);
  const streamingIdRef = useRef(null);
  const isMountedRef = useRef(true);

  // ScrollView
  const scrollRef = useRef(null);

  // ── Animaciones ─────────────────────────────────────────────────────────────

  const startPulsing = useCallback(
    (fast = false) => {
      pulseLoopRef.current?.stop();
      const duration = fast ? 500 : 800;
      pulseLoopRef.current = Animated.loop(
        Animated.sequence([
          Animated.parallel([
            Animated.timing(pulseAnim, {
              toValue: 1.22,
              duration,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(pulseOpacity, {
              toValue: 1,
              duration,
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(pulseOpacity, {
              toValue: 0.6,
              duration,
              useNativeDriver: true,
            }),
          ]),
        ]),
      );
      pulseLoopRef.current.start();
    },
    [pulseAnim, pulseOpacity],
  );

  const stopPulsing = useCallback(() => {
    pulseLoopRef.current?.stop();
    Animated.parallel([
      Animated.spring(pulseAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(pulseOpacity, {
        toValue: 0.6,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [pulseAnim, pulseOpacity]);

  // ── WebSocket ───────────────────────────────────────────────────────────────

  const clearHeartbeat = useCallback(() => {
    if (heartbeatRef.current) {
      clearInterval(heartbeatRef.current);
      heartbeatRef.current = null;
    }
  }, []);

  const clearReconnectTimer = useCallback(() => {
    if (reconnectTimerRef.current) {
      clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = null;
    }
  }, []);

  const connectWebSocket = useCallback(() => {
    if (!isMountedRef.current) return;

    clearReconnectTimer();
    setConnectionStatus("connecting");

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      if (!isMountedRef.current) return;
      reconnectAttemptsRef.current = 0;
      setConnectionStatus("connected");

      heartbeatRef.current = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: "ping" }));
        }
      }, HEARTBEAT_INTERVAL_MS);
    };

    ws.onmessage = async (event) => {
      if (!isMountedRef.current) return;
      let payload;
      try {
        payload = JSON.parse(event.data);
      } catch {
        return;
      }

      switch (payload.type) {
        case "stream_start": {
          setAppState("processing");
          startPulsing(true);
          break;
        }

        case "koru_response": {
          const newId = genId();
          const textoCompleto = payload.content;

          setMessages((prev) => [
            ...prev,
            { id: newId, role: "assistant", text: "", isStreaming: true },
          ]);

          setAppState("speaking");

          let index = 0;
          const intervaloEscritura = setInterval(() => {
            if (index < textoCompleto.length) {
              const letra = textoCompleto[index];
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === newId ? { ...msg, text: msg.text + letra } : msg,
                ),
              );
              index++;
              scrollRef.current?.scrollToEnd({ animated: true });
            } else {
              clearInterval(intervaloEscritura);
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === newId ? { ...msg, isStreaming: false } : msg,
                ),
              );
            }
          }, 30);

          try {
            const { sound } = await Audio.Sound.createAsync(
              { uri: `data:audio/mp3;base64,${payload.audio}` },
              { shouldPlay: true },
            );

            sound.setOnPlaybackStatusUpdate((status) => {
              if (status.didJustFinish) {
                sound.unloadAsync();
                setAppState("idle");
                stopPulsing();
              }
            });
          } catch (audioError) {
            console.warn("Error al reproducir audio:", audioError);
            setAppState("idle");
            stopPulsing();
          }
          break;
        }

        case "error": {
          setAppState("idle");
          stopPulsing();
          setMessages((prev) => [
            ...prev,
            {
              id: genId(),
              role: "assistant",
              text: payload.message ?? "Ocurrió un error. Intenta de nuevo.",
              isStreaming: false,
            },
          ]);
          break;
        }

        default:
          break;
      }
    };

    ws.onerror = () => {
      if (!isMountedRef.current) return;
      setConnectionStatus("error");
    };

    ws.onclose = (e) => {
      if (!isMountedRef.current) return;
      clearHeartbeat();

      if (streamingIdRef.current) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === streamingIdRef.current
              ? { ...msg, isStreaming: false }
              : msg,
          ),
        );
        streamingIdRef.current = null;
      }

      setAppState("idle");
      stopPulsing();

      if (
        e.code !== 1000 &&
        reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS
      ) {
        reconnectAttemptsRef.current += 1;
        const delay = RECONNECT_DELAY_MS * reconnectAttemptsRef.current;
        setConnectionStatus("connecting");
        reconnectTimerRef.current = setTimeout(connectWebSocket, delay);
      } else {
        setConnectionStatus("disconnected");
      }
    };
  }, [clearReconnectTimer, clearHeartbeat, startPulsing, stopPulsing]);

  // ── Enviar mensaje al servidor ──────────────────────────────────────────────

  const sendUserMessage = useCallback(
    (transcribedText) => {
      if (!transcribedText?.trim()) return;
      if (wsRef.current?.readyState !== WebSocket.OPEN) return;

      streamingIdRef.current = null;

      setMessages((prev) => [
        ...prev,
        {
          id: genId(),
          role: "user",
          text: transcribedText.trim(),
          isStreaming: false,
        },
      ]);

      setAppState("processing");
      stopPulsing();

      wsRef.current.send(
        JSON.stringify({ type: "message", content: transcribedText.trim() }),
      );
    },
    [stopPulsing],
  );

  // ── Eventos STT (expo-speech-recognition) ───────────────────────────────────

  // Resultado final → mandar al WebSocket
  useSpeechRecognitionEvent("result", (event) => {
    if (event.isFinal && event.results?.[0]?.transcript) {
      sendUserMessage(event.results[0].transcript);
    }
  });

  useSpeechRecognitionEvent("end", () => {
    if (isMountedRef.current) {
      setAppState((prev) => (prev === "listening" ? "idle" : prev));
      stopPulsing();
    }
  });

  useSpeechRecognitionEvent("error", (event) => {
    console.warn("[STT] Error:", event.error);
    if (isMountedRef.current) {
      setAppState("idle");
      stopPulsing();
    }
  });

  // ── Toggle micrófono ────────────────────────────────────────────────────────

  const toggleListening = useCallback(() => {
    if (appState === "speaking" || appState === "processing") return;

    if (appState !== "listening") {
      setAppState("listening");
      startPulsing(false);
      ExpoSpeechRecognitionModule.start({
        lang: "es-MX",
        interimResults: false,
      });
    } else {
      setAppState("idle");
      stopPulsing();
      ExpoSpeechRecognitionModule.stop();
    }
  }, [appState, startPulsing, stopPulsing]);

  // ── Ciclo de vida ───────────────────────────────────────────────────────────

  useEffect(() => {
    isMountedRef.current = true;
    connectWebSocket();

    return () => {
      isMountedRef.current = false;
      clearReconnectTimer();
      clearHeartbeat();
      ExpoSpeechRecognitionModule.stop();
      wsRef.current?.close(1000, "Componente desmontado");
    };
  }, []);

  // ── Render ──────────────────────────────────────────────────────────────────

  const isButtonDisabled =
    appState === "processing" ||
    appState === "speaking" ||
    connectionStatus !== "connected";

  return (
    <View style={styles.container}>
      {/* Indicador de conexión */}
      <View style={styles.connectionBadge}>
        <View
          style={[
            styles.connectionDot,
            connectionStatus === "connected"
              ? styles.dotConnected
              : connectionStatus === "error"
                ? styles.dotError
                : styles.dotConnecting,
          ]}
        />
        <Text style={styles.connectionLabel}>
          {connectionStatus === "connected"
            ? "Conectado"
            : connectionStatus === "connecting"
              ? "Conectando..."
              : connectionStatus === "error"
                ? "Error de conexión"
                : "Desconectado"}
        </Text>
      </View>
      {/* Logo animado */}
      <View style={styles.centerContainer}>
        <Animated.Image
          source={require("../../../assets/images/koruApp for navigation.png")}
          style={[
            styles.mainLogoAnimated,
            {
              transform: [{ scale: pulseAnim }],
              opacity: pulseOpacity,
            },
          ]}
        />
        <Text style={styles.statusText}>{STATUS_LABELS[appState]}</Text>
      </View>

      {/* Mensajes */}
      {messages.length > 0 && (
        <ScrollView
          ref={scrollRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.role === "user"
                  ? styles.bubbleUser
                  : styles.bubbleAssistant,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  msg.role === "user"
                    ? styles.messageTextUser
                    : styles.messageTextAssistant,
                ]}
              >
                {msg.text}
                {msg.isStreaming && (
                  <Text style={styles.streamingCursor}>▋</Text>
                )}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Botón micrófono */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[
            styles.micButton,
            appState === "listening" && styles.micButtonActive,
            isButtonDisabled && styles.micButtonDisabled,
          ]}
          onPress={toggleListening}
          disabled={isButtonDisabled}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons
            name={
              appState === "listening"
                ? "microphone"
                : appState === "processing"
                  ? "loading"
                  : appState === "speaking"
                    ? "waveform"
                    : "microphone-outline"
            }
            size={40}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
