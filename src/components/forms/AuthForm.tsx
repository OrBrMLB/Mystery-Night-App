import React, { useState, useCallback } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithEmail, signUpWithEmail } from '../../services/authService';
import { setAuthUser, setAuthLoading, setAuthError } from '../../store/slices/authSlice';
import { RootState } from '../../store';

interface AuthFormProps {
  mode: 'signIn' | 'signUp';
}

const Container = styled.View`
  padding: 24px;
`;
const Input = styled.TextInput`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 16px;
  font-size: 16px;
`;
const Button = styled.TouchableOpacity`
  background-color: #6c47ff;
  padding: 14px;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 12px;
`;
const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
const ErrorText = styled.Text`
  color: red;
  margin-bottom: 12px;
  text-align: center;
`;

export function AuthForm({ mode }: AuthFormProps) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = useCallback(async () => {
    dispatch(setAuthLoading(true));
    const fn = mode === 'signIn' ? signInWithEmail : signUpWithEmail;
    const { user, session, error } = await fn(email, password);
    if (error) {
      dispatch(setAuthError(error.message || 'שגיאת התחברות'));
    } else {
      dispatch(setAuthUser({ user, session }));
    }
    dispatch(setAuthLoading(false));
  }, [dispatch, email, password, mode]);

  return (
    <Container>
      {error && <ErrorText>{error}</ErrorText>}
      <Input
        placeholder="אימייל"
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        editable={!loading}
      />
      <Input
        placeholder="סיסמה"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        editable={!loading}
      />
      <Button onPress={handleAuth} disabled={loading} accessibilityRole="button">
        <ButtonText>{mode === 'signIn' ? 'התחבר' : 'הרשמה'}</ButtonText>
      </Button>
    </Container>
  );
}
