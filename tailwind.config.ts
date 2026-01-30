import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./data/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                'xs': '375px',
                '3xl': '1920px',
            },
            fontFamily: {
                sans: ["var(--font-outfit)"],
                display: ["var(--font-outfit)", "sans-serif"], // Add display font
            },
            colors: {
                mango: {
                    50: '#fff8e1',
                    100: '#ffecb3',
                    200: '#ffe082',
                    300: '#ffd54f',
                    400: '#ffca28',
                    500: '#ffc107',
                    600: '#ffb300',
                    700: '#ffa000',
                    800: '#ff8f00',
                    900: '#ff6f00',
                },
                leaf: {
                    500: '#43a047',
                    600: '#2e7d32',
                },
                'dark-bg': '#0a0a0a',
                'glass-white': 'rgba(255, 255, 255, 0.1)',
            },
            backgroundImage: {
                'mango-gradient': 'linear-gradient(180deg, #0a0a0a 0%, #1a1a00 50%, #0a0a0a 100%)', // Subtle dark yellow tint
                'radial-glow': 'radial-gradient(circle at 50% 50%, rgba(255, 191, 0, 0.15), transparent 70%)',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'pulse-slow': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.8' },
                }
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out 3s infinite',
                'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
            }
        },
    },
    plugins: [],
};
export default config;
