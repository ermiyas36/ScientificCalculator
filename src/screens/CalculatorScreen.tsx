import {
  View,
  Text,
  StyleSheet,
   Modal,
  Pressable,
  TextInput,
  Linking,
} from "react-native";

import { useState } from "react";

import {
  LIGHT_COLORS,
  DARK_COLORS,
} from "../constants/colors";

import { useTheme } from "../context/ThemeContext";

import Display from "../components/Display";
import History from "../components/History";
import MemoryPad from "../components/MemoryPad";
import ScientificPad from "../components/ScientificPad";
import NumberPad from "../components/NumberPad";
import CalculatorMenu from "../components/CalculatorMenu";
import ThemeSelector from "../components/ThemeSelector";
import GraphPad from "../components/GraphPad";
import useCalculator from "../hooks/useCalculator";




export default function CalculatorScreen() {

  const [graphExpression, setGraphExpression] =
  useState("");

  const [calculatorMode, setCalculatorMode] =
  useState<"basic" | "scientific" | "graph">("scientific");

  const [feedbackText, setFeedbackText] =
    useState("");

  const [feedbackRating, setFeedbackRating] =
    useState(0);

  // =========================
  // THEME
  // =========================

  const [
    themeVisible,
    setThemeVisible,
  ] = useState(false);

  const [
  helpVisible,
  setHelpVisible,
  ] = useState(false);

  const [
  aboutVisible,
  setAboutVisible,
] = useState(false);

  const [
  privacyVisible,
  setPrivacyVisible,
] = useState(false);

  const [
  feedbackVisible,
  setFeedbackVisible,
] = useState(false);

  const {
    themeMode,
    setThemeMode,
    isDark,
  } = useTheme();

  const COLORS = isDark
    ? DARK_COLORS
    : LIGHT_COLORS;


  // =========================
  // CALCULATOR
  // =========================

  const {
    expression,
    result,
    history,
    memory,
    angleMode,

    handlePress,

    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,

    toggleAngleMode,

    clearHistory,
  } = useCalculator();


  // =========================
  // UI
  // =========================

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            COLORS.background,
        },
      ]}
    >

      {/* =========================
          HEADER
      ========================= */}

      <View style={styles.header}>

        <Text
          style={[
            styles.title,
            {
              color: COLORS.text,
            },
          ]}
        >
          Scientific Calculator Pro
        </Text>

       <CalculatorMenu
  onThemePress={() => {
    setThemeVisible(true);
  }}

  onHelpPress={() => {
    setHelpVisible(true);
  }}

  onAboutPress={() => {
    setAboutVisible(true);
  }}

  onPrivacyPress={() => {
    setPrivacyVisible(true);
  }}

   onFeedbackPress={() => {
  setFeedbackVisible(true);
}}
/>
      </View>


      {/* =========================
          DISPLAY
      ========================= */}

      <View style={styles.displayContainer}>

        <Display
          expression={expression}
          result={result}
          memory={memory}
        />

      </View>


      {/* =========================
          HISTORY
      ========================= */}

      <History
        history={history}
        onClear={clearHistory}
      />


      {/* =========================
    MODE TABS
========================= */}

<View style={styles.tabs}>

  <Pressable
    onPress={() => {
      setCalculatorMode("basic");
    }}
  >
    <Text
      style={[
        styles.tab,
        {
          color:
            calculatorMode === "basic"
              ? "#3478F6"
              : COLORS.text,
        },
      ]}
    >
      Basic
    </Text>
  </Pressable>


  <Pressable
    onPress={() => {
      setCalculatorMode("scientific");
    }}
  >
    <Text
      style={[
        styles.tab,
        {
          color:
            calculatorMode === "scientific"
              ? "#3478F6"
              : COLORS.text,
        },
      ]}
    >
      Scientific
    </Text>
  </Pressable>


  <Pressable
    onPress={() => {
      setCalculatorMode("graph");
    }}
  >
    <Text
      style={[
        styles.tab,
        {
          color:
            calculatorMode === "graph"
              ? "#3478F6"
              : COLORS.text,
        },
      ]}
    >
      Graph
    </Text>
  </Pressable>

</View>

      {/* =========================
    KEYPAD / GRAPH
========================= */}

