
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let total = 0
    blogs.map(blog => {
        total += Number(blog.likes)
    })

    return total
}

const mostLiked  = function (blogs) {
    let mostLikes = 0, blogMostLiked = {}

  blogs.map(blog => {
    if(Number(blog.likes) > mostLikes){
      mostLikes = Number(blog.likes)
    }
  })

  blogs.map(blog => {
    if(Number(blog.likes) == mostLikes){
      blogMostLiked = blog
    }
  })
  console.log(blogMostLiked)
    return blogMostLiked
}

const authormostBlogs = function (blogs) {
    let authors = {}, author = {}
    blogs.map(blog => {
        if(authors[blog.author]){
            authors[blog.author]++
        }else{
            authors[blog.author] = 1
        }
    })
    
    const mostBlogs =  Math.max(...Object.values(authors))
    const authorList = (Object.keys(authors))

    authorList.map(authorName => {
        if(authors[authorName] === mostBlogs){
            author.author = authorName
            author.blogs = mostBlogs
        }
    })

    return(author)
}

const authorMostLikes = function (blogs) {
    let authors = {}, author = {}
    blogs.map(blog => {
        if(authors[blog.author]){
            authors[blog.author] += blog.likes
        }else{
            authors[blog.author] = blog.likes
        }
    })
    
    const mostLikes =  Math.max(...Object.values(authors))
    const authorList = (Object.keys(authors))

    authorList.map(authorName => {
        if(authors[authorName] === mostLikes){
            author.author = authorName
            author.likes = mostLikes
        }
    })

    return(author)
}


module.exports = {
    dummy, totalLikes, mostLiked, authormostBlogs, authorMostLikes
}