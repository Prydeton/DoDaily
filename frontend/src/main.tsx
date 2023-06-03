import React, { createElement } from 'react'
import ReactDOM from 'react-dom/client'
import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import { setup } from 'goober'
import { shouldForwardProp } from 'goober/should-forward-prop'

import App from './App'

// Configure styled components prop forwarding
setup(
  createElement,
  undefined, undefined,
  shouldForwardProp(prop => !prop.startsWith('$'))
)

dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  months: [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ]
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
