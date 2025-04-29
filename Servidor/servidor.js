let bodyParser = require("body-parser")
require("colors");
var http = require("http");
var express = require("express");
var path = require("path");
var mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const uri = 'mongodb+srv://jovifepassos:RjAeAeDQRkqgvcmR@passosfullstack.r6acicp.mongodb.net/?retryWrites=true&w=majority&appName=PassosFullStack'
const client = new MongoClient(uri, { useNewUrlParser: true });

var dbo = client.db("PassosFullStack");
var usuarios = dbo.collection("usuarios");



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

app.get('/',(requisicao,resposta) =>{
    resposta.redirect("projects.html")

})

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

    var data = { db_nome: nome, db_login: login, db_senha: senha , db_nasc: nasc };

    usuarios.insertOne(data, function (err) {
        console.log(err)
        if (err) {
          resposta.render("resposta", {status: "Erro", nome, login, senha, nasc})
        }else {
          resposta.render("resposta", {status: "Sucesso", nome, login, senha, nasc})        
        };
      });

      

    });
  

    



app.get("/for_ejs", function(requisicao, resposta){
    let valor = requisicao.query.valor;
    resposta.render("exemplo_for",{valor});
})

app.post('/logar', function(requisicao, resposta){
    let login = requisicao.body.login;
    let senha = requisicao.body.senha;
    console.log(login, senha);

    var data = {db_login: login, db_senha: senha}

    usuarios.find(data).toArray(function(err , item){
        console.log(item)
        if(item.length == 0){
            resposta.render("resposta_login", {status: "usuario/senha não encontrado"})
                       
        }else if(err){
            resposta.render("resposta_login", {status: "erro ao logar"})

        }else{
            resposta.render("resposta_login", {status: "usuario "+login+" logado" })

        }
    })

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

app.post("/auto", function(requisicao, resposta){
    resposta.redirect("login.html")
});

// app.get('/login', (requisicao, resposta) => {
//     resposta.sendFile(__dirname + '/login.html');
// });

app.post('/login', (requisicao, resposta) => {
    const { login, senha } = requisicao.body;

    
    if (usuario[login] && usuario[login] === senha) {
        resposta.render('resposta3', { mensagem: 'Login efetuado com sucesso!' });
    } else {
        resposta.render('resposta2', { mensagem: 'Login ou senha incorreta, tente novamente...' });
    }
});

app.get('/cadastra',(requisicao, resposta)=> {
    resposta.sendFile(path.join(__dirname, 'public', 'Cadastro.html'));
});

app.get('/login',(requisicao, resposta)=> {
    resposta.sendFile(path.join(__dirname, 'public', 'login.html'));
});
