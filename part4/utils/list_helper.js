const dummy = () => {
    return 1
}
  
const totalLikes = (blogs) => {
    if (blogs.length == 1){
        return (blogs[0].likes)
    }
    if (blogs.length == 0){
        return (0)
    }
    return blogs.reduce((total, blog) => total + blog.likes, 0)
}
const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    if (blogs.length === 1) {
        return blogs[0]
    }
    
    return blogs.reduce((mostLiked, current) => {
        return current.likes > mostLiked.likes ? current : mostLiked
    })
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    // Count blogs per author
    const authorCounts = blogs.reduce((counts, blog) => {
        counts[blog.author] = (counts[blog.author] || 0) + 1
        return counts
    }, {})

    // Find the author with the most blogs
    const topAuthor = Object.keys(authorCounts).reduce((mostProductive, author) => {
        return authorCounts[author] > authorCounts[mostProductive] 
            ? author 
            : mostProductive
    })

    return {
        author: topAuthor,
        blogs: authorCounts[topAuthor]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    // Sum likes per author
    const authorLikes = blogs.reduce((likes, blog) => {
        likes[blog.author] = (likes[blog.author] || 0) + blog.likes
        return likes
    }, {})

    // Find the author with the most total likes
    const topAuthor = Object.keys(authorLikes).reduce((mostLiked, author) => {
        return authorLikes[author] > authorLikes[mostLiked] 
            ? author 
            : mostLiked
    })

    return {
        author: topAuthor,
        likes: authorLikes[topAuthor]
    }
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}