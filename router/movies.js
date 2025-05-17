const express = require('express')
const router = express.Router()

const moviesController = require('../controller/moviesController')

// idex
router.get('/', moviesController.index)

// show
router.get('/:id', moviesController.show)

// post
router.post('/:id/reviews', moviesController.storeReview)


module.exports = router