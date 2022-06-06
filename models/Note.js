const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  // Cuando se cree una nota va a seguir este esquema
  title: String,
  description: String,
  date: Date,
  completed: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

// formato que tiene que tomar el .toJSON
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v // delete no siempre es una buena practica
    // pero en este caso no es tan importante porque no se está mutando a un objeto tan complejo
  }
})

// Modelo = el modelo permite buscar y guardar datos)
const Note = model('Note', noteSchema)

module.exports = Note

// const note = new Note({
//   title: 'agradecer al señor por mongoDB',
//   date: new Date(),
//   completed: true
// })

// note.save()
//   .then(result => {
//     console.log(result)
//     mongoose.connection.close()
//   })
//   .catch(err => {
//     console.log(err)
//   })
