'use client'
import { useMyContext } from '@/context/store';
import React, { useEffect, useState } from 'react';
import ColorPickerComponent from './colorPickerComponent';
import CustomColorPicker from './customColorPicker';
import CustomColorPicker2 from './colorPickerComponent';
import ColorPicker from './reactColor';


const ColorContrastComponent = () => {
  const { backgroundColor,
    foregroundColor,
    contrastPass,
    textColor,
    switchColors,
    setContrastPass,
    contrastRatio,
    enhanceContrast,
    handleColorSelection,
    saveColors,
    savedColors,
    setBackgroundColor,
    setForegroundColor, palette } = useMyContext();

  const renderContrastStatus = (label, condition) => (
    <p style={{ color: contrastRatio < 3 ? textColor : foregroundColor }}>
      {label}: <span className='text-lg font-semibold'>{condition ? 'Pass' : 'Fail'}</span>
    </p>
  );


  return (
    <div className='h-auto m-auto' style={{ background: backgroundColor }}>
      <div className=' w-full  flex flex-col gap-4 p-7 md:p-10 max-w-[1440px] m-auto'>
        <div className=' lg:py-5 lg:px-10'>
          <h2 className='text-3xl md:text-4xl font-semibold' style={{ color: contrastRatio < 3 ? textColor : foregroundColor }}>Color Contrast Checker</h2>
        </div>
        <div className=' w-full flex md:gap-10  lg:p-10 lg:flex-row flex-col-reverse flex-1'>
          <div className='flex flex-1 flex-col gap-6'>
            <p className='text-5xl font-bold' style={{ color: foregroundColor }}>hello</p>
            <p className='text-2xl font-bold' style={{ color: foregroundColor }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto quibusdam et velit. Nobis, nulla qui itaque corrupti tempore assumenda iste. Commodi eos cumque assumenda, autem unde illum eius deserunt quod.</p>
            <p className='text-base ' style={{ color: foregroundColor }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto quibusdam et velit. Nobis, nulla qui itaque corrupti tempore assumenda iste. Commodi eos cumque assumenda, autem unde illum eius deserunt quod.</p>
          </div>

          <div className=' flex  flex-col flex-1 gap-4 justify-start items-start lg:px-10 lg:border-l-2 lg:gap-2'>
            <p className='text-md font-bold' style={{ color: contrastRatio < 3 ? textColor : foregroundColor }}>Contrast : <span className='text-5xl'>{contrastRatio}</span></p>
            <div className='flex flex-col md:flex-row md:gap-4'>
              {renderContrastStatus('smallTextAA', contrastPass?.smallTextAA)}
              {renderContrastStatus('smallTextAAA', contrastPass?.smallTextAAA)}
            </div>
            <div className='flex flex-col md:flex-row md:gap-4'>
              {renderContrastStatus('largeTextAA', contrastPass?.largeTextAA)}
              {renderContrastStatus('largeTextAAA', contrastPass?.largeTextAAA)}
            </div>

            <div className='flex flex-col sm:flex-row gap-4 md:mt-4 w-full'>
              <label className='w-full'>
                <p style={{ color: contrastRatio < 3 ? textColor : foregroundColor }}>Background Color:</p>

                <CustomColorPicker
                  defaultColor={backgroundColor}
                  color={backgroundColor}
                  type='backgroundColor'
                  onChange={(color) => setBackgroundColor(color)} />
              </label>

              <label className='w-full'>
                <p style={{ color: contrastRatio < 3 ? textColor : foregroundColor }}>Foreground Color:</p>
                <CustomColorPicker
                  defaultColor={foregroundColor}
                  color={foregroundColor}
                  type='foregroundColor'
                  onChange={(color) => setForegroundColor(color)} />
              </label>

            </div>
            {contrastRatio !== null && (
              <div className='flex-col gap-4 flex w-full mt-5'>
                <div className="flex flex-col sm:flex-row gap-4 md:mt-4 w-full">
                  <button
                    className='bg-black p-3 rounded-md md:w-fit w-full text-white' onClick={switchColors}>Switch Colors</button>

                  <button className='bg-black p-3 rounded-md md:w-fit w-full text-white'
                    onClick={() => saveColors()}
                  >Save Colors</button>
                </div>
                <div className="flex gap-2 flex-wrap">
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

                {!contrastPass.smallTextAA && !contrastPass.largeTextAA && (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorContrastComponent;


