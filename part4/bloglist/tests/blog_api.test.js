const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('./../app')

const api = supertest(app)

// 4.8
test.skip('Sending HTTP GET request returns database content', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-type', /application\/json/)
})

test.skip('Fetching blogs from data base completely', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body).toHaveLength(3)
})

// 4.9
test('Checking blogs are defined with IDs', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body[0].id).toBeDefined()
})

afterAll(async () => {
    await mongoose.connection.close()
})