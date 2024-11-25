import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "bg-pattern": "url('/src/assets/Body2.png')",
                "bg-hero": "url('/src/assets/background-hero.png')",
            },
            keyframes: {
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
            },
            animation: {
                "fade-in": "fade-in 0.5s ease-out",
            },
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                vidaloka: ["Vidaloka", "sans-serif"],
                upakarti: ["Upakarti", "sans-serif"],
                sofiasans: ["Sofia Sans", "sans-serif"],
                lato: ["Lato"],
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                ".scrollbar-hide": {
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                    "-ms-overflow-style": "none",
                    "scrollbar-width": "none",
                },
            };
            addUtilities(newUtilities);
        },
    ],
};
