const config = require('./utils/config.js')
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controller/blogRouter')
const logger = require('./utils/logger.js')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app