# Changelog

## [registration-complete] - 2025-05-12
### Added/Changed
- Registration now requires email, password, confirm password, first name, last name
- Added password confirmation with error handling and field reset
- Registration triggers email verification notice and login button
- All users deleted for clean registration testing
- Improved validation and error handling for all registration flows

### Pending
- Social login (Google/Apple) logic is next on the roadmap

### References
- See project memory and MCP for rationale and full milestone log

## [expo-fix] - 2025-05-11
### Fixed
- Restored working Expo/Metro configuration for both web and mobile
- Fixed persistent 500 errors and Metro silent failures on Windows
- Upgraded Expo SDK and aligned all related dependencies
- Fixed missing/misconfigured Supabase environment variables for Expo
- Updated Supabase client logic to use correct session/auth pattern for v2+
- Patched all auth/session logic to work on both web and mobile
- Fixed TypeScript errors and lint issues in navigation and service files
- Installed and configured styled-components/native with types
- Created missing types file and patched Redux/RTK Query API signatures
- Validated full startup on both web and Expo Go mobile

### Tag
- Tagged as `expo-fix`

### References
- See project memory and MCP for full troubleshooting log and fix rationale

---
