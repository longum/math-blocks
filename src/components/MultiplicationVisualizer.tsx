import { useState } from 'react';
import { BlockGroup } from './Blocks';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, X, RotateCcw, Dices } from 'lucide-react';

export const MultiplicationVisualizer = () => {
  const maxMultiplier = 9;
  const maxMultiplicand = 99;
  const [num1, setNum1] = useState(3); // Multiplier (groups)
  const [num2, setNum2] = useState(14); // Multiplicand (amount per group)
  const [input1, setInput1] = useState(num1.toString());
  const [input2, setInput2] = useState(num2.toString());
  
  const [step, setStep] = useState(0);

  const handleStart = () => {
    const n1 = parseInt(input1, 10);
    const n2 = parseInt(input2, 10);
    if (!isNaN(n1) && !isNaN(n2) && n1 >= 1 && n1 <= maxMultiplier && n2 >= 1 && n2 <= maxMultiplicand) {
      setNum1(n1);
      setNum2(n2);
      setStep(1);
    } else {
      alert(`第一个数字（组数）请在 1-${maxMultiplier} 之间，第二个数字（每组数量）请在 1-${maxMultiplicand} 之间！`);
    }
  };

  const handleRandom = () => {
    const n1 = Math.floor(Math.random() * 5) + 2; // 2 to 6
    const n2 = Math.floor(Math.random() * 25) + 10; // 10 to 34
    setNum1(n1);
    setNum2(n2);
    setInput1(n1.toString());
    setInput2(n2.toString());
    setStep(0);
  };

  const product = num1 * num2;

  const getBlocks = (val: number) => ({
    hundreds: Math.floor(val / 100),
    tens: Math.floor((val % 100) / 10),
    ones: val % 10
  });

  const b2 = getBlocks(num2);
  
  const rawHundreds = num1 * b2.hundreds;
  const rawTens = num1 * b2.tens;
  const rawOnes = num1 * b2.ones;

  const needsCarrying = rawOnes >= 10 || rawTens >= 10;
  
  const carriedTens = rawTens + Math.floor(rawOnes / 10);
  const finalHundreds = rawHundreds + Math.floor(carriedTens / 10);
  const finalTens = carriedTens % 10;
  const finalOnes = rawOnes % 10;
  
  const newTensFromOnes = Math.floor(rawOnes / 10);
  const newHundredsFromTens = Math.floor(carriedTens / 10);

  const maxStep = needsCarrying ? 5 : 3;

  const handleNextStep = () => {
    setStep(s => Math.min(maxStep, s + 1));
  };

  const handlePrevStep = () => {
    setStep(s => Math.max(1, s - 1));
  };

  const stepsList = needsCarrying 
    ? ['单组数量', '复制多组', '合并', '进位', '结果']
    : ['单组数量', '复制多组', '合并结果'];
  
  const getActiveStepIndex = () => {
    if (step === 0) return -1;
    if (step === 1) return 0;
    if (step === 2) return 1;
    if (step === 3) return 2;
    if (step === 4) return 3;
    if (step === 5) return 4;
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
            max={maxMultiplier}
            value={input1}
            onChange={(e) => { setInput1(e.target.value); setStep(0); }}
            className="text-3xl font-bold text-center w-28 p-3 rounded-2xl border-2 border-amber-100 focus:border-amber-400 outline-none text-amber-900"
            disabled={step > 0}
          />
          <X className="w-8 h-8 text-slate-400" />
          <input
            type="number"
            min="1"
            max={maxMultiplicand}
            value={input2}
            onChange={(e) => { setInput2(e.target.value); setStep(0); }}
            className="text-3xl font-bold text-center w-28 p-3 rounded-2xl border-2 border-amber-100 focus:border-amber-400 outline-none text-amber-900"
            disabled={step > 0}
          />
        </div>
        
        {step === 0 ? (
          <div className="flex gap-3">
            <button
              onClick={handleStart}
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-2xl font-bold text-lg transition-colors shadow-sm"
            >
              开始乘法
            </button>
            <button
              onClick={handleRandom}
              className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-2xl font-bold text-lg transition-colors shadow-sm flex items-center gap-2"
            >
              <Dices className="w-5 h-5" /> 随机
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handlePrevStep}
              disabled={step === 1}
              className="bg-amber-100 hover:bg-amber-200 disabled:bg-slate-100 disabled:text-slate-300 text-amber-700 px-6 py-3 rounded-2xl font-bold text-lg transition-colors shadow-sm flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" /> 上一步
            </button>
            <button
              onClick={handleNextStep}
              disabled={step === maxStep}
              className="bg-amber-500 hover:bg-amber-600 disabled:bg-slate-200 disabled:text-slate-400 text-white px-6 py-3 rounded-2xl font-bold text-lg transition-colors shadow-sm flex items-center gap-2"
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
            <div key={label} className={`flex items-center gap-2 ${activeStepIndex >= i ? 'text-amber-600 font-bold' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                activeStepIndex >= i ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400'
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
                <div className="text-3xl font-bold text-slate-500 mb-2">1 组 <span className="text-amber-600">{num2}</span></div>
                <BlockGroup hundreds={b2.hundreds} tens={b2.tens} ones={b2.ones} />
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
                  <span className="text-amber-600">{num1}</span> 组 <span className="text-amber-600">{num2}</span>
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                  {Array.from({ length: num1 }).map((_, i) => (
                    <div key={i} className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 scale-75 origin-top">
                      <BlockGroup hundreds={b2.hundreds} tens={b2.tens} ones={b2.ones} stagger={false} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && needsCarrying && (
              <motion.div
                key="step3-carry"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center w-full"
              >
                <div className="text-3xl font-bold text-slate-800 mb-6">把所有积木合并</div>
                <BlockGroup hundreds={rawHundreds} tens={rawTens} ones={rawOnes} stagger={false} />
              </motion.div>
            )}

            {step === 4 && needsCarrying && (
              <motion.div
                key="step4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center w-full"
              >
                <div className="text-xl text-amber-600 mb-8 font-medium bg-amber-50 px-6 py-3 rounded-xl border border-amber-100">
                  满10进1！把小积木组合成大积木。
                </div>
                <BlockGroup 
                  hundreds={finalHundreds} 
                  tens={finalTens} 
                  ones={finalOnes} 
                  newHundreds={newHundredsFromTens}
                  newTens={newTensFromOnes}
                  newOnes={0}
                  stagger={false} 
                />
              </motion.div>
            )}

            {(step === 5 || (step === 3 && !needsCarrying)) && (
              <motion.div
                key="step-final"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <div className="text-5xl font-black text-amber-600 mb-6">
                  {num1} × {num2} = {product}
                </div>
                <BlockGroup hundreds={finalHundreds} tens={finalTens} ones={finalOnes} stagger={false} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
