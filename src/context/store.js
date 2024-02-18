'use client'
import Color from 'color';
import colors from 'color-name';
const ColorConvert = require('color-convert');
import React, { createContext, useContext, useEffect, useState } from 'react';
import convert from 'color-convert';
import { getLevel, updatePath, useThrottledUpdatePath } from '@/Utils/utils';

const MyContext = createContext();

export const useMyContext = () => {
    return useContext(MyContext);
};

export const MyContextProvider = ({ children }) => {
    const [backgroundColor, setBackgroundColor] = useState('#fefefe');
    const [foregroundColor, setForegroundColor] = useState('#000000');
    const [textColor, setTextColor] = useState('#000000');
    const [contrastRatio, setContrastRatio] = useState(null);
    const [contrastPass, setContrastPass] = useState(null);
    const [savedColors, setSavedColors] = useState([]);

    const [colorPickerStates, setColorPickerStates] = useState({});

    // gradinet
    const [colorsList, setcolorsList] = useState([]); // Default colors
    // ''palettecolors
    const [paletteColor, setPaletteColor] = useState('');
    const [lightPalette, setLightPalette] = useState([]);
    const [darkPalette, setDarkPalette] = useState([]);
    const [huePalette, setHuePalette] = useState([]);
    const [fbBg, setFbBg] = useState([]);
    const [complementaryColor, SetComplementaryColor] = useState([]);
    const [splitComplementaryColor, setSplitComplementaryColor] = useState([]);
    const [colorBlind, setColorBlind] = useState([]);
   
    const updatePath = useThrottledUpdatePath();

    useEffect(() => {
        const initialColors = getRandomColor();
        setPaletteColor(initialColors);
        generateDarkPalette(initialColors);
        generateLightPalette(initialColors);
        generateHuePalette(initialColors);
        generateComplementaryColor(initialColors);
    }, []);

    useEffect(() => {
        calculateContrastRatio();
    }, [backgroundColor, foregroundColor]);

    useEffect(() => {
        const textColor = getContrastColor(backgroundColor);
        setTextColor(textColor)
    }, [backgroundColor])


    const calculateContrastRatio = () => {

        if (!isValidHex(backgroundColor) || !isValidHex(foregroundColor)) {
            // console.error('Invalid color string(s)');
            return;
        }
        
    
        const bgLuminance = Color(backgroundColor).luminosity();
        const fgLuminance = Color(foregroundColor).luminosity();
    
        const contrast = (l1, l2) => {
            const lighter = Math.max(l1, l2);
            const darker = Math.min(l1, l2);
            return (lighter + 0.05) / (darker + 0.05);
        };
    
        const ratio = contrast(bgLuminance, fgLuminance);
        setContrastRatio(ratio.toFixed(2));
    
        const newLevel = getLevel(ratio);
        setContrastPass(newLevel);
        // updatePath(backgroundColor, foregroundColor)
    };
    
    function isValidHex(hex) {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    }
    
    
    const enhanceContrast = (type) => {
        const enhanceColor = (color) => color(color).negate().hex();
    
        let newBackgroundColor = backgroundColor;
        let newForegroundColor = foregroundColor;
    
        switch (type) {
            case 'background':
                newBackgroundColor = enhanceColor(backgroundColor);
                break;
            case 'foreground':
                newForegroundColor = enhanceColor(foregroundColor);
                break;
            case 'both':
                newBackgroundColor = enhanceColor(backgroundColor);
                newForegroundColor = enhanceColor(foregroundColor);
                break;
            default:
                break;
        }
    
        setBackgroundColor(newBackgroundColor);
        setForegroundColor(newForegroundColor);
    };

    // const updatePath = throttle((bg, fg) => {
    //     const backgroundHex = (bg).replace(/^#/, '');
    //     const foregroundHex = (fg).replace(/^#/, '');
      
    //     if (router !== undefined) {
    //       router.push(`/contrast/${backgroundHex}-${foregroundHex}`);
    //     }
      
    //   }, 250);

    const switchColors = () => {
        const temp = backgroundColor;
        setBackgroundColor(foregroundColor);
        setForegroundColor(temp);
        updatePath(foregroundColor,backgroundColor)
    };

    const getContrastColor = (backgroundColor) => {
        // Ensure the background color is a valid hex color
        const cleanHex = backgroundColor.replace(/[^0-9A-Fa-f]/g, '');
        if (!/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
            // console.error('Invalid hex color:', backgroundColor);
            return '#000000'; // Default to black for invalid color
        }

        // Convert hex to RGB
        const bigint = parseInt(cleanHex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        // Calculate relative luminance (perceived brightness)
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        // Determine contrast color based on luminance
        return luminance > 0.5 ? '#000000' : '#FFFFFF'; // Black for light background, white for dark background
    };

    const saveColors = () => {
        // Check if the color pair already exists
        const colorExists = savedColors.some(
            (colorPair) =>
                colorPair.backgroundColor === backgroundColor &&
                colorPair.foregroundColor === foregroundColor
        );
        // If the color pair does not exist, add it to the savedColors array
        if (!colorExists) {
            setSavedColors((prevSavedColors) => [
                ...prevSavedColors,
                { backgroundColor, foregroundColor },
            ]);
        }
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const generateDarkPalette = (paletteColor) => {
        const baseColorObj = Color(paletteColor);

        const newPalette = [];
        for (let i = 0; i < 10; i++) {
            // Mix the base color with black to create a shade
            const shadedColor = baseColorObj.mix(Color('black'), i * 0.1);
            newPalette.push(shadedColor.hex());
        }
        setDarkPalette(newPalette);
    };

    const generateLightPalette = (paletteColor) => {
        const baseColorObj = Color(paletteColor);

        const newPalette = [];
        for (let i = 0; i < 10; i++) {
            // Mix the base color with white to create a tint
            const tintedColor = baseColorObj.mix(Color('white'), i * 0.1);
            newPalette.push(tintedColor.hex());
        }
        setLightPalette(newPalette);
    };

    const generateHuePalette = (paletteColor) => {
        const baseColorObj = Color(paletteColor);

        const newPalette = [];
        for (let i = 0; i < 10; i++) {
            // Adjust the hue of the base color
            const adjustedColor = baseColorObj.hue(baseColorObj.hue() + i * 36); // 36 degrees per step, you can adjust this value
            newPalette.push(adjustedColor.hex());
        }
        setHuePalette(newPalette);
    };

    const generateComplementaryColor = (baseColor) => {
        const baseColorObj = Color(baseColor);
        // Calculate complementary color by adding 180 degrees to the hue
        const complementaryColor = baseColorObj.rotate(180).hex();
        SetComplementaryColor(complementaryColor);
    };

    const generateSplitComplementaryColors = (baseColor) => {
        const baseColorObj = Color(baseColor);

        // Calculate split complementary colors by adding and subtracting 150 degrees from the hue
        const splitComplementaryColor1 = baseColorObj.rotate(150).hex();
        const splitComplementaryColor2 = baseColorObj.rotate(-150).hex();

        setSplitComplementaryColor([splitComplementaryColor1, splitComplementaryColor2]);
    };

    const generateForegroundBackgroundColorPair = (foregroundColor) => {
        const foregroundColorObj = Color(foregroundColor);

        // Calculate background color by darkening the foreground color
        const backgroundColor = foregroundColorObj.darken(0.5).hex();

        // Calculate contrasting color for the foreground
        const contrastingColor = generateContrastingColor(backgroundColor);

        setFbBg([foregroundColor, backgroundColor, contrastingColor]);
    };

    const generateContrastingColor = (color) => {
        const colorObj = Color(color);
        const luminance = colorObj.luminosity();
        const threshold = 0.5; // Threshold to determine whether to use black or white as the contrasting color

        let contrastingColor;

        if (luminance < threshold) {
            // If background color is dark, use white as contrasting color
            contrastingColor = '#ffffff';
        } else {
            // If background color is light, use black as contrasting color
            contrastingColor = '#000000';
        }

        return contrastingColor;
    };

    const generateColorBlindnessColors = (originalColor) => {
        const originalColorObj = Color(originalColor);

        // Function to adjust colors for Tritanopia (blue-yellow color blindness)
        const adjustForTritanopia = (color) => {
            return color.darken(0.1).saturate(0.3).hex(); // Example adjustment: darken and saturate the color
        };

        // Function to adjust colors for Deuteranopia (red-green color blindness)
        const adjustForDeuteranopia = (color) => {
            return color.desaturate(0.5).hex(); // Example adjustment: desaturate the color
        };

        // Function to adjust colors for Protanopia (red-green color blindness)
        const adjustForProtanopia = (color) => {
            return color.darken(0.2).hex(); // Example adjustment: darken the color
        };

        // Function to adjust colors for achromatopsia (complete color blindness)
        const adjustForAchromatopsia = (color) => {
            return '#5C5C5C'; // Example: a medium gray color
        };

        // Generate colors for each type of color blindness and store in an array
        const colors = [
            adjustForTritanopia(originalColorObj),
            adjustForDeuteranopia(originalColorObj),
            adjustForProtanopia(originalColorObj),
            adjustForAchromatopsia(originalColorObj)
        ];


        setColorBlind(colors);
    };

    // In your component or context
    const handleColorSelection = (selectedColorPair) => {
        setBackgroundColor(selectedColorPair.backgroundColor);
        setForegroundColor(selectedColorPair.foregroundColor);
    };


    const setShowColorPicker = (key, value) => {
        setColorPickerStates(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const showColorPicker = (key) => colorPickerStates[key] || false;

    const contextValue = {
        backgroundColor,
        foregroundColor,
        setBackgroundColor,
        setForegroundColor,
        setContrastPass,
        contrastRatio,
        enhanceContrast,
        switchColors, contrastPass, textColor,

        setShowColorPicker,
        showColorPicker,

        saveColors,
        savedColors,
        handleColorSelection,
        colorsList,
        setcolorsList,
        paletteColor,
        setPaletteColor: (newColor) => {
            setPaletteColor(newColor);
            generateDarkPalette(newColor);
            generateLightPalette(newColor);
            generateHuePalette(newColor);
            generateComplementaryColor(newColor);
            generateSplitComplementaryColors(newColor);
            generateForegroundBackgroundColorPair(newColor);
            generateColorBlindnessColors(newColor);
        },
        lightPalette,
        darkPalette,
        huePalette,
        fbBg,
        complementaryColor,
        splitComplementaryColor,
        colorBlind
    };

    return (
        <MyContext.Provider value={contextValue}>
            {children}
        </MyContext.Provider>
    );
};
