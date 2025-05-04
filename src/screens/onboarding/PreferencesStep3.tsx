import * as React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PreferencesStep3() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 24 }}>העדפות - שלב 3</Text>
      <Pressable
        onPress={() => navigation.navigate('MainApp')}
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
