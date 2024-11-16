import type { Config } from 'tailwindcss';

export default {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                background: '#e0e5ee',
                primary: '#1f53be',
                secondary: {
                    light: '#fad717',
                    main: '#FFAF1A'
                },
                terciary: '#58bc04'
            }
        }
    },
    plugins: []
} satisfies Config;
