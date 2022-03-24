let cursorX,cursorY;
const body = document.querySelector("body");
const header = document.querySelector("header");
header.style.gridRowStart = '1';
header.style.gridColumnStart = '3';
const nav = document.querySelector("nav");
nav.style.gridRowStart = '2';
nav.style.gridColumnStart = '3';
const main = document.querySelector("main");
main.style.gridRowStart = '3';
main.style.gridColumnStart = '3';
const aside = document.querySelector("aside");
aside.style.gridRowStart = '4';
aside.style.gridColumnStart = '3';
const footer = document.querySelector("footer");
footer.style.gridRowStart = '5';
footer.style.gridColumnStart = '3';
const mainElementsList = [header,nav,main,aside,footer];
let areaSelected,areaSelectedString,allDropDowns;
let collection = ['Select'];


//CHANGE MENU VARIABLES>>>
let buttonList;
let displayChangerMenu = document.createElement('div');
displayChangerMenu.setAttribute('id','displayChangerMenu');
let displayChangerMenuExists = false;
let displayChangerMenuH1 = document.createElement('h1');
let displayChangerMenuClose = document.createElement('span');
displayChangerMenuClose.appendChild(document.createTextNode('X'));
displayChangerMenuClose.setAttribute('id','displayChangerMenuClose');
displayChangerMenu.appendChild(displayChangerMenuClose);
//CHANGE MENU VARIABLES<<<

//DISPLAY MENU CALL>>>
window.onload = (event) => {
    optionsCreator(fontsButton,'Change Font',fontsSelect1,fontsSelect2,fontsList1,fontsList2,fontsOptions,fontsApplyButton);
    optionsCreator(colorsButton,'Change Colour',colorsSelect1,colorsSelect2,colorsList1,colorsList2,colorsOptions,colorsApplyButton);
    optionsCreator(placementButton,'Change Placement',placementSelect1,placementSelect2,placementList1,placementList2,placementOptions,placementApplyButton);
    optionsCreator(contentButton,'Change content',contentSelect1,contentSelect2,contentList1,contentList2,contentOptions,contentApplyButton);
    optionsCreator(addVariableButton,'Add Variable',addVariableSelect1,addVariableSelect2,addVariableList1,addVariableList2,addVariableOptions,addVariableApplyButton);
}
//DISPLAY MENU CALL<<<


//COLOR CHANGER VARIABLES>>>
let colorsButton = document.createElement('button');
let colorsSelect1 = document.createElement('select');
let colorsSelect2 = document.createElement('select');
let colorsOptions = document.createElement('option');
let colorsDropDownFlagTest = false;
let colorsApplyButton = document.createElement('button');
let colorsList1 = [' - Style - ','Solid','Left to Right','Top to Bottom'];
let colorsList2 = ['Select','red','blue','pink','white','orange','black','green','cyan'];
//COLOR CHANGER VARIABLES<<<


//COLOR CHANGER FUNCTION>>>
colorsButton.onclick =()=>{
    if (colorsDropDownFlagTest == false){
        wordColorCoverter();
        displayChangerMenu.appendChild(colorsSelect1);
        displayChangerMenu.appendChild(colorsSelect2);
        displayChangerMenu.appendChild(colorsApplyButton);
        colorsDropDownFlagTest = true;
    } else{
        colorsSelect1.parentNode.removeChild(colorsSelect1);
        colorsSelect2.parentNode.removeChild(colorsSelect2);
        colorsApplyButton.parentNode.removeChild(colorsApplyButton);
        colorsDropDownFlagTest = false;
    }
}

function wordColorCoverter(){
    for(let specificColor = 0;specificColor < colorsSelect2.length;specificColor++){
        if (specificColor > 0){
            colorsSelect2[specificColor].style.backgroundColor = colorsSelect2[specificColor].value;
        }
    }
}
colorsApplyButton.onclick =()=>{
    console.log(colorsSelect2.value);
    if (colorsSelect2.value != 'Select'){
        areaSelected.style.backgroundColor = colorsSelect2.value;
    }
}
//COLOR CHANGER FUNCTION<<<


//PLACEMENT CHANGER VARIABLES>>>
let placingCorrector;
let placementButton = document.createElement('button');
let placementSelect1 = document.createElement('select');
let placementSelect2 = document.createElement('select');
let placementOptions = document.createElement('option');
let placementDropDownFlagTest = false;
let placementApplyButton = document.createElement('button');
let placementList1 = [' - Style - ','Bling','Blang','Bloing'];
let placementList2 = ['Select','top','right','bottom','left','natural'];
//PLACEMENT CHANGER VARIABLES<<<


