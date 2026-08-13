// ========================================
// GRAPH EXPRESSION EVALUATOR
// Stage 4
// ========================================

type AngleMode = "DEG" | "RAD";

type Token =
  | {
      type: "number";
      value: number;
    }
  | {
      type: "variable";
      value: "x";
    }
  | {
      type: "constant";
      value: number;
    }
  | {
      type: "function";
      value:
        | "sin"
        | "cos"
        | "tan"
        | "asin"
        | "acos"
        | "atan"
        | "log"
        | "ln"
        | "sqrt"
        | "cbrt"
        | "abs";
    }
  | {
      type: "operator";
      value: "+" | "-" | "*" | "/" | "^";
    }
  | {
      type: "leftParen";
    }
  | {
      type: "rightParen";
    };


// ========================================
// TOKENIZER
// ========================================

function tokenize(expression: string): Token[] {
  const tokens: Token[] = [];

  let i = 0;

  while (i < expression.length) {
    const char = expression[i];


    // =========================
    // SPACES
    // =========================

    if (/\s/.test(char)) {
      i++;
      continue;
    }


    // =========================
    // NUMBERS
    // =========================

    if (/[0-9.]/.test(char)) {
      let number = "";

      while (
        i < expression.length &&
        /[0-9.]/.test(expression[i])
      ) {
        number += expression[i];
        i++;
      }

      const value = Number(number);

      if (!Number.isFinite(value)) {
        throw new Error("Invalid number");
      }

      tokens.push({
        type: "number",
        value,
      });

      continue;
    }


    // =========================
    // VARIABLE
    // =========================

    if (char === "x") {
      tokens.push({
        type: "variable",
        value: "x",
      });

      i++;
      continue;
    }


    // =========================
    // CONSTANT π
    // =========================

    if (char === "π") {
      tokens.push({
        type: "constant",
        value: Math.PI,
      });

      i++;
      continue;
    }


    // =========================
    // CONSTANT pi
    // =========================

    if (expression.startsWith("pi", i)) {
      tokens.push({
        type: "constant",
        value: Math.PI,
      });

      i += 2;
      continue;
    }


    // =========================
    // CONSTANT e
    // =========================

    if (
      char === "e" &&
      !/[a-zA-Z]/.test(
        expression[i + 1] ?? ""
      )
    ) {
      tokens.push({
        type: "constant",
        value: Math.E,
      });

      i++;

      continue;
    }


    // =========================
    // FUNCTIONS
    // =========================

    const functions = [
      "asin",
      "acos",
      "atan",
      "sin",
      "cos",
      "tan",
      "sqrt",
      "cbrt",
      "log",
      "ln",
      "abs",
    ] as const;


    let foundFunction = false;

    for (const name of functions) {

      if (
        expression.startsWith(
          name,
          i
        )
      ) {

        tokens.push({
          type: "function",
          value: name,
        });

        i += name.length;

        foundFunction = true;

        break;
      }
    }


    if (foundFunction) {
      continue;
    }


    // =========================
    // OPERATORS
    // =========================

    if (
      char === "+" ||
      char === "-" ||
      char === "*" ||
      char === "/" ||
      char === "^"
    ) {

      tokens.push({
        type: "operator",
        value: char,
      });

      i++;

      continue;
    }


    // =========================
    // LEFT PARENTHESIS
    // =========================

    if (char === "(") {

      tokens.push({
        type: "leftParen",
      });

      i++;

      continue;
    }


    // =========================
    // RIGHT PARENTHESIS
    // =========================

    if (char === ")") {

      tokens.push({
        type: "rightParen",
      });

      i++;

      continue;
    }


    // =========================
    // UNKNOWN CHARACTER
    // =========================

    throw new Error(
      `Unsupported character: ${char}`
    );
  }


  return tokens;
}


// ========================================
// PARSER
// ========================================

class Parser {

  private tokens: Token[];

  private position = 0;

  private x: number;

  private angleMode: AngleMode;


  constructor(
    tokens: Token[],
    x: number,
    angleMode: AngleMode
  ) {

    this.tokens = tokens;

    this.x = x;

    this.angleMode = angleMode;
  }


  // ======================================
  // MAIN
  // ======================================

