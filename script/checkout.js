let tabSelector = document.getElementsByClassName('checkoutTab');
let tabNumber
let specificTabNumber
let specificTabString='';
let checkoutsection = document.getElementById('checkoutsection')

let tableTime = document.getElementById('tableTime')
let tableCost = document.getElementById('tableCost')
let tableWeather = document.getElementById('tableWeather')
let tableMaterials = document.getElementById('tableMaterials')

let checkouth1 = document.createElement('h1');
checkouth1.setAttribute('id','checkouth1');

let checkoutp = document.createElement('p');
checkoutp.setAttribute('id','checkoutp');

document.addEventListener('DOMContentLoaded', contentDisplay, false);

for (let specificTabNumber=0; specificTabNumber < tabSelector.length; specificTabNumber++){
    tabSelector[specificTabNumber].onclick = function(){
        tabNumber = specificTabNumber
        for (let tabChecker = 0; tabChecker < tabSelector.length; tabChecker++){
            if (tabChecker != tabNumber){
                tabSelector[tabChecker].style.backgroundColor='#e0c9ab';
                tabSelector[tabChecker].style.padding = '.5em 1em';
            }
        }
        tabExecutor();
    }
}


function tabExecutor(){
    clearAll(checkouth1, 0);
    clearAll(checkoutp, 0);
    clearAll(tableTime, 0);
    clearAll(tableCost, 0);
    clearAll(tableWeather, 0);
    clearAll(tableMaterials, 0);
    tabSelector[tabNumber].style.backgroundColor='whitesmoke';
    tabSelector[tabNumber].style.padding = '.5em 1em .7em 1em';
    localStorage.setItem('input',tabNumber);
    console.log(localStorage.getItem('input'));
    contentDisplay();
}
function contentDisplay(){
    if (localStorage.getItem('input') === '0'){
        checkouth1.appendChild(document.createTextNode('Small Job'))
        checkoutp.appendChild(document.createTextNode('This is where you can find information relating to smaller sized jobs'));
        tableTime.appendChild(document.createTextNode('1.5-3'));
        tableCost.appendChild(document.createTextNode('35'));
        tableWeather.appendChild(document.createTextNode('Yes'));
        tableMaterials.appendChild(document.createTextNode('No'));
    } else if (localStorage.getItem('input') === '1'){
        checkouth1.appendChild(document.createTextNode('Medium Job'))
        checkoutp.appendChild(document.createTextNode('This is where you can find information relating to medium sized jobs'));
        tableTime.appendChild(document.createTextNode('3-6'));
        tableCost.appendChild(document.createTextNode('30'));
        tableWeather.appendChild(document.createTextNode('Yes'));
        tableMaterials.appendChild(document.createTextNode('No'));
    } else if (localStorage.getItem('input') === '2'){
        checkouth1.appendChild(document.createTextNode('Larger Job'))
        checkoutp.appendChild(document.createTextNode('This is where you can find information relating to larger jobs'));
        tableTime.appendChild(document.createTextNode('6-'));
        tableCost.appendChild(document.createTextNode('25'));
        tableWeather.appendChild(document.createTextNode('Yes'));
        tableMaterials.appendChild(document.createTextNode('No'));
    } else if (localStorage.getItem('input') === '3'){
        checkouth1.appendChild(document.createTextNode('Tree Felling'))
        checkoutp.appendChild(document.createTextNode('This is where you can find information relating to anything relating to tree-felling'));
        tableTime.appendChild(document.createTextNode('Dependant'));
        tableCost.appendChild(document.createTextNode('50'));
        tableWeather.appendChild(document.createTextNode('Yes'));
        tableMaterials.appendChild(document.createTextNode('No'));
    } else if (localStorage.getItem('input') === '4'){
        checkouth1.appendChild(document.createTextNode('Blank 5'))
        checkoutp.appendChild(document.createTextNode('5'));
        tableTime.appendChild(document.createTextNode('TBD'));
        tableCost.appendChild(document.createTextNode('X'));
        tableWeather.appendChild(document.createTextNode('Yes'));
        tableMaterials.appendChild(document.createTextNode('No'));
    } else if (localStorage.getItem('input') === '5'){
        checkouth1.appendChild(document.createTextNode('Blank 6'))
        checkoutp.appendChild(document.createTextNode('6'));
        tableTime.appendChild(document.createTextNode('TBD'));
        tableCost.appendChild(document.createTextNode('X'));
        tableWeather.appendChild(document.createTextNode('Yes'));
        tableMaterials.appendChild(document.createTextNode('No'));
    } else if (localStorage.getItem('input') === '6'){
        checkouth1.appendChild(document.createTextNode('Blank 7'))
        checkoutp.appendChild(document.createTextNode('7'));
        tableTime.appendChild(document.createTextNode('TBD'));
        tableCost.appendChild(document.createTextNode('X'));
        tableWeather.appendChild(document.createTextNode('Yes'));
        tableMaterials.appendChild(document.createTextNode('No'));
    } else if (localStorage.getItem('input') === '7'){
        checkouth1.appendChild(document.createTextNode('Blank 8'))
        checkoutp.appendChild(document.createTextNode('8'));
        tableTime.appendChild(document.createTextNode('TBD'));
        tableCost.appendChild(document.createTextNode('X'));
        tableWeather.appendChild(document.createTextNode('Yes'));
        tableMaterials.appendChild(document.createTextNode('No'));
    } else if (localStorage.getItem('input') === '8'){
        checkouth1.appendChild(document.createTextNode('Blank 9'))
        checkoutp.appendChild(document.createTextNode('9'));
        tableTime.appendChild(document.createTextNode('TBD'));
        tableCost.appendChild(document.createTextNode('X'));
        tableWeather.appendChild(document.createTextNode('Yes'));
        tableMaterials.appendChild(document.createTextNode('No'));
    } else {
        checkoutp.appendChild(document.createTextNode('Please select one of the options above to find a service that would suit your needs'));
        tableTime.appendChild(document.createTextNode('-'));
        tableCost.appendChild(document.createTextNode('-'));
        tableWeather.appendChild(document.createTextNode('-'));
        tableMaterials.appendChild(document.createTextNode('-'));
    }
//     checkoutsection.appendChild(checkouth1);
//     checkoutsection.appendChild(checkoutp);
    checkoutsection.insertBefore(checkoutp, checkoutsection.firstChild)
    checkoutsection.insertBefore(checkouth1, checkoutsection.firstChild)


}
function clearAll(parent, remainder){
    if (remainder === 0){
        while (parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
    } else if (remainder > 0){
        while (parent.childNodes.length > remainder){
            parent.removeChild(parent.lastChild)
        }
    }
}
// function clearAll(element, removalNumber){
//     for (let start = 0; start < removalNumber; start++){
//         element.removeChild(element.firstChild);
//     }
// }



