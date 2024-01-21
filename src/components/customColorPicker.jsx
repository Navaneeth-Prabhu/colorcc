import { useMyContext } from '@/context/store';
import React, { useState, useEffect } from 'react';
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

const CustomColorPicker = ({ defaultColor, onChange, contextColor, type }) => {
    const [color, setColor] = useState(defaultColor);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const isMobile = window.innerWidth <= 768;

    const { setBackgroundColor, setForegroundColor } = useMyContext();
    useEffect(() => {
        const handleResize = () => {
            setShowColorPicker(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setColor(defaultColor);
    }, [defaultColor]);

    const handleChange = (newColor) => {
        const hexColor = newColor.hex;
        setColor(hexColor);
        onChange(hexColor);
        if (type == 'backgroundColor') {
            setBackgroundColor(hexColor);
        } else if (type == 'foregroundColor') {
            setForegroundColor(hexColor);
        }
    };

    return (
        <div className='bg-white border justify-between rounded-lg items-center flex h-12 md:w-[250px] 
        overflow-hidden px-1 border-gray-400 active:border-violet-700'>
            <input
                type="text"
                value={color}  // Use the value prop to bind the input value
                onChange={(e) => {
                    const newColor = { hex: e.target.value };
                    handleChange(newColor);
                }}
                className='p-2 md:w-[200px]'
            />
            <div
                className='w-9 h-9 rounded-md border border-gray-400'
                style={{ background: contextColor || color }}
                onClick={() => setShowColorPicker(!showColorPicker)}
            ></div>

            {showColorPicker && (
                <Modal onClose={() => setShowColorPicker(false)}>
                    <ChromePicker color={contextColor || color} onChange={handleChange} disableAlpha={true} />
                    {/* <HexColorPicker color={contextColor || color} onChange={handleChange}  disableAlpha={true}/> */}
                </Modal>
            )}
        </div>
    );
};

export default CustomColorPicker;

