import { useState } from 'react';
import { BlockGroup } from './Blocks';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Plus, RotateCcw, Dices } from 'lucide-react';

export const AdditionVisualizer = () => {
  const maxNum = 999; // Keep sum under 1000
  const [num1, setNum1] = useState(125);
  const [num2, setNum2] = useState(114);
  const [input1, setInput1] = useState(num1.toString());
  const [input2, setInput2] = useState(num2.toString());
  
  const [step, setStep] = useState(0);

  const handleStart = () => {
    const n1 = parseInt(input1, 10);
    const n2 = parseInt(input2, 10);
    if (!isNaN(n1) && !isNaN(n2) && n1 >= 1 && n2 >= 1 && n1 + n2 <= 999) {
      setNum1(n1);
      setNum2(n2);
      setStep(1);
    }
  };

  const handleRandom = () => {
    const n1 = Math.floor(Math.random() * 499) + 1;
    const n2 = Math.floor(Math.random() * (999 - n1)) + 1;
    setNum1(n1);
    setNum2(n2);
    setInput1(n1.toString());
    setInput2(n2.toString());
    setStep(0);
  };

  const sum = num1 + num2;

  const getBlocks = (val: number) => ({
    hundreds: Math.floor(val / 100),
    tens: Math.floor((val % 100) / 10),
    ones: val % 10
  });

  const b1 = getBlocks(num1);
  const b2 = getBlocks(num2);
  
  const rawHundreds = b1.hundreds + b2.hundreds;
  const rawTens = b1.tens + b2.tens;
  const rawOnes = b1.ones + b2.ones;

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

  const stepsList = needsCarrying 
    ? ['第一个数字', '第二个数字', '合并', '进位', '结果']
    : ['第一个数字', '第二个数字', '合并结果'];
  
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
            max={maxNum}
            value={input1}
            onChange={(e) => { setInput1(e.target.value); setStep(0); }}
            className="text-3xl font-bold text-center w-28 p-3 rounded-2xl border-2 border-emerald-100 focus:border-emerald-400 outline-none text-emerald-900"
            disabled={step > 0}
          />
          <Plus className="w-8 h-8 text-slate-400" />
          <input
            type="number"
            min="1"
            max={maxNum}
            value={input2}
            onChange={(e) => { setInput2(e.target.value); setStep(0); }}
            className="text-3xl font-bold text-center w-28 p-3 rounded-2xl border-2 border-emerald-100 focus:border-emerald-400 outline-none text-emerald-900"
            disabled={step > 0}
          />
        </div>
        
        {step === 0 ? (
          <div className="flex gap-3">
            <button
              onClick={handleStart}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-2xl font-bold text-lg transition-colors shadow-sm"
            >
              开始加法
            </button>
            <button
              onClick={handleRandom}
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-2xl font-bold text-lg transition-colors shadow-sm flex items-center gap-2"
            >
              <Dices className="w-5 h-5" /> 随机
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleNextStep}
              disabled={step === maxStep}
              className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 disabled:text-slate-400 text-white px-6 py-3 rounded-2xl font-bold text-lg transition-colors shadow-sm flex items-center gap-2"
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
            <div key={label} className={`flex items-center gap-2 ${activeStepIndex >= i ? 'text-emerald-600 font-bold' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                activeStepIndex >= i ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
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
                <div className="text-4xl font-black text-slate-800 mb-4">{num1}</div>
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
                <div className="flex justify-center items-end gap-12 w-full">
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold text-slate-500 mb-2">{num1}</div>
                    <div className="scale-75 origin-bottom">
                      <BlockGroup hundreds={b1.hundreds} tens={b1.tens} ones={b1.ones} stagger={false} />
                    </div>
                  </div>
                  <div className="text-6xl font-black text-slate-300 mb-12">+</div>
                  <div className="flex flex-col items-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">{num2}</div>
                    <div className="scale-75 origin-bottom">
                      <BlockGroup hundreds={b2.hundreds} tens={b2.tens} ones={b2.ones} />
                    </div>
                  </div>
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
                <div className="text-3xl font-bold text-slate-800 mb-6">把积木放在一起</div>
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
                <div className="text-xl text-emerald-600 mb-8 font-medium bg-emerald-50 px-6 py-3 rounded-xl border border-emerald-100">
                  满10进1！10个小积木组合成1个大积木。
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
                <div className="text-5xl font-black text-emerald-600 mb-6">
                  {num1} + {num2} = {sum}
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