//PLACEMENT CHANGER FUNCTION>>>
placementButton.onclick =()=>{
    if (placementDropDownFlagTest == false){
        displayChangerMenu.appendChild(placementSelect1);
        displayChangerMenu.appendChild(placementSelect2);
        displayChangerMenu.appendChild(placementApplyButton);
        placementDropDownFlagTest = true;
    } else{
        placementSelect1.parentNode.removeChild(placementSelect1);
        placementSelect2.parentNode.removeChild(placementSelect2);
        placementApplyButton.parentNode.removeChild(placementApplyButton);
        placementDropDownFlagTest = false;
    }
}

placementApplyButton.onclick =()=>{
    if (placementSelect2.value == 'top'){
        for(let mainElement = 0;mainElement < mainElementsList.length;mainElement++){
            if (parseInt(mainElementsList[mainElement].style.gridRowStart) < parseInt(areaSelected.style.gridRowStart)){
                placingCorrector = parseInt(mainElementsList[mainElement].style.gridRowStart);
                placingCorrector++;
                mainElementsList[mainElement].style.gridRowStart  = placingCorrector.toString();
            }
        }
        areaSelected.style.gridRowStart = '1';
    } else if (placementSelect2.value == 'bottom'){
        for(let mainElement = 0;mainElement < mainElementsList.length;mainElement++){
            if (parseInt(mainElementsList[mainElement].style.gridRowStart) > parseInt(areaSelected.style.gridRowStart)){
                placingCorrector = parseInt(mainElementsList[mainElement].style.gridRowStart);
                placingCorrector--;
                mainElementsList[mainElement].style.gridRowStart  = placingCorrector.toString();
            }
        }
        areaSelected.style.gridRowStart = '5';
    } else if (placementSelect2.value == 'right'){
        placingCorrector = parseInt(areaSelected.style.gridColumnStart);
        if (placingCorrector < 5){
            placingCorrector++;
            areaSelected.style.gridColumnStart = placingCorrector.toString();
        }
    } else if (placementSelect2.value == 'left'){
        placingCorrector = parseInt(areaSelected.style.gridColumnStart);
        if (placingCorrector > 1){
            placingCorrector--;
            areaSelected.style.gridColumnStart = placingCorrector.toString();
        }
    }
}
//PLACEMENT CHANGER FUNCTION>>>


//CONTENT CHANGER VARIABLES>>>
let contentButton = document.createElement('button');
let contentSelect1 = document.createElement('select');
let contentSelect2 = document.createElement('select');
let contentOptions = document.createElement('option');
let contentDropDownFlagTest = false;
let contentElementsOptions;
let contentApplyButton = document.createElement('button');
let contentList1 = collection;
let contentList2 = ['Select','red','blue','pink','bink','bank','flink','flank','frank'];


let contentChangerDiv = document.createElement('div');
contentChangerDiv.setAttribute('id','contentChangerDiv');
let contentChangerTextArea = document.createElement('textarea');
contentChangerTextArea.setAttribute('rows',15);
contentChangerTextArea.setAttribute('cols',50);
let contentChangerDivClose = document.createElement('span');
contentChangerDivClose.appendChild(document.createTextNode('X'));
contentChangerDivClose.setAttribute('id','contentChangerDivClose');
contentChangerDiv.appendChild(contentChangerDivClose);
contentChangerDiv.appendChild(contentChangerTextArea);
let contentChangerDivApplyButton = document.createElement('button');
contentChangerDivApplyButton.appendChild(document.createTextNode('Apply Changes'));
contentChangerDiv.appendChild(contentChangerDivApplyButton);
//CONTENT CHANGER VARIABLES<<<


//CONTENT CHANGER FUNCTION>>>
contentButton.onclick =()=>{
    if (contentDropDownFlagTest == false){
        contentSelect1 = elementSelectorApply(collection,contentElementsOptions,contentSelect1,contentSelect1.style.gridRowStart);
        displayChangerMenu.appendChild(contentSelect1);
        displayChangerMenu.appendChild(contentSelect2);
        displayChangerMenu.appendChild(contentApplyButton);
        contentDropDownFlagTest = true;
    } else{
        contentSelect1.parentNode.removeChild(contentSelect1);
        contentSelect2.parentNode.removeChild(contentSelect2);
        contentApplyButton.parentNode.removeChild(contentApplyButton);
        contentDropDownFlagTest = false;
    }
}

