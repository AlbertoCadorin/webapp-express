function notFound(res, _) {
    res.status(404)
    res.json({
        errorStatus: 404,
        errorMessage: 'Not Found'
    });
}

module.exports = notFound;