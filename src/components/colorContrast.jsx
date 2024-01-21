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

  return (
    <div className='h-screen ' style={{ background: backgroundColor }}>
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

              {contrastPass?.smallTextAA
                ? <p style={{ color: contrastRatio < 3 ? textColor : foregroundColor }}>smallTextAA: <span className='text-lg font-semibold'>Pass</span></p>
                : <p style={{ color: contrastRatio < 3 ? textColor : foregroundColor }}>smallTextAA: <span className='text-lg font-semibold'>Fail</span></p>}

              {contrastPass?.smallTextAAA
                ? <p style={{ color: contrastRatio < 3 ? textColor : foregroundColor }}>smallTextAAA: <span className='text-lg font-semibold'>Pass</span></p>
                : <p style={{ color: contrastRatio < 3 ? textColor : foregroundColor }}>smallTextAAA: <span className='text-lg font-semibold'>Fail</span></p>}
            </div>
            <div className='flex flex-col md:flex-row md:gap-4'>

              {contrastPass?.largeTextAA
                ? <p style={{ color: contrastRatio < 3 ? textColor : foregroundColor }}>largeTextAA: <span className='text-lg font-semibold'>Pass</span></p>
                : <p style={{ color: contrastRatio < 3 ? textColor : foregroundColor }}>largeTextAA: <span className='text-lg font-semibold'>Fail</span></p>}
              {contrastPass?.largeTextAAA
                ? <p style={{ color: contrastRatio < 3 ? textColor : foregroundColor }}>largeTextAAA: <span className='text-lg font-semibold'>Pass</span></p>
                : <p style={{ color: contrastRatio < 3 ? textColor : foregroundColor }}>largeTextAAA: <span className='text-lg font-semibold'>Fail</span></p>}
            </div>
            <div className='flex flex-col sm:flex-row gap-4 md:mt-4 w-full'>
              <label>
                <p style={{ color: contrastRatio < 3 ? textColor : foregroundColor }}>Background Color:</p>
                <div className='bg-white border justify-between rounded-lg items-center flex h-12 md:w-[250px] overflow-hidden px-1 border-gray-400'>
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className='p-2 md:w-[200px]'
                    id='input1'
                  />
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    id='style1'
                  />
                </div>
                <CustomColorPicker
                  defaultColor={backgroundColor}
                  color={backgroundColor}
                  type='backgroundColor'
                  onChange={(color) => setBackgroundColor(color)} />
              </label>

              <label className=''>
                <p style={{ color: contrastRatio < 3 ? textColor : foregroundColor }}>Foreground Color:</p>

                <div className='bg-white border justify-between rounded-lg items-center md:w-[250px] flex h-12 overflow-hidden px-1 border-gray-400'>
                  <input
                    type="text"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    className='p-2 sm:w-full md:w-[200px]'
                    id='input2'
                  />
                  <input
                    type="color"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    id='style2'
                  />

                </div>

                <CustomColorPicker
                  defaultColor={foregroundColor}
                  color={foregroundColor}
                  type='foregroundColor'
                  onChange={(color) => setForegroundColor(color)} />
              </label>
              {/* <ColorPicker></ColorPicker> */}

            </div>
            {contrastRatio !== null && (
              <div className='flex-col gap-4 flex w-full'>
                <div className="flex flex-col sm:flex-row gap-4 md:mt-4 w-full">
                  <button
                    // style={{ color: contrastRatio < 3 ? textColor : foregroundColor }} 
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

            <div style={{ display: 'flex', alignItems: 'center' }}>
              {palette.map((color, index) => (
                <div className='flex flex-col'>
                <div
                  key={index}
                  style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: color,
                    // marginRight: '5px',
                  }}
                />
                <label>{color}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorContrastComponent;


