import _ from 'lodash';

import './main.css';
import { parse } from "./mj1";

function evaluate(source) {
  const root = document.createElement('div');
  const codeDiv = document.createElement('div');
  const resultDiv = document.createElement('div');
  const tokensDiv = document.createElement('div');

  codeDiv.innerHTML = source;
  codeDiv.classList.add('code');

  const result = parse(source);
  resultDiv.classList.add('code');
  tokensDiv.classList.add('code', 'info');
  if (result.errors.length > 0) {
    resultDiv.classList.add('error');
    resultDiv.innerHTML = _
      .chain(result.errors)
      .map((e) => `Line ${e.token.startLine}: ${e.message}`)
      .join('\n');
  } else {
    resultDiv.classList.add('success');
    resultDiv.innerHTML = result.value
    tokensDiv.innerHTML = _
      .chain(result.tokens)
      .map((tok) => `${tok.tokenType.name} ${tok.image}`)
      .join('\n');
  }

  root.appendChild(codeDiv);
  root.appendChild(document.createElement('hr'));
  root.appendChild(resultDiv);
  root.appendChild(document.createElement('hr'));
  root.appendChild(tokensDiv);
  return root;
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
