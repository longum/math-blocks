import { useState } from 'react';
import { BlockGroup } from './Blocks';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Divide, RotateCcw, Dices } from 'lucide-react';

export const DivisionVisualizer = () => {
  const maxDividend = 999;
  const maxDivisor = 9;
  const [num1, setNum1] = useState(45); // Dividend
  const [num2, setNum2] = useState(3);  // Divisor
  const [input1, setInput1] = useState(num1.toString());
  const [input2, setInput2] = useState(num2.toString());
  
  const [step, setStep] = useState(0);

  const handleStart = () => {
    const n1 = parseInt(input1, 10);
    const n2 = parseInt(input2, 10);
    if (!isNaN(n1) && !isNaN(n2) && n1 >= 1 && n1 <= maxDividend && n2 >= 1 && n2 <= maxDivisor) {
      setNum1(n1);
      setNum2(n2);
      setStep(1);
    } else {
      alert(`被除数请在 1-${maxDividend} 之间，除数请在 1-${maxDivisor} 之间！`);
    }
  };

  const handleRandom = () => {
    const n2 = Math.floor(Math.random() * 5) + 2; // 2 to 6
    const quotient = Math.floor(Math.random() * 30) + 5; // 5 to 34
    const remainder = Math.floor(Math.random() * n2);
    const n1 = n2 * quotient + remainder;
    
    setNum1(n1);
    setNum2(n2);
    setInput1(n1.toString());
    setInput2(n2.toString());
    setStep(0);
  };

  const quotient = Math.floor(num1 / num2);
  const remainder = num1 % num2;

  const getBlocks = (val: number) => ({
    hundreds: Math.floor(val / 100),
    tens: Math.floor((val % 100) / 10),
    ones: val % 10
  });

  const b1 = getBlocks(num1);
  const bQ = getBlocks(quotient);
  const bR = getBlocks(remainder);

  const maxStep = 3;

  const handleNextStep = () => {
    setStep(s => Math.min(maxStep, s + 1));
  };

  const handlePrevStep = () => {
    setStep(s => Math.max(1, s - 1));
  };

  const stepsList = ['被除数', '平均分配', '结果'];
  
  const getActiveStepIndex = () => {
    if (step === 0) return -1;
    if (step === 1) return 0;
    if (step === 2) return 1;
    if (step === 3) return 2;
    return 0;
  };

  const activeStepIndex = getActiveStepIndex();

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 w-full mb-6 flex flex-wrap justify-center items-center gap-6">
        <div className="flex items-center gap-4">
          <input
            type="number"
            min="1"
            max={maxDividend}
            value={input1}
            onChange={(e) => { setInput1(e.target.value); setStep(0); }}
            className="text-3xl font-bold text-center w-28 p-3 rounded-2xl border-2 border-sky-100 focus:border-sky-400 outline-none text-sky-900"
            disabled={step > 0}
          />
          <Divide className="w-8 h-8 text-slate-400" />
          <input
            type="number"
            min="1"
            max={maxDivisor}
            value={input2}
            onChange={(e) => { setInput2(e.target.value); setStep(0); }}
            className="text-3xl font-bold text-center w-28 p-3 rounded-2xl border-2 border-sky-100 focus:border-sky-400 outline-none text-sky-900"
            disabled={step > 0}
          />
        </div>
        
        {step === 0 ? (
          <div className="flex gap-3">
            <button
              onClick={handleStart}
              className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-2xl font-bold text-lg transition-colors shadow-sm"
            >
              开始除法
            </button>
            <button
              onClick={handleRandom}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-2xl font-bold text-lg transition-colors shadow-sm flex items-center gap-2"
            >
              <Dices className="w-5 h-5" /> 随机
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handlePrevStep}
              disabled={step === 1}
              className="bg-sky-100 hover:bg-sky-200 disabled:bg-slate-100 disabled:text-slate-300 text-sky-700 px-6 py-3 rounded-2xl font-bold text-lg transition-colors shadow-sm flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" /> 上一步
            </button>
            <button
              onClick={handleNextStep}
              disabled={step === maxStep}
              className="bg-sky-500 hover:bg-sky-600 disabled:bg-slate-200 disabled:text-slate-400 text-white px-6 py-3 rounded-2xl font-bold text-lg transition-colors shadow-sm flex items-center gap-2"
            >
              下一步 <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setStep(0)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-3 rounded-2xl font-bold transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" /> 重置
            </button>
          </div>
        )}
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 w-full min-h-[500px] relative overflow-hidden flex flex-col">
        {/* Step Indicators */}
        <div className="flex justify-center gap-8 mb-8">
          {stepsList.map((label, i) => (
            <div key={label} className={`flex items-center gap-2 ${activeStepIndex >= i ? 'text-sky-600 font-bold' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                activeStepIndex >= i ? 'bg-sky-100 text-sky-600' : 'bg-slate-100 text-slate-400'
              }`}>
                {i + 1}
              </div>
              {label}
            </div>
          ))}
        </div>

        <div className="flex-1 flex flex-col justify-center items-center gap-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center"
              >
                <div className="text-3xl font-bold text-slate-500 mb-2">总共 <span className="text-sky-600">{num1}</span></div>
                <BlockGroup hundreds={b1.hundreds} tens={b1.tens} ones={b1.ones} />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center w-full"
              >
                <div className="text-3xl font-bold text-slate-800 mb-6">
                  平均分成 <span className="text-sky-600">{num2}</span> 份
                </div>
                <div className="flex flex-wrap justify-center gap-6">
                  {Array.from({ length: num2 }).map((_, i) => (
                    <div key={i} className="bg-sky-50/50 p-4 rounded-2xl border-2 border-dashed border-sky-200 flex flex-col items-center min-w-[120px] scale-75 origin-top">
                      <div className="text-sky-400 font-bold mb-2">第 {i + 1} 份</div>
                      <BlockGroup hundreds={bQ.hundreds} tens={bQ.tens} ones={bQ.ones} stagger={false} />
                    </div>
                  ))}
                </div>
                {remainder > 0 && (
                  <div className="mt-8 flex flex-col items-center bg-slate-50 p-4 rounded-2xl border border-slate-200 scale-75 origin-top">
                    <div className="text-slate-500 font-bold mb-2">剩下的 (余数)</div>
                    <BlockGroup hundreds={bR.hundreds} tens={bR.tens} ones={bR.ones} stagger={false} />
                  </div>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step-final"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <div className="text-5xl font-black text-sky-600 mb-6">
                  {num1} ÷ {num2} = {quotient} {remainder > 0 ? `... ${remainder}` : ''}
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="flex flex-col items-center">
                    <div className="text-xl font-bold text-slate-500 mb-2">每份有</div>
                    <BlockGroup hundreds={bQ.hundreds} tens={bQ.tens} ones={bQ.ones} stagger={false} />
                  </div>
                  
                  {remainder > 0 && (
                    <>
                      <div className="w-px h-32 bg-slate-200"></div>
                      <div className="flex flex-col items-center">
                        <div className="text-xl font-bold text-slate-400 mb-2">余数</div>
                        <BlockGroup hundreds={bR.hundreds} tens={bR.tens} ones={bR.ones} stagger={false} />
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
