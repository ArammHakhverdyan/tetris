const ys = 24;
const xs = 10;
const allCubesCount = ys * xs;
let tetris = document.createElement("div");
tetris.classList.add("tetris");
tetris.style.height = ys * 30 + 'px';
tetris.style.width = xs * 30 + 'px';
const button = document.getElementById("startGame");
let interval;

const GAME_STATES = {
    initial: "initial",
    playing: "playing",
    paused: "paused"
}
let state = GAME_STATES.initial;

button.addEventListener('click', onControlButtonClick);
function onControlButtonClick() {
    if (state === GAME_STATES.initial) {
        startGame()
        startInterval();
        
    } else if (state === GAME_STATES.playing) {
        pauseGame()
    } else if (state === GAME_STATES.paused) {
        resumeGame()
    }
}

//table

for (let i = 1; i < allCubesCount+1; i++) {
   let item = document.createElement("div");
   item.classList.add("item");
   tetris.appendChild(item);
}

let main = document.getElementsByClassName('main')[0];
main.appendChild(tetris)

let item = document.getElementsByClassName("item")
let i = 0;

for(let y = 24; y > 0; y--){
    for(let x = 1; x < 11; x++){
        item[i].setAttribute("X", x);
        item[i].setAttribute("Y", y);
        i++;
    }
}

let x = 5, y = 20;

// draw

let array = [
    // .
    [
        [0, 0],
        [0, 0],
        [0, 0],

        //rotate . to 90%
    [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
    ],
    //rotate . to 180%
    [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
    ],
    //rotate . to 270%
    [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
    ],
    //rotate . to 360%
    [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
    ],

],
    // I
    [
        [0, 1],
        [0, 2],
        [0, 3],
    
    //rotate I to 90%
    [
        [-1, 1],
        [0, 0],
        [1, -1],
        [2, -2],
    ],
    //rotate I to 180%
    [
        [1, -1],
        [0, 0],
        [-1, 1],
        [-2, 2],
    ],
    //rotate I to 270%
    [
        [-1, 1],
        [0, 0],
        [1, -1],
        [2, -2],
    ],
    //rotate I to 360%
    [
        [1, -1],
        [0, 0],
        [-1, 1],
        [-2, 2],
    ],
],
    // O
    [
        [1, 0],
        [0, 1],
        [1, 1],
    
    //rotate O to 90%
    [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
    ],
    //rotate O to 180%
    [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
    ],
    //rotate O to 270%
    [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
    ],
    //rotate O to 360%
    [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
    ],
],
    // L
    [
        [1, 0],
        [0, 1],
        [0, 2],
    
    //rotate L to 90%
    [
        [0, 0],
        [-1, 1],
        [1, 0],
        [2, -1],
    ],
    //rotate L to 180%
    [
        [1, -1],
        [1, -1],
        [-1, 0],
        [-1, 0],
    ],
    //rotate L to 270%
    [
        [-1, 0],
        [0, -1],
        [2, -2],
        [1, -1],
    ],
    //rotate L to 360%
    [
        [0, -1],
        [0, -1],
        [-2, 0],
        [-2, 0],
    ],
],
    // J
    [
        [1, 0],
        [1, 1],
        [1, 2],
    
    //rotate J to 90%
    [
        [0, 0],
        [0, 0],
        [1, -1],
        [-1, -1],
    ],
    //rotate J to 180%
    [
        [0, -1],
        [-1, 0],
        [-2, 1],
        [1, 0],
    ],
    //rotate J to 270%
    [
        [2, 0],
        [0, 0],
        [1, -1],
        [1, -1],
    ],
    //rotate J to 360%
    [
        [-2, 0],
        [1, -1],
        [0, 0],
        [-1, 1],
    ],
],
    //right Z
    [
        [1, 0],
        [-1, 1],
        [0, 1],
    
    //rotate right Z to 90%
    [
        [0, -1],
        [-1, 0],
        [2, -1],
        [1, 0],
    ],
    //rotate right Z to 180%
    [
        [0, 0],
        [1, -1],
        [-2, 0],
        [-1, -1],
    ],
    //rotate right Z to 270%
    [
        [0, -1],
        [-1, 0],
        [2, -1],
        [1, 0],
    ],
    //rotate right Z to 360%
    [
        [0, 0],
        [1, -1],
        [-2, 0],
        [-1, -1],
    ],
],
    //left Z
    [
        [1, 0],
        [1, 1],
        [2, 1],
    
    //rotate left Z to 90%
    [
        [2, -1],
        [0, 0],
        [1, -1],
        [-1, 0],
    ],
    //rotate left Z to 180%
    [
        [-2, 0],
        [0, -1],
        [-1, 0],
        [1, -1],
    ],
    //rotate left Z to 270%
    [
        [2, -1],
        [0, 0],
        [1, -1],
        [-1, 0],
    ],
    //rotate left Z to 360%
    [
        [-2, 0],
        [0, -1],
        [-1, 0],
        [1, -1],
    ],
],
    // T
    [
        [1, 0],
        [2, 0],
        [1, 1],
    
     //rotate T to 90%
     [
        [1, -1],
        [0, 0],
        [0, 0],
        [0, 0],
    ],
    //rotate T to 180%
    [
        [0, 0],
        [-1, 0],
        [-1, 0],
        [1, -1],
    ],
    //rotate T to 270%
    [
        [1, -1],
        [1, -1],
        [1, -1],
        [0, 0],
    ],
    //rotate T to 360%
    [
        [-2, 0],
        [0, -1],
        [0, -1],
        [-1, -1],
    ],
],

]
let currentCoord = 0;
let figureCube = 0;
let rotate = 1

