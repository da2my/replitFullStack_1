import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { formatDate, validateEmail } from '@monorepo/shared';

export default function App() {
  const handlePress = () => {
    Alert.alert('Shared Utils', `Current time: ${formatDate(new Date())}`);
  };

  const testEmail = () => {
    const email = 'test@example.com';
    const isValid = validateEmail(email);
    Alert.alert('Email Validation', `${email} is ${isValid ? 'valid' : 'invalid'}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mobile App</Text>
      <Text style={styles.subtitle}>
        React Native application using shared utilities.
      </Text>
      
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Test Date Formatter</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={testEmail}>
        <Text style={styles.buttonText}>Test Email Validator</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
