import { show } from './show'
import * as React from 'react'
import { Component } from 'react'
import { render } from 'react-dom'
require('./index.css')
// 执行 show 函数
show('Webpack')

class Button extends Component {
  render() {
    return <h1>Hello,Webpack</h1>
  }
}

render(<Button />, window.document.getElementById('app'))