contentApplyButton.onclick =()=>{
    if (contentSelect1.value != 'Select'){
        contentSelect1 = contentSelect1.value;
        contentChangerTextArea.value = areaSelected.getElementsByTagName(contentSelect1)[0].textContent;
        body.appendChild(contentChangerDiv);
    }
}
contentChangerDivClose.onclick =()=>{
    contentChangerDiv.parentNode.removeChild(contentChangerDiv);
}
contentChangerDivApplyButton.onclick =()=>{
    areaSelected.getElementsByTagName(contentSelect1)[0].textContent = contentChangerTextArea.value;
    contentChangerDiv.parentNode.removeChild(contentChangerDiv);
}
//CONTENT CHANGER FUNCTION>>>


//FONT CHANGER VARIABLES>>>
let fontsButton = document.createElement('button');
let fontsSelect1 = document.createElement('select');
let fontsSelect2 = document.createElement('select');
let fontsOptions = document.createElement('option');
let fontsDropDownFlagTest = false;
let fontsElementsOptions;
let fontsApplyButton = document.createElement('button');
let fontsList1 = collection;
let fontsList2 = ['Select','Orbitron','Anton'];
//FONT CHANGER VARIABLES<<<


//FONT CHANGER FUNCTION>>>
fontsButton.onclick =()=>{
    if (fontsDropDownFlagTest == false){
        fontsSelect1 = elementSelectorApply(collection,fontsElementsOptions,fontsSelect1,fontsSelect1.style.gridRowStart);
        displayChangerMenu.appendChild(fontsSelect1);
        displayChangerMenu.appendChild(fontsSelect2);
        displayChangerMenu.appendChild(fontsApplyButton);
        fontsDropDownFlagTest = true;
    } else{
        fontsSelect1.parentNode.removeChild(fontsSelect1);
        fontsSelect2.parentNode.removeChild(fontsSelect2);
        fontsApplyButton.parentNode.removeChild(fontsApplyButton);
        fontsDropDownFlagTest = false;
    }
}

fontsApplyButton.onclick =()=>{
    if (fontsSelect1.value != 'Select'){
        areaSelected.getElementsByTagName(fontsSelect1.value)[0].style.fontFamily = fontsSelect2.value;
    }
}
//FONT CHANGER FUNCTION<<<


//ADD ELEMENT VARIABLES>>>
let addVariableButton = document.createElement('button');
let addVariableSelect1 = document.createElement('select');
let addVariableSelect2 = document.createElement('select');
let addVariableOptions = document.createElement('option');
let addVariableDropDownFlagTest = false;
let addVariableApplyButton = document.createElement('button');
let addVariableList1 = [' - Element - ','paragragh','section','list'];
let addVariableList2 = ['Select','red','blue','pink','white','orange','black','green','cyan'];


let addVariableDiv = document.createElement('div');
addVariableDiv.setAttribute('id','addVariableDiv');
let addVariableTextArea = document.createElement('textarea');
addVariableTextArea.setAttribute('rows',15);
addVariableTextArea.setAttribute('cols',50);
let addVariableDivClose = document.createElement('span');
addVariableDivClose.appendChild(document.createTextNode('X'));
addVariableDivClose.setAttribute('id','addVariableDivClose');
addVariableDiv.appendChild(addVariableDivClose);
// addVariableDiv.appendChild(addVariableTextArea);
let addVariableDivApplyButton = document.createElement('button');
addVariableDivApplyButton.appendChild(document.createTextNode('Apply Changes'));
addVariableDiv.appendChild(addVariableDivApplyButton);

let createdElementHolder;
let createdElementTextArea;
//ADD ELEMENT VARIABLES<<<


//ADD ELEMENT FUNCTION>>>
addVariableButton.onclick =()=>{
    if (addVariableDropDownFlagTest == false){
        displayChangerMenu.appendChild(addVariableSelect1);
        displayChangerMenu.appendChild(addVariableSelect2);
        displayChangerMenu.appendChild(addVariableApplyButton);
        addVariableDropDownFlagTest = true;
    } else{
        addVariableSelect1.parentNode.removeChild(addVariableSelect1);
        addVariableSelect2.parentNode.removeChild(addVariableSelect2);
        addVariableApplyButton.parentNode.removeChild(addVariableApplyButton);
        addVariableDropDownFlagTest = false;
    }
}
console.log('bingus bongis');
addVariableApplyButton.onclick =()=>{
    body.appendChild(addVariableDiv);
    addVariableDiv.appendChild(document.createElement('textarea'));
}

