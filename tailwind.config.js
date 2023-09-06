/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-horizontal':
          'linear-gradient(90deg, #7FD1CC 0%, #9694F5 100%)',
        'gradient-vertical':
          'linear-gradient(180deg, #7FD1CC 0%, #9694F5 100%)',
        'gradient-hero':
          'linear-gradient(0deg, rgba(42, 40, 121, 0.60) 0%, rgba(42, 40, 121, 0.60) 100%)',
        'gradient-shimmer':
          'linear-gradient(90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0.25) 60%, rgba(255, 255, 255, 0))',
      },

      keyframes: {
        'slide-in-from-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },

        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },

      animation: {
        'slide-in-from-right':
          'slide-in-from-right 350ms cubic-bezier(0.16, 1, 0.3, 1)',
        shimmer: 'shimmer 2s infinite',
      },

      fontWeight: {
        normal: '400',
        bold: '700',
      },

      lineHeight: {
        shorter: '125%',
        short: '140%',
        base: '160%',
        tall: '180%',
      },

      fontSize: {
        xs: '0.875rem',
        sm: '1rem',
        md: '1.125rem',
        lg: '1.25rem',
        xl: '1.5rem',
      },

      space: {
        px: '1px',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.75rem',
        8: '2rem',
        10: '2.5rem',
      },

      borderRadius: {
        xs: '2.5px',
        sm: '5px',
        md: '8px',
        lg: '12px',
        full: '9999px',
      },

      colors: {
        green: {
          100: '#50B2C0',
          200: '#255D6A',
          300: '#0A313C',
        },
        purple: {
          100: '#8381D9',
          200: '#2A2879',
        },
        gray: {
          100: '#F8F9FC',
          200: '#E6E8F2',
          300: '#D1D6E4',
          400: '#8D95AF',
          500: '#303F73',
          600: '#252D4A',
          700: '#181C2A',
          800: '#0E1116',
        },
        black: {
          a9: 'rgba(0, 0, 0, 0.447)',
        },

        hover: {
          white: 'rgba(230, 232, 242, 0.04)',
          purple: 'rgba(131, 129, 217, 0.06)',
        },
      },

      boxShadow: {
        'primary-inner': 'inset 10px 5px 200px #255D6A30',
        'outline-white': '0px 0px 0px 4px rgba(230, 232, 242, 0.04)',
        'outline-purple': '0px 0px 0px 8px rgba(131, 129, 217, 0.06)',
      },
    },
    screens: {
      xs: { max: '360px' },
      sm: { max: '640px' },
      md: { max: '768px' },
      lg: { max: '1024px' },
      xl: { max: '1280px' },
      '2xl': { max: '1536px' },
    },
  },
  plugins: [],
}
