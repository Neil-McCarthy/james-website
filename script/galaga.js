let canvas,width,height,context,draw,mouseX,mouseY,controller,alienRowCalculator;
let shooting = false;
let fired = false;
let aliens = [];
let alienXPos = 150;
let alienYPos = 150;
let alienShots = [];
let shotNumber = 0;
let blockades = [];
let blockadeBlock = 0
let blockadeCount = 0;
let blockStartPoint;
let kills = 0;
let playerScore = document.getElementById('score');
let keyCodes;
let gameOver = false;
let alienShotDecider;
Math.random();


let player = {
    x:385,
    y:700,
    dx:0,
    size:10,
}
let shooter = {
    x:player.x + player.size*1.5 - 2.5,
    y:player.y - player.size,
    size:5,
}
let shot = {
    x:shooter.x + shooter.size/2 - 1.75,
    y:shooter.y,
    size:2.5,
    dy:-3
}


function createAliens(rowsOfAliens){
    alienRowCalculator = rowsOfAliens*10
    for(let alien = 0;alien < alienRowCalculator;alien++){
        aliens.push({
        x:alienXPos,
        y:alienYPos,
        size:20,
        dx:.35
        })
        alienShots.push({
        x:alienXPos + aliens[alien].size/2 - 2.5,
        y:alienYPos + 10,
        size:5,
        fired:0,
        sent:0
        })
        aliens[alien].x += aliens[alien].dx;
        if (aliens[alien].x > 700 || aliens[alien].x < 100){
            for(let m = 0;m < alienRowCalculator;m++){
            aliens[m].y += 25;
            aliens[m].dx *= 1.1;
            aliens[m].dx *= -1;
            }
        }
        if (aliens[alien].x > player.x - 100 && aliens[alien].x < player.x + 100){
            alienShotDecider = Math.floor((Math.random() * 1000));
            if (alienShotDecider == 5){
                alienShots[alien].fired = 1;
            }
        }
        context.fillStyle ='yellow';
        if (alienShots[alien].fired == 1 && alienShots[alien].sent == 0){
            alienShots[alien].x = aliens[alien].x + aliens[alien].size/2 - 2.5;
            alienShots[alien].y = alienYPos + 10;
            context.fillRect(alienShots[alien].x,alienShots[alien].y,alienShots[alien].size,alienShots[alien].size*2);
            alienShots[alien].sent = 1;
        }
        if (alienShots[alien].fired == 1 && alienShots[alien].sent == 1){
            alienShots[alien].y += 2;
            context.fillRect(alienShots[alien].x,alienShots[alien].y,alienShots[alien].size,alienShots[alien].size*2);
        }
        if (collision(alienShots[alien],player,2)){
        }   else{
            localStorage.setItem('lastScore',kills);
            gameOver = true;
            window.alert('You have been murdered to death.')
        }
        if (alienShots[alien].y > height){
            reload('alien',alien);
        }
        if (aliens[alien].y > 600){
            localStorage.setItem('lastScore',kills);
            gameOver = true;
            window.alert('The aliens have landed. Game over.')
        }
        context.fillRect(aliens[alien].x + aliens[alien].size/2 - 2.5,aliens[alien].y + 10,alienShots[alien].size,alienShots[alien].size*2);
        context.fillStyle ='lime';
        context.fillRect(aliens[alien].x,aliens[alien].y,aliens[alien].size,aliens[alien].size);
        alienXPos += 50;
        if (aliens.length == 10 || aliens.length == 20 || aliens.length == 30 || aliens.length == 40){
            alienXPos = 150;
            alienYPos += 25;
        }
        if (collision(shot,aliens[alien],3)){
        } else {
            aliens[alien].size = 0;
            aliens[alien].x = 400;
            aliens[alien].y = -50;
            alienShots[alien].size = 0;
            reload('player',0);
            kills += 1;
            scoreTracker();
        }

    }
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
function reload(type,alienNumber){
    if (type === 'player'){
        shot.x = player.x + player.size*1.5 - 1.75
        shot.y = player.y - player.size;
        shooting = false;
        fired = false;
    }
    if (type === 'alien'){
        alienShots[alienNumber].x = aliens[alienNumber].x + aliens[alienNumber].size/2 - 2.5;
        alienShots[alienNumber].y = alienYPos + 10;
        alienShots[alienNumber].fired = 0;
        alienShots[alienNumber].sent = 0;
    }
}

function createBlockade(blockadeXPosition){
    blockadeCount +=1;
    blockStartPoint = blockadeXPosition;
    for (;blockadeBlock < blockadeCount*10;blockadeBlock++){
        blockades.push({
            x:blockadeXPosition,
            y:650,
            size:10
        })
        blockadeXPosition += 10
        context.fillRect(blockades[blockadeBlock].x,blockades[blockadeBlock].y,blockades[blockadeBlock].size,blockades[blockadeBlock].size);
    }
}

function scoreTracker(){
    playerScore.removeChild(playerScore.firstChild);
    playerScore.appendChild(document.createTextNode(kills));
}
controller = {
    left:false,
    right:false,
    keyListener:function(event){
        let key_state = (event.type == 'keydown')?true:false;

        switch(event.keyCode){
            case 37:
                controller.left = key_state;
            break;
            case 39:
                controller.right = key_state;
            break;
            case 32:
                controller.shoot = key_state;
            break;
        }
    }
}

draw = function(){
     if (controller.left){
        player.dx -= 1.5;
    }
    if (controller.right){
        player.dx += 1.5;
    }
    if (controller.shoot){
        shooting = true;
    }
    if (player.x < 0){
        player.x = 0;
    }
    if (player.x + player.size*3 >= width){
        player.x = width-player.size*3;
    }
    if (shot.y < - shot.size*3){
        reload('player',0);
    }
    player.x += player.dx;
    player.dx *= .8;
    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
    context.clearRect(0, 0, width, height);
    context.fillStyle ='yellow';
    if (shooting === false){
        context.fillRect(player.x + player.size*1.5 - 1.75,player.y - player.size,shot.size,shot.size*3);
    } else if (shooting === true && fired === false){
        shot.x = player.x + player.size*1.5 - 1.75
        shot.y = player.y - player.size;
        context.fillRect(shot.x,shot.y,shot.size,shot.size*3);
        fired = true;
    } else if (shooting === true && fired === true){
        shot.y += shot.dy;
        context.fillRect(shot.x,shot.y,shot.size,shot.size*3);
    }
    context.fillStyle ='red';
    context.fillRect(player.x, player.y, player.size*3, player.size);
    context.fillRect(player.x + player.size*1.5 - 2.5,player.y - player.size, shooter.size, shooter.size*3);
    context.fillStyle = 'lime';
    createAliens(4);
    context.fillStyle = 'red';
    createBlockade(150);
    createBlockade(300);
    createBlockade(450);
    createBlockade(600);
    if (gameOver === false){
        window.requestAnimationFrame(draw);
    }
}


window.addEventListener('keydown',controller.keyListener);
window.addEventListener('keyup',controller.keyListener);
window.requestAnimationFrame(draw);
