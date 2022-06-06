const notesRouter = require('express').Router() // clase que permite crear un Router de forma separada de lo del index

const Note = require('../models/Note')

// Metodo GET de todos las notas
notesRouter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

// Metodo Get de una sola nota
// forma dinamica de recuperar un segmento del path
notesRouter.get('/:id', (request, response, next) => {
  const { id } = request.params
  // const nota = notas.find(nota => nota.id === id)
  Note.findById(id).then(nota => {
    if (nota !== undefined && nota !== null) {
      response.json(nota)
    } else {
      response.status(404).json({
        error: 'No encontrado',
        nota: 'undefined',
        ruta: request.path,
        status: 404
      }).end()
    }
  }).catch(error => {
    // console.log(error)
    // response.status(400).json(error).end()
    next(error)
  })
})

// Metodo DELETE
notesRouter.delete('/:id', (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndDelete(id)
    .then(result => response.status(204).json(result).end())
    .catch(error => next(error))
})

// Metodo UPDATE
notesRouter.put('/:id', (request, response, next) => {
  const { id } = request.params
  const notaAct = request.body
  Note.findByIdAndUpdate(id, notaAct).then(result => {
    response.json(result)
  })
})

// Metodo POST
notesRouter.post('/', (request, response) => {
  const nota = request.body
  // const maxId = Math.max(...notas.map(nota => nota.id))

  if (!nota || (!nota.title && !nota.description)) {
    return response.status(400).json({
      error: 'nota no tiene los datos requerido'
    })
  } else if (!nota.title) {
    return response.status(400).json({
      error: 'nota.title no existe'
    })
  } else if (!nota.description) {
    return response.status(400).json({
      error: 'nota.description no existe'
    })
  }

  const nuevaNota = new Note({
    title: nota.title,
    description: nota.description,
    completed: typeof nota.completed !== 'undefined' ? nota.completed : false,
    date: new Date().toISOString()
  })

  nuevaNota.save().then(notaGuardada => {
    response.status(201).json(notaGuardada).end()
  }).catch(e => response.status(500).send('Ocurrió un error').json(e))
})

module.exports = notesRouter
