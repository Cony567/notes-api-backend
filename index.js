// const http = require('http');
const express = require('express')
const cors = require('cors')
// otra forma de escribir la linea 1
// import http from 'http';

// a la funcion createServer se le pasa un parametro llamado callback
// callback = funcion enviada dsd parametros para ser utilizados dentro de una funcion.
// funcion que se ejecuta cuando pasa algo, en este caso cuando le llega una request o peticion
// const app = http.createServer((request, response)=>{
//     response
//         .writeHead(200, {'Content-Type': 'application/json'})
//         .end(JSON.stringify(notas));// Lo recorre y convierte todo en un string
// });

const app = express()
// metodo_use = 'que recibe un callback'
app.use(cors())
app.use(express.json())// midelware = 'una funcion que intercepta la peticion que está pasando por tu api'
app.use((request, response, next) => {
  next()
})

app.get('/', (request, response) => {
  response.send('<h1>Me duele El BRAZO :c/ :)</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notas)
})

// forma dinamica de recuperar un segmento del path
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const nota = notas.find(nota => nota.id === id)
  if (nota !== undefined) {
    response.json(nota)
  } else {
    response.status(404).json({
      error: 'No encontrado',
      nota: 'undefined',
      ruta: request.path,
      status: 404
    }).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const nota = notas.find(nota => nota.id === id)
  if (nota !== undefined) {
    notas = notas.filter(nota => nota.id !== id)
    response.status(204).end()
  } else {
    response.status(404).json({
      error: 'No encontrado',
      nota: 'undefined',
      comentario: 'nota inexistente no se ha borrado',
      ruta: request.path,
      status: 404
    }).end()
  }
})

app.post('/api/notes', (request, response) => {
  const nota = request.body
  const maxId = Math.max(...notas.map(nota => nota.id))

  if (!nota || !nota.content) {
    return response.status(400).json({
      error: 'nota.content se perdió'
    })
  }

  const nuevaNota = {
    id: maxId + 1,
    content: nota.content,
    important: typeof nota.important !== 'undefined' ? nota.important : false,
    date: new Date().toISOString()
  }

  notas = [...notas, nuevaNota]
  response.status(201).json(nuevaNota)
})
app.use((request, response) => {
  response.status(404).json({
    error: 'No encontrado',
    ruta: request.path,
    status: 404
  })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})

let notas = [
  {
    id: 1,
    title: 'encontrar mi Zen',
    description: '2022-03-21T18:39:34.091Z',
    completed: false
  },
  {
    id: 2,
    title: 'Tengo que estudiar para la presentación, recordar centrarme en el código',
    description: '2022-03-21T18:39:34.091Z',
    completed: true
  },
  {
    id: 3,
    title: 'Tocar ukelele',
    description: '2022-03-21T18:39:34.091Z',
    completed: false
  }
]
