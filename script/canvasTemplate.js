let canvas,width,height,context,draw,mouseX,mouseY;
let objects = [];
let objectCount = 100;
let hover = false;

Math.random();

function createObjects(numberOfObjects){
    for(let objectNumber = 0;objectNumber < numberOfObjects; objectNumber++){
        objects.push({
            x:Math.floor((Math.random() * width) + 1),
            y:Math.floor((Math.random() * height) + 1),
            size:Math.floor((Math.random() * 3.5) + 1.5),
            dx:0,
            dy:0,
            direction:0
        })
    if (objects[objectNumber].direction == 0){
        directionGiver(objectNumber);
    }
//     objects[objectNumber].size += .5;
    objects[objectNumber].x += objects[objectNumber].dx;
    objects[objectNumber].y += objects[objectNumber].dy;
    context.beginPath();
    context.arc(objects[objectNumber].x,objects[objectNumber].y,objects[objectNumber].size, 0, 2 * Math.PI);
    context.shadowColor="white";
    context.shadowBlur = 20;
//     context.filter = 'blur(1px)';
    context.fill();
    context.stroke();
    }
}

function repeatObject(){
    for(let objectChecker = 0;objectChecker < objects.length; objectChecker++){
        if ((objects[objectChecker].y > height) || (objects[objectChecker].y < 0) || (objects[objectChecker].x > width) || (objects[objectChecker].x < 0)){
        objects[objectChecker].y = Math.floor((Math.random() * height*3/4) + height/4);
        objects[objectChecker].x = Math.floor((Math.random() * width*3/4) + width/4);
        objects[objectChecker].size = 1.5;
        }
    }
}

function directionGiver(chosenObject){
    if (objects[chosenObject].x < width/2){
        objects[chosenObject].dx = -.1 * Math.floor((Math.random() * 10) + 1);
    } else{
        objects[chosenObject].dx = .1 * Math.floor((Math.random() * 10) + 1);
    }
    if (objects[chosenObject].y < height/2){
        objects[chosenObject].dy = -.1 * Math.floor((Math.random() * 10) + 1);
    } else{
        objects[chosenObject].dy = .1 * Math.floor((Math.random() * 10) + 1);
    }
    objects[chosenObject].direction = 1;
}
function mousePosition(event){
    let rect = canvas.getBoundingClientRect();
        return{
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
}
draw = function(){
    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
    context.clearRect(0, 0, width, height);
    canvas.onmousemove = function(evt){
        let mouseXY = mousePosition(event);
        mouseX = mouseXY.x;
        mouseY = mouseXY.y;
        hover = true;
    }
    if (hover == true){
        for (let m = 0;m < objects.length; m++){
            if (mouseX < objects[m].x + 30 && mouseX > objects[m].x - 30 && mouseY < objects[m].y + 30 && mouseY > objects[m].y - 30){
                if (objects[m].size < 3.5){
                    objects[m].size += 1;
                }
            }
        }
    }
    context.fillStyle ='white';
    createObjects(objectCount);
    repeatObject();
    for (let l = 0;l < objects.length;l++)
    if (objects[l].size > 1.5){
                    objects[l].size -= .5;
                }
    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);
