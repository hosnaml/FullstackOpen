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
const mostLikes = (blogs) => {
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

module.exports = {dummy, totalLikes, mostLikes, mostBlogs}