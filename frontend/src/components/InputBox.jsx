export function InputBox({label, placeholder, onChange, type = "text", autoFocus = false}) {
    return <div>
      <div className="text-sm font-medium text-slate-300 py-2">
        {label}
      </div>
      <input autoFocus={autoFocus} type={type} onChange={onChange} placeholder={placeholder} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-200 backdrop-blur-sm" />
    </div>
}