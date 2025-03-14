import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const { topic } = await req.json();

    if (!topic || topic.trim() === "") {
      console.error("❌ Erreur: Aucun topic reçu !");
      return new Response(JSON.stringify({ error: "Le champ 'topic' est requis." }), { status: 400 });
    }

    console.log("✅ DEBUG: Topic reçu =>", topic);

    // Génération du script avec OpenAI (GPT-4o)
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Tu es un assistant pour la création de scripts vidéo." },
          { role: "user", content: `Génère un script vidéo pour le sujet suivant : ${topic}` }
        ],
        max_tokens: 150
      })
    });

    const aiData = await openaiResponse.json();
    console.log("✅ DEBUG: Réponse OpenAI =>", aiData);

    if (!aiData.choices || !aiData.choices[0]?.message?.content) {
      console.error("❌ Erreur OpenAI: Aucun script généré !");
      return new Response(JSON.stringify({ error: "Erreur OpenAI : Aucun script généré." }), { status: 500 });
    }

    const scriptContent = aiData.choices[0].message.content;

    // Sauvegarde dans Supabase
    const { data, error } = await supabase
      .from("scripts")
      .insert([{ title: topic, content: scriptContent }]);

    if (error) {
      console.error("❌ Erreur Supabase:", error);
      return new Response(JSON.stringify({ error: "Erreur Supabase : " + error.message }), { status: 500 });
    }

    console.log("✅ DEBUG: Données insérées dans Supabase =>", data);

    return new Response(JSON.stringify({ success: true, script: scriptContent }), { status: 200 });

  } catch (error) {
    console.error("❌ Erreur serveur:", error);
    return new Response(JSON.stringify({ error: "Erreur interne du serveur." }), { status: 500 });
  }
}