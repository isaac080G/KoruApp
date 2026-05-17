// KoruApp/Functions/koru-ws-server/index.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const textToSpeech = require("@google-cloud/text-to-speech");
const WebSocket = require("ws");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// ─── Gemini ───────────────────────────────────────────────────────────────────

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite",
  systemInstruction:
    "Eres Koru, una inteligencia artificial dedicada al acompañamiento y bienestar emocional de personas que experimentan ansiedad, estrés o momentos difíciles. " +
    "REGLA DE ORO: Tus respuestas DEBEN SER MUY BREVES, concisas y directas (máximo 2 o 3 oraciones por intervención). Evita explayarte, dar explicaciones largas o usar listas de viñetas, ya que el usuario te está escuchando por voz. " +
    "PERSONALIDAD: SÉ empático, compasivo, calmado y mantén un tono de voz sumamente amigable y contenedor. Usa frases cortas que transmitan paz. " +
    "LIMITACIÓN MÉDICA OBLIGATORIA: No eres un psicólogo ni un terapeuta. Si el usuario expresa una crisis grave, ideación autolítica o un problema que requiera atención especializada, aclara de inmediato, con tacto pero de forma tajante, que eres una IA y que no suples a un profesional de la salud, instándolo a buscar ayuda profesional. " +
    "REDIRECCIÓN A HERRAMIENTAS: Cuando el usuario necesite relajarse, distraerse o canalizar su ansiedad, sugiérele de manera natural e integrada que visite la 'Sección de Actividades' de la aplicación, la cual cuenta con las siguientes categorías para apoyarle: (respiracion,cognitivas,grounding,mental_distraction,mindfulness,movement,sensory,visualization,writing).",
});

// ─── Google Cloud TTS ─────────────────────────────────────────────────────────

const ttsClient = new textToSpeech.TextToSpeechClient();

async function textToAudioBase64(text) {
  const [response] = await ttsClient.synthesizeSpeech({
    input: { text },
    voice: {
      languageCode: "es-US",
      name: "es-US-Journey-F", // voz natural en español
    },
    audioConfig: {
      audioEncoding: "MP3",
      speakingRate: 0.95, // ligeramente más lento, más calmado
    },
  });

  return response.audioContent.toString("base64");
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function safeSend(ws, payload) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(payload));
  }
}

// ─── Conexiones ────────────────────────────────────────────────────────────────

wss.on("connection", (ws, req) => {
  const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  console.log(`[WS] Cliente conectado: ${clientIp}`);

  const chat = model.startChat({ history: [] });
  let isProcessing = false;

  ws.on("pong", () => {});

  ws.on("message", async (raw) => {
    let payload;
    try {
      payload = JSON.parse(raw.toString());
    } catch {
      safeSend(ws, { type: "error", message: "Formato inválido." });
      return;
    }

    if (payload.type === "ping") {
      safeSend(ws, { type: "pong" });
      return;
    }

    if (payload.type !== "message" || !payload.content?.trim()) {
      safeSend(ws, { type: "error", message: "Mensaje vacío." });
      return;
    }

    if (isProcessing) {
      safeSend(ws, { type: "error", message: "Espera la respuesta anterior." });
      return;
    }

    isProcessing = true;
    console.log(`[WS] Procesando: "${payload.content.slice(0, 60)}"`);

    try {
      // Señal de que empezamos a procesar
      safeSend(ws, { type: "stream_start" });

      // 1. Gemini genera el texto
      const result = await chat.sendMessage(payload.content.trim());
      const textoGenerado = result.response.text();

      if (!textoGenerado) {
        throw new Error("Gemini no devolvió texto.");
      }

      console.log(`[WS] Texto generado: "${textoGenerado.slice(0, 80)}"`);

      // 2. Google TTS convierte el texto a audio
      const audioBase64 = await textToAudioBase64(textoGenerado);

      // 3. Enviamos texto + audio juntos al cliente
      safeSend(ws, {
        type: "koru_response",
        content: textoGenerado,
        audio: audioBase64,
      });

      safeSend(ws, { type: "stream_end" });
    } catch (error) {
      console.error("[WS] Error:", error.message);
      safeSend(ws, {
        type: "error",
        message: "Error procesando tu mensaje. Intenta de nuevo.",
      });
    } finally {
      isProcessing = false;
    }
  });

  ws.on("close", (code) => {
    console.log(`[WS] Cliente desconectado (código ${code})`);
  });

  ws.on("error", (err) => {
    console.error("[WS] Error de socket:", err.message);
  });
});

// Health check para Cloud Run
app.get("/health", (_, res) => res.status(200).send("OK"));

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`[Koru] Servidor escuchando en puerto ${PORT}`);
});
