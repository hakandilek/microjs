import { mj1Lexer as lexer } from "./lexer"
import { mj1Parser as parser } from "./parser"
import { mj1Interpreter as interpreter } from "./interpreter"

export function parse(input) {
  const lex = lexer.tokenize(input)
  parser.input = lex.tokens
  const cst = parser.program()
  interpreter.visit(cst)

  return {
    value: interpreter.output,
    tokens: lex.tokens,
    lexErrors: lex.errors,
    errors: parser.errors
  }
}
