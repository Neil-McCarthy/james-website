let buttonSelector = document.getElementsByClassName('checkoutButton');
let buttonNumber
let buttonID
let specificButtonString='';


for (let specificButtonNumber=0; specificButtonNumber < buttonSelector.length; specificButtonNumber++){
    buttonSelector[specificButtonNumber].onclick = function(){
        buttonNumber = specificButtonNumber;
        buttonID = buttonSelector[specificButtonNumber].id;
        thisFunction()
    }
}

let newDiv = document.createElement('div');
newDiv.setAttribute('id','newDiv');

let contentBox = document.createElement('div');
contentBox.setAttribute('id','contentBox');

let contentBoxh1 = document.createElement('h1');
contentBoxh1.setAttribute('id','contentBoxh1');

let contentBoxp = document.createElement('p');
contentBoxp.setAttribute('id','contentBoxp');

let contentBoxspan = document.createElement('span');
contentBoxspan.appendChild(document.createTextNode('X'));
contentBoxspan.setAttribute('id','contentBoxspan');
contentBox.appendChild(contentBoxspan);


let contentBoxform = document.createElement('form');
contentBoxform.setAttribute('id','contentBoxform');
contentBoxform.action = '/checkout.html';
let input = document.createElement('input');
input.type = 'submit';
input.value = 'Book Now!'


contentBoxspan.onclick = function() {
    newDiv.remove();
    clearAll();
}
window.onclick = function(event) {
    if (event.target == newDiv) {;
        newDiv.remove();
        clearAll();
    }
}
function clearAll(){
    while (contentBoxp.firstChild){
        contentBoxp.removeChild(contentBoxp.firstChild);
    }
    while (contentBoxh1.firstChild){
        contentBoxh1.removeChild(contentBoxh1.firstChild);
    }
}
function thisFunction(){
    localStorage.setItem('input',buttonNumber);
    if (buttonNumber === 0){
        contentBoxp.appendChild(document.createTextNode('Our small jobs are ideal for smaller gardens that just need a little touch up. Grass cutting, hedge clipping, weed pulling. James will see to it that any imperfections will be perfected and anything unwanted can be rooted out. A job like this would ideally be done in a mornings work and would cost you around X amount. If this type of jub would suit you then click on through to see contact details for booking.'));
    }
    if (buttonNumber === 1){
        contentBoxp.appendChild(document.createTextNode('Our small jobs are ideal for smaller gardens that just need a little touch up. Grass cutting, hedge clipping, weed pulling. James will see to it that any imperfections will be perfected and anything unwanted can be rooted out. A job like this would ideally be done in a mornings work and would cost you around X amount. If this type of jub would suit you then click on through to see contact details for booking.'));
    }
    if (buttonNumber === 2){
        contentBoxp.appendChild(document.createTextNode('Our small jobs are ideal for smaller gardens that just need a little touch up. Grass cutting, hedge clipping, weed pulling. James will see to it that any imperfections will be perfected and anything unwanted can be rooted out. A job like this would ideally be done in a mornings work and would cost you around X amount. If this type of jub would suit you then click on through to see contact details for booking.'));
    }
    if (buttonNumber === 3){
        contentBoxp.appendChild(document.createTextNode('Our small jobs are ideal for smaller gardens that just need a little touch up. Grass cutting, hedge clipping, weed pulling. James will see to it that any imperfections will be perfected and anything unwanted can be rooted out. A job like this would ideally be done in a mornings work and would cost you around X amount. If this type of jub would suit you then click on through to see contact details for booking.'));
    }
    if (buttonNumber === 4){
        contentBoxp.appendChild(document.createTextNode('Our small jobs are ideal for smaller gardens that just need a little touch up. Grass cutting, hedge clipping, weed pulling. James will see to it that any imperfections will be perfected and anything unwanted can be rooted out. A job like this would ideally be done in a mornings work and would cost you around X amount. If this type of jub would suit you then click on through to see contact details for booking.'));
    }
    if (buttonNumber === 5){
        contentBoxp.appendChild(document.createTextNode('Our small jobs are ideal for smaller gardens that just need a little touch up. Grass cutting, hedge clipping, weed pulling. James will see to it that any imperfections will be perfected and anything unwanted can be rooted out. A job like this would ideally be done in a mornings work and would cost you around X amount. If this type of jub would suit you then click on through to see contact details for booking.'));
    }
    if (buttonNumber === 6){
        contentBoxp.appendChild(document.createTextNode('Our small jobs are ideal for smaller gardens that just need a little touch up. Grass cutting, hedge clipping, weed pulling. James will see to it that any imperfections will be perfected and anything unwanted can be rooted out. A job like this would ideally be done in a mornings work and would cost you around X amount. If this type of jub would suit you then click on through to see contact details for booking.'));
    }
    if (buttonNumber === 7){
        contentBoxp.appendChild(document.createTextNode('Our small jobs are ideal for smaller gardens that just need a little touch up. Grass cutting, hedge clipping, weed pulling. James will see to it that any imperfections will be perfected and anything unwanted can be rooted out. A job like this would ideally be done in a mornings work and would cost you around X amount. If this type of jub would suit you then click on through to see contact details for booking.'));
    }
    if (buttonNumber === 8){
        contentBoxp.appendChild(document.createTextNode('Our small jobs are ideal for smaller gardens that just need a little touch up. Grass cutting, hedge clipping, weed pulling. James will see to it that any imperfections will be perfected and anything unwanted can be rooted out. A job like this would ideally be done in a mornings work and would cost you around X amount. If this type of jub would suit you then click on through to see contact details for booking.'));
    }
    console.log(localStorage.getItem('input'));
    contentBoxh1.appendChild(document.createTextNode(buttonID));
    input.setAttribute('id',buttonNumber);
    contentBoxform.appendChild(input);
    let element = document.getElementsByTagName('body')[0];
    contentBox.appendChild(contentBoxh1);
    contentBox.appendChild(contentBoxp);
    contentBox.appendChild(contentBoxform);
    contentBox.appendChild(contentBoxspan);
    newDiv.appendChild(contentBox);
    element.appendChild(newDiv);
    buttonID = '0'
}
