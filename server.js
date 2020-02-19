//configurando o servidor
const express = require("express")
const server = express()

//configurar o server para apresentar arquivos estaticos
server.use(express.static('public'))


//habilitar body do formulário
server.use(express.urlencoded({ extended: true }))

//configurando a template engine

const nunjunks = require("nunjucks")
nunjunks.configure("./", {
    express: server,
    noCache: true
})


//Lista de doadores: vetor ou array
const donors = [
    {
        name: "Diego Fernandes",
        blood: "AB+"
    },
    {
        name: "Lucas Araújo",
        blood: "O+"
    },
    {
        name: "Aiz Lima",
        blood: "A+"
    },
    {
        name: "Ully Lima",
        blood: "A-"
    }
]





//configurar a apresentação da página
server.get("/", function(req, res) {
    return res.render("index.html", {donors})
})

server.post('/', function(req, res){
    //pegar dados do formulário
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    //colcar valores dentro do array
    donors.push({
        name: name,
        blood: blood,
    })

    return res.redirect("/")
})


// ligar o servidor e permitir o acesso na porte 3000
server.listen(3000, function(){
    console.log('Iniciado o servidor...')
})

//iniciando banco de dados
// tempo parado de aula 1:09
