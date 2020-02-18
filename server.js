const express = require("express")
const server = express()

server.get('/', function(req, res) {
    return res.send("ok, cheguei aqui")
})

server.listen(3000)

// Aula 2 30:27