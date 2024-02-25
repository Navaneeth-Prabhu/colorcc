import Color from "color";
import throttle from "lodash.throttle";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export const useThrottledUpdatePath = () => {
    const router = useRouter(); // Use the useRouter hook here

        const updatePath = throttle((...colors) => {
            console.log(colors)
            // Convert each color to its hexadecimal representation and join them with dashes
            const path = colors?.map(color => color.replace(/^#/, '')).join('-');

            if (router !== undefined) {
                router.push(`/contrast/${path}`, undefined, { shallow: true });
            }
        }, 250);

        return () => {
            // Clean up the throttle function on component unmount
            updatePath.cancel();
        };

};

// export const updatePath = throttle((...colors) => {
//     const path = colors?.map(color => color.replace(/^#/, '')).join('-');
    
//     if (router !== undefined) {
//         router.push(`/contrast/${path}`, undefined,{shallow: true});
//     }
//   }, 250);


export const getLevel = (contrast) => {
    if (contrast > 7) {
        return { AALarge: 'Pass', AA: 'Pass', AAALarge: 'Pass', AAA: 'Pass' };
    } else if (contrast > 4.5) {
        return { AALarge: 'Pass', AA: 'Pass', AAALarge: 'Pass', AAA: 'Fail' };
    } else if (contrast > 3) {
        return { AALarge: 'Pass', AA: 'Fail', AAALarge: 'Fail', AAA: 'Fail' };
    }

    return { AALarge: 'Fail', AA: 'Fail', AAALarge: 'Fail', AAA: 'Fail' };
};

export const isValidHex = (hex) => {

    hex = hex.replace(/^#/, '');
    if (hex.length === 6) {

        if (/^[A-Fa-f0-9]{6}$/.test(hex)) {
            return `#${hex}`; // Return the normalized hex value
        }
    } else if (hex.length === 3) {
        // If the hex value has exactly 3 characters after removing the #
        const normalizedHex = hex.split('').map(char => char + char).join('');
        if (/^[A-Fa-f0-9]{6}$/.test(normalizedHex)) {
            return `#${normalizedHex}`; // Return the normalized hex value
        }
    }
    return false;
}
// export const getContrast = (a, b) => chroma.contrast(rgbToHex(a), rgbToHex(b));

export const generateSquarePalette =(count)=> {
    // Create a Color object from the base color
    const baseColor = Color.rgb(Math.random() * 255, Math.random() * 255, Math.random() * 255);

    // Calculate the step for both lightness and saturation
    const lightnessStep = 100 / Math.ceil(Math.sqrt(count));
    const saturationStep = 100 / Math.ceil(Math.sqrt(count));

    // Generate the square colors
    const palette = [];
    for (let i = 0; i < Math.ceil(Math.sqrt(count)); i++) {
        for (let j = 0; j < Math.ceil(Math.sqrt(count)); j++) {
            const lightness = lightnessStep * (i + 1); // Start from 1 to avoid black
            const saturation = saturationStep * j;
            const squareColor = baseColor.lightness(lightness).saturationv(saturation).hex();
            palette.push(squareColor);
        }
    }

    // for (let i = 0; i < Math.ceil(Math.sqrt(count)); i++) {
    //     for (let j = 0; j < Math.ceil(Math.sqrt(count)); j++) {
    //         // Adjust the lightness and saturation values to avoid pure white or pure black
    //         const lightness = lightnessStep * i + 1; // Start from 1 to avoid pure black
    //         const saturation = saturationStep * j;
    //         const squareColor = baseColor.lightness(lightness).saturationv(saturation).hex();
    //         palette.push(squareColor);
    //     }
    // }

    // return palette;
    updatePath(...palette);
}