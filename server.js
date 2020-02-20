//configurando o servidor
const express = require("express")
const server = express()

//configurar o server para apresentar arquivos estaticos
server.use(express.static('public'))


//habilitar body do formulário
server.use(express.urlencoded({ extended: true }))

//Configurar a conexão com o banco de dados
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: '18102010',
    host: 'localhost',
    port: 5432,
    database: 'doe'
})


//configurando a template engine

const nunjunks = require("nunjucks")
nunjunks.configure("./", {
    express: server,
    noCache: true
})


//Lista de doadores: vetor ou array






//configurar a apresentação da página
server.get("/", function(req, res) {


    db.query("SELECT * FROM donors", function(err, result) {
        if (err) return res.send("Erro de banco de dados!")

        const donors = result.rows
        return res.render("index.html", { donors })
    })


})

server.post('/', function(req, res) {
    //pegar dados do formulário
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if (name == "" || email == "" || blood == "") {
        return res.send("Todos os campos são obrigatórios!")
    }

    //colocar valores dentro do banco de dados.
    const query = `
        INSERT INTO donors ("name", "email", "blood") 
        VALUES ($1, $2, $3)`

    const values = [name, email, blood]

    db.query(query, values, function(err) {
            //fluxo de erro
            if (err) return res.send('Erro no banco de dados.')

            //fluxo ideal
            return res.redirect("/")

        })
        // donors.push({
        //     name: name,
        //     blood: blood,
        // })


})


// ligar o servidor e permitir o acesso na porte 3000
server.listen(3000, function() {
    console.log('Iniciado o servidor...')
})