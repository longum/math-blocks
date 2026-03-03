import { useState } from 'react';
import { BlockGroup } from './Blocks';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Minus, RotateCcw, Dices } from 'lucide-react';

export const SubtractionVisualizer = () => {
  const maxNum = 999;
  const [num1, setNum1] = useState(352);
  const [num2, setNum2] = useState(124);
  const [input1, setInput1] = useState(num1.toString());
  const [input2, setInput2] = useState(num2.toString());
  
  // 0: Input, 1: Show Num1, 2: Borrowing (if needed), 3: Highlight Num2 to remove, 4: Show Result
  const [step, setStep] = useState(0);

  const getBlocks = (val: number) => ({
    hundreds: Math.floor(val / 100),
    tens: Math.floor((val % 100) / 10),
    ones: val % 10
  });

  const b1 = getBlocks(num1);
  const b2 = getBlocks(num2);
  
  let currentHundreds = b1.hundreds;
  let currentTens = b1.tens;
  let currentOnes = b1.ones;
  
  let borrowHundredsForTens = false;
  let borrowTensForOnes = false;
  let borrowHundredsForOnes = false;

  if (currentOnes < b2.ones) {
    if (currentTens > 0) {
      currentTens -= 1;
      currentOnes += 10;
      borrowTensForOnes = true;
    } else if (currentHundreds > 0) {
      currentHundreds -= 1;
      currentTens += 9;
      currentOnes += 10;
      borrowHundredsForOnes = true;
    }
  }

  if (currentTens < b2.tens) {
    if (currentHundreds > 0) {
      currentHundreds -= 1;
      currentTens += 10;
      borrowHundredsForTens = true;
    }
  }

  const needsBorrowing = borrowTensForOnes || borrowHundredsForOnes || borrowHundredsForTens;

  const handleStart = () => {
    const n1 = parseInt(input1, 10);
    const n2 = parseInt(input2, 10);
    if (!isNaN(n1) && !isNaN(n2) && n1 >= 1 && n2 >= 1 && n1 >= n2 && n1 <= maxNum) {
      setNum1(n1);
      setNum2(n2);
      setStep(1);
    } else {
      alert("第一个数字必须大于或等于第二个数字！");
    }
  };

  const handleRandom = () => {
    const n1 = Math.floor(Math.random() * 899) + 100; // 100 to 999
    const n2 = Math.floor(Math.random() * (n1 - 1)) + 1; // 1 to n1-1
    setNum1(n1);
    setNum2(n2);
    setInput1(n1.toString());
    setInput2(n2.toString());
    setStep(0);
  };

  const handleNextStep = () => {
    if (step === 1 && !needsBorrowing) {
      setStep(3); // Skip borrowing step
    } else {
      setStep(s => Math.min(4, s + 1));
    }
  };

  const handlePrevStep = () => {
    if (step === 3 && !needsBorrowing) {
      setStep(1); // Skip borrowing step backwards
    } else {
      setStep(s => Math.max(1, s - 1));
    }
  };

  const diff = num1 - num2;
  const bDiff = getBlocks(diff);

  const stepsList = needsBorrowing 
    ? ['被减数', '借位', '减去', '结果']
    : ['被减数', '减去', '结果'];

  const getActiveStepIndex = () => {
    if (step === 0) return -1;
    if (step === 1) return 0;
    if (step === 2) return needsBorrowing ? 1 : 0;
    if (step === 3) return needsBorrowing ? 2 : 1;
    if (step === 4) return needsBorrowing ? 3 : 2;
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
            className="text-3xl font-bold text-center w-28 p-3 rounded-2xl border-2 border-rose-100 focus:border-rose-400 outline-none text-rose-900"
            disabled={step > 0}
          />
          <Minus className="w-8 h-8 text-slate-400" />
          <input
            type="number"
            min="1"
            max={maxNum}
            value={input2}
            onChange={(e) => { setInput2(e.target.value); setStep(0); }}
            className="text-3xl font-bold text-center w-28 p-3 rounded-2xl border-2 border-rose-100 focus:border-rose-400 outline-none text-rose-900"
            disabled={step > 0}
          />
        </div>
        
        {step === 0 ? (
          <div className="flex gap-3">
            <button
              onClick={handleStart}
              className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-2xl font-bold text-lg transition-colors shadow-sm"
            >
              开始减法
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
              onClick={handlePrevStep}
              disabled={step === 1}
              className="bg-rose-100 hover:bg-rose-200 disabled:bg-slate-100 disabled:text-slate-300 text-rose-700 px-6 py-3 rounded-2xl font-bold text-lg transition-colors shadow-sm flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" /> 上一步
            </button>
            <button
              onClick={handleNextStep}
              disabled={step === 4}
              className="bg-rose-500 hover:bg-rose-600 disabled:bg-slate-200 disabled:text-slate-400 text-white px-6 py-3 rounded-2xl font-bold text-lg transition-colors shadow-sm flex items-center gap-2"
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
            <div key={label} className={`flex items-center gap-2 ${activeStepIndex >= i ? 'text-rose-600 font-bold' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                activeStepIndex >= i ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-400'
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

            {step === 2 && needsBorrowing && (
              <motion.div
                key="step2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center w-full"
              >
                <div className="text-xl text-rose-500 mb-4 font-medium bg-rose-50 px-6 py-3 rounded-xl border border-rose-100">
                  不够减！我们需要拆开大积木来借位。
                </div>
                <BlockGroup 
                  hundreds={currentHundreds} 
                  tens={currentTens} 
                  ones={currentOnes} 
                  newHundreds={0}
                  newTens={borrowHundredsForTens || borrowHundredsForOnes ? 10 : 0}
                  newOnes={borrowTensForOnes || borrowHundredsForOnes ? 10 : 0}
                  stagger={false} 
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center w-full"
              >
                <div className="text-3xl font-bold text-slate-800 mb-2">减去 <span className="text-rose-500">{num2}</span></div>
                
                <div className="mt-4">
                  <BlockGroup 
                    hundreds={currentHundreds} 
                    tens={currentTens} 
                    ones={currentOnes} 
                    removeHundreds={b2.hundreds}
                    removeTens={b2.tens}
                    removeOnes={b2.ones}
                    stagger={false} 
                  />
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center"
              >
                <div className="text-5xl font-black text-rose-600 mb-6">
                  {num1} - {num2} = {diff}
                </div>
                <BlockGroup hundreds={bDiff.hundreds} tens={bDiff.tens} ones={bDiff.ones} stagger={false} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
