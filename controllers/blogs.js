const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


// blogsRouter.get('/', (request, response, next) => {
//   console.log('Blogs')
//   response.send('<h2>Blogs</h2>')
// })

blogsRouter.get('/', async (request, response, next) => {
  // response.json(blogs)
  const blogs = await Blog.find({})
  response.json(blogs)
  // Blog
  //   .find({})
  //   .then(blogs => {
  //     response.json(blogs)
  //   })
})

blogsRouter.get('/:id', (request, response, next) => {
  // const title = request.params.title
  // console.log({ title })
  // const blog = blogs.find(blog => blog.title === title)

  // blog ? response.json(blog) : response.status(404).end()
  const { id } = request.params
  Blog.findById(id).then(blog => {
    return blog
      ? response.json(blog)
      : response.status(404).end()
  }).catch(err => next(err))
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = request.body

  const newBlog = new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  })
  // console.log({ newBlog })
  // blogs = blogs.concat(newBlog)
  // response.json(newBlog)

  try {
    const savedBlogs = await newBlog.save()
    response.json(savedBlogs)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

module.exports = blogsRouter 