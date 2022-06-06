// const http = require('http');
require('dotenv').config()
require('./mongo') // primero tiene que importar la conexion y luego el modelo
const express = require('express')
const cors = require('cors')

const notFound = require('./middleware/notFound')
const handleErrors = require('./middleware/handleErrors')
const usersRouter = require('./controllers/users')
const notesRouter = require('./controllers/notes')
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

// Inicio
app.get('/', (request, response) => {
  console.log(request.ip)
  console.log(request.ips)
  console.log(request.originalUrl)
  response.send(`
  <h1>Api de notas</h1>
  <div>
    <ul>
      <h3>
      <li> Get all notes --> /api/notes </li>
      <li> Get for id    --> /api/notes/:id </li>
      <li> Delete for id --> /api/notes/:id </li>
      <li> Post note     --> /api/notes </li>
      </h3>
    </ul>
  </div>
  `)
})

app.use('/api/notes', notesRouter)

// conexion al controllador
app.use('/api/users', usersRouter)

// Midleware = Metodo que se ejecuta cuando ninguna de las rutas coincide con las anteriores
app.use(notFound)

app.use(handleErrors)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})

// const notas = []
module.exports = app
