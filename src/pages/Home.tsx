import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-12 md:py-24 px-4 text-center max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-8"
      >
        <h1 className="text-4xl md:text-6xl font-serif font-medium leading-tight text-slate-900">
          If today feels heavy, read a letter from <span className="italic text-blue-600">someone who understands.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          A quiet space for students to share hope and find comfort through anonymous letters of support.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/read"
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-full font-medium shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group"
          >
            <BookOpen className="w-5 h-5" />
            Read a Letter
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            to="/write"
            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-medium hover:border-blue-300 hover:text-blue-600 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Write a Letter
          </Link>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
      >
        <div className="p-6 rounded-3xl bg-white/50 border border-white/20 backdrop-blur-sm">
          <div className="w-10 h-10 bg-soft-blue rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <span className="text-blue-600 font-bold">01</span>
          </div>
          <h3 className="font-medium mb-2">Anonymous</h3>
          <p className="text-sm text-slate-500">Share your thoughts without revealing your identity.</p>
        </div>
        
        <div className="p-6 rounded-3xl bg-white/50 border border-white/20 backdrop-blur-sm">
          <div className="w-10 h-10 bg-soft-lavender rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <span className="text-purple-600 font-bold">02</span>
          </div>
          <h3 className="font-medium mb-2">Moderated</h3>
          <p className="text-sm text-slate-500">Every letter is reviewed to ensure a safe, supportive space.</p>
        </div>
        
        <div className="p-6 rounded-3xl bg-white/50 border border-white/20 backdrop-blur-sm">
          <div className="w-10 h-10 bg-emerald-50 rounded-2xl flex items-center justify-center mb-4 mx-auto">
            <span className="text-emerald-600 font-bold">03</span>
          </div>
          <h3 className="font-medium mb-2">Global</h3>
          <p className="text-sm text-slate-500">Connecting students from University of Ghana to the world.</p>
        </div>
      </motion.div>
    </div>
  );
}
