import React, { useState } from 'react';
import TransitMap from './components/TransitMap';
import ContentDrawer from './components/ContentDrawer';
import { stations, lines } from './data';
import { Station, TransitLine } from './types';
import { Map, Github } from 'lucide-react';

export default function App() {
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const [selectedLineId, setSelectedLineId] = useState<string | null>(null);
  
  const selectedStation = stations.find(s => s.id === selectedStationId) || null;
  const selectedLine = lines.find(l => l.id === selectedLineId) || null;

  const handleStationSelect = (station: Station) => {
    setSelectedLineId(null); // Clear line selection if station is clicked
    setSelectedStationId(station.id);
  };

  const handleLineSelect = (line: TransitLine) => {
    setSelectedStationId(null); // Clear station selection if line is clicked
    setSelectedLineId(line.id);
  };

  // Jump from a specific station to its parent line guide
  const handleViewFullLine = () => {
    if (selectedStation) {
      const lineId = selectedStation.lineId;
      const line = lines.find(l => l.id === lineId);
      if (line) {
        setSelectedStationId(null);
        setSelectedLineId(lineId);
      }
    }
  };

  const closeDrawer = () => {
      setSelectedStationId(null);
      setSelectedLineId(null);
  };

  // Navigation Logic
  const currentIndex = selectedStation ? stations.findIndex(s => s.id === selectedStationId) : -1;
  const hasNext = selectedStation && currentIndex >= 0 && currentIndex < stations.length - 1;
  const hasBack = selectedStation && currentIndex > 0;

  const handleNext = () => {
    if (hasNext) {
      setSelectedStationId(stations[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
      if (hasBack) {
          setSelectedStationId(stations[currentIndex - 1].id);
      }
  };

  return (
    <div className="flex h-screen w-screen bg-white overflow-hidden relative font-sans">
      {/* GitHub Contribution Link */}
      <a 
        href="https://github.com/voku/LLMCodingTrainMap" 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute top-4 right-4 z-20 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-all active:scale-95 text-sm font-medium"
        title="Contribute on GitHub"
      >
        <Github size={18} />
        <span className="hidden sm:inline">Contribute</span>
      </a>

      {/* Main Map Area */}
      <div className="flex-1 relative z-0">
        <TransitMap 
          onStationSelect={handleStationSelect}
          onLineSelect={handleLineSelect}
          selectedStationId={selectedStationId}
          selectedLineId={selectedLineId}
        />
      </div>

      {/* Interaction Panel */}
      <ContentDrawer 
        station={selectedStation} 
        line={selectedLine}
        onClose={closeDrawer}
        onNext={handleNext}
        onBack={handleBack}
        onViewFullLine={handleViewFullLine}
        onStationSelect={handleStationSelect}
        hasNext={Boolean(hasNext)}
        hasBack={Boolean(hasBack)}
      />

      {/* Start Guide Button (Only visible if nothing selected) */}
      {!selectedStationId && !selectedLineId && (
        <div className="absolute bottom-12 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce w-max">
          <button 
            onClick={() => setSelectedStationId(stations[0].id)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full shadow-xl shadow-indigo-200 font-bold flex items-center gap-2 transition-all active:scale-95 border-2 border-white/20 ring-2 ring-indigo-100"
          >
            <Map size={20} /> Start Tour
          </button>
        </div>
      )}
    </div>
  );
}