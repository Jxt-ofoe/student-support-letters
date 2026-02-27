import { useState, useEffect, FormEvent } from "react";
import { Letter } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Check, Trash2, Loader2, Lock, Unlock, Eye } from "lucide-react";

export default function Admin() {
  const [pendingLetters, setPendingLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [totalVisits, setTotalVisits] = useState(0);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats");
      if (!response.ok) throw new Error("Failed to fetch stats");
      const data = await response.json();
      setTotalVisits(data.totalVisits);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const fetchPending = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/pending");
      if (!response.ok) throw new Error("Failed to fetch");
      const fetched = await response.json();
      setPendingLetters(fetched);
    } catch (err) {
      console.error("Error fetching pending letters:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      fetchPending();
      fetchStats();
    }
  }, [isAuthorized]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthorized(true);
      setError(null);
    } else {
      setError("Incorrect password.");
    }
  };

  const approveLetter = async (letter: Letter) => {
    try {
      const response = await fetch(`/api/admin/approve/${letter.id}`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to approve");
      
      setPendingLetters(prev => prev.filter(l => l.id !== letter.id));
    } catch (err) {
      console.error("Error approving letter:", err);
    }
  };

  const deleteLetter = async (id: string) => {
    if (!confirm("Are you sure you want to delete this letter?")) return;
    try {
      const response = await fetch(`/api/admin/pending/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete");
      
      setPendingLetters(prev => prev.filter(l => l.id !== id));
    } catch (err) {
      console.error("Error deleting letter:", err);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto py-24 px-4">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-slate-400" />
          </div>
          <h1 className="text-2xl font-serif mb-6">Moderator Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-6 py-3 rounded-full bg-slate-50 border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all text-center"
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-slate-800 text-white rounded-full font-medium hover:bg-slate-900 transition-all"
            >
              Unlock Dashboard
            </button>
          </form>
          <p className="mt-6 text-[10px] text-slate-400 uppercase tracking-widest">
            Demo password: admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-serif">Moderation Queue</h1>
          <p className="text-slate-500 text-sm">Review pending letters before they go public.</p>
        </div>
        <button 
          onClick={() => setIsAuthorized(false)}
          className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest"
        >
          <Unlock className="w-4 h-4" />
          Lock Dashboard
        </button>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-3xl border border-blue-200 shadow-sm mb-8">
        <div className="flex items-center gap-3">
          <Eye className="w-6 h-6 text-blue-600" />
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">Total App Visits</p>
            <p className="text-4xl font-serif text-blue-900">{totalVisits}</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        </div>
      ) : pendingLetters.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-[2.5rem] border border-dashed border-slate-200">
          <p className="text-slate-400 font-serif italic">No pending letters to review.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {pendingLetters.map((letter) => (
              <motion.div
                key={letter.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col"
              >
                <div className="flex-1 mb-6">
                  <p className="text-slate-700 font-serif italic leading-relaxed">
                    "{letter.letterText}"
                  </p>
                  <p className="mt-4 text-xs text-slate-400">
                    By: {letter.nickname}
                  </p>
                </div>
                
                <div className="flex gap-3 pt-4 border-t border-slate-50">
                  <button
                    onClick={() => approveLetter(letter)}
                    className="flex-1 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => deleteLetter(letter.id)}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-100 transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