  parse(): number {

    const result =
      this.parseExpression();


    if (
      this.position <
      this.tokens.length
    ) {

      throw new Error(
        "Unexpected token"
      );
    }


    return result;
  }


  // ======================================
  // DEG / RAD
  // ======================================

  private toRadians(
    value: number
  ): number {

    if (
      this.angleMode === "DEG"
    ) {

      return (
        value *
        Math.PI /
        180
      );
    }


    return value;
  }


  private fromRadians(
    value: number
  ): number {

    if (
      this.angleMode === "DEG"
    ) {

      return (
        value *
        180 /
        Math.PI
      );
    }


    return value;
  }


  // ======================================
  // + -
  // ======================================

  private parseExpression(): number {

    let value =
      this.parseTerm();


    while (true) {

      const token =
        this.peek();


      if (
        token?.type === "operator" &&
        (
          token.value === "+" ||
          token.value === "-"
        )
      ) {

        this.position++;


        const right =
          this.parseTerm();


        if (
          token.value === "+"
        ) {

          value += right;

        } else {

          value -= right;
        }


      } else {

        break;
      }
    }


    return value;
  }


  // ======================================
  // * /
  // ======================================

  private parseTerm(): number {

    let value =
      this.parsePower();


    while (true) {

      const token =
        this.peek();


      // -------------------------
      // Explicit multiplication
      // -------------------------

      if (
        token?.type === "operator" &&
        (
          token.value === "*" ||
          token.value === "/"
        )
      ) {

        this.position++;


        const right =
          this.parsePower();


        if (
          token.value === "*"
        ) {

          value *= right;

        } else {

          if (
            right === 0
          ) {

            throw new Error(
              "Division by zero"
            );
          }


          value /= right;
        }


        continue;
      }


      // -------------------------
      // Implicit multiplication
      // -------------------------

      if (
        token?.type === "number" ||
        token?.type === "variable" ||
        token?.type === "constant" ||
        token?.type === "function" ||
        token?.type === "leftParen"
      ) {

        const right =
          this.parsePower();


        value *= right;


        continue;
      }


      break;
    }


    return value;
  }


  // ======================================
  // POWER
  // ======================================

  private parsePower(): number {

    let value =
      this.parseUnary();


    const token =
      this.peek();


    if (
      token?.type === "operator" &&
      token.value === "^"
    ) {

      this.position++;


      const exponent =
        this.parsePower();


      value =
        Math.pow(
          value,
          exponent
        );
    }


    return value;
  }


  // ======================================
  // UNARY
  // ======================================

  private parseUnary(): number {

    const token =
      this.peek();


    if (
      token?.type === "operator" &&
      token.value === "+"
    ) {

      this.position++;

      return this.parseUnary();
    }


    if (
      token?.type === "operator" &&
      token.value === "-"
    ) {

      this.position++;

      return -this.parseUnary();
    }


    return this.parsePrimary();
  }


  // ======================================
  // PRIMARY
  // ======================================

  private parsePrimary(): number {

    const token =
      this.peek();


    // -------------------------
    // Number
    // -------------------------

    if (
      token?.type === "number"
    ) {

      this.position++;

      return token.value;
    }


    // -------------------------
    // X
    // -------------------------

    if (
      token?.type === "variable"
    ) {

      this.position++;

      return this.x;
    }


    // -------------------------
    // Constant
    // -------------------------

    if (
      token?.type === "constant"
    ) {

      this.position++;

      return token.value;
    }


    // -------------------------
    // Function
    // -------------------------

    if (
      token?.type === "function"
    ) {

      this.position++;

      return this.parseFunction(
        token.value
      );
    }


    // -------------------------
    // Parentheses
    // -------------------------

    if (
      token?.type === "leftParen"
    ) {

      this.position++;


      const value =
        this.parseExpression();


      const closing =
        this.peek();


      if (
        closing?.type !==
        "rightParen"
      ) {

        throw new Error(
          "Missing closing parenthesis"
        );
      }


      this.position++;


      return value;
    }


    throw new Error(
      "Invalid expression"
    );
  }


  // ======================================
  // FUNCTIONS
  // ======================================

