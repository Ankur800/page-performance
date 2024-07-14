/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/features/**/*.{js,ts,jsx,tsx,mdx}',
        './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#000000',
                secondary: '#1A73E8',
                success: '#0cce6a',
                warning: '#ffa400',
                error: '#ff4e43',
            },
        },
    },
    plugins: [],
};
