import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setUser, setLoading, setError } from '../../store/slices/userSlice';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const { name, email, loading, error } = useAppSelector(state => state.user);
  const [editName, setEditName] = React.useState(name);
  const [editEmail, setEditEmail] = React.useState(email);
  const [editing, setEditing] = React.useState(false);

  const handleSave = () => {
    dispatch(setLoading(true));
    setTimeout(() => {
      if (!editName || !editEmail) {
        dispatch(setError('נא למלא שם ודוא"ל'));
        dispatch(setLoading(false));
        return;
      }
      dispatch(setUser({ name: editName, email: editEmail }));
      dispatch(setLoading(false));
      setEditing(false);
    }, 600);
  };

  React.useEffect(() => {
    setEditName(name);
    setEditEmail(email);
  }, [name, email]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>הפרופיל שלי</Text>
      {loading && <ActivityIndicator size="large" color="#6C47FF" style={{ marginVertical: 24 }} />}
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        value={editName}
        onChangeText={setEditName}
        placeholder="שם מלא"
        editable={editing}
        textAlign="right"
      />
      <TextInput
        style={styles.input}
        value={editEmail}
        onChangeText={setEditEmail}
        placeholder={'דוא"ל'}
        editable={editing}
        keyboardType="email-address"
        textAlign="right"
        autoCapitalize="none"
      />
      <Pressable
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.7 : 1 }]}
        onPress={() => (editing ? handleSave() : setEditing(true))}
        accessibilityRole="button"
        accessibilityLabel={editing ? 'שמור פרופיל' : 'ערוך פרופיל'}
      >
        <Text style={styles.buttonText}>{editing ? 'שמור' : 'ערוך'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 24, paddingTop: 32 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#bbb', borderRadius: 8, padding: 14, fontSize: 16, marginBottom: 18, backgroundColor: '#f9f9ff', color: '#222' },
  button: { backgroundColor: '#6C47FF', paddingVertical: 14, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  error: { color: 'red', textAlign: 'center', marginBottom: 14 },
});
