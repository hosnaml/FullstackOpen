require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres' })
const express = require('express')
const app = express()

app.use(express.json())

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog',
  tableName: 'blogs'
})

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

const start = async () => {
  try {
    await sequelize.authenticate()
    const PORT = process.env.PORT || 3001
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    process.exit(1)
  }
}

start()