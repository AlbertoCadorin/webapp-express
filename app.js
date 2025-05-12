const express = require('express')
const app = express()
const port = process.env.PORT
// router
const moviesRouter = require('./router/movies')
// parsing del body
app.use(express.json())
// welcome page
app.get('/', (req, res) => {
    res.send('Ciao')
})
// movies
app.use('/movies', moviesRouter)
// server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})