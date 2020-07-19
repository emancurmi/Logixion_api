require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
//const validateBearerToken = require('./validate-bearer-token')
const errorHandler = require('./error-handler')
const app = express()

const helpRouter = require('./help/help-router')
const usersRouter = require('./users/users-router')
const tutorialsRouter = require('./tutorials/tutorials-router')
const stepsRouter = require('./steps/steps-router')
const GenerateTutorialRouter = require('./generatetutorial/generate-router')

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
    skip: () => NODE_ENV === 'test'
}))

app.use(cors())
//<--- fix here ---> 

app.use(helmet())
//app.use(validateBearerToken)

app.use('/api/help', helpRouter)
app.use('/api/users',usersRouter)
app.use('/api/tutorials',tutorialsRouter)
app.use('/api/steps', stepsRouter)
app.use('/api/generatetutorial', GenerateTutorialRouter)

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.use(errorHandler)

module.exports = app