let numero = Math.floor(Math.random()*100);

const resultElement = document.getElementById("resp");

function guess(){
    let num1 = parseInt(document.getElementById('num0').value);
    if (num1 == numero){
                document.getElementById('resp').innerHTML = "Parabéns, você acertou o número!"
                resultElement.style.color = "green";
    } else if(num1 > numero){
                document.getElementById('resp').innerHTML = "Muito alto! Tente novamente."
                resultElement.style.color = "red";
    } else if(num1 < numero){
                document.getElementById('resp').innerHTML = "Muito baixo! Tente novamente."
                resultElement.style.color = "red";
    }
    
    }

    


    
    
    
