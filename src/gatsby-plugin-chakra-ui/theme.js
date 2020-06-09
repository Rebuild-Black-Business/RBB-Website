import React from 'react';
import { theme } from '@chakra-ui/core';
import 'typeface-inter';
import 'typeface-arvo';

const customTheme = {
  ...theme,
  fonts: {
    ...theme.fonts,
    'heading-slab': 'Inter',
    heading: 'Arvo',
  },
  fontSizes: {
    ...theme.fontSizes,
    helper: '0.75',
    base: '1rem',
    paragraph: '1rem',
    button: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '2.5rem',
  },
  // Mobile views were not covered under default 'sm' breakpoint
  // Going to just write in mock sizes, but open to changing them
  breakpoints: ['16em', '48em', '64em', '80em'],
  fontWeights: {
    bold: 'bold',
  },
  icons: {
    ...theme.icons,
    arrowRight: {
      path: (
        <>
          <title id="arrowRight">Go to next page</title>

          <path
            d="M8.2349 10.6045L8.97417 9.93105L8.26707 9.22395L2.92231 3.87919C2.56865 3.52553 2.54466 2.99821 2.91508 2.49572C3.28168 1.99842 3.87736 1.76239 4.47425 1.9621C4.47488 1.96232 4.47551 1.96253 4.47615 1.96274L23.7319 8.52887C24.0772 8.66884 24.3 9.01292 24.2659 9.50808C24.2314 10.0075 23.9329 10.4704 23.4412 10.6735L3.22559 17.9589C3.22505 17.9591 3.22451 17.9593 3.22397 17.9595C2.52829 18.2066 2.06643 17.9442 1.84646 17.587C1.61515 17.2115 1.60259 16.6458 2.139 16.1572L8.2349 10.6045Z"
            fill="currentColor"
            stroke="black"
            stroke-width="2"
          />
        </>
      ),
      viewBox: '0 0 26 20',
      height: '20',
      width: '26',
    },
    arrowLeft: {
      path: (
        <>
          <title id="arrowLeft">Go to previous page</title>
          <path
            d="M17.5393 9.3823L16.8 10.0557L17.5071 10.7628L22.8519 16.1076C23.2055 16.4612 23.2295 16.9885 22.8591 17.491C22.4925 17.9883 21.8968 18.2244 21.2999 18.0247C21.2993 18.0244 21.2987 18.0242 21.298 18.024L2.04232 11.4579C1.69701 11.3179 1.47417 10.9738 1.5083 10.4787C1.54273 9.97932 1.84124 9.51639 2.33294 9.3133L22.5486 2.02782C22.5491 2.02763 22.5497 2.02744 22.5502 2.02725C23.2459 1.78021 23.7077 2.04256 23.9277 2.39971C24.159 2.77528 24.1716 3.34096 23.6352 3.82957L17.5393 9.3823Z"
            fill="currentColor"
            stroke="black"
            stroke-width="2"
          />
        </>
      ),
      viewBox: '0 0 26 20',
      height: '20',
      width: '26',
    },
  },
  border: {
    primaryButton: 'solid #ffffff',
  },
  borderWidths: {
    button: '1px',
  },
  colors: {
    ...theme.colors,
    'rbb-black-000': '#140303',
    'rbb-black-100': '#001514',
    'rbb-gray': '#565656',
    'rbb-white': '#F7F7F2',
    'rbb-red': '#BA2A2A',
    'rbb-orange': '#F46036',
  },
  letterSpacings: {
    button: '0.05em',
  },
  lineHeights: {
    button: '20px',
  },
  radii: {
    button: '100px',
  },
  buttons: {
    cta: {
      backgroundColor: {
        default: '#F46036',
        hover: '#AB4326',
        focus: '#AB4326',
        active: '#F7F7F2',
        disabled: '#AB4326',
      },
      color: {
        default: '#F4F5F7',
        hover: '#F4F5F7',
        focus: '#F4F5F7',
        active: '#AB4326',
        disabled: '#491D10',
      },
      borderColor: {
        default: '#C34D2B',
        hover: '#F4F5F7',
        focus: '#F4F5F7',
        active: '#F46036',
        disabled: '#491D10',
      },
      padding: '2px 4px',
      fontFamily: 'Arvo',
      textTransform: 'uppercase',
    },
    primary: {
      backgroundColor: {
        default: '#0E1111',
        hover: '#565858',
        focus: '#565858',
        active: '#F7F7F2',
        disabled: '#0E1111',
      },
      color: {
        default: '#F4F5F7',
        hover: '#F4F5F7',
        focus: '#F4F5F7',
        active: '#565858',
        disabled: '#7D7D7D',
      },
      borderColor: {
        default: '#FFFFFF',
        hover: '#FFFFFF',
        focus: '#FFFFFF',
        active: '#565858',
        disabled: '#FFFFFF',
      },
      padding: '2px 44px',
      fontFamily: 'Arvo',
      textTransform: 'uppercase',
    },
    secondary: {
      backgroundColor: {
        default: '#F7F7F2',
        hover: '#C0C0C0',
        focus: '#C0C0C0',
        active: '#F7F7F2',
        disabled: '#F7F7F2',
      },
      color: {
        default: '#0E1111',
        hover: '#0E1111',
        focus: '#0E1111',
        active: '#0E1111',
        disabled: '#A6A6A6',
      },
      borderColor: {
        default: '#C0C0C0',
        hover: '#C0C0C0',
        focus: '#C0C0C0',
        active: '#0E1111',
        disabled: '#F7F7F2',
      },
      padding: '2px 44px',
      fontFamily: 'Arvo',
      textTransform: 'uppercase',
    },
  },
  links: {
    font: 'Arvo',
    standard: {
      color: {
        default: '#00000',
        hover: '#F46036',
        focus: '#F46036',
      },
    },
    cta: {
      color: {
        default: '#F46036',
        hover: '#BA2A2A',
        focus: '#BA2A2A',
      },
    },
    footer: {
      color: {
        default: '#F7F7F2B3',
        hover: '#ffffff',
        focus: '#ffffff',
      },
    },
  },
};

export default customTheme;
