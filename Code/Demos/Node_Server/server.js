var http = require('http')
var fs = require('fs')

var port = process.env.PORT || 8080
var server = http.createServer(function(request, response) {
    // try {
    //     var string = fs.readFileSync('.' + request.url)
    //     response.end(string)
    // } catch (e) {
    //     response.end('找不到文件')
    // }

    switch (request.url) {
        case '/index.html': //后缀名毫无意义 最终格式由Content-Type决定
            var string = fs.readFileSync('./index.html') //文件后缀名也是毫无意义的，只要能读取到这个文件就好了，没有后缀也是可以的
            response.setHeader('Content-Type', 'text/html') //决定了资源发送到前端时的文件格式
            response.end(string)
            break;
        case '/style.css':
            var string = fs.readFileSync('./style.css')
            response.setHeader('Content-Type', 'text/css')
            response.end(string)
            break;
        case '/index.js':
            var string = fs.readFileSync('./index.js')
            response.setHeader('Content-Type', 'application/javascript')
            response.end(string)
            break;
        default:
            response.end('404')
            break;
    }
})

server.listen(port)
console.log('监听 ' + port + ' 成功，请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)