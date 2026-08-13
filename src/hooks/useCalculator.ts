import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HISTORY_KEY = "@scientific_calculator_history";

export default function useCalculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [history, setHistory] = useState<string[]>([]);
  const [memory, setMemory] = useState(0);

  const [angleMode, setAngleMode] =
    useState<"DEG" | "RAD">("DEG");

  // =========================
  // LOAD HISTORY
  // =========================

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const savedHistory =
          await AsyncStorage.getItem(HISTORY_KEY);

        if (savedHistory) {
          setHistory(JSON.parse(savedHistory));
        }
      } catch (error) {
        console.log("Failed to load history:", error);
      }
    };

    loadHistory();
  }, []);

  // =========================
  // SAVE HISTORY
  // =========================

  useEffect(() => {
    const saveHistory = async () => {
      try {
        await AsyncStorage.setItem(
          HISTORY_KEY,
          JSON.stringify(history)
        );
      } catch (error) {
        console.log("Failed to save history:", error);
      }
    };

    saveHistory();
  }, [history]);

  // =========================
  // FACTORIAL
  // =========================

  const factorial = (n: number): number => {
    if (n < 0 || !Number.isInteger(n)) {
      throw new Error("Invalid factorial");
    }

    let answer = 1;

    for (let i = 2; i <= n; i++) {
      answer *= i;
    }

    return answer;
  };

  // =========================
  // CALCULATE RESULT
  // =========================

  const calculateResult = () => {
    try {
      let exp = expression;

      // =========================
      // Operators
      // =========================

      exp = exp.replaceAll("×", "*");
      exp = exp.replaceAll("÷", "/");

      // =========================
      // Constants
      // =========================

      exp = exp.replaceAll(
        "pi",
        Math.PI.toString()
      );

      exp = exp.replaceAll(
        "e",
        Math.E.toString()
      );

      // =========================
      // Percentage
      // =========================

      exp = exp.replace(
        /(\d+)%/g,
        "($1/100)"
      );

      // =========================
      // Factorial
      // =========================

      exp = exp.replace(
        /(\d+)!/g,
        "factorial($1)"
      );

      // =========================
      // Square Root
      // =========================

      exp = exp.replaceAll(
        "sqrt",
        "Math.sqrt"
      );

      // =========================
      // Logarithms
      // =========================

      exp = exp.replaceAll(
        "log",
        "Math.log10"
      );

      exp = exp.replaceAll(
        "ln",
        "Math.log"
      );

      // =========================
      // Powers
      // =========================

      exp = exp.replace(
        /(\d+)\^(\d+)/g,
        "$1**$2"
      );

      // =========================
      // Trigonometric Functions
      // =========================

      exp = exp.replaceAll(
        "sin",
        "Math.sin"
      );

      exp = exp.replaceAll(
        "cos",
        "Math.cos"
      );

      exp = exp.replaceAll(
        "tan",
        "Math.tan"
      );

      // =========================
      // DEG Mode
      // =========================

      if (angleMode === "DEG") {
        exp = exp.replace(
          /Math\.sin\((.*?)\)/g,
          "Math.sin(($1)*Math.PI/180)"
        );

        exp = exp.replace(
          /Math\.cos\((.*?)\)/g,
          "Math.cos(($1)*Math.PI/180)"
        );

        exp = exp.replace(
          /Math\.tan\((.*?)\)/g,
          "Math.tan(($1)*Math.PI/180)"
        );
      }

      // =========================
      // Calculate
      // =========================

      const answer = Function(
        "factorial",
        `return ${exp}`
      )(factorial);

      const finalResult =
        String(Number(answer.toFixed(8)));

      setResult(finalResult);

      // =========================
      // Add to History
      // =========================

      setHistory((prev) => [
        `${expression} = ${finalResult}`,
        ...prev,
      ]);

    } catch {
      setResult("Error");
    }
  };

  // =========================
  // BUTTON HANDLER
  // =========================

  const handlePress = (value: string) => {
    // Clear
    if (value === "C") {
      setExpression("");
      setResult("0");
      return;
    }

    // Backspace
    if (value === "BACKSPACE") {
      setExpression((prev) =>
        prev.slice(0, -1)
      );
      return;
    }

    // Equals
    if (value === "=") {
      calculateResult();
      return;
    }

    // Add button value
    setExpression((prev) =>
      prev + value
    );
  };

  // =========================
  // MEMORY
  // =========================

  const memoryClear = () => {
    setMemory(0);
  };

  const memoryRecall = () => {
    setExpression((prev) =>
      prev + String(memory)
    );
  };

  const memoryAdd = () => {
    setMemory(
      (prev) => prev + Number(result)
    );
  };

  const memorySubtract = () => {
    setMemory(
      (prev) => prev - Number(result)
    );
  };

  // =========================
  // ANGLE MODE
  // =========================

  const toggleAngleMode = () => {
    setAngleMode((prev) =>
      prev === "DEG" ? "RAD" : "DEG"
    );
  };

  // =========================
  // CLEAR HISTORY
  // =========================

  const clearHistory = async () => {
    try {
      setHistory([]);

      await AsyncStorage.removeItem(
        HISTORY_KEY
      );
    } catch (error) {
      console.log(
        "Failed to clear history:",
        error
      );
    }
  };

  // =========================
  // RETURN
  // =========================

  return {
    expression,
    result,
    history,
    memory,
    angleMode,

    setExpression,
    setResult,
    setHistory,

    handlePress,

    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,

    toggleAngleMode,

    clearHistory,
  };
}