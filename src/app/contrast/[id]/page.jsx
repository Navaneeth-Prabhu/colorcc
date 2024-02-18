import ColorContrastComponent from '@/components/colorContrastNew';
import React from 'react';

export default function Home({params}) {
  return (
    <main className="flex min-h-screen ">
      <ColorContrastComponent id={params.id}></ColorContrastComponent>
    </main>
  )
}

