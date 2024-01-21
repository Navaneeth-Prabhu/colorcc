import React, { useState } from 'react';
import Color from 'color';
import { HexColorPicker } from "react-colorful";

const ColorPicker = () => {
  const [color, setColor] = useState('#0078d4');
  const [format, setFormat] = useState('hex');

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const handleFormatChange = (newFormat) => {
    setFormat(newFormat);
  };

  const renderInputFields = () => {
    switch (format) {
      case 'hex':
        return (
          <div>
            <label>HEX:</label>
            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
          </div>
        );
      case 'rgb':
        const rgbValues = Color(color).rgb().array();
        return (
          <div>
            <label>Red:</label>
            <input type="range" min="0" max="255" value={rgbValues[0]} onChange={(e) => handleRGBChange(e, 0)} />
            <label>Green:</label>
            <input type="range" min="0" max="255" value={rgbValues[1]} onChange={(e) => handleRGBChange(e, 1)} />
            <label>Blue:</label>
            <input type="range" min="0" max="255" value={rgbValues[2]} onChange={(e) => handleRGBChange(e, 2)} />
          </div>
        );
      case 'hsl':
        const hslValues = Color(color).hsl().array();
        return (
          <div>
            <label>Hue:</label>
            <input type="range" min="0" max="360" value={hslValues[0]} onChange={(e) => handleHSLChange(e, 0)} />
            <label>Saturation:</label>
            <input type="range" min="0" max="100" value={hslValues[1]} onChange={(e) => handleHSLChange(e, 1)} />
            <label>Lightness:</label>
            <input type="range" min="0" max="100" value={hslValues[2]} onChange={(e) => handleHSLChange(e, 2)} />
          </div>
        );
      case 'name':
        return (
          <div>
            <label>Name:</label>
            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
          </div>
        );
      default:
        return null;
    }
  };

  const handleRGBChange = (e, index) => {
    const rgbValues = Color(color).rgb().array();
    rgbValues[index] = parseInt(e.target.value, 10);
    setColor(Color.rgb(rgbValues).hex());
  };

  const handleHSLChange = (e, index) => {
    const hslValues = Color(color).hsl().array();
    hslValues[index] = parseInt(e.target.value, 10);
    setColor(Color.hsl(hslValues).hex());
  };

  return (
    <div>
      <label>Select Color Format:</label>
      <select onChange={(e) => handleFormatChange(e.target.value)}>
        <option value="hex">HEX</option>
        <option value="rgb">RGB</option>
        <option value="hsl">HSL</option>
        <option value="name">Name</option>
      </select>
      <HexColorPicker color={color} onChange={handleColorChange} />


      {renderInputFields()}
    </div>
  );
};

export default ColorPicker;
