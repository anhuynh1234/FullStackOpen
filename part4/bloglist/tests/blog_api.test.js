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
test.skip('Checking blogs are defined with IDs', async () => {
    const blogs = await api.get('/api/blogs')
    expect(blogs.body[0].id).toBeDefined()
})

// 4.10
test.skip('Adding another blog into database', async () => {
    const oldBlogs = await api.get('/api/blogs')

    const newBlog = {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10
      }
    
    await api   
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const newBlogs = await api.get('/api/blogs')
    const titles = newBlogs.body.map(newBlog => newBlog.title)

    expect(newBlogs.body).toHaveLength(Number(oldBlogs.body.length) + 1)
    expect(titles).toContain(newBlog.title)
})

// 4.11
test('Undefined likes will default to 0', async () => {
    const newBlog = {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      }
    
    await api   
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-type', /application\/json/)

    const newBlogs = await api.get('/api/blogs')

    expect(newBlogs.body[newBlogs.body.length - 1].likes).toBeDefined()
})

afterAll(async () => {
    await mongoose.connection.close()
})