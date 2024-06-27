// src/types/react-hexgrid.d.ts
declare module 'react-hexgrid' {
    import * as React from 'react';
  
    interface HexGridProps {
      width: number;
      height: number;
      viewBox?: string;
      children: React.ReactNode;
    }
  
    interface LayoutProps {
      size: { x: number; y: number };
      flat: boolean;
      spacing: number;
      origin?: { x: number; y: number };
      children: React.ReactNode;
    }
  
    interface HexagonProps {
      q: number;
      r: number;
      s: number;
      className?: string;
      children?: React.ReactNode;
      onClick?: () => void;
    }
  
    interface TextProps {
      x?: number;
      y?: number;
      children: React.ReactNode;
    }
  
    export class HexGrid extends React.Component<HexGridProps> {}
    export class Layout extends React.Component<LayoutProps> {}
    export class Hexagon extends React.Component<HexagonProps> {}
    export class Text extends React.Component<TextProps> {}
  }
  