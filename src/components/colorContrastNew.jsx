'use client'
import { useMyContext } from '@/context/store';
import React, { useEffect, useState } from 'react';
import ColorPickerComponent from './colorPickerComponent';
import CustomColorPicker from './customColorPicker';
import CustomColorPicker2 from './colorPickerComponent';
import ColorPicker from './reactColor';
import { useRouter } from 'next/navigation'; 
import { isValidHex } from '@/Utils/utils';

const ColorContrastComponent = ({ id }) => {
  const router = useRouter();

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
    <p style={{ color: 'black' }}>
      {label}: <span className='text-lg font-semibold'>{condition}</span>
    </p>
  );

  const setIdColors = (id) => {
    const [backgroundHex, foregroundHex] = id.split('-');
    const background = `#${backgroundHex}`;
    const foreground = `#${foregroundHex}`;

    setBackgroundColor(background);
    setForegroundColor(foreground);
  };

  useEffect(() => {
    // Check if id exists and call setIdColors
    if (id) {
      setIdColors(id);
    }
  }, [id]);

  // function handleBackgroundColorChange(color) {
  //   if (isValidHex(color)) {
  //     const normalizedBgColor = isValidHex(color);
  //     let bg = normalizedBgColor.replace(/^#/, '');
  //     let fg = foregroundColor.replace(/^#/, '');
  //     console.log(normalizedBgColor,'normal')
  //     setBackgroundColor(normalizedBgColor);
  //     router.push(`/contrast/${bg}-${fg}`,undefined,{shallow:true})
  //   }
  // }

  // function handleForegroundColorChange(color) {
  //   console.log('New foreground color:', color); // Check if the color value is correct
  //   if (isValidHex(color)) {
  //     const normalizedFgColor = isValidHex(color);
  //     console.log('Normalized foreground color:', normalizedFgColor); // Check if the normalized color is correct
  //     const bg = backgroundColor.replace(/^#/, '');
  //     const fg = normalizedFgColor.replace(/^#/, '');
  //     console.log('Background color:', bg); // Check the background color
  //     console.log('Foreground color:', fg); // Check the foreground color
  //     setForegroundColor(normalizedFgColor);
  //     router.push(`/contrast/${bg}-${fg}`, undefined, { shallow: true });
  //   }
  // }
  
  
  const handleBackgroundColorChange = (color) => {
    if (isValidHex(color)) {
          console.log(color, 'background color');
      const normalizedBgColor = isValidHex(color);
      let bg = normalizedBgColor.replace(/^#/, '');
      let fg = foregroundColor.replace(/^#/, '');
      console.log(normalizedBgColor,'normal')
      setBackgroundColor(normalizedBgColor);
      router.push(`/contrast/${bg}-${fg}`,undefined,{shallow:true})
    }
};

// Define the onChange handler for foreground color
const handleForegroundColorChange = (color) => {
        if (isValidHex(color)) {
      const normalizedFgColor = isValidHex(color);
      console.log('Normalized foreground color:', normalizedFgColor); // Check if the normalized color is correct
      const bg = backgroundColor.replace(/^#/, '');
      const fg = normalizedFgColor.replace(/^#/, '');
      console.log('Background color:', bg); // Check the background color
      console.log('Foreground color:', fg); // Check the foreground color
      setForegroundColor(normalizedFgColor);
      router.push(`/contrast/${bg}-${fg}`, undefined, { shallow: true });
    }
};


  

  return (
    <div className='h-screen mx-auto w-[1400px] pt-10'>
      <div className="w-full relative rounded-2xl">
        <div className="w-full h-96 rounded-3xl p-10 px-20 flex items-center justify-center" style={{ background: backgroundColor }} >
          <div className='flex flex-1 flex-col gap-6'>
            {/* <p className='text-5xl font-bold' style={{ color: foregroundColor }}>hello</p> */}
            <p className='text-2xl font-bold' style={{ color: foregroundColor }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto quibusdam et velit. Nobis, nulla qui itaque corrupti tempore assumenda iste. Commodi eos cumque assumenda, autem unde illum eius deserunt quod.</p>
            <p className='text-base ' style={{ color: foregroundColor }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto quibusdam et velit. Nobis, nulla qui itaque corrupti tempore assumenda iste. Commodi eos cumque assumenda, autem unde illum eius deserunt quod.</p>
          </div>
        </div>
      </div>
      <div className=" p-10 justify-center items-start gap-2.5 flex ">
        <div className=' flex  flex-col flex-1 gap-4 justify-start items-start lg:px-10 lg:gap-2 '>
          <p className='text-lg font-bold text-black mt-2'>Contrast : <span className='text-5xl'>{contrastRatio}</span></p>
          <div className='flex flex-col mt-4 md:flex-row md:gap-6'>
            {renderContrastStatus('smallTextAA', contrastPass?.AA)}
            {renderContrastStatus('smallTextAAA', contrastPass?.AAA)}
          </div>
          <div className='flex flex-col md:flex-row md:gap-6'>
            {renderContrastStatus('largeTextAA', contrastPass?.AALarge)}
            {renderContrastStatus('largeTextAAA', contrastPass?.AAALarge)}
          </div>
        </div>
        <div className='flex-col flex flex-1 '>

          <div className='flex flex-1 gap-4'>
            <label className='w-full'>
              <p className='text-black'>Text Color:</p>

              <CustomColorPicker
                defaultColor={foregroundColor}
                id='foregroundColor'
                onChange={handleForegroundColorChange} />
            </label>
            <label className='w-full'>
              <p className='text-black'>Background Color:</p>

              <CustomColorPicker
                defaultColor={backgroundColor}
                id='backgroundColor'
                onChange={handleBackgroundColorChange} />
            </label>

          </div>

          <div>
            {contrastRatio !== null && (
              <div className='flex-col gap-4 flex w-full mt-5'>
                <div className="flex flex-col sm:flex-row gap-4 md:mt-4 w-full">
                  <button
                    className='bg-black p-3 rounded-md md:w-fit w-full text-white' onClick={switchColors}>Switch Colors</button>

                  <button className='bg-black p-3 rounded-md md:w-fit w-full text-white'
                    onClick={() => saveColors()}
                  >Save Colors</button>
                  <button className='bg-black p-3 rounded-md md:w-fit w-full text-white'
                    onClick={() => saveColors()}
                  >Random</button>
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
              </div>
            )}
            <div>
            </div>





          </div>
        </div>
      </div>
    </div >
  );
};

export default ColorContrastComponent;


