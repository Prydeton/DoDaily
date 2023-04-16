import { port } from '/src/config/'

import startApp from './src/app'

startApp({ port: Number(port) }).then(() => {
  console.log(`🚀 Server listening on port ${port}...`)
}).catch(err => {
  console.error(`😢 Server failed to start on port ${port}`, err)
})
