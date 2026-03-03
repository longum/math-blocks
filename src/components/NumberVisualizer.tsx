import { useState } from 'react';
import { BlockGroup } from './Blocks';
import { motion } from 'motion/react';
import { Dices } from 'lucide-react';

export const NumberVisualizer = () => {
  const maxNum = 999;
  const [value, setValue] = useState(245);
  const [inputValue, setInputValue] = useState(value.toString());

  const hundreds = Math.floor(value / 100);
  const tens = Math.floor((value % 100) / 10);
  const ones = value % 10;

  const handleVisualize = () => {
    const num = parseInt(inputValue, 10);
    if (!isNaN(num) && num >= 1 && num <= maxNum) {
      setValue(num);
    } else {
      setInputValue(value.toString());
    }
  };

  const handleRandom = () => {
    const num = Math.floor(Math.random() * maxNum) + 1;
    setValue(num);
    setInputValue(num.toString());
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 w-full mb-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">来拼一个数字吧！</h2>
        <div className="flex justify-center items-center gap-4">
          <input
            type="number"
            min="1"
            max={maxNum}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleVisualize()}
            className="text-4xl font-bold text-center w-32 p-4 rounded-2xl border-2 border-indigo-100 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none transition-all text-indigo-900"
          />
          <button
            onClick={handleVisualize}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-xl transition-colors shadow-sm active:scale-95"
          >
            展示给我看！
          </button>
          <button
            onClick={handleRandom}
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-4 rounded-2xl font-bold text-xl transition-colors shadow-sm active:scale-95 flex items-center gap-2"
          >
            <Dices className="w-6 h-6" /> 随机
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 w-full min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-4 left-4 flex gap-4 text-slate-400 font-medium text-lg">
          {hundreds > 0 && <span>{hundreds} 个百</span>}
          {tens > 0 && <span>{tens} 个十</span>}
          {ones > 0 && <span>{ones} 个一</span>}
        </div>
        
        <motion.div 
          key={value}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex justify-center"
        >
          <BlockGroup hundreds={hundreds} tens={tens} ones={ones} />
        </motion.div>
        
        <div className="absolute bottom-4 right-6 text-6xl font-black text-slate-100 -z-10">
          {value}
        </div>
      </div>
    </div>
  );
};
