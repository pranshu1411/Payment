import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { ShieldCheck, Zap, Globe, ArrowRight } from "lucide-react";
import logo from '../assets/payme-logo.png';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 font-sans selection:bg-indigo-500/30 relative">
      {/* Ambient background lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600/20 blur-[120px]"></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-slate-900/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <img src={logo} alt="PayMe Logo" className="h-10 w-10 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
            <span className="text-2xl font-black tracking-tight text-white">PayMe</span>
          </div>
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => navigate('/signin')}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors focus:outline-none cursor-pointer"
            >
              Sign In
            </button>
            <div className="w-32">
              <Button onClick={() => navigate('/signup')} label="Get Started" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32 sm:pt-32 sm:pb-40 text-center flex flex-col items-center">
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-10 backdrop-blur-md shadow-lg">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-sm font-medium text-slate-300">Next-gen payments are here</span>
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white mb-8 max-w-4xl leading-[1.1]">
          The future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400 drop-shadow-sm">seamless transfers</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
          Send money instantly, securely, and with zero hassle. Join thousands of users who trust PayMe for their everyday transactions.
        </p>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-md justify-center">
          <div className="w-full sm:w-56">
            <Button 
                onClick={() => navigate('/signup')} 
                label={
                    <div className="flex items-center justify-center space-x-2">
                        <span className="font-bold text-base">Open Account</span>
                        <ArrowRight className="w-5 h-5" />
                    </div>
                } 
            />
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/30 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <Zap className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
            <p className="text-slate-400 leading-relaxed text-lg">
              Experience instant transfers. Your money reaches its destination before you can even blink.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl">
            <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-8 border border-indigo-500/30 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <ShieldCheck className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Bank-grade Security</h3>
            <p className="text-slate-400 leading-relaxed text-lg">
              Your funds and personal data are protected by industry-leading encryption and security protocols.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/30 group-hover:scale-110 transition-transform duration-300 shadow-inner">
              <Globe className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Zero Fees</h3>
            <p className="text-slate-400 leading-relaxed text-lg">
              Send money to anyone on the platform absolutely free. No hidden charges, ever.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-10 text-center bg-black/20">
        <p className="text-slate-500 text-sm font-medium">© 2026 PayMe Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};
