const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')
const logger  =require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/testing')

const mongoUrl = config.MONGO_URI
mongoose.connect(mongoUrl)
        .then(result => {
            logger.info('Connected to MongoDB')
        })
        .catch(error => {
            logger.info('Error found: ' + error.message)
        })

app.use(middleware.tokenExtractor)
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if(process.env.NODE_ENV !== 'test') {
    app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app
