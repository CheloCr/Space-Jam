

// Traer elementos DOM
const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");
const $button = document.querySelector("button");



// Variables Globales
let frames = 0;
const gravity = 0.98;
let intervalId;
let lose = false; 



//Definir clases Y metodos


class P1{   // <------------------------------ CARACTERÍSTICAS DEL PERSONAJE ------------------------------------------->
    constructor() {
        this.x = 600; // posición en X
        this.y = 400; // posición en Y
        this.width = 80; // Tamaño en ancho
        this.height = 80; // Tamaño en alto
        this.image = new Image(); // Instancia para crear una nueva imagen.
        this.image.src = "/ideas/space-jam-characters-elmer-fudd-person-human-people-sport-transparent-png-1253351.png" // Source de la imagen.
        this.move = 18; // Largo de movimiento
        this.health = 2; // Vidas de jugador
    }

    draw(){ // <------------------------------ METODO PARA PINTAR PERSONAJE ------------------------------------------->

        ctx.drawImage(this.image,this.x,this.y,this.width,this.height) // Dibujar imagen en el Context del Canvas conlas característias de arriba
        if(this.y > $canvas.height - this.height) this.y = $canvas.height - this.height // Si 400 > (400-80) => this.y = 320
        if (this.y < 0 ) this.y = 0; // Si 400 < 0  => this.y = 0
        if( this.x > $canvas.width - this.width) this.x = $canvas.width - this.width // Si 600 > (600-80) => this.x = 520
        if (this.x < 0 ) this.x = 0; // Si 600 < 0  => this.y = 0
    }

    MoveUp(){ // <Mueve cuando presionas ArrowUp disminuye el eje Y respecto this.move>
        this.y -= this.move
    }
    MoveDown(){ // <Mueve cuando presionas ArrowDown disminuye el eje Y respecto this.move>
        this.y += this.move
    }
    MoveLeft(){ // <Mueve cuando presionas ArrowLeft disminuye el eje X respecto this.move>
        this.x -= this.move
    }
    MoveRight(){  // <Mueve cuando presionas ArrowDown disminuye el eje X respecto this.move>
        this.x += this.move
    }

    touching(obj){  //  <------------------------------ METODO PARA SABER SI ESTÁ TOCANDO AL JORDAN ------------------------------------------->
        return (
            this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y
        
        )
    }

    getHealth() { // <------------------------------ METODO PARA SABER LA VIDA ------------------------------------------->
        return this.health // Devuelve health = 2
    }

    liveLose() { // <------------------------------ METODO QUITAR LA VIDA ------------------------------------------->
        this.health-- // Restale 1 a Healt
    }
}

class Hoop {    // <------------------------------ CLASE PARA EL ARO DE BASKET ------------------------------------------->
    constructor(){
        this.x = 0; // Posición en X
        this.y = 0; // Posición en Y
        this.width = 80; // Ancho del Aro
        this.height = 80; // Alto del Aro
        this.image = new Image(); // Instancia para crear una nueva imagen.
        this.image.src = "/ideas/kisspng-backboard-basketball-net-canestro-clip-art-basketball-5ab6963468eaf7.9143829715219154444298.png" // Source de la imagen.
    }

    draw(){  // <------------------------------ METODO PARA PINTAR ARO ------------------------------------------->
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Jordan { // <------------------------------ CLASE PARA TENNIS JORDAN ------------------------------------------->
    constructor(x,y){
        this.x = x; // Posición en X dada por el parametro
        this.y = y; // Posición en Y dada por el parametro
        this.width = 60; // Ancho deL Tennis
        this.height = 60; // Ancho del Tennis
        this.image = new Image(); // Instancia para crear una nueva imagen.
        this.image.src = "/ideas/kisspng-air-jordan-jumpman-drawing-shoe-sketch-jordan-wallpaper-5b4d92c22b5774.3768227915318104981775.png" // Source de la imagen.
        this.vx = 5; // Velocidad en eje X
    }
    draw(){ // <------------------------------ METODO PARA PINTAR ARO ------------------------------------------->
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        
    }
}

class Live { // <------------------------------ CLASE PARA LS VIDAS ------------------------------------------->
    constructor(){
        this.x = 500;
        this.y = 5;
        this.width = 50;
        this.height = 50;
        this.image = new Image();
        this.image.src = "/ideas/Ball.png"
    }

    draw(){  // <------------------------------ METODO PARA PINTAR VIAS ------------------------------------------->
        if (p1.health === 2){ // Si el health de mi jugador es = 2 entonces...
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height) // Dibuja un balón ...
            ctx.drawImage(this.image,this.x+50,this.y,this.width,this.height) // Dibuja un balón más 50px mas a la derecha 
        } else if (p1.health === 1){  // Si el health de mi jugador es = 1 entonces .....
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height) // Dibuja un balón solamente
        }
    }