// create cubs

function startGame(){
    
    function getRandom() {
        return Math.round(Math.random()*(array.length-1))
    }
    rotate = 1;
    currentCoord = getRandom();

    figureCube = [
        document.querySelector(`[X = "${x}"][Y = "${y}"]`),
        document.querySelector(`[X = "${x+array[currentCoord][0][0]}"][Y = "${y+array[currentCoord][0][1]}"]`),
        document.querySelector(`[X = "${x+array[currentCoord][1][0]}"][Y = "${y+array[currentCoord][1][1]}"]`),
        document.querySelector(`[X = "${x+array[currentCoord][2][0]}"][Y = "${y+array[currentCoord][2][1]}"]`),
    ];

    for(let i = 0; i < figureCube.length; i++) {
        figureCube[i].classList.add("active");
    }
    
    state = GAME_STATES.playing;
    button.innerText = "Pause"
}



function pauseGame() {
    clearInterval(interval);
    state = GAME_STATES.paused;
    button.innerText = "Resume"
}
function resumeGame() {
    startInterval();
    state = GAME_STATES.playing;
    button.innerText = "Pause"
}

let score = 0;
let input = document.getElementsByClassName("input")[0];
input.value = `Your scores: ${score}`

// moving

function move() {
    let moveBoolean = true;
    let coords = [
        [figureCube[0].getAttribute("X"), figureCube[0].getAttribute("Y")],
        [figureCube[1].getAttribute("X"), figureCube[1].getAttribute("Y")],
        [figureCube[2].getAttribute("X"), figureCube[2].getAttribute("Y")],
        [figureCube[3].getAttribute("X"), figureCube[3].getAttribute("Y")],

    ];
    // vor chhelni vren
    for(let i = 0; i < coords.length; i++) {
        if (coords[i][1] == 1 || document.querySelector(`[X = "${coords[i][0]}"][Y = "${coords[i][1]-1}"]`).classList.contains("fixed")){
            moveBoolean = false;
            break;
        }
    }
    // toxy lcveluc jnjvi vereviny ijni
    if (moveBoolean){
        for(let i = 0; i < figureCube.length; i++) {
            figureCube[i].classList.remove("active");
        }
        figureCube = [
            document.querySelector(`[X = "${coords[0][0]}"][Y = "${coords[0][1]-1}"]`),
            document.querySelector(`[X = "${coords[1][0]}"][Y = "${coords[1][1]-1}"]`),
            document.querySelector(`[X = "${coords[2][0]}"][Y = "${coords[2][1]-1}"]`),
            document.querySelector(`[X = "${coords[3][0]}"][Y = "${coords[3][1]-1}"]`)
        ]
        for(let i = 0; i < figureCube.length; i++) {
            figureCube[i].classList.add("active");
        }
    }else {
        for(let i = 0; i < figureCube.length; i++) {
            figureCube[i].classList.remove("active");
            figureCube[i].classList.add('fixed')
        }
        for(let i = 1; i < 15; i++){
            let count = 0;
            for(let k = 1; k < 11; k++) {
                if (document.querySelector(`[X = "${k}"][Y = "${i}"]`).classList.contains("fixed")) {
                    count++;
                    if (count === 10) {
                        score += 10;
                        input.value = `Your scores: ${score}`
                        for(let m = 1; m < 11; m++) {
                            document.querySelector(`[X = "${m}"][Y = "${i}"]`).classList.remove("fixed")
                        }
                        let fixed = document.querySelectorAll(".fixed");
                        let newFixed = [];
                        for (let s = 0; s < fixed.length; s++) {
                            let fixedCoords = [fixed[s].getAttribute("X"), fixed[s].getAttribute("Y")];
                            if(fixedCoords[1] > i) {
                                fixed[s].classList.remove("fixed");
                                newFixed.push(document.querySelector(`[X = "${fixedCoords[0]}"][Y = "${fixedCoords[1]-1}"]`))
                            }
                        }
                        for (let a = 0; a < newFixed.length; a++) {
                            newFixed[a].classList.add("fixed");
                        }
                        i--;
                    }
                }
            }
        }
        // hasni verevi toxin partvi
        for(let n = 1; n < 11; n++) {
            if(document.querySelector(`[X = "${n}"][Y = "17"]`).classList.contains("fixed")) {
                clearInterval(interval);
                alert(`GAME OVER. YOUR SCORE: ${score}`);
                break;
            }
        }
        
        startGame()
        
    }
    
}

