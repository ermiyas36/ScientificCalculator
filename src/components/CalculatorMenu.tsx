import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type CalculatorMenuProps = {
  onPrivacyPress?: () => void;
  onThemePress?: () => void;
  onFeedbackPress?: () => void;
  onHelpPress?: () => void;
  onAboutPress?: () => void;
};

export default function CalculatorMenu({
  onPrivacyPress,
  onThemePress,
  onFeedbackPress,
  onHelpPress,
  onAboutPress,
}: CalculatorMenuProps) {
  const [visible, setVisible] = useState(false);

  const closeMenu = () => {
    setVisible(false);
  };

  const handlePrivacy = () => {
    closeMenu();
    onPrivacyPress?.();
  };

  const handleTheme = () => {
    closeMenu();
    onThemePress?.();
  };

  const handleFeedback = () => {
    closeMenu();
    onFeedbackPress?.();
  };

  const handleHelp = () => {
    closeMenu();
    onHelpPress?.();
  };

  const handleAbout = () => {
  closeMenu();
  onAboutPress?.();
};

  return (
    <>
      {/* Three-dot button */}
      <Pressable
        style={styles.menuButton}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.menuIcon}>⋮</Text>
      </Pressable>

      {/* Menu */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <Pressable
          style={styles.overlay}
          onPress={closeMenu}
        >
          <Pressable
            style={styles.menu}
            onPress={(event) => event.stopPropagation()}
          >
            <Text style={styles.menuTitle}>
              Calculator Menu
            </Text>

            <Pressable
              style={styles.menuItem}
              onPress={handleTheme}
            >
              <Text style={styles.menuItemText}>
                🎨  Choose Theme
              </Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={handlePrivacy}
            >
              <Text style={styles.menuItemText}>
                🔒  Privacy Policy
              </Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={handleFeedback}
            >
              <Text style={styles.menuItemText}>
                ✉️  Send Feedback
              </Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={handleHelp}
            >
              <Text style={styles.menuItemText}>
                ❓  Help
              </Text>
            </Pressable>

            <Pressable
              style={styles.cancelButton}
              onPress={closeMenu}
            >
                <Pressable
                  style={styles.menuItem}
                    onPress={handleAbout}
                                  >
                   <Text style={styles.menuItemText}>
                        ℹ️  About
                      </Text>
                      </Pressable>
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  menuButton: {
  width: 44,
  height: 44,
  alignItems: "center",
  justifyContent: "center",

  position: "absolute",
  right: 0,
  top: 0,

  zIndex: 100,
},

  menuIcon: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    alignItems: "flex-end",
    paddingTop: 55,
    paddingRight: 15,
  },

  menu: {
    width: 250,
    backgroundColor: "#202124",
    borderRadius: 14,
    paddingVertical: 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  menuTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
    paddingHorizontal: 18,
    paddingVertical: 12,
  },

  menuItem: {
    paddingHorizontal: 18,
    paddingVertical: 14,
  },

  menuItemText: {
    color: "#FFFFFF",
    fontSize: 16,
  },

  cancelButton: {
    borderTopWidth: 1,
    borderTopColor: "#3A3A3A",
    marginTop: 5,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },

  cancelText: {
    color: "#FF6B6B",
    fontSize: 16,
    fontWeight: "600",
  },
});