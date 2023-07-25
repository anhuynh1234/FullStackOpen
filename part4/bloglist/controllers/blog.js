const blogRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('./../models/blog')

blogRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({})
    response.json(blogs)

    // Blog
    //     .find({})
    //     .then(blogs => {
    //         response.json(blogs)
    //     })
})
  
blogRouter.post('/', async (request, response) => {
    let blog = new Blog(request.body)

    if(!blog.url || !blog.title){
        return response.status(400).end()
    }

    if(!blog.likes){
        blog.likes = 0
    }

    const result = await blog.save()
    response.status(201).json(result)

    // blog
    //     .save()
    //     .then(result => {
    //         response.status(201).json(result)
    //     })
})

blogRouter.delete('/:id', async (request, response) => {
    const id = request.params.id

    await Blog.findByIdAndDelete(id)

    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const body = request.body

    const result = await Blog.findByIdAndUpdate(id, body, { new: true })
    response.json(result)
})

module.exports = blogRouter