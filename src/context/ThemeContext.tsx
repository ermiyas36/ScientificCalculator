import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Appearance,
  ColorSchemeName,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeMode = "light" | "dark" | "default";

type ThemeContextType = {
  themeMode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
};

const THEME_KEY = "@scientific_calculator_theme";

const ThemeContext =
  createContext<ThemeContextType | undefined>(
    undefined
  );

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeMode, setThemeModeState] =
    useState<ThemeMode>("default");

  const [systemTheme, setSystemTheme] =
  useState<ColorSchemeName>(
    Appearance.getColorScheme() ?? "light"
  );

  // Load saved theme
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme =
          await AsyncStorage.getItem(THEME_KEY);

        if (
          savedTheme === "light" ||
          savedTheme === "dark" ||
          savedTheme === "default"
        ) {
          setThemeModeState(savedTheme);
        }
      } catch (error) {
        console.log(
          "Failed to load theme:",
          error
        );
      }
    };

    loadTheme();
  }, []);

  // Listen to system theme changes
  useEffect(() => {
    const subscription =
      Appearance.addChangeListener(
        ({ colorScheme }) => {
          setSystemTheme(colorScheme);
        }
      );

    return () => subscription.remove();
  }, []);

  // Change theme
  const setThemeMode = async (
    mode: ThemeMode
  ) => {
    setThemeModeState(mode);

    try {
      await AsyncStorage.setItem(
        THEME_KEY,
        mode
      );
    } catch (error) {
      console.log(
        "Failed to save theme:",
        error
      );
    }
  };

  const isDark =
    themeMode === "dark" ||
    (themeMode === "default" &&
      systemTheme === "dark");

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        isDark,
        setThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context =
    useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}