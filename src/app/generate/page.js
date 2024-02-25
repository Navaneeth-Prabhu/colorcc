'use client'
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const Modal = ({ children, onClose }) => {
  return (
    <div className={`modal-overlay ${onClose ? 'active' : ''}`} onClick={onClose}>
      <div className={`modal ${onClose ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

function Page() {
  const [paletteColor1, setPaletteColor1] = useState('#404E7C');
  const [paletteColor2, setPaletteColor2] = useState('#71B48D');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [generatedColor, setGeneratedColor] = useState('');

  const calculateInterpolatedColor = (color1, color2) => {
    // Parse hex values
    console.log(color1,color2);
    const c1 = parseInt(color1.slice(1), 16);
    const c2 = parseInt(color2.slice(1), 16);
    console.log(c1,c2);

    // Calculate interpolated values
    const r = Math.floor((getChannel(c1, 'r') + getChannel(c2, 'r')) / 2);
    const g = Math.floor((getChannel(c1, 'g') + getChannel(c2, 'g')) / 2);
    const b = Math.floor((getChannel(c1, 'b') + getChannel(c2, 'b')) / 2);

    // Convert back to hex
    const interpolatedColor = `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;

    return interpolatedColor;
  };

  const getChannel = (color, channel) => {
    return (color >> ({ r: 16, g: 8, b: 0 }[channel])) & 0xff;
  };

  const handleChange = (color) => {
    setGeneratedColor(color);
  };

  const handleAddColor = () => {
    const interpolatedColor = calculateInterpolatedColor(paletteColor1, paletteColor2);
    setGeneratedColor(interpolatedColor);
  };

  return (
    <div className='flex flex-col items-center justify-center gap-5'>
      <div >
        <input
          type="text"
          value={paletteColor1}
          onChange={(e) => setPaletteColor1(e.target.value)}
          className='p-2 md:w-[100px]'
        />
        <div className='h-10 w-10' style={{background:paletteColor1}}>

        </div>
        <input
          type="text"
          value={paletteColor2}
          onChange={(e) => setPaletteColor2(e.target.value)}
          className='p-2 md:w-[100px]'
        />
   <div className='h-10 w-10' style={{background:paletteColor2}}>

</div>
        <button onClick={handleAddColor} className='p-2 md:w-[50px] bg-blue-500 text-white'>
          Add
        </button>

        <div
          className='w-9 h-9 rounded-md border border-gray-400'
          style={{ background: generatedColor }}
          onClick={() => setShowColorPicker(!showColorPicker)}
        > <p>{generatedColor}</p></div>

        {showColorPicker && (
          <Modal onClose={() => setShowColorPicker(false)}>
            <HexColorPicker color={generatedColor} onChange={handleChange} />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default Page;

