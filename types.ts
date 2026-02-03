import React from 'react';

export interface Station {
  id: string;
  name: string;
  x: number;
  y: number;
  type: 'hub' | 'stop' | 'terminus';
  lineId: string;
  description: string;
  content: React.ReactNode;
  labelPlacement?: 'top' | 'bottom' | 'left' | 'right' | 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
}

export interface TransitLine {
  id: string;
  name: string;
  color: string;
  path: string; // SVG d attribute
  description: string;
  fullContent?: React.ReactNode;
}

export enum LineColor {
  Foundation = '#0f172a',  // Foundation (Slate 900)
  Start = '#6366f1',       // S0 (Indigo)
  LaneA = '#854d0e',       // Lane A: Legacy (Brown)
  LaneB = '#a855f7',       // Lane B: Vibe (Purple)
  LaneC = '#f97316',       // Lane C: Agentic (Orange)
  LaneD = '#64748b',       // Lane D: IDE (Slate)
  Exit = '#10b981',        // Shared Exit (Emerald)
}