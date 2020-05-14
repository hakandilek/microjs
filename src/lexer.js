import { Lexer, createToken } from "chevrotain"

const WhiteSpace = createToken({ name: "WhiteSpace", pattern: /\s+/, group: Lexer.SKIPPED })
export const Var = createToken({ name: "Var", pattern: /var/ })
export const Print = createToken({ name: "Print", pattern: /print/ })
export const Println = createToken({ name: "Println", pattern: /println/ })
export const Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z]\w*/ })
export const Literal = createToken({ name: "Literal", pattern: /"(:?[^\\"]+|\\(:?[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/ })
export const Integer = createToken({ name: "Integer", pattern: /0|[1-9]\d*/ })

export const ParenthesesOpen = createToken({ name: "ParenthesesOpen", pattern: /\(/ })
export const ParenthesesClose = createToken({ name: "ParenthesesClose", pattern: /\)/ })
export const BlockOpen = createToken({ name: "BlockOpen", pattern: /{/ })
export const BlockClose = createToken({ name: "BlockClose", pattern: /}/ })
export const Comma = createToken({ name: "Comma", pattern: /,/ })
export const SemiColon = createToken({ name: "SemiColon", pattern: /;/ })
export const Equals = createToken({ name: "Equals", pattern: /=/ })
export const AdditionOp = createToken({ name: "AdditionOp", pattern: Lexer.NA })
export const MultiplicationOp = createToken({ name: "MultiplicationOp", pattern: Lexer.NA })
export const Plus = createToken({ name: "Plus", pattern: /\+/, categories: AdditionOp })
export const Minus = createToken({ name: "Minus", pattern: /-/, categories: AdditionOp })
export const Div = createToken({ name: "Div", pattern: /\//, categories: MultiplicationOp })
export const Mult = createToken({ name: "Mult", pattern: /\*/, categories: MultiplicationOp })

export const vocabulary = [
  WhiteSpace,
  // keywords
  Var,
  Println,
  Print,
  // identifier, literal and numbers
  Identifier,
  Literal,
  Integer,
  // separators
  ParenthesesOpen,
  ParenthesesClose,
  BlockOpen,
  BlockClose,
  Comma,
  SemiColon,
  // operators
  Equals,
  Plus,
  Minus,
  Div,
  Mult,
  AdditionOp,
  MultiplicationOp,
]

export const mj1Lexer = new Lexer(vocabulary)
