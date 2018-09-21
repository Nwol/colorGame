var difficulty = 6;
var colors = [];
var pickedColor;
var squares = document.getElementsByClassName("square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");

init();

//refactored, there are other ways to do this also
function init(){
   setUpModeButtons();
   setUpSquares();
}

function setUpModeButtons(){
    easy.addEventListener("click",function(){
        hard.classList.remove("selected");
        easy.classList.add("selected");
        difficulty = 3;
        resetBtn();
    });
    
    hard.addEventListener("click", function(){
        easy.classList.remove("selected");
        hard.classList.add("selected");
        difficulty = 6;
        resetBtn();
    });

    resetButton.addEventListener("click",resetBtn);
}

function setUpSquares(){
    resetBtn();
    for(var i = 0; i < squares.length; i++){
        //add click listeners to squares
        squares[i].addEventListener("click",function(){
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            //compare color to pickedColor
            if(clickedColor === pickedColor){
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            }
            else{
                this.style.background = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

function changeColors(color){
    //loop through all squares
    for(var i = 0; i < colors.length; i++){
        squares[i].style.backgroundColor = color;
    }
    //change each color to match given color
}

function pickColor(){
    var num = Math.floor(Math.random()*colors.length);
    return colors[num];
}

function generateRandomColors(num){
    var arr = [];
    for(var i = 0; i < num; i++){
        arr.push(randomColor()); 
    }
    return arr;
}

function randomColor(){
    var red = Math.floor(Math.random()*256);
    var green = Math.floor(Math.random()*256);
    var blue = Math.floor(Math.random()*256);
    return "rgb(" + red + ", " + green + ", " + blue+")";
}

function resetBtn(){
    //set the new colors
    colors = generateRandomColors(difficulty);
    //pick a color from the list
    pickedColor = pickColor();
    //display the rgb of the chosen color
    colorDisplay.textContent = pickedColor;
    //reset message being displayed
    messageDisplay.textContent = "";
    //set the squares
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
        }
        else{
            squares[i].style.display = "none";
        }
    }
    //change the reset button message
    resetButton.textContent = "New Colors";
    //change the background back to normal
    h1.style.background = "steelblue"

}
