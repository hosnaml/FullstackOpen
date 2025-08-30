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
        return (blogs[0].likes)
    }
    
    return blogs.reduce((mostLiked, current) => {
        return current.likes > mostLiked.likes ? current : mostLiked
    })
}
module.exports = {dummy, totalLikes, mostLikes}