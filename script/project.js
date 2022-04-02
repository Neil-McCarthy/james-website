let body = document.querySelector("body");
let main = document.querySelector("main");
let projectImageCollector = main.getElementsByTagName('img');
let projectParagraphCollector = main.getElementsByTagName('p');
let rowCounter = 2;
let selectImage;
let backgroundCoverDiv = document.createElement('div');
backgroundCoverDiv.setAttribute('id','backgroundCoverDiv');
let focusImageSection = document.createElement('section');
focusImageSection.setAttribute('id','focusImageSection');
let focusImageH1= document.createElement('h1');
let focusImageImg = document.createElement('img');
let productDisplayOptionSpan = document.createElement('span');
productDisplayOptionSpan.appendChild(document.createTextNode('X'));
let arrowLeft = document.createElement('span');
arrowLeft.setAttribute('id','arrowLeft');
arrowLeft.appendChild(document.createTextNode('<'));
let arrowRight = document.createElement('span');
arrowRight.setAttribute('id','arrowRight');
arrowRight.appendChild(document.createTextNode('>'));
focusImageSection.appendChild(productDisplayOptionSpan);
focusImageSection.appendChild(focusImageH1);


for(let specificParagraph = 0;specificParagraph < projectParagraphCollector.length;specificParagraph++){
    if (specificParagraph % 2 == 0){
        projectParagraphCollector[specificParagraph].style.gridRowStart = rowCounter.toString();
        projectParagraphCollector[specificParagraph].style.gridColumnStart = '1';
        projectParagraphCollector[specificParagraph].style.gridColumnEnd= '3';
    } else{
        projectParagraphCollector[specificParagraph].style.gridRowStart = rowCounter.toString();
        projectParagraphCollector[specificParagraph].style.gridColumnStart = '2';
        projectParagraphCollector[specificParagraph].style.gridColumnEnd= '4';
    }
    if (specificParagraph == projectParagraphCollector.length - 1){
        projectParagraphCollector[specificParagraph].style.gridColumnStart = '1';
    }
    rowCounter++;
}

for (let specificImage=0; specificImage < projectImageCollector.length; specificImage++){
    projectImageCollector[specificImage].onclick =()=>{
        console.log(projectImageCollector[specificImage].height);
        selectImage = specificImage;
        dimensionCorrector()
        focusImageH1.appendChild(document.createTextNode('Heading'));
        focusImageImg.setAttribute('src',projectImageCollector[specificImage].src);
        focusImageSection.appendChild(focusImageImg);
        body.appendChild(focusImageSection);
        body.appendChild(backgroundCoverDiv);
        if(selectImage != 0){
            body.appendChild(arrowLeft);
        }
        if(selectImage != projectImageCollector.length -1){
            body.appendChild(arrowRight);
        }
    }
}



function dimensionCorrector(){
    if (projectImageCollector[selectImage].width < projectImageCollector[selectImage].height){
        focusImageImg.style.height = '45%';
        focusImageImg.style.width = 'auto';
    } else if (projectImageCollector[selectImage].width > projectImageCollector[selectImage].height){
        focusImageImg.style.height = 'auto';
        focusImageImg.style.width = '80%';
    }
}
arrowLeft.onclick =()=>{
    if(selectImage != 0){
        selectImage--;
        focusImageImg.setAttribute('src',projectImageCollector[selectImage].src);
        dimensionCorrector()
    }
    if(selectImage == 0){
        arrowLeft.parentNode.removeChild(arrowLeft);
    }
    if(selectImage == projectImageCollector.length - 2){
        body.appendChild(arrowRight);
    }
}
arrowRight.onclick =()=>{
    if(selectImage != projectImageCollector.length -1){
        selectImage++;
        focusImageImg.setAttribute('src',projectImageCollector[selectImage].src);
        dimensionCorrector()
    }
    if(selectImage == projectImageCollector.length -1){
        arrowRight.parentNode.removeChild(arrowRight);
    }
    if(selectImage == 1){
        body.appendChild(arrowLeft);
    }
}
productDisplayOptionSpan.onclick = function() {
    clearAll();
}
window.onclick = function(event) {
  if (event.target == backgroundCoverDiv) {
      clearAll();
  }
}

function clearAll(){
    while(focusImageH1.firstChild){
        focusImageH1.removeChild(focusImageH1.firstChild);
    }
    focusImageSection.parentNode.removeChild(focusImageSection);
    backgroundCoverDiv.parentNode.removeChild(backgroundCoverDiv);
    if(selectImage != projectImageCollector.length -1){
        arrowRight.parentNode.removeChild(arrowRight);
    }
    if(selectImage != 0){
        arrowLeft.parentNode.removeChild(arrowLeft);
    }
}


// window.onload = (event) => {
//     structureImgAndP();
// }
