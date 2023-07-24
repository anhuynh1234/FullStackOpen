const list_helper = require('./../utils/list_helper')

// test('dummy returns 1', () => {
//     expect(list_helper.dummy([])).toBe(1)
// })

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

describe('Total likes', () => {
    test.skip('Only one blog returns its own number of likes', () => {
        let blog = []
        blog.push(blogs[0])
        expect(list_helper.totalLikes(blog)).toBe(Number(blog[0].likes))
    })
    test.skip('Empty list is zero', () => {
        expect(list_helper.totalLikes([])).toBe(0)
    })
    test.skip('List of many blogs returns total amount', () => {
        let total = 0
        blogs.map(blog => {
            total += Number(blog.likes)
        })
        expect(list_helper.totalLikes(blogs)).toBe(total)
    })
})

describe('Blogs with most likes', () => {
  let mostLikes = 0, blogsTotal = []

  blogs.map(blog => {
    if(Number(blog.likes) > mostLikes){
      mostLikes = Number(blog.likes)
    }
  })

  blogs.map(blog => {
    if(Number(blog.likes) == mostLikes){
      blogsTotal.push(blog)
    }
  })

  test.skip('Returns blog with the most likes', () => {
    expect(blogsTotal).toContain(list_helper.mostLiked(blogs))
  })
})

describe('Author with the most blogs', () => {
  test.skip('Returns author with the most blogs', () => {
    expect(list_helper.authormostBlogs(blogs)).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('Author with the most likes', () => {
  test('Returns author with the most likes', () => {
    expect(list_helper.authorMostLikes(blogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})