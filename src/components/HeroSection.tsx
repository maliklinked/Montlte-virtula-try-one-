import LiquidObsidianShader from './LiquidObsidianShader';
import { ViewMode } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (view: ViewMode) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <header className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#F5F2ED] pt-20">
      {/* Liquid Linen WebGL background */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-90">
        <LiquidObsidianShader />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center py-12">
        {/* Left column: Typography & Details */}
        <div className="md:col-span-6 flex flex-col justify-center text-[#1A1A1A] animate-fade-in text-left">
          <div className="mb-4 inline-flex items-center gap-3 font-sans text-xs font-bold uppercase tracking-[0.3em] text-[#1A1A1A]/70">
            <span className="w-12 h-[1px] bg-[#1A1A1A]/40"></span>
            Fall / Winter 2026
          </div>
          
          <h1 className="font-serif italic text-6xl md:text-[100px] leading-[0.85] tracking-tighter mb-8 ml-[-4px]">
            Monolith<br />
            <span className="font-sans font-bold text-3xl md:text-5xl uppercase tracking-[0.1em] text-[#1A1A1A]/95 not-italic block mt-1">Studies</span>
          </h1>
          
          <p className="font-sans text-sm text-[#1A1A1A]/80 leading-relaxed mb-10 max-w-md">
            An exploration of brutalist geometry and natural light interaction within wearable sculpture. Our latest series focuses on the heavy-set silhouettes, micro-textures, and structure of modern architectural suburbs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onNavigate('shop')}
              className="bg-[#1A1A1A] text-[#F5F2ED] hover:bg-[#1A1A1A]/90 transition-all duration-300 font-sans text-[10px] uppercase font-bold tracking-[0.2em] px-8 py-4 shadow-xl transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer border border-[#1A1A1A]"
            >
              Shop Catalog
              <ArrowRight size={13} />
            </button>
            
            <button
              onClick={() => onNavigate('atelier')}
              className="border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A]/5 transition-all duration-300 font-sans text-[10px] uppercase font-bold tracking-[0.2em] px-8 py-4 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Sparkles size={13} />
              Bespoke AI Atelier
            </button>
          </div>
        </div>

        {/* Right column: Editorial Model Portrait styled in structured frame */}
        <div className="hidden md:flex md:col-span-6 h-[75vh] relative justify-end items-center animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="relative w-[380px] h-[520px] bg-[#E0DDD8] border border-[#1A1A1A]/10 relative shadow-2xl">
            <div className="absolute inset-0 p-2">
              <img
                alt="MONOLITH Luxury Model"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-1000 opacity-90 filter grayscale-[20%]"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAguL3_6QPe_6eH1P4Vv4ARn1ik1DE-edaeuaBGSNhZcNGBRw3fxNmnbKSdN1Hu8T87XK88b22_afn-LPiWobqJJb1xevcSpu1UUqhWLYZP-W-bVderlN3_MBPoCaDiARc_6oj4cWzezbSot3bN5kL7wQocADumn5FApBq8GW4oPwo3NgUAbMEyEELoeFOscvil700cBUL1EvyXHHPImN7mlcZJjrJ7dux7C8Heu0W5k_SRR2oCekXSOAsL7T4OHLnljGBhkCC0cWw"
              />
            </div>
            {/* Elegant overlay shade */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/30 via-transparent to-transparent pointer-events-none"></div>
            
            {/* Floating details badge from Design HTML */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl w-48 border border-[#1A1A1A]/10 text-left">
              <div className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/50 mb-1">Location</div>
              <div className="text-xs font-serif italic text-[#1A1A1A]">Potsdam, Germany</div>
              <div className="mt-4 text-[9px] uppercase font-bold tracking-[0.2em] text-[#1A1A1A]/50 mb-1">Silhouette</div>
              <div className="text-xs font-serif italic text-[#1A1A1A]">Brutalist 24 Style</div>
            </div>

            {/* Decorative vertical caption */}
            <div className="absolute top-1/2 -right-8 translate-x-1/2 -translate-y-1/2 rotate-90 text-[10px] font-bold tracking-[0.5em] text-[#1A1A1A]/20 uppercase pointer-events-none whitespace-nowrap">
              BRUTALISM 24
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
