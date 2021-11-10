const $canvas = document.querySelector('canvas');
const ctx = $canvas.getContext('2d');
 
 const keys = [];
 
 const player = {
     x: 0,
     y: 300,
     width: 40,
     height: 72,
     frameX: 0,
     frameY: 0,
     speed: 9,
     moving: false
 };
 
 const playerSprite = new Image();
 playerSprite.src = "/img/chewie.png"; 
 const background = new Image();
 background.src = "/img/superficieLuna.png";
 
 function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
     ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
 }
 
 function animate() {
     ctx.clearRect(0, 0, $canvas.width, $canvas.height);
     ctx.drawImage(background, 0, 0, $canvas.width, $canvas.height);
     drawSprite(playerSprite, player.width*player.frameX, player.height*player.frameY,player.width,player.height, player.x, player.y, player.width, player.height)
     movePlayer();     ;
     requestAnimationFrame(animate);
 }
 animate();
 
 window.addEventListener("keydown", function(e) {
     keys[e.keyCode] = true;
 });
 window.addEventListener("keyup", function(e) {
     delete keys[e.keyCode];
 });
 
 function movePlayer() {
     if (keys[38] && player.y > 250 ) {
         player.y -= player.speed;
         player.frameY = 3;
     }
     if (keys[37] && player.x > 0 ) {
        player.x -= player.speed;
        player.frameY = 1;  
    }
    if (keys[39] && player.x > 0 ) {
        player.y += player.speed;
        player.frameY = 0;  
    }
    if (keys[40] && player.x > 0 ) {
        player.x += player.speed;
        player.frameY = 2;  
    }
}  