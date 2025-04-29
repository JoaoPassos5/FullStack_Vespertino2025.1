let bodyParser = require("body-parser")
require("colors");
var http = require("http");
var express = require("express");
var path = require("path");



var app = express();
app.use(express.static('./public'))


app.use(bodyParser.urlencoded({extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.set('views', './views');


var server = http.createServer(app);
server.listen(80);

console.log("Servidor rodando ...".rainbow);

// Metódos e actions

app.get("/inicio",function(requisicao, resposta){
    resposta.redirect("index.html")

});

app.post("/inicio", function(requisicao, resposta){
    resposta.redirect("index.html")
});

app.post("/cadastrar",function(requisicao, resposta){
    let nome = requisicao.body.nome;
    let login = requisicao.body.login;
    let senha = requisicao.body.senha;
    let nasc = requisicao.body.nascimento;
    

    console.log(nome, login, senha, nasc);

    resposta.render("resposta", {nome, login, senha, nascimento: nasc});

})

app.get("/for_ejs", function(requisicao, resposta){
    let valor = requisicao.query.valor;
    resposta.render("exemplo_for",{valor});
})

let usuario = {};

app.post("/cadastra", function(requisicao, resposta){
    let nome = requisicao.body.nome;
    let login = requisicao.body.login;
    let senha = requisicao.body.senha;
    let nasc = requisicao.body.nascimento;

    console.log(nome, login , senha, nasc)
    resposta.render('resposta1');
    
    usuario[login] = senha;


})

app.post("/login", function(requisicao, resposta){
    resposta.redirect("login.html")
});

// app.get('/login', (requisicao, resposta) => {
//     resposta.sendFile(__dirname + '/login.html');
// });

app.post('/auto', (requisicao, resposta) => {
    const { login, senha } = requisicao.body;

    
    if (usuario[login] && usuario[login] === senha) {
        resposta.render('resposta3', { mensagem: 'Login efetuado com sucesso!' });
    } else {
        resposta.render('resposta2', { mensagem: 'Login inválido. Tente novamente.' });
    }
});
