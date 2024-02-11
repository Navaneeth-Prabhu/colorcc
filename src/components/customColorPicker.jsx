import { useMyContext } from '@/context/store';
import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';
import { HexColorPicker,RgbaColorPicker,HslColorPicker } from "react-colorful";

const Modal = ({ children, onClose }) => {
    return (
        <div className={`modal-overlay ${onClose ? 'active' : ''} `} onClick={onClose}>
            <div className={`modal ${onClose ? 'active' : ''} `} onClick={(e) => e.stopPropagation()}>
                <span className="close-button" onClick={onClose}>
                    &times;
                </span>
                {children}
            </div>
        </div>
    );
};

const CustomColorPicker = ({ defaultColor, onChange, contextColor, type, Inputtype }) => {
    const [color, setColor] = useState(defaultColor);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const { setBackgroundColor, setForegroundColor } = useMyContext();

    const handleChange = (newColor) => {
        const hexColor = newColor;
        console.log(hexColor);
        setColor(hexColor);
        onChange(hexColor);
        if (type === 'backgroundColor') {
            setBackgroundColor(hexColor);
        } else if (type === 'foregroundColor') {
            setForegroundColor(hexColor);
        }
    };    

    return (
        <div className='bg-white border justify-between rounded-lg items-center flex flex-1 h-12 md:w-[250px] 
        overflow-hidden px-1 border-gray-400 active:border-violet-700'>
            <input
                type={Inputtype ? Inputtype : "text" }
                value={defaultColor}
                onChange={(e) => {
                    const newColor = e.target.value ;
                    handleChange(newColor);
                }}
                className='p-2 md:w-[200px]'
            />

            {
                !Inputtype &&
            <div
                className='w-9 h-9 rounded-md border border-gray-400'
                style={{ background: contextColor || defaultColor }}
                onClick={() => setShowColorPicker(true)}  // Open the color picker when this div is clicked
            ></div>
            }

            {showColorPicker && (
                <Modal onClose={() => setShowColorPicker(false)}>
                    {/* <ChromePicker className='chrome' color={contextColor || defaultColor} onChange={handleChange} disableAlpha={true} /> */}
                    <HexColorPicker className='custom-pointers custom-layout' color={contextColor || defaultColor} onChange={handleChange} />
                </Modal>
            )}
        </div>
    );
};

export default CustomColorPicker;

