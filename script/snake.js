let canvas;
let context;
let width;
let height;
let fruit = {
    x : 250,
    y : 388,
    size : 10
}
let points = 0;

let speed = 10;

let fruitSpeed = 0;

let interval_id;

let ps = [];

let player = {
    x : 250,
    y : 190,
    size : 20
};

let player2 = {
    x : 250,
    y : 588,
    size : 20
};

let moveRight = false;
let moveUp = false;
let moveDown = false;
let moveLeft = false;
let playerOneDirection = ''

let moveRightP2 = false;
let moveUpP2 = false;
let moveDownP2 = false;
let moveLeftP2 = false;
let playerTwoDirection = ''

let fruitMoveRight = false;
let fruitMoveUp = false;
let fruitMoveDown = false;
let fruitMoveLeft = false;

let ballMoving = false;

document.addEventListener('DOMContentLoaded', init, false);








function init() {
    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
    window.addEventListener('keydown',activate,false);
    //window.addEventListener('keyup',deactivate,false);


    interval_id = window.setInterval(draw, speed);
}






function draw() {

    context.clearRect(0, 0, width, height);
    context.fillStyle ='red';
    context.fillRect(player.x, player.y, player.size, player.size);
//     context.fillRect(player.x+player.size, player.y, player.size, player.size);
    context.fillStyle ='Blue';
    context.fillRect(player2.x, player2.y, player2.size, player2.size);
    context.strokeStyle = "white";
    context.lineWidth   = 2;
    context.strokeRect(player.x, player.y, player.size, player.size);
    context.strokeRect(player2.x, player2.y, player2.size, player2.size);
//     context.lineWidth = 100;
//     context.strokeStyle = "rgba(255,255,255,100)";
       context.fillStyle = "white";
    context.fillRect(fruit.x, fruit.y, fruit.size, fruit.size);
    if (player.x >= width - player.size) {
//         stop();
//         window.alert('Game Over. You Scored ' + points + ' points');
//         return;
        player.x = width - player.size;
    }
    else if (player.x < 0) {
//         stop();
//         window.alert('Game Over. You Scored ' + points + ' points');
//         return;
        player.x = 0;
    }
    if (player.y >= height - player.size) {
//         stop();
//         window.alert('Game Over. You Scored ' + points + ' points');
//         return;
        player.y = height - player.size;
    }
    else if (player.y < 0) {
//         stop();
//         window.alert('Game Over. You Scored ' + points + ' points');
//         return;
        player.y = 0;
    }

    for (let p of ps) {
        p.x = p.x + p.xChange;
        p.y = p.y + p.yChange;
        if (p.x <= -p.size) {
            p.x = width;
        }
    }

    if (moveRight) {
        player.x += 3;
    }
    if (moveUp) {
        player.y -= 3;
    }
    if (moveDown) {
        player.y += 3;
    }
    if (moveLeft) {
        player.x -= 3;
    }
    if (moveRightP2) {
        player2.x += 3;
    }
    if (moveUpP2) {
        player2.y -= 3;
    }
    if (moveDownP2) {
        player2.y += 3;
    }
    if (moveLeftP2) {
        player2.x -= 3;
    }
    if (fruitMoveRight) {
        fruit.x += 4;
    }
    if (fruitMoveUp) {
        fruit.y += 4;
    }
    if (fruitMoveDown) {
        fruit.y -= 4;
    }
    if (fruitMoveLeft) {
        fruit.x -= 4;
    }

    
    if (collides(fruit)) {
        context.clearRect(fruit.x, fruit.y, fruit.size+1, fruit.size+1);
        if (player.x > fruit.x && (player.y - fruit.y) != (height - fruit.size) && ballMoving === false) {
            ballMoving = true;
            fruitMoveLeft = true;
        }
        else if (player.x < fruit.x && (player.y - fruit.y) != (height - fruit.size)&& ballMoving === false) {
            ballMoving = true;
            fruitMoveRight = true;
        }
        else if (player.y < fruit.y && (player.x - fruit.x) != (width - fruit.size)&& ballMoving === false) {
            ballMoving = true;
            fruitMoveUp = true;
        }
        else if (player.y > fruit.y && (player.x - fruit.x) != (width - fruit.size)&& ballMoving === false) {
            ballMoving = true;
            fruitMoveDown = true;
        }
        if (player.x + player.size < fruit.x ||
            fruit.x + fruit.size < player.x ||
            player.y > fruit.y + fruit.size ||
            fruit.y > player.y + player.size) {
            ballMoving = true;
        }
        else {
            ballMoving = false;
        }
        
//     fruitMoveRight = true;
    }
    
    
        
        //points+=1;
        //speed = 10;
        //context.clearRect(fruit.x, fruit.y, fruit.size+1, fruit.size+1);
//         fruit = {
//             x : getRandomNumber(20, 480),
//             y : getRandomNumber(20, 480),
//             size : 10,
//         };
        //return speed;
    
    //return speed;
}






