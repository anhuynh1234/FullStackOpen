const blogRouter = require('express').Router()
const Blog = require('./../models/blog')
const User = require('./../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

// const getToken = (request) => {
//     const authorization = request.get('authorization')

//     if(authorization && authorization.startsWith('Bearer ')){
//         return authorization.replace('Bearer ', '')
//     }

//     return null
// }

blogRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)

    // Blog
    //     .find({})
    //     .then(blogs => {
    //         response.json(blogs)
    //     })
})
  
blogRouter.post('/', middleware.userExtractor, async (request, response) => {
    // const body = request.body 
    const currentUser = request.user
    // console.log(request.user)

    // const decodedToken =  jwt.verify(request.token, process.env.SECRET)

    // if (!decodedToken.id) {
    //     return response.status(401).json({ error: 'Token invalid' })
    // }

    const user = await User.findById(currentUser.id)

    let blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    })

    // 4.16
    // const user = await User.findById(request.body.userId)
    // blog.user = user.id
    // const users = await User.find({})
    // blog.user = users[0].id

    blog.user = user.id

    if(!blog.url || !blog.title){
        return response.status(400).end()
    }

    if(!blog.likes){
        blog.likes = 0
    }

    const result = await blog.save()
    
    user.blogs = user.blogs.concat(result._id)

    await user.save()
    
    response.status(201).json(result)
    // blog
    //     .save()
    //     .then(result => {
    //         response.status(201).json(result)
    //     })
})

blogRouter.delete('/:id', async (request, response) => {
    const blogId = request.params.id
    const currentUser = request.user
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)

    // if(!decodedToken.id){
    //     return response.status(401).json({ error: 'Invalid token'})
    // }

    const blog = await Blog.findById(blogId)

    if (blog.user.toString() === currentUser.id) {
        await Blog.findByIdAndDelete(blogId)
        response.status(204).end()
    }

    response.status(401).json({ error: 'Wrong user' })
    // const id = request.params.id

    // await Blog.findByIdAndDelete(id)
    // response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const body = request.body

    const result = await Blog.findByIdAndUpdate(id, body, { new: true })
    response.json(result)
})

module.exports = blogRouter