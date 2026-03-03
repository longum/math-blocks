import React from 'react';
import { motion } from 'motion/react';

export const OneBlock = ({ delay = 0, remove = false, isNew = false }: { delay?: number; remove?: boolean; isNew?: boolean; key?: React.Key }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: remove ? 0.8 : 1, 
      opacity: remove ? 0.4 : 1,
    }}
    transition={{ delay, type: 'spring', bounce: 0.4 }}
    className={`w-5 h-5 rounded-sm shadow-sm border relative flex-shrink-0 ${
      remove ? 'bg-red-200 border-red-400' : isNew ? 'bg-yellow-200 border-yellow-400' : 'bg-yellow-300 border-yellow-500'
    }`}
  >
    {remove && (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[140%] h-[2px] bg-red-500 rotate-45 absolute" />
        <div className="w-[140%] h-[2px] bg-red-500 -rotate-45 absolute" />
      </div>
    )}
  </motion.div>
);

export const TenBlock = ({ delay = 0, remove = false, isNew = false }: { delay?: number; remove?: boolean; isNew?: boolean; key?: React.Key }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: remove ? 0.8 : 1, 
      opacity: remove ? 0.4 : 1,
    }}
    transition={{ delay, type: 'spring', bounce: 0.4 }}
    className={`w-5 h-[200px] rounded-sm shadow-sm flex flex-col border relative overflow-hidden flex-shrink-0 ${
      remove ? 'bg-red-200 border-red-400' : isNew ? 'bg-green-300 border-green-500' : 'bg-green-400 border-green-600'
    }`}
  >
    {Array.from({ length: 10 }).map((_, i) => (
      <div key={i} className={`flex-1 border-b last:border-b-0 ${
        remove ? 'border-red-400/30' : 'border-green-600/30'
      }`} />
    ))}
    {remove && (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[120%] h-[2px] bg-red-500 rotate-[85deg] absolute" />
        <div className="w-[120%] h-[2px] bg-red-500 -rotate-[85deg] absolute" />
      </div>
    )}
  </motion.div>
);

export const HundredBlock = ({ delay = 0, remove = false, isNew = false }: { delay?: number; remove?: boolean; isNew?: boolean; key?: React.Key }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: remove ? 0.8 : 1, 
      opacity: remove ? 0.4 : 1,
    }}
    transition={{ delay, type: 'spring', bounce: 0.4 }}
    className={`w-[200px] h-[200px] rounded-sm shadow-sm grid grid-cols-10 grid-rows-10 border relative overflow-hidden flex-shrink-0 ${
      remove ? 'bg-red-200 border-red-400' : isNew ? 'bg-blue-300 border-blue-500' : 'bg-blue-400 border-blue-600'
    }`}
  >
    {Array.from({ length: 100 }).map((_, i) => (
      <div key={i} className={`border-r border-b ${
        remove ? 'border-red-400/30' : 'border-blue-600/30'
      }`} />
    ))}
    {remove && (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[140%] h-[4px] bg-red-500 rotate-45 absolute" />
        <div className="w-[140%] h-[4px] bg-red-500 -rotate-45 absolute" />
      </div>
    )}
  </motion.div>
);

export const BlockGroup = ({ 
  hundreds, 
  tens, 
  ones, 
  removeHundreds = 0,
  removeTens = 0,
  removeOnes = 0,
  newHundreds = 0,
  newTens = 0,
  newOnes = 0,
  stagger = true 
}: { 
  hundreds: number; 
  tens: number; 
  ones: number;
  removeHundreds?: number;
  removeTens?: number;
  removeOnes?: number;
  newHundreds?: number;
  newTens?: number;
  newOnes?: number;
  stagger?: boolean;
}) => {
  return (
    <div className="flex gap-8 items-end justify-center p-4 min-h-[220px]">
      {hundreds > 0 && (
        <div className="flex gap-2 flex-wrap max-w-[420px] justify-center">
          {Array.from({ length: hundreds }).map((_, i) => (
            <HundredBlock 
              key={`h-${i}`} 
              delay={stagger ? i * 0.05 : 0} 
              remove={i >= hundreds - removeHundreds}
              isNew={i >= hundreds - newHundreds}
            />
          ))}
        </div>
      )}
      {tens > 0 && (
        <div className="flex gap-2 flex-wrap max-w-[240px] justify-center">
          {Array.from({ length: tens }).map((_, i) => (
            <TenBlock 
              key={`t-${i}`} 
              delay={stagger ? (hundreds * 0.05) + i * 0.05 : 0} 
              remove={i >= tens - removeTens}
              isNew={i >= tens - newTens}
            />
          ))}
        </div>
      )}
      {ones > 0 && (
        <div className="flex gap-1 flex-wrap max-w-[120px] content-end">
          {Array.from({ length: ones }).map((_, i) => (
            <OneBlock 
              key={`o-${i}`} 
              delay={stagger ? (hundreds * 0.05) + (tens * 0.05) + i * 0.05 : 0} 
              remove={i >= ones - removeOnes}
              isNew={i >= ones - newOnes}
            />
          ))}
        </div>
      )}
    </div>
  );
};
