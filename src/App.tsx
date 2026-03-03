import { useState } from 'react';
import { NumberVisualizer } from './components/NumberVisualizer';
import { AdditionVisualizer } from './components/AdditionVisualizer';
import { SubtractionVisualizer } from './components/SubtractionVisualizer';
import { Login } from './components/Login';
import { Calculator, Plus, Minus, Hash, LogOut } from 'lucide-react';

type Mode = 'number' | 'addition' | 'subtraction';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mode, setMode] = useState<Mode>('number');

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans text-slate-800 selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-500 p-2.5 rounded-xl shadow-sm">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-800">
              数学积木
            </h1>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-700 font-medium px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            退出登录
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Mode Selector */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setMode('number')}
            className={`flex flex-col items-center gap-3 p-6 rounded-3xl border-2 transition-all w-48 ${
              mode === 'number'
                ? 'border-indigo-500 bg-indigo-50 shadow-md scale-105'
                : 'border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50'
            }`}
          >
            <div className={`p-4 rounded-2xl ${mode === 'number' ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
              <Hash className="w-8 h-8" />
            </div>
            <span className={`font-bold text-lg ${mode === 'number' ? 'text-indigo-900' : 'text-slate-600'}`}>认识数字</span>
          </button>

          <button
            onClick={() => setMode('addition')}
            className={`flex flex-col items-center gap-3 p-6 rounded-3xl border-2 transition-all w-48 ${
              mode === 'addition'
                ? 'border-emerald-500 bg-emerald-50 shadow-md scale-105'
                : 'border-slate-200 bg-white hover:border-emerald-200 hover:bg-slate-50'
            }`}
          >
            <div className={`p-4 rounded-2xl ${mode === 'addition' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
              <Plus className="w-8 h-8" />
            </div>
            <span className={`font-bold text-lg ${mode === 'addition' ? 'text-emerald-900' : 'text-slate-600'}`}>加法运算</span>
          </button>

          <button
            onClick={() => setMode('subtraction')}
            className={`flex flex-col items-center gap-3 p-6 rounded-3xl border-2 transition-all w-48 ${
              mode === 'subtraction'
                ? 'border-rose-500 bg-rose-50 shadow-md scale-105'
                : 'border-slate-200 bg-white hover:border-rose-200 hover:bg-slate-50'
            }`}
          >
            <div className={`p-4 rounded-2xl ${mode === 'subtraction' ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
              <Minus className="w-8 h-8" />
            </div>
            <span className={`font-bold text-lg ${mode === 'subtraction' ? 'text-rose-900' : 'text-slate-600'}`}>减法运算</span>
          </button>
        </div>

        {/* Active Visualizer */}
        <div className="w-full">
          {mode === 'number' && <NumberVisualizer />}
          {mode === 'addition' && <AdditionVisualizer />}
          {mode === 'subtraction' && <SubtractionVisualizer />}
        </div>
      </main>
    </div>
  );
}
