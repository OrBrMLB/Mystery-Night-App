import * as React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the type for the stack navigator
// Update this type if your navigator has more screens
 type OnboardingStackParamList = {
   Splash: undefined;
   Welcome: undefined;
   PreferencesStep1: undefined;
   PreferencesStep2: undefined;
   PreferencesStep3: undefined;
   Auth: undefined;
   MainApp: undefined;
 };


export default function PreferencesStep3() {
  const navigation = useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 24 }}>העדפות - שלב 3</Text>
      <Pressable
        onPress={async () => {
          // Onboarding navigation fix: only go to MainApp if authenticated, else go to Auth
          const { supabase } = await import('../../services/supabaseClient');
          const session = typeof supabase.auth.session === 'function' ? supabase.auth.session() : supabase.auth.session;
          if (session) {
            navigation.navigate('MainApp');
          } else {
            navigation.navigate('Auth');
          }
        }}
        style={({ pressed }) => ({
          backgroundColor: pressed ? '#6C47FF99' : '#6C47FF',
          paddingVertical: 14,
          paddingHorizontal: 36,
          borderRadius: 8,
          marginTop: 12,
        })}
        accessibilityRole="button"
        accessibilityLabel="סיום והמשך לאפליקציה הראשית"
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>סיום</Text>
      </Pressable>
    </View>
  );
}
