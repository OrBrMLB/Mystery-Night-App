import React, { useState, useCallback } from 'react';
import { SafeAreaView, Text, TextInput, Button, View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { supabase } from '../../services/supabaseClient';

export function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');

  const handleAuth = useCallback(async () => {
    setLoading(true);
    try {
      let result;
      if (mode === 'signIn') {
        result = await supabase.auth.signInWithPassword({ email, password });
      } else {
        result = await supabase.auth.signUp({ email, password });
      }
      if (result.error) {
        Alert.alert('Authentication Error', result.error.message);
      } else {
        Alert.alert('Success', mode === 'signIn' ? 'Signed in!' : 'Account created!');
      }
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [email, password, mode]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{mode === 'signIn' ? 'Sign In' : 'Sign Up'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        accessibilityLabel="Email"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        accessibilityLabel="Password"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#6C47FF" />
      ) : (
        <Button title={mode === 'signIn' ? 'Sign In' : 'Sign Up'} onPress={handleAuth} accessibilityLabel={mode === 'signIn' ? 'Sign In' : 'Sign Up'} />
      )}
      <View style={styles.switchContainer}>
        <Text>
          {mode === 'signIn' ? "Don't have an account?" : 'Already have an account?'}
        </Text>
        <Button
          title={mode === 'signIn' ? 'Sign Up' : 'Sign In'}
          onPress={() => setMode(mode === 'signIn' ? 'signUp' : 'signIn')}
          accessibilityLabel={mode === 'signIn' ? 'Switch to Sign Up' : 'Switch to Sign In'}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#F7F7F7',
  },
  switchContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
});

export default AuthScreen;
