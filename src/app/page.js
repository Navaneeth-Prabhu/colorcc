'use client'
import { useMyContext } from '@/context/store';
import React, { useEffect, useState } from 'react';
import ColorContrastComponent from '../components/colorContrast';

export default function Home() {
  const { backgroundColor } = useMyContext();
  return (
    <main className="flex min-h-screen " style={{ background: backgroundColor }}>
      <ColorContrastComponent></ColorContrastComponent>
    </main>
  )
}
