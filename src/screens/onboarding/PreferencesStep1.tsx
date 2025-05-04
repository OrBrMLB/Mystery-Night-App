import * as React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Define the navigation type for safety
export type OnboardingStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  PreferencesStep1: undefined;
  PreferencesStep2: undefined;
  PreferencesStep3: undefined;
};

export default function PreferencesStep1() {
  const navigation = useNavigation<NavigationProp<OnboardingStackParamList>>();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 24 }}>העדפות - שלב 1</Text>
      <Pressable
        onPress={() => navigation.navigate('PreferencesStep2')}
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#6C47FF99' : '#6C47FF',
          paddingVertical: 14,
          paddingHorizontal: 36,
          borderRadius: 8,
          marginTop: 12,
        })}
        accessibilityRole="button"
        accessibilityLabel="המשך לשלב 2"
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>המשך</Text>
      </Pressable>
    </View>
  );
}
