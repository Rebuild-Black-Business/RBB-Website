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
