'use client'
import Color from 'color';
import React, { createContext, useContext, useEffect, useState } from 'react';

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
    // gradinet
    const [colors, setColors] = useState(['', '']); // Default colors
    // ''palettecolors
    const [paletteColor, setPaletteColor] = useState('');
    const [lightPalette, setLightPalette] = useState([]);
    const [darkPalette, setDarkPalette] = useState([]);
    const [huePalette, setHuePalette] = useState([]);




    useEffect(() => {
        const initialColors = getRandomColor();
        setPaletteColor(initialColors);
        generateDarkPalette(initialColors);
        generateLightPalette(initialColors);
        generateHuePalette(initialColors);
    }, []);

    useEffect(() => {
        calculateContrastRatio();
    }, [backgroundColor, foregroundColor]);

    useEffect(() => {
        const textColor = getContrastColor(backgroundColor);
        setTextColor(textColor)
    }, [backgroundColor])



    const calculateContrastRatio = () => {
        const hexToRgb = (hex) => {
            const bigint = parseInt(hex.slice(1), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return [r, g, b];
        };

        const rgbToLuminance = (rgb) => {
            const srgb = (c) => {
                c /= 255;
                return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
            };
            const gamma = (c) => srgb(c) * 255;
            return 0.2126 * gamma(rgb[0]) + 0.7152 * gamma(rgb[1]) + 0.0722 * gamma(rgb[2]);
        };

        const bgRgb = hexToRgb(backgroundColor);
        const fgRgb = hexToRgb(foregroundColor);

        const bgLuminance = rgbToLuminance(bgRgb) / 255;
        const fgLuminance = rgbToLuminance(fgRgb) / 255;

        const contrast = (l1, l2) => {
            const lighter = Math.max(l1, l2);
            const darker = Math.min(l1, l2);
            return (lighter + 0.05) / (darker + 0.05);
        };

        const ratio = contrast(bgLuminance, fgLuminance);
        setContrastRatio(ratio.toFixed(2));

        const contrastPassSmallTextAA = ratio >= 4.5;
        const contrastPassLargeTextAA = ratio >= 3;
        const contrastPassSmallTextAAA = ratio >= 7;
        const contrastPassLargeTextAAA = ratio >= 4.5;
        const contrastPassUIComponentAA = ratio >= 3;
        const contrastPassUIComponentAAA = ratio >= 4.5;

        setContrastPass({
            smallTextAA: contrastPassSmallTextAA,
            largeTextAA: contrastPassLargeTextAA,
            smallTextAAA: contrastPassSmallTextAAA,
            largeTextAAA: contrastPassLargeTextAAA,
            uiComponentAA: contrastPassUIComponentAA,
            uiComponentAAA: contrastPassUIComponentAAA,
        });
    };

    const enhanceContrast = (type) => {
        const hexToRgb = (hex) => {
            const bigint = parseInt(hex.slice(1), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return [r, g, b];
        };

        const rgbToHex = (rgb) => {
            const [r, g, b] = rgb;
            const toHex = (c) => {
                const hex = c.toString(16);
                return hex.length === 1 ? '0' + hex : hex;
            };
            return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        };

        const enhanceColor = (color) => {
            const colorRgb = hexToRgb(color);
            const enhancedRgb = colorRgb.map((c) => 255 - c);
            return rgbToHex(enhancedRgb);
        };

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

    const switchColors = () => {
        const temp = backgroundColor;
        setBackgroundColor(foregroundColor);
        setForegroundColor(temp);
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
    
    // In your component or context
    const handleColorSelection = (selectedColorPair) => {
        setBackgroundColor(selectedColorPair.backgroundColor);
        setForegroundColor(selectedColorPair.foregroundColor);
    };

    const contextValue = {
        backgroundColor,
        foregroundColor,
        setBackgroundColor,
        setForegroundColor,
        setContrastPass,
        contrastRatio,
        enhanceContrast,
        switchColors, contrastPass, textColor,

        saveColors,
        savedColors,
        handleColorSelection,
        colors,
        setColors,
        paletteColor,
        setPaletteColor: (newColor) => {
            setPaletteColor(newColor);
            generateDarkPalette(newColor);
            generateLightPalette(newColor);
            generateHuePalette(newColor);
        },
        lightPalette,
        darkPalette,
        huePalette,
    };

    return (
        <MyContext.Provider value={contextValue}>
            {children}
        </MyContext.Provider>
    );
};
