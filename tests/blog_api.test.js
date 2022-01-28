const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper.js')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const noteObjects = helper.initialBlogList.map(item => new Blog(item))
  const promiseArray = noteObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json and have the correct amount', async () => {
  const arraySum = helper.initialBlogList.length
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    
    const getRequest = await api.get('/api/blogs')
    expect(getRequest.body.length).toBe(arraySum)

}, 150000)



afterAll( () => {
  mongoose.connection.close()
})
  