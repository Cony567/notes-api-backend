const bcrypt = require('bcrypt')
const usersRouter = require('express').Router() // clase que permite crear un Router de forma separada de lo del index

const User = require('../models/User')

usersRouter.get('/', (request, response) => {
  User.find({}).then(result => response.json(result))
    .catch(e => response.json(e))
//   console.log('helow world')
})

usersRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, name, password } = body
  const passwordHash = await bcrypt.hash(password, 10) // saltRounds
  const user = new User({
    username,
    name,
    passwordHash
  })

  const saveUser = await user.save()
  response.json(saveUser)
})

module.exports = usersRouter
