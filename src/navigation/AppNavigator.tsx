import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/onboarding/SplashScreen';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import PreferencesStep1 from '../screens/onboarding/PreferencesStep1';
import PreferencesStep2 from '../screens/onboarding/PreferencesStep2';
import PreferencesStep3 from '../screens/onboarding/PreferencesStep3';
import AuthScreen from '../screens/main/AuthScreen';
import MainAppNavigator from './MainAppNavigator';
import { supabase } from '../services/supabaseClient';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  const [sessionChecked, setSessionChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Session restoration for Supabase (SDK-compatible)
    const checkSession = () => {
      const session = typeof supabase.auth.session === 'function' ? supabase.auth.session() : supabase.auth.session;
      console.log('[AppNavigator] Session on mount:', session);
      setIsAuthenticated(!!session);
      setSessionChecked(true);
    };
    checkSession();
    // Listen to auth state
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentSession = typeof supabase.auth.session === 'function' ? supabase.auth.session() : supabase.auth.session;
      console.log('[AppNavigator] Auth state changed. Session:', session, 'Current session:', currentSession);
      setIsAuthenticated(!!currentSession);
    });
    return () => {
      listener?.unsubscribe();
    };
  }, []);

  if (!sessionChecked) return null;

  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PreferencesStep1" component={PreferencesStep1} options={{ title: 'העדפות - שלב 1', headerShown: false }} />
      <Stack.Screen name="PreferencesStep2" component={PreferencesStep2} options={{ title: 'העדפות - שלב 2', headerShown: false }} />
      <Stack.Screen name="PreferencesStep3" component={PreferencesStep3} options={{ title: 'העדפות - שלב 3', headerShown: false }} />
      {!isAuthenticated && (
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
      )}
      {isAuthenticated && (
        <Stack.Screen name="MainApp" component={MainAppNavigator} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}
