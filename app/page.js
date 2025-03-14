"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateScript = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setScript("");
    setError("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      if (response.ok) {
        setScript(data.script);
      } else {
        setError("❌ Une erreur s'est produite lors de la génération du script.");
      }
    } catch (error) {
      setError("❌ Erreur serveur, réessayez plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 dark:bg-black dark:text-white">
      <header className="mb-10">
        <h1 className="text-5xl font-bold">AIcreatorhub</h1>
        <p className="text-xl mt-4">
          Génère des scripts vidéo optimisés pour YouTube et TikTok en un clic 🚀
        </p>
      </header>

      <main className="flex flex-col items-center gap-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Sujet de la vidéo..."
          className="p-2 border rounded-md text-black w-80"
        />
        <button
          onClick={generateScript}
          className="bg-black dark:bg-white dark:text-black text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg"
          disabled={loading}
        >
          {loading ? "⏳ Génération en cours..." : "🎬 Générer mon script vidéo"}
        </button>

        {error && <p className="text-red-500">{error}</p>}
        {script && (
          <div className="bg-gray-100 p-4 rounded-md mt-4 text-black w-80">
            <h2 className="font-bold">📜 Script généré :</h2>
            <p>{script}</p>
          </div>
        )}

        <Link href="/myscripts">
          <button className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded-md">
            📂 Voir mes scripts sauvegardés
          </button>
        </Link>
      </main>
    </div>
  );
}