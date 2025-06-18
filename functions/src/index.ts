import * as functions from "firebase-functions";
import fetch from "node-fetch";

const OPENAI_API_KEY = functions.config().openai.key;

export const diagnoseSymptoms = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Only POST requests are allowed.");
    return;
  }

  const { symptoms } = req.body;

  if (!symptoms) {
    res.status(400).send("Symptoms are required.");
    return;
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "أنت مساعد طبي ذكي مخصص لمحافظة الدقهلية. بناءً على الأعراض، اقترح التخصص الطبي المناسب وأقرب وحدة صحية عامة داخل المحافظة.",
          },
          {
            role: "user",
            content: symptoms,
          },
        ],
        temperature: 0.5,
      }),
    });

const data = await response.json() as {
  choices: { message: { content: string } }[];
};

const result = data.choices?.[0]?.message?.content;


    res.status(200).json({ diagnosis: result });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
