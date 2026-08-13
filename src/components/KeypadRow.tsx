import { View, StyleSheet } from "react-native";

type Props = {
  children: React.ReactNode;
};

export default function KeypadRow({
  children,
}: Props) {

  return (
    <View style={styles.row}>
      {children}
    </View>
  );
}


const styles = StyleSheet.create({

  row: {

    flexDirection: "row",

    width: "100%",

    alignItems: "center",

    marginBottom: 6,

  },

});