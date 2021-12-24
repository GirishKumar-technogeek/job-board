const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/JobsDb'

const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('Database connected...')
})

app.use(express.json())

const recRouter = require('./routes/recruiterRoutes')
app.use('/recruiters',recRouter)

const jsRouter = require('./routes/jobseekerRoutes')
app.use('/jobseekers',jsRouter)

app.listen(9000, () => {
    console.log('Server started')
})