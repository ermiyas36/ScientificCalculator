import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ThemeMode =
  | "light"
  | "dark"
  | "default";

type ThemeSelectorProps = {
  visible: boolean;
  currentTheme: ThemeMode;
  onSelect: (theme: ThemeMode) => void;
  onClose: () => void;
};

export default function ThemeSelector({
  visible,
  currentTheme,
  onSelect,
  onClose,
}: ThemeSelectorProps) {
  const options: {
    label: string;
    value: ThemeMode;
  }[] = [
    {
      label: "Light",
      value: "light",
    },
    {
      label: "Dark",
      value: "dark",
    },
    {
      label: "Default",
      value: "default",
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.overlay}
        onPress={onClose}
      >
        <Pressable
          style={styles.dialog}
          onPress={(event) =>
            event.stopPropagation()
          }
        >
          <Text style={styles.title}>
            Choose Theme
          </Text>

          {options.map((option) => (
            <Pressable
              key={option.value}
              style={styles.option}
              onPress={() =>
                onSelect(option.value)
              }
            >
              <View
                style={[
                  styles.radio,
                  currentTheme ===
                    option.value &&
                    styles.radioSelected,
                ]}
              />

              <Text style={styles.optionText}>
                {option.label}
              </Text>
            </Pressable>
          ))}

          <Pressable
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeText}>
              Cancel
            </Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor:
      "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },

  dialog: {
    width: 300,
    backgroundColor: "#202124",
    borderRadius: 16,
    padding: 20,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#AAAAAA",
    marginRight: 14,
  },

  radioSelected: {
    borderColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
  },

  optionText: {
    color: "#FFFFFF",
    fontSize: 17,
  },

  closeButton: {
    marginTop: 10,
    paddingVertical: 12,
    alignItems: "center",
  },

  closeText: {
    color: "#FF6B6B",
    fontSize: 16,
    fontWeight: "600",
  },
});