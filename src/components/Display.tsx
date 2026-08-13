import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/colors";

type DisplayProps = {
  expression: string;
  result: string;
  memory: number;
};

export default function Display({
  expression,
  result,
  memory,
}: DisplayProps) {
  return (
    <View style={styles.display}>

      <Text style={styles.label}>
        Expression
      </Text>

      <Text style={styles.expression}>
        {expression || "0"}
      </Text>

      <Text style={styles.label}>
        Result
      </Text>

      <Text style={styles.result}>
        {result}
      </Text>

      <Text style={styles.memory}>
        Memory: {memory}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  display: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  label: {
    color: COLORS.secondaryText,
    fontSize: 14,
    marginTop: 10,
  },

  expression: {
    color: COLORS.text,
    fontSize: 32,
    textAlign: "right",
  },

  result: {
    color: COLORS.text,
    fontSize: 42,
    textAlign: "right",
    fontWeight: "bold",
  },

  memory: {
    color: COLORS.secondaryText,
    textAlign: "right",
    marginTop: 10,
    fontSize: 16,
  },

});