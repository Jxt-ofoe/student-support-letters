import { motion } from "motion/react";
import { Heart, Info, ShieldCheck } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-soft-blue rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8 text-blue-600 fill-blue-600" />
          </div>
          <h1 className="text-4xl font-serif">About the Project</h1>
        </div>

        <section className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center gap-3 text-blue-600 mb-2">
            <Info className="w-5 h-5" />
            <h2 className="font-bold uppercase tracking-widest text-xs">Our Mission</h2>
          </div>
          
          <p className="text-lg text-slate-700 leading-relaxed font-serif italic">
            "Founded by a student of the University of Ghana. Independent initiative. Not officially affiliated with the University of Ghana. Not a replacement for professional counseling."
          </p>
          
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Student life can be incredibly rewarding, but it also comes with unique pressures and challenges. Sometimes, the most powerful thing we can hear is that we aren't alone in how we feel.
            </p>
            <p>
              This platform was created as a gentle, quiet space for students to support one another anonymously. Whether you're sharing a message of hope or looking for one, we're glad you're here.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-[2rem] bg-soft-lavender/20 border border-soft-lavender/30 space-y-4">
            <h3 className="font-serif text-xl">How it works</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Anyone can submit a letter. To keep this space safe and supportive, every submission is manually reviewed by a student moderator before it appears on the "Read" page.
            </p>
          </div>
          
          <div className="p-8 rounded-[2rem] bg-emerald-50 border border-emerald-100 space-y-4">
            <div className="flex items-center gap-2 text-emerald-700">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="font-serif text-xl">Privacy</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              We do not collect any personal data. Nicknames are optional, and letters are shared anonymously. Your safety and privacy are our priority.
            </p>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
