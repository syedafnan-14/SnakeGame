let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('/music/food.mp3');
const gameOverSound = new Audio('/music/gameover.mp3')
const moveSound = new Audio('/music/move.mp3'); 
const music = new Audio('/music/music.mp3');
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 6, y: 7 }
let board = document.getElementById('board');
let sc = document.getElementById('score');
let highscore = document.getElementById('highscore');

const up = document.getElementById('up');
const down = document.getElementById('down');
const left = document.getElementById('left');
const right = document.getElementById('right');

let score = 0;
let a = 2,b = 16;

const foodImages = [
    'apple.svg',
    'strawberry.svg',
    'pear.svg',
    'orange.svg',
    'lollipop.svg',
    'lemon.svg',
    'hawthorn.svg',
    'hamburger.svg',
    'grape.svg',
    'corn.svg',
    'carrot.svg'
];
let randomFoodImage = foodImages[0];

if (!localStorage.getItem('key')) {
    localStorage.setItem('key', 0);
}


// Game Function
function gameLoop() {
    gameEngine();
  
}


function isCollide(snake){
    // if the Snake bump itself
    for (let i = 1; i < snakeArr.length; i++) {
        
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) 
            return true;
    }
    // If Snake is Collided with Wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)
            return true;    
    
}


function gameEngine() {
    
    // Part 1: Updating the Snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        music.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over, Press any Key To Play again");
        snakeArr =  [
            { x: 13, y: 15 }
        ]
        music.play();
        score = 0;
        sc.innerHTML = `Score : ${score}`;
    }
   

    // If Snake has eaten the food, increment the scoreand regenerate the food
    if(snakeArr[0].y === food.y &&snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if (parseInt(localStorage.getItem('key')) < score) {
            localStorage.setItem('key', score);
        }
        
        sc.innerHTML = `Score : ${score}`;
        highscore.innerHTML = `High-Score : ${localStorage.getItem('key')}`;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y})
        food = {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
        randomFoodImage = foodImages[Math.floor(Math.random() * foodImages.length)];
    }

    //Moving the Snake
    for (let i = snakeArr.length-2; i >=0; i--) {
           
        snakeArr[i+1] = {...snakeArr[i]};
        
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // Part 2: Displaying Snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    // Displaying Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    foodElement.style.background = `url('/img/${randomFoodImage}')`;
    board.appendChild(foodElement);
}

// Main logic Starts here


setInterval(gameLoop, 300);

window.addEventListener('keydown', e => {
    moveSound.play();
    music.play();
    inputDir = { x: 0, y: 1 }; // Start the Game
    sc.innerHTML = `Score : ${score}`;
    highscore.innerHTML = `High-Score : ${localStorage.getItem('key')}`;
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
});

// Function to handle button clicks
function handleButtonClick(direction) {
    moveSound.play();
    music.play();
    inputDir = { x: 0, y: 1 }; // Start the Game
    sc.innerHTML = `Score : ${score}`;
    highscore.innerHTML = `High-Score : ${localStorage.getItem('key')}`;

    switch (direction) {
        case "up":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "down":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "left":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "right":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    }
}

up.addEventListener('click', () => handleButtonClick('up'));
down.addEventListener('click', () => handleButtonClick('down'));
left.addEventListener('click', () => handleButtonClick('left'));
right.addEventListener('click', () => handleButtonClick('right'));
