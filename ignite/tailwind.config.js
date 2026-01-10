/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'calm-blue': '#0EA5E9',
                'calm-blue-dark': '#0284C7',
                'emergency-red': '#EF4444',
                'emergency-red-dark': '#DC2626',
                'soft-white': '#F8FAFC',
            },
            borderRadius: {
                'xl': '12px',
                '2xl': '16px',
                '3xl': '24px',
            },
        },
    },
    plugins: [],
}
