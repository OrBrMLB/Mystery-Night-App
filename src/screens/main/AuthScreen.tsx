import React, { useState, useCallback } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View, StyleSheet, ActivityIndicator, I18nManager } from 'react-native';
import { supabase } from '../../services/supabaseClient';

export function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [error, setError] = useState<string | null>(null);
  const [showVerifyNotice, setShowVerifyNotice] = useState(false);

  // Basic validation
  const validate = () => {
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      setError('אנא הזן אימייל תקין');
      return false;
    }
    if (password.length < 6) {
      setError('הסיסמה חייבת להכיל לפחות 6 תווים');
      return false;
    }
    if (mode === 'signUp' && confirmPassword !== undefined && confirmPassword !== '') {
      if (password.trim() !== confirmPassword.trim()) {
        setError('הסיסמאות אינן תואמות');
        setPassword('');
        setConfirmPassword('');
        return false;
      }
    }
    if (mode === 'signUp') {
      if (!firstName.trim()) {
        setError('אנא הזן שם פרטי');
        return false;
      }
      if (!lastName.trim()) {
        setError('אנא הזן שם משפחה');
        return false;
      }
    }
    setError(null);
    return true;
  };

  const handleAuth = useCallback(async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      let result;
      if (mode === 'signIn') {
        result = await supabase.auth.signIn({ email, password });
      } else {
        result = await supabase.auth.signUp({ email, password });
        if (!result.error) {
          setShowVerifyNotice(true);
        }
      }
      if (result.error) {
        setError(result.error.message);
      } else {
        setError(null);
      }
    } catch (e: any) {
      setError(e.message || 'שגיאה לא ידועה');
    } finally {
      setLoading(false);
    }
  }, [email, password, mode]);

  if (showVerifyNotice) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={[styles.title, { marginBottom: 16 }]}>הרשמה הושלמה</Text>
        <Text style={{ fontSize: 18, color: '#333', textAlign: 'center', marginBottom: 32 }}>
          נשלח אליך מייל לאימות הכתובת. יש לאשר את כתובת האימייל כדי להשלים את התהליך.
        </Text>
        <TouchableOpacity
          style={[styles.authButton, { marginTop: 24, paddingVertical: 18 }]}
          onPress={() => { setShowVerifyNotice(false); setMode('signIn'); setError(null); }}
          accessibilityRole="button"
          accessibilityLabel="עבור להתחברות"
        >
          <Text style={[styles.authButtonText, { fontSize: 20 }]}>עבור להתחברות</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title} accessibilityRole="header" accessibilityLabel={mode === 'signIn' ? 'התחברות' : 'הרשמה'}>{mode === 'signIn' ? 'התחברות' : 'הרשמה'}</Text>
      {mode === 'signUp' && (
        <TextInput
          style={[styles.input, I18nManager.isRTL && { textAlign: 'right' }]}
          placeholder="שם פרטי"
          autoCapitalize="words"
          value={firstName}
          onChangeText={setFirstName}
          accessibilityLabel="שם פרטי"
          importantForAutofill="yes"
        />
      )}
      {mode === 'signUp' && (
        <TextInput
          style={[styles.input, I18nManager.isRTL && { textAlign: 'right' }]}
          placeholder="שם משפחה"
          autoCapitalize="words"
          value={lastName}
          onChangeText={setLastName}
          accessibilityLabel="שם משפחה"
          importantForAutofill="yes"
        />
      )}
      <TextInput
        style={[styles.input, I18nManager.isRTL && { textAlign: 'right' }]}
        placeholder="אימייל"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        accessibilityLabel="אימייל"
        textContentType="emailAddress"
        autoComplete="email"
        importantForAutofill="yes"
      />
      <TextInput
        style={[styles.input, I18nManager.isRTL && { textAlign: 'right' }]}
        placeholder="סיסמה"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        accessibilityLabel="סיסמה"
        textContentType="password"
        autoComplete="password"
        importantForAutofill="yes"
      />
      {mode === 'signUp' && (
        <TextInput
          style={[styles.input, I18nManager.isRTL && { textAlign: 'right' }]}
          placeholder="אימות סיסמה"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          accessibilityLabel="אימות סיסמה"
          textContentType="password"
          autoComplete="password"
          importantForAutofill="yes"
        />
      )}
      {error && (
        <Text style={styles.error} accessibilityLiveRegion="polite">{error}</Text>
      )}
      <TouchableOpacity
        style={styles.authButton}
        onPress={handleAuth}
        accessibilityRole="button"
        accessibilityLabel={mode === 'signIn' ? 'התחבר' : 'צור חשבון'}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.authButtonText}>{mode === 'signIn' ? 'התחבר' : 'צור חשבון'}</Text>
        )}
      </TouchableOpacity>

      {/* Divider for Social Login */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>או התחבר עם</Text>
        <View style={styles.divider} />
      </View>
      <View style={styles.socialButtonsContainer}>
        {/* TODO: Connect Google login logic later */}
        <TouchableOpacity style={styles.socialButton} accessibilityRole="button" accessibilityLabel="התחבר עם Google">
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>
        {/* TODO: Connect Apple login logic later */}
        <TouchableOpacity style={styles.socialButton} accessibilityRole="button" accessibilityLabel="התחבר עם Apple">
          <Text style={styles.socialButtonText}>Apple</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>
          {mode === 'signIn' ? 'אין לך חשבון?' : 'כבר יש לך חשבון?'}
        </Text>
        <TouchableOpacity
          onPress={() => { setMode(mode === 'signIn' ? 'signUp' : 'signIn'); setError(null); }}
          accessibilityRole="button"
          accessibilityLabel={mode === 'signIn' ? 'עבור להרשמה' : 'עבור להתחברות'}
        >
          <Text style={styles.switchLink}>{mode === 'signIn' ? 'הרשמה' : 'התחברות'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },
  dividerText: {
    fontSize: 14,
    color: '#888',
    fontWeight: 'bold',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  socialButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
  },
  socialButtonText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  error: {
    color: '#d32f2f',
    backgroundColor: '#fff0f0',
    padding: 8,
    borderRadius: 6,
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 15,
  },
  authButton: {
    backgroundColor: '#6C47FF',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginVertical: 8,
    marginBottom: 18,
    elevation: 2,
  },
  authButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  switchText: {
    fontSize: 15,
    color: '#222',
    marginBottom: 6,
    textAlign: 'center',
  },
  switchLink: {
    color: '#6C47FF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 2,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#F7F7F7',
  },
  switchContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
});

export default AuthScreen;
