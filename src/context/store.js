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
    const [palette, setPalette] = useState([]);
    const [savedColors, setSavedColors] = useState([]);

      
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

    
    // const calculateContrastRatio = () => {
    //     const hexToRgb = (hex) => {
    //         const bigint = parseInt(hex.slice(1), 16);
    //         const r = (bigint >> 16) & 255;
    //         const g = (bigint >> 8) & 255;
    //         const b = bigint & 255;
    //         return [r, g, b];
    //     };

    //     const rgbToLuminance = (rgb) => {
    //         const srgb = (c) => {
    //             c /= 255;
    //             return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    //         };
    //         const gamma = (c) => srgb(c) * 255;
    //         return 0.2126 * gamma(rgb[0]) + 0.7152 * gamma(rgb[1]) + 0.0722 * gamma(rgb[2]);
    //     };

    //     const bgRgb = hexToRgb(backgroundColor);
    //     const fgRgb = hexToRgb(foregroundColor);

    //     const bgLuminance = rgbToLuminance(bgRgb) / 255;
    //     const fgLuminance = rgbToLuminance(fgRgb) / 255;

    //     const contrast = (l1, l2) => {
    //         const lighter = Math.max(l1, l2);
    //         const darker = Math.min(l1, l2);
    //         return (lighter + 0.05) / (darker + 0.05);
    //     };

    //     const ratio = contrast(bgLuminance, fgLuminance);
    //     setContrastRatio(ratio.toFixed(2));

    //     const contrastPassSmallText = ratio >= 4.5;
    //     const contrastPassLargeText = ratio >= 3;

    //     setContrastPass({
    //         smallText: contrastPassSmallText,
    //         largeText: contrastPassLargeText,
    //     });
    // };


    // const enhanceContrast = (type) => {
    //     const predefinedColors = ['#E74C3C', '#3498DB', '#2ECC71', '#F39C12', '#9B59B6', '#34495E', '#1ABC9C', '#E67E22'];
    
    //     const getContrastRatio = (color1, color2) => {
    //         const c1 = Color(color1);
    //         const c2 = Color(color2);
    //         return c1.contrast(c2);
    //     };
    
    //     const findColorWithGoodContrast = (baseColor, targetColor) => {
    //         const baseColorObj = Color(baseColor);
    //         const targetColorObj = Color(targetColor);
    
    //         let bestColor = predefinedColors[0];
    //         let bestContrast = getContrastRatio(predefinedColors[0], targetColor);
    
    //         for (let i = 1; i < predefinedColors.length; i++) {
    //             const currentColor = predefinedColors[i];
    //             const currentContrast = getContrastRatio(currentColor, targetColor);
    
    //             if (currentContrast > bestContrast) {
    //                 bestColor = currentColor;
    //                 bestContrast = currentContrast;
    //             }
    //         }
    
    //         return bestColor;
    //     };
    
    //     let newBackgroundColor = backgroundColor;
    //     let newForegroundColor = foregroundColor;
    
    //     if (type === 'both' || type === 'background') {
    //         newBackgroundColor = findColorWithGoodContrast(backgroundColor, foregroundColor);
    //     }
    
    //     if (type === 'both' || type === 'foreground') {
    //         newForegroundColor = findColorWithGoodContrast(foregroundColor, backgroundColor);
    //     }
    
    //     setBackgroundColor(newBackgroundColor);
    //     setForegroundColor(newForegroundColor);
    // };


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
            console.error('Invalid hex color:', backgroundColor);
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

    // useEffect(() => {
    //     const generateColorPalette = (foregroundColor) => {
    //         const baseColorObj = Color(foregroundColor);

    //         const newPalette = [];
    //         for (let i = 0; i < 8; i++) {
    //             const adjustedColor = baseColorObj.lightness(baseColorObj.lightness() + i * 5);
    //             newPalette.push(adjustedColor.hex());
    //         }

    //         setPalette(newPalette);
    //     };

    //     generateColorPalette(foregroundColor);
    // }, [foregroundColor]);
    const saveColors = () => {
        setSavedColors((prevSavedColors) => [
            ...prevSavedColors,
            { backgroundColor, foregroundColor },
        ]);
        console.log(savedColors)
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
        palette,
        saveColors,
        savedColors,
        handleColorSelection
    };

    return (
        <MyContext.Provider value={contextValue}>
            {children}
        </MyContext.Provider>
    );
};
