import React, { useState, useRef } from 'react';
import { Garment } from '../types';
import { TRY_ON_GARMENTS } from '../data';
import { Upload, Camera, Sparkles, RefreshCw, CheckCircle2, ArrowRight, Download, ShoppingBag, Eye } from 'lucide-react';

interface VirtualAtelierProps {
  onAddToCart: (productName: string, price: number, image: string) => void;
}

export default function VirtualAtelier({ onAddToCart }: VirtualAtelierProps) {
  const [selectedGarment, setSelectedGarment] = useState<Garment>(TRY_ON_GARMENTS[0]);
  const [silhouetteFile, setSilhouetteFile] = useState<string | null>(null);
  const [silhouetteName, setSilhouetteName] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showBefore, setShowBefore] = useState(false); // To toggle Before/After compare
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSilhouetteFile(event.target.result as string);
          setSilhouetteName(file.name);
          setShowResult(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  // Pre-load mock silhouette (Demo mode)
  const loadDemoSilhouette = () => {
    setSilhouetteFile('demo-silhouette');
    setSilhouetteName('monolith_demographics_male_fit.png');
    setShowResult(false);
  };

  const handleGenerate = () => {
    if (!silhouetteFile) {
      alert('Please upload a silhouette file or use the Demographics Template first.');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowResult(true);
    }, 2800);
  };

  const handlePurchaseLook = () => {
    const prices: Record<string, number> = {
      'g-1': 1250,
      'g-2': 580,
      'g-3': 490
    };
    onAddToCart(selectedGarment.name, prices[selectedGarment.id] || 850, selectedGarment.image);
    alert(`${selectedGarment.name} added to your Shopping Bag!`);
  };

  return (
    <div className="bg-[#F5F2ED] min-h-screen pt-28 pb-20 text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Title */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#1A1A1A]/70 font-bold mb-3">Neural Bespoke Studio</p>
          <h1 className="font-serif italic text-4xl md:text-5xl text-[#1A1A1A] mb-4">
            AI Virtual Atelier
          </h1>
          <p className="font-sans text-[#1A1A1A]/80 font-light text-sm leading-relaxed">
            Experience bespoke tailoring through our proprietary neural network. Upload your silhouette and select a luxury design line to begin style mapping.
          </p>
        </div>

        {/* Studio Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[700px]">
          {/* Left Column: STEP 1 & STEP 2 Controls */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Step 1: Upload Silhouette */}
            <div className="bg-[#E0DDD8]/30 p-6 md:p-8 border border-[#1A1A1A]/10 shadow-sm flex flex-col justify-center relative overflow-hidden group transition-all duration-500 rounded-none">
              <div className="absolute top-4 left-4 font-sans text-[9px] uppercase tracking-[0.2em] text-[#F5F2ED] bg-[#1A1A1A] px-3 py-1 font-bold z-10 rounded-none">
                STEP 01
              </div>

              <div className="mt-6 flex flex-col items-center justify-center">
                {silhouetteFile ? (
                  <div className="w-full text-center p-4 border border-dashed border-[#1A1A1A]/30 bg-[#F5F2ED]/60">
                    <CheckCircle2 className="mx-auto text-[#1A1A1A] mb-2 animate-bounce" size={40} />
                    <h3 className="font-serif italic text-sm text-[#1A1A1A] mb-1">
                      Silhouette Acquired
                    </h3>
                    <p className="font-mono text-[10px] text-[#1A1A1A]/60 truncate max-w-xs mx-auto mb-3">
                      {silhouetteName}
                    </p>
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={triggerFileUpload}
                        className="text-[10px] bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-[#F5F2ED] px-3 py-1.5 font-bold uppercase tracking-widest rounded-none transition-colors cursor-pointer"
                      >
                        Replace
                      </button>
                      <button
                        onClick={() => {
                          setSilhouetteFile(null);
                          setSilhouetteName('');
                          setShowResult(false);
                        }}
                        className="text-[10px] bg-[#E0DDD8] hover:bg-[#E0DDD8]/80 text-[#1A1A1A] px-3 py-1.5 font-bold uppercase tracking-widest rounded-none transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={triggerFileUpload}
                    className="w-full border-2 border-dashed border-[#1A1A1A]/15 bg-[#F5F2ED]/40 rounded-none p-8 flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-[#F5F2ED] text-center"
                  >
                    <Camera className="text-4xl mb-4 text-[#1A1A1A]/40 group-hover:text-[#1A1A1A] transition-colors" size={32} />
                    <h3 className="font-sans text-xs font-bold text-[#1A1A1A] mb-2 uppercase tracking-wide">
                      Upload Your Silhouette
                    </h3>
                    <p className="font-sans text-xs text-[#1A1A1A]/60 max-w-xs mx-auto mb-4">
                      Drag & drop a full-body photo, or click to browse. Standard strict privacy filters applied.
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        loadDemoSilhouette();
                      }}
                      className="text-[10px] uppercase tracking-[0.15em] font-bold bg-[#1A1A1A] text-[#F5F2ED] px-4 py-2 hover:bg-[#1A1A1A]/90 transition-colors rounded-none"
                    >
                      Use Demographics Template
                    </button>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Step 2: Select Garment */}
            <div className="bg-[#E0DDD8]/30 p-6 md:p-8 border border-[#1A1A1A]/10 shadow-sm flex flex-col relative overflow-hidden flex-grow justify-center rounded-none">
              <div className="absolute top-4 left-4 font-sans text-[9px] uppercase tracking-[0.2em] text-[#F5F2ED] bg-[#1A1A1A] px-3 py-1 font-bold z-10 rounded-none">
                STEP 02
              </div>

              <h3 className="font-sans text-xs font-bold text-[#1A1A1A] mt-6 mb-4 uppercase tracking-wider text-left">
                Select Bespoke Garment Line
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {TRY_ON_GARMENTS.map((garment) => {
                  const isSelected = selectedGarment.id === garment.id;
                  return (
                    <button
                      key={garment.id}
                      onClick={() => {
                        setSelectedGarment(garment);
                        setShowResult(false);
                      }}
                      className={`flex flex-col overflow-hidden border transition-all p-1 relative group cursor-pointer rounded-none ${
                        isSelected
                          ? 'border-[#1A1A1A] bg-[#F5F2ED]/60'
                          : 'border-transparent hover:border-[#1A1A1A]/20'
                      }`}
                    >
                      <div className="w-full aspect-[3/4] bg-[#E0DDD8] overflow-hidden relative">
                        <img
                          src={garment.image}
                          alt={garment.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transform group-hover:scale-102 transition-transform grayscale-[10%]"
                        />
                      </div>
                      <div className="p-2 text-center">
                        <p className="font-sans text-[9px] uppercase font-bold tracking-tight truncate text-[#1A1A1A]">
                          {garment.name}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: PREVIEW & THE CANVAS */}
          <div className="lg:col-span-7 bg-[#E0DDD8]/30 border border-[#1A1A1A]/10 shadow-sm relative overflow-hidden min-h-[500px] flex flex-col justify-between rounded-none">
            {/* Tag */}
            <div className="absolute top-4 left-4 font-sans text-[9px] uppercase tracking-[0.2em] text-[#F5F2ED] bg-[#1A1A1A] px-3 py-1 font-bold z-20 rounded-none">
              THE CANVAS
            </div>

            {/* Active Canvas Area */}
            <div className="flex-grow flex items-center justify-center bg-[#E0DDD8]/20 relative">
              {/* If no result generated yet */}
              {!showResult && !isProcessing && (
                <div className="text-center p-8">
                  <Sparkles className="mx-auto text-[#1A1A1A]/30 mb-3 animate-pulse" size={48} />
                  <h3 className="font-sans text-[10px] font-bold text-[#1A1A1A]/50 uppercase tracking-[0.2em]">
                    ATELIER ENGINE ONLINE
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/60 max-w-xs mx-auto mt-1 font-light">
                    Upload silhouette and click "Generate Look" in the action bar to run style mapping.
                  </p>
                </div>
              )}

              {/* Loading style mapping overlay */}
              {isProcessing && (
                <div className="absolute inset-0 bg-[#F5F2ED]/85 backdrop-blur-md z-30 flex flex-col items-center justify-center animate-fade-in">
                  <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
                    {/* Ring pulsing animation */}
                    <div className="absolute inset-0 rounded-full border-2 border-[#1A1A1A] animate-ping opacity-60"></div>
                    <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                      <RefreshCw className="text-[#F5F2ED] animate-spin" size={20} />
                    </div>
                  </div>
                  <h4 className="font-serif italic text-base text-[#1A1A1A] mb-1">
                    Processing Style...
                  </h4>
                  <p className="text-xs text-[#1A1A1A]/60 font-mono">
                    Mapping garment topology of {selectedGarment.tag} to silhouette.
                  </p>
                </div>
              )}

              {/* Render generated result */}
              {showResult && !isProcessing && (
                <div className="absolute inset-0 z-10 animate-fade-in w-full h-full">
                  <img
                    src={showBefore ? selectedGarment.image : selectedGarment.resultImage}
                    alt="Bespoke Try On Result"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-all duration-300 grayscale-[5%]"
                  />
                  
                  {/* Floating category banner */}
                  <div className="absolute bottom-4 left-4 bg-[#1A1A1A]/90 p-3 text-[#F5F2ED] border border-[#1A1A1A]/10">
                    <p className="text-[8px] uppercase tracking-[0.25em] text-[#F5F2ED]/60">Preview Mode</p>
                    <p className="font-sans text-[10px] font-bold uppercase tracking-wider">{showBefore ? 'Before (Flatlay)' : 'After (Style-Mapped Look)'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Action Bar */}
            <div className="h-24 bg-[#E0DDD8]/40 border-t border-[#1A1A1A]/10 flex items-center justify-between px-6 md:px-8 z-20">
              <div className="flex items-center gap-4">
                {showResult && (
                  <button
                    onClick={() => setShowBefore(!showBefore)}
                    className="text-[#1A1A1A] hover:text-[#1A1A1A]/70 transition-colors flex items-center gap-2 font-sans text-[10px] uppercase font-bold tracking-[0.15em] cursor-pointer"
                  >
                    <Eye size={15} />
                    <span>Before / After</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4">
                {!showResult ? (
                  <button
                    onClick={handleGenerate}
                    className="bg-[#1A1A1A] text-[#F5F2ED] hover:bg-[#1A1A1A]/90 font-sans text-[10px] uppercase font-bold tracking-[0.2em] px-8 py-4 shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-95 rounded-none border border-[#1A1A1A]"
                  >
                    <span>Generate Look</span>
                    <ArrowRight size={13} />
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        alert('High-resolution style portfolio downloaded successfully!');
                      }}
                      title="Download High-Res"
                      className="border border-[#1A1A1A]/20 text-[#1A1A1A] hover:bg-[#1A1A1A]/5 p-4 rounded-none cursor-pointer transition-colors"
                    >
                      <Download size={15} />
                    </button>
                    
                    <button
                      onClick={handlePurchaseLook}
                      className="bg-[#1A1A1A] hover:bg-[#1A1A1A]/90 text-[#F5F2ED] font-sans text-[10px] uppercase font-bold tracking-[0.2em] px-8 py-4 shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-95 rounded-none border border-[#1A1A1A]"
                    >
                      <ShoppingBag size={13} />
                      <span>Buy Now</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
