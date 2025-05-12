// database
const connection = require('../data/db')

// Index
function index(req, res) {
    //  query movies
    const sql = 'SELECT * FROM movies'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' })
        res.json(results);
    })
}
// Show
function show(req, res) {

    const id = req.params.id
    // query movies for id
    const sql = `SELECT * FROM movies WHERE id = ?`


    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' })

        if (results.length === 0) return res.status(404).json({ error: 'Film non trovato' })


        const movie = results[0]
        // query reviews
        const sql = `SELECT * FROM reviews WHERE movie_id = ?`

        connection.query(sql, [id], (err, results) => {
            if (err) {
                console.log(err)
            }

            movie.reviews = results

            res.json(movie)
        })
    })


}

module.exports = { index, show }