function createElement(elementToCreate){
    if (elementToCreate == 'paragragh'){
        createdElementHolder = document.createElement('p');
        createdElementHolder.appendChild(document.createTextNode('tester'));
        areaSelected.appendChild(createdElementHolder);
    }
}

addVariableDivClose.onclick =()=>{
    addVariableDiv.parentNode.removeChild(addVariableDiv);
}
addVariableDivApplyButton.onclick =()=>{
    createElement(addVariableSelect1.value);
//     areaSelected.getElementsByTagName(contentSelect1)[0].textContent = contentChangerTextArea.value;
//     addVariableDiv.parentNode.removeChild(addVariableDiv);
}
//ADD ELEMENT FUMCTION<<<


//OPTIONS CREATOR FUNCTION>>>
let buttonsCreated = 1;
function optionsCreator(dropDownButtonVariable,buttonVariableTEXT,selectVariable1,selectVariable2,list1,list2,optionsVariable,applyButtonVariable){
    buttonsCreated++;
    dropDownButtonVariable.setAttribute('class','displayMenuButton');
    dropDownButtonVariable.innerHTML = buttonVariableTEXT;

    selectVariable1.setAttribute('class','dropDown');
    selectVariable1.style.gridRowStart = parseInt(buttonsCreated);
    selectVariable2.setAttribute('class','dropDown');
    selectVariable2.style.gridRowStart = parseInt(buttonsCreated);

    for(let specificOption=0;specificOption<list1.length;specificOption++){
        optionsVariable = document.createElement('option');
        optionsVariable.appendChild(document.createTextNode(list1[specificOption]));
        selectVariable1.appendChild(optionsVariable);
    }
    for(let specificOption=0;specificOption<list2.length;specificOption++){
        optionsVariable = document.createElement('option');
        optionsVariable.appendChild(document.createTextNode(list2[specificOption]));
        selectVariable2.appendChild(optionsVariable);
    }

    applyButtonVariable.setAttribute('class','dropDown');
    applyButtonVariable.innerHTML = 'Apply';
    applyButtonVariable.style.gridRowStart = parseInt(buttonsCreated);
}
//OPTIONS CREATOR FUNCTION<<<




//CLOSE MENU FUNCTION>>>
displayChangerMenuClose.onclick =()=>{
    if (elementSelectExists == true){
        elementsSelect.parentNode.removeChild(elementsSelect);
        elementSelectExists = false;
    }
    removeAllDropDowns();
    removeChangeMenu();
}
//CLOSE MENU FUNCTION<<<


//CLOSE DROP DOWNS>>>
function removeAllDropDowns(){
    allDropDowns = document.querySelectorAll('.dropDown');
    for (let dropDownSpecific = 0;dropDownSpecific < allDropDowns.length;dropDownSpecific++){
        allDropDowns[dropDownSpecific].parentNode.removeChild(allDropDowns[dropDownSpecific]);
    }
}
//CLOSE DROP dOWNS<<<


//CLOSE OTHER DROP DOWNS>>>
function removeOtherDropDowns(buttonNumber){
    allDropDowns = document.querySelectorAll('.dropDown');
    for (let dropDownSpecific = 0;dropDownSpecific < allDropDowns.length;dropDownSpecific++){
        if (dropDownSpecific != buttonNumber){
            allDropDowns[dropDownSpecific].parentNode.removeChild(allDropDowns[dropDownSpecific]);
        }
    }
}
//CLOSE OTHER DROP DOWNS<<<


//BUTTON PRESS FUNCTION>>>
function buttonPressed(dropDown,existFlag){
    if (existFlag == true){
        dropDown.parentNode.removeChild(dropDown);
        return true;
    } else{
        displayChangerMenu.appendChild(dropDown);
    }
}
//BUTTON PRESS FUNCTION<<<


//ELEMENT COLLECTOR>>>
function elementCollector(parent){
    collection = ['Select'];
    for(let singleElement = 0;singleElement < parent.children.length;singleElement++){
        collection.push(parent.children[singleElement].tagName);
    }
}
//ELEMENT COLLECTOR<<<


//ELEMENT SELECTOR VARIABLES>>>
let elementsSelectOption, elementsPlacer, elementsButton, elementSelected;
let elementsSelect = document.createElement('select');
elementsSelect.setAttribute('class','dropDown');
elementsSelect.setAttribute('id','elementsSelect');
let elementSelectExists = false;
//ELEMENT SELECTOR VARIABLES<<<