function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



// if (collides(fruit)) {
//     context.clearRect(fruit.x, fruit.y, fruit.size+1, fruit.size+1);
//     let fruitMoveRight = true;
// }




function collides(fruit) {
    if (player.x + player.size < fruit.x ||
        fruit.x + fruit.size < player.x ||
        player.y > fruit.y + fruit.size ||
        fruit.y > player.y + player.size) {
        return false;
    } else {
        return true;
    }
}


function keyUp(event) {
    if (playerOneDirection === 'up') {
        moveUp = false;
    }
    if (playerOneDirection === 'right') {
        moveRight = false;
    }
    if (playerOneDirection === 'down') {
        moveDown = false;
    }
    if (playerOneDirection === 'left') {
        moveLeft = false;
    }
    if (playerTwoDirection === 'up') {
        moveUp = false;
    }
    if (playerTwoDirection === 'right') {
        moveRight = false;
    }
    if (playerTwoDirection === 'down') {
        moveDown = false;
    }
    if (playerTwoDirection === 'left') {
        moveLeft = false;
    }
    playerOneDirection === ''
    playerTwoDirection === ''
}





function stop() {
    clearInterval(interval_id);
    window.removeEventListener('keydown', activate);
    //window.removeEventListener('keyup', deactivate);


}




function activate(event){
    let keyCode = event.keyCode;
    if (keyCode === 38 && !(moveDown) ){
        moveUp = true;
        moveRight = false;
        moveDown = false;
        moveLeft = false;
        playerOneDirection = 'up'
        window.addEventListener("keyup", keyUp);
    } else if (keyCode === 39 && !(moveLeft)){
        moveRight = true;
        moveUp = false;
        moveDown = false;
        moveLeft = false;
        playerOneDirection = 'right'
        window.addEventListener("keyup", keyUp);
    } else if (keyCode === 40 && !(moveUp)){
        moveDown = true;
        moveRight = false;
        moveUp = false;
        moveLeft = false;
        playerOneDirection = 'down'
        window.addEventListener("keyup", keyUp);
    } else if (keyCode === 37 && !(moveRight)){
        moveLeft = true;
        moveRight = false;
        moveUp = false;
        moveDown = false;
        playerOneDirection = 'left'
        window.addEventListener("keyup", keyUp);
    }
    let keyCodeP2 = event.keyCode;
    if (keyCodeP2 === 87 && !(moveDown) ){
        moveUpP2 = true;
        moveRightP2 = false;
        moveDownP2 = false;
        moveLeftP2 = false;
        playerTwoDirection = 'up'
        window.addEventListener("keyup", keyUp);
    } else if (keyCodeP2 === 68 && !(moveLeft)){
        moveRightP2 = true;
        moveUpP2 = false;
        moveDownP2 = false;
        moveLeftP2 = false;
        playerTwoDirection = 'right'
        window.addEventListener("keyup", keyUp);
    } else if (keyCodeP2 === 83 && !(moveUp)){
        moveDownP2 = true;
        moveRightP2 = false;
        moveUpP2 = false;
        moveLeftP2 = false;
        playerTwoDirection = 'down'
        window.addEventListener("keyup", keyUp);
    } else if (keyCodeP2 === 65 && !(moveRight)){
        moveLeftP2 = true;
        moveRightP2 = false;
        moveUpP2 = false;
        moveDownP2 = false;
        playerTwoDirection = 'left'
        window.addEventListener("keyup", keyUp);
    }
}

function deactivate(event){
    let keyCode = event.keyCode;
    if (keyCode === 38){
        moveUp = false;
    } else if (keyCode === 39){
        moveRight = false;
    } else if (keyCode === 40){
        moveDown = false;
    } else if (keyCode === 37){
        moveLeft = false;
    }
}
