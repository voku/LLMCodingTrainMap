import React, { useEffect, useState, useRef } from 'react';
import { Station, TransitLine } from '../types';
import { X, ArrowRight, ArrowLeft, BookOpen, ChevronRight, ChevronDown } from 'lucide-react';
import { lines, stations } from '../data';

interface ContentDrawerProps {
  station: Station | null;
  line: TransitLine | null;
  onClose: () => void;
  onNext: () => void;
  onBack: () => void;
  onViewFullLine?: () => void;
  onStationSelect?: (station: Station) => void;
  hasNext: boolean;
  hasBack: boolean;
}

const ContentDrawer: React.FC<ContentDrawerProps> = ({ station, line, onClose, onNext, onBack, onViewFullLine, onStationSelect, hasNext, hasBack }) => {
  const [showContent, setShowContent] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Determine active item and animation state
  const activeItem = station || line;
  const activeColor = station 
    ? lines.find(l => l.id === station.lineId)?.color 
    : line?.color;
  const activeName = station ? station.name : line?.name;
  const activeDesc = station ? station.description : line?.description;
  const badgeText = station ? lines.find(l => l.id === station.lineId)?.name : 'Underground Guide';

  useEffect(() => {
    if (activeItem) {
      const timer = setTimeout(() => setShowContent(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [activeItem]);

  // When switching stations, scroll the new active accordion item into view
  useEffect(() => {
     if (station && scrollContainerRef.current) {
         // Small delay to allow render
         setTimeout(() => {
             const el = document.getElementById(`accordion-${station.id}`);
             if (el) {
                 el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
             }
         }, 100);
     }
  }, [station?.id]);

  const mobileClasses = `
    fixed inset-x-0 bottom-0 h-[85vh] w-full rounded-t-3xl
    transform transition-transform duration-500 cubic-bezier(0.2, 0.8, 0.2, 1) z-50 flex flex-col will-change-transform
    md:hidden shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)]
    ${activeItem ? 'translate-y-0' : 'translate-y-full'}
  `;

  const desktopClasses = `
    hidden md:flex fixed inset-y-0 right-0 w-[600px] 
    transform transition-transform duration-700 cubic-bezier(0.2, 0.8, 0.2, 1) z-50 flex-col will-change-transform
    shadow-2xl
    ${activeItem ? 'translate-x-0' : 'translate-x-full'}
  `;

  const renderContent = () => {
     if (line) {
         return line.fullContent;
     }
     if (station) {
         // Render Accordion List of all stations in this line
         const siblings = stations.filter(s => s.lineId === station.lineId);
         return (
             <div className="space-y-4">
                 <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Stations in this line</div>
                 {siblings.map((sibling) => {
                     const isActive = sibling.id === station.id;
                     return (
                         <div 
                           id={`accordion-${sibling.id}`}
                           key={sibling.id} 
                           className={`border rounded-xl transition-all duration-300 overflow-hidden ${isActive ? 'bg-white border-indigo-200 shadow-md ring-1 ring-indigo-50' : 'bg-slate-50 border-slate-200 hover:border-indigo-300'}`}
                         >
                             <button 
                                onClick={() => onStationSelect && onStationSelect(sibling)}
                                className={`w-full flex items-center justify-between p-4 text-left transition-colors ${isActive ? 'bg-indigo-50/50' : 'hover:bg-slate-100'}`}
                             >
                                 <div className="flex items-center gap-3">
                                     <div 
                                       className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}
                                     >
                                         {sibling.name.substring(0, 2)}
                                     </div>
                                     <div>
                                         <div className={`text-sm font-bold ${isActive ? 'text-indigo-900' : 'text-slate-700'}`}>{sibling.name}</div>
                                         <div className="text-[10px] text-slate-500 font-medium">{sibling.description}</div>
                                     </div>
                                 </div>
                                 <div className={`text-slate-400 transition-transform duration-300 ${isActive ? 'rotate-180 text-indigo-500' : ''}`}>
                                     <ChevronDown size={16} />
                                 </div>
                             </button>
                             
                             <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isActive ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                 <div className="p-4 md:p-6 border-t border-indigo-100/50">
                                    {sibling.content}
                                 </div>
                             </div>
                         </div>
                     );
                 })}
             </div>
         );
     }
     return null;
  };

  const DrawerContent = () => (
    <>
      {activeItem && (
          <>
            {/* Header */}
            <div className="h-32 md:h-48 relative shrink-0 overflow-hidden group">
               {/* Geometric Header Background */}
              <div 
                className="absolute inset-0 transition-transform duration-1000 ease-out scale-105 group-hover:scale-110" 
                style={{ backgroundColor: activeColor || '#334155' }}
              >
                 <div className="absolute top-0 right-0 p-12 opacity-10 animate-[spin_60s_linear_infinite]">
                   <svg width="200" height="200" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" fill="none" strokeDasharray="10 10" />
                      <path d="M 0 50 L 100 50 M 50 0 L 50 100" stroke="white" strokeWidth="2" />
                   </svg>
                 </div>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className={`absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white transition-all duration-700 delay-200 transform ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <div className="flex justify-between items-start absolute top-4 right-4 left-4 z-10">
                   <div className="bg-black/30 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider backdrop-blur-md border border-white/10 shadow-sm">
                     {badgeText}
                   </div>
                   <button 
                    onClick={onClose}
                    className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors backdrop-blur-md"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 leading-tight drop-shadow-md">{activeName}</h2>
                <p className="text-white/90 font-medium text-sm md:text-base line-clamp-1 md:line-clamp-none drop-shadow-sm">{activeDesc}</p>
              </div>
            </div>

            {/* Scrollable Content */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6 md:p-8 custom-scroll relative bg-white">
              <div className={`prose prose-slate prose-sm md:prose-base max-w-none transition-all duration-700 delay-300 transform ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                {renderContent()}
              </div>
            </div>

            {/* Footer Navigation */}
            <div className={`p-4 md:p-6 border-t border-slate-100 bg-slate-50 flex flex-wrap gap-3 justify-between items-center shrink-0 transition-all duration-700 delay-500 transform ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
               
               {/* Back Button */}
               <div className="flex-1 md:flex-none flex justify-start">
                   {hasBack ? (
                       <button 
                        onClick={onBack}
                        className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors font-semibold shadow-md active:scale-95 text-sm"
                       >
                         <ArrowLeft size={16} /> <span className="hidden sm:inline">Back</span>
                       </button>
                   ) : <div className="w-[88px]" />} 
               </div>

               {/* Full Line Guide Button (Center) */}
               {station && onViewFullLine && (
                   <button 
                    onClick={onViewFullLine}
                    className="flex-shrink-0 flex items-center gap-2 bg-indigo-50 text-indigo-700 border border-indigo-200 px-4 py-2.5 rounded-lg hover:bg-indigo-100 transition-colors font-semibold shadow-sm active:scale-95 text-sm"
                   >
                     <BookOpen size={16} /> <span>Read Guide</span>
                   </button>
               )}

               {/* Next Button */}
               <div className="flex-1 md:flex-none flex justify-end">
                   {hasNext ? (
                     <button 
                      onClick={onNext}
                      className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-lg hover:bg-slate-800 transition-colors font-semibold shadow-md active:scale-95 text-sm"
                     >
                       <span className="hidden sm:inline">Next</span> <ArrowRight size={16} />
                     </button>
                   ) : <div className="w-[88px]" />}
               </div>
            </div>
          </>
        )}
    </>
  );

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-500 md:hidden ${
          activeItem ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Mobile Bottom Sheet */}
      <div className={`${mobileClasses} bg-white`}>
        <div className="w-12 h-1.5 bg-slate-300 rounded-full self-center mt-3 mb-1 shrink-0 md:hidden" />
        <DrawerContent />
      </div>

      {/* Desktop Side Drawer */}
      <div className={`${desktopClasses} bg-white`}>
        <DrawerContent />
      </div>
    </>
  );
};

export default ContentDrawer;