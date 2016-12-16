const http = require('http')
const fs = require('fs')
const server = http.createServer((request, response) => {
    fs.readFile("." + request.url, (err, data) => {
        if (err) {
            if (err.errno == -4058) {
                response.writeHead(404, {'Content-Type':'text/html'});
                response.end("<body>Page not found.</body>");
            }
            console.log(err);
        }

        var suffix = request.url.substr(request.url.length - 4);

        var contentType = 'text/html';
        switch (suffix){
            case ".ico":
                contentType = 'image/x-icon';
                break;
        }
        console.log("Requested: " + request.url);
        response.writeHead(200, {'Content-Type': contentType});
        response.end(data);
    })   
})
server.listen(8000)
