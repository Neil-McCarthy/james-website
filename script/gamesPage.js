//GENERAL>>>
let canvas,width,height,context,draw,mouseX,mouseY,dropList,dropID,main,opacityChanger,mainImages,mainHover,imageOpacity1,imageOpacity2,imageIntervalID;
let body = document.querySelector("body");
let mainSections = [];
let objects = [];
let sectionCounter = 0;
let hover = false;
let imageTracker = 0;
dropID = 'drop'+0;
main = document.querySelector("main");
mainSections = main.getElementsByTagName("section");
mainImages = main.getElementsByTagName("img");
let gameNavSubOptions = document.getElementById("drop2").getElementsByTagName("a");
//<<GENERAL


//ALL GAME GENERAL>>>
let gamePlayer,controller,alienRowCalculator,scoreHeading,scoreHeadingValue,scoreTable,tableRow,tableHeader,tableHeaderValue,tableValue,tableValueValue,historyParagraph,keyBindingParagraph,historyContent,keyBindingContent;
let gameCanvas = document.getElementById('gameCanvas');
let gameContext = gameCanvas.getContext('2d');
let gameWidth = gameCanvas.width;
let gameHeight = gameCanvas.height;
//<<<ALL GAME GENERAL


//EXTRA GAME WINDOWS>>>
let scoreboard = document.getElementById("scoreboard");
let controls = document.getElementById("controls");
let screenLock = document.getElementById("screenLock");
let playerChanger = document.getElementById("playerChanger");
let screenLocked = false;
let pause = document.getElementById("pause");
let paused = false;
let gameHistory = document.getElementById("gameHistory");
let keyBindings = document.getElementById("keyBindings");

//SCREEN LOCK INSTRUCTION>>>
screenLock.onclick = function screenLocker(){
    if (screenLocked === false){
        body.style.height = '100vh';
        body.style.overflow = 'hidden';
        console.log(window.offsetTop);
        screenLocked = true;
    } else if (screenLocked === true){
        body.style.height = '';
        body.style.overflow = '';
        screenLocked = false;
    }
}
pause.onclick = function gamePauser(){
    if (paused == false){
        paused = true;
    } else{
        paused = false;
    }
    window.requestAnimationFrame(gamePlayer);
}
//<<<SCREEN LOCK INSTRUCTION


//<<<EXTRA GAME WINDOWS


//RESTART GAMES>>>
function gameRestart(gameSelected){
    if (gameOver === true){
        gameOver = false;
        window.requestAnimationFrame(gamePlayer);
    }
    while (scoreboard.childNodes.length > 2){
        scoreboard.removeChild(scoreboard.lastChild);
    }
    while (gameHistory.childNodes.length > 2){
        gameHistory.removeChild(gameHistory.lastChild);
    }
    while (keyBindings.childNodes.length > 2){
        keyBindings.removeChild(keyBindings.lastChild);
    }
    gameWindowUpdator(gameSelected);
    if (gameSelected == 0){
        alienXPos = 150;
        alienYPos = 100;
        alienSpeed = .35;
        player.x = gameWidth/2 - 5;
        player.y = gameHeight - 100;
        player.dx = 0;
        player.alive = true;
        aliens = [];
        alienShots = [];
        deadAliens = [];
        playerScore = document.getElementById('score');
        kills = 0;
        playerScore.appendChild(document.createTextNode(kills));
    }
}
//<<<RESTART GAMES





//GAME SELECTOR
for (let specificGame=0; specificGame < gameNavSubOptions.length; specificGame++){
    gameNavSubOptions[specificGame].onclick = function afunction(){
        localStorage.setItem('game',specificGame);
    }
}
///<<<GAME SELECTOR


