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
  fontWeights: {
    bold: 'bold',
  },
  icons: {
    ...theme.icons,
    arrowRight: {
      path: (
        <path
          fill="currentColor"
          transform="rotate(45 11 12)"
          d="M 19.558594 4.285156 L 11.699219 20 C 11.5625 20.285156 11.328125 20.429688 11 20.429688 C 10.960938 20.429688 10.898438 20.421875 10.816406 20.402344 C 10.636719 20.363281 10.492188 20.269531 10.378906 20.128906 C 10.269531 19.984375 10.214844 19.824219 10.214844 19.644531 L 10.214844 12.570312 L 3.144531 12.570312 C 2.960938 12.570312 2.800781 12.515625 2.65625 12.40625 C 2.515625 12.296875 2.421875 12.148438 2.382812 11.96875 C 2.339844 11.789062 2.355469 11.617188 2.429688 11.453125 C 2.503906 11.289062 2.625 11.167969 2.785156 11.085938 L 18.5 3.230469 C 18.609375 3.171875 18.726562 3.144531 18.855469 3.144531 C 19.078125 3.144531 19.261719 3.21875 19.410156 3.375 C 19.53125 3.492188 19.609375 3.632812 19.636719 3.800781 C 19.664062 3.96875 19.640625 4.128906 19.558594 4.285156 Z M 19.558594 4.285156"
        />
      ),
      viewBox: '0 0 22 24',
      height: '24',
      width: '22',
    },
    arrowLeft: {
      path: (
        <path
          fill="currentColor"
          transform="rotate(225 11 12)"
          d="M 19.558594 4.285156 L 11.699219 20 C 11.5625 20.285156 11.328125 20.429688 11 20.429688 C 10.960938 20.429688 10.898438 20.421875 10.816406 20.402344 C 10.636719 20.363281 10.492188 20.269531 10.378906 20.128906 C 10.269531 19.984375 10.214844 19.824219 10.214844 19.644531 L 10.214844 12.570312 L 3.144531 12.570312 C 2.960938 12.570312 2.800781 12.515625 2.65625 12.40625 C 2.515625 12.296875 2.421875 12.148438 2.382812 11.96875 C 2.339844 11.789062 2.355469 11.617188 2.429688 11.453125 C 2.503906 11.289062 2.625 11.167969 2.785156 11.085938 L 18.5 3.230469 C 18.609375 3.171875 18.726562 3.144531 18.855469 3.144531 C 19.078125 3.144531 19.261719 3.21875 19.410156 3.375 C 19.53125 3.492188 19.609375 3.632812 19.636719 3.800781 C 19.664062 3.96875 19.640625 4.128906 19.558594 4.285156 Z M 19.558594 4.285156"
        />
      ),
      viewBox: '0 0 22 24',
      height: '24',
      width: '22',
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
    'rbb-black': '#140303',
    'rbb-gray': '#259f6c',
    'rbb-white': '#1e6b7f',
    'rbb-red': '#fafcd6',
    'rbb-orange': '#f46036',
    'rbb-hover-gray': '#757575',
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
};

export default customTheme;
