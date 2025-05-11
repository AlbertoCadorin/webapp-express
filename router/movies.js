const express = require('express')
const router = express.Router()

const moviesController = require('../controller/moviesController')

// idex
router.get('/', moviesController.index)

module.exports = router