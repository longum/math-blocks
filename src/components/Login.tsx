import React, { useState } from 'react';
import { Calculator, Lock, User } from 'lucide-react';
import authConfig from '../config/users.json';

export const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = authConfig.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setError('');
      onLogin();
    } else {
      setError('用户名或密码错误');
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center p-6 font-sans">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-500 p-3 rounded-2xl shadow-sm mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-800">
            数学积木
          </h1>
          <p className="text-slate-500 mt-2">请输入账号密码登录</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="用户名"
                required
              />
            </div>
          </div>

          <div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="密码"
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-rose-500 text-sm font-medium text-center bg-rose-50 py-2 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm active:scale-[0.98]"
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
};
