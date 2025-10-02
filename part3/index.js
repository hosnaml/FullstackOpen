const express = require('express')
const path = require('path')

const app = express()
app.use(express.json())

const morgan = require('morgan')
app.use(morgan('tiny'))

const cors = require('cors')
app.use(cors())

app.use(express.static(path.join(__dirname, 'dist')))

require('dotenv').config()
const PORT = process.env.PORT || 3001

const Person = require('./models/person')


morgan.token('body', (req) => JSON.stringify(req.body))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body', {
    skip: (req) => req.method !== 'POST'
  })
)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
    .catch((error) => next(error))
})

app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
      response.send(`<p>Phonebook has info for ${count} people</p>
        <p>${new Date().toString()}</p>`)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id).then(person => {
    if(person){
      response.json(person)
    }else{
      response.status(404).end()
    }
  })
    .catch((error) => next(error))
})



app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        response.status(204).end()
      } else {
        response.status(404).send({ error: 'person not found' })
      }
    })
    .catch((error) => {
      next(error)
    })
})

app.post('/api/persons', (request, response, next) => {
  if (!request.body.name || !request.body.number) {
    return response.status(400).json({ error: 'name or number not valid' })
  }

  const { name, number } = request.body
  const person = new Person({ name, number })
  person.save()
    .then((newPerson) => {
      response.json(newPerson)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body
  const id = request.params.id

  console.log(id)
  console.log(name)
  console.log(number)

  Person.findById(id).then((person) => {
    if(!person){
      return response.status(404).end()
    }
    person.name = name
    person.number = number

    return person.save().then((updatedPerson) => {
      response.json(updatedPerson)
    })
  })
    .catch(error => {
      console.log('Error in PUT route:', error)
      next(error)
    })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

//Error handling
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }
  next(error)
}

app.use(errorHandler)