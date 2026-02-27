import { Phone, Mail, Globe, AlertTriangle, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";

export default function Support() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-serif mb-4">You are not alone.</h1>
        <p className="text-slate-500 max-w-xl mx-auto">
          If you're going through a difficult time, please reach out to these professional resources. There is always someone ready to listen.
        </p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* Emergency Section */}
        <motion.section variants={item} className="p-8 rounded-[2.5rem] bg-red-50 border border-red-100 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center shadow-sm shrink-0">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-serif text-red-900">Immediate Danger?</h2>
            <p className="text-red-800 leading-relaxed">
              If you are in immediate danger or thinking about hurting yourself, please contact your local emergency number right now.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="px-4 py-2 bg-white rounded-full text-red-600 font-bold text-sm border border-red-100">
                Ghana Emergency: 112 / 191
              </div>
              <div className="px-4 py-2 bg-white rounded-full text-red-600 font-bold text-sm border border-red-100">
                UK: 999
              </div>
              <div className="px-4 py-2 bg-white rounded-full text-red-600 font-bold text-sm border border-red-100">
                US: 911
              </div>
            </div>
          </div>
        </motion.section>

        {/* University Section */}
        <motion.section variants={item} className="p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-soft-blue rounded-2xl flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-serif">University of Ghana Resources</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1">Counseling Center</h4>
                  <p className="text-slate-600">+233 (0) 24 594 5752</p>
                  <p className="text-slate-600">+233 (0) 20 499 9221</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1">Email Support</h4>
                  <p className="text-slate-600">careers@ug.edu.gh</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-soft-blue/20 rounded-3xl border border-soft-blue/30">
              <p className="text-sm text-blue-900 leading-relaxed italic">
                "The University Counseling Center provides a safe and confidential environment for students to discuss personal, academic, or social concerns."
              </p>
            </div>
          </div>
        </motion.section>

        {/* International Section */}
        <motion.section variants={item} className="p-8 rounded-[2.5rem] bg-soft-lavender/30 border border-soft-lavender/50">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-serif">International Students</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-slate-600 leading-relaxed">
              If you are studying from outside Ghana, please search for mental health crisis hotlines in your specific country. Most countries have 24/7 free support lines.
            </p>
            <div className="flex items-center gap-2 text-purple-700 font-medium">
              <span className="text-sm">Search: "mental health crisis hotline + [your country]"</span>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
