import * as React from 'react';
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>דף הבית</Text>
      <Text style={{ fontSize: 16, marginTop: 16 }}>ברוך הבא לאפליקציה!</Text>
    </View>
  );
}
