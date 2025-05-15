let bodyParser = require("body-parser")
require("colors");
var http = require("http");
var express = require("express");
var path = require("path");
var mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const uri = 'mongodb+srv://jovifepassos:RjAeAeDQRkqgvcmR@passosfullstack.r6acicp.mongodb.net/?retryWrites=true&w=majority&appName=PassosFullStack'
// const client = new MongoClient(uri, { useNewUrlParser: true });
const client = new MongoClient(uri);

var dbo = client.db("PassosFullStack");
var usuarios = dbo.collection("usuarios");
var posts12 = dbo.collection("posts12");
var usuarioscarros = dbo.collection("usuarioscarros");
var carros = dbo.collection("carros");



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

// app.post("/login", function(requisicao, resposta){
//     resposta.redirect("login.html")
// });

// app.get('/login', (requisicao, resposta) => {
//     resposta.sendFile(__dirname + '/login.html');
// });

app.use(express.urlencoded({ extended: true }));

app.post("/login2", (requisicao, resposta) => {
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

app.post("/blog1", function(requisicao, resposta){
    let titulo = requisicao.body.titulo;
    let resumo = requisicao.body.resumo;
    let conteudo = requisicao.body.conteudo;
    

    
    // resposta.render('resposta4blog.ejs');

    posts12.insertOne({ titulo: titulo, resumo: resumo, conteudo: conteudo}, function(err) {
        if (err) {
            resposta.send('Erro ao salvar post');
            return;
        }
        // resposta.redirect('/blog');
        resposta.render('resposta4blog.ejs');
    });
});
   

   

app.get('/blog', function(requisicao, resposta) {
    posts12.find().toArray(function(err, posts) {
        if (err) {
            resposta.send('Erro ao buscar posts');
            return;
        }
        resposta.render('blog', { posts: posts });
    });
});


app.get('/post', (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname, 'public', 'blog', 'cadastrar_post.html'));
});


app.post('/blog1', (requisicao, resposta) => {
    const { titulo, resumo, conteudo } = requisicao.body;

    Post.create({ titulo, conteudo: resumo + ' - ' + conteudo}) 
        .then(() => resposta.redirect('/blog'));  
});

app.post('/atualizar_senha', function(requisicao, resposta){
    let login = requisicao.body.login;
    let senha = requisicao.body.senha;
    let novasenha = requisicao.body.novasenha;

    let data = { db_login: login, db_senha: senha}
    let new_data = {$set: {db_senha: novasenha}}

    usuarios.updateOne(data,new_data, function(err, result){
        console.log(result);
        if (result.modifiedCount == 0) {
            resposta.render('resposta_login', {status: "Usuário/senha não encontrado!"})
          }else if (err) {
            resposta.render('resposta_login', {status: "Erro ao atualizar usuário!"})
          }else {
            resposta.render('resposta_login', {status: "Usuário atualizado com sucesso!"})        
          };
    
    })
})

app.post('/remover_usuario', function(requisicao, resposta){
    let login = requisicao.body.login;
    let senha = requisicao.body.senha;

    let data = { db_login: login, db_senha: senha}

    usuarios.deleteOne(data, function(err, result){
        console.log(result);
        if (result.modifiedCount == 0) {
            resposta.render('resposta_login', {status: "Usuário/senha não encontrado!"})
          }else if (err) {
            resposta.render('resposta_login', {status: "Erro ao remover usuário!"})
          }else {
            resposta.render('resposta_login', {status: "Usuário removido com sucesso!"})        
          };
    

    })

})

// --------------------------- CADASTRO---------------------------

app.use(express.static(path.join(__dirname, 'public', 'Carro')));


app.get('/logincarro', function(req, res) {
    res.sendFile(path.join(__dirname, 'public','Carro', 'primeiro.html'));
});


app.post("/cadastrocarro", function(req, resp) {

    let data = {
        db_nome: req.body.nome,
        db_login: req.body.login,
        db_senha: req.body.senha,
        db_nasc: req.body.nascimento
    };

    // Salva dados no banco
    usuarioscarros.insertOne(data, function (err) {
        if (err) {
            resp.send("Erro ao cadastrar usuário!");
        } else {
            resp.redirect('/primeiro.html?mensagem=Usuário cadastrado com sucesso!');
        }
    });
});

app.get("/back", function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'Carro', 'quarto.html'));
});

app.get("/quarto", function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'Carro', 'quarto.html'));
});

app.post("/logincarro", function(req, res) {
    var login = req.body.login;
    var senha = req.body.senha;

    // Busca o usuário no banco, com o login e a senha fornecidos
    usuarioscarros.findOne({ db_login: login, db_senha: senha }, function(err, usuario) {
        if (err) {
            res.send("Erro ao acessar o banco de dados.");
            return;
        }

        if (usuario) {
            // Se o usuário for encontrado, buscar os carros dele
            carros.find({ db_login: login }).toArray(function(err, carrosEncontrados) {
                if (err) {
                    res.send("Erro ao acessar os carros.");
                    return;
                }

                // Passa os carros encontrados para a página EJS
                res.redirect("/quarto");
            });
        } else {
            // Caso o login ou senha estejam errados
            res.redirect("/logincarro");  // Redireciona de volta para o login
        }
    });
});


app.get('/carrocadastro', (requisicao, resposta) => {
    resposta.sendFile(path.join(__dirname, 'public', 'Carro', 'terceiro.html'));
});


app.post("/caro", function(requisicao, resposta) {
    let marca = requisicao.body.marca;        
    let modelo = requisicao.body.modelo;      
    let ano = requisicao.body.ano;           
    let qnt = requisicao.body.qnt;            

    // Salva os dados no banco
    carros.insertOne({ marca: marca, modelo: modelo, ano: ano, qnt: qnt }, function(err) {
        if (err) {
            resposta.send('Erro ao salvar carro');
            return;
        }
        carros.find().toArray(function(err, carrosArray) { 
            if (err) {
                resposta.send("Erro ao buscar carros.");
                return;
            }

            // Renderiza a página carros.ejs com os carros encontrados
            resposta.render('carros', { carros: carrosArray }); 
        });
    });
});

app.get("/listar_carros", function(req, resp) {
    carros.find().toArray(function(err, itens) {
        if (err) {
            resp.send("Erro ao buscar carros.");
            return;
        }
        resp.render("carros.ejs", { carros: itens });
    });
});