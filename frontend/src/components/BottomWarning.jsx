import { Link } from "react-router-dom"

export function BottomWarning({label, buttonText, to}) {
    return <div className="py-4 text-sm flex justify-center text-slate-400">
      <div>
        {label}
      </div>
      <Link className="pointer pl-1 cursor-pointer text-indigo-400 hover:text-indigo-300 font-medium hover:underline transition-colors" to={to}>
        {buttonText}
      </Link>
    </div>
}