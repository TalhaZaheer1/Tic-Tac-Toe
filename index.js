
function CreatePlayers(score, turn) {
    return { score, turn };
}

const player1 = CreatePlayers(0, true);
const player2 = CreatePlayers(0);

let gameOver = false;
let tie = false;


const gameBoard = (() => {
    return {
        arr: ["", "", "", "", "", "", "", "", ""]
    }
})();


const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btns = document.querySelectorAll('.xo button');
const boxes = document.querySelectorAll('.gamebox');

const player1B = document.querySelector('#pl1');
const player2B = document.querySelector('#pl2');
const players = document.querySelectorAll('.pBtn');
const dialog = document.querySelector('dialog');
const newgameBtns = document.querySelectorAll('.nBtn');
const winP = document.querySelector('dialog h1');
const section = document.querySelector('section');

console.log(newgameBtns);

player1B.classList.add('plturn');


function gameReOv() {
    boxes.forEach(box => {
        box.classList.remove('gameOver');
        box.classList.remove('gameOverY');
        box.removeAttribute('data-svg')
    });
    player2B.classList.remove('plturn');
    player1B.classList.add('plturn');
    btn1.classList.add('btn1');
    btn2.classList.remove('btn1');
    gameBoard.arr = ["", "", "", "", "", "", "", "", ""];
    dialog.close();
    section.style.filter = null;
    tie = false;
}



function btnChange(e) {
    if (btn1.getAttribute('class') == 'btn btn1') {
        btn1.classList.remove('btn1');
        btn2.classList.add('btn1');
    } else {
        btn1.classList.add('btn1');
        btn2.classList.remove('btn1');
    }
}

newgameBtns.forEach(btn => btn.addEventListener('click', gameReOv));
btns.forEach(btn => btn.addEventListener('click', btnChange));



const buildBoard = () => {


    let i = 0;
    boxes.forEach(box => {
        box.setAttribute('data-index', i);
        i++;
    })

    function checkBoard() {
        gameOver = (() => {
            for (let i = 0; i < gameBoard.arr.length; i++) {
                if (gameBoard.arr[i] == "") {
                    return false;
                } else if (i == gameBoard.arr.length - 1) {
                    tie = true;
                    return true;
                }
            }
        })();
        const checkArr = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

        let winCondition = (function() {
            for(let i = 0; i < checkArr.length; i++) {
            let num1 = checkArr[i][0];
            let num2 = checkArr[i][1];
            let num3 = checkArr[i][2];
            let winCondition = gameBoard.arr[num1] === gameBoard.arr[num2] && gameBoard.arr[num2] === gameBoard.arr[num3];
            if (gameBoard.arr[num1]) {
                if (winCondition) {
                    gameOver = true;
                    const box1 = document.querySelector(`[data-index="${num1}"]`);
                    const box2 = document.querySelector(`[data-index="${num2}"]`);
                    const box3 = document.querySelector(`[data-index="${num3}"]`);
                    if (gameBoard.arr[num1] == 'X') {
                        box1.classList.add('gameOver');
                        box2.classList.add('gameOver');
                        box3.classList.add('gameOver');
                        return winCondition;
                    } else {
                        box1.classList.add('gameOverY');
                        box2.classList.add('gameOverY');
                        box3.classList.add('gameOverY');
                        return winCondition;
                    }
                }
            }
        }
    })();

    if (gameOver) {
        if (tie && !winCondition) {
            winP.textContent = "It's a TIE";
        } else if (player1.turn) {
            winP.textContent = "Player 2 has WON";
        } else {
            winP.textContent = "Player 1 has WON";
        }
        setTimeout(() => {
            dialog.showModal();
            section.style.filter = 'blur(8px)';
        }, 1500)
    }
};

    function renderXO(e) {
        if (this.dataset.svg == undefined) {
            this.removeAttribute('data-svgb');
            const j = this.dataset.index;

            if (btn1.getAttribute('class') == 'btn btn1') {
                gameBoard.arr[j] = 'X';
            } else {
                gameBoard.arr[j] = 'O';
            }

            if (gameBoard.arr[j] != "") {
                if (gameBoard.arr[j] == 'X') {
                    this.dataset.svg = 'X';

                } else {
                    this.dataset.svg = 'O';
                }
            }

            if (player1.turn) {
                player1B.classList.remove('plturn');
                player2B.classList.add('plturn');
                btnChange();
            } else {
                player2B.classList.remove('plturn');
                player1B.classList.add('plturn');
                btnChange();
            }
            player1.turn = !player1.turn;
            console.log(gameBoard.arr);
            checkBoard();

        }
    }

    boxes.forEach(box => box.addEventListener('click', renderXO));





boxes.forEach(box => box.addEventListener('mouseover', () => {
    if (box.dataset.svg == undefined) {
        if (btn1.getAttribute('class') == 'btn btn1') {
            box.dataset.svgb = "x-b";
        } else {
            box.dataset.svgb = "o-b";
        }
    }

}));

boxes.forEach(box => box.addEventListener('mouseout', () => {

    box.removeAttribute('data-svgB');

}));




};

buildBoard();





