import React from 'react'
import ReactDOM from 'react-dom'

import App from './app'

const { initialProps } = window['RSSR.App'] 

ReactDOM.render(<App {...initialProps} />, document.getElementById('app'))
