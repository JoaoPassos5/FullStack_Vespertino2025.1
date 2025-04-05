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




