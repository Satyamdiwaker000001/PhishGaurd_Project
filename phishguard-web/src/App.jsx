import React from 'react'
import './App.css'

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-4xl font-bold text-brand-success mb-4">
        PhishGuard Web Dashboard
      </h1>
      <p className="text-slate-400 bg-slate-800 p-4 rounded-lg border border-slate-700">
        Tailwind CSS v3 is successfully integrated! 🚀
      </p>
      <button className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-full font-semibold transition">
        Simulate Phishing Alert
      </button>
    </div>
  )
}

export default App