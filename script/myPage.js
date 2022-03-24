let canvas,width,height,headerHeight,context,draw,mouseX,mouseY,dropList,dropID,main,header,aside,Scroller,opacityChanger,mainImages,mainHover,imageChangeTime,imageOpacity1,imageOpacity2,imageIntervalID;
let body = document.querySelector("body");
let mainSections = [];
let objects = [];
let imageList = [];
let imageChanging = false;
let imageNumber = 0;
let imageVisibleList = [];
let sectionCounter = 0;
let hover = false;
let imageTracker = 0;
let asideScroller = 0;
let stars = [];
let starCount = 100;
let starHover = false;
dropID = 'drop'+0;
main = document.querySelector("main");
aside = document.querySelector("aside");
mainSections = main.getElementsByTagName("section");
mainImages = main.getElementsByTagName("img");
let mainNavButtons = document.getElementById("mainNav").getElementsByTagName("a");
let gameNavSubOptions = document.getElementById("drop2").getElementsByTagName("a");
for (let mainNavSpecific = 0;mainNavSpecific < mainNavButtons.length;mainNavSpecific++){
    mainNavButtons[mainNavSpecific].addEventListener("mouseenter", function(){
        dropList = document.getElementById(dropID).style.display = "none";
        dropID = 'drop'+mainNavSpecific;
        dropList = document.getElementById(dropID).style.transition = ".5s";
        dropList = document.getElementById(dropID).style.display = "block";
        mainNavButtons[2].onclick = function navClickSpecifics(){
            localStorage.setItem('game',0);
        }
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
Math.random();



//STAR FUNCTIONS>>>
function createStars(numberOfStars){
    for(let starNumber = 0;starNumber < numberOfStars; starNumber++){
        stars.push({
            x:Math.floor((Math.random() * width) + 1),
            y:Math.floor((Math.random() * headerHeight) + 1),
            size:Math.floor((Math.random() * 3.5) + 1.5),
            dx:0,
            dy:0,
            direction:0
        })
    if (stars[starNumber].direction == 0){
        directionGiver(starNumber);
    }
//     stars[starNumber].size += .5;
    stars[starNumber].x += stars[starNumber].dx;
    stars[starNumber].y += stars[starNumber].dy;
    context.beginPath();
    context.arc(stars[starNumber].x,stars[starNumber].y,stars[starNumber].size, 0, 2 * Math.PI);
    context.shadowColor="white";
    context.shadowBlur = 20;
//     context.filter = 'blur(1px)';
    context.fill();
    context.stroke();
    }
}
function repeatStar(){
    for(let starChecker = 0;starChecker < stars.length; starChecker++){
        if ((stars[starChecker].y > headerHeight) || (stars[starChecker].y < 0) || (stars[starChecker].x > width) || (stars[starChecker].x < 0)){
        stars[starChecker].y = Math.floor((Math.random() * headerHeight*3/4) + headerHeight/4);
        stars[starChecker].x = Math.floor((Math.random() * width*3/4) + width/6);
        stars[starChecker].size = 1.5;
        }
    }
}

function directionGiver(chosenStar){
    if (stars[chosenStar].x < width/2){
        stars[chosenStar].dx = -.1 * Math.floor((Math.random() * 10) + 1);
    } else{
        stars[chosenStar].dx = .1 * Math.floor((Math.random() * 10) + 1);
    }
    if (stars[chosenStar].y < headerHeight/2){
        stars[chosenStar].dy = -.1 * Math.floor((Math.random() * 10) + 1);
    } else{
        stars[chosenStar].dy = .1 * Math.floor((Math.random() * 10) + 1);
    }
    stars[chosenStar].direction = 1;
}
function mousePosition(event){
    let rect = canvas.getBoundingClientRect();
        return{
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
}
//<<<STAR FUNCTIONS


for (let specificGame=0; specificGame < gameNavSubOptions.length; specificGame++){
    gameNavSubOptions[specificGame].onclick = function afunction(){
        localStorage.setItem('game',specificGame);
    }
}

function scrollCaller(sectionNo){
    sectionNo.style.transition = '.5s';
    sectionNo.style.opacity = '0.8';
    sectionNo.style.margin = 0;
    sectionCounter ++;
};
function scrollRemover(sectionNo){
    if (sectionCounter % 2 == 0){
        sectionNo.style.marginLeft = '100%';
    } else{
        sectionNo.style.marginRight = '100%';
    }
    sectionNo.style.opacity = '0';
    sectionCounter --;
}



function imageChanger(imageNumber){
    imageList[imageNumber].classList.remove('visible');
    if (imageNumber < imageList.length - 1){
        imageList[imageNumber+1].classList.add('visible');
    } else{
        imageList[0].classList.add('visible');
    }
    imageNumber += 1;
    if (imageNumber > imageList.length -1){
        imageNumber = 0;
    }

    imageChangeTime = setTimeout(function(){
            imageChanger(imageNumber);
        },5000);
}
mainHover = main.addEventListener("mouseover", function(){
    for (let n = 1;n < mainSections.length;n++){
        opacityChanger = mainSections[n].addEventListener("mouseover", function(){
            opacityChanger = mainSections[n].style.opacity = '1';
        });
        opacityChanger = mainSections[n].addEventListener("mouseenter", function(){
            imageList = mainSections[n].getElementsByTagName("img");
            if (imageChanging === false){
                imageChangeTime = setTimeout(function(){
                        imageChanger(imageNumber);
                    },2000);
                    imageChanging = true;
            }
        });
        opacityChanger = mainSections[n].addEventListener("mouseleave", function(){
            opacityChanger = mainSections[n].style.opacity = '0.8';
            imageNumber = 0;
            clearTimeout(imageChangeTime);
            imageChanging = false;
//             imageList[0].classList.remove('visible');
        });
    }
});


function scrollIn () {
    if (this.scrollY > 250 && sectionCounter < 1){
        scrollCaller(mainSections[1])
    }
    if (this.scrollY < 250 && sectionCounter > 0){
        scrollRemover(mainSections[1])
    }
    if (this.scrollY > 750 && sectionCounter < 2){
        scrollCaller(mainSections[2])
    }
    if (this.scrollY < 750 && sectionCounter > 1){
        scrollRemover(mainSections[2])
    }
    if (this.scrollY > 1250 && sectionCounter < 3){
        scrollCaller(mainSections[3])
    }
    if (this.scrollY < 1250 && sectionCounter > 2){
        scrollRemover(mainSections[3])
    }
    if (this.scrollY > 1750 && sectionCounter < 4){
        scrollCaller(mainSections[4])
    }
    if (this.scrollY < 1750 && sectionCounter > 3){
        scrollRemover(mainSections[4])
    }
//     if (this.scrollY > 500){
//         asideScroller +=.8;
//         aside.style.marginTop = asideScroller + "em";
//     }
//     if (this.scrollY > 1500){
//         aside.style.marginTop = "87.3em";
//     }
}




function createObjects(numberOfObjects){
    for(let objectNumber = 0;objectNumber < numberOfObjects; objectNumber++){
        objects.push({
            x:Math.floor((Math.random() * width) + 1),
            y:Math.floor((Math.random() * height) + 525),
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
        } else if (objects[objectChecker].y + objects[objectChecker].size < 525){
            objects[objectChecker].dy *= -1;
            objects[objectChecker].x = Math.floor((Math.random() * width) + 1);
        }
    }
}


draw = function(){
    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    width = canvas.width;
    height = canvas.height;
    headerHeight= 525;
    context.clearRect(0, 0, width, height);
    context.fillStyle ='white';
    createObjects(30);
    repeatObject();
    context.fillStyle ='#343b3d';
    context.fillRect(0,0,width,525);
//     canvas.onmousemove = function(evt){
//         let mouseXY = mousePosition(event);
//         mouseX = mouseXY.x;
//         mouseY = mouseXY.y;
//         starHover = true;
//     }
//     if (starHover == true){
//         for (let m = 0;m < stars.length; m++){
//             if (mouseX < stars[m].x + 30 && mouseX > stars[m].x - 30 && mouseY < stars[m].y + 30 && mouseY > stars[m].y - 30){
//                 if (stars[m].size < 3.5){
//                     stars[m].size += 1;
//                 }
//             }
//         }
//     }
//     context.fillStyle ='silver';
//     createStars(starCount);
//     repeatStar();
//     for (let l = 0;l < stars.length;l++)
//     if (stars[l].size > 1.5){
//         stars[l].size -= .5;
//     }
    window.requestAnimationFrame(draw);
}

window.addEventListener("scroll", scrollIn , false);
window.requestAnimationFrame(draw);
