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

function escrever(texto, x, y, cor, tamanho, fonte) {
    ctx.fillStyle = cor;
    ctx.font = `${tamanho}px ${fonte}`;
    ctx.fillText(texto, x, y);
}

desenhar_quadrado(0,0,50,50,'blue');
desenhar_quadrado(250,0,50,50,'red');

desenhar_quadrado(265,270,35,35,'black');
desenhar_quadrado(265,240,35,35,'black');
desenhar_quadrado(230,270,35,35,'black');

desenhar_quadrado(0,260,40,40,'yellow');
desenhar_quadrado(0,220,40,40,'yellow');
desenhar_quadrado(40,260,40,40,'yellow');

desenhar_linha(0,150,400,150,'green');

desenhar_arco(150,300,40,1,0,'cyan','green')



