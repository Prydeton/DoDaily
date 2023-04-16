import express from 'express'

const startApp = async ({ port }: { port: number }) => {
  const app = express()

  // Generic middleware

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  // Routes
  app.post('/health-check', () => { console.log('Alive')})
  return app.listen(port, () => console.log('listening'))
}

export default startApp