    LivesText(){
        ctx.font = "30px sans-serif";
        ctx.fillText("Lives : ",410,38);
        ctx.fillStyle = "White"
    }
}



class Background{ // <-------------------------------------------------------- CLASE PARA FONDO -------------------------------------------------------------->
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = $canvas.width;
        this.height = $canvas.height;
        this.image = new Image();
        this.image.src = "https://depor.com/resizer/jb785QMrerQouriqdmq8o9QXwt8=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/LEQLFVAVTNEUDEHZZXOPNBRPAY.jpg"
        this.lose = new Image ();
        this.lose.src = "./ideas/Lose.jpg";
        
    
    }

    draw() { // <-------------------------------------------------------- METODO PARA PINTAR EL FONDO -------------------------------------------------------------->
        if (lose === true ) {
            ctx.drawImage(this.lose,0,0, $canvas.width, $canvas.height);
            // clearInterval(intervalId); // Limpa el intervalo   
        } else {
            ctx.drawImage(this.image,0,0,$canvas.width,$canvas.height);
            
    }
}
}






// <------------------------------------------------- CREACIÓN DE INSTANCIAS (verlas refladas en el canvas) ---------------------------------------------------- >

const background = new Background(); // Colocar Background basado en las posiciones de la class Background
const p1 = new P1(); // Colocar p1 basado en las posiciones de la class P1
const hoop = new Hoop (); // Colocar Hoop basado en las posiciones de la class Hoop
const jordan1 = new Jordan (60,100);  // Colocar Tennis 1 basado en las posiciones de la class Jordan, recibe parametros (x,y)
const jordan2 = new Jordan (600,230); // Colocar Tennis 2 basado en las posiciones de la class Jordan, recibe parametros (x,y)
let shoes = [jordan1,jordan2]; // Se Guardan los Tennis en una variable para poder iterar
let lives = new Live (); //  Coloca Vidas basado en las posiciones de la class Lives



// <----------------------------------------------------- CREACIÓN DE FUNCIONES PARA EL FLUJO DEL JUEGO -------------------------------------------------------- >
function startGame() {
    if(intervalId) return
 intervalId = setInterval(() => {
     update();
 }, 1000/60);
}


function touching(){ // ---------------------------- Función para saber que P1 está tocando un tennis ----------------------------
shoes.forEach((shoe) => { // Iteramos los Tennis para que por cada uno pase lo siguiente:
if(p1.touching(shoe)) { // Si P1 está tocando un tenis realiza lo siguiente :

    if (p1.getHealth() > 0) {  // Si health (2) es mayor a 0....
        p1.liveLose();// invoca el metodo LiveLose el cual le resta 1 a Health
        p1.x = 520; // Devuelve a p1 a este punto en X
        p1.y = 320; // Devuelve a p1 a este punto en Y
        
        
    } else { // Si Healt no es mayor a 0 entonces.....
        gameOver(); // Se acaba el juego
    }
} else if (p1.touching(hoop)){
     
    clearInterval(intervalId);
   
    
}

});

}


function gameOver() { // ---------------- Función una vez que ya se perdió ----------------------------
    lose = true;
}




function update(){ // ---------------------------- Función para refrescar la página  ----------------------------
    
// 1.-Recalcular el estado del programa
frames++;
CheckKeys()
touching()



jordan1.x += jordan1.vx; // 60 = 60 + 5
if (jordan1.x + jordan1.vx > 595 || jordan1.x + jordan1.vx < 0) { 
    jordan1.vx *=-1; // 5 = 5*-1
} 
jordan2.x += jordan2.vx; // 600  = 605
if (jordan2.x + jordan2.vx > $canvas.width  || jordan2.x + jordan2.vx < 0) {
    jordan2.vx *=-1;
} 

   
// 2.- Limpiar Canvas
clearCanvas();
// 3.- Dibujar elementos
background.draw();
p1.draw();
hoop.draw();
jordan1.draw();
jordan2.draw();
lives.draw();
lives.LivesText();

if (lose === true) {
    background.draw(); 
}

}


//Funciones de apoyo
function clearCanvas() {
    ctx.clearRect(0,0, $canvas.width, $canvas.height);
}




// Interacción de Usiario

function CheckKeys() {    // <------------------------------ CONTROL DE TECLAS ------------------------------------------->
    document.onkeydown = (event) => { // ----- Cambiado el evento, pasa los siguiente: 
        switch (event.key) {
            case 'ArrowUp':
                p1.MoveUp()
            break;
            case 'ArrowDown':
                p1.MoveDown()
            break;
            case 'ArrowLeft':
                p1.MoveLeft()
            break;
            case 'ArrowRight':
                p1.MoveRight()
            break;
        
            default:
                break;
        }
    }
}


// Inicializar el juego.
$button.addEventListener ("click",event => {
    startGame();
    const sound = new Audio();
    sound.src = "/ideas/Space Jam Theme Song.mp3";
    // sound.play();
    sound.volume = 0.2;

}) ;




