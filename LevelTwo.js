const rocks = document.querySelectorAll('.rock');
const scoreTable = document.querySelector('.score');
const funny = document.querySelectorAll('.place');
const counter = document.querySelector('.counter');
const start = document.querySelector('.btn')





let lastPlace; // Este valor es undefined
let timeUp = false;
let time = 30000; // 30 segundos.
let score = 0; // Score inicial
let counterDown; // Contador de segundos

console.log(lastPlace);


//<--------------------------------- ESCOGE UNA ROCA ALEATORIAMENTE --------------------------------->
function pickRock(rocks){ 
    const randomRock = Math.floor(Math.random()* rocks.length); // Devuelve un numero entero entre 0 y 6
    const rock = rocks[randomRock]; // Vuele al arreglo y escoge de nuevo un número aleatorio.
    if(rock === lastPlace) { // No aparece el personaje en el mismo lugar 2 veces
        return pickRock(rocks)
    }
    lastPlace = rock;
    return rock;
}
//<--------------------------------------------- PERSONAJE  ------------------------------------------->
function jump() {
    const time = Math.random() * 1700; // Randome Time para que salten
    const rock = pickRock(rocks); // Se repite la función de arriba.
    rock.classList.add('up');
    setTimeout(function(){
        rock.classList.remove('up');
        if (!timeUp) jump();
    },time)
}
//<--------------------------------------------- COMIENZA EL JUEGO  ------------------------------------------->
function startPlay() {
    counterDown = 30;
    scoreTable.textContent = 0;
    counter.textContent = counterDown;
    timeUp = false;
    score = 0;
    jump();
    setTimeout (function(){
        timeUp = true;
    },time)

    let startCounter = setInterval(() => {
        counterDown = counterDown - 1 ;
        counter.textContent = counterDown;
        if (counterDown < 0){
            counterDown = 0;
            clearInterval(startCounter);
            counter.textContent = 'Tiempo fuera!'
        }
    }, 1000);
}

start.addEventListener('click',event => {
startPlay();
});

//<--------------------------------------------- INTERACCIÓN CON CLICK  ------------------------------------------->
function clickCharacter(){
    score++;
    scoreTable.textContent = score;
}

rocks.forEach(rock =>rock.addEventListener('click',clickCharacter));