//SCOREBOARD CREATOR>>>
function gameWindowUpdator(GameTable){
    if (GameTable == 0){
        tableHeaderValue = 'Aliens murdered:';
        historyContent = 'History of maliens';
        keyBindingContent = 'Press this button';
    }
    if (GameTable == 1){
        tableHeaderValue = 'BleepBloop';
        historyContent = 'Blistory of baliens';
        keyBindingContent = 'No that button';
    }
    if (GameTable == 2){
        tableHeaderValue = 'Skippy';
        historyContent = 'Skippies magic castle';
        keyBindingContent = 'Skipper!!!';
    }
    scoreTable = document.createElement('table');
    tableRow = document.createElement('tr');
    tableHeader = document.createElement('th');
    tableHeader.appendChild(document.createTextNode(tableHeaderValue));
    tableValue = document.createElement('td');
    tableValue.setAttribute('id','score');
    tableRow.appendChild(tableHeader);
    tableRow.appendChild(tableValue);
    scoreTable.appendChild(tableRow);
    scoreboard.appendChild(scoreTable);
    historyParagraph = document.createElement('p');
    historyParagraph.appendChild(document.createTextNode(historyContent));
    gameHistory.appendChild(historyParagraph);
    keyBindingParagraph = document.createElement('p');
    keyBindingParagraph.appendChild(document.createTextNode(keyBindingContent));
    keyBindings.appendChild(keyBindingParagraph);

}
//<<<SCOREBOARD CREATOR


//SCOREBOARD UPDATER>>>
function scoreTracker(){
    playerScore.removeChild(playerScore.firstChild);
    playerScore.appendChild(document.createTextNode(kills));
}
//<<<SCOREBOARD UPDATER


