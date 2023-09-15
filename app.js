const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

require('dotenv/config')
const apiUrl = process.env.API_URL

app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.options('*', cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))

const facultyRouter = require('./routes/faculty-route')
app.use(`${apiUrl}/faculty`, facultyRouter)

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME
}).then(() => {
        console.log('Database connected...')
    })
    .catch((err) => {
        console.log('Database is not connected...')
        console.log(err)
    })

const PORT = 8080
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})