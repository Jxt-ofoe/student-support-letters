import { useState, useEffect } from "react";
import { Letter } from "../types";
import LetterCard from "../components/LetterCard";
import { motion, AnimatePresence } from "motion/react";
import { RefreshCw, Loader2, HeartHandshake } from "lucide-react";

export default function Read() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLetters = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/letters/approved");
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.details || `Server responded with ${response.status}`);
      }
      const fetchedLetters = await response.json();
      
      if (fetchedLetters.length === 0) {
        setError("No letters found yet. Be the first to write one!");
      } else {
        // Shuffle letters
        setLetters(fetchedLetters.sort(() => Math.random() - 0.5));
        setCurrentIndex(0);
      }
    } catch (err) {
      console.error("Error fetching letters:", err);
      setError(`Unable to load letters: ${(err as Error).message}. Please ensure the server is running.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLetters();
  }, []);

  const nextLetter = () => {
    if (currentIndex < letters.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // If we reached the end, shuffle and start over
      setLetters(prev => [...prev].sort(() => Math.random() - 0.5));
      setCurrentIndex(0);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-blue-400 animate-spin mb-4" />
        <p className="text-slate-500 font-serif italic">Finding a message for you...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="w-16 h-16 bg-soft-lavender rounded-full flex items-center justify-center mb-6">
          <HeartHandshake className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-serif mb-4">{error}</h2>
        <button 
          onClick={fetchLetters}
          className="px-6 py-2 bg-white border border-slate-200 rounded-full hover:border-blue-300 transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 min-h-[70vh]">
      <div className="w-full max-w-xl mb-8">
        <h2 className="text-sm uppercase tracking-[0.2em] text-slate-400 font-bold text-center mb-12">
          A Message for You
        </h2>
        
        <AnimatePresence mode="wait">
          <div key={letters[currentIndex].id}>
            <LetterCard letter={letters[currentIndex]} />
          </div>
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={nextLetter}
        className="flex items-center gap-2 px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-medium hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm"
      >
        <RefreshCw className="w-4 h-4" />
        Show me another letter
      </motion.button>
      
      <p className="mt-12 text-xs text-slate-400 max-w-xs text-center leading-relaxed">
        These letters are written by students like you. They are moderated to ensure a safe environment.
      </p>
    </div>
  );
}
