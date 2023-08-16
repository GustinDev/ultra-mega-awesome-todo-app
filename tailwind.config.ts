import type { Config } from 'tailwindcss';

//#bde0fe
//#00a6fb
//#2563EB
//#1E40AF
//#00205b
//#001233

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        customBlue1: '#bde0fe',
        customBlue2: '#00a6fb',
        customBlue3: '#2563EB',
        customBlue4: '#1E40AF',
        customBlue5: '#00205b',
        customBlue6: '#001233',
      },
      backgroundImage: {},
    },
  },
  plugins: [],
};
export default config;
