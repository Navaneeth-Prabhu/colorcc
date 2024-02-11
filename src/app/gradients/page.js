"use client"
import React, { useState, useEffect } from 'react';
import CustomColorPicker from '@/components/customColorPicker';
import { useMyContext } from '@/context/store';
import GradientRangeInput from '@/components/gradientRangeComponent';
import GradientRange from '@/components/gradientRange';

function page() {

    const { colors, setColors } = useMyContext();
    const [rotation, setRotation] = useState(90);
    const [gradientType, setGradientType] = useState('linear');
    const [selectedPointIndex, setSelectedPointIndex] = useState(0);

    const handleColorChange = (index, newColor) => {
        const newPoints = [...colors];
        newPoints[index].color = newColor;
        setColors(newPoints);
    };

    const handleValueChange = (index, newColor) => {
        const newPoints = [...colors];
        newPoints[index].value = newColor;
        setColors(newPoints);
    };

    const handleRotation = (value) => {
     
        setRotation(value)
    };

    const handleDelete = (index, newColor) => {
        const newPoints = [...colors];
        const filteredPoints = newPoints.filter(p => p.color !== newColor)

        setColors(filteredPoints);
        setSelectedPointIndex(0)
    };

    const gradientStyle = {
        background: `linear-gradient(${rotation}deg, ${colors.join(', ')})`,
    };

    // console.log(colors, 'colorss')
    return (
        <div className="w-screen h-screen px-12 py-11 bg-white flex-col justify-start items-center gap-5 inline-flex">
            <div className="w-3/4 relative rounded-2xl">
                <div className="w-full h-60 left-[0.50px] rounded-3xl" style={{ background: 'var(--gradientWithRotation)' ? 'var(--gradientWithRotation)' : gradientStyle }} />
            </div>
            <div className=" flex-col w-3/4 p-4 justify-center items-center gap-2.5 flex">
                <GradientRangeInput setSelectedPointIndex={setSelectedPointIndex} rotation={rotation} gradientType={gradientType}/>
           
                <div className='flex gap-4 md:w-1/2'>
                    {colors?.map((point, index) => (
                        selectedPointIndex == index &&
                        <div key={index} className='md:flex gap-4'>
                            <div>
                                <div className='flex justify-between'>
                                    <label className='text-gray-800'>{`Color ${index + 1}:`}</label>
                                    {colors?.length > 2 &&
                                        <label onClick={() => handleDelete(index, point.color)}>remove</label>
                                    }
                                </div>
                                <CustomColorPicker defaultColor={point?.color} onChange={(newColor) => handleColorChange(index, newColor)} />
                            </div>
                            <div>
                                <label className='text-gray-800'>Position</label>
                                <CustomColorPicker defaultColor={point.value} onChange={(newColor) => handleValueChange(index, newColor)} Inputtype='number' />
                            </div>
                        </div>
                    ))}

                </div>
                <div>
                    <input defaultValue={rotation} onChange={(e)=>handleRotation(e.target.value)} type='number' min='0' max='360'/>
                    
                </div>
            </div>
        </div>
    )
}

export default page