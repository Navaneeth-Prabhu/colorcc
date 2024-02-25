'use client'
import React, { useState } from 'react';
import NavBarComponent, { getMargin } from './navBarComponent';

const Layout = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="container">
      <NavBarComponent isExpanded={isExpanded} toggleMenu={toggleMenu} />
      <main className={`px-4 py-8 transition-all duration-300 ${isExpanded ? 'lg:ml-64' : 'lg:ml-16'}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

