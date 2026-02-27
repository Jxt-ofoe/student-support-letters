import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full py-6 px-4 md:px-8 flex justify-between items-center max-w-5xl mx-auto">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-10 h-10 bg-soft-blue rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <Heart className="w-5 h-5 text-blue-600 fill-blue-600" />
        </div>
        <span className="font-serif italic text-xl font-medium">Supportive Letters</span>
      </Link>
      
      <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
        <Link to="/read" className="hover:text-blue-600 transition-colors">Read</Link>
        <Link to="/write" className="hover:text-blue-600 transition-colors">Write</Link>
        <Link to="/support" className="px-4 py-2 bg-white rounded-full border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm">
          Need Help?
        </Link>
      </div>
    </nav>
  );
}
