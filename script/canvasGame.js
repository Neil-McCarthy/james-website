let controller,gamePlayer;
let gameOver = false;
let gameCanvas = document.getElementById('gameCanvas');
let gameContext = gameCanvas.getContext('2d');
let gameWidth = gameCanvas.width;
let gameHeight = gameCanvas.height;
let scrollPosition = 0;
let scrolling = false;
let xPosition = 0;
let yPosition = 0;
let platform = [];
let platformNumber = 0;
let platformID;
let enemy = [];
let enemyNumber = 0;
let enemyID;
let lastX = 1500*3/4;
let playing = true;
let playerPosition = 0;
let divWidth = document.querySelector('div').clientWidth;
// let soundLanding = new Audio('//audio/Impact14.m4a');

let pacman = {
    x:500,
    y:372.5,
    dx:0,
    dy:0,
    size:15,
    direction:'none',
    nextDirection:'none',
    lastDirection:'left',
    buffer:25,
    collideTopCheck:0,
    collideRightCheck:0,
    collideDownCheck:0,
    collideLeftCheck:0,
    collideTop:false,
    collideRight:false,
    collideDown:false,
    collideLeft:false,

}
let ghostsCreated = false;
let ghostColour,ghostPositionX,ghostPositionY,ghostDirection,ghostNextirection;
let ghostTracker = [];
function ghostMaker(){
    for(let ghostNumber = 0;ghostNumber < 4;ghostNumber++){
        if(ghostNumber == 0){
            ghostColour = 'red';
            ghostPositionX = 500;
            ghostPositionY = 252.5;
            ghostDirection = 'none';
            ghostNextirection = 'none';
        } else if(ghostNumber == 1){
            ghostColour = 'pink';
            ghostPositionX = 465;
            ghostPositionY = 312.5;
            ghostDirection = 'right';
            ghostNextirection = 'up';
        } else if(ghostNumber == 2){
            ghostColour = 'orange';
            ghostPositionX = 500;
            ghostPositionY = 312.5;
            ghostDirection = 'up';
            ghostNextirection = 'none';
        } else if(ghostNumber == 3){
            ghostColour = 'aqua';
            ghostPositionX = 535;
            ghostPositionY = 312.5;
            ghostDirection = 'left';
            ghostNextirection = 'up';
        }
        ghostTracker.push(
            {
                colour:ghostColour,
                x:ghostPositionX,
                y:ghostPositionY,
                dx:0,
                dy:0,
                size:15,
                direction:ghostDirection,
                nextDirection:ghostNextirection,
                lastDirection:'none',
                buffer:25,
                collideTopCheck:0,
                collideRightCheck:0,
                collideDownCheck:0,
                collideLeftCheck:0,
                collideTop:false,
                collideRight:false,
                collideDown:false,
                collideLeft:false,
                midSection:15,
                leftEyeX:5,
                leftEyeY:2.5,
                rightEyeX:5,
                rightEyeY:2.5,
                directionChangeGrace:0
            }
        )
    }
    ghostsCreated = true;
}


let ghostNewDirection,ghostNextDirection;
let mouthMover = 50;
let boundaryList = [];
let collisionTop = [];
let collisionRight = [];
let collisionBottom = [];
let collisionLeft = [];
let boundaryNumber = 0;
let boundaryTracker = [];
let pacFoodTracker = [];
let pacFoodX = 232.5;
let pacFoodY = 72.5;
let rowTracker = 0;
let columnTracker = 0;
const row0Block = [9];
const row1Block = [1,2,3,5,6,7,9,11,12,13,15,16,17];
const row2Block = [0,18];
const row3Block = [1,2,3,5,7,8,9,10,11,13,15,16,17];
const row4Block = [5,9,13];
const row5Block = [0,1,2,3,5,6,7,9,11,12,13,15,16,17,18];
const row6Block = [0,1,2,3,5,13,15,16,17,18];
const row7Block = [0,1,2,3,5,7,8,9,10,11,13,15,16,17,18];
const row8Block = [0,1,2,3,7,8,9,10,11,15,16,17,18];
const row9Block = [0,1,2,3,5,7,8,9,10,11,13,15,16,17,18];
const row10Block = [0,1,2,3,5,9,13,15,16,17,18];
const row11Block = [0,1,2,3,5,7,8,9,10,11,13,15,16,17,18];
const row12Block = [9];
const row13Block = [1,2,3,5,6,7,9,11,12,13,15,16,17];
const row14Block = [3,15];
const row15Block = [0,1,3,5,7,8,9,10,11,13,15,17,18];
const row16Block = [0,5,9,13,18];
const row17Block = [1,2,3,4,5,6,7,9,11,12,13,14,15,16,17];
const row18Block = [];
let pacmanWakaWaka = new Audio('../audio/pacmanWakaWaka.mp3');
pacmanWakaWaka.playbackRate = 1.3;
let wakaLoop = 0;
let ghostDirections = ['up','right','down','left'];

