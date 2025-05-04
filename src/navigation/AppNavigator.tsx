import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/onboarding/SplashScreen';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import PreferencesStep1 from '../screens/onboarding/PreferencesStep1';
import PreferencesStep2 from '../screens/onboarding/PreferencesStep2';
import PreferencesStep3 from '../screens/onboarding/PreferencesStep3';
import MainAppNavigator from './MainAppNavigator';

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PreferencesStep1" component={PreferencesStep1} options={{ title: 'העדפות - שלב 1', headerShown: false }} />
      <Stack.Screen name="PreferencesStep2" component={PreferencesStep2} options={{ title: 'העדפות - שלב 2', headerShown: false }} />
      <Stack.Screen name="PreferencesStep3" component={PreferencesStep3} options={{ title: 'העדפות - שלב 3', headerShown: false }} />
      <Stack.Screen name="MainApp" component={MainAppNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
