// database
const connection = require('../data/db')


// Index
function index(req, res) {

    const { search } = req.query

    //  query movies
    let sql = `
    SELECT
        movies.*, ROUND(AVG(reviews.vote), 2) AS media_recensioni
    FROM 
        movies
    LEFT JOIN
        reviews ON movies.id = reviews.movie_id
    `
    if (search) {
        sql += `WHERE title LIKE "%${search}%" OR director LIKE  "%${search}%" OR abstract LIKE  "%${search}%" `
    }
    sql += ` GROUP BY movies.id`

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({
            error: 'Database query failed'
        })

        res.json(results.map(result => ({
            ...result,
            imagePath: process.env.PUBLIC_PATH + 'movies/' + result.image,
        })))

    })
}
// Show
function show(req, res,) {

    const { id } = req.params
    // query movies for id
    const sql = `SELECT * FROM movies WHERE id = ?`


    connection.query(sql, [id], (err, results) => {

        if (err) return res.status(500).json({
            error: 'Database query failed'
        })

        if (results.length === 0) return res.status(404).json({
            error: 'Film non trovato'
        })


        const movie = results[0]

        // query reviews
        const sql = `SELECT * FROM  movies_db.reviews WHERE movie_id = ?`

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