import * as React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setNotificationsEnabled, setDarkMode } from '../../store/slices/settingsSlice';

export default function SettingsScreen() {
  const dispatch = useAppDispatch();
  const { notificationsEnabled, darkMode } = useAppSelector(state => state.settings);

  // Wrap dispatch in a function to match Switch signature (void return)
  const handleNotificationsChange = (value: boolean) => {
    dispatch(setNotificationsEnabled(value));
  };
  const handleDarkModeChange = (value: boolean) => {
    dispatch(setDarkMode(value));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>הגדרות</Text>
      <View style={styles.row}>
        <Text style={styles.label}>התראות</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={handleNotificationsChange}
          thumbColor={notificationsEnabled ? '#6C47FF' : '#ccc'}
          trackColor={{ false: '#bbb', true: '#d1c4e9' }}
          accessibilityLabel="הפעל/כבה התראות"
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>מצב כהה</Text>
        <Switch
          value={darkMode}
          onValueChange={handleDarkModeChange}
          thumbColor={darkMode ? '#6C47FF' : '#ccc'}
          trackColor={{ false: '#bbb', true: '#d1c4e9' }}
          accessibilityLabel="הפעל/כבה מצב כהה"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 24, paddingTop: 32 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  row: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 },
  label: { fontSize: 18, color: '#222' },
});