<View style={styles.keypad}>

  {calculatorMode === "graph" ? (

    <GraphPad
  expression={graphExpression}
  setExpression={setGraphExpression}
  onPlot={() => {
    console.log("Plot:", graphExpression);
  }}
  isDark={isDark}
  angleMode={angleMode}
/>

  ) : (

    <>

      {/* Memory */}

      <MemoryPad
        memoryClear={memoryClear}
        memoryRecall={memoryRecall}
        memoryAdd={memoryAdd}
        memorySubtract={memorySubtract}
      />


      {/* Scientific */}

      <ScientificPad
        angleMode={angleMode}
        toggleAngleMode={toggleAngleMode}
        handlePress={handlePress}
      />


      {/* Numbers */}

      <NumberPad
        handlePress={handlePress}
      />

    </>

  )}

</View>


      {/* =========================
          THEME SELECTOR
      ========================= */}

      <ThemeSelector
        visible={themeVisible}
        currentTheme={themeMode}
        onSelect={(theme) => {
          setThemeMode(theme);
          setThemeVisible(false);
        }}
        onClose={() => {
          setThemeVisible(false);
        }}
      />

      {/* =========================
    HELP
========================= */}

<Modal
  visible={helpVisible}
  transparent
  animationType="fade"
  onRequestClose={() => {
    setHelpVisible(false);
  }}
>
  <Pressable
    style={styles.helpOverlay}
    onPress={() => {
      setHelpVisible(false);
    }}
  >
    <Pressable
      style={[
        styles.helpContainer,
        {
          backgroundColor: COLORS.background,
        },
      ]}
      onPress={(event) => event.stopPropagation()}
    >
      <Text
        style={[
          styles.helpTitle,
          {
            color: COLORS.text,
          },
        ]}
      >
        How to Use
      </Text>

      <Text
        style={[
          styles.helpSection,
          {
            color: COLORS.text,
          },
        ]}
      >
        Basic Calculator
      </Text>

      <Text
        style={[
          styles.helpText,
          {
            color: COLORS.text,
          },
        ]}
      >
        • Enter numbers using the keypad.{"\n"}
        • Use +, −, × and ÷ for calculations.{"\n"}
        • Press = to calculate.{"\n"}
        • Press ⌫ to remove the last character.{"\n"}
        • Press C to clear the expression.
      </Text>

      <Text
        style={[
          styles.helpSection,
          {
            color: COLORS.text,
          },
        ]}
      >
        Scientific Calculator
      </Text>

      <Text
        style={[
          styles.helpText,
          {
            color: COLORS.text,
          },
        ]}
      >
        • Use sin, cos and tan for trigonometric calculations.{"\n"}
        • Switch between DEG and RAD.{"\n"}
        • Use √, x², x³, log and ln.{"\n"}
        • π and e are available for calculations.
      </Text>

      <Text
        style={[
          styles.helpSection,
          {
            color: COLORS.text,
          },
        ]}
      >
        Memory
      </Text>

      <Text
        style={[
          styles.helpText,
          {
            color: COLORS.text,
          },
        ]}
      >
        • MC — Clear memory{"\n"}
        • MR — Recall memory{"\n"}
        • M+ — Add to memory{"\n"}
        • M− — Subtract from memory
      </Text>

      <Pressable
        style={styles.helpCloseButton}
        onPress={() => {
          setHelpVisible(false);
        }}
      >
        <Text style={styles.helpCloseText}>
          Close
        </Text>
      </Pressable>
    </Pressable>
  </Pressable>
</Modal>

    
    {/* =========================
    ABOUT
========================= */}

<Modal
  visible={aboutVisible}
  transparent
  animationType="fade"
  onRequestClose={() => {
    setAboutVisible(false);
  }}
>
  <Pressable
    style={styles.helpOverlay}
    onPress={() => {
      setAboutVisible(false);
    }}
  >
    <Pressable
      style={[
        styles.helpContainer,
        {
          backgroundColor: COLORS.background,
        },
      ]}
      onPress={(event) => event.stopPropagation()}
    >

      <Text
        style={[
          styles.helpTitle,
          {
            color: COLORS.text,
          },
        ]}
      >
        About
      </Text>

      <Text
        style={[
          styles.aboutAppName,
          {
            color: COLORS.text,
          },
        ]}
      >
        Scientific Calculator Pro
      </Text>

      <Text
        style={[
          styles.aboutVersion,
          {
            color: COLORS.text,
          },
        ]}
      >
        Version 1.0.0
      </Text>

      <Text
        style={[
          styles.aboutDescription,
          {
            color: COLORS.text,
          },
        ]}
      >
        A powerful calculator designed for
        basic and scientific calculations.
      </Text>

      <Text
        style={[
          styles.helpSection,
          {
            color: COLORS.text,
          },
        ]}
      >
        Features
      </Text>

      <Text
        style={[
          styles.helpText,
          {
            color: COLORS.text,
          },
        ]}
      >
        • Basic calculations{"\n"}
        • Scientific functions{"\n"}
        • Memory operations{"\n"}
        • Calculation history{"\n"}
        • Light and Dark themes
      </Text>

      <Pressable
        style={styles.helpCloseButton}
        onPress={() => {
          setAboutVisible(false);
        }}
      >
        <Text style={styles.helpCloseText}>
          Close
        </Text>
      </Pressable>

    </Pressable>
  </Pressable>
