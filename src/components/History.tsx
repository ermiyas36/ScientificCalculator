import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";

import { COLORS } from "../constants/colors";

type HistoryProps = {
  history: string[];
  onClear: () => void;
};

export default function History({
  history,
  onClear,
}: HistoryProps) {
  return (
    <View style={styles.container}>

      {/* Header */}

      <View style={styles.header}>

        <Text style={styles.title}>
          History
        </Text>

        {history.length > 0 && (
          <Pressable
            onPress={onClear}
            style={styles.clearButton}
          >
            <Text style={styles.clearText}>
              Clear
            </Text>
          </Pressable>
        )}

      </View>


      {/* History List */}

      <ScrollView
        style={styles.list}
        showsVerticalScrollIndicator={false}
      >

        {history.length === 0 ? (

          <Text style={styles.empty}>
            No calculations yet
          </Text>

        ) : (

          history.map((item, index) => (

            <Text
              key={`${item}-${index}`}
              style={styles.item}
            >
              {item}
            </Text>

          ))

        )}

      </ScrollView>

    </View>
  );
}


const styles = StyleSheet.create({

  container: {

    marginTop: 20,

    backgroundColor: COLORS.surface,

    borderRadius: 15,

    padding: 15,

  },


  header: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 10,

  },


  title: {

    color: COLORS.text,

    fontSize: 20,

    fontWeight: "bold",

  },


  clearButton: {

    paddingHorizontal: 12,

    paddingVertical: 6,

    borderRadius: 8,

    backgroundColor: "#D32F2F",

  },


  clearText: {

    color: "#FFFFFF",

    fontSize: 14,

    fontWeight: "bold",

  },


  list: {

    maxHeight: 120,

  },


  item: {

    color: COLORS.secondaryText,

    fontSize: 16,

    marginBottom: 6,

  },


  empty: {

    color: COLORS.secondaryText,

    fontStyle: "italic",

  },

});