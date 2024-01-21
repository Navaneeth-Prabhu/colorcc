"use client"
import React, { useState, useEffect } from 'react';
import CustomColorPicker from '@/components/customColorPicker';
import { useMyContext } from '@/context/store';

const GradientMaker = () => {
  const { colors, setColors } = useMyContext();
  const [rotation, setRotation] = useState(90);

  const handleColorChange = (index, newColor) => {
    const newColors = [...colors];
    newColors[index] = newColor;
    setColors(newColors);
  };

  const handleAddColor = () => {
    if (colors.length < 10) {
      setColors([...colors, getRandomColor()]);
    }
  };

  const handleRandomColor = () => {
    const newRandomColors = Array.from({ length: 2 }, () => getRandomColor());
    setColors(newRandomColors);
  };

  const handleRotationChange = (e) => {
    setRotation(parseInt(e.target.value, 10));
  };

  useEffect(() => {
    const initialColors = Array.from({ length: 2 }, () => getRandomColor());
    setColors(initialColors);
  }, []);

  const gradientStyle = {
    background: `linear-gradient(${rotation}deg, ${colors.join(', ')})`,
    marginTop: '20px',
  };

  const cssCode = `background: linear-gradient(${rotation}deg, ${colors.join(', ')});`;

  return (
    <div className='flex justify-around items-center h-screen' style={gradientStyle}>
      <div className='flex flex-col gap-4'>
        {colors.map((color, index) => (
          <div key={index}>
            <label>{`Color ${index + 1}:`}</label>
            <CustomColorPicker defaultColor={color} onChange={(newColor) => handleColorChange(index, newColor)} />
          </div>
        ))}
        <div className='flex justify-between'>

        {colors.length < 10 && (
          <button    className='p-3 border border-black font-extrabold rounded-md' onClick={handleAddColor}>
            Add Color
          </button>
        )}

        <button    className='p-3 border border-black font-extrabold rounded-md' onClick={handleRandomColor}>
          Random
        </button>
        </div>

        <div>
          <label>Rotation:</label>
          <input
            type="range"
            min="0"
            max="360"
            value={rotation}
            onChange={handleRotationChange}
          />
        </div>
      </div>

      <div className='rounded-lg h-screen bg-red-950' style={gradientStyle}></div>

      <div>
        <label>CSS Gradient Code:</label>
        <textarea
          value={cssCode}
          readOnly
          rows={5}
          style={{ width: '300px' }}
          onClick={(e) => e.target.select()} // Auto-select text on click
        />
      </div>
    </div>
  );
};

export default GradientMaker;

// Function to generate a random hex color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
