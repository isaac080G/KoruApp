/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const { setGlobalOptions } = require("firebase-functions/v2");
const admin = require("firebase-admin");
const { GoogleGenAI } = require("@google/genai");

const GEMINI_API_KEY = defineSecret("GEMINI_API_KEY");

admin.initializeApp();
setGlobalOptions({ maxInstances: 10 });

exports.obtenerPrediccion = onRequest(
  { cors: true, secrets: [GEMINI_API_KEY] },
  async (req, res) => {
    // ✅ Solo una vez, usando la API key
    const ai = new GoogleGenAI({
      apiKey: GEMINI_API_KEY.value(),
    });

    const userId = req.query.userId;
    if (!userId) {
      res.status(400).send("Falta el ID del usuario");
      return;
    }

    try {
      const snapshot = await admin
        .firestore()
        .collection("usuarios")
        .doc(userId)
        .collection("DailyReports")
        .orderBy("createdAt", "desc")
        .limit(20)
        .get();

      let datosParaIA = "";
      snapshot.forEach((doc) => {
        datosParaIA += JSON.stringify(doc.data()) + " "; // ✅ JSON.stringify en lugar de .texto
      });

      const prompt = `Actúa como un analista experto en bienestar emocional. 
Tienes acceso al HISTÓRICO de los últimos 10 a 20 días de registros del usuario: "${datosParaIA}".

Tu tarea es:
1. Analizar la tendencia emocional a lo largo de este periodo.
2. Predecir la probabilidad (0% a 100%) de que el usuario sufra un pico de ansiedad en las próximas 24 horas.
3. Determinar el nivel de riesgo actual (Bajo, Medio, Alto).

Responde exclusivamente en este formato JSON sin markdown ni backticks:
{
  "analisis_tendencia": "Breve resumen de los últimos 20 días",
  "probabilidad_ataque": "X%",
  "nivel_riesgo": "...",
  "recomendacion_preventiva": "..."
}`;
      //const models = await ai.models.list();
      //console.log("Available models:", models);

      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const responseIA = result.text;
      const jsonLimpio = responseIA.replace(/```json|```/g, "").trim();
      const dataFinal = JSON.parse(jsonLimpio);
      res.status(200).json(dataFinal);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error en el servidor: " + error.message);
    }
  },
);

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
