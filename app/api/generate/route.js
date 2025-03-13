import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { topic } = await req.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [{ role: "system", content: `Tu es un expert en création de scripts vidéo YouTube.` },
                   { role: "user", content: `Génère un script vidéo optimisé pour YouTube sur le sujet suivant : ${topic}` }],
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    return NextResponse.json({ script: data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la génération du script" }, { status: 500 });
  }
}
