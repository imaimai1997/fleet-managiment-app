import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
          primary: {
                '50': '#edfff5',
                '100': '#d6ffea',
                '200': '#afffd6',
                '300': '#71ffb7',
                '400': '#2dfb91',
                '500': '#02e571',
                '600': '#00bf5a',
                '700': '#00984b',
                '800': '#06753d',
                '900': '#085f34',
                '950': '#00361b',
            },
          
      },
    },
  },
  
  plugins: [],
  
    
};
export default config;
