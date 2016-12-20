const http = require('http')
const fs = require('fs')
const express = require('express')
var app = express()

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(8000, function() {
    console.log("listening on 8000")
})
