const express = require('express')
const app = express()
const port = process.env.PORT
const cors = require('cors')
// middlewares error
const notFound = require('./middlewares/notFound')
const handleError = require('./middlewares/handleError')

// router
const moviesRouter = require('./router/movies')

// cors
app.use(cors({
    origin: process.env.FE_APP
}))

// middlewares public
app.use(express.static('public'))

// parsing del body
app.use(express.json())

// welcome page
app.get('/', (req, res) => {
    res.send('Ciao')
})
// movies
app.use('/api/movies', moviesRouter)
// not found
app.use(notFound)
// error handler
app.use(handleError)



// server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})