import React, { createElement } from 'react'
import ReactDOM from 'react-dom/client'
import { setup } from 'goober'
import { shouldForwardProp } from 'goober/should-forward-prop'

import App from './App'

setup(
  createElement,
  undefined, undefined,
  shouldForwardProp(prop => !prop.startsWith('$'))
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
