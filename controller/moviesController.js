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
    const sql = `
    SELECT
        movies.*, ROUND(AVG(reviews.vote), 2) AS media_recensioni
    FROM 
        movies
    LEFT JOIN
        reviews ON movies.id = reviews.movie_id
    WHERE movies.id = ?
    `


    connection.query(sql, [id], (err, results) => {

        if (err) return res.status(500).json({
            error: 'Database query failed'
        })

        if (results.length === 0) return res.status(404).json({
            error: 'Film non trovato'
        })


        const currentResult = results[0]

        const movie = {
            ...currentResult,
            imagePath: process.env.PUBLIC_PATH + 'movies/' + currentResult.image,
        }

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


// Store review
function storeReview(req, res) {
    // id del film
    const { id } = req.params
    console.log(req.body)
    // corpo della richiesta
    const { name, vote, text } = req.body

    const sql = `
    INSERT INTO reviews (movie_id, name, vote, text)
    VALUES (?, ?, ?, ?)
    `

    connection.query(sql, [id, name, vote, text], (err, results) => {
        if (err) return res.status(500).json({
            error: err.sqlMessage
        })

        res.status(201)
        res.json({
            id,
            name,
            vote,
            text
        })
    })
}




module.exports = { index, show, storeReview }