  private parseFunction(
    name:
      | "sin"
      | "cos"
      | "tan"
      | "asin"
      | "acos"
      | "atan"
      | "log"
      | "ln"
      | "sqrt"
      | "cbrt"
      | "abs"
  ): number {


    const next =
      this.peek();


    // Functions require (
    if (
      next?.type !==
      "leftParen"
    ) {

      throw new Error(
        "Function requires parentheses"
      );
    }


    // Remove (
    this.position++;


    // Parse argument
    const argument =
      this.parseExpression();


    // Check )
    const closing =
      this.peek();


    if (
      closing?.type !==
      "rightParen"
    ) {

      throw new Error(
        "Missing closing parenthesis"
      );
    }


    // Remove )
    this.position++;


    // =====================================
    // APPLY FUNCTION
    // =====================================

    switch (name) {


      // -------------------------
      // sin
      // -------------------------

      case "sin":

        return Math.sin(
          this.toRadians(
            argument
          )
        );


      // -------------------------
      // cos
      // -------------------------

      case "cos":

        return Math.cos(
          this.toRadians(
            argument
          )
        );


      // -------------------------
      // tan
      // -------------------------

      case "tan": {

        const radians =
          this.toRadians(
            argument
          );


        const cosValue =
          Math.cos(radians);


        if (
          Math.abs(
            cosValue
          ) < 1e-10
        ) {

          throw new Error(
            "Undefined tangent"
          );
        }


        return Math.tan(
          radians
        );
      }


      // -------------------------
      // asin
      // -------------------------

      case "asin":

        if (
          argument < -1 ||
          argument > 1
        ) {

          throw new Error(
            "asin domain error"
          );
        }


        return this.fromRadians(
          Math.asin(argument)
        );


      // -------------------------
      // acos
      // -------------------------

      case "acos":

        if (
          argument < -1 ||
          argument > 1
        ) {

          throw new Error(
            "acos domain error"
          );
        }


        return this.fromRadians(
          Math.acos(argument)
        );


      // -------------------------
      // atan
      // -------------------------

      case "atan":

        return this.fromRadians(
          Math.atan(argument)
        );


      // -------------------------
      // log
      // -------------------------

      case "log":

        if (
          argument <= 0
        ) {

          throw new Error(
            "log domain error"
          );
        }


        return Math.log10(
          argument
        );


      // -------------------------
      // ln
      // -------------------------

      case "ln":

        if (
          argument <= 0
        ) {

          throw new Error(
            "ln domain error"
          );
        }


        return Math.log(
          argument
        );


      // -------------------------
      // sqrt
      // -------------------------

      case "sqrt":

        if (
          argument < 0
        ) {

          throw new Error(
            "sqrt domain error"
          );
        }


        return Math.sqrt(
          argument
        );


      // -------------------------
      // cbrt
      // -------------------------

      case "cbrt":

        return Math.cbrt(
          argument
        );


      // -------------------------
      // abs
      // -------------------------

      case "abs":

        return Math.abs(
          argument
        );


      default:

        throw new Error(
          "Unknown function"
        );
    }
  }


  // ======================================
  // LOOK AHEAD
  // ======================================

  private peek():
    Token | undefined {

    return this.tokens[
      this.position
    ];
  }
}


// ========================================
// PUBLIC FUNCTION
// ========================================

export function evaluateExpression(
  expression: string,
  x: number,
  angleMode: AngleMode = "RAD"
): number | null {

  try {

    let normalized =
      expression
        .toLowerCase()
        .replace(/\s/g, "");


    // -------------------------
    // Superscript powers
    // -------------------------

    normalized =
      normalized
        .replace(
          /²/g,
          "^2"
        )
        .replace(
          /³/g,
          "^3"
        );


    // -------------------------
    // Tokenize
    // -------------------------

    const tokens =
      tokenize(
        normalized
      );


    // -------------------------
    // Parse
    // -------------------------

    const parser =
      new Parser(
        tokens,
        x,
        angleMode
      );


    const result =
      parser.parse();


    // -------------------------
    // Validate
    // -------------------------

    if (
      !Number.isFinite(result)
    ) {

      return null;
    }


    return result;

  } catch {

    return null;
  }
}