controller = {
    left:false,
    right:false,
    up:false,
    keyListener:function(event){
        let key_state = (event.type == 'keydown')?true:false;

        switch(event.keyCode){
            case 37:
                controller.left = key_state;
            break;
            case 38:
                controller.up = key_state;
            break;
            case 39:
                controller.right = key_state;
            break;
            case 40:
                controller.down = key_state;
            break
        }
    }
}

function boundaries(xPosition,yPosition,length,direction){
    boundaryTracker.push(
        {
        x:xPosition,
        y:yPosition,
    })
    gameContext.beginPath();
    gameContext.moveTo(xPosition,yPosition);
    if (direction == 'horizontal'){
        gameContext.lineTo(xPosition + length,yPosition);
        gameContext.lineTo(xPosition + length,yPosition + 10);
        gameContext.lineTo(xPosition,yPosition + 10);
    } else if (direction == 'vertical'){
        gameContext.lineTo(xPosition,yPosition + length);
        gameContext.lineTo(xPosition + 10,yPosition + length);
        gameContext.lineTo(xPosition + 10,yPosition);
    }
    boundaryList.push(
        {
        x:xPosition,
        y:yPosition,
        direction:direction,
        length:length
        }
    );
    boundaryNumber += 1;
    gameContext.lineTo(xPosition,yPosition);
    gameContext.strokeStyle = 'blue';
    gameContext.stroke();

}
let pacFoodRealCount = 361;
function pacFoodcreator(){
    if (pacFoodTracker.length < 1){
        for(let specificPacFood = 0; specificPacFood < 361; specificPacFood++){
            if (pacFoodSpotBlocker(rowTracker,columnTracker)){
                pacFoodTracker.push({
                    alive:true,
                    x:pacFoodX,
                    y:pacFoodY,
                    size:5
                })
            } else{
                pacFoodRealCount--;
            }
            if (pacFoodX == 772.5){
                pacFoodY += 30;
                pacFoodX = 232.5;
                rowTracker++;
                columnTracker = 0;
            } else{
                columnTracker ++;
                pacFoodX += 30;
            }
        }
    }
    for(let specificPacFood = 0; specificPacFood < pacFoodRealCount; specificPacFood++){
        if (pacFoodTracker[specificPacFood].alive == true){
            gameContext.fillRect(pacFoodTracker[specificPacFood].x - 5,pacFoodTracker[specificPacFood].y - 2.5, pacFoodTracker[specificPacFood].size, pacFoodTracker[specificPacFood].size);
        }
    }
}

