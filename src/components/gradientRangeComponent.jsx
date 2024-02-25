import { useMyContext } from '@/context/store';
import React, { useState, useEffect, useRef } from 'react';

function GradientColorPicker({ setSelectedPointIndex,rotation ,gradientType}) {
    const { colorsList, setcolorsList } = useMyContext();

    useEffect(() => {
        const initialPoints = [{ value: 0, color: getRandomColor() }, { value: 100, color: getRandomColor() }];
        setcolorsList(initialPoints)
    }, []);

    useEffect(() => {
        // Update the gradient when points change
        updateGradient();
    }, [colorsList,rotation]);

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';    
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };


    const handleMouseMove = useRef((e) => {
        // No implementation here, as it will be defined dynamically based on the event
    });
    
    const handleMouseUp = useRef(() => {
        // No implementation here, as it will be defined dynamically based on the event
    });
    
    const handleMouseLeave = useRef(() => {
        // No implementation here, as it will be defined dynamically based on the event
    });

    const handleMouseDown = (index, e) => {
        e.stopPropagation();
        const startX = e.clientX;
        const initialLeft = e.target.offsetLeft;
    
        if (setSelectedPointIndex !== index) {
            setSelectedPointIndex(index);
        }
    
        const mouseMoveListener = (e) => {
            const deltaX = e.clientX - startX;
            const newPosition = Math.round(Math.max(0, Math.min(100, ((initialLeft + deltaX) / e.target.parentElement.offsetWidth) * 100)));
            const newColors = [...colorsList];
            newColors[index].value = newPosition;
            setcolorsList(newColors);
            updateGradient();
        };
    
        const mouseUpListener = () => {
            document.removeEventListener('mousemove', mouseMoveListener);
            document.removeEventListener('mouseup', mouseUpListener);
            document.removeEventListener('mouseleave', handleMouseLeave.current);
        };
    
        const mouseLeaveListener = () => {
            handleMouseUp.current();
        };
    
        document.addEventListener('mousemove', mouseMoveListener);
        document.addEventListener('mouseup', mouseUpListener);
        document.addEventListener('mouseleave', mouseLeaveListener);
    
        // Assign the event listener functions to useRef
        handleMouseMove.current = mouseMoveListener;
        handleMouseUp.current = mouseUpListener;
        handleMouseLeave.current = mouseLeaveListener;
    };
    

    

    const handleColorPickerClick = (e) => {
        if (!e.target.classList.contains('pointer')) {
            const rect = e.target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percent = (x / e.target.offsetWidth) * 100;
            const newValue = Math.round(percent);

            const existingPointIndex = colorsList.findIndex((point) => Math.abs(point.value - newValue) < 2);

            if (existingPointIndex === -1) {
                const newPoint = { value: newValue, color: getRandomColor() };

                setcolorsList([...colorsList, newPoint]);
                setSelectedPointIndex(colorsList.length); // Set selected index to the index of the newly added point
            }
        }
    };

    const updateGradient = () => {
        const sortedPoints = [...colorsList].sort((a, b) => a.value - b.value);
        const gradientColors = sortedPoints.map((point) => `${point.color} ${point.value}%`);
        const gradient = `linear-gradient(to right, ${gradientColors.join(', ')})`;
        let gradientWithRotation
   
        if(gradientType == 'linear'){
             gradientWithRotation = `linear-gradient(${rotation}deg, ${gradientColors.join(', ')})`;
        }else if (gradientType == 'radial'){
             gradientWithRotation = `radial-gradient(circle, ${gradientColors.join(', ')})`;
        }
        document.documentElement.style.setProperty('--gradientWithRotation', gradientWithRotation);
        document.documentElement.style.setProperty('--gradient', gradient);
    };

    return (
        <div className="flex flex-col w-full items-center justify-center gap-5">
          
            <div
                className="w-full h-4 cursor-pointer rounded-full relative"
                style={{ background: 'var(--gradient)' }}
                onClick={(e) => handleColorPickerClick(e)}
            >
                {colorsList.map((point, index) => (
                    <div
                        key={index}
                        className="pointer absolute bg-white w-6 h-6 rounded-full cursor-pointer border-4 border-black"
                        style={{
                            left: `${point.value}%`,
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: point.color,
                        }}
                        onMouseDown={(e) => handleMouseDown(index, e)}
                    />
                ))}
            </div>
        </div>
    );
}

export default GradientColorPicker;
    