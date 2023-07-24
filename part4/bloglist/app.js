const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const logger  =require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blog')

const mongoUrl = config.MONGO_URI
mongoose.connect(mongoUrl)
        .then(result => {
            logger.info('Connected to MongoDB')
        })
        .catch(error => {
            logger.info('Error found: ' + error.message)
        })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app
