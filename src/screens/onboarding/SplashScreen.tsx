import * as React from 'react';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Use StackActions.replace to avoid type issues and keep navigation type-safe
      navigation.dispatch(StackActions.replace('Welcome'));
    }, 1200); // Show splash for 1.2 seconds
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Splash Screen</Text>
    </View>
  );
}
