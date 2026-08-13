import CalculatorButton from "./CalculatorButton";
import KeypadRow from "./KeypadRow";

type Props = {
  memoryClear: () => void;
  memoryRecall: () => void;
  memoryAdd: () => void;
  memorySubtract: () => void;
};

export default function MemoryPad({
  memoryClear,
  memoryRecall,
  memoryAdd,
  memorySubtract,
}: Props) {
  return (
    <KeypadRow>
      <CalculatorButton
        label="MC"
        type="scientific"
        onPress={memoryClear}
      />

      <CalculatorButton
        label="MR"
        type="scientific"
        onPress={memoryRecall}
      />

      <CalculatorButton
        label="M+"
        type="scientific"
        onPress={memoryAdd}
      />

      <CalculatorButton
        label="M-"
        type="scientific"
        onPress={memorySubtract}
      />
    </KeypadRow>
  );
}