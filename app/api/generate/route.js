import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const { topic } = await req.json();
    if (!topic) return NextResponse.json({ error: "Topic manquant." }, { status: 400 });

    // Génération du script avec OpenAI
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "system", content: "Génère un script vidéo." }, { role: "user", content: topic }],
        max_tokens: 200,
      }),
    });

    const openaiData = await openaiResponse.json();
    const script = openaiData.choices[0]?.message?.content || "Erreur lors de la génération.";

    // Sauvegarde dans Supabase
    const { data, error } = await supabase
      .from("scripts")
      .insert([{ title: topic, content: script }]);

    if (error) throw error;

    return NextResponse.json({ script });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}