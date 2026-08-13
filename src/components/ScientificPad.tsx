import CalculatorButton from "./CalculatorButton";
import KeypadRow from "./KeypadRow";

type Props = {
  angleMode: "DEG" | "RAD";
  toggleAngleMode: () => void;
  handlePress: (value: string) => void;
};

export default function ScientificPad({
  angleMode,
  toggleAngleMode,
  handlePress,
}: Props) {
  return (
    <>
      {/* Row 1 */}
      <KeypadRow>
        <CalculatorButton
          label={angleMode}
          type="scientific"
          onPress={toggleAngleMode}
        />

        <CalculatorButton
          label="sin"
          type="scientific"
          onPress={() => handlePress("sin(")}
        />

        <CalculatorButton
          label="cos"
          type="scientific"
          onPress={() => handlePress("cos(")}
        />

        <CalculatorButton
          label="tan"
          type="scientific"
          onPress={() => handlePress("tan(")}
        />
      </KeypadRow>

      {/* Row 2 */}
      <KeypadRow>
        <CalculatorButton
          label="√"
          type="scientific"
          onPress={() => handlePress("sqrt(")}
        />

        <CalculatorButton
          label="π"
          type="scientific"
          onPress={() => handlePress("pi")}
        />

        <CalculatorButton
          label="^"
          type="scientific"
          onPress={() => handlePress("^")}
        />

        <CalculatorButton
          label="!"
          type="scientific"
          onPress={() => handlePress("!")}
        />
      </KeypadRow>

      {/* Row 3 */}
      <KeypadRow>
        <CalculatorButton
          label="x⁻¹"
          type="scientific"
          onPress={() => handlePress("^-1")}
        />

        <CalculatorButton
          label="1/x"
          type="scientific"
          onPress={() => handlePress("1/")}
        />

        <CalculatorButton
          label="log"
          type="scientific"
          onPress={() => handlePress("log(")}
        />

        <CalculatorButton
          label="ln"
          type="scientific"
          onPress={() => handlePress("ln(")}
        />
      </KeypadRow>

      {/* Row 4 */}
      <KeypadRow>
        <CalculatorButton
          label="e"
          type="scientific"
          onPress={() => handlePress("e")}
        />

        <CalculatorButton
          label="%"
          type="scientific"
          onPress={() => handlePress("%")}
        />

        <CalculatorButton
          label="("
          type="scientific"
          onPress={() => handlePress("(")}
        />

        <CalculatorButton
          label=")"
          type="scientific"
          onPress={() => handlePress(")")}
        />
      </KeypadRow>
    </>
  );
}