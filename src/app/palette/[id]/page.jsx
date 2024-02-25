'use client'
// Import React and other necessary modules
import React, { useEffect, useState } from 'react';
import Color from 'color';
import colorNameList from 'color-name-list';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/navigation';
import { generateSquarePalette } from '@/Utils/utils';
import Layout from '@/components/layout';

function Home({ params }) {
    const [colorSet, setColorSet] = useState([]);
    const [isColorPaletteGenerated, setIsColorPaletteGenerated] = useState(false);
    const router = useRouter()

    useEffect(() => {
        let data = params.id

        const colors = data.split('-');
        let hexValues = colors.map(chunk => "#" + chunk.toUpperCase());
        console.log(hexValues, 'home params')
        setColorSet(hexValues)
    }, [])

    const updatePath = (...colors) => {
        // console.log(colors);
        const path = colors?.map(color => color?.replace(/^#/, '')).join('-');

        if (router !== undefined) {
            router.push(`/palette/${path}`, undefined, { shallow: true });
        }
    };

    const generateColorPalette = (paletteSize) => {
        const generatedColors = new Set(); // Store generated colors
        const palette = [];

        // Function to generate a unique color
        const generateUniqueColor = () => {
            const baseColor = Color.rgb(Math.random() * 255, Math.random() * 255, Math.random() * 255);
            // Apply color transformations to adjust the generated color
            const modifiedColor = baseColor.hue(Math.random() * 360).saturate(Math.random() * 0.6 + 0.2); // Adjust saturation
            return modifiedColor.hex(); // Get the color in hexadecimal format
        };

        // Generate colors for the palette
        for (let i = 0; i < paletteSize; i++) {
            let color = generateUniqueColor();
            while (color === '#FFFFFF' || generatedColors.has(color)) {
                color = generateUniqueColor();
            }
            generatedColors.add(color); // Add the generated color to the set
            palette.push(color); // Add the color to the palette
        }
        console.log(palette)
        // return palette;
        updatePath(...palette);
        // setColorSet(palette);
    };

    // const generateColorPalette = () => {
    //     const newColorSet = [];
    //     for (let i = 0; i < 5; i++) {
    //         newColorSet.push(generateColor());
    //     }
    //     setColorSet(newColorSet);
    // };

    function getRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }

    // Function to generate an analogous color palette
    function generateAnalogousPalette(count) {
        // Generate a random base color
        const baseColor = getRandomColor();

        // Create a Color object from the base color
        const base = Color(baseColor);

        // Calculate the step between each analogous color
        const step = 360 / count;

        // Generate the analogous colors
        const palette = [];
        for (let i = 0; i < count; i++) {
            // Adjust the hue for each analogous color
            const hue = (base.hue() + step * i) % 360;
            const analogousColor = base.hue(hue).hex();
            palette.push(analogousColor);
        }
        console.log(palette)
        // return palette;
        updatePath(...palette);
    }

    function generateMonochromaticPalette(count) {
        // Create a Color object from the base color
        const base = Color(getRandomColor());

        // Generate the monochromatic colors
        const palette = [];
        for (let i = 0; i < count; i++) {
            // Adjust the lightness for each color, avoid pure black (#000000)
            const lightness = (80 / (count - 1)) * i + 10; // Start from 1 to avoid black
            const monochromaticColor = base.lightness(lightness).hex();
            palette.push(monochromaticColor);
        }


        // return palette;
        updatePath(...palette);
    }

    function generateSquarePalette(count) {
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
        // setColorSet(palette);
        updatePath(...palette);
    }

    function isUndesiredColor(color) {
        const thresholdLightness = 80; // Threshold lightness value (adjust as needed)
        const colorObj = Color(color);
        return colorObj.lightness() > thresholdLightness;
    }

    function generateRandomSkipShadePalette(count) {
        // Generate random base color and skip degree
        const baseColor = getRandomColor();
        // const skipDegree = Math.floor(Math.random() * 360) + 10; // Random degree between 1 and 360
        const skipDegree = 20// Random degree between 1 and 360

        // Create a Color object from the base color
        const base = Color(baseColor);

        // Calculate the additional colors by skipping certain degrees
        const palette = [];
        for (let i = 0; i < count; i++) {
            let skipColor;
            do {
                skipColor = base.rotate(skipDegree * i).hex();
            } while (isUndesiredColor(skipColor));
            palette.push(skipColor);
        }

        // return palette;
        // updatePath(...palette);
        setColorSet(palette)
        // console.log(palette,'.////////////////////////')
    }

    function generateComplementaryPalette(count) {
        // Generate a random base color
        const baseColor = getRandomColor();

        // Calculate the complementary color
        const base = Color(baseColor);
        const complementaryColor = base.rotate(180).hex(); // Rotate by 180 degrees to get the complementary color

        // Calculate the number of additional colors
        const additionalColorsCount = count - 1; // We already have one color (the complementary color)

        // Calculate the angle between each additional color
        const angle = 360 / additionalColorsCount;

        // Generate the additional colors by evenly spacing them around the color wheel
        const palette = [];
        for (let i = 0; i < additionalColorsCount; i++) {
            const additionalColor = base.rotate(angle * (i + 1)).hex();
            palette.push(additionalColor);
        }

        // Add the complementary color to the palette
        palette.push(complementaryColor);

        // return palette;
        updatePath(...palette);
        console.log(palette, './///////////////////////')
    }

    function generateTriadicPalette(count) {
        // Ensure count is divisible by 3
        if (count % 3 !== 0) {
            throw new Error('Count must be divisible by 3 for a triadic color palette');
        }

        const colorsPerSet = count / 3;

        const baseColor = getRandomColor();

        const base = Color(baseColor);

        const angle = 120; // Angle between each color in the triadic scheme

        const palette = [];
        for (let i = 0; i < colorsPerSet; i++) {
            const color1 = base.rotate(angle * i).hex();
            const color2 = base.rotate(angle * (i + 1)).hex();
            palette.push(color1, color2, baseColor);
        }

        // return palette;
        updatePath(...palette);
        // console.log(palette)
    }

    const handleAddColor = (index) => {
        const newColorSet = [...colorSet];
        const color1 = newColorSet[index]
        const color2 = newColorSet[index + 1]
        const interpolatedColor = calculateInterpolatedColor(color1, color2);
        // setGeneratedColor(interpolatedColor);
        console.log(color1, color2)
        console.log(interpolatedColor);
        newColorSet.splice(index + 1, 0, interpolatedColor);
        console.log(newColorSet)
        // setColorSet(newColorSet);
        updatePath(...newColorSet);
    };

    const calculateInterpolatedColor = (color1, color2) => {
        // Parse hex values
        const c1 = parseInt(color1.slice(1), 16);
        const c2 = parseInt(color2.slice(1), 16);

        // Calculate interpolated values
        const r = Math.floor((getChannel(c1, 'r') + getChannel(c2, 'r')) / 2);
        const g = Math.floor((getChannel(c1, 'g') + getChannel(c2, 'g')) / 2);
        const b = Math.floor((getChannel(c1, 'b') + getChannel(c2, 'b')) / 2);

        // Convert back to hex
        const interpolatedColor = `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;

        return interpolatedColor;
    };

    const getChannel = (color, channel) => {
        return (color >> ({ r: 16, g: 8, b: 0 }[channel])) & 0xff;
    };


    return (
        <Layout>
            <div className='h-screen w-full flex flex-col items-center'>

                <div className='h-[400px] w-3/4 rounded-3xl overflow-hidden'>

                    <div className='h-full flex'>
                        {colorSet.map((color, index) => (
                            <div key={index} className='w-1/5 h-full relative overflow-visible' style={{ background: color }}>
                                {
                                    index != colorSet.length - 1 &&
                                    <div className='bg-white z-10 w-10 h-10 rounded-full absolute overflow-visible top-1/2 right-[-20px] items-center justify-center flex' onClick={() => handleAddColor(index)}>as</div>
                                }
                                <div className='flex items-end w-full h-full flex-1 justify-center p-8'>
                                    <p className='font-semibold'>{color}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex '>
                    <button onClick={() => generateRandomSkipShadePalette(6)}>Generate</button>
                </div>
            </div>
        </Layout>
    );
}

export default Home;