//SPACE INVADERS GENERAL>>>
let playerLastX,playerLastY;
let shooting = false;
let fired = false;
let aliens = [];
let deadAliens = [];
let alienXPos = 150;
let alienYPos = 100;
let alienSpeed = .35;
let alienShots = [];
let shotNumber = 0;
let blockades = [];
let blockadeBlock = 0
let blockadeCount = 0;
let blockStartPoint;
let kills = 0;
let flames = [];
let explosionSound = new Audio('../audio/Explosion11.m4a');
explosionSound.volume = .5;
let alienExplosion = new Audio('../audio/alienExplosion.wav');
alienExplosion.volume = .25;
let playerScore = document.getElementById('score');
let keyCodes;
let gameOver = false;
let alienShotDecider;
let player = {
    x:gameWidth/2 - 5,
    y:gameHeight - 100,
    dx:0,
    size:10,
    alive:true
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
//<<<SPACE INVADERS GENERAL


//SQUAREGAME GENERAL>>>
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
let squaresPlayer = {
    x:730,
    y:600,
    dx:0,
    dy:0,
    size:20,
    jumping:false
}
let finish = {
    x:800,
    y:360,
    size:40
}
//<<<SQUAREGAME GENERAL


//PONG GENERAL>>>
let pongRacketSound = new Audio('../audio/tennis2-SF.mp3');
let pongAI = false;
let pongAIDestination;
let pongAIDirection;
let pongAICounter = 0;
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
//<<<PONG GENERAL


//PONG - AI>>>
playerChanger.onclick = function playerChange(){
    if (pongAI === true){
        pongAI = false;
    } else{
        pongAI = true;
    }
}
//<<<PONG - AI

//PONG - AI PLAYER>>>
function AIPlayer(ballLocation){
    pongAICounter += 1;
    if (pongAICounter == 25){
        if (pongRightPlayer.y > pongBall.y - 100){
            pongAIDestination = Math.random() * (pongRightPlayer.y - (pongBall.y - 25)) + pongBall.y - 25;
            pongAIDirection = 'up'
        }
        if (pongRightPlayer.y < pongBall.y){
            pongAIDestination = Math.random() * (pongBall.y - (pongRightPlayer.y + 25)) + pongRightPlayer.y + 25;
            pongAIDirection = 'down'
        }
        pongAICounter = 0;
    }
    if (pongRightPlayer.y > pongAIDestination && pongAIDirection === 'up'){
        pongRightPlayer.dy -= 2.3;
    } else if (pongRightPlayer.y < pongAIDestination && pongAIDirection === 'down'){
        pongRightPlayer.dy += 2.3;
    }
}
//<<<PONG - AI PLAYER

//>>>SPACE INVADERS - REVIVE
function doSomething() {
   player.alive = true;
   flames.length = 0;
}
//<<<SPACE INVADERS - REVIVE

function createAliens(rowsOfAliens){
    alienRowCalculator = rowsOfAliens*10
    for(let alien = 0;alien < alienRowCalculator;alien++){
        aliens.push({
        x:alienXPos,
        y:alienYPos,
        size:20,
        dx:alienSpeed,
        alive:true
        })
        if (deadAliens.includes(alien)){
            aliens[alien].alive = false;
        }
        alienShots.push({
        x:alienXPos + aliens[alien].size/2 - 2.5,
        y:alienYPos + 10,
        size:5,
        fired:0,
        sent:0
        })
        aliens[alien].x += aliens[alien].dx;
        if (aliens[alien].x > gameWidth - 100 || aliens[alien].x < 100){
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
        gameContext.fillStyle ='yellow';
        if (alienShots[alien].fired == 1 && alienShots[alien].sent == 0 && aliens[alien].alive === true){
            alienShots[alien].x = aliens[alien].x + aliens[alien].size/2 - 2.5;
            alienShots[alien].y = alienYPos + 10;
            gameContext.fillRect(alienShots[alien].x,alienShots[alien].y,alienShots[alien].size,alienShots[alien].size*2);
            alienShots[alien].sent = 1;
        }
        if (alienShots[alien].fired == 1 && alienShots[alien].sent == 1 && aliens[alien].alive === true){
            alienShots[alien].y += 2;
            gameContext.fillRect(alienShots[alien].x,alienShots[alien].y,alienShots[alien].size,alienShots[alien].size*2);
        }
        if (collision(alienShots[alien],player,2)){
        }   else{
            localStorage.setItem('lastScore',kills);
            playerLastX = player.x;
            playerLastY = player.y;
            player.alive = false;
            player.x = gameWidth/2 - 5;
            explosionSound.play();
            setTimeout(doSomething, 3000);
//             window.alert('You have been murdered to death.')
        }
//         for (let m = 0;m < blockades.length;m++){
//             if (collision(alienShots[alien],blockades[m],2)){
//             }   else{
//                 reload('alien',alien);
//                 blockades[m].y = -100;
//             }
//             if (collision(shot,blockades[m],3)){
//             }   else{
//                 reload('player',0);
//                 blockades[m].y = -100;
//             }
//         }
        if (alienShots[alien].y > gameHeight){
            reload('alien',alien);
        }
        if (aliens[alien].y > 600){
            localStorage.setItem('lastScore',kills);
            gameOver = true;
            window.alert('The aliens have landed. Game over.')
        }
//         gameContext.fillRect(aliens[alien].x + aliens[alien].size/2 - 2.5,aliens[alien].y + 10,alienShots[alien].size,alienShots[alien].size*2);
        gameContext.fillStyle ='lime';
        if (aliens[alien].alive === true){
            gameContext.fillRect(aliens[alien].x,aliens[alien].y,aliens[alien].size,aliens[alien].size);
        }
        alienXPos += 50;
        if (aliens.length == 10 || aliens.length == 20 || aliens.length == 30 || aliens.length == 40){
            alienXPos = 150;
            alienYPos += 25;
        }
        if (collision(shot,aliens[alien],3)){
        } else {
            deadAliens.push(alien);
//             aliens[alien].alive === false;
            aliens[alien].size = 0;
            aliens[alien].x = 400;
            aliens[alien].y = -50;
            alienShots[alien].size = 0;
            reload('player',0);
            kills += 1;
            scoreTracker();
            alienExplosion.play();
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
/*
function explosion(explosionX,explosionY){
    flames = Math.floor(Math.random() * 6) + 3;
    gameContext.fillStyle ='orange';
    for(let flame = 0;flame < flames;flame++){
        gameContext.fillRect(explosionX,explosionY,2.5,2.5);
    }
}*/
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

//SPACE INVEDERS - CREATE BLOCKADE>>>
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
        gameContext.fillRect(blockades[blockadeBlock].x,blockades[blockadeBlock].y,blockades[blockadeBlock].size,blockades[blockadeBlock].size);
    }
}
//<<<SPACE INVEDERS - CREATE BLOCKADE


//SQUAREGAME - PLATFORMS>>>
function platforms(xPosition,yPosition,wide,tall){
    platform.push(
        {
        x:xPosition,
        y:yPosition,
        dx:0,
        dy:0,
        width:wide,
        height:tall
        }
    );
    gameContext.fillRect(platform[platformNumber].x,platform[platformNumber].y,platform[platformNumber].width,platform[platformNumber].height);
    platformNumber += 1;
}
//<<<SQUAREGAME - PLATFORMS


//SQUAREGAME - ENEMIES>>>
function enemyCreator(xPosition,yPosition,size){
    enemy.push(
        {
        x:xPosition,
        y:yPosition,
        dx:0,
        dy:0,
        size:size
        }
    );
    enemyNumber += 1;
}

function enemyDraw(enemyNumber){
    gameContext.fillRect(enemy[enemyNumber].x,enemy[enemyNumber].y,enemy[enemyNumber].size,enemy[enemyNumber].size);

}
//<<<SQUAREGAME - ENEMIES

let jumpActive = false;
//SQUAREGAME - ENEMY JUMP>>>
function enemyJump(n){
    setTimeout(function(){
        enemy[n].dy -= 25;
        jumpActive = false;
    }, 1000);
}
//<<<SQUAREGAME - ENEMY JUMP


//>>>SQUAREGAME - JUMP DELAY
// function jumpDelay(){
//     setTimeout(() =>{
//         squaresPlayer.jumping = false;
//     },1000);
// }

//<<<SQUAREGAME - JUMP DELAY

//ACTIVATE KEYS>>>
controller = {
    left:false,
    right:false,
    keyListener:function(event){
        let key_state = (event.type == 'keydown')?true:false;

        switch(event.keyCode){
            case 37:
                controller.left = key_state;
            break;
            case 38:
                controller.up = key_state;
                squaresPlayer.jumping = true;
            break;
            case 39:
                controller.right = key_state;
            break;
            case 40:
                controller.down = key_state;
            break
            case 32:
                controller.shoot = key_state;
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
//<<<ACTIVATE KEYS

//MAIN NAV SELECTOR>>>
let mainNavButtons = document.getElementById("mainNav").getElementsByTagName("li");
for (let mainNavSpecific = 0;mainNavSpecific < mainNavButtons.length;mainNavSpecific++){
    mainNavButtons[mainNavSpecific].addEventListener("mouseenter", function(){
        dropList = document.getElementById(dropID).style.display = "none";
        dropID = 'drop'+mainNavSpecific;
        dropList = document.getElementById(dropID).style.transition = ".5s";
        dropList = document.getElementById(dropID).style.display = "block";
        mainNavButtons[mainNavSpecific].addEventListener("mouseleave", function(){
            dropList = document.getElementById(dropID).addEventListener("mouseenter", function(){
                hover = true;
            });
            dropList = document.getElementById(dropID).addEventListener("mouseleave", function(){
                hover = false;
                dropList = document.getElementById(dropID).style.display = "none";

            });
            setTimeout(function(){
                if (hover === false){
                    dropList = document.getElementById(dropID).style.display = "none";
            }
            },.001);
        });
    }, false);
}
//<<<MAIN NAV SELECTOR

//GAME SELECTOR NAV>>>
let gameNav = document.getElementById("gameOptions").getElementsByTagName("button");
let gameNavClicked;
let flippy = 0;
for (let gameNavSpecific = 0;gameNavSpecific < gameNav.length;gameNavSpecific++){
    gameNav[gameNavSpecific].addEventListener("mouseenter", function(){
        gameNav[gameNavSpecific].style.background = 'black';
        gameNav[gameNavSpecific].onclick = function gameNavClick() {
            localStorage.setItem('game',gameNavSpecific);
            console.log(gameNavSpecific);
            gameRestart(gameNavSpecific);
            gameNav[flippy].style.background = 'silver';
            gameNav[gameNavSpecific].style.background = 'whitesmoke';
            flippy = gameNavSpecific;
        }
//             for (let gameNavCorrector = 0;gameNavCorrector < gameNav.length;gameNavCorrector++){
//                 console.log(gameNavSpecific, gameNavCorrector);
//                 if (gameNavSpecific == gameNavCorrector){
//                     gameNav[gameNavSpecific].style.background = '#e0c9ab';
//                 }
//                 gameNavClicked = gameNavSpecific;
//             }
//         }
        gameNav[gameNavSpecific].addEventListener("mouseleave", function(){
            if (gameNavSpecific != flippy){
                gameNav[gameNavSpecific].style.background = 'silver';
            }
        });

    }, false);
}
//<<<GAME SELECTOR NAV

// Math.random();

//BACKGROUND CANVAS ANIMATION>>>
function createObjects(numberOfObjects){
    for(let objectNumber = 0;objectNumber < numberOfObjects; objectNumber++){
        objects.push({
            x:Math.floor((Math.random() * width) + 1),
            y:Math.floor((Math.random() * height) + 1),
            size:Math.floor((Math.random() * 30) + 20),
            dy:1 * (Math.round(Math.random()) ? 1 : -1)
        }
    )
//     objects[objectNumber].dy = 1;
    objects[objectNumber].y += objects[objectNumber].dy;
    context.beginPath();
    context.arc(objects[objectNumber].x,objects[objectNumber].y,objects[objectNumber].size, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
    }
}

function repeatObject(){
    for(let objectChecker = 0;objectChecker < objects.length; objectChecker++){
        if (objects[objectChecker].y > height + objects[objectChecker].size){
            objects[objectChecker].dy *= -1;
            objects[objectChecker].x = Math.floor((Math.random() * width) + 1);
        } else if (objects[objectChecker].y + objects[objectChecker].size < 0){
            objects[objectChecker].dy *= -1;
            objects[objectChecker].x = Math.floor((Math.random() * width) + 1);
        }
    }
}

//<<<BACKGROUND CANVAS ANIMATION


function platformCollision(){
    for (let specificPlatform = 0;specificPlatform < platform.length; specificPlatform++){
        if (squaresPlayer.x + squaresPlayer.size < platform[specificPlatform].x ||
            platform[specificPlatform].x + platform[specificPlatform].width < squaresPlayer.x ||
            squaresPlayer.y > platform[specificPlatform].y + platform[specificPlatform].height ||
            platform[specificPlatform].y > squaresPlayer.y + squaresPlayer.size){
        } else {
            platformID = specificPlatform;
            return [true, platformID];
        }
    }

}


draw = function(){
    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
    context.clearRect(0, 0, width, height);
    context.fillStyle ='white';
    createObjects(30);
    repeatObject();
    window.requestAnimationFrame(draw);
}
gamePlayer = function(){
    if (paused == false){
        if (localStorage.getItem('game') == 0){
            gameContext.clearRect(0, 0, gameWidth, gameHeight);
            if (player.alive){
                if (controller.left){
                    player.dx -= 1.5;
                }
                if (controller.right){
                    player.dx += 1.5;
                }
                if (controller.up){
                    shooting = true;
                }
                if (player.x < 0){
                    player.x = 0;
                }
                if (player.x + player.size*3 >= gameWidth){
                    player.x = gameWidth-player.size*3;
                }
                player.x += player.dx;
                player.dx *= .8;
            }
            if (player.alive === false){
                gameContext.fillStyle ='orange';
                for(let flame = 0;flame < 4;flame++){
                    flames.push({
                        x:playerLastX,
                        y:playerLastY,
                        size:5,
                        dx:Math.floor((Math.random() * 8) + 1) * (Math.round(Math.random()) ? 1 : -1),
                        dy:-15
                    })
                gameContext.fillRect(flames[flame].x,flames[flame].y,flames[flame].size,flames[flame].size);
                flames[flame].x += flames[flame].dx;
                flames[flame].dx *= .8;
                flames[flame].y += flames[flame].dy;
                flames[flame].dy *= .8;
                flames[flame].dy += 1.25;
                if (flames[flame].y + flames[flame].size > player.y + player.size){
                    flames[flame].y = player.y + player.size - flames[flame].size;
                }
                }
            }
            if (shot.y < - shot.size*3){
                reload('player',0);
            }
            gameContext.fillStyle ='yellow';
            if (shooting === false && player.alive){
                gameContext.fillRect(player.x + player.size*1.5 - 1.75,player.y - player.size,shot.size,shot.size*3);
            } else if (shooting === true && fired === false){
                shot.x = player.x + player.size*1.5 - 1.75
                shot.y = player.y - player.size;
                gameContext.fillRect(shot.x,shot.y,shot.size,shot.size*3);
                fired = true;
            } else if (shooting === true && fired === true){
                shot.y += shot.dy;
                gameContext.fillRect(shot.x,shot.y,shot.size,shot.size*3);
            }
            if (player.alive){
                gameContext.fillStyle ='red';
                gameContext.fillRect(player.x, player.y, player.size*3, player.size);
                gameContext.fillRect(player.x + player.size*1.5 - 2.5,player.y - player.size, shooter.size, shooter.size*3);
            }
            gameContext.fillStyle = 'red';
            createBlockade(150);
            createBlockade(350);
            createBlockade(550);
            createBlockade(750);
            gameContext.fillStyle = 'lime';
            createAliens(4);
            gameContext.beginPath();
            gameContext.moveTo(0, player.y + player.size);
            gameContext.lineTo(gameWidth, player.y + player.size);
            gameContext.strokeStyle = 'yellow';
            gameContext.stroke();
        } else if (localStorage.getItem('game') == 1){
            if (controller.up && squaresPlayer.jumping == false){
            squaresPlayer.dy -= 30;
            squaresPlayer.jumping = true;
            }
            if (controller.left){
                squaresPlayer.dx -= 2.3;
            }
            if (controller.right){
                squaresPlayer.dx += 2.3;
            }
            squaresPlayer.dy += 2;
            squaresPlayer.x += squaresPlayer.dx;
            squaresPlayer.y += squaresPlayer.dy;
            squaresPlayer.dx *= .7;
            squaresPlayer.dy *= .9;
            scrollPosition *= .7;
            if (squaresPlayer.y > gameHeight - 200 - squaresPlayer.size){
                squaresPlayer.y = gameHeight - 200 - squaresPlayer.size;
                squaresPlayer.dy = 0;
                squaresPlayer.jumping = false;
            }
            if (squaresPlayer.x < 0){
                squaresPlayer.dx *= -.8;
                squaresPlayer.x = 0;
            }
            if (squaresPlayer.x + squaresPlayer.size >= gameWidth){
                squaresPlayer.dx *= -.8;
                squaresPlayer.x = gameWidth-squaresPlayer.size;
            }

            gameCanvas = document.getElementById('gameCanvas');
            gameContext = gameCanvas.getContext('2d');
            gameWidth = gameCanvas.width;
            gameHeight = gameCanvas.height;
            gameContext.clearRect(0, 0, gameWidth, gameHeight);
            gameContext.fillStyle ='yellow';
            platforms(200,550,60,10);
            platforms(280,500,60,10);
            platforms(360,450,60,10);
            platforms(440,400,400,10);
            platforms(100,500,60,100);
            gameContext.fillStyle='cyan';
            enemyCreator(280,580,20);
            enemyCreator(400,500,20);
            enemyDraw(0);
            enemyDraw(1);
            gameContext.fillStyle ='lime';
            gameContext.fillRect(finish.x, finish.y, finish.size, finish.size);
            gameContext.fillStyle ='red';
            gameContext.fillRect(squaresPlayer.x, squaresPlayer.y, squaresPlayer.size, squaresPlayer.size);
            gameContext.beginPath();
            gameContext.moveTo(0, 601);
            gameContext.lineTo(gameWidth, 601);
            gameContext.strokeStyle = 'yellow';
            gameContext.stroke();
            enemy[0].dy += .5;
            enemy[0].dy *= .9;
            enemy[0].y += enemy[0].dy;
            if (enemy[0].y > gameHeight - 200 - enemy[0].size){
                enemy[0].y = gameHeight - 200 - enemy[0].size;
                if (jumpActive == false){
                    enemyJump(0);
                    jumpActive = true;
                }
            }
            if (platformCollision()){
                if (squaresPlayer.y < platform[platformID].y && squaresPlayer.x + squaresPlayer.size > platform[platformID].x && squaresPlayer.x < platform[platformID].x + platform[platformID].width){
                    squaresPlayer.dy = 0;
                    squaresPlayer.y = platform[platformID].y - squaresPlayer.size;
                    squaresPlayer.jumping = false;
                }  else if (squaresPlayer.x < platform[platformID].x && squaresPlayer.y + squaresPlayer.size > platform[platformID].y && squaresPlayer.y < platform[platformID].y + platform[platformID].height){
                    squaresPlayer.dx *= -.8;
                    squaresPlayer.x = platform[platformID].x - squaresPlayer.size;
                    squaresPlayer.jumping = true;
                } else if (squaresPlayer.x + squaresPlayer.size > platform[platformID].x + platform[platformID].width &&  squaresPlayer.y + squaresPlayer.size > platform[platformID].y && squaresPlayer.y < platform[platformID].y + platform[platformID].height){
                    squaresPlayer.dx *= -.8;
                    squaresPlayer.x = platform[platformID].x + platform[platformID].width;
                    squaresPlayer.jumping = true;
                } else if (squaresPlayer.y > platform[platformID].y && squaresPlayer.x + squaresPlayer.size > platform[platformID].x && squaresPlayer.x < platform[platformID].x + platform[platformID].width){
                    squaresPlayer.dy *= -.2;
                    squaresPlayer.y = platform[platformID].y + platform[platformID].height;
                    squaresPlayer.jumping = true;
                }
            }
            for (let specificEnemy = 0;specificEnemy < enemy.length; specificEnemy++){
                if (collision(squaresPlayer,enemy[specificEnemy],1) && playing){
                } else {
                    squaresPlayer = {
                        x:730,
                        y:600,
                        dx:0,
                        dy:0,
                        size:20,
                        jumping:false
                    }
                }
            }
//             if (squaresPlayer.x > finish.x && squaresPlayer.x + squaresPlayer.size < finish.x + finish.size && squaresPlayer.y > finish.y && squaresPlayer.y + squaresPlayer.size < finish.y + finish.size + 1 && playing){
//                 playing = false;
//             }
        } else if (localStorage.getItem('game') == 2){
            if (controller.secondaryUp){
                pongLeftPlayer.dy -= 2.3;
            }
            if (controller.secondaryDown){
                pongLeftPlayer.dy += 2.3;
            }
            if (pongAI === false){
                if (controller.up){
                    pongRightPlayer.dy -= 2.3;
                }
                if (controller.down){
                    pongRightPlayer.dy += 2.3;
                }
            } else{
                AIPlayer();
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
                pongRacketSound.play();
            }
            if (collision(pongRightPlayer,pongBall,10)){
            } else{
                pongBall.x = pongRightPlayer.x - pongBall.size - 1;
                pongBall.dx *= -1.1;
                pongRacketSound.play();
            }
            gameContext.clearRect(0, 0, gameWidth, gameHeight);
            gameContext.fillStyle ='yellow';
            gameContext.fillRect(pongLeftPlayer.x, pongLeftPlayer.y, pongLeftPlayer.size, pongLeftPlayer.size*10);
            gameContext.fillRect(pongRightPlayer.x, pongRightPlayer.y, pongRightPlayer.size, pongRightPlayer.size*10);
            gameContext.fillRect(pongBall.x, pongBall.y, pongBall.size, pongBall.size);
        }
        if (gameOver === false){
                window.requestAnimationFrame(gamePlayer);
        }
    }
}
window.requestAnimationFrame(draw);
window.requestAnimationFrame(gamePlayer);
window.addEventListener('keydown',controller.keyListener);
window.addEventListener('keyup',controller.keyListener);
