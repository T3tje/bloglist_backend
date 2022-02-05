const jwt = require("jsonwebtoken")
const blogRouter = require('express').Router()
const Blog = require('../models/blog.js')
const User = require("../models/users")

/*
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}
*/ 

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {username: 1, name: 1})
    response.json(blogs)
  })
  
blogRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
   
  if(!decodedToken.id) {
    return response.status(401).json({
      error: "token missing or invalid"
    })
  }

  const user = await User.findById(decodedToken.id)

  if(!body.title && !body.url) {
    response.status(400).json(
      {error: "you are not allowed to leave title and url empty"}
    )
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await User.findByIdAndUpdate(user._id, user, {new:true})
    response.status(201)
    response.json(savedBlog)
  }
})

blogRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const blogId = request.params.id
  if(!decodedToken.id) {
    return response.status(401).json({
      error: "token missing or invalid"
    })
  }

  const blog = await Blog.findById(blogId)
  const user = await User.findById(decodedToken.id)

  const blogUserIndex = user.blogs.indexOf(blogId)
 
  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(blogId)
    
    //remove blogid from User
    if (blogUserIndex > -1) {
      
      user.blogs = user.blogs.slice(blogUserIndex, blogUserIndex + 1)
      await User.findByIdAndUpdate(user._id, user, {new:true})
    }
    response.status(204).end()

  } else {
    return response.status(401).json({
      error: "token invalid"
    })
  }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
  response.json(updatedBlog)
})
  
  module.exports = blogRouter