'use client'
import { useMyContext } from '@/context/store';
import React, { useEffect, useState } from 'react';

const ColorContrast = () => {
  const { backgroundColor, foregroundColor, contrastPass, textColor, switchColors, setContrastPass, contrastRatio, enhanceContrast, handleColorSelection, saveColors, savedColors, setBackgroundColor, setForegroundColor } = useMyContext();

  const handleSaveColors = () => {
    saveColors(backgroundColor, foregroundColor);
  };


  return (
    <div className=' w-full flex-col gap-10 p-10' style={{ background: backgroundColor }}>
      <div className='py-5 px-10'>
        <h2 className='text-4xl font-semibold' style={{ color: contrastRatio < 3 ? textColor : foregroundColor }}>Color Contrast Checker</h2>
      </div>
      <div className=' w-full flex gap-10 p-10 flex-row'>
        <div className='flex flex-1 flex-col gap-6 '>
          <p className='text-5xl font-bold' style={{ color: foregroundColor }}>hello</p>
          <p className='text-2xl font-bold' style={{ color: foregroundColor }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto quibusdam et velit. Nobis, nulla qui itaque corrupti tempore assumenda iste. Commodi eos cumque assumenda, autem unde illum eius deserunt quod.</p>
          <p className='text-base ' style={{ color: foregroundColor }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto quibusdam et velit. Nobis, nulla qui itaque corrupti tempore assumenda iste. Commodi eos cumque assumenda, autem unde illum eius deserunt quod.</p>
        </div>

        <div className=' flex-1 flex flex-col justify-start items-start px-10 border-l-2 gap-2'>
          <p className='text-md font-bold' style={{ color: contrastRatio < 3 ? textColor : foregroundColor }}>Contrast Ratio: <span className='text-4xl'>{contrastRatio}</span></p>
          <div className='flex gap-4'>

            {contrastPass?.smallTextAA
              ? <p style={{ color: textColor }}>smallTextAA: <span className='text-lg font-semibold'>Pass</span></p>
              : <p style={{ color: textColor }}>smallTextAA: <span className='text-lg font-semibold'>Fail</span></p>}

            {contrastPass?.smallTextAAA
              ? <p style={{ color: textColor }}>smallTextAAA: <span className='text-lg font-semibold'>Pass</span></p>
              : <p style={{ color: textColor }}>smallTextAAA: <span className='text-lg font-semibold'>Fail</span></p>}
          </div>
          <div className='flex gap-4'>

            {contrastPass?.largeTextAA
              ? <p style={{ color: textColor }}>largeTextAA: <span className='text-lg font-semibold'>Pass</span></p>
              : <p style={{ color: textColor }}>largeTextAA: <span className='text-lg font-semibold'>Fail</span></p>}
            {contrastPass?.largeTextAAA
              ? <p style={{ color: textColor }}>largeTextAAA: <span className='text-lg font-semibold'>Pass</span></p>
              : <p style={{ color: textColor }}>largeTextAAA: <span className='text-lg font-semibold'>Fail</span></p>}
          </div>
          <div className='flex flex-row gap-4 mt-4 w-full'>

            <label>
              <p style={{ color: contrastRatio < 3 ? textColor : foregroundColor }}>Background Color:</p>
              <div className='bg-white border rounded-lg items-center flex h-12 w-[250px] overflow-hidden px-1 border-gray-400'>
                <input
                  type="text"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className='p-2 w-[200px]'
                />
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  id='style1'
                // className='h-8 w-8 rounded-md p-0 m-0'
                />
              </div>
            </label>

            <label className=''>
              <p style={{ color: contrastRatio < 3 ? textColor : foregroundColor }}>Foreground Color:</p>

              <div className='bg-white border rounded-lg items-center w-[250px] flex h-12 overflow-hidden px-1 border-gray-400'>
                <input
                  type="text"
                  value={foregroundColor}
                  onChange={(e) => setForegroundColor(e.target.value)}
                  className='p-2 w-[200px]'
                />
                <input
                  type="color"
                  value={foregroundColor}
                  onChange={(e) => setForegroundColor(e.target.value)}
                  id='style2'
                />
              </div>
            </label>
          </div>
          {contrastRatio !== null && (
            <div className='flex-col gap-4 mt-4 flex'>

              <div className="flex-row flex gap-4">

                <button 
                // style={{ color: contrastRatio < 3 ? textColor : foregroundColor }} 
                className='bg-black p-3 rounded-md text-white' onClick={switchColors}>Switch Colors</button>

                <button className='bg-black p-3 rounded-md text-white'
                  onClick={() => saveColors()}
                >save</button>
              </div>
              <div className="flex gap-2">
                {savedColors?.map((colorPair, index) => (
                  <button
                    key={index}
                    onClick={() => handleColorSelection(colorPair)}
                    style={{
                      backgroundColor: colorPair.backgroundColor,
                      color: colorPair.foregroundColor,
                    }}
                    className='p-3 border border-black font-extrabold rounded-md'
                  >
                    Aa
                  </button>
                ))}
              </div>

              {!contrastPass.smallText && !contrastPass.largeText && (
                <div className='flex-col gap-2' style={{ color: textColor }}>
                  <div>
                    <button onClick={() => enhanceContrast('background', contrastRatio)}>Enhance Background Contrast</button>
                  </div>
                  <div>
                    <button onClick={() => enhanceContrast('foreground', contrastRatio)}>Enhance Foreground Contrast</button>
                  </div>
                  <div>
                    <button onClick={() => enhanceContrast('both', contrastRatio)}>Enhance Both Contrasts</button>
                  </div>
                </div>
              )}

              {/* {contrastPass.smallText && contrastPass.largeText && <p>Contrast ratio passes both small and large text requirements.</p>}
        {contrastPass.smallText && !contrastPass.largeText && <p>Contrast ratio passes small text requirements.</p>}
        {!contrastPass.smallText && contrastPass.largeText && <p>Contrast ratio passes large text requirements.</p>} */}
            </div>
          )}

          {/* <div style={{ display: 'flex', alignItems: 'center' }}>
          {palette.map((color, index) => (
            <div
              key={index}
              style={{
                width: '50px',
                height: '50px',
                backgroundColor: color,
                marginRight: '5px',
              }}
            />
          ))}
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default ColorContrast;


