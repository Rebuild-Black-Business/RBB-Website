import React from 'react';
import { theme } from '@chakra-ui/core';
import 'typeface-inter';
import 'typeface-arvo';

const customTheme = {
  ...theme,
  containers: {
    main: '1220px',
  },
  spacing: {
    xs: '0.75rem',
    base: '1rem',
    med: '1.5rem',
    lg: '3rem',
  },
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
    flag: {
      path: (
        <path
          d="M10.877 2.88c-1.505 0-2.858-1.034-4.96-1.034-.96 0-1.786.21-2.473.49.068-.215.09-.444.065-.67C3.43.929 2.85.348 2.147.3 1.29.241.578.956.578 1.846c0 .574.296 1.074.735 1.342v13.127c0 .286.22.517.49.517h.49c.271 0 .49-.231.49-.517V13.62c1.161-.557 2.184-.922 3.917-.922 1.505 0 2.859 1.034 4.96 1.034 1.792 0 3.124-.73 3.939-1.292.415-.286.665-.774.665-1.297V3.394c0-1.113-1.08-1.865-2.05-1.424-1.1.5-2.25.91-3.337.91zm3.916 8.268c-.667.498-1.863 1.033-3.132 1.033-1.837 0-3.126-1.033-4.961-1.033-1.328 0-2.953.304-3.916.775V4.43c.667-.498 1.863-1.034 3.133-1.034 1.836 0 3.125 1.034 4.96 1.034 1.326 0 2.951-.56 3.916-1.034v7.752z"
          fill="currentcolor"
        />
      ),
      viewBox: '0 0 17 17',
      height: '17',
      width: '17',
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
    'rbb-black-200': '#0E1111',
    'rbb-light-gray': '#E8E8E8',
    'rbb-gray': '#565656',
    'rbb-lightgray': '#757575',
    'rbb-white': '#F7F7F2',
    'rbb-white-100-alpha90': 'rgba(222, 222, 218, 0.9);',
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
      padding: '0.75rem 4rem',
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
      padding: '0.75rem 4rem',
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
      padding: '0.75rem 4rem',
      fontFamily: 'Arvo',
      textTransform: 'uppercase',
    },
  },
  footer: {
    iconsBackground: '#C4C4C4',
    iconsFill: '#000000',
    photoCreditLink: '#FFFFFF',
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
        default: '#F7F7F2',
        hover: '#F7F7F2',
        focus: '#F7F7F2',
      },
      opacity: {
        default: '0.7',
      },
    },
  },
};

export default customTheme;
