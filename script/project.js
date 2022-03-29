let pageSelector = document.getElementsByTagName('main')[0].id;
let popImageSelector = document.getElementsByClassName('popImage');
let imageID
let specificImageString='';

let body = document.querySelector("body");
let main = document.querySelector("main");
let projectImageCollector = main.getElementsByTagName('img');

let backgroundCoverDiv = document.createElement('div');
backgroundCoverDiv.setAttribute('id','backgroundCoverDiv');
let focusImageSection = document.createElement('section');
focusImageSection.setAttribute('id','focusImageSection');
let focusImageImg = document.createElement('img');


// for (let specificImageNumber=0; specificImageNumber < popImageSelector.length; specificImageNumber++){
//     popImageSelector[specificImageNumber].onclick = function(){
//         imageID = specificImageNumber;
//         thisFunction()
//     }
// }

function zoomImage(imageSelected){

}
for (let specificImage=0; specificImage < projectImageCollector.length; specificImage++){
    projectImageCollector[specificImage].onclick =()=>{
        focusImageImg.setAttribute('src',projectImageCollector[specificImage].src);
        focusImageSection.appendChild(focusImageImg);
        body.appendChild(focusImageSection);
        body.appendChild(backgroundCoverDiv);
    }
}

let newDiv = document.createElement('div');
newDiv.setAttribute('id','newDiv');
let imgViewBox = document.createElement('div');
imgViewBox.setAttribute('id','imgViewBox');
let newImage = document.createElement('img');
let arrowLeft = document.createElement('span');
arrowLeft.setAttribute('id','arrowLeft');
arrowLeft.appendChild(document.createTextNode('<'));
let arrowRight = document.createElement('span');
arrowRight.setAttribute('id','arrowRight');
arrowRight.appendChild(document.createTextNode('>'));
imgViewBox.appendChild(arrowLeft);
imgViewBox.appendChild(arrowRight);


arrowLeft.addEventListener('click', event=>{
    if (imageID > 0){
        imageID--;
        thisFunction()
    }
});
arrowRight.addEventListener('click', event=>{
    if (imageID < popImageSelector.length - 1){
        imageID++;
        thisFunction()
    }
});


window.onclick = function(event) {
  if (event.target == newDiv) {;
      newDiv.remove();
  }
}


function thisFunction(){
    console.log('here');
    specificImageString = imageID.toString();
    let fileType = '.jpg'
    if ((pageSelector == 'edging')||(pageSelector == 'treeRemovalHouse' && imageID == 6)){
        fileType = '.jpeg'
    }
    if (pageSelector == 'treeRemovalHouse'){
        newImage.src = '../../images/projects/clearing/house/'+pageSelector+specificImageString+fileType;
    } else{
        newImage.src = '../../images/projects/'+pageSelector+'/'+pageSelector+specificImageString+fileType;
    }
    if ((pageSelector == 'edging' && imageID == 0) || (pageSelector == 'edging' && imageID == 1) || (pageSelector == 'edging' && imageID == 3) || (pageSelector == 'edging' && imageID == 4) || (pageSelector == 'raisedBed' && imageID == 3) || (pageSelector == 'treeRemovalHouse' && imageID == 2)){
        newImage.setAttribute('id','popImageVertical');
    } else if ((pageSelector == 'edging' && imageID == 2) || (pageSelector == 'raisedBed' && imageID == 0) || (pageSelector == 'raisedBed' && imageID == 1) || (pageSelector == 'raisedBed' && imageID == 2) || (pageSelector == 'raisedBed' && imageID == 4) || (pageSelector == 'treeRemovalHouse' && imageID == 0) || (pageSelector == 'treeRemovalHouse' && imageID == 1) || (pageSelector == 'treeRemovalHouse' && imageID == 3) || (pageSelector == 'treeRemovalHouse' && imageID == 4) || (pageSelector == 'treeRemovalHouse' && imageID == 5) || (pageSelector == 'treeRemovalHouse' && imageID == 6) || (pageSelector == 'treeRemovalHouse' && imageID == 7) || (pageSelector == 'treeRemovalHouse' && imageID == 8)){
        newImage.setAttribute('id','popImageHorizontal');
    }/* else if ((pageSelector == 'raisedBed' && imageID == 0) || (pageSelector == 'raisedBed' && imageID == 1) || (pageSelector == 'raisedBed' && imageID == 2) || (pageSelector == 'raisedBed' && imageID == 4)){
        newImage.setAttribute('id','popImageHorizontal');
    } else if (pageSelector == 'raisedBed' && imageID == 3){
        newImage.setAttribute('id','popImageVertical');
    }*/
    imgViewBox.appendChild(newImage);
    newDiv.appendChild(imgViewBox);
    let element = document.getElementsByTagName('body')[0];
    element.appendChild(newDiv);
};
