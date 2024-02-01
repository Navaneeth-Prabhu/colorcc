'use client'

import React, { useEffect, useState } from 'react';
import { useMyContext } from '@/context/store';
import { ChromePicker } from 'react-color';
import { HexColorPicker } from "react-colorful";

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

// const getRandomColor = () => {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// };

function Page() {
    const { paletteColor, setPaletteColor, lightPalette, darkPalette, huePalette } = useMyContext();
    const [showColorPicker, setShowColorPicker] = useState(false);

    console.log(darkPalette, lightPalette)
    const handleChange = (newColor) => {
        const hexColor = newColor;
        setPaletteColor(hexColor);
    };

    // useEffect(() => {
    //     const initialColors = getRandomColor();
    //     setPaletteColor(initialColors);
    // }, []);

    return (
        <div className='flex flex-col items-center justify-center gap-5'>
            <div className='bg-white border justify-between rounded-lg items-center flex h-12 md:w-[250px] 
        overflow-hidden px-1 border-gray-400 active:border-violet-700'>
                <input
                    type="text"
                    value={paletteColor}
                    onChange={(e) => {
                        const newColor = { hex: e.target.value };
                        handleChange(newColor);
                    }}
                    className='p-2 md:w-[200px]'
                />

                <div
                    className='w-9 h-9 rounded-md border border-gray-400'
                    style={{ background: paletteColor }}
                    onClick={() => setShowColorPicker(!showColorPicker)}
                ></div>

                {showColorPicker && (
                    <Modal onClose={() => setShowColorPicker(false)}>
                        {/* <ChromePicker color={paletteColor} onChange={handleChange} disableAlpha={true} /> */}
                        <HexColorPicker color={paletteColor} onChange={handleChange} />
                    </Modal>
                )}
            </div>


            <div style={{ display: 'flex', alignItems: 'center' }}>
                {lightPalette?.map((color, index) => (
                    <div className='flex flex-col' key={index}>
                        <div
                            style={{
                                width: '70px',
                                height: '70px',
                                backgroundColor: color,
                            }}
                        />
                        {/* <label>{color}</label> */}
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {darkPalette?.map((color, index) => (
                    <div className='flex flex-col' key={index}>
                        <div
                            style={{
                                width: '70px',
                                height: '70px',
                                backgroundColor: color,
                            }}
                        />
                        {/* <label>{color}</label> */}
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {huePalette?.map((color, index) => (
                    <div className='flex flex-col' key={index}>
                        <div
                            style={{
                                width: '70px',
                                height: '70px',
                                backgroundColor: color,
                            }}
                        />
                        <label>{color}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;
