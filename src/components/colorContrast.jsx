'use client'
import React, { useState, useEffect } from 'react';
import colorNameList from 'color-name-list';

const ColorContrast = () => {
  const [backgroundHSL, setBackgroundHSL] = useState({ h: 0, s: 0, l: 100 });
  const [foregroundHSL, setForegroundHSL] = useState({ h: 0, s: 0, l: 0 });
  const [backgroundInput, setBackgroundInput] = useState('#fefefe');
  const [foregroundInput, setForegroundInput] = useState('#010101');
  const [contrastRatio, setContrastRatio] = useState(0);
  const [accessibilityRatingLarge, setAccessibilityRatingLarge] = useState('');
  const [accessibilityRatingNormal, setAccessibilityRatingNormal] = useState('');

  const handleBackgroundChange = (e) => {
    const color = e.target.value;
    setBackgroundInput(color);
    updateHSLColor(color, setBackgroundHSL);
  };

  const handleForegroundChange = (e) => {
    const color = e.target.value;
    setForegroundInput(color);
    updateHSLColor(color, setForegroundHSL);
  };

  const handleBackgroundPropertiesChange = (property, value) => {
    const updatedHSL = { ...backgroundHSL, [property.toLowerCase()]: value };
    setBackgroundHSL(updatedHSL);
    setBackgroundInput(`#${((1 << 24) + (Math.round(updatedHSL.l * 255 / 100) << 16) + (Math.round(updatedHSL.s * 255 / 100) << 8) + Math.round(updatedHSL.h * 255 / 360)).toString(16).slice(1)}`);
  };

  const handleForegroundPropertiesChange = (property, value) => {
    const updatedHSL = { ...foregroundHSL, [property.toLowerCase()]: value };
    setForegroundHSL(updatedHSL);
    setForegroundInput(`#${((1 << 24) + (Math.round(updatedHSL.l * 255 / 100) << 16) + (Math.round(updatedHSL.s * 255 / 100) << 8) + Math.round(updatedHSL.h * 255 / 360)).toString(16).slice(1)}`);
  };

  const updateHSLColor = (color, setHSL) => {
    const hexRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    if (hexRegex.test(color)) {
      const hsl = rgbToHsl(hexToRgb(color));
      setHSL(hsl);
    } else {
      const namedColor = color.toLowerCase();
      const namedColorHex = colorNameToHex(namedColor);
      if (namedColorHex) {
        const hsl = rgbToHsl(hexToRgb(namedColorHex));
        setHSL(hsl);
      }
    }
  };

  const rgbToHsl = (color) => {
    const { r, g, b } = color;

    const normalizedR = r / 255;
    const normalizedG = g / 255;
    const normalizedB = b / 255;

    const max = Math.max(normalizedR, normalizedG, normalizedB);
    const min = Math.min(normalizedR, normalizedG, normalizedB);

    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (max !== min) {
      s = l > 0.5 ? (max - min) / (2 - max - min) : (max - min) / (max + min);

      switch (max) {
        case normalizedR:
          h = (normalizedG - normalizedB) / (max - min) + (normalizedG < normalizedB ? 6 : 0);
          break;
        case normalizedG:
          h = (normalizedB - normalizedR) / (max - min) + 2;
          break;
        case normalizedB:
          h = (normalizedR - normalizedG) / (max - min) + 4;
          break;
        default:
          break;
      }

      h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, '');

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
  };

  const colorNameToHex = (colorName) => {
    const colorEntry = colorNameList.find(entry => entry.name.toLowerCase() === colorName);
    return colorEntry ? colorEntry.hex : undefined;
  };

  useEffect(() => {
    updateHSLColor('#ffffff', setBackgroundHSL);
    updateHSLColor('#000000', setForegroundHSL);
  }, []);


  const calculateLuminance = (color) => {
    const { r, g, b } = color;
    const sRGB = [r, g, b].map(value => {
      value /= 255;
      return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    });
    const luminance = 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
    return luminance * 100;
  };

  const calculateContrastRatio = (color1, color2) => {
    const lum1 = calculateLuminance(color1);
    const lum2 = calculateLuminance(color2);

    if (!isNaN(lum1) && !isNaN(lum2) && lum1 >= 0 && lum1 <= 100 && lum2 >= 0 && lum2 <= 100) {
      const contrastRatio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
      return parseFloat(contrastRatio.toFixed(2));
    }

    return 'Invalid contrast ratio';
  };

  useEffect(() => {
    const contrastRatioValue = calculateContrastRatio(hslToRgb(backgroundHSL), hslToRgb(foregroundHSL));
    setContrastRatio(contrastRatioValue);
    setAccessibilityRatings(contrastRatioValue);
  }, [backgroundHSL, foregroundHSL]);

  const hslToRgb = (hsl) => {
    const { h, s, l } = hsl;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r, g, b;

    if (h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (h < 300) {
      r = x;
      g = 0;
      b = c;
    } else {
      r = c;
      g = 0;
      b = x;
    }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    };
  };

  const setAccessibilityRatings = (contrastRatioValue) => {
    const isLargeText = contrastRatioValue >= 3.0;

    const aaLarge = contrastRatioValue >= 3.0 ? 'Pass' : 'Fail';
    const aaaLarge = contrastRatioValue >= 4.5 ? 'Pass' : 'Fail';
    const aaNormal = isLargeText || contrastRatioValue >= 4.5 ? 'Pass' : 'Fail';
    const aaaNormal = contrastRatioValue >= 7.0 ? 'Pass' : 'Fail';

    setAccessibilityRatingLarge(`AA Large: ${aaLarge}`);
    setAccessibilityRatingNormal(`AAA Large: ${aaaLarge}`);
    setAccessibilityRatingLarge(`AA Normal: ${aaNormal}`);
    setAccessibilityRatingNormal(`AAA Normal: ${aaaNormal}`);
  };

  return (
    <div className='bg-slate-400 w-screen h-screen p-10 flex flex-row'>
      <div className='w-1/2 h-full flex-1 border-2 text-2xl rounded p-10' style={{ backgroundColor: `hsl(${backgroundHSL.h}, ${backgroundHSL.s}%, ${backgroundHSL.l}%)`, color: `hsl(${foregroundHSL.h}, ${foregroundHSL.s}%, ${foregroundHSL.l}%)` }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit iure facere et, optio ad nemo voluptatum cupiditate quod consectetur quidem numquam a fuga, dolorum veniam modi totam veritatis dolores asperiores?
        </p>
      </div>
      <div className='w-1/2 flex-1 p-10 flex flex-col gap-1'>
        <p>Background Color</p>
        <input type="text" className='h-10 p-5 border rounded-lg text-md' value={backgroundInput} onChange={handleBackgroundChange} />

        <p>Hue</p>
        <input type="range" value={backgroundHSL.h} onChange={(e) => handleBackgroundPropertiesChange('h', e.target.value)} />

        <p>Saturation</p>
        <input type="range" value={backgroundHSL.s} onChange={(e) => handleBackgroundPropertiesChange('s', e.target.value)} />

        <p>Lightness</p>
        <input type="range" value={backgroundHSL.l} onChange={(e) => handleBackgroundPropertiesChange('l', e.target.value)} />

        <p>Foreground Color</p>
        <input type="text" value={foregroundInput} onChange={handleForegroundChange} />

        <p>Hue</p>
        <input type="range" value={foregroundHSL.h} onChange={(e) => handleForegroundPropertiesChange('h', e.target.value)} />

        <p>Saturation</p>
        <input type="range" value={foregroundHSL.s} onChange={(e) => handleForegroundPropertiesChange('s', e.target.value)} />

        <p>Lightness</p>
        <input type="range" value={foregroundHSL.l} onChange={(e) => handleForegroundPropertiesChange('l', e.target.value)} />

        <div>
          <p>Contrast Ratio: {contrastRatio}</p>
          <p>Accessibility Ratings:</p>

          <p>{accessibilityRatingLarge}</p>
          <p>{accessibilityRatingLarge}</p>
          <p>{accessibilityRatingNormal}</p>
          <p>{accessibilityRatingNormal}</p>
        </div>
      </div>
    </div>
  );
};

export default ColorContrast;
