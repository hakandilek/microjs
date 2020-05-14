import _ from 'lodash'
import './main.css'
import '../image/lines.png'
import { parse } from './mj1'

function evaluate(source) {
  const resultView = document.getElementById('result')
  const tokenView = document.getElementById('tokens')
  if (!source) {
    const codeEditor = document.getElementById('code')
    source = codeEditor.innerHTML
  }
  const result = parse(source)

  if (result.errors.length > 0) {
    resultView.classList.remove('success')
    resultView.classList.add('error')
    resultView.innerHTML = _
      .chain(result.errors)
      .map((e) => `Line ${e.token.startLine}: ${e.message}`)
      .join('\n')
  } else {
    resultView.classList.remove('error')
    resultView.classList.add('success')
    resultView.innerHTML = result.value
  }

  if (result.lexErrors.length > 0) {
    resultView.innerHTML = ''
    tokenView.innerHTML = _
      .chain(result.lexErrors)
      .map((e) => `Line ${e.line}: ${e.message}`)
      .join('\n')
  } else {
    tokenView.innerHTML = _
      .chain(result.tokens)
      .map((tok) => `${tok.tokenType.name} ${tok.image}`)
      .join('\n')
  }
}

document.getElementById('code').addEventListener("input", (e) => evaluate(e.target.value))
evaluate()
