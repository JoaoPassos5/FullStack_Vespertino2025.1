class Tun {
    constructor(src, x, y, largura, altura) {
        this.img = new Image(); 
        this.img.src = 'tun.jpg'; 
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
    }
    desenha(contexto) {
        contexto.clearRect(0,0,300,300)
        contexto.beginPath();
        contexto.drawImage(this.img, this.x, this.y, this.largura, this.altura); 
        contexto.closePath();
    }
}

let canvas = document.getElementById('canvas10');
let ctx10 = canvas10.getContext('2d');

let sahur = new Tun('tun.jpg', 0, 0, 50, 50); 




document.addEventListener('mousemove',function(evento){
    let rect = canvas.getBoundingClientRect(); 
    let mouseX = evento.clientX - rect.left; 
    let mouseY = evento.clientY - rect.top;  
        
    
   //CENTRALIZAR
    sahur.x = mouseX - sahur.largura / 2; 
    sahur.y = mouseY - sahur.altura / 2;

     sahur.x = Math.max(0, Math.min(sahur.x, canvas.width - sahur.largura));
     sahur.y = Math.max(0, Math.min(sahur.y, canvas.height - sahur.altura));

    
    sahur.desenha(ctx10);
});

