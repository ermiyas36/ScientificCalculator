import CalculatorButton from "./CalculatorButton";
import KeypadRow from "./KeypadRow";

type Props = {
  handlePress: (value: string) => void;
};


export default function NumberPad({
  handlePress,
}: Props) {

  return (

    <>

      {/* Row 1 */}
      <KeypadRow>

  <CalculatorButton
    label="C"
    onPress={() => handlePress("C")}
  />

  <CalculatorButton
    label="⌫"
    onPress={() => handlePress("BACKSPACE")}
  />
  <CalculatorButton
          label="."
          onPress={() => handlePress(".")}
        />

  <CalculatorButton
    label="÷"
    type="operator"
    onPress={() => handlePress("/")}
  />

</KeypadRow>



      {/* Row 2 */}
      <KeypadRow>

        <CalculatorButton
          label="7"
          onPress={() => handlePress("7")}
        />

        <CalculatorButton
          label="8"
          onPress={() => handlePress("8")}
        />

        <CalculatorButton
          label="9"
          onPress={() => handlePress("9")}
        />

        <CalculatorButton
          label="×"
          type="operator"
          onPress={() => handlePress("*")}
        />

      </KeypadRow>



      {/* Row 3 */}
      <KeypadRow>

        <CalculatorButton
          label="4"
          onPress={() => handlePress("4")}
        />

        <CalculatorButton
          label="5"
          onPress={() => handlePress("5")}
        />

        <CalculatorButton
          label="6"
          onPress={() => handlePress("6")}
        />

        <CalculatorButton
          label="-"
          type="operator"
          onPress={() => handlePress("-")}
        />

      </KeypadRow>



      {/* Row 4 */}
      <KeypadRow>

        <CalculatorButton
          label="1"
          onPress={() => handlePress("1")}
        />

        <CalculatorButton
          label="2"
          onPress={() => handlePress("2")}
        />

        <CalculatorButton
          label="3"
          onPress={() => handlePress("3")}
        />

        <CalculatorButton
          label="+"
          type="operator"
          onPress={() => handlePress("+")}
        />

      </KeypadRow>



      {/* Row 5 */}
      <KeypadRow>

        <CalculatorButton
          label="±"
          onPress={() => handlePress("±")}
        />

        <CalculatorButton
          label="0"
          onPress={() => handlePress("0")}
        />

        <CalculatorButton
          label="="
          type="equal"
          onPress={() => handlePress("=")}
        />

      </KeypadRow>


    </>
  );
}