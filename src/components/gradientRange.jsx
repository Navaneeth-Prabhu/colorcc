import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const MultiRangeSlider = () => {
  const [values, setValues] = useState([0, 50, 100]); // Initial values for the handles

  const handleSliderChange = (newValues) => {
    setValues(newValues);
  };

  return (
    <div className="p-8">
      <div className="w-full h-20 rounded-lg shadow-md">
        <Slider
          className="mt-4"
          min={0}
          max={100}
          value={values}
          onChange={handleSliderChange}
          railStyle={{ backgroundColor: '#ddd' }}
        />
      </div>
      {values.map((value, index) => (
        <div key={index} className="flex items-center mt-4">
          <input
            type="number"
            value={value}
            onChange={(event) => {
              const newValues = [...values];
              newValues[index] = parseInt(event.target.value);
              setValues(newValues);
            }}
            className="w-12 h-12 border-none rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default MultiRangeSlider;
