import React from 'react';

// Platform detection utility
const isReactNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';

export interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  testID?: string;
}

// Web-specific styles
const webStyles = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s ease',
    textAlign: 'center' as const,
  },
  sizes: {
    sm: { padding: '8px 16px', fontSize: '14px' },
    md: { padding: '12px 24px', fontSize: '16px' },
    lg: { padding: '16px 32px', fontSize: '18px' },
  },
  variants: {
    primary: {
      backgroundColor: '#007AFF',
      color: 'white',
    },
    secondary: {
      backgroundColor: '#f0f0f0',
      color: '#333',
    },
    outline: {
      backgroundColor: 'transparent',
      color: '#007AFF',
      border: '2px solid #007AFF',
    },
  },
  disabled: {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  fullWidth: {
    width: '100%',
  },
};

// React Native-specific styles
const nativeStyles = {
  base: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  sizes: {
    sm: { paddingVertical: 8, paddingHorizontal: 16 },
    md: { paddingVertical: 12, paddingHorizontal: 24 },
    lg: { paddingVertical: 16, paddingHorizontal: 32 },
  },
  variants: {
    primary: {
      backgroundColor: '#007AFF',
    },
    secondary: {
      backgroundColor: '#f0f0f0',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: '#007AFF',
    },
  },
  text: {
    fontWeight: '600' as const,
    textAlign: 'center' as const,
  },
  textColors: {
    primary: '#ffffff',
    secondary: '#333333',
    outline: '#007AFF',
  },
  disabled: {
    opacity: 0.6,
  },
  fullWidth: {
    width: '100%' as const,
  },
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  testID = 'button',
}) => {
  if (isReactNative) {
    // React Native implementation
    const TouchableOpacity = require('react-native').TouchableOpacity;
    const Text = require('react-native').Text;

    const buttonStyle = [
      nativeStyles.base,
      nativeStyles.sizes[size],
      nativeStyles.variants[variant],
      disabled && nativeStyles.disabled,
      fullWidth && nativeStyles.fullWidth,
    ];

    const textStyle = [
      nativeStyles.text,
      { color: nativeStyles.textColors[variant] },
    ];

    return React.createElement(TouchableOpacity, {
      style: buttonStyle,
      onPress: disabled ? undefined : onPress,
      disabled,
      testID,
    }, React.createElement(Text, { style: textStyle }, children));
  }

  // Web implementation
  const buttonStyle = {
    ...webStyles.base,
    ...webStyles.sizes[size],
    ...webStyles.variants[variant],
    ...(disabled && webStyles.disabled),
    ...(fullWidth && webStyles.fullWidth),
  };

  return React.createElement(
    'button',
    {
      style: buttonStyle,
      onClick: disabled ? undefined : onPress,
      disabled,
      'data-testid': testID,
    },
    children
  );
};

export default Button;