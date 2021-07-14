import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { connect } from 'mongoose'
import cors from 'cors'
require('dotenv').config()

import routes from './routes'
import ICustomError from './utils/ICustomError'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: '*' } })

app.use(express.json())
app.use(cors())
app.use(routes)

app.use((req, res, next) => {
  const err: ICustomError = new Error()
  err.originalMessage = 'Not Found'
  err.statusCode = 404
  next(err)
})

app.use(
  (
    err: ICustomError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(err)
    res.status(err.statusCode || 500).json({
      error: err.originalMessage || 'An error ocurred!',
      info: err.info
    })
  }
)

connect(process.env.MONGO_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

export { httpServer, io }
