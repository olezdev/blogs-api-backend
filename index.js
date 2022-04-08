const express = require('express')
const app = express()
const cors = require('cors')
// const mongoose = require('mongoose')
require('dotenv').config()
const middleware = require('./utils/middleware')
app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)
let blogs = [
  {
    'title': 'Prueba Blogs',
    'author': 'olez',
    'url': 'www.www',
    'likes': '1'
  }
]
// const blogSchema = new mongoose.Schema({
//     title: String,
//     author: String,
//     url: String,
//     likes: Number
// })

// blogSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         returnedObject.id = returnedObject._id
//         delete returnedObject._id
//         delete returnedObject.__v
//     }
// })

// const Blog = mongoose.model('Blog', blogSchema)

// const mongoUrl = process.env.MONGODB_URI

// mongoose.connect(mongoUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => {
//         console.log('Database connected')
//     }).catch(err => {
//         console.log(err)
//     })

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  console.log('Blogs')
  response.send('<h2>Blogs</h2>')
})

app.get('/api/blogs', (request, response) => {
  response.json(blogs)
  // Blog
  //     .find({})
  //     .then(blogs => {
  //         response.json(blogs)
  //     })
})

app.get('/api/blogs/:title', (request, response) => {
  const title = request.params.title
  console.log({ title })
  const blog = blogs.find(blog => blog.title === title)

  blog ? response.json(blog) : response.status(404).end()
})

app.post('/api/blogs', (request, response) => {
  const blog = request.body

  const newBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
  console.log({ newBlog })
  blogs = blogs.concat(newBlog)
  response.json(newBlog)
  // newBlog
  //     .save()
  //     .then(result => {
  //         console.log({ result })
  //         response.status(201).json(result)
  //     })
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})