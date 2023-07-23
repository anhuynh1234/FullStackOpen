const app = require('./app')
const {PORT, MONGO_URI} = require('./utils/config')
const logger = require('./utils/logger')


app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})