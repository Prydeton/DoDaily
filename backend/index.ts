import { env } from '/src/config/'

import startApp from './src/app'

startApp().then(() => {
  console.log(`🚀 Server listening on port ${env.PORT}...`)
}).catch(err => {
  console.error(`😢 Server failed to start on port ${env.PORT}`, err)
})
