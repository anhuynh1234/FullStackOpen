const blogRouter = require('express').Router()
const Blog = require('./../models/blog')
const User = require('./../models/user')

blogRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)

    // Blog
    //     .find({})
    //     .then(blogs => {
    //         response.json(blogs)
    //     })
})
  
blogRouter.post('/', async (request, response) => {
    let blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    })

    // 4.16
    // const user = await User.findById(request.body.userId)
    // blog.user = user.id

    const user = await User.find({})

    blog.user = user[0].id

    if(!blog.url || !blog.title){
        return response.status(400).end()
    }

    if(!blog.likes){
        blog.likes = 0
    }

    const result = await blog.save()
    
    user[0].blogs = user[0].blogs.concat(result._id)

    await user[0].save()
    
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