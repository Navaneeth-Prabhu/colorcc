import React, { useState } from 'react';


const GoogleColorPicker = () => {
  const [color, setColor] = useState('#4285F4'); // Set your default color here

  const handleChange = (e) => {
    setColor(e.target.value);
  };

  return (
    <div className="google-color-picker">
      <input type="color" value={color} onChange={handleChange} />
      <div className="color-preview" style={{ backgroundColor: color }}></div>
    </div>
  );
};

export default GoogleColorPicker;
