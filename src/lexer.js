"use strict"

import { Lexer as _Lexer, createToken as _createToken } from "chevrotain"

const Lexer = _Lexer
const createToken = _createToken

const WhiteSpace = createToken({ name: "WhiteSpace", pattern: /\s+/, group: _Lexer.SKIPPED })
const Var = createToken({ name: "Var", pattern: /var/ })
const Print = createToken({ name: "Print", pattern: /print/ })
const Println = createToken({ name: "Println", pattern: /println/ })
const Identifier = createToken({ name: "Identifier", pattern: /[a-zA-Z]\w*/ })
const Literal = createToken({ name: "Literal", pattern: /"(:?[^\\"]+|\\(:?[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/ })
const Integer = createToken({ name: "Integer", pattern: /0|[1-9]\d*/ })

const ParenthesesOpen = createToken({ name: "ParenthesesOpen", pattern: /\(/ })
const ParenthesesClose = createToken({ name: "ParenthesesClose", pattern: /\)/ })
const BlockOpen = createToken({ name: "BlockOpen", pattern: /{/ })
const BlockClose = createToken({ name: "BlockClose", pattern: /}/ })
const Comma = createToken({ name: "Comma", pattern: /,/ })
const SemiColon = createToken({ name: "SemiColon", pattern: /;/ })
const Equals = createToken({ name: "Equals", pattern: /=/ })
const Plus = createToken({ name: "Plus", pattern: /\+/ })
const Minus = createToken({ name: "Minus", pattern: /-/ })
const Div = createToken({ name: "Div", pattern: /\// })
const Mult = createToken({ name: "Mult", pattern: /\*/ })

export const mj1Lexer = new Lexer([
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
]);
