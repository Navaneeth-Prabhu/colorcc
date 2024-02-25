import { isValidHex } from '@/Utils/utils';
import { MyContextProvider, useMyContext } from '@/context/store';
import React, { useState, useEffect, useMemo, useContext } from 'react';
import { ChromePicker } from 'react-color';
import { HexColorPicker, RgbaColorPicker, HslColorPicker } from "react-colorful";

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

const CustomColorPicker = ({ defaultColor, onChange, Inputtype, id }) => {
    const [color, setColor] = useState(defaultColor);
    const { backgroundColor, foregroundColor, showColorPicker, setShowColorPicker } = useMyContext();

    const handleChange = (newColor) => {
        if(isValidHex(newColor)){
            setColor(newColor);
            onChange(newColor);
        }
    };

    useEffect(() => {
        // Set the initial color state only once after the initial render
        setColor(defaultColor);
    }, []);

    return (
        <div className='bg-white border justify-between rounded-lg items-center flex flex-1 h-12 md:w-[250px] overflow-hidden px-1 border-gray-400 active:border-violet-700'>
            <input
                type={Inputtype ? Inputtype : "text"}
                value={color}
                onChange={(e) => {
                    const newColor = e.target.value;
                    setColor(newColor);
                    onChange(newColor);
                }}
                className='p-2 md:w-[200px]'
                
            />

            {!Inputtype &&
                <div
                    className='w-9 h-9 rounded-md border border-gray-400'
                    style={{ background:  defaultColor }}
                    onClick={() => setShowColorPicker(id, true)}
                ></div>
            }

            {showColorPicker(id) && (
                <Modal onClose={() => setShowColorPicker(id, false)}>
                    <HexColorPicker className='custom-pointers custom-layout' color={ defaultColor} onChange={handleChange}/>
                </Modal>
            )}
        </div>
    );
};


export default CustomColorPicker;
