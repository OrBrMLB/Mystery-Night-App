import * as React from 'react';
import { View, Text, StyleSheet, Switch, ActivityIndicator } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setNotificationsEnabled, setDarkMode, persistSettings, loadPersistedSettings } from '../../store/slices/settingsSlice';

export default function SettingsScreen() {
  const dispatch = useAppDispatch();
  const { notificationsEnabled, darkMode, hydrated } = useAppSelector(state => state.settings);

  React.useEffect(() => {
    if (!hydrated) {
      dispatch(loadPersistedSettings());
    }
  }, [hydrated, dispatch]);

  React.useEffect(() => {
    if (hydrated) {
      dispatch(persistSettings());
    }
  }, [notificationsEnabled, darkMode, hydrated, dispatch]);

  // Wrap dispatch in a function to match Switch signature (void return)
  const handleNotificationsChange = (value: boolean) => {
    dispatch(setNotificationsEnabled(value));
  };
  const handleDarkModeChange = (value: boolean) => {
    dispatch(setDarkMode(value));
  };

  if (!hydrated) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6C47FF" style={{ marginTop: 48 }} />
      </View>
    );
  }

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
      <View style={[styles.row, { marginTop: 40, justifyContent: 'center' }]}> 
        <Text 
          style={styles.logoutButton}
          accessibilityRole="button"
          accessibilityLabel="התנתק מהחשבון"
          onPress={async () => {
            try {
              await import('../../services/supabaseClient').then(({ supabase }) => supabase.auth.signOut());
              // Debug: confirm session cleared
              setTimeout(async () => {
                const { supabase } = await import('../../services/supabaseClient');
                console.log('Session after logout:', supabase.auth.session);
              }, 500);
            } catch (e) {
              // Optionally handle error
            }
          }}
        >
          התנתק
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...StyleSheet.flatten({
    logoutButton: {
      color: '#fff',
      backgroundColor: '#6C47FF',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 8,
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center',
      marginTop: 16,
      overflow: 'hidden',
      elevation: 2,
    },
  }),
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 24, paddingTop: 32 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  row: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 },
  label: { fontSize: 18, color: '#222' },
});
