import type { Config } from 'tailwindcss';

export default {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        colors: {
            primary: {
                light: '#FFAF1A',
                main: '#BC7A00',
                dark: '#6F4900'
            },
            secondary: {
                '500': '#86a6f6',
                light: '#AFC6FF',
                main: '#0053BD',
                dark: '#003271'
            }
        }
    },
    plugins: []
} satisfies Config;
