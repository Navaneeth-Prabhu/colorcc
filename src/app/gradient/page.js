"use client"
import React, { useState, useEffect } from 'react';
import CustomColorPicker from '@/components/customColorPicker';
import { useMyContext } from '@/context/store';

const GradientMaker = () => {
  const { colorsList, setcolorsList } = useMyContext();
  const [rotation, setRotation] = useState(90);

  const handleColorChange = (index, newColor) => {
    const newColors = [...colorsList];
    newColors[index] = newColor;
    setcolorsList(newColors);
  };

  const handleAddColor = () => {
    if (colorsList.length < 10) {
      setcolorsList([...colorsList, getRandomColor()]);
    }
  };

  const handleRemove = (index) => {
    const newColor = colorsList.filter((color, i) => i !== index);
    setcolorsList(newColor)
  }

  const handleRandomColor = () => {
    const newRandomColors = Array.from({ length: 2 }, () => getRandomColor());
    setcolorsList(newRandomColors);
  };

  const handleRotationChange = (e) => {
    setRotation(parseInt(e.target.value, 10));
  };

  useEffect(() => {
    const initialColors = Array.from({ length: 2 }, () => getRandomColor());
    setcolorsList(initialColors);
  }, []);

  const gradientStyle = {
    background: `linear-gradient(${rotation}deg, ${colorsList.join(', ')})`,
  };

  const cssCode = `background: linear-gradient(${rotation}deg, ${colorsList.join(', ')});`;

  return (
    // <div className='flex justify-around items-center h-auto' style={gradientStyle}>
    //   <div className='flex flex-col gap-4'>
    //     {colors.map((color, index) => (
    //       <div key={index} >
    //         <div className='flex justify-between'>
    //           <label>{`Color ${index + 1}:`}</label>
    //           {
    //             colors?.length > 2 &&
    //             <label onClick={() => handleRemove(index)}>remove</label>
    //           }
    //         </div>
    //         <CustomColorPicker defaultColor={color} onChange={(newColor) => handleColorChange(index, newColor)} />
    //       </div>
    //     ))}
    //     <div className='flex justify-between'>

    //       {colors.length < 5 && (
    //         <button className='p-3 border border-black font-extrabold rounded-md' onClick={handleAddColor}>
    //           Add Color
    //         </button>
    //       )}

    //       <button className='p-3 border border-black font-extrabold rounded-md' onClick={handleRandomColor}>
    //         Random
    //       </button>
    //     </div>

    //     <div>
    //       <label>Rotation:</label>
    //       <input
    //         type="range"
    //         min="0"
    //         max="360"
    //         value={rotation}
    //         onChange={handleRotationChange}
    //       />
    //     </div>
    //   </div>

    //   <div className='rounded-lg h-screen bg-red-950' style={gradientStyle}></div>

    //   <div>
    //     <label>CSS Gradient Code:</label>
    //     <textarea
    //       value={cssCode}
    //       readOnly
    //       rows={5}
    //       style={{ width: '300px' }}
    //       onClick={(e) => e.target.select()} // Auto-select text on click
    //     />
    //   </div>
    // </div>
    <div className='flex items-center h-auto'>
      <div className='flex-1 h-60 w-full' style={gradientStyle}>

      </div>
      <div className='w-1/4 bg-gray-900 h-screen p-5 rounded-l-lg'>
        <div className='flex flex-col gap-4'>
          {colorsList.map((color, index) => (
            <div key={index} >
              <div className='flex justify-between'>
                <label className='text-white'>{`Color ${index + 1}:`}</label>
                {
                  colorsList?.length > 2 &&
                  <label onClick={() => handleRemove(index)}>remove</label>
                }
              </div>
              <CustomColorPicker defaultColor={color} onChange={(newColor) => handleColorChange(index, newColor)} />
            </div>
          ))}
        </div>
        <div>
          <div className='flex justify-between'>

            {colorsList.length < 5 && (
              <button className='p-3 border border-black font-extrabold rounded-md' onClick={handleAddColor}>
                Add Color
              </button>
            )}

            <button className='p-3 border border-black font-extrabold rounded-md' onClick={handleRandomColor}>
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
