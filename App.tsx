import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as ReduxProvider } from 'react-redux';
import store from './src/store';
import { createContext } from 'react';
import { theme } from './src/constants/theme';
import { AppNavigator } from './src/navigation/AppNavigator';

// Provide ThemeContext locally since it's not exported from theme
export const ThemeContext = createContext(theme);

export default function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeContext.Provider value={theme}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ThemeContext.Provider>
    </ReduxProvider>
  );
}
