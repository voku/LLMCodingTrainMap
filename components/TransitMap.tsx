import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { lines, stations } from '../data';
import { Station, TransitLine } from '../types';
import { Maximize, Map as MapIcon, ChevronLeft, BookOpen } from 'lucide-react';

interface TransitMapProps {
  onStationSelect: (station: Station) => void;
  onLineSelect: (line: TransitLine) => void;
  selectedStationId: string | null;
  selectedLineId: string | null;
}

const TransitMap: React.FC<TransitMapProps> = ({ onStationSelect, onLineSelect, selectedStationId, selectedLineId }) => {
  const [hoveredStation, setHoveredStation] = useState<string | null>(null);
  const [isLegendOpen, setIsLegendOpen] = useState(true);

  // SVG Configuration
  const width = 1000;
  const height = 1500; // Increased height for Foundation Line + Exit tail

  // Viewport State
  const transformRef = useRef({ x: 0, y: 0, k: 1 });
  const groupRef = useRef<SVGGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  const isDragging = useRef(false);
  const lastPoint = useRef({ x: 0, y: 0 });
  const initialPinchDistance = useRef<number | null>(null);
  const initialTransform = useRef({ x: 0, y: 0, k: 1 });
  const animationFrameRef = useRef<number>(0);
  const targetTransform = useRef<{ x: number, y: number, k: number } | null>(null);
  const isMobileRef = useRef(false);
  const [, forceRender] = useState({});

  useEffect(() => {
    const checkMobile = () => {
       const mobile = window.innerWidth < 768;
       if (isMobileRef.current !== mobile) {
           isMobileRef.current = mobile;
           if (mobile) {
               setIsLegendOpen(false);
           }
           forceRender({});
       }
    };
    if (typeof window !== 'undefined') {
        checkMobile();
        window.addEventListener('resize', checkMobile);
    }
    return () => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', checkMobile);
        }
    };
  }, []);

  const applyTransform = () => {
    if (groupRef.current) {
      const { x, y, k } = transformRef.current;
      groupRef.current.style.transform = `translate(${x}px, ${y}px) scale(${k})`;
    }
  };

  useLayoutEffect(() => {
    applyTransform();
  }, []);

  const startAnimation = (target: { x: number, y: number, k: number }) => {
    targetTransform.current = target;
    const animate = () => {
      if (!targetTransform.current) return;
      const prev = transformRef.current;
      const tgt = targetTransform.current;
      const dx = tgt.x - prev.x;
      const dy = tgt.y - prev.y;
      const dk = tgt.k - prev.k;
      const factor = 0.12; 
      const nextX = prev.x + dx * factor;
      const nextY = prev.y + dy * factor;
      const nextK = prev.k + dk * factor;

      transformRef.current = { x: nextX, y: nextY, k: nextK };
      applyTransform();

      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && Math.abs(dk) < 0.001) {
           targetTransform.current = null; 
           transformRef.current = tgt;
           applyTransform();
           return;
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const focusStation = (stationId: string) => {
    const station = stations.find(s => s.id === stationId);
    if (!station) return;
    const isMobile = isMobileRef.current;
    const k = isMobile ? 1.4 : 1.8; 
    const containerW = containerRef.current?.clientWidth || window.innerWidth;
    const containerH = containerRef.current?.clientHeight || window.innerHeight;
    const targetSvgCx = containerW / 2;
    const targetSvgCy = isMobile ? containerH * 0.4 : containerH / 2;
    const targetX = targetSvgCx - station.x * k;
    const targetY = targetSvgCy - station.y * k;
    startAnimation({ x: targetX, y: targetY, k });
  };

  const focusLine = (lineId: string) => {
    const lineStations = stations.filter(s => s.lineId === lineId);
    if (lineStations.length === 0) return;
    
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    lineStations.forEach(s => {
        if (s.x < minX) minX = s.x;
        if (s.x > maxX) maxX = s.x;
        if (s.y < minY) minY = s.y;
        if (s.y > maxY) maxY = s.y;
    });

    const padding = 100;
    const boxW = (maxX - minX) + padding * 2;
    const boxH = (maxY - minY) + padding * 2;
    const centerX = minX + (maxX - minX) / 2;
    const centerY = minY + (maxY - minY) / 2;

    const containerW = containerRef.current?.clientWidth || window.innerWidth;
    const containerH = containerRef.current?.clientHeight || window.innerHeight;
    
    const sidebarOffset = (!isMobileRef.current && isLegendOpen) ? 280 : 0;
    const availableW = containerW - sidebarOffset;

    const scaleX = availableW / boxW;
    const scaleY = containerH / boxH;
    let k = Math.min(scaleX, scaleY);
    k = Math.max(0.4, Math.min(2, k));

    const visualCenterX = sidebarOffset + (availableW / 2);
    const visualCenterY = containerH / 2;

    const targetX = visualCenterX - centerX * k;
    const targetY = visualCenterY - centerY * k;

    startAnimation({ x: targetX, y: targetY, k });
    
    if (isMobileRef.current) {
        setIsLegendOpen(false);
    }
  };

  useEffect(() => {
    if (selectedStationId) {
        focusStation(selectedStationId);
    } else if (selectedLineId) {
        focusLine(selectedLineId);
    }
  }, [selectedStationId, selectedLineId]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    targetTransform.current = null;
    cancelAnimationFrame(animationFrameRef.current);
    const prev = transformRef.current;
    const scaleFactor = 1 - e.deltaY * 0.001;
    const newK = Math.max(0.2, Math.min(8, prev.k * scaleFactor));
    const cx = (containerRef.current?.clientWidth || 1000) / 2;
    const cy = (containerRef.current?.clientHeight || 800) / 2;
    const newX = cx - (cx - prev.x) * (newK / prev.k);
    const newY = cy - (cy - prev.y) * (newK / prev.k);
    transformRef.current = { x: newX, y: newY, k: newK };
    applyTransform();
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    targetTransform.current = null;
    cancelAnimationFrame(animationFrameRef.current);
    isDragging.current = true;
    lastPoint.current = { x: e.clientX, y: e.clientY };
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (tooltipRef.current) {
        tooltipRef.current.style.transform = `translate(${e.clientX + 16}px, ${e.clientY + 16}px)`;
    }
    if (!isDragging.current) return;
    const dx = e.clientX - lastPoint.current.x;
    const dy = e.clientY - lastPoint.current.y;
    lastPoint.current = { x: e.clientX, y: e.clientY };
    const prev = transformRef.current;
    const newX = prev.x + dx;
    const newY = prev.y + dy;
    transformRef.current = { ...prev, x: newX, y: newY };
    applyTransform();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    if ((e.target as Element).hasPointerCapture(e.pointerId)) {
      (e.target as Element).releasePointerCapture(e.pointerId);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      targetTransform.current = null;
      cancelAnimationFrame(animationFrameRef.current);
      const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      initialPinchDistance.current = dist;
      initialTransform.current = { ...transformRef.current };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDistance.current) {
      e.preventDefault();
      const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
      const scaleFactor = dist / initialPinchDistance.current;
      const initial = initialTransform.current;
      const newK = Math.max(0.2, Math.min(8, initial.k * scaleFactor));
      const cx = (containerRef.current?.clientWidth || 1000) / 2;
      const cy = (containerRef.current?.clientHeight || 800) / 2;
      const newX = cx - (cx - initial.x) * (newK / initial.k);
      const newY = cy - (cy - initial.y) * (newK / initial.k);
      transformRef.current = { x: newX, y: newY, k: newK };
      applyTransform();
    }
  };

  const resetView = () => {
    const containerW = containerRef.current?.clientWidth || window.innerWidth;
    const containerH = containerRef.current?.clientHeight || window.innerHeight;
    const scaleX = containerW / 1200;
    const scaleY = containerH / 1000;
    const k = Math.min(scaleX, scaleY, 1);
    const targetX = (containerW - 1000 * k) / 2;
    const targetY = (containerH - 800 * k) / 2;
    startAnimation({ x: targetX, y: targetY, k });
  };

  const getLabelProps = (station: Station, radius: number) => {
     const placement = station.labelPlacement || 'right';
     const gap = 12;
     let x = station.x, y = station.y;
     let anchor: "start" | "middle" | "end" = "start";
     let baseline: "auto" | "middle" = "middle";
     switch (placement) {
         case 'top': y = station.y - radius - gap; anchor = "middle"; baseline = "auto"; break;
         case 'bottom': y = station.y + radius + gap + 10; anchor = "middle"; break;
         case 'left': x = station.x - radius - gap; anchor = "end"; break;
         case 'right': x = station.x + radius + gap; anchor = "start"; break;
         case 'top-right': x = station.x + radius + gap * 0.5; y = station.y - radius - gap * 0.5; anchor = "start"; break;
         case 'top-left': x = station.x - radius - gap * 0.5; y = station.y - radius - gap * 0.5; anchor = "end"; break;
         case 'bottom-right': x = station.x + radius + gap * 0.5; y = station.y + radius + gap + 4; anchor = "start"; break;
         case 'bottom-left': x = station.x - radius - gap * 0.5; y = station.y + radius + gap + 4; anchor = "end"; break;
     }
     return { x, y, anchor, baseline };
  };

  const activeStation = stations.find(s => s.id === hoveredStation);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full overflow-hidden bg-white relative touch-none"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => { initialPinchDistance.current = null; }}
    >
      <div ref={tooltipRef} className={`fixed top-0 left-0 z-50 pointer-events-none transition-opacity duration-150 ${hoveredStation ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 max-w-[240px]">
            {activeStation && (
                <>
                    <h3 className="font-bold text-slate-900 text-sm mb-0.5">{activeStation.name}</h3>
                    <p className="text-[11px] leading-relaxed text-slate-500">{activeStation.description}</p>
                </>
            )}
        </div>
      </div>

      <div className={`absolute top-0 left-0 bottom-0 z-20 bg-white/95 backdrop-blur-md border-r border-slate-200 shadow-2xl transition-transform duration-300 ease-in-out w-72 flex flex-col ${isLegendOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
           <div>
             <h1 className="text-slate-900 font-extrabold text-lg tracking-tight">Transit Map</h1>
             <p className="text-slate-500 text-xs font-medium">Underground Guides</p>
           </div>
           <button onClick={() => setIsLegendOpen(false)} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors md:hidden">
             <ChevronLeft size={20} />
           </button>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scroll p-3 space-y-1">
          {lines.map(line => (
             <button 
               key={line.id} 
               onClick={() => onLineSelect(line)}
               className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 transition-all group text-left border border-transparent hover:border-slate-200"
             >
               <div className="w-3 h-3 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: line.color }}></div>
               <div className="flex-1 min-w-0">
                 <span className="text-xs font-bold text-slate-700 block truncate group-hover:text-slate-900">{line.name}</span>
                 <span className="text-[10px] text-slate-400 block truncate leading-tight group-hover:text-slate-500">{line.description}</span>
               </div>
               {line.fullContent && <BookOpen size={14} className="text-slate-300 group-hover:text-indigo-500" />}
             </button>
          ))}
        </div>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-[10px] text-slate-400 text-center">
            Click lines for guides • Drag to pan
        </div>
      </div>

      <div className={`absolute top-4 left-4 z-20 transition-all duration-300 ${isLegendOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
         <button onClick={() => setIsLegendOpen(true)} className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-slate-200 text-slate-700 hover:bg-white hover:scale-105 transition-all">
           <MapIcon size={20} />
         </button>
      </div>

      <div className={`absolute bottom-6 right-6 z-10 flex flex-col gap-2 transition-all duration-300 ${selectedStationId || selectedLineId ? 'translate-y-[-65vh] md:translate-y-0' : ''}`}>
        <button onClick={resetView} onPointerDown={(e) => e.stopPropagation()} className="bg-white text-slate-700 p-3 rounded-full shadow-lg border border-slate-100 hover:bg-slate-50 transition-colors active:scale-95" title="Fit to Screen">
            <Maximize size={24} />
        </button>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full cursor-grab active:cursor-grabbing" preserveAspectRatio="xMidYMid meet" style={{ touchAction: 'none' }}>
        <g ref={groupRef} className="origin-top-left will-change-transform">
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="1"/>
          </pattern>
          <rect width="2000" height="2000" x="-500" y="-500" fill="url(#grid)" />

          {lines.map((line) => {
             // Dim logic: if station selected, dim other lines. if line selected, dim other lines.
             const isRelevant = 
                (!selectedStationId && !selectedLineId) || 
                (selectedStationId && stations.find(s => s.id === selectedStationId)?.lineId === line.id) ||
                (selectedLineId === line.id);

             return (
              <g key={line.id} className={`transition-opacity duration-700 ease-in-out ${isRelevant ? 'opacity-100' : 'opacity-15'}`}>
                 <path d={line.path} fill="none" stroke={line.color} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                 <path d={line.path} fill="none" stroke="white" strokeWidth="2" strokeDasharray="0,20" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
              </g>
            );
          })}

          {stations.map((station) => {
            const isSelected = selectedStationId === station.id;
            const isHovered = hoveredStation === station.id;
            const lineColor = lines.find(l => l.id === station.lineId)?.color || '#94a3b8';
            
            // Dim logic for stations
            const isRelevantLine = (!selectedStationId && !selectedLineId) || 
                                   (selectedStationId && stations.find(s => s.id === selectedStationId)?.lineId === station.lineId) ||
                                   (selectedLineId === station.lineId);
            
            const isDimmed = !isRelevantLine || (selectedStationId && !isSelected);

            let radius = 14;
            let strokeWidth = 5;
            if (station.type === 'hub') { radius = 24; strokeWidth = 6; } 
            else if (station.type === 'terminus') { radius = 18; strokeWidth = 6; }

            const labelProps = getLabelProps(station, radius);

            return (
              <g key={station.id} onClick={(e) => { e.stopPropagation(); onStationSelect(station); }} onPointerDown={(e) => e.stopPropagation()} onMouseEnter={() => setHoveredStation(station.id)} onMouseLeave={() => setHoveredStation(null)}
                className={`cursor-pointer transition-all duration-500 ${isDimmed ? 'opacity-30 grayscale' : 'opacity-100'}`}
                style={{ transformOrigin: `${station.x}px ${station.y}px`, transform: isSelected ? 'scale(1.3)' : isHovered ? 'scale(1.1)' : 'scale(1)' }}>
                <circle cx={station.x} cy={station.y} r={radius * 2.5} fill="transparent" />
                {isSelected && (
                   <circle cx={station.x} cy={station.y} r={radius} fill="none" stroke={lineColor} strokeWidth="3" opacity="0.5">
                     <animate attributeName="r" from={radius} to={radius * 2} dur="1.5s" repeatCount="indefinite" />
                     <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
                   </circle>
                )}

                <circle cx={station.x} cy={station.y} r={radius} fill="white" stroke={lineColor} strokeWidth={strokeWidth} />

                <text 
                    x={labelProps.x} 
                    y={labelProps.y} 
                    textAnchor={labelProps.anchor} 
                    dominantBaseline={labelProps.baseline}
                    className={`text-[12px] font-bold fill-slate-900 pointer-events-none select-none transition-opacity duration-300 ${isDimmed ? 'opacity-50' : 'opacity-100'}`} 
                    style={{ textShadow: '0 2px 4px white, 0 0 8px white, 0 0 4px white' }}
                >
                  {station.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default TransitMap;