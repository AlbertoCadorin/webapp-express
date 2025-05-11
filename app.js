const express = require('express')
const app = express()
const port = 3000

const moviesRouter = require('./router/movies')

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Ciao')
})

app.use('/movies', moviesRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})