import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export function InputBox({label, placeholder, onChange, type = "text", autoFocus = false, isPassword = false}) {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;
    return <div>
      <div className="text-sm font-medium text-slate-300 py-2">
        {label}
      </div>
      <div className="relative">
        <input autoFocus={autoFocus} type={inputType} onChange={onChange} placeholder={placeholder} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 backdrop-blur-sm" />
        {isPassword && (
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
}