function pacFoodSpotBlocker(pacFoodHorizontal,pacFoodVertical){
        if (eval('row'+pacFoodHorizontal+'Block').includes(pacFoodVertical)){
            return false;
        } else{
            return true;
        }
}
function boundaryCollision(mover){
    for (let specificBoundary = 0;specificBoundary < boundaryList.length;specificBoundary++){
        if (boundaryList[specificBoundary].direction == 'horizontal'){
                if (mover.x + mover.buffer > boundaryList[specificBoundary].x && mover.x - mover.buffer < boundaryList[specificBoundary].x + boundaryList[specificBoundary].length){
                    if (mover.y - mover.buffer > boundaryList[specificBoundary].y && mover.y - mover.buffer <= boundaryList[specificBoundary].y + 10){
                        if (mover.direction == 'up'){
                            mover.dy = 0;
                            mover.y = boundaryList[specificBoundary].y + 10 + mover.buffer;
                            mover.lastDirection = mover.direction;
                            mover.direction = 'none';
                        }
                    } else if (mover.y + mover.buffer < boundaryList[specificBoundary].y + 10 && mover.y + mover.buffer >= boundaryList[specificBoundary].y){
                        if (mover.direction == 'down'){
                            mover.dy = 0;
                            mover.y = boundaryList[specificBoundary].y - mover.buffer;
                            mover.lastDirection = mover.direction;
                            mover.direction = 'none';
                        }
                    }
                    if (mover.y - mover.buffer == boundaryList[specificBoundary].y + 10){
                        mover.collideTop = true;
                        mover.collideTopCheck++;
                    }
                    if (mover.y + mover.buffer == boundaryList[specificBoundary].y){
                        mover.collideDown = true;
                        mover.collideDownCheck++;
                    }
                }
        } else if (boundaryList[specificBoundary].direction == 'vertical'){
                if (mover.y + mover.buffer > boundaryList[specificBoundary].y && mover.y - mover.buffer < boundaryList[specificBoundary].y + boundaryList[specificBoundary].length){
                    if (mover.x - mover.buffer > boundaryList[specificBoundary].x && mover.x - mover.buffer <= boundaryList[specificBoundary].x + 10){
                        if (mover.direction == 'left'){
                            mover.dx = 0;
                            mover.x = boundaryList[specificBoundary].x + 10 + mover.buffer;
                            mover.lastDirection = mover.direction;
                            mover.direction = 'none';
                        }
                    } else if (mover.x + mover.buffer < boundaryList[specificBoundary].x + 10 && mover.x + mover.buffer >= boundaryList[specificBoundary].x){
                        if (mover.direction == 'right'){
                            mover.dx = 0;
                            mover.x = boundaryList[specificBoundary].x - mover.buffer;
                            mover.lastDirection = mover.direction;
                            mover.direction = 'none';
                        }
                    }
                    if (mover.x - mover.buffer == boundaryList[specificBoundary].x + 10){
                        mover.collideLeft = true;
                        mover.collideLeftCheck++;
                    }
                    if (mover.x + mover.buffer == boundaryList[specificBoundary].x){
                        mover.collideRight = true;
                        mover.collideRightCheck++;
                    }
                }
        }
    }
    if (mover.collideTopCheck == 0){
        mover.collideTop = false;
    }
    if (mover.collideDownCheck == 0){
        mover.collideDown = false;
    }
    if (mover.collideLeftCheck == 0){
        mover.collideLeft = false;
    }
    if (mover.collideRightCheck == 0){
        mover.collideRight = false;
    }
    mover.collideTopCheck = 0;
    mover.collideDownCheck = 0;
    mover.collideLeftCheck = 0;
    mover.collideRightCheck = 0;
}


function pacmanCollision(projectile,object){
    if (projectile.x + projectile.size - 5 < object.x - object.size + 5 ||
            object.x + object.size - 5 < projectile.x - projectile.size + 5 ||
            projectile.y - projectile.size + 5 > object.y + object.size - 5 ||
            object.y - object.size + 5 > projectile.y + projectile.size - 5){
        return true;
            } else{
                return false;
            }
}


