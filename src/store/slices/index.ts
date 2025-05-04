import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import onboardingReducer from './onboardingSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  onboarding: onboardingReducer,
});

export default rootReducer;
