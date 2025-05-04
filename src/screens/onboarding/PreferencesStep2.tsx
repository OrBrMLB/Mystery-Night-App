import * as React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { OnboardingStackParamList } from './PreferencesStep1';

export default function PreferencesStep2() {
  const navigation = useNavigation<NavigationProp<OnboardingStackParamList>>();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 24 }}>העדפות - שלב 2</Text>
      <Pressable
        onPress={() => navigation.navigate('PreferencesStep3')}
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#6C47FF99' : '#6C47FF',
          paddingVertical: 14,
          paddingHorizontal: 36,
          borderRadius: 8,
          marginTop: 12,
        })}
        accessibilityRole="button"
        accessibilityLabel="המשך לשלב 3"
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>המשך</Text>
      </Pressable>
    </View>
  );
}
