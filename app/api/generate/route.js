import { createClient } from "@supabase/supabase-js";

// Initialisation du client Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    // Extraction des données envoyées par le client
    const { topic } = await req.json();

    // Vérification des données reçues
    if (!topic || topic.trim() === "") {
      console.error("Erreur: Aucun topic reçu !");
      return new Response(JSON.stringify({ error: "Le champ 'topic' est requis." }), { status: 400 });
    }

    // DEBUG: Vérifier le contenu du topic
    console.log("DEBUG: Topic reçu =>", topic);

    // Insertion dans la base de données Supabase
    const { data, error } = await supabase
      .from("scripts")
      .insert([{ title: topic, content: "Script généré automatiquement." }]);

    // Gestion des erreurs Supabase
    if (error) {
      console.error("Erreur Supabase:", error);
      return new Response(JSON.stringify({ error: "Erreur Supabase : " + error.message }), { status: 500 });
    }

    // DEBUG: Vérifier la réponse de l'insertion
    console.log("DEBUG: Données insérées =>", data);

    // Retourner la réponse en JSON
    return new Response(JSON.stringify({ success: true, script: data }), { status: 200 });

  } catch (error) {
    console.error("Erreur serveur:", error);
    return new Response(JSON.stringify({ error: "Erreur interne du serveur." }), { status: 500 });
  }
}