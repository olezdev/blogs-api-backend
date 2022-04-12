const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
require('dotenv').config()
const middleware = require('./utils/middleware')

const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.log(err)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app