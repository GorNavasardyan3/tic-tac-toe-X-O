const input = document.querySelector('input[type=number]')
const h1 = document.querySelector('h1')
const board = document.querySelector('#board')
const blocks = document.querySelector('#blocks')
let arr = []
let count = 0
let arrForRandom = []


input.addEventListener('change',changeBlocksSize)
function changeBlocksSize() {
    createBoard()
};


let body = document.querySelector('body')
function createBoard() {
    arr = []
    count = 0
    arrForRandom = []
    for(let i = 0; i < +input.value;i++) {
            arr[i] = []
        for(let j = 0;j < +input.value;j++) {
            arr[i].push(count)
            count++
        }
    }
    board.textContent = ''
    board.style.height = 75*+input.value + 'px'
    board.style.width = 75*+input.value + 'px'
    board.style.background = "green"
    body.append(board)
    board.classList.add('board')
    for(let i = 0; i < arr.length;i++) {
        for(let j = 0;j < arr.length;j++) {
            let blocks = document.createElement('div')
            blocks.setAttribute('id', arr[i][j])
            blocks.classList.add('blocks')
            blocks.classList.add('box')
            board.append(blocks)
            blocks.setAttribute('data-box','true')
        }
    }
    arrForRandom = arr.flat()
}
createBoard()

board.addEventListener('click', startGame)

let player = true

function startGame(e) {
    
    if(player && e.target.dataset.box) {
      e.target.removeAttribute("data-box")
      let x = document.createElement('i')
      x.classList.add('fa-solid')
      x.classList.add('fa-x')
      x.style.color = 'red'
      e.target.append(x)
      player = false
      for(let i = 0;i < arr.length;i++) {
        for(let j = 0; j < arr.length;j++) {
            if(e.target.id == arr[i][j]) arr[i][j] = 'x'
        }
      }
      arrForRandom = arrForRandom.filter(el => el != e.target.id)
      checkGame()
    }
    if(!player && arrForRandom.length !== 0) {
        let box = document.querySelectorAll('.box')
        setTimeout(() => {
            let randomClick = arrForRandom[random(0, arrForRandom.length-1)]
            box[randomClick].removeAttribute("data-box")
            console.log(box.randomClick);
            let o = document.createElement('i')
            o.classList.add('fa-solid')
            o.classList.add('fa-o')
            o.style.color = 'black'
            box[randomClick].append(o)
            player = true
            for(let i = 0;i < arr.length;i++) {
              for(let j = 0; j < arr.length;j++) {
                  if(box[randomClick].id == arr[i][j]) arr[i][j] = 'o'
              }
            }
            arrForRandom = arrForRandom.filter(el => el != box[randomClick].id)
            checkGame()
        },100)
    }
}

function checkGame() {
    for(let i = 0;i < arr.length;i++) {
        let winnerX = arr[i].filter(el => el === 'x')
        let winnerO = arr[i].filter(el => el === 'o')
        if(winnerX.length === +input.value) setTimeout(() => (winner('x')) ,90)
        if(winnerO.length === +input.value) setTimeout(() => (winner('o')) ,90)
    }
    let arrForHorizont = []
    for(let j = 0; j<arr[0].length; j++){
        arrForHorizont[j] = []
        for(let i = 0; i<arr.length; i++){
            arrForHorizont[j].push(arr[i][j])
        }
    }
    for(let i = 0;i < arrForHorizont.length;i++) {
        let winnerX = arrForHorizont[i].filter(el => el === 'x')
        let winnerO = arrForHorizont[i].filter(el => el === 'o')
        if(winnerX.length === +input.value) setTimeout(() => (winner('x')) ,90)
        if(winnerO.length === +input.value) setTimeout(() => (winner('o')) ,90)
    }

    let iteration = -1
    let arrsForX = [[],[]]
    for(let i = 0;i < arr.length;i++) {
        let arrXInLeft = arr[i][i]
        arrsForX[0].push(arrXInLeft)
        let arrXInRight = arr[i][arr[i].length + iteration]
        arrsForX[1].push(arrXInRight)
        iteration--
    }
     for(let i = 0;i < arrsForX.length;i++) {
        let winnerX = arrsForX[i].filter(el => el === 'x')
        let winnerO = arrsForX[i].filter(el => el === 'o')
        if(winnerX.length === +input.value) setTimeout(() => (winner('x')) ,90)
        if(winnerO.length === +input.value) setTimeout(() => (winner('o')) ,90)
    }
    if(arrForRandom.length == 0) drow();
}


function drow() {
    board.style.display = 'none'
    input.style.display = "none"
    h1.textContent = 'end game drow!'
}
    
function winner(el) {
    board.style.display = 'none'
    input.style.display = "none"
    h1.textContent = 'end game winner ' + el
}

function random(min,max) {
    return Math.floor(Math.random() * (max - min) + min)
}