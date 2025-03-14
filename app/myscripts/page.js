"use client";
import { useEffect, useState } from "react";

export default function MyScripts() {
  const [scripts, setScripts] = useState([]);

  useEffect(() => {
    const fetchScripts = async () => {
      try {
        const response = await fetch("/api/myscripts");
        const data = await response.json();
        setScripts(data);
      } catch (error) {
        console.error("Erreur lors du chargement des scripts :", error);
      }
    };

    fetchScripts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 dark:bg-black dark:text-white">
      <h1 className="text-4xl font-bold">📂 Mes Scripts Sauvegardés</h1>
      <ul className="mt-4">
        {scripts.length > 0 ? (
          scripts.map((script) => (
            <li key={script.id} className="border p-2 my-2 rounded-md w-80">
              <h2 className="font-bold">{script.title}</h2>
              <p className="text-gray-600">{script.content}</p>
              <p className="text-sm text-gray-400">🕒 {script.created_at}</p>
            </li>
          ))
        ) : (
          <p>Aucun script sauvegardé.</p>
        )}
      </ul>
    </div>
  );
}