//ELEMENT SELECTOR FUNCTION>>>
function elementSelectorCreator(elementList){
    clearSelected(elementsSelect);
    elementSelected = 'Select';
    for(let specificElement = 0;specificElement < elementList.length;specificElement++){
        elementsSelectOption = document.createElement('option');
        elementsSelectOption.appendChild(document.createTextNode(elementList[specificElement]));
        elementsSelect.appendChild(elementsSelectOption);
    }
}

function elementSelectorApply(collectedElements,selectOption,chosenSelect,existingRowNumber){
    chosenSelect = document.createElement('select');
    for(let chosenElement = 0;chosenElement < collectedElements.length;chosenElement++){
        selectOption = document.createElement('option');
        selectOption.appendChild(document.createTextNode(collectedElements[chosenElement]));
        chosenSelect.appendChild(selectOption);
    }
    chosenSelect.setAttribute('class','dropDown');
    chosenSelect.style.gridRowStart = existingRowNumber;
    return chosenSelect;
}
//ELEMENT SELECTOR FUNCTION<<<



header.onclick =()=>{
    elementCollector(header);
    displayChanger('header');
}
nav.onclick =()=>{
    elementCollector(nav);
    displayChanger('nav');
}
main.onclick =()=>{
    elementCollector(main);
    displayChanger('main');
}
aside.onclick =()=>{
    elementCollector(aside);
    displayChanger('aside');
}
footer.onclick =()=>{
    elementCollector(footer);
    displayChanger('footer');
}


function changerMenuButtonPlacer(){
    buttonList = displayChangerMenu.getElementsByTagName('button');
    for(let individualButton = 0;individualButton < buttonList.length;individualButton++){
        buttonList[individualButton].style.gridRowStart = individualButton + 2;
    }
}
function clearSelected(selectedClear){
    while (selectedClear.firstChild){
        selectedClear.removeChild(selectedClear.firstChild);
    }
}


function removeChangeMenu(){
    displayChangerMenu.parentNode.removeChild(displayChangerMenu);
    displayChangerMenuExists = false;
    fontsDropDownFlagTest = false;
    colorsDropDownFlagTest = false;
    placementDropDownFlagTest = false;
    contentDropDownFlagTest = false;
    addVariableDropDownFlagTest = false;
    if (body.querySelector('#contentChangerDiv') !== null){
        contentChangerDiv.parentNode.removeChild(contentChangerDiv);
    }
}

function displayChanger(selected){
    areaSelectedString = selected;
    elementSelectorCreator(collection);
    if (displayChangerMenuExists){
        removeAllDropDowns();
        removeChangeMenu();
    } else{
        clearSelected(displayChangerMenuH1);
        if (selected == 'header'){
            areaSelected = header;
            displayChangerMenuH1.appendChild(document.createTextNode('Header'));
        } else if (selected == 'nav'){
            areaSelected = nav;
            displayChangerMenuH1.appendChild(document.createTextNode('Nav'));
        } else if (selected == 'main'){
            areaSelected = main;
            displayChangerMenuH1.appendChild(document.createTextNode('Main'));
        } else if (selected == 'aside'){
            areaSelected = aside;
            displayChangerMenuH1.appendChild(document.createTextNode('Aside'));
        } else if (selected == 'footer'){
            areaSelected = footer;
            displayChangerMenuH1.appendChild(document.createTextNode('Footer'));
        }
//         displayChangerMenu = document.createElement('div');
//         displayChangerMenu.setAttribute('id','displayChangerMenu');
        if (cursorX > 1400){
            cursorX -= 500;
        }
        displayChangerMenu.style.top = cursorY+'px';
        displayChangerMenu.style.left = cursorX+'px';
        displayChangerMenu.appendChild(displayChangerMenuH1);
        displayChangerMenu.appendChild(fontsButton);
        displayChangerMenu.appendChild(colorsButton);
        displayChangerMenu.appendChild(placementButton);
        displayChangerMenu.appendChild(contentButton);
        displayChangerMenu.appendChild(addVariableButton);
        changerMenuButtonPlacer();
        body.appendChild(displayChangerMenu);
        displayChangerMenuExists = true;
    }
}


document.addEventListener('click', mousePosition, true);
function mousePosition(e){
    cursorX = 0;
    cursorY = 0;
    cursorX = e.pageX;
    cursorY= e.pageY;
}
