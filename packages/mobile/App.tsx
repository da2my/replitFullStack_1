import React from 'react';
import { Alert } from 'react-native';
import { 
  Button, 
  Text, 
  Container, 
  ThemeProvider, 
  useTheme,
  formatDate, 
  validateEmail 
} from '@monorepo/shared';

function HomeScreen() {
  const { theme, isDark, toggleTheme } = useTheme();

  const handleDateTest = () => {
    Alert.alert('Shared Utils', `Current time: ${formatDate(new Date())}`);
  };

  const testEmail = () => {
    const email = 'test@example.com';
    const isValid = validateEmail(email);
    Alert.alert('Email Validation', `${email} is ${isValid ? 'valid' : 'invalid'}`);
  };

  const testCrossPlatform = () => {
    Alert.alert(
      'Cross-Platform Success!', 
      'This same component code runs on both web and mobile platforms.'
    );
  };

  return (
    <Container flex center padding="lg" backgroundColor={theme.colors.background}>
      <Text variant="title" color="primary" testID="mobile-title">
        Mobile App
      </Text>
      
      <Text 
        variant="body" 
        color="secondary" 
        align="center"
        testID="mobile-description"
      >
        React Native application using shared cross-platform components and utilities.
      </Text>
      
      <Container padding="md">
        <Button 
          onPress={handleDateTest}
          variant="primary"
          size="lg"
          fullWidth
          testID="test-date-button"
        >
          Test Date Utils
        </Button>
        
        <Container margin="sm">
          <Button 
            onPress={testEmail}
            variant="secondary"
            size="lg"
            fullWidth
            testID="test-email-button"
          >
            Test Email Validator
          </Button>
        </Container>
        
        <Button 
          onPress={toggleTheme}
          variant="outline"
          size="lg"
          fullWidth
          testID="toggle-theme-button"
        >
          Toggle Theme ({isDark ? 'Dark' : 'Light'})
        </Button>
        
        <Container margin="sm">
          <Button 
            onPress={testCrossPlatform}
            variant="primary"
            size="lg"
            fullWidth
            testID="cross-platform-button"
          >
            Cross-Platform Test
          </Button>
        </Container>
      </Container>

      <Container 
        margin="md" 
        padding="md" 
        backgroundColor={theme.colors.surface}
      >
        <Text variant="subtitle" color="primary" align="center">
          Cross-Platform Design Features:
        </Text>
        <Text variant="body" color="secondary" align="center">
          ✓ Same components, different platforms
        </Text>
        <Text variant="body" color="secondary" align="center">
          ✓ Unified theme system
        </Text>
        <Text variant="body" color="secondary" align="center">
          ✓ Platform-optimized rendering
        </Text>
        <Text variant="body" color="secondary" align="center">
          ✓ Consistent user experience
        </Text>
      </Container>
    </Container>
  );
}

export default function App() {
  return (
    <ThemeProvider initialTheme="system">
      <HomeScreen />
    </ThemeProvider>
  );
}
