module.exports = (error, request, response, next) => {
  console.error(error)

  if (error.name === 'CastError') {
    response.status(400).json(error).end()
  } else {
    response.status(500).json(error).end()
  }
}
