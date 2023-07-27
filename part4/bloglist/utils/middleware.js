const logger = require('./logger')
const jwt = require('jsonwebtoken')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint'})
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'Malinformed ID' })
    }else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message })
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('Authorization')

    if(authorization && authorization.startsWith('Bearer ')){
        request.token = authorization.replace('Bearer ', '')
    }

    next()
}

module.exports = {
    unknownEndpoint,
    errorHandler,
    tokenExtractor
}