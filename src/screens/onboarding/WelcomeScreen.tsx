import * as React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { OnboardingStackParamList } from './PreferencesStep1';

export default function WelcomeScreen() {
  const navigation = useNavigation<NavigationProp<OnboardingStackParamList>>();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 32 }}>
        ברוך הבא ל-Mystery Night!
      </Text>
      <Pressable
        onPress={() => navigation.navigate('PreferencesStep1')}
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#6C47FF99' : '#6C47FF',
          paddingVertical: 16,
          paddingHorizontal: 40,
          borderRadius: 8,
          marginTop: 12,
        })}
        accessibilityRole="button"
        accessibilityLabel="התחל הגדרת העדפות"
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>התחל</Text>
      </Pressable>
    </View>
  );
}
