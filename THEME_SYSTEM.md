# SafeConnect Theme System

## Overview

SafeConnect now includes a comprehensive theme system that allows users to switch between light and dark modes, with support for system theme preference.

## Architecture

### ThemeContext (`/contexts/ThemeContext.tsx`)

The theme system is built around a React Context that provides:

- **Theme Management**: Light, dark, and system theme modes
- **Persistence**: Theme preference saved to AsyncStorage
- **System Integration**: Automatically follows device theme when set to "system"
- **Color Palette**: Consistent brand colors and theme-specific colors

### Theme Colors

#### Brand Colors (consistent across themes)
- `brand`: #38bdf8 (sky-400) - Primary brand color
- `safe`: #10b981 (emerald-500) - Safety indicators
- `danger`: #f43f5e (rose-500) - Emergency/danger
- `warning`: #f59e0b (amber-500) - Warnings

#### Theme-Specific Colors
**Dark Theme** (current default):
- `primary`: #0f172a (slate-900) - Main background
- `secondary`: #1e293b (slate-800) - Secondary background
- `card`: #1e293b (slate-800) - Card backgrounds
- `text`: #ffffff - Primary text
- `textMuted`: #94a3b8 (slate-400) - Secondary text

**Light Theme**:
- `primary`: #ffffff - Main background
- `secondary`: #f8fafc (slate-50) - Secondary background
- `card`: #f1f5f9 (slate-100) - Card backgrounds
- `text`: #0f172a (slate-900) - Primary text
- `textMuted`: #64748b (slate-500) - Secondary text

## Usage

### Basic Theme Hook

```tsx
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { theme, isDark, toggleTheme, setThemeMode } = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>
        Current mode: {isDark ? 'Dark' : 'Light'}
      </Text>
      <Button onPress={toggleTheme} title="Toggle Theme" />
    </View>
  );
}
```

### Themed Styles Hook

```tsx
import { useThemedStyles } from '@/hooks/useThemedStyles';

function MyComponent() {
  const themedStyles = useThemedStyles();
  
  return (
    <View className={`flex-1 ${themedStyles.background}`}>
      <Text className={themedStyles.text}>Themed text</Text>
      <View className={themedStyles.card}>Card content</View>
    </View>
  );
}
```

### Available Methods

- `toggleTheme()`: Switch between light and dark
- `setThemeMode(mode)`: Set specific mode ('light' | 'dark' | 'system')
- `isDark`: Boolean indicating current theme
- `theme.colors`: Access to all theme colors

## Implementation Status

### ✅ Completed
- [x] ThemeContext with persistence
- [x] Light and dark theme definitions  
- [x] Profile screen theme toggle
- [x] useThemedStyles hook
- [x] AsyncStorage integration
- [x] System theme detection

### 🚧 In Progress
- [ ] Apply theming to all screens
- [ ] Theme-aware StatusBar
- [ ] Light theme refinement

### 📋 Future Enhancements
- [ ] Custom theme creation
- [ ] Color palette customization
- [ ] Accessibility improvements
- [ ] Theme animations

## Files Modified

- `app/_layout.tsx` - Added ThemeProvider
- `app/(tabs)/profile.tsx` - Integrated theme toggle
- `contexts/ThemeContext.tsx` - Theme system core
- `hooks/useThemedStyles.ts` - Style utilities
- `components/profile/SettingsItem.tsx` - Updated switch colors

## Testing

The theme system can be tested by:

1. Opening the Profile tab
2. Toggling the "Theme" switch
3. Observing the theme change (currently profile screen only)
4. Restarting the app to verify persistence

## Migration Guide

To apply theming to existing screens:

1. Import the theme hook: `import { useThemedStyles } from '@/hooks/useThemedStyles';`
2. Use themed classes: `className={themedStyles.background}`
3. Replace hardcoded colors with theme-aware alternatives
4. Test in both light and dark modes