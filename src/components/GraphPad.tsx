import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";

import Svg, {
  Path,
  Line,
  Text as SvgText,
} from "react-native-svg";

import { useState } from "react";

import {
  evaluateExpression,
} from "../utils/graphEvaluator";


type Props = {
  expression: string;
  setExpression: (value: string) => void;
  onPlot: () => void;
  isDark: boolean;
  angleMode: "DEG" | "RAD";
};


export default function GraphPad({
  expression,
  setExpression,
  onPlot,
  isDark,
  angleMode,
}: Props) {

  const [showGraph, setShowGraph] = useState(false);
  const [showGuide, setShowGuide] = useState(false);


  // =========================
  // COLORS
  // =========================

  const backgroundColor = isDark
    ? "#202124"
    : "#F5F5F5";

  const textColor = isDark
    ? "#FFFFFF"
    : "#222222";

  const inputBackground = isDark
    ? "#303134"
    : "#FFFFFF";


  // =========================
  // PLOT
  // =========================

  const handlePlot = () => {
    setShowGraph(true);
    onPlot();
  };


  // =========================
  // GRAPH SETTINGS
  // =========================

  const width = 350;
  const height = 300;

  const centerX = width / 2;
  const centerY = height / 2;

  const scale = 25;


  // =========================
  // READ EQUATION
  // =========================

  const equation = expression
    .toLowerCase()
    .replace(/\s/g, "");


  // =========================
  // CREATE GRAPH CURVE
  // =========================

  let path = "";

  if (
    showGraph &&
    equation !== ""
  ) {

    let previousValid = false;
    let previousScreenY: number | null = null;

    for (
      let x = -5;
      x <= 5;
      x += 0.02
    ) {

      const y = evaluateExpression(
        equation,
        x,
        angleMode
      );


      // =========================
      // INVALID POINT
      // =========================

      if (y === null) {
        previousValid = false;
        previousScreenY = null;
        continue;
      }


      // =========================
      // SCREEN POSITION
      // =========================

      const screenX =
        centerX + x * scale;

      const screenY =
        centerY - y * scale;


      // =========================
      // OUTSIDE GRAPH
      // =========================

      if (
        screenX < 0 ||
        screenX > width ||
        screenY < 0 ||
        screenY > height
      ) {

        previousValid = false;
        previousScreenY = null;

        continue;
      }


      // =========================
      // DETECT HUGE JUMP
      // =========================

      const hugeJump =
        previousScreenY !== null &&
        Math.abs(
          screenY - previousScreenY
        ) > height * 0.7;


      // =========================
      // DRAW
      // =========================

      if (
        !previousValid ||
        hugeJump
      ) {

        path +=
          ` M ${screenX} ${screenY}`;

      } else {

        path +=
          ` L ${screenX} ${screenY}`;
      }


      previousValid = true;
      previousScreenY = screenY;
    }
  }


  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
        },
      ]}
    >

      {/* =========================
          TITLE
      ========================= */}

      <Text
        style={[
          styles.title,
          {
            color: textColor,
          },
        ]}
      >
        Graph Mode
      </Text>


      {/* =========================
          EQUATION
      ========================= */}

      <Text
        style={[
          styles.label,
          {
            color: textColor,
          },
        ]}
      >
        Enter equation
      </Text>


      <View style={styles.inputRow}>

        <Text
          style={[
            styles.yText,
            {
              color: textColor,
            },
          ]}
        >
          y =
        </Text>


        <TextInput
          value={expression}
          onChangeText={(value) => {
            setExpression(value);
            setShowGraph(false);
          }}
          placeholder="x²"
          placeholderTextColor={
            isDark
              ? "#999999"
              : "#777777"
          }
          style={[
            styles.input,
            {
              color: textColor,
              backgroundColor:
                inputBackground,
            },
          ]}
        />

      </View>


      {/* =========================
          PLOT BUTTON
      ========================= */}

      <Pressable
        style={styles.plotButton}
        onPress={handlePlot}
      >
        <Text style={styles.plotText}>
          Plot
        </Text>
      </Pressable>


      {/* =========================
          GRAPH
      ========================= */}

      <View
        style={[
          styles.graph,
          {
            backgroundColor:
              inputBackground,
          },
        ]}
      >

        <Svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${width} ${height}`}
        >

          {/* =====================
              GRID LINES
          ===================== */}

          {Array.from(
            { length: 11 },
            (_, i) => {

              const value = i - 5;

              const position =
                centerX +
                value * scale;

              return (
                <Line
                  key={`vertical-${value}`}
                  x1={position}
                  y1="0"
                  x2={position}
                  y2={height}
                  stroke={
                    isDark
                      ? "#383838"
                      : "#DDDDDD"
                  }
                  strokeWidth="1"
                />
              );
            }
          )}


          {Array.from(
            { length: 11 },
            (_, i) => {

              const value = i - 5;

              const position =
                centerY -
                value * scale;

              return (
                <Line
                  key={`horizontal-${value}`}
                  x1="0"
                  y1={position}
                  x2={width}
                  y2={position}
                  stroke={
                    isDark
                      ? "#383838"
                      : "#DDDDDD"
                  }
                  strokeWidth="1"
                />
              );
            }
          )}


          {/* =====================
              X AXIS
          ===================== */}

          <Line
            x1="0"
            y1={centerY}
            x2={width}
            y2={centerY}
            stroke={
              isDark
                ? "#AAAAAA"
                : "#555555"
            }
            strokeWidth="2"
          />


          {/* =====================
              Y AXIS
          ===================== */}

          <Line
            x1={centerX}
            y1="0"
            x2={centerX}
            y2={height}
            stroke={
              isDark
                ? "#AAAAAA"
                : "#555555"
            }
            strokeWidth="2"
          />


          {/* =====================
              X AXIS TICKS
          ===================== */}

          {Array.from(
            { length: 11 },
            (_, i) => {

              const value = i - 5;

              const x =
                centerX +
                value * scale;

              return (
                <Line
                  key={`x-tick-${value}`}
                  x1={x}
                  y1={centerY - 4}
                  x2={x}
                  y2={centerY + 4}
                  stroke={
                    isDark
                      ? "#FFFFFF"
                      : "#333333"
                  }
                  strokeWidth="1"
                />
              );
            }
          )}


          {/* =====================
              X AXIS NUMBERS
          ===================== */}

          {Array.from(
            { length: 11 },
            (_, i) => {

              const value = i - 5;

              if (value === 0) {
                return null;
              }

              const x =
                centerX +
                value * scale;

              return (
                <SvgText
                  key={`x-number-${value}`}
                  x={x}
                  y={centerY + 18}
                  fill={
                    isDark
                      ? "#FFFFFF"
                      : "#333333"
                  }
                  fontSize="11"
                  textAnchor="middle"
                >
                  {value}
                </SvgText>
              );
            }
          )}


          {/* =====================
              Y AXIS TICKS
          ===================== */}

          {Array.from(
            { length: 11 },
            (_, i) => {

              const value = i - 5;

              const y =
                centerY -
                value * scale;

              return (
                <Line
                  key={`y-tick-${value}`}
                  x1={centerX - 4}
                  y1={y}
                  x2={centerX + 4}
                  y2={y}
                  stroke={
                    isDark
                      ? "#FFFFFF"
                      : "#333333"
                  }
                  strokeWidth="1"
                />
              );
            }
          )}


          {/* =====================
              Y AXIS NUMBERS
          ===================== */}

          {Array.from(
            { length: 11 },
            (_, i) => {

              const value = i - 5;

              if (value === 0) {
                return null;
              }

              const y =
                centerY -
                value * scale;

              return (
                <SvgText
                  key={`y-number-${value}`}
                  x={centerX - 10}
                  y={y + 4}
                  fill={
                    isDark
                      ? "#FFFFFF"
                      : "#333333"
                  }
                  fontSize="11"
                  textAnchor="end"
                >
                  {value}
                </SvgText>
              );
            }
          )}


          {/* =====================
              CURVE
          ===================== */}

          {showGraph &&
            path !== "" && (
              <Path
                d={path}
                fill="none"
                stroke="#3478F6"
                strokeWidth="3"
              />
            )}

        </Svg>

      </View>


      {/* =========================
          ERROR MESSAGE
      ========================= */}

      {showGraph &&
        expression.trim() !== "" &&
        path === "" && (

          <Text
            style={[
              styles.errorText,
              {
                color: textColor,
              },
            ]}
          >
            Unable to plot this expression.
            {"\n"}
            Check your syntax or domain.
          </Text>
        )}


      {/* =========================
          GRAPH GUIDE BUTTON
      ========================= */}

      <Pressable
        style={styles.guideButton}
        onPress={() => setShowGuide(true)}
      >
        <Text style={styles.guideButtonText}>
          ? Graph Guide
        </Text>
      </Pressable>


      {/* =========================
          GRAPH GUIDE MODAL
      ========================= */}

      <Modal
        visible={showGuide}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setShowGuide(false)
        }
      >

        <View style={styles.modalOverlay}>

          <View
            style={[
              styles.guideModal,
              {
                backgroundColor,
              },
            ]}
          >

            <ScrollView
              showsVerticalScrollIndicator={false}
            >

              {/* TITLE */}

              <Text
                style={[
                  styles.guideTitle,
                  {
                    color: textColor,
                  },
                ]}
              >
                📈 Graph Guide
              </Text>


              <Text
                style={[
                  styles.guideSubtitle,
                  {
                    color: textColor,
                  },
                ]}
              >
                Enter a mathematical expression
                and press Plot.
              </Text>


              {/* BASIC */}

              <Text
                style={[
                  styles.guideSection,
                  {
                    color: textColor,
                  },
                ]}
              >
                Basic functions
              </Text>

              <Text
                style={[
                  styles.guideText,
                  {
                    color: textColor,
                  },
                ]}
              >
                x{"\n"}
                2x{"\n"}
                x + 2{"\n"}
                x²{"\n"}
                x³{"\n"}
                x^2{"\n"}
                x^3
              </Text>


              {/* TRIG */}

              <Text
                style={[
                  styles.guideSection,
                  {
                    color: textColor,
                  },
                ]}
              >
                Trigonometric
              </Text>

              <Text
                style={[
                  styles.guideText,
                  {
                    color: textColor,
                  },
                ]}
              >
                sin(x){"\n"}
                cos(x){"\n"}
                tan(x)
              </Text>


              {/* INVERSE TRIG */}

              <Text
                style={[
                  styles.guideSection,
                  {
                    color: textColor,
                  },
                ]}
              >
                Inverse trigonometric
              </Text>

              <Text
                style={[
                  styles.guideText,
                  {
                    color: textColor,
                  },
                ]}
              >
                asin(x){"\n"}
                acos(x){"\n"}
                atan(x)
              </Text>


              {/* LOGARITHMIC */}

              <Text
                style={[
                  styles.guideSection,
                  {
                    color: textColor,
                  },
                ]}
              >
                Logarithmic
              </Text>

              <Text
                style={[
                  styles.guideText,
                  {
                    color: textColor,
                  },
                ]}
              >
                log(x){"\n"}
                ln(x)
              </Text>


              {/* OTHER */}

              <Text
                style={[
                  styles.guideSection,
                  {
                    color: textColor,
                  },
                ]}
              >
                Other functions
              </Text>

              <Text
                style={[
                  styles.guideText,
                  {
                    color: textColor,
                  },
                ]}
              >
                sqrt(x){"\n"}
                cbrt(x){"\n"}
                abs(x)
              </Text>


              {/* CONSTANTS */}

              <Text
                style={[
                  styles.guideSection,
                  {
                    color: textColor,
                  },
                ]}
              >
                Constants
              </Text>

              <Text
                style={[
                  styles.guideText,
                  {
                    color: textColor,
                  },
                ]}
              >
                π{"\n"}
                pi{"\n"}
                e
              </Text>


              {/* IMPORTANT */}

              <Text
                style={[
                  styles.guideSection,
                  {
                    color: textColor,
                  },
                ]}
              >
                Important
              </Text>

              <Text
                style={[
                  styles.guideInfo,
                  {
                    color: textColor,
                  },
                ]}
              >
                • sin, cos and tan follow DEG/RAD
                mode.{"\n"}
                • asin and acos require -1 ≤ x ≤ 1.{"\n"}
                • log(x) and ln(x) require x &gt; 0.{"\n"}
                • sqrt(x) requires x ≥ 0.{"\n"}
                • tan(x) has undefined points.{"\n"}
                • Some functions are only defined
                over part of the graph.
              </Text>


              {/* CLOSE */}

              <Pressable
                style={styles.closeButton}
                onPress={() =>
                  setShowGuide(false)
                }
              >
                <Text
                  style={styles.closeButtonText}
                >
                  Close
                </Text>
              </Pressable>

            </ScrollView>

          </View>

        </View>

      </Modal>

    </View>
  );
}


// ========================================
// STYLES
// ========================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: "100%",
    padding: 10,
  },


  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },


  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
  },


  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },


  yText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
  },


  input: {
    flex: 1,
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 17,
    borderWidth: 1,
    borderColor: "#777777",
  },


  plotButton: {
    marginTop: 10,
    height: 45,
    borderRadius: 10,
    backgroundColor: "#3478F6",
    alignItems: "center",
    justifyContent: "center",
  },


  plotText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },


  graph: {
    flex: 1,
    minHeight: 250,
    marginTop: 15,
    position: "relative",
    overflow: "hidden",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#777777",
  },


  errorText: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 13,
  },


  // =========================
  // GUIDE BUTTON
  // =========================

  guideButton: {
    marginTop: 10,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#3478F6",
    alignItems: "center",
    justifyContent: "center",
  },


  guideButtonText: {
    color: "#3478F6",
    fontSize: 14,
    fontWeight: "600",
  },


  // =========================
  // MODAL
  // =========================

  modalOverlay: {
    flex: 1,
    backgroundColor:
      "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },


  guideModal: {
    width: "100%",
    maxHeight: "90%",
    borderRadius: 16,
    padding: 20,
  },


  guideTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },


  guideSubtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 12,
    opacity: 0.8,
  },


  guideSection: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4,
  },


  guideText: {
    fontSize: 14,
    lineHeight: 20,
  },


  guideInfo: {
    fontSize: 13,
    lineHeight: 21,
  },


  closeButton: {
    marginTop: 18,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#3478F6",
    alignItems: "center",
    justifyContent: "center",
  },


  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },

});