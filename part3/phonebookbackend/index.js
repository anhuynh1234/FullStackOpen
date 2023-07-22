// Imports all modules
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const app = express()

console.log(Number('sadas').toString() === 'sadas')
// Declaring middlewares
app.use(express.static('build'))
app.use(cors())
app.use(express.json())

// let persons =
// [
//     {
//       "id": 1,
//       "name": "Arto Hellas",
//       "number": "040-123456"
//     },
//     {
//       "id": 2,
//       "name": "Ada Lovelace",
//       "number": "39-44-5323523"
//     },
//     {
//       "id": 3,
//       "name": "Dan Abramov",
//       "number": "12-43-234345"
//     },
//     {
//       "id": 4,
//       "name": "Mary Poppendieck",
//       "number": "39-23-6423122"
//     }
// ]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })

    // older parts
    // response.json(persons)
})

app.get('/info', (request, response) => {

    Person.find({}).then(persons => {
        response.send(
            `<div>Phonebook has info for ${persons.length} ${ persons.length > 1 ? 'people' : 'person' } <br /> ${Date()}</div>`
        )
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })

    // older parts
    // const id = Number(request.params.id)
    // const person = persons.find(person => person.id === id)

    // if(!person){
    //     response.status(404).end()
    // }else{
    //     response.json(person)
    // }
})

app.delete('/api/persons/:id', (request, response, next) => {

    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))

    // older part
    // const id = Number(request.params.id)
    // persons = persons.filter(person => person.id !== id)

    // response.status(204).end()
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

morgan.token('requestBody', (request, response) => {
    return(JSON.stringify(request.body))
})

app.use(morgan((tokens, req, res) => {
    console.log(tokens.req(req, res, ''))

    return [tokens.method(req, res), tokens.url(req, res), tokens.status(req, res), tokens.res(req, res, 'content-length'), tokens['response-time'](res, req), 'ms', tokens.requestBody(req, res)].join(' ')
}))

// app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if(body.name === undefined){
        return response.status(400).json({ error: 'Content missing' })
    }

    const newPerson = new Person({
        name: body.name,
        number: body.number
    })

    newPerson.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))

    // older part
    // const id = Math.floor(Math.random()*1000000000000)
    // const person = {...request.body, id:id}

    // if(request.body.name){
    //     let duplicate = false
    //     persons.map(person => {
    //         return ((person.name === request.body.name) ? (duplicate = true) : (duplicate === true ? duplicate = true : duplicate = false))
    //     })

    //     if(duplicate){
    //         return(response.status(400).json({
    //             error: "duplicate name"
    //         }))
    //     }
    // }

    // if(!request.body){
    //     return response.status(400).json({
    //         error: "empty profile"
    //     })
    // }else if(!request.body.name || !request.body.number){
    //     if(!request.body.name){
    //         return response.status(400).json({
    //             error: "name missing"
    //         })
    //     }else if(!request.body.number){
    //         return(response.status(400).json({
    //             error: "number missing"
    //         }))
    //     }
    // }else{
    //     persons = persons.concat(person)
    //     response.json(persons)
    // }
})

const unknownEndpoint = function(request, response){
    response.status(404).send({ error: 'Unknown endpoint' })
}

app.use(unknownEndpoint)

// Middleware for handling operational errors
const handleError = (error, request, response, next) => {
    if(error.name === 'CasrError'){
        return response.status(400).send({ error: 'Malinformed ID' })
    }else if(error.name === 'ValidationError'){
        return response.status(400).json({ error: error.message })
    }
    next(error)
}

app.use(handleError)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${ PORT }`)
})