let speed = 1000;
function startInterval() {
    interval = setInterval(()=>{
        move();
    }, speed)
}
const easy = document.getElementsByClassName("easy")
const normal = document.getElementsByClassName("normal")
const buttons = document.getElementById("buttons")      
buttons.addEventListener("click", function speedButton (e){
    
    if(e.target.classList.contains("easy")){
        speed = 1000;
        console.log("easy")
    }else if(e.target.classList.contains("normal")){
        speed = 500;
        console.log("normal")
    }else if(e.target.classList.contains("hard")){
        speed = 200;
        console.log("hard")
    }
    
})

let bool = true;
document.body.addEventListener("keydown", onKeyDown);

// keyboard

function onKeyDown(e) { 
    if (state !== GAME_STATES.playing) {
        return
    }

    let coords0 = [figureCube[0].getAttribute("X"), figureCube[0].getAttribute("Y")];
    let coords1 = [figureCube[1].getAttribute("X"), figureCube[1].getAttribute("Y")];
    let coords2 = [figureCube[2].getAttribute("X"), figureCube[2].getAttribute("Y")];
    let coords3 = [figureCube[3].getAttribute("X"), figureCube[3].getAttribute("Y")];

    function getNewState(a) {
        bool = true;
        let newFigure = [
            document.querySelector(`[X = "${+coords0[0]+a}"][Y = "${coords0[1]}"]`),
            document.querySelector(`[X = "${+coords1[0]+a}"][Y = "${coords1[1]}"]`),
            document.querySelector(`[X = "${+coords2[0]+a}"][Y = "${coords2[1]}"]`),
            document.querySelector(`[X = "${+coords3[0]+a}"][Y = "${coords3[1]}"]`),
        ];
        for(let i = 0; i < newFigure.length; i++){
            if(!newFigure[i] || newFigure[i].classList.contains("fixed")) {
                bool = false
            }
        }
        if(bool) {
            for(let i = 0; i < figureCube.length; i++){
                figureCube[i].classList.remove("active");
            }
            figureCube = newFigure

            for(let i = 0; i < figureCube.length; i++){
                figureCube[i].classList.add("active");
            }
        }
    }
    if(e.key === "ArrowLeft") {
        getNewState(-1);
    }else if(e.key === "ArrowRight") {
        getNewState(1)
    }else if(e.key === "ArrowDown") {
        move()
    }else if(e.key === "ArrowUp") {
        bool = true;

        // rotate

        let newFigure = [
            document.querySelector(`[X = "${+coords0[0]+array[currentCoord][rotate+2][0][0]}"][Y = "${+coords0[1]+array[currentCoord][rotate+2][0][1]}"]`),
            document.querySelector(`[X = "${+coords1[0]+array[currentCoord][rotate+2][1][0]}"][Y = "${+coords1[1]+array[currentCoord][rotate+2][1][1]}"]`),
            document.querySelector(`[X = "${+coords2[0]+array[currentCoord][rotate+2][2][0]}"][Y = "${+coords2[1]+array[currentCoord][rotate+2][2][1]}"]`),
            document.querySelector(`[X = "${+coords3[0]+array[currentCoord][rotate+2][3][0]}"][Y = "${+coords3[1]+array[currentCoord][rotate+2][3][1]}"]`),
        ];
        for(let i = 0; i < newFigure.length; i++){
            if(!newFigure[i] || newFigure[i].classList.contains("fixed")) {
                bool = false
            }
        }
        if(bool == true) {
            for(let i = 0; i < figureCube.length; i++){
                figureCube[i].classList.remove("active");
            }
            figureCube = newFigure

            for(let i = 0; i < figureCube.length; i++){
                figureCube[i].classList.add("active");
            }
            if(rotate < 4) {
                rotate++;
            }else {
                rotate = 1;
            }
        }
    }
}
