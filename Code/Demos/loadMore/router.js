router.get('/getNews', function(req, res) {

    var page = req.query.page
    var length = req.query.length

    var news = []
    for (var i = 0; i < length; i++) {
        news.push('新闻' + parseInt(i + 1 + (page - 1) * length))
    }
    setTimeout(function() {
        res.send({
            status: 0,
            data: news
        })
    }, 1000);
})