function ghostCreator(ghost){
    gameContext.fillStyle = ghost.colour;
    gameContext.strokeStyle = ghost.colour;
    gameContext.beginPath();
    gameContext.arc(ghost.x, ghost.y, ghost.size, 3, 2.1 * Math.PI);
    gameContext.fill();
    gameContext.stroke();
    gameContext.fillRect(ghost.x - ghost.size - .5,ghost.y,31,ghost.midSection);
    gameContext.fillStyle = 'white';
    gameContext.beginPath();
    gameContext.arc(ghost.x - 5, ghost.y - 2.5, 5, 0, 2 * Math.PI);
    gameContext.fill();
    gameContext.stroke();
    gameContext.beginPath();
    gameContext.arc(ghost.x + 5, ghost.y - 2.5, 5, 0, 2 * Math.PI);
    gameContext.fill();
    gameContext.stroke();
    gameContext.strokeStyle = 'blue';
    gameContext.fillStyle = 'blue';
    gameContext.beginPath();
    gameContext.arc(ghost.x - ghost.leftEyeX, ghost.y - ghost.leftEyeY, 1, 0, 2 * Math.PI);
    gameContext.fill();
    gameContext.stroke();
    gameContext.beginPath();
    gameContext.arc(ghost.x + ghost.rightEyeX, ghost.y - ghost.rightEyeY, 1, 0, 2 * Math.PI);
    gameContext.fill();
    gameContext.stroke();
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

function ghostDirectionChanger(ghost){
    ghostNewDirection = Math.floor(Math.random() * ghostDirections.length);
    if (ghostDirections[ghostNewDirection] == ghost.lastDirection){
        ghostDirectionChanger(ghost);
    } else{
        ghost.direction = ghostDirections[ghostNewDirection];
    }
}
function ghostNextDirectionMaker(ghost){
    ghostNextDirection = Math.floor(Math.random() * 4);
    if (ghostNextDirection == 0 && ghost.direction != 'down' && ghost.direction != 'up'){
        ghost.nextDirection = 'up';
    } else if (ghostNextDirection == 1 && ghost.direction != 'left' && ghost.direction != 'right'){
        ghost.nextDirection = 'right';
    } else if (ghostNextDirection == 2 && ghost.direction != 'up' && ghost.direction != 'down'){
        ghost.nextDirection = 'down';
    } else if (ghostNextDirection == 3 && ghost.direction != 'right' && ghost.direction != 'left'){
        ghost.nextDirection = 'left';
    }
    ghost.directionChangeGrace = 0;
}
function soundPlayer(){
    while(wakaLoop > 0){
        pacmanWakaWaka.play();
        wakaLoop--;
    }
}


gamePlayer = function(){
    ghostMaker();
    if (pacman.x == 500 && pacman.y == 252.5){
        pacman.collideDown = true;
    }
    if (controller.up && pacman.direction != 'up' || pacman.nextDirection == 'up'){
        if (pacman.collideTop == false){
            pacman.dx = 0;
            pacman.dy = 0;
            pacman.dy -= 2;
            pacman.direction = 'up';
            pacman.nextDirection = 'none';
            pacman.lastDirection = 'none';
        } else if (pacman.collideTop){
            pacman.nextDirection = 'up';
        }
    }
    if (controller.down && pacman.direction != 'down' || pacman.nextDirection == 'down'){
        if (pacman.collideDown == false){
            pacman.dx = 0;
            pacman.dy = 0;
            pacman.dy += 2;
            pacman.direction = 'down';
            pacman.nextDirection = 'none';
            pacman.lastDirection = 'none';
        } else if (pacman.collideDown){
            pacman.nextDirection = 'down';
        }
    }
    if (controller.left && pacman.direction != 'left' || pacman.nextDirection == 'left'){
        if (pacman.collideLeft == false){
            pacman.dx = 0;
            pacman.dy = 0;
            pacman.dx -= 2;
            pacman.direction = 'left';
            pacman.nextDirection = 'none';
            pacman.lastDirection = 'none';
        } else if (pacman.collideLeft){
            pacman.nextDirection = 'left';
        }
    }
    if (controller.right && pacman.direction != 'right' || pacman.nextDirection == 'right'){
        if (pacman.collideRight == false){
            pacman.dx = 0;
            pacman.dy = 0;
            pacman.dx += 2;
            pacman.direction = 'right';
            pacman.nextDirection = 'none';
            pacman.lastDirection = 'none';
        } else if (pacman.collideRight){
            pacman.nextDirection = 'right';
        }
    }
    if (pacman.x < 220 && pacman.y == 312.5){
        pacman.x = 769;
    }
    if (pacman.x > 770 && pacman.y == 312.5){
        pacman.x = 221;
    }
    pacman.x += pacman.dx;
    pacman.y += pacman.dy;
    gameContext.clearRect(0, 0, gameWidth, gameHeight);

    //OUTER WALLS

    //ceiling
    boundaries(195,37.5,610,'horizontal');
    //floor
    boundaries(195,637.5,610,'horizontal');
    //upper right
    boundaries(795,37.5,190,'vertical');
    //upper left
    boundaries(195,37.5,190,'vertical');
    //lower right
    boundaries(795,397.5,250,'vertical');
    //lower left
    boundaries(195,397.5,250,'vertical');

    //UPPER BOUNDARIES

    //outer upper right
    boundaries(675,97.5,70,'horizontal');
    boundaries(675,97.5,10,'vertical');
    boundaries(735,97.5,10,'vertical');
    //outer upper left
    boundaries(255,97.5,70,'horizontal');
    boundaries(255,97.5,10,'vertical');
    boundaries(315,97.5,10,'vertical');
    //middle upper right
    boundaries(555,97.5,70,'horizontal');
    boundaries(555,97.5,10,'vertical');
    boundaries(615,97.5,10,'vertical');
    //middle upper left
    boundaries(375,97.5,70,'horizontal');
    boundaries(375,97.5,10,'vertical');
    boundaries(435,97.5,10,'vertical');
    //center upper nubbin
    boundaries(495,47.5,60,'vertical');
    boundaries(495,97.5,10,'horizontal');
    //center lower
    boundaries(555,157.5,10,'vertical');
    boundaries(435,157.5,130,'horizontal');
    boundaries(435,157.5,10,'vertical');
    boundaries(495,168.5,58.5,'vertical');
    boundaries(495,217.5,10,'horizontal');
    //outer lower right
    boundaries(675,157.5,70,'horizontal');
    boundaries(675,157.5,10,'vertical');
    boundaries(735,157.5,10,'vertical');
    //outer lower left
    boundaries(255,157.5,70,'horizontal');
    boundaries(255,157.5,10,'vertical');
    boundaries(315,157.5,10,'vertical');

    //MIDDLE BOUNDARIES

    //upper tunnel right
    boundaries(675,217.5,130,'horizontal');
    boundaries(675,217.5,70,'vertical');
    boundaries(675,277.5,130,'horizontal');
    //upper tunnel left
    boundaries(195,217.5,130,'horizontal');
    boundaries(315,217.5,70,'vertical');
    boundaries(195,277.5,130,'horizontal');
    //lower tunnel right
    boundaries(675,397.5,130,'horizontal');
    boundaries(675,337.5,70,'vertical');
    boundaries(675,337.5,130,'horizontal');
    //lower tunnel left
    boundaries(195,397.5,130,'horizontal');
    boundaries(315,337.5,70,'vertical');
    boundaries(195,337.5,130,'horizontal');
    //middle upper right
    boundaries(615,157.5,130,'vertical');
    boundaries(615,157.5,10,'horizontal');
    boundaries(615,277.5,10,'horizontal');
    boundaries(555,217.5,70,'horizontal');
    boundaries(555,217.5,10,'vertical');
    //middle upper left
    boundaries(375,157.5,130,'vertical');
    boundaries(375,157.5,10,'horizontal');
    boundaries(375,277.5,10,'horizontal');
    boundaries(375,217.5,70,'horizontal');
    boundaries(435,217.5,10,'vertical');
    //middle lower right
    boundaries(615,337.5,70,'vertical');
    boundaries(615,337.5,10,'horizontal');
    boundaries(615,397.5,10,'horizontal');
    //middle lower left
    boundaries(375,337.5,70,'vertical');
    boundaries(375,337.5,10,'horizontal');
    boundaries(375,397.5,10,'horizontal');
    //ghost house
    boundaries(435,277.5,40,'horizontal');
    boundaries(465,277.5,10,'vertical');
    boundaries(525,277.5,10,'vertical');
    boundaries(525,277.5,40,'horizontal');
    boundaries(555,277.5,70,'vertical');
    boundaries(435,337.5,130,'horizontal');
    boundaries(435,277.5,70,'vertical');

    //LOWER BOUNDARIES

    //center upper
    boundaries(555,397.5,10,'vertical');
    boundaries(435,397.5,130,'horizontal');
    boundaries(435,397.5,10,'vertical');
    boundaries(495,408.5,58.5,'vertical');
    boundaries(495,457.5,10,'horizontal');
    //center lower
    boundaries(555,517.5,10,'vertical');
    boundaries(435,517.5,130,'horizontal');
    boundaries(435,517.5,10,'vertical');
    boundaries(495,528.5,58.5,'vertical');
    boundaries(495,577.5,10,'horizontal');
    //middle upper right
    boundaries(555,457.5,70,'horizontal');
    boundaries(615,457.5,10,'vertical');
    boundaries(555,457.5,10,'vertical');
    //middle upper left
    boundaries(375,457.5,70,'horizontal');
    boundaries(435,457.5,10,'vertical');
    boundaries(375,457.5,10,'vertical');
    //outer upper right
    boundaries(675,457.5,70,'horizontal');
    boundaries(735,457.5,10,'vertical');
    boundaries(675,457.5,70,'vertical');
    boundaries(675,517.5,10,'horizontal');
    //outer upper left
    boundaries(255,457.5,70,'horizontal');
    boundaries(255,457.5,10,'vertical');
    boundaries(315,457.5,70,'vertical');
    boundaries(315,517.5,10,'horizontal');
    //outer nubbin right
    boundaries(735,517.5,60,'horizontal');
    boundaries(735,517.5,10,'vertical');
    //outer nubbin left
    boundaries(205,517.5,60,'horizontal');
    boundaries(255,517.5,10,'vertical');
    //outer lower right
    boundaries(555,577.5,10,'vertical');
    boundaries(555,577.5,190,'horizontal');
    boundaries(735,577.5,10,'vertical');
    boundaries(615,517.5,60,'vertical');
    boundaries(615,517.5,10,'horizontal');
    //outer lower left
    boundaries(255,577.5,10,'vertical');
    boundaries(255,577.5,190,'horizontal');
    boundaries(435,577.5,10,'vertical');
    boundaries(375,517.5,60,'vertical');
    boundaries(375,517.5,10,'horizontal');
    gameContext.fillStyle = 'white';
    pacFoodcreator();
    for(let pacFoodCollision = 0;pacFoodCollision < pacFoodTracker.length;pacFoodCollision++){
        if(!(collision(pacman,pacFoodTracker[pacFoodCollision],1))){
            if (pacFoodTracker[pacFoodCollision].alive == true){
                wakaLoop++;
                pacFoodTracker[pacFoodCollision].alive = false;
            }
        }
    }
    soundPlayer();
    gameContext.strokeStyle = 'yellow';
    gameContext.beginPath();
    if (mouthMover <= 10){
        if (pacman.direction == 'up' || pacman.lastDirection == 'up'){
            gameContext.arc(pacman.x, pacman.y, pacman.size, -1, 1.3 * Math.PI);
            gameContext.lineTo(pacman.x, pacman.y);
        } else if (pacman.direction == 'right' || pacman.lastDirection == 'right'){
            gameContext.arc(pacman.x, pacman.y, pacman.size, .7, 1.85 * Math.PI);
            gameContext.lineTo(pacman.x, pacman.y);
        } else if (pacman.direction == 'down' || pacman.lastDirection == 'down'){
            gameContext.arc(pacman.x, pacman.y, pacman.size, -4.1, -1.7 * Math.PI);
            gameContext.lineTo(pacman.x, pacman.y);
        } else if (pacman.direction == 'left' || pacman.lastDirection == 'left'){
            gameContext.arc(pacman.x, pacman.y, pacman.size, -2.7, .8 * Math.PI);
            gameContext.lineTo(pacman.x, pacman.y);
        }
    } else if (mouthMover > 5){
        gameContext.arc(pacman.x, pacman.y, pacman.size, 0, 2 * Math.PI);
    }
    mouthMover += 1;
    if (mouthMover > 20){
        mouthMover = 0;
    }

    gameContext.fillStyle = 'yellow';
    gameContext.fill();
    gameContext.stroke();
    boundaryCollision(pacman);
    for(let ghostCount = 0;ghostCount<4;ghostCount++){
        ghostCreator(ghostTracker[ghostCount]);
        boundaryCollision(ghostTracker[ghostCount]);
        if(ghostTracker[ghostCount].direction == 'none'){
            ghostDirectionChanger(ghostTracker[ghostCount]);
            ghostTracker[ghostCount].nextDirection = 'none';
        }
    }
    for(let ghostCount = 0;ghostCount<4;ghostCount++){
        if (ghostTracker[ghostCount].x == 500 && ghostTracker[ghostCount].y == 252.5){
            ghostTracker[ghostCount].collideDown = true;
        }
        if (ghostTracker[ghostCount].x == 500 && ghostTracker[ghostCount].y == 312.5){
            ghostTracker[ghostCount].direction = 'up';
        }
        if (ghostTracker[ghostCount].collideTop == false && (ghostTracker[ghostCount].direction == 'up' || ghostTracker[ghostCount].nextDirection == 'up')){
            ghostTracker[ghostCount].dx = 0;
            ghostTracker[ghostCount].dy = 0;
            ghostTracker[ghostCount].dy -= 2.5;
            ghostTracker[ghostCount].leftEyeX = 5;
            ghostTracker[ghostCount].leftEyeY = 5;
            ghostTracker[ghostCount].rightEyeX = 5;
            ghostTracker[ghostCount].rightEyeY = 5;
            ghostTracker[ghostCount].nextDirection = 'none';
            ghostTracker[ghostCount].directionChangeGrace = 0;
        } else if (ghostTracker[ghostCount].collideRight == false && (ghostTracker[ghostCount].direction == 'right' || ghostTracker[ghostCount].nextDirection == 'right')){
            ghostTracker[ghostCount].dx = 0;
            ghostTracker[ghostCount].dy = 0;
            ghostTracker[ghostCount].dx += 2.5;
            ghostTracker[ghostCount].leftEyeX = 2;
            ghostTracker[ghostCount].leftEyeY = 2.5;
            ghostTracker[ghostCount].rightEyeX = 8;
            ghostTracker[ghostCount].rightEyeY = 2.5;
            ghostTracker[ghostCount].nextDirection = 'none';
            ghostTracker[ghostCount].directionChangeGrace = 0;
        } else if (ghostTracker[ghostCount].collideDown == false && (ghostTracker[ghostCount].direction == 'down' || ghostTracker[ghostCount].nextDirection == 'down')){
            ghostTracker[ghostCount].dx = 0;
            ghostTracker[ghostCount].dy = 0;
            ghostTracker[ghostCount].dy += 2.5;
            ghostTracker[ghostCount].leftEyeX = 5;
            ghostTracker[ghostCount].leftEyeY = 0;
            ghostTracker[ghostCount].rightEyeX = 5;
            ghostTracker[ghostCount].rightEyeY = 0;
            ghostTracker[ghostCount].nextDirection = 'none';
            ghostTracker[ghostCount].directionChangeGrace = 0;
        } else if (ghostTracker[ghostCount].collideLeft == false && (ghostTracker[ghostCount].direction == 'left' || ghostTracker[ghostCount].nextDirection == 'left')){
            ghostTracker[ghostCount].dx = 0;
            ghostTracker[ghostCount].dy = 0;
            ghostTracker[ghostCount].dx -= 2.5;
            ghostTracker[ghostCount].leftEyeX = 8;
            ghostTracker[ghostCount].leftEyeY = 2.5;
            ghostTracker[ghostCount].rightEyeX = 2;
            ghostTracker[ghostCount].rightEyeY = 2.5;
            ghostTracker[ghostCount].nextDirection = 'none';
            ghostTracker[ghostCount].directionChangeGrace = 0;

        }
        if (ghostTracker[ghostCount].directionChangeGrace < 2){
            ghostTracker[ghostCount].directionChangeGrace ++;
        }
        if (ghostTracker[ghostCount].nextDirection == 'none'){
            if (ghostTracker[ghostCount].directionChangeGrace >= 1){
                ghostNextDirectionMaker(ghostTracker[ghostCount]);
            }
        }
        ghostTracker[ghostCount].x += ghostTracker[ghostCount].dx;
        ghostTracker[ghostCount].y += ghostTracker[ghostCount].dy;
        if (ghostTracker[ghostCount].x < 220 && ghostTracker[ghostCount].y == 312.5){
        ghostTracker[ghostCount].x = 769;
        }
        if (ghostTracker[ghostCount].x > 770 && ghostTracker[ghostCount].y == 312.5){
            ghostTracker[ghostCount].x = 221;
        }
        if (pacmanCollision(pacman,ghostTracker[ghostCount])){
        } else{
            gameOver = true;
        }
    }
    gameContext.fillStyle ='black';
    gameContext.fillRect(195,288.5,50,48);
    gameContext.fillRect(745,288.5,50,48);
    if (gameOver === false){
                window.requestAnimationFrame(gamePlayer);
        }
}


window.addEventListener('keydown',controller.keyListener);
window.addEventListener('keyup',controller.keyListener);
window.requestAnimationFrame(gamePlayer);
