import _ from 'lodash';
import { tokenMatcher } from "chevrotain"
import { mj1Parser as parser } from "./parser";
import { Mult, Plus } from "./lexer"

const BaseCstVisitor = parser.getBaseCstVisitorConstructor()

class Mj1Interpreter extends BaseCstVisitor {

  constructor() {
    super()
    this.validateVisitor()
    this.reset()
  }

  reset() {
    this.frame = {}
    this.output = ''
  }

  program(ctx) {
    this.reset()
    this.visit(ctx.method)
    console.log(this.output)
  }

  method(ctx) {
    this.frame = this.visit(ctx.identList)
    if (ctx.declaration) {
      const vars = this.visit(ctx.declaration)
      this.frame = _.assign(this.frame, vars)
    }

    if (ctx.statement) {
      _.chain(ctx.statement)
        .map((statement => {
          this.visit(statement)
        }))
        .value()
    }
  }

  identList(ctx) {
    if (ctx.Identifier) {
      return _
        .chain(ctx.Identifier)
        .keyBy('image')
        .mapValues(() => null)
        .value()
    }
    return {}
  }

  declaration(ctx) {
    return this.visit(ctx.identList)
  }

  statement(ctx) {
    if (ctx.printStat) {
      this.visit(ctx.printStat)
    } else if (ctx.assignment) {
      this.visit(ctx.assignment)
    }
  }

  assignment(ctx) {
    const name = this.visit(ctx.variable)
    const value = this.visit(ctx.expression)
    this.frame[name] = value
  }

  expression(ctx) {
    const value = this.visit(ctx.additionExpression)
    if (ctx.Minus) {
      return -value
    }
    return value
  }

  additionExpression(ctx) {
    let result = this.visit(ctx.lhs)

    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
        let rhsValue = this.visit(rhsOperand)
        let operator = ctx.AdditionOp[idx]

        if (tokenMatcher(operator, Plus)) {
          result += rhsValue
        } else {
          result -= rhsValue
        }
      })
    }

    return result
  }

  multiplicationExpression(ctx) {
    let result = this.visit(ctx.lhs)
    if (ctx.rhs) {
      ctx.rhs.forEach((rhsOperand, idx) => {
        let rhsValue = this.visit(rhsOperand)
        let operator = ctx.MultiplicationOp[idx]

        if (tokenMatcher(operator, Mult)) {
          result *= rhsValue
        } else {
          result /= rhsValue
        }
      })
    }

    return result
  }

  factor(ctx) {
    if (ctx.number) {
      return this.visit(ctx.number)
    } else if (ctx.variable) {
      const name = this.visit(ctx.variable)
      const value = this.frame[name]
      return value
    } else if (ctx.expression) {
      return this.visit(ctx.expression)
    }
  }

  variable(ctx) {
    return ctx.Identifier[0].image
  }

  number(ctx) {
    return parseInt(ctx.Integer[0].image, 10)
  }

  printStat(ctx) {
    const items = this.visit(ctx.itemList)
    if (ctx.Print) {
      this.doPrint(items)
    } else if (ctx.Println) {
      this.doPrintln(items)
    }
  }

  itemList(ctx) {
    if (ctx.printItem) {
      return _
        .chain(ctx.printItem)
        .map((pi) => {
          return this.visit(pi)
        })
        .value()
    }
    return []
  }

  printItem(ctx) {
    if (ctx.Literal) {
      return _.trim(ctx.Literal[0].image, '"')
    } else if (ctx.expression) {
      return this.visit(ctx.expression)
    }
  }

  doPrint(items) {
    this.output += _.join(items, '')
  }

  doPrintln(items) {
    this.output += _.join(items, '') + '\n'
  }

}

export const mj1Interpreter = new Mj1Interpreter()
