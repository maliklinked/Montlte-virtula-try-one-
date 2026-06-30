import React, { useState } from 'react';
import { ViewMode } from '../types';
import { ShieldAlert, User, Lock, ArrowRight } from 'lucide-react';

interface AdminLoginProps {
  onNavigate: (view: ViewMode) => void;
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onNavigate, onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both administrative credentials.');
      return;
    }
    // Simple mock authentication for luxury client preview
    onLoginSuccess();
  };

  return (
    <div className="relative min-h-screen bg-[#F5F2ED] flex items-center justify-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8 text-[#1A1A1A]">
      {/* Decorative subtle ambient backing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E0DDD8]/40 rounded-full filter blur-[120px] pointer-events-none" />

      <main className="relative z-10 w-full max-w-[460px]">
        {/* Gallery-style credential card */}
        <div className="bg-[#E0DDD8]/30 p-8 md:p-12 w-full flex flex-col items-center shadow-sm border border-[#1A1A1A]/10 rounded-none">
          {/* Logo */}
          <div className="mb-10 text-center">
            <h1 className="font-serif italic text-4xl text-[#1A1A1A] uppercase tracking-tight">
              Monolith
            </h1>
            <p className="font-sans text-[10px] text-[#1A1A1A]/60 font-bold uppercase tracking-[0.25em] mt-2">
              Admin Access Console
            </p>
          </div>

          {/* Form */}
          <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
            {error && (
              <p className="text-red-800 text-xs font-semibold text-center border border-red-200 bg-red-50/70 py-2 rounded-none">
                {error}
              </p>
            )}

            {/* Email Field */}
            <div className="relative w-full">
              <label className="sr-only text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block" htmlFor="email">
                Admin Identifier
              </label>
              <div className="flex items-center border-b border-[#1A1A1A]/15 focus-within:border-[#1A1A1A] transition-colors pb-2">
                <User className="text-[#1A1A1A]/40 mr-3" size={16} />
                <input
                  id="email"
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-none w-full text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:ring-0 font-sans text-xs uppercase tracking-wide"
                  placeholder="Admin Identifier (Email)"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative w-full">
              <label className="sr-only text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]/60 mb-2 block" htmlFor="password">
                Passphrase
              </label>
              <div className="flex items-center border-b border-[#1A1A1A]/15 focus-within:border-[#1A1A1A] transition-colors pb-2">
                <Lock className="text-[#1A1A1A]/40 mr-3" size={16} />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent border-none w-full text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:ring-0 font-sans text-xs tracking-wide"
                  placeholder="Security Passphrase"
                />
              </div>

              {/* Forgot password */}
              <div className="flex justify-end mt-3">
                <button
                  type="button"
                  onClick={() => alert('Administrative passphrases must be reset physically in our safehouse room.')}
                  className="text-[9px] text-[#1A1A1A]/55 uppercase tracking-widest font-bold hover:text-[#1A1A1A] transition-colors cursor-pointer"
                >
                  Forgot Passphrase?
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-col gap-4">
              <button
                type="submit"
                className="w-full bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-[#F5F2ED] font-sans text-xs font-bold uppercase tracking-[0.2em] py-4 rounded-none flex justify-center items-center gap-2 group transition-colors border border-[#1A1A1A] cursor-pointer shadow-sm"
              >
                <span>Authenticate</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="w-full text-center text-[10px] text-[#1A1A1A]/60 uppercase tracking-widest font-bold hover:text-[#1A1A1A] transition-colors cursor-pointer py-2"
              >
                Return to Public Gallery
              </button>
            </div>
          </form>
        </div>

        {/* Secure connection footer */}
        <div className="mt-8 text-center w-full">
          <p className="font-mono text-[9px] tracking-widest text-[#1A1A1A]/40 uppercase flex items-center justify-center gap-1">
            <ShieldAlert size={10} className="text-[#1A1A1A]/40" />
            SECURE ACCESS PORT ACTIVE • MONOLITH REPLICATOR v1.0
          </p>
        </div>
      </main>
    </div>
  );
}
