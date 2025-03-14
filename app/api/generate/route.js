import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

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
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Tu es un expert en création de scripts vidéo YouTube et TikTok." },
          { role: "user", content: `Écris un script vidéo optimisé sur : ${topic}` },
        ],
        max_tokens: 400,
      }),
    });

    const data = await response.json();
    const scriptContent = data.choices[0].message.content;

    // 📝 Sauvegarde dans Supabase
    const { error } = await supabase.from("scripts").insert([{ topic, content: scriptContent }]);

    if (error) {
      console.error("Erreur Supabase :", error);
      return NextResponse.json({ error: "Erreur lors de l'enregistrement du script" }, { status: 500 });
    }

    return NextResponse.json({ script: scriptContent });
  } catch (error) {
    console.error("Erreur serveur :", error);
    return NextResponse.json({ error: "Erreur serveur", details: error.message }, { status: 500 });
  }
}