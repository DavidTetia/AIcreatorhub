"use client";

import { useState } from "react";

export default function Home() {
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateScript() {
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: "Comment réussir sur YouTube en 2024 ?" }),
    });

    const data = await response.json();
    setScript(data.script);
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 dark:bg-black dark:text-white transition-colors duration-300">
      <header className="mb-10">
        <h1 className="text-5xl font-bold">AIcreatorhub</h1>
        <p className="text-xl mt-4">La création vidéo automatisée à portée de clic.</p>
      </header>
      <main>
        <button
          onClick={generateScript}
          className="bg-black dark:bg-white dark:text-black text-white px-6 py-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
        >
          {loading ? "Génération en cours..." : "Générer ma première vidéo 🚀"}
        </button>
        {script && (
          <div className="mt-6 p-4 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold">Script généré :</h2>
            <p className="mt-2">{script}</p>
          </div>
        )}
      </main>
    </div>
  );
}