module.exports = (request, response) => {
  response.status(404).json({
    error: 'Bad request',
    message: 'Ruta no encontrada',
    ruta: request.path,
    status: 404
  })
}
