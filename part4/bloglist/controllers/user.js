const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
    const {username, name, password}  = request.body

    if(password){
        if(password.length < 3){
            return response.status(400).json({ error: 'Password too short'})
        }
    }else{
        return response.status(400).json({ error: 'Missing password'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await newUser.save()

    response.status(201).json(savedUser)
})

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {title: 1, url: 1, likes: 1})
    response.json(users)
})

module.exports = userRouter