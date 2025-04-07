let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

function desenhar_quadrado(x, y, largura, altura, cor) {
    ctx.fillStyle = cor;
    ctx.fillRect(x, y, largura, altura);
}

function desenhar_arco(x,y,tamanho,a,b,cor,cor2){
    ctx.fillStyle = cor; 
    ctx.strokeStyle = cor2;
    ctx.beginPath();
    ctx.arc(x, y, tamanho, a * Math.PI, b * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function desenhar_linha(x1, y1, x2, y2, cor) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = cor;
    ctx.stroke();
}

function escrever(texto, x, y, cor, tamanho) {
    ctx.fillStyle = cor;
    ctx.font = ctx.font.replace(/\d+px/, `${tamanho}px`); 
    ctx.fillText(texto, x, y);
}

desenhar_quadrado(0,0,50,50,'blue');
desenhar_quadrado(250,0,50,50,'red');

desenhar_quadrado(265,270,35,35,'black');
desenhar_quadrado(265,240,35,35,'black');
desenhar_quadrado(235,270,30,35,'black');

desenhar_quadrado(0,270,30,35,'yellow');
desenhar_quadrado(0,240,35,35,'yellow');
desenhar_quadrado(30,270,35,35,'yellow');

desenhar_quadrado(270,136,30,30,'cyan'); //QUADRADO CIANO DIREITA
desenhar_quadrado(0,122,30,55,'cyan'); //QUADRADO CIANO ESQUERDA

desenhar_linha(0,150,400,150,'green');

desenhar_linha(150,150,150,300,'#323232'); //LINHA CINZA

desenhar_quadrado(110,150,40,40,'red');

desenhar_arco(220,220,14,0,2,'yellow','green');//CIRCULO AMARELO DIREITO
desenhar_arco(70,220,14,0,2,'yellow','green');//CIRCULO AMARELO ESQUERDO

desenhar_arco(150,300,75,1,1.5,'white','green');

desenhar_arco(150,150,60,1,0,'white','green');//ARCO ESQUERDO
desenhar_arco(150,300,60,1.5,0,'white','green');//ARCO DIREITO
desenhar_arco(150,300,40,1,0,'cyan','green');//ARCO CENTRAL

desenhar_linha(300,0,150,150,'red');
desenhar_linha(0,0,150,150,'blue');

desenhar_arco(150,120,14,0,2,'cyan','blue');

escrever("Canvas",115,50,'#323232',20);

let canvas2 = document.getElementById('canvas2');
let ctx2 = canvas2.getContext('2d');

function desenha_quadrado(x, y, largura, altura, cor) {
    ctx2.fillStyle = cor;
    ctx2.fillRect(x, y, largura, altura);
}

function desenha_arco(x,y,tamanho,a,b,cor,cor2){
    ctx2.fillStyle = cor; 
    ctx2.strokeStyle = cor2;
    ctx2.beginPath();
    ctx2.arc(x, y, tamanho, a * Math.PI, b * Math.PI);
    ctx2.fill();
    ctx2.stroke();
}

function desenha_linha(x1, y1, x2, y2, cor) {
    ctx2.beginPath();
    ctx2.moveTo(x1, y1);
    ctx2.lineTo(x2, y2);
    ctx2.strokeStyle = cor;
    ctx2.stroke();
}

var x1 = 110, y1 = 110;  // Vértice superior
var x2 = 160, y2 = 160;  // Vértice inferior esquerdo
var x3 = 205, y3 = 60;  // Vértice inferior direito

desenha_linha(0,200,400,200,'grey');

//FUNDO DO CANVAS
ctx2.fillStyle = 'grey'; 
ctx2.fillRect(0, 200, canvas.width, canvas.height - 200);
ctx2.fillStyle = 'aquamarine'; 
ctx2.fillRect(0, 0, canvas.width, 200);

desenha_arco(0,200,40,1,0,'#4A90E2','#4A90E2');
desenha_quadrado(0,200,40,100,'#4A90E2')
desenha_quadrado(0,260,100,40,'#4A90E2');
desenha_arco(100,300,40,1,0,'#4A90E2','#4A90E2');




//ARVORE DIREITA
desenha_quadrado(250,200,20,60,'saddlebrown');
desenha_arco(260,190,30,0,2,'green','green');

//ARVORE ESQUERDA
desenha_quadrado(40,140,20,60,'saddlebrown');
desenha_arco(50,130,30,0,2,'green','green');

//CASA
desenha_quadrado(110,110,95,90,'saddlebrown');//PAREDE
desenha_quadrado(150,155,17,45,'#4B2E17');//PORTA
desenha_quadrado(165,125,30,30,'#4FC3F7');//ESPELHO DIREITO
desenha_quadrado(120,125,30,30,'#4FC3F7');//ESPELHO ESQUERDO


desenha_arco(250,50,40,0,2,'yellow','yellow');

desenha_linha(x1,y1,x2,y3,'brown');
desenha_linha(x3,x1,x2,y3,'brown');















