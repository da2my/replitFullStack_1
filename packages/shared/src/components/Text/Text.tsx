import React from 'react';

// Platform detection
const isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';

export interface TextProps {
  children: React.ReactNode;
  variant?: 'body' | 'title' | 'subtitle' | 'caption';
  color?: 'primary' | 'secondary' | 'accent' | 'muted';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  numberOfLines?: number;
  testID?: string;
}

// Web styles
const webStyles = {
  variants: {
    body: { fontSize: '16px', lineHeight: '24px' },
    title: { fontSize: '24px', lineHeight: '32px', fontWeight: 'bold' },
    subtitle: { fontSize: '18px', lineHeight: '26px', fontWeight: '600' },
    caption: { fontSize: '14px', lineHeight: '20px' },
  },
  colors: {
    primary: { color: '#000000' },
    secondary: { color: '#666666' },
    accent: { color: '#007AFF' },
    muted: { color: '#888888' },
  },
  weights: {
    normal: { fontWeight: 'normal' },
    medium: { fontWeight: '500' },
    semibold: { fontWeight: '600' },
    bold: { fontWeight: 'bold' },
  },
  aligns: {
    left: { textAlign: 'left' as const },
    center: { textAlign: 'center' as const },
    right: { textAlign: 'right' as const },
  },
};

// React Native styles
const nativeStyles = {
  variants: {
    body: { fontSize: 16, lineHeight: 24 },
    title: { fontSize: 24, lineHeight: 32, fontWeight: 'bold' as const },
    subtitle: { fontSize: 18, lineHeight: 26, fontWeight: '600' as const },
    caption: { fontSize: 14, lineHeight: 20 },
  },
  colors: {
    primary: { color: '#000000' },
    secondary: { color: '#666666' },
    accent: { color: '#007AFF' },
    muted: { color: '#888888' },
  },
  weights: {
    normal: { fontWeight: 'normal' as const },
    medium: { fontWeight: '500' as const },
    semibold: { fontWeight: '600' as const },
    bold: { fontWeight: 'bold' as const },
  },
  aligns: {
    left: { textAlign: 'left' as const },
    center: { textAlign: 'center' as const },
    right: { textAlign: 'right' as const },
  },
};

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  weight = 'normal',
  align = 'left',
  numberOfLines,
  testID = 'text',
}) => {
  if (isReactNative) {
    const NativeText = require('react-native').Text;

    const textStyle = [
      nativeStyles.variants[variant],
      nativeStyles.colors[color],
      nativeStyles.weights[weight],
      nativeStyles.aligns[align],
    ];

    return React.createElement(NativeText, {
      style: textStyle,
      numberOfLines,
      testID,
    }, children);
  }

  // Web implementation
  const textStyle = {
    ...webStyles.variants[variant],
    ...webStyles.colors[color],
    ...webStyles.weights[weight],
    ...webStyles.aligns[align],
    ...(numberOfLines && {
      display: '-webkit-box',
      WebkitLineClamp: numberOfLines,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    }),
  };

  const tag = variant === 'title' ? 'h1' : variant === 'subtitle' ? 'h2' : 'p';

  return React.createElement(
    tag,
    {
      style: textStyle,
      'data-testid': testID,
    },
    children
  );
};

export default Text;