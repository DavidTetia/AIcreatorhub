export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 dark:bg-black dark:text-white transition-colors duration-300">
      <header className="mb-10">
        <h1 className="text-5xl font-bold">AIcreatorhub</h1>
        <p className="text-xl mt-4">La création vidéo automatisée à portée de clic.</p>
      </header>
      <main>
        <button className="bg-black dark:bg-white dark:text-black text-white px-6 py-3 rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
          Générer ma première vidéo 🚀
        </button>
      </main>
    </div>
  );
}
