import './main.css';
import _ from 'lodash';
import { mj1Lexer } from "./lexer";

function evaluate(source) {
  const prog = document.createElement('div');
  const code = document.createElement('div');
  const result = document.createElement('div');

  code.innerHTML = source;
  code.classList.add('code');

  const lx = mj1Lexer.tokenize(source);
  result.classList.add('code');
  if (lx.errors.length > 0) {
    result.classList.add('error');
    result.innerHTML = _
      .chain(lx.errors)
      .map((e) => e.message)
      .join('\n');
  } else {
    result.classList.add('result');
    result.innerHTML = _
      .chain(lx.tokens)
      .map((tok) => `${tok.tokenType.name} ${tok.image}`)
      .join('\n');
  }

  prog.appendChild(code);
  prog.appendChild(document.createElement('hr'));
  prog.appendChild(result);
  return prog;
}

function add(text) {
  document.body.appendChild(evaluate(text));
}

const prog = `
  test() {
    var a, b, c;
    println "Some expressions";
    a = -40 / (-2 * 5);
    print "a = ", a, "   -1/a = ", -1 / a;
    println "   2*a = ", 2 * a;
    println "a = 2; b = 3; c = 5;";
    a = 2; b = 3; c = 5;
    print "b*8-(c-b)*7-(a*c-b)/(c/(a+b)) = ";
    print  b * 8 - (c - b) * 7 - (a * c - b) / (c / (a + b));
  }
`;

add(prog);
