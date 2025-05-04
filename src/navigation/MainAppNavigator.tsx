import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/main/HomeScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import EventsScreen from '../screens/main/EventsScreen';
import SettingsScreen from '../screens/main/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function MainAppNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Events') iconName = 'calendar';
          else if (route.name === 'Profile') iconName = 'person';
          else if (route.name === 'Settings') iconName = 'settings';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6C47FF',
        tabBarInactiveTintColor: '#888',
        tabBarLabelStyle: { fontWeight: 'bold', fontSize: 13 },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'בית' }} />
      <Tab.Screen name="Events" component={EventsScreen} options={{ title: 'אירועים' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'פרופיל' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'הגדרות' }} />
    </Tab.Navigator>
  );
}
