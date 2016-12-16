const http = require('http')
const fs = require('fs')

function FileSuffix(filename) {
    return filename.substr(filename.lastIndexOf("."));
}

function CleanFileName(filename) {
    if (filename == "/") 
        return "/index.html"
    else
        return filename
}

function ContentType(suffix) {

    var contentType = 'text/plain';
    
    switch (suffix)
    {
        case "ico":
            contentType = 'image/x-icon';
            break;
        case "htm":
        case "html":
            contentType = 'text/html';
            break;
    }
    return contentType;
}

function ReadServerFile(filename, callback) {
    fs.readFile("." + filename, (err, data) => {
        if (err) {
            if (err.errno == -4058) {
                responseCode = 404;
                data = "<body>Page not found.</body>";
                callback(responseCode, data);
            }
            console.log(err);
        }
        else {
            callback(200, data);
        }
    });
}

const server = http.createServer((request, response) => {

    var fileUrl = CleanFileName(request.url);

    ReadServerFile(fileUrl, (responseCode, data) => {
       
        response.writeHead(responseCode, ContentType(FileSuffix(fileUrl)));
        response.end(data);
        console.log("Requested: " + request.url);
    })

})
server.listen(8000)
