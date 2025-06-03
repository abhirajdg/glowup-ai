/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#BFA2FF',
          50: '#F8F5FF',
          100: '#F0EBFF',
          200: '#E6DDFF',
          300: '#D7C7FF',
          400: '#CBB5FF',
          500: '#BFA2FF',
          600: '#A585FF',
          700: '#8B68FF',
          800: '#714BFF',
          900: '#572EFF',
          950: '#4A20FF'
        },
        secondary: {
          DEFAULT: '#1A1A1A',
          50: '#F2F2F2',
          100: '#E6E6E6',
          200: '#CCCCCC',
          300: '#B3B3B3',
          400: '#999999',
          500: '#808080',
          600: '#666666',
          700: '#4D4D4D',
          800: '#333333',
          900: '#1A1A1A',
          950: '#0D0D0D'
        },
        accent: {
          pink: {
            DEFAULT: '#FF8CC6',
            50: '#FFF5F9',
            100: '#FFE5F2',
            200: '#FFD1E8',
            300: '#FFBDDE',
            400: '#FFA4D2',
            500: '#FF8CC6',
            600: '#FF6BB5',
            700: '#FF49A3',
            800: '#FF2892',
            900: '#FF0680',
            950: '#E60073'
          },
          lime: {
            DEFAULT: '#B6FF6F',
            50: '#F7FFF0',
            100: '#EFFFE1',
            200: '#E1FFC8',
            300: '#D3FFAF',
            400: '#C4FF96',
            500: '#B6FF6F',
            600: '#A3FF4D',
            700: '#90FF2A',
            800: '#7DFF08',
            900: '#6AE500',
            950: '#5CCC00'
          },
          blue: {
            DEFAULT: '#9BE7FF',
            50: '#F5FCFF',
            100: '#E6F8FF',
            200: '#CCF2FF',
            300: '#B3EDFF',
            400: '#9BE7FF',
            500: '#82E1FF',
            600: '#69DBFF',
            700: '#50D5FF',
            800: '#37CFFF',
            900: '#1EC9FF',
            950: '#05C3FF'
          }
        }
      }
    },
  },
  plugins: [],
};