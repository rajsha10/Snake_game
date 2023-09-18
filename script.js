let inputDir = { x: 0, y: 0 };
const foodEat = new Audio('sounds/food.mp3');
const gameOver = new Audio('sounds/gameOver.mp3');
const turn = new Audio('sounds/turn.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };

// game functions

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //if snake collide it's body
    for(let i= 1; i<snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }

    return false;

    //if snake collide with wall
}

function gameEngine() {
    // part 1: Updating the snake array & food
    if (isCollide(snakeArr)) {
        speed = 5;
        gameOver.play();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again!");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
    }

    // if you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodEat.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        food = { x: Math.round(2 + Math.random() * 14), y: Math.round(2 + Math.random() * 14) };
        score++;
        if(score>hiScoreVal){
            hiScoreVal = score;
            localStorage.setItem("hiscore", JSON.stringify(hiScoreVal));
            document.getElementById('hipoint').innerHTML = hiScoreVal;
        }
        if(score%2 === 0){
            speed++;
        }
    }
    document.getElementById("point").innerHTML = score;

    // moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // part 2: Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('snake-head');
        } else {
            snakeElement.classList.add('snake-body');
        }
        board.appendChild(snakeElement);
    });

    // Part 3: Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


// main game logic
// Get the high score from local storage
let hiscore = localStorage.getItem("hiscore");

if (hiscore === null) {
    var hiScoreVal = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiScoreVal));
} else {
    try {
        hiScoreVal = eval("(" + hiscore + ")");
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
    turn.play();
    switch (e.key) {
        case "ArrowUp":
            if (inputDir.y !== 1) {
                inputDir.x = 0;
                inputDir.y = -1;
            }
            break;

        case "ArrowDown":
            if (inputDir.y !== -1) {
                inputDir.x = 0;
                inputDir.y = 1;
            }
            break;
        case "ArrowRight":
            if (inputDir.x !== -1) {
                inputDir.x = 1;
                inputDir.y = 0;
            }
            break;

        case "ArrowLeft":
            if (inputDir.x !== 1) {
                inputDir.x = -1;
                inputDir.y = 0;
            }
            break;

        default:
            break;
    }
});