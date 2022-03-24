let controller,draw;
let gameCanvas = document.getElementById('gameCanvas');
let gameContext = gameCanvas.getContext('2d');
let gameWidth = gameCanvas.width;
let gameHeight = gameCanvas.height;
let objects = [];
let hover = false;

Math.random();

let pongLeftPlayer = {
    x:gameWidth/6 - 5,
    y:gameHeight/2 - 50,
    dy:0,
    size:10,
}

let pongRightPlayer = {
    x:gameWidth*5/6 - 5,
    y:gameHeight/2 - 50,
    dy:0,
    size:10,
}

let pongBall = {
    x:gameWidth/2 - 5,
    y:gameHeight/2 - 5,
    dy:Math.random() * (3 - 2) + 2,
    dx:1 * (Math.round(Math.random()) ? 1 : -1),
    size:10,
}

function collision(projectile,object,projectileSizeMultiplier){
    if (projectile.x + projectile.size < object.x ||
            object.x + object.size < projectile.x ||
            projectile.y > object.y + object.size ||
            object.y > projectile.y + projectile.size*projectileSizeMultiplier){
        return true;
            } else{
                return false;
            }
}
controller = {
    left:false,
    right:false,
    keyListener:function(event){
        let key_state = (event.type == 'keydown')?true:false;

        switch(event.keyCode){
            case 38:
                controller.up = key_state;
            break;
            case 40:
                controller.down = key_state;
            break;
            case 87:
                controller.secondaryUp = key_state;
            break;
            case 83:
                controller.secondaryDown = key_state;
            break;
        }
    }
}


draw = function(){
    if (controller.secondaryUp){
        pongLeftPlayer.dy -= 2.3;
    }
    if (controller.secondaryDown){
        pongLeftPlayer.dy += 2.3;
    }
    if (controller.up){
        pongRightPlayer.dy -= 2.3;
    }
    if (controller.down){
        pongRightPlayer.dy += 2.3;
    }
    pongLeftPlayer.y += pongLeftPlayer.dy;
    pongLeftPlayer.dy *= .8;
    pongRightPlayer.y += pongRightPlayer.dy;
    pongRightPlayer.dy *= .8;
    pongBall.y += pongBall.dy;
    pongBall.x += pongBall.dx;
    if (pongLeftPlayer.y + pongLeftPlayer.size*10 > gameHeight){
        pongLeftPlayer.y = gameHeight - pongLeftPlayer.size*10;
        pongLeftPlayer.dy *= -.2;
    }
    if (pongLeftPlayer.y < 0){
        pongLeftPlayer.y = 0;
        pongLeftPlayer.dy *= -.2;
    }
    if (pongRightPlayer.y + pongRightPlayer.size*10 > gameHeight){
        pongRightPlayer.y = gameHeight - pongRightPlayer.size*10;
        pongRightPlayer.dy *= -.2;
    }
    if (pongRightPlayer.y < 0){
        pongRightPlayer.y = 0;
        pongRightPlayer.dy *= -1;
    }
    if (pongBall.y + pongBall.size > gameHeight){
        pongBall.y = pongBall.y - pongBall.size;
        pongBall.dy *= -1;
    }
    if (pongBall.y < 0){
        pongBall.y = 0;
        pongBall.dy *= -1;
    }
    if (pongBall.x < 50){
        pongBall.x = gameWidth/2 - 5;
        pongBall.y = gameHeight/2 - 5;
        pongBall.dy = Math.random() * (3 - 2) + 2;
        pongBall.dx = 1;
    }
    if (pongBall.x > gameWidth - 50){
        pongBall.x = gameWidth/2 - 5;
        pongBall.y = gameHeight/2 - 5;
        pongBall.dy = Math.random() * (3 - 2) + 2;
        pongBall.dx = -1;
    }
    if (collision(pongLeftPlayer,pongBall,10)){
    } else{
        pongBall.x = pongLeftPlayer.x + pongLeftPlayer.size + 1;
        pongBall.dx *= -1.1;
    }
    if (collision(pongRightPlayer,pongBall,10)){
    } else{
        pongBall.x = pongRightPlayer.x - pongBall.size - 1;
        pongBall.dx *= -1.1;
    }
    gameContext.clearRect(0, 0, gameWidth, gameHeight);
    gameContext.fillStyle ='yellow';
    gameContext.fillRect(pongLeftPlayer.x, pongLeftPlayer.y, pongLeftPlayer.size, pongLeftPlayer.size*10);
    gameContext.fillRect(pongRightPlayer.x, pongRightPlayer.y, pongRightPlayer.size, pongRightPlayer.size*10);
    gameContext.fillRect(pongBall.x, pongBall.y, pongBall.size, pongBall.size);
    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);
window.addEventListener('keydown',controller.keyListener);
window.addEventListener('keyup',controller.keyListener);