</Modal>

    {/* =========================
    PRIVACY POLICY
========================= */}

<Modal
  visible={privacyVisible}
  transparent
  animationType="fade"
  onRequestClose={() => {
    setPrivacyVisible(false);
  }}
>
  <Pressable
    style={styles.helpOverlay}
    onPress={() => {
      setPrivacyVisible(false);
    }}
  >
    <Pressable
      style={[
        styles.helpContainer,
        {
          backgroundColor: COLORS.background,
        },
      ]}
      onPress={(event) => event.stopPropagation()}
    >

      <Text
        style={[
          styles.helpTitle,
          {
            color: COLORS.text,
          },
        ]}
      >
        Privacy Policy
      </Text>

      <Text
        style={[
          styles.helpSection,
          {
            color: COLORS.text,
          },
        ]}
      >
        Your Privacy
      </Text>

      <Text
        style={[
          styles.helpText,
          {
            color: COLORS.text,
          },
        ]}
      >
        Scientific Calculator Pro is designed
        with your privacy in mind.
      </Text>

      <Text
        style={[
          styles.helpSection,
          {
            color: COLORS.text,
          },
        ]}
      >
        Data Collection
      </Text>

      <Text
        style={[
          styles.helpText,
          {
            color: COLORS.text,
          },
        ]}
      >
        This calculator does not require you
        to provide personal information to
        perform calculations.
      </Text>

      <Text
        style={[
          styles.helpSection,
          {
            color: COLORS.text,
          },
        ]}
      >
        Calculations and History
      </Text>

      <Text
        style={[
          styles.helpText,
          {
            color: COLORS.text,
          },
        ]}
      >
        Your calculations, history and memory
        are used to provide calculator features
        within the application.
      </Text>

      <Text
        style={[
          styles.helpSection,
          {
            color: COLORS.text,
          },
        ]}
      >
        Privacy
      </Text>

      <Text
        style={[
          styles.helpText,
          {
            color: COLORS.text,
          },
        ]}
      >
        We do not sell or share your personal
        information with third parties through
        this calculator.
      </Text>

      <Pressable
        style={styles.helpCloseButton}
        onPress={() => {
          setPrivacyVisible(false);
        }}
      >
        <Text style={styles.helpCloseText}>
          Close
        </Text>
      </Pressable>

    </Pressable>
  </Pressable>
</Modal>

    <Modal
  visible={feedbackVisible}
  transparent
  animationType="fade"
  onRequestClose={() => {
    setFeedbackVisible(false);
  }}
