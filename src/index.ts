import type {ErrorRequestHandler} from 'express'
import express from 'express'
import 'express-async-errors'
import dotenv from 'dotenv'
import userRoutes from './routes/user'
import bookGroupRoutes from './routes/bookGroup'
import bookCategoryRoutes from './routes/bookCategory'
import bookRoutes from './routes/book'
import opinionRoutes from './routes/opinion'
import cors from 'cors'
import {BackendException} from './exception/exception'

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('receive error when access %s, %s', req.url, err)
  if (err instanceof BackendException) {
    res.status(400)
    res.json({
      code: err.code,
      message: err.message,
    })
  } else {
    if (!res.headersSent) {
      res.status(500)
      res.json(res.statusMessage)
    } else {
      console.log(res.statusMessage)
    }
  }
}

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/user', userRoutes)
app.use('/bookGroup', bookGroupRoutes)
app.use('/bookGroup', bookCategoryRoutes)
app.use('/bookGroup', bookRoutes)
app.use('/bookGroup', opinionRoutes)
app.use(errorHandler)


app.listen(8000, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:8000`)
})
