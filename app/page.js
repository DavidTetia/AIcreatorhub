"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);

  const generateScript = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setScript("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      if (data.script) {
        setScript(data.script);
      } else {
        setScript("❌ Une erreur s'est produite lors de la génération du script.");
      }
    } catch (error) {
      setScript("❌ Erreur serveur, réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <header className="mb-10">
        <h1 className="text-5xl font-bold">AIcreatorhub</h1>
        <p className="text-xl mt-4">
          Génère des scripts vidéo optimisés pour YouTube et TikTok en un clic 🚀
        </p>
      </header>

      <main className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Saisis ton sujet vidéo..."
          className="px-6 py-2 border border-gray-300 rounded-lg mb-4 w-80 text-center"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button
          onClick={generateScript}
          className="bg-black text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition duration-200"
          disabled={loading}
        >
          {loading ? "Génération en cours..." : "🎬 Générer mon script vidéo"}
        </button>

        {script && (
          <div className="mt-8 p-4 max-w-2xl bg-white shadow-md rounded-xl whitespace-pre-wrap">
            {script}
          </div>
        )}

        {/* 🔹 Bouton pour voir les scripts sauvegardés */}
        <Link href="/myscripts">
          <button className="mt-6 bg-gray-800 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition">
            📜 Voir mes scripts sauvegardés
          </button>
        </Link>
      </main>
    </div>
  );
}