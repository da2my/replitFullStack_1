import React from 'react';

// Platform detection
const isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';

export interface ContainerProps {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  margin?: 'none' | 'sm' | 'md' | 'lg';
  backgroundColor?: string;
  flex?: boolean;
  center?: boolean;
  testID?: string;
}

// Web styles
const webStyles = {
  base: {
    display: 'block',
  },
  paddings: {
    none: { padding: '0' },
    sm: { padding: '8px' },
    md: { padding: '16px' },
    lg: { padding: '24px' },
  },
  margins: {
    none: { margin: '0' },
    sm: { margin: '8px' },
    md: { margin: '16px' },
    lg: { margin: '24px' },
  },
  flex: {
    display: 'flex',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
};

// React Native styles
const nativeStyles = {
  base: {},
  paddings: {
    none: { padding: 0 },
    sm: { padding: 8 },
    md: { padding: 16 },
    lg: { padding: 24 },
  },
  margins: {
    none: { margin: 0 },
    sm: { margin: 8 },
    md: { margin: 16 },
    lg: { margin: 24 },
  },
  flex: {
    flex: 1,
  },
  center: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
};

export const Container: React.FC<ContainerProps> = ({
  children,
  padding = 'md',
  margin = 'none',
  backgroundColor,
  flex = false,
  center = false,
  testID = 'container',
}) => {
  if (isReactNative) {
    const View = require('react-native').View;

    const containerStyle = [
      nativeStyles.base,
      nativeStyles.paddings[padding],
      nativeStyles.margins[margin],
      flex && nativeStyles.flex,
      center && nativeStyles.center,
      backgroundColor && { backgroundColor },
    ];

    return React.createElement(View, {
      style: containerStyle,
      testID,
    }, children);
  }

  // Web implementation
  const containerStyle = {
    ...webStyles.base,
    ...webStyles.paddings[padding],
    ...webStyles.margins[margin],
    ...(flex && webStyles.flex),
    ...(center && webStyles.center),
    ...(backgroundColor && { backgroundColor }),
  };

  return React.createElement(
    'div',
    {
      style: containerStyle,
      'data-testid': testID,
    },
    children
  );
};

export default Container;