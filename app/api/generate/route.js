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
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Tu es un expert en création de scripts optimisés pour YouTube et TikTok. Génère un script complet et structuré, accrocheur et prêt à tourner.",
          },
          {
            role: "user",
            content: `Écris un script vidéo optimisé pour YouTube et TikTok sur le sujet suivant : ${topic}`,
          },
        ],
        max_tokens: 400,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erreur OpenAI:", data);
      return NextResponse.json({ error: "Erreur API OpenAI", details: data }, { status: 500 });
    }

    return NextResponse.json({ script: data.choices[0].message.content });
  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json({ error: "Erreur serveur", details: error.message }, { status: 500 });
  }
}