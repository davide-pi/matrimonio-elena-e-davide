/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f6f7f5',
          100: '#e6eae2',
          200: '#d0d9c9',
          300: '#b1c1a8',
          400: '#92a883',
          500: '#738b63',
          600: '#5c7250',
          700: '#495c41',
          800: '#3c4b37',
          900: '#344030',
          950: '#1a221a',
        },
        beige: {
          50: '#faf8f2',
          100: '#f5f0e4',
          200: '#ebe0c9',
          300: '#ddc9a5',
          400: '#cfb183',
          500: '#c39f6a',
          600: '#b8895d',
          700: '#96694a',
          800: '#7a5540',
          900: '#644739',
          950: '#352418',
        },
        blue: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e6fe',
          300: '#7cd4fd',
          400: '#36bffa',
          500: '#0ca5e9',
          600: '#0283c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
      },
      backgroundImage: {
        'mountains': "url('https://images.pexels.com/photos/4064432/pexels-photo-4064432.jpeg')",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            a: {
              color: '#5c7250',
              '&:hover': {
                color: '#3c4b37',
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
};