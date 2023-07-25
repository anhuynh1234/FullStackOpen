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

module.exports = blogRouter