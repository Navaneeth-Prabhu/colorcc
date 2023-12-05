'use client'
import React, { useEffect, useState } from 'react';

const ColorContrast = () => {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [contrastRatio, setContrastRatio] = useState(null);
  const [contrastPass, setContrastPass] = useState(null);

  useEffect(() => {
    calculateContrastRatio();
  }, [backgroundColor, foregroundColor]);

  const calculateContrastRatio = () => {
    const hexToRgb = (hex) => {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return [r, g, b];
    };

    const rgbToLuminance = (rgb) => {
      const srgb = (c) => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      };
      const gamma = (c) => srgb(c) * 255;
      return 0.2126 * gamma(rgb[0]) + 0.7152 * gamma(rgb[1]) + 0.0722 * gamma(rgb[2]);
    };

    const bgRgb = hexToRgb(backgroundColor);
    const fgRgb = hexToRgb(foregroundColor);

    const bgLuminance = rgbToLuminance(bgRgb) / 255;
    const fgLuminance = rgbToLuminance(fgRgb) / 255;

    const contrast = (l1, l2) => {
      const lighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);
      return (lighter + 0.05) / (darker + 0.05);
    };

    const ratio = contrast(bgLuminance, fgLuminance);
    setContrastRatio(ratio.toFixed(2));

    const contrastPassSmallText = ratio >= 4.5;
    const contrastPassLargeText = ratio >= 3;

    setContrastPass({
      smallText: contrastPassSmallText,
      largeText: contrastPassLargeText,
    });
  };

  const enhanceContrast = (type) => {
    const hexToRgb = (hex) => {
      const bigint = parseInt(hex.slice(1), 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return [r, g, b];
    };

    const rgbToHex = (rgb) => {
      const [r, g, b] = rgb;
      const toHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    const enhanceColor = (color) => {
      const colorRgb = hexToRgb(color);

      // Enhance the color by inverting it
      const enhancedRgb = colorRgb.map((c) => 255 - c);

      return rgbToHex(enhancedRgb);
    };

    let newBackgroundColor = backgroundColor;
    let newForegroundColor = foregroundColor;

    switch (type) {
      case 'background':
        newBackgroundColor = enhanceColor(backgroundColor);
        break;
      case 'foreground':
        newForegroundColor = enhanceColor(foregroundColor);
        break;
      case 'both':
        newBackgroundColor = enhanceColor(backgroundColor);
        newForegroundColor = enhanceColor(foregroundColor);
        break;
      default:
        break;
    }

    setBackgroundColor(newBackgroundColor);
    setForegroundColor(newForegroundColor);
  };

  const switchColors = () => {
    const temp = backgroundColor;
    setBackgroundColor(foregroundColor);
    setForegroundColor(temp);
  };

  return (
    <div className='bg-slate-500 w-full flex gap-10 p-10' style={{ background: backgroundColor }}>
      <div className='flex-1'>
        <label>
          Background Color:
          <div  className='bg-white border rounded-lg items-center flex h-12 w-fit overflow-hidden px-1'>
          <input
            type="text"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className='p-2'
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
        <br />
        <label className=''>
          Foreground Color:
         <div className='bg-white border rounded-lg items-center flex h-12 w-fit overflow-hidden px-1'>
          <input
            type="text"
            value={foregroundColor}
            onChange={(e) => setForegroundColor(e.target.value)}
            className='p-2'
          />
           <input
            type="color"
            value={foregroundColor}
            onChange={(e) => setForegroundColor(e.target.value)}
            id='style2'
          />
         </div>
        </label>
        {contrastRatio !== null && (
          <div className='flex-row'>
            <p>Contrast Ratio: {contrastRatio}</p>
            {!contrastPass.smallText && !contrastPass.largeText && (
              <div className='flex-col gap-2'>
                <div>
                  <button onClick={() => enhanceContrast('background')}>Enhance Background Contrast</button>
                </div>
                <div>
                  <button onClick={() => enhanceContrast('foreground')}>Enhance Foreground Contrast</button>
                </div>
                <div>
                  <button onClick={() => enhanceContrast('both')}>Enhance Both Contrasts</button>
                </div>
              </div>
            )}
            <button onClick={switchColors}>Switch Colors</button>
            <p>
              {contrastPass.smallText
                ? 'Passes small text contrast requirements.'
                : 'Fails small text contrast requirements.'}
            </p>
            <p>
              {contrastPass.largeText
                ? 'Passes large text contrast requirements.'
                : 'Fails large text contrast requirements.'}
            </p>
            {/* {contrastPass.smallText && contrastPass.largeText && <p>Contrast ratio passes both small and large text requirements.</p>}
          {contrastPass.smallText && !contrastPass.largeText && <p>Contrast ratio passes small text requirements.</p>}
          {!contrastPass.smallText && contrastPass.largeText && <p>Contrast ratio passes large text requirements.</p>} */}
          </div>
        )}
      </div>
      <div className='flex-1'>
        <p className='text-5xl font-bold' style={{color:foregroundColor}}>hello</p>
        <p className='text-5xl font-bold' style={{color:foregroundColor}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto quibusdam et velit. Nobis, nulla qui itaque corrupti tempore assumenda iste. Commodi eos cumque assumenda, autem unde illum eius deserunt quod.</p>
      </div>
    </div>
  );
};

export default ColorContrast;


