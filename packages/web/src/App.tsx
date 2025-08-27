import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Button, Text, Container, ThemeProvider, formatDate, useTheme } from '@monorepo/shared';

function HomePage() {
  const { theme, isDark, toggleTheme } = useTheme();
  
  return (
    <Container padding="lg" backgroundColor={theme.colors.background}>
      <Text variant="title" color="primary" testID="web-title">
        Web Frontend
      </Text>
      <Text variant="body" color="secondary" testID="web-description">
        React application using shared cross-platform components and utilities.
      </Text>
      
      <div style={{ marginTop: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <Button 
          onPress={() => alert(`Current time: ${formatDate(new Date())}`)}
          variant="primary"
          testID="test-date-button"
        >
          Test Date Utils
        </Button>
        
        <Button 
          onPress={toggleTheme}
          variant="secondary"
          testID="toggle-theme-button"
        >
          Toggle Theme ({isDark ? 'Dark' : 'Light'})
        </Button>
        
        <Button 
          onPress={() => alert('Cross-platform component working!')}
          variant="outline"
          testID="cross-platform-button"
        >
          Cross-Platform Test
        </Button>
      </div>

      <Container margin="md" padding="md" backgroundColor={theme.colors.surface}>
        <Text variant="subtitle" color="primary">
          Cross-Platform Design Features:
        </Text>
        <Text variant="body" color="secondary">
          ✓ Shared components that adapt to web and mobile
        </Text>
        <Text variant="body" color="secondary">
          ✓ Unified theme system
        </Text>
        <Text variant="body" color="secondary">
          ✓ Platform-specific optimizations
        </Text>
        <Text variant="body" color="secondary">
          ✓ Consistent API across platforms
        </Text>
      </Container>
    </Container>
  );
}

function App() {
  return (
    <ThemeProvider initialTheme="system">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