>
  <Pressable
    style={styles.helpOverlay}
    onPress={() => {
      setFeedbackVisible(false);
    }}
  >
    <Pressable
      style={[
        styles.feedbackContainer,
        {
          backgroundColor: COLORS.background,
        },
      ]}
      onPress={(event) => event.stopPropagation()}
    >

      <Text
        style={[
          styles.helpTitle,
          {
            color: COLORS.text,
          },
        ]}
      >
        Send Feedback
      </Text>

      <Text
        style={[
          styles.feedbackLabel,
          {
            color: COLORS.text,
          },
        ]}
      >
        How would you rate the calculator?
      </Text>

      <View style={styles.ratingRow}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <Pressable
            key={rating}
            onPress={() => {
              setFeedbackRating(rating);
            }}
          >
            <Text
              style={[
                styles.star,
                {
                  opacity:
                    rating <= feedbackRating ? 1 : 0.3,
                },
              ]}
            >
              ★
            </Text>
          </Pressable>
        ))}
      </View>

      <Text
        style={[
          styles.feedbackLabel,
          {
            color: COLORS.text,
          },
        ]}
      >
        Your feedback
      </Text>

      <TextInput
        value={feedbackText ?? ""}
        onChangeText={setFeedbackText}
        placeholder="Tell us what you think..."
        placeholderTextColor={
          isDark ? "#999999" : "#777777"
        }
        multiline
        textAlignVertical="top"
        style={[
          styles.feedbackInput,
          {
            color: COLORS.text,
            borderColor: isDark
              ? "#555555"
              : "#CCCCCC",
          },
        ]}
      />

      <View style={styles.feedbackButtons}>

        <Pressable
          style={styles.feedbackCancel}
          onPress={() => {
            setFeedbackVisible(false);
            setFeedbackText("");
            setFeedbackRating(0);
          }}
        >
          <Text style={styles.feedbackCancelText}>
            Cancel
          </Text>
        </Pressable>

        <Pressable
  style={styles.feedbackSend}
  onPress={async () => {
    const subject = "Scientific Calculator Pro Feedback";

    const body =
      `Rating: ${feedbackRating}/5\n\n` +
      `Feedback:\n${feedbackText}`;

    const url =
      `mailto:ermiasa067@gmail.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    try {
      await Linking.openURL(url);

      setFeedbackVisible(false);
      setFeedbackText("");
      setFeedbackRating(0);
    } catch (error) {
      console.log("Unable to open email app:", error);
    }
  }}
>
  <Text style={styles.feedbackSendText}>
    Send via Email
  </Text>
</Pressable>

      </View>

    </Pressable>
  </Pressable>
</Modal>
  
    </View>
  );
}


// =========================
// STYLES
// =========================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",

    paddingHorizontal: 10,
    paddingTop: 35,

    justifyContent: "flex-start",
  },


 header: {
  height: 50,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  marginBottom: 10,
},

title: {
  fontSize: 19,
  fontWeight: "bold",
  textAlign: "center",
},

menuButton: {
  position: "absolute",
  right: 0,
  top: 0,
},


  displayContainer: {
    marginBottom: 6,
  },


  tabs: {
    flexDirection: "row",

    justifyContent: "space-around",

    marginTop: 8,
    marginBottom: 8,
  },


  tab: {
    fontSize: 16,
    fontWeight: "600",
  },


  keypad: {
    flex: 1,

    width: "100%",

    justifyContent: "flex-start",
  },

  helpOverlay: {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.55)",
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 20,
},

helpContainer: {
  width: "100%",
  maxWidth: 400,
  borderRadius: 18,
  padding: 20,
  elevation: 10,

  shadowColor: "#000",
  shadowOpacity: 0.3,
  shadowRadius: 12,
  shadowOffset: {
    width: 0,
    height: 5,
  },
},

helpTitle: {
  fontSize: 22,
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: 18,
},

helpSection: {
  fontSize: 17,
  fontWeight: "bold",
  marginTop: 8,
  marginBottom: 6,
},

helpText: {
  fontSize: 14,
  lineHeight: 21,
},

helpCloseButton: {
  marginTop: 20,
  paddingVertical: 12,
  borderRadius: 10,
  backgroundColor: "#3478F6",
  alignItems: "center",
},

helpCloseText: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "bold",
},

aboutAppName: {
  fontSize: 18,
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: 4,
},

aboutVersion: {
  fontSize: 14,
  textAlign: "center",
  opacity: 0.7,
  marginBottom: 15,
},

aboutDescription: {
  fontSize: 15,
  lineHeight: 22,
  textAlign: "center",
  marginBottom: 10,
},

  feedbackContainer: {
  width: "100%",
  maxWidth: 400,
  borderRadius: 18,
  padding: 20,
  elevation: 10,

  shadowColor: "#000",
  shadowOpacity: 0.3,
  shadowRadius: 12,
  shadowOffset: {
    width: 0,
    height: 5,
  },
},

feedbackLabel: {
  fontSize: 15,
  fontWeight: "600",
  marginTop: 8,
  marginBottom: 8,
},

ratingRow: {
  flexDirection: "row",
  justifyContent: "center",
  marginBottom: 15,
},

star: {
  fontSize: 32,
  marginHorizontal: 5,
  color: "#F5B301",
},

feedbackInput: {
  height: 110,
  borderWidth: 1,
  borderRadius: 10,
  padding: 12,
  fontSize: 15,
},

feedbackButtons: {
  flexDirection: "row",
  justifyContent: "flex-end",
  marginTop: 15,
},

feedbackCancel: {
  paddingVertical: 11,
  paddingHorizontal: 18,
  marginRight: 8,
},

feedbackCancelText: {
  color: "#FF6B6B",
  fontSize: 15,
  fontWeight: "600",
},

feedbackSend: {
  backgroundColor: "#3478F6",
  paddingVertical: 11,
  paddingHorizontal: 22,
  borderRadius: 10,
},

feedbackSendText: {
  color: "#FFFFFF",
  fontSize: 15,
  fontWeight: "bold",
},

});