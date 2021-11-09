

// Traer elementos DOM
const $canvas = document.querySelector("canvas");
const ctx = $canvas.getContext("2d");
const $button = document.querySelector("button");



// Variables Globales
const enemies = 0;
let frames = 0;
const gravity = 0.98;
let intervalId;



//Definir clases Y metodos


class P1{
    constructor() {
        this.x = 600;
        this.y = 400;
        this.width = 80;
        this.height = 80;
        this.image = new Image();
        this.image.src = "/ideas/space-jam-characters-elmer-fudd-person-human-people-sport-transparent-png-1253351.png"
        this.vy = 2;
        this.move = 10;
        this.health = 2;
    }

    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        this.vy += gravity;
        // this.y += this.vy;
        if( this.y > $canvas.height - this.height) this.y = $canvas.height - this.height
        if( this.x > $canvas.width - this.width) this.x = $canvas.width - this.width  
    }

    MoveUp(){
        this.y -= this.move
    }
    MoveDown(){
        this.y += this.move
    }
    MoveLeft(){
        this.x -= this.move
    }
    MoveRight(){
        this.x += this.move
    }

    touching(obj){
        return (
            this.x < obj.x + obj.width &&
            this.x + this.width > obj.x &&
            this.y < obj.y + obj.height &&
            this.y + this.height > obj.y
        
        )
    }

    getHealth() {
        return this.health
    }

    liveLose() {
        this.health--
    }
}

class Hoop {
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = 80;
        this.height = 80;
        this.image = new Image();
        this.image.src = "/ideas/kisspng-backboard-basketball-net-canestro-clip-art-basketball-5ab6963468eaf7.9143829715219154444298.png"
    }

    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Jordan {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.image = new Image();
        this.image.src = "/ideas/kisspng-air-jordan-jumpman-drawing-shoe-sketch-jordan-wallpaper-5b4d92c22b5774.3768227915318104981775.png"
        this.vx = 2.5;
    }
    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
}

class Live {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.image = new Image();
        this.image.src = "/ideas/Ball.png"
    }

    draw(){
        if (p1.health === 2){
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
            ctx.drawImage(this.image,this.x+50,this.y,this.width,this.height)
        } else if (p1.health === 1){
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        }
    }
}



class Background{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = $canvas.width;
        this.height = $canvas.height;
        this.image = new Image();
        this.image.src = "https://depor.com/resizer/jb785QMrerQouriqdmq8o9QXwt8=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/LEQLFVAVTNEUDEHZZXOPNBRPAY.jpg"
        
    
    }

    draw() {
        ctx.drawImage(this.image,0,0,$canvas.width,$canvas.height)
    }

  
}




//Crear instancias

const background = new Background();
const p1 = new P1();
const hoop = new Hoop ();
const jordan1 = new Jordan (60,100);
const jordan2 = new Jordan (600,230);
let shoes = [jordan1,jordan2];
let lives = new Live (500,0);



// Crear flujo del juego Funciones




function startGame() {
    if(intervalId) return
 intervalId = setInterval(() => {
     update()
 }, 1000/60);
}


function touching(){
shoes.forEach((shoe) => {
if(p1.touching(shoe)) {

    if (p1.getHealth() > 0){
        console.log(p1.health);
        p1.liveLose();
        p1.x = 520;
        p1.y = 320;
        
        
    } else {
        drawImage()
        gameOver();
        
    }
} else if (p1.touching(hoop)){
    clearInterval(intervalId);
    levelTwo();
    

}
});
}

function gameOver() {
    
    clearInterval(intervalId);
    
    
}






function update(){
// 1.-Recalcular el estado del programa
frames++;
CheckKeys()
touching()






jordan1.x += jordan1.vx;
if (jordan1.x + jordan1.vx > $canvas.width || jordan1.x + jordan1.vx < 0) {
    jordan1.vx *=-1;
} 
jordan2.x += jordan2.vx;
if (jordan2.x + jordan2.vx > $canvas.width || jordan2.x + jordan2.vx < 0) {
    jordan2.vx *=-1;
} 

   
// 2.- Limpiar Canvas
clearCanvas();
// 3.- Dibujar elementoss
background.draw();
p1.draw();
hoop.draw();
jordan1.draw();
jordan2.draw();
lives.draw();



}


//Funciones de apoyo
function clearCanvas() {
    ctx.clearRect(0,0, $canvas.width, $canvas.height);
}






// Interacción de Usiario

function CheckKeys() {
    document.onkeydown = (event) => {
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
    sound.play();
    sound.volume = 0.3;
    

}) ;





