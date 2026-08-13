import {
  Pressable,
  Text,
  StyleSheet,
} from "react-native";

import { useTheme } from "../context/ThemeContext";

import {
  LIGHT_COLORS,
  DARK_COLORS,
} from "../constants/colors";


type Props = {
  label: string;
  onPress?: () => void;
  type?: "number" | "operator" | "equal" | "scientific";
};


export default function CalculatorButton({
  label,
  onPress,
  type = "number",
}: Props) {

  // =========================
  // THEME
  // =========================

  const { isDark } = useTheme();

  const COLORS = isDark
    ? DARK_COLORS
    : LIGHT_COLORS;


  // =========================
  // BUTTON COLORS
  // =========================

  const buttonColor =
    type === "operator"
      ? COLORS.operator
      : type === "equal"
      ? COLORS.equal
      : type === "scientific"
      ? COLORS.scientific
      : COLORS.button;


  const textColor =
    type === "operator"
      ? COLORS.operatorText
      : type === "equal"
      ? COLORS.equalText
      : type === "scientific"
      ? COLORS.scientificText
      : COLORS.buttonText;


  // =========================
  // UI
  // =========================

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: buttonColor,
        },
      ]}
    >

      <Text
        style={[
          styles.text,
          {
            color: textColor,
          },
        ]}
      >
        {label}
      </Text>

    </Pressable>
  );
}


// =========================
// STYLES
// =========================

const styles = StyleSheet.create({

  button: {
    flex: 1,

    height: 48,

    borderRadius: 12,

    justifyContent: "center",

    alignItems: "center",

    marginHorizontal: 3,
  },


  text: {
    fontSize: 18,

    fontWeight: "bold",
  },

});