const mongoose = require("mongoose")
const { stringify } = require("querystring")

if(process.argv.length < 5){
    console.log("Too few parameters arguments, please specify more!")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://anhuynh1234:${password}@fullstackopenpart3.5y7iuub.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

person.save().then(result => {
    console.log(`Saved ${person.name} number ${person.number} to database`)
})

Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
})