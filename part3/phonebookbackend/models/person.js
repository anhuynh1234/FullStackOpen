const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGO_URI

console.log('Connecting to ' + url)

mongoose.connect(url)
        .then(result => {
            console.log("Connected to MongoDB")
        })
        .catch(error => {
            console.log("Error encountered: " + error.message)
        })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: true,
        validate: (query) => {
            const queryComponents = query.split('-')
            console.log(queryComponents)
            if(queryComponents.length != 2){
                return false
            }
            return (queryComponents[0].length == 2 || queryComponents[0].length == 3) && Number(queryComponents[0]).toString() === queryComponents[0] && Number(queryComponents[1]).toString() === queryComponents[1]
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)