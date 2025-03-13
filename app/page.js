"use client";
import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);

  const generateScript = async () => {
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });

    const data = await response.json();
    setScript(data.script);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <header className="mb-10">
        <h1 className="text-5xl font-bold">AIcreatorhub</h1>
        <p className="text-xl mt-4">
          Génère rapidement tes scripts vidéo pour YouTube et TikTok 🚀
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
          className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition duration-200"
        >
          {loading ? "Génération en cours..." : "Générer mon script vidéo 🚀"}
        </button>

        {script && (
          <div className="mt-8 p-4 max-w-2xl bg-white shadow-md rounded-xl whitespace-pre-wrap">
            {script}
          </div>
        )}
      </header>
    </div>
  );
}