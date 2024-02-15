"use client"
import React, { useState, useEffect } from 'react';
import CustomColorPicker from '@/components/customColorPicker';
import { useMyContext } from '@/context/store';
import GradientRangeInput from '@/components/gradientRangeComponent';
import GradientRange from '@/components/gradientRange';
import MultiRangeSlider from '@/components/gradientRange';

function page() {

    const { colorsList, setcolorsList } = useMyContext();
    const [rotation, setRotation] = useState(90);
    const [gradientType, setGradientType] = useState('linear');
    const [selectedPointIndex, setSelectedPointIndex] = useState(0);

    const handleColorChange = (index, newColor) => {
        const newPoints = [...colorsList];
        newPoints[index].color = newColor;
        setcolorsList(newPoints);
    };

    const handleValueChange = (index, newColor) => {
        const newPoints = [...colorsList];
        newPoints[index].value = newColor;
        setcolorsList(newPoints);
    };

    const handleRotation = (value) => {

        setRotation(value)
    };

    const handleDelete = (index, newColor) => {
        const newPoints = [...colorsList];
        const filteredPoints = newPoints.filter(p => p.color !== newColor)

        setcolorsList(filteredPoints);
        setSelectedPointIndex(0)
    };

    const gradientStyle = {
        background: `linear-gradient(${rotation}deg, ${colorsList.join(', ')})`,
    };

    const handleRandomColor = () => {
        const newRandomColors = [{ value: 0, color: getRandomColor() }, { value: 100, color: getRandomColor() }];
        setcolorsList(newRandomColors);
      };

      const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
      

    // console.log(colors, 'colorss')
    return (
        <div className="w-screen h-screen px-12 py-11 bg-white flex-col justify-start items-center gap-5 inline-flex">
            <div className="w-3/4 relative rounded-2xl">
                <div className="w-full h-60 left-[0.50px] rounded-3xl" style={{ background: 'var(--gradientWithRotation)' ? 'var(--gradientWithRotation)' : gradientStyle }} />
            </div>
            <div className=" flex-col w-3/4 p-4 justify-center items-center gap-2.5 flex">
              
                <GradientRangeInput setSelectedPointIndex={setSelectedPointIndex} rotation={rotation} gradientType={gradientType} />

                <div className='flex gap-4 md:w-1/2'>
                    {colorsList?.map((point, index) => (
                        selectedPointIndex == index &&
                        <div key={index} className='md:flex gap-4'>
                            <div>
                                <div className='flex justify-between'>
                                    <label className='text-gray-800'>{`Color ${index + 1}:`}</label>
                                    {colorsList?.length > 2 &&
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
                  
                    <div className='bg-white border justify-between rounded-lg items-center flex flex-1 h-12 md:w-[250px] 
        overflow-hidden px-1 border-gray-400 active:border-violet-700'>
                        <input
                            type='number'
                            defaultValue={rotation}
                            onChange={(e) => handleRotation(e.target.value)} 
                            className='p-2 md:w-[200px]'
                            min='0'
                            max='360'
                        />
                    </div>
                        <button className='p-3 border border-black font-extrabold rounded-md' onClick={handleRandomColor}>
              Random
            </button>
                </div>
            </div>
        </div>
    )
}

export default page