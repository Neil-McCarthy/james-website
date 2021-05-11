let pageSelector = document.getElementsByTagName('main')[0].id;
let popImageSelector = document.getElementsByClassName('popImage');
let imageID
let specificImageString='';


for (let specificImageNumber=0; specificImageNumber < popImageSelector.length; specificImageNumber++){
    popImageSelector[specificImageNumber].onclick = function(){
        imageID = specificImageNumber;
        thisFunction()
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
    specificImageString = imageID.toString();
    let fileType = '.jpg'
    if (pageSelector == 'edging'){
        fileType = '.jpeg'
    }
    console.log('../../images/projects/'+pageSelector+'/'+pageSelector+specificImageString+fileType);
    newImage.src = '../../images/projects/'+pageSelector+'/'+pageSelector+specificImageString+fileType;
    if ((pageSelector == 'edging' && imageID == 0) || (pageSelector == 'edging' && imageID == 1) || (pageSelector == 'edging' && imageID == 3) || (pageSelector == 'edging' && imageID == 4)){
        newImage.setAttribute('id','popImageVertical');
    } else if (pageSelector == 'edging' && imageID == 2){
        newImage.setAttribute('id','popImageHorizontal');
    };
    imgViewBox.appendChild(newImage);
    newDiv.appendChild(imgViewBox);
    let element = document.getElementsByTagName('body')[0];
    element.appendChild(newDiv);
};
