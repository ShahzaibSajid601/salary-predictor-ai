'use client'
import { useState } from 'react';

export default function Home() {
  const [exp, setExp] = useState<number | string>('');
  const [res, setRes] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    if (!exp || Number(exp) < 0) return alert("Please enter valid years of experience");
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ experience: Number(exp) }),
      });
      const data = await response.json();
      setRes(data.predicted_salary);
    } catch (error) {
      console.error("Error:", error);
      alert("Backend se connect nahi ho saka. Make sure NestJS is running!");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Header Section */}
        <div className="bg-slate-900 p-8 text-center text-white">
          <div className="inline-block p-3 bg-blue-500/20 rounded-full mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
             </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">SalaryPredict AI</h1>
          <p className="text-slate-400 text-sm mt-1">Machine Learning Analysis Tool</p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Work Experience (Years)
              </label>
              <input 
                type="number" 
                value={exp}
                onChange={(e) => setExp(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-slate-800 text-lg font-medium"
                placeholder="Enter years e.g. 5"
              />
            </div>

            <button 
              onClick={handlePredict}
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all active:scale-95 ${
                loading 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                  Processing...
                </span>
              ) : 'Generate Prediction'}
            </button>

            {/* Result Display */}
            {res !== null && (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center">
                  <span className="text-xs font-bold text-blue-600 uppercase">Estimated Annual Income</span>
                  <h2 className="text-4xl font-black text-slate-900 mt-2">
                    <span className="text-xl font-medium text-slate-500 mr-1">Rs.</span>
                    {Math.round(res).toLocaleString()}
                  </h2>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.2em]">
            UET Lahore Final Year Project • AI/ML & Full Stack
          </p>
        </div>
      </div>
    </main>
  );
}