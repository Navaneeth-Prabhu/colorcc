import ColorContrastComponent from '@/components/colorContrastNew';
import Layout from '@/components/layout';
import NavBarComponent from '@/components/navBarComponent';
import React from 'react';

export default function Home({ params }) {
  return (
    <Layout>
      <main className="container mx-auto px-4">
        <ColorContrastComponent id={params.id}></ColorContrastComponent>
      </main>
    </Layout>

  )
}

