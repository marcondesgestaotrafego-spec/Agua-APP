import React from 'react';

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  features: string[];
  type: 'gas' | 'water' | 'other';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  groundingChunks?: any[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}