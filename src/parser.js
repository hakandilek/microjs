import { CstParser } from "chevrotain"
import {
  vocabulary, Var, Println, Print, Identifier, Literal, Integer, ParenthesesOpen, ParenthesesClose,
  BlockOpen, BlockClose, Comma, SemiColon, Equals, Minus, AdditionOp, MultiplicationOp,
} from "./lexer"

class Mj1Parser extends CstParser {
  constructor() {
    super(vocabulary)

    const $ = this

    // program -> method
    $.RULE("program", () => {
      $.SUBRULE($.method)
    })

    // method -> ident(identListopt) { declarationopt statementrep }
    $.RULE("method", () => {
      $.CONSUME(Identifier)
      $.CONSUME(ParenthesesOpen)
      $.OPTION1(() => {
        $.SUBRULE($.identList)
      })
      $.CONSUME(ParenthesesClose)
      $.CONSUME(BlockOpen)
      $.OPTION2(() => {
        $.SUBRULE($.declaration)
      })
      $.MANY(() => {
        $.SUBRULE($.statement)
      })
      $.CONSUME(BlockClose)
    })

    // identList -> ident | identList, ident
    $.RULE("identList", () => {
      $.MANY_SEP({
        SEP: Comma,
        DEF: () => {
          $.CONSUME(Identifier)
        }
      })
    })

    // declaration -> var identList;
    $.RULE("declaration", () => {
      $.CONSUME(Var)
      $.SUBRULE($.identList)
      $.CONSUME(SemiColon)
    })

    // statement -> assignment | printStat
    $.RULE("statement", () => {
      $.OR([
        { ALT: () => $.SUBRULE($.assignment) },
        { ALT: () => $.SUBRULE($.printStat) }
      ])
    })

    // assignment -> variable = expression;
    $.RULE("assignment", () => {
      $.SUBRULE($.variable)
      $.CONSUME(Equals)
      $.SUBRULE($.expression)
      $.CONSUME(SemiColon)
    })

    // expression -> -opt term | expression + term | expression – term
    // term -> factor | term * factor | term / factor
    $.RULE("expression", () => {
      $.OPTION(() => {
        $.CONSUME(Minus)
      })
      $.SUBRULE($.additionExpression)
    })

    $.RULE("additionExpression", () => {
      $.SUBRULE1($.multiplicationExpression, { LABEL: "lhs" })
      $.MANY(() => {
        $.CONSUME(AdditionOp)
        $.SUBRULE2($.multiplicationExpression, { LABEL: "rhs" })
      })
    })

    $.RULE("multiplicationExpression", () => {
      $.SUBRULE1($.factor, { LABEL: "lhs" })
      $.MANY(() => {
        $.CONSUME(MultiplicationOp)
        $.SUBRULE2($.factor, { LABEL: "rhs" })
      })
    })

    // factor -> number | variable | (expression)
    $.RULE("factor", () => {
      $.OR([
        { ALT: () => $.SUBRULE($.number) },
        { ALT: () => $.SUBRULE($.variable) },
        {
          ALT: () => {
            $.CONSUME(ParenthesesOpen)
            $.SUBRULE($.expression)
            $.CONSUME(ParenthesesClose)
          }
        },
      ])
    })

    // variable -> ident
    $.RULE("variable", () => {
      $.CONSUME(Identifier)
    })

    // number -> integer
    $.RULE("number", () => {
      $.CONSUME(Integer)
    })

    // printStat -> print itemList; | println itemList opt;
    $.RULE("printStat", () => {
      $.OR([
        {
          ALT: () => {
            $.CONSUME(Print)
            $.SUBRULE1($.itemList)
            $.CONSUME1(SemiColon)
          }
        },
        {
          ALT: () => {
            $.CONSUME(Println)
            $.OPTION(() => {
              $.SUBRULE2($.itemList)
            })
            $.CONSUME2(SemiColon)
          }
        },
      ])
    })

    // itemList -> printItem | itemList, printItem
    $.RULE("itemList", () => {
      $.MANY_SEP({
        SEP: Comma,
        DEF: () => {
          $.SUBRULE($.printItem)
        }
      })
    })

    // printItem -> literal | expression | expression : expression
    $.RULE("printItem", () => {
      $.OR([
        { ALT: () => $.CONSUME(Literal) },
        { ALT: () => $.SUBRULE($.expression) },
      ])
    })

    this.performSelfAnalysis()

  }
}

export const mj1Parser = new Mj1Parser();
