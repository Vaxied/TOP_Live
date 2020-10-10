let createDivs = (squares) => {
    console.log("page has loaded");
    //let input = squaresNumber();
    //create divs
    if (squares ==  0) {
        squares = 4;
    }
    let squareNumber = Math.pow(squares, 2);
    for (let i = 0; i < squareNumber; i++) {
        div = document.createElement("div");
        div.style.backgroundColor = "white";
        document.querySelector("#window").appendChild(div);
        //console.log(div);
        div.classList.add("grid");
        //div.idList.add(`${i}`);
        div.id = `${i}`;
        div.style.width =  `calc(100% / (${squareNumber}/${squares})`;
        div.style.height = `calc(100% / (${squareNumber}/${squares})`;
        //div.classList.add("grid");
    }
}

let paintDivs = () => {
    let randomrgb = "";
    let savedrgb = "";
    var previousrgb = "";
    var previous_id = "";
    divs = document.querySelectorAll(".grid");
    for(let i = 0; i < divs.length; i++) {
        let div = divs[i];
        //console.log(div);
        div.addEventListener('mouseenter', () => {
            //insert div id into array
            //Get the RGB and its done.
            if (visitedDivs.indexOf(div.id) != -1) {
                //let opacity = div.style.opacity;
                //let darkened = darkenColor(opacity);
                //div.style.opacity = `${darkened}`;
                let brightness = div.style.filter;
                //console.log(brightness);
                let darkened = darkenBrightness(brightness);
                div.style.filter = `brightness(${darkened})`;
                console.log(div.style.filter);
                console.log("darkening");
            }
            else {
            //console.log("Mouse spotted");
            randomrgb = `${generateRGB()}`;
            //console.log(randomrgb);
            //console.log(div.id);
            rgbtopaint = `rgb(${randomrgb})`;
            //console.log(rgbtopaint);
            //for some reason it doesn't return a rgba value.
            div.style.backgroundColor = rgbtopaint;
            //div.style.opacity = "100%";
            div.style.filter = "brightness(1)";
            console.log(div.style.filter);
            //console.log(div.style.backgroundColor);
            //console.log(div.style.opacity);
            visitedDivs.push(div.id);
            console.log("painting");
            }
            //}
            //console.log(visitedDivs);
            
            //need to check this out tomorrow
        });
        /*
        div.addEventListener('mouseleave', () => {
            console.log("past square data");
            previousrgb = randomrgb;
            previous_id = div.id;
            console.log(randomrgb);
            console.log(previous_id);
        });
        */
    }
}

let generateRGB = () => {
    let red = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let rgb = `${red},${green},${blue}`;
    return rgb;
}

let darkenColor = (opacity) => {
    if (opacity != 0) {
        opacity = (opacity - 0.1).toPrecision(1);;
    }
    return opacity;
}

let darkenBrightness = (brightness) => {
    brightness = brightness.slice(11, brightness.length -1);
    if (brightness != 0) {
        brightness = (brightness - 0.1).toPrecision(1);
    }
    return brightness;
    /*
    newbrightness = brightness.slice(11, brightness.length -2);
    console.log(newbrightness);
    if (newbrightness != 0) {
        console.log("hi");
        newbrightness = +newbrightness - 10;
        newbrightness = newbrightness + "%";
        console.log(newbrightness);
        return newbrightness;
        
    }
    else{
        console.log("nope");
        //console.log(brightness);
        return brightness;
    }
    */
    
}

let createButton = () => {
    btn = document.createElement("button");
    document.querySelector('#window').appendChild(btn);
    btn.textContent = "Number of squares"
    console.log("button created");
    btn.addEventListener('click', repopulateDivs);
}

let askSquares = () => {
    let squaresNumber = prompt("Please enter a number to divide the screen by: ");
    if (squaresNumber === null)
        return;
    while (true) {
        if (squaresNumber % squaresNumber != 0) {
            squaresNumber = prompt("Please enter a number to divide the screen by: ");
        }
        else {
            break;
        }
    }
    return squaresNumber;
}

let repopulateDivs = () => {
    let squares = askSquares();
    if (squares == null)
        return;
    else {
    clearScreen();
    createDivs(squares);
    createButton();
    console.log(squares);
    paintDivs();
    console.log("creating");
    console.log("end");
    }
}

let clearScreen = () => {
    divs = document.querySelectorAll(".grid");
    for(let i = 0; i < divs.length; i++) {
        let div = divs[i];
        div.remove();
        //console.log(div);
    }
    //Empty array
    while(visitedDivs.length != 0) {
        visitedDivs.pop();
    }
    let btn = document.querySelector("button");
    btn.remove();
}

let setEverything = () => {
    createDivs(squares);
    paintDivs();
    createButton();
}
var squares = 0;
var visitedDivs = [];
window.addEventListener('load', setEverything);