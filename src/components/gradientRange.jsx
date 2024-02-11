import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const GradientRange = () => {
  const [colorStops, setColorStops] = useState([
    { position: 0, color: '#FF0000' },
    { position: 100, color: '#0000FF' }
  ]);

  const handleSliderChange = (values) => {
    setColorStops(values.map((value, index) => ({
      position: value,
      color: colorStops[index] ? colorStops[index].color : '#000000'
    })));
  };

  const handleSliderClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = (clickX / rect.width) * 100;

    const newColorStops = [...colorStops, { position: clickPercent, color: '#000000' }];
    setColorStops(newColorStops.sort((a, b) => a.position - b.position));
  };

  return (
    <div className="p-8 w-screen">
      <div
        className="w-full h-20 rounded-lg shadow-md cursor-pointer relative"
        onClick={handleSliderClick}
      >
        <div
          className="absolute top-0 bottom-0 left-0 right-0"
          style={{
            background: `linear-gradient(to right, ${colorStops.map(stop => `${stop.color} ${stop.position}%`).join(', ')})`
          }}
        />
        {colorStops.map((stop, index) => (
          <div
            key={index}
            className="absolute top-1/2 transform -translate-y-1/2 bg-white w-6 h-6 rounded-full cursor-pointer border-4 border-black"
            style={{
              left: `${stop.position}%`,
              marginLeft: '-3px',
            }}
            draggable="true"
            onDrag={(e) => {
              const rect = e.target.parentNode.getBoundingClientRect();
              const dragX = e.clientX - rect.left;
              const dragPercent = (dragX / rect.width) * 100;

              const newColorStops = [...colorStops];
              newColorStops[index].position = dragPercent;
              setColorStops(newColorStops.sort((a, b) => a.position - b.position));
            }}
          />
        ))}
      </div>
      <Slider
        className="mt-4"
        min={0}
        max={100}
        defaultValue={[0, 100]}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default GradientRange;
