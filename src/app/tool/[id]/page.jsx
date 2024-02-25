'use client'

import React, { useCallback, useEffect, useState } from 'react';
import { useMyContext } from '@/context/store';
import { ChromePicker } from 'react-color';
import { HexColorPicker } from "react-colorful";
import { useRouter } from 'next/navigation';
import { debounce, throttle } from 'lodash';
import Layout from '@/components/layout';


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

const Page = ({ params }) => {
    const router = useRouter();
    const id = params.id;
    const { paletteColor, setPaletteColor, lightPalette, darkPalette, huePalette, fbBg, complementaryColor, splitComplementaryColor, colorBlind } = useMyContext();
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [newUrl, setNewUrl] = useState('');

    const handleChange = useCallback(debounce((newColor) => {
        const hexColor = newColor.substring(1);
        setPaletteColor(newColor);
        setInputValue(hexColor);

        router.push(`/tool/${hexColor}`, undefined, { shallow: true });
    }, 300), [router]);


    return (
        <Layout>
        <div className='flex flex-col items-center justify-center gap-5'>
            <p>{id}</p>
            <div className='bg-white border justify-between rounded-lg items-center flex h-12 md:w-[250px] 
        overflow-hidden px-1 border-gray-400 active:border-violet-700'>
                <input
                    type="text"
                    value={paletteColor}
                    onChange={(e) => {
                        const newColor = e.target.value;
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
                        <div onClick={(e) => e.stopPropagation()}>
                            <HexColorPicker color={paletteColor} onChange={handleChange} />
                        </div>
                    </Modal>
                )}
            </div>



            <div style={{ display: 'flex', alignItems: 'center' }}>
                {lightPalette?.map((color, index) => (
                    <div className='flex flex-col' key={index}>
                        <div
                            style={{
                                width: '80px',
                                height: '70px',
                                backgroundColor: color,
                            }}
                        />
                        <label>{color}</label>
                        {/* <label>{color.name}</label> */}
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {darkPalette?.map((color, index) => (
                    <div className='flex flex-col' key={index}>
                        <div
                            style={{
                                width: '80px',
                                height: '70px',
                                backgroundColor: color,
                            }}
                        />
                        <label>{color}</label>
                        {/* <label>{color.name}</label> */}
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {huePalette?.map((color, index) => (
                    <div className='flex flex-col' key={index}>
                        <div
                            style={{
                                width: '80px',
                                height: '70px',
                                backgroundColor: color,
                            }}
                        />
                        <label>{color}</label>
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {fbBg?.map((color, index) => (
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* {fbBg?.map((color, index) => ( */}
                <div className='flex flex-col' >
                    <div
                        style={{
                            width: '70px',
                            height: '70px',
                            backgroundColor: complementaryColor,
                        }}
                    />
                    <label>{complementaryColor}</label>
                </div>
                {/* ))} */}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {splitComplementaryColor?.map((color, index) => (
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {colorBlind?.map((color, index) => (
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
        </Layout>
    );
}

export default Page;
