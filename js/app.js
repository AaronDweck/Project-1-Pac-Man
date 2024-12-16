/*-----------------------HTML---------------------*/
// * Create a fixed grid which will be used in each round

// the grid will be broken up into 3 parts the score(top), game board(middle) and lives(bottom)
// the game board will consist of cells with different classes: wall, open, dots and energizers
// each cell will have an x and y value
// the characters will move within the grid with classes: pacman(moving and not moving) and ghost(also with each gpsts color)
// 

/*-----------------------CSS----------------------*/

/*------------------------JS----------------------*/

// ! mvp only need start button
// * when the page opens the user will have a start button in the center with the background of the board blured out when the user presses start the button and blur will clear out and start the game

// board setup
// have a list of the index of each wall or open space 
// create a list of each cell in the grid
// add x and y value to each cell // ! not needed for mvp
// set the positions of the characters on the board
// set the current positon of each character to their start index
// add the class of a character to the correct index
// if it is the start of a new round set each correct open space to have a dot in it
// add 1 to the number of dots

//when start button is pressed
// start the intro music
// when music is done start the game with the pacman moving with a defualt left direction

// pacman's moves
// create an interval with the timing of its speed corresponding to the game speed
// using a parameter of the current direction and prefered direction
// if the prefered direction is a legal place to move
// move to that space and set the current direction
// otherwise
// if the current direction is a legal place to move
// move
// otherwise
// stop 

// the ghost's moves
// create an interval with the timing of its speed corresponding to the game speed
// look ahead
// look at next space with current direction
// get legal spaces around it (its previous position is not legal)
// ! mvp is just to make it move by its self which can be made by choosing first available spot
// if length of possible moves is equal to one 
// move to that position
// otherwise
// look at each available spot and calculate displacment to target cell
// return the cell with the shortest displacment
// move into space with current direction
// set direction to move in the cell with shortest displacment

// moving a character
// get character and direction from parameter

// remove the character's class from current cell

// if the character direction is left
// if the character is in the left tunnel
// set the characters position to the right tunnel
// otherwise
// add the chracters class to the cell with one less index

// if the character direction is right 
// if the character is in the right tunnel
// set the characters position to the left tunnel
// otherwise
// add the chracters class to the cell with one more index

// if the character direction is up 
// add the chracters class to the cell with  an index thats a columns length lesser

// if the character direction is down 
// add the chracters class to the cell with  an index thats a columns length greater

// check pacmans cell
// if cell has a dot in it
// play eating sound
// clear the dot and add 10 points to the score and 1 to collected dots
// if collected dots are equal to the number of dots
// start new round
// if cell has ghost in it
// if afraid mode is on
// set that objects class to return and set its target to home
// otherwise
// play dying sound
// minus one from the life
// if lives are equal to zero
// end game and display score
// reset positions
// start game 


/*------------------------constants----------------------*/

const rows = 19
const columns = 15
const numOfCells = rows * columns
const cells = []
const indxOfOpenCells = [16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 31, 33, 36, 38, 41, 41, 43, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 61, 63, 65, 69, 71, 73, 76, 78, 80, 81, 82, 83, 84, 86, 88, 91, 93, 97, 101, 103, 106, 107, 108, 110, 111, 112, 113, 114, 116, 117, 118, 123, 125, 129, 131, 135, 136, 137, 138, 139, 140, 144, 145, 146, 147, 148, 149, 153, 155, 156, 157, 158, 159, 161, 166, 167, 168, 169, 175, 176, 177, 178, 181, 184, 185, 186, 187, 188, 189, 190, 193, 196, 197, 199, 205, 207, 208, 212, 214, 215, 216, 218, 219, 220, 222, 226, 227, 228, 229, 231, 232, 233, 235, 236, 237, 238, 241, 247, 253, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268]
const excludePacdot = [110, 111, 112, 113, 114, 125, 129, 135, 136, 137, 139, 140, 144, 145, 147, 148, 149, 155, 156, 157, 158, 159, 187]
const characters = {
    pacman: {
        name: 'pacman',
        startIndex: 187,
        currentIndex: 0,
        currentDirection: 'left',
        preferredDirection: 'left',
    },
    ghosts: {
        red: {
            name: 'red',
            startIndex: 127,
            currentIndex: 0,
        },
        blue: {
            name: 'blue',
            startIndex: 141,
            currentIndex: 0,
        },
        pink: {
            name: 'pink',
            startIndex: 142,
            currentIndex: 0,
        },
        orange: {
            name: 'orange',
            startIndex: 143,
            currentIndex: 0,
        },
    }
}
const pacman = characters.pacman
const redGhost = characters.ghosts.red
const blueGhost = characters.ghosts.blue
const pinkGhost = characters.ghosts.pink
const orangeGhost = characters.ghosts.orange
const arrOfGhosts = [redGhost, blueGhost, pinkGhost, orangeGhost]
const numOfDots = 120
const gameSpeed = 500

/*------------------------cached elements----------------------*/
const scoreEl = document.querySelector('#score')
const gameGridEl = document.querySelector('#game-grid')
const livesSectionEl = document.querySelector('#lives')
const startButton = document.querySelector('#start')
const beginningSound = document.querySelector('#beginning')
const eatingSound = document.querySelector('#eating')


/*------------------------variables----------------------*/

let newGame = true
let dotsCollected = 0
let score = 0


/*------------------------game setup----------------------*/

for (let index = 0; index < numOfCells; index++) {
    cell = document.createElement('div')
    cell.classList.add('cell')
    if (indxOfOpenCells.includes(index)) {
        cell.classList.add('open')
    } else {
        cell.classList.add('wall')
    }
    cells.push(cell)
    gameGridEl.appendChild(cell)

}

/*------------------------functions----------------------*/

function removeCharaters() {

    cells[pacman.currentIndex].classList.remove('pacman')
    for (const ghost of arrOfGhosts) {
        cells[ghost.currentIndex].classList.remove('ghost', ghost.name)
    }
}

function setCharactersToStart() {
    removeCharaters()
    // adding the characters to the start
    cells[pacman.startIndex].classList.add('pacman')
    pacman.currentIndex = pacman.startIndex
    for (const ghost of arrOfGhosts) {
        cells[ghost.startIndex].classList.add('ghost', ghost.name)
        ghost.currentIndex = ghost.startIndex
    }

}

function addPacdots() {
    // adding the pacdots to a cell if its a correct index and an open cell
    for (const cell of cells) {
        if (!excludePacdot.includes(cells.indexOf(cell)) && cell.classList.contains('open')) {
            cell.classList.add('pacdot')
        }
    }
}

function checkCellLegality(position, direction) {
    if (position === 135 && direction === 'left') {
        return true
    } else if (position === 149 && direction === 'right') {
        return true
    }
    if (direction === 'left') {
        return !cells[position - 1].classList.contains('wall')
    } else if (direction === 'right') {
        return !cells[position + 1].classList.contains('wall')
    } else if (direction === 'up') {
        return !cells[position - columns].classList.contains('wall')
    } else if (direction === 'down') {
        return !cells[position + columns].classList.contains('wall')
    }

}

function moveCharacter(character, direction) {
    cells[character.currentIndex].classList.remove(character.name)
    if (character.currentIndex === 135 && direction === 'left') {
        character.currentIndex = 149
    } else if (character.currentIndex === 149 && direction === 'right') {
        character.currentIndex = 135
    } else if (direction === 'left') {
        character.currentIndex--
    } else if (direction === 'right') {
        character.currentIndex++
    } else if (direction === 'up') {
        character.currentIndex -= columns
    } else if (direction === 'down') {
        character.currentIndex += columns
    }

    cells[character.currentIndex].classList.add(character.name)




}

function pacmansMoves() {
    pacmanInterval = setInterval(() => {
        if (checkCellLegality(pacman.currentIndex, pacman.preferredDirection)) {
            moveCharacter(pacman, pacman.preferredDirection)
            pacman.currentDirection = pacman.preferredDirection
        } else {
            if (checkCellLegality(pacman.currentIndex, pacman.currentDirection)) {
                moveCharacter(pacman, pacman.currentDirection)
            } else {
                console.log('stopped')
            }
        }
        checkCell(pacman)

    }, gameSpeed)
}

function pacmanDirecton(event) {
    const pressedKey = event.code
    if (pressedKey === 'ArrowUp') {
        pacman.preferredDirection = 'up'
    } else if (pressedKey === 'ArrowDown') {
        pacman.preferredDirection = 'down'
    } else if (pressedKey === 'ArrowLeft') {
        pacman.preferredDirection = 'left'
    } else if (pressedKey === 'ArrowRight') {
        pacman.preferredDirection = 'right'
    }
}

// check pacmans cell
function checkCell(character){
    // if cell has a dot in it
    if (cells[character.currentIndex].classList.contains('pacdot')){
        // play eating sound
        eatingSound.play()
        // clear the dot and add 10 points to the score and 1 to collected dots
        cells[character.currentIndex].classList.remove('pacdot')
        score += 10
        dotsCollected += 1
        // if collected dots are equal to the number of dots
        if (dotsCollected === numOfDots){
            console.log('new round')
            console.log('score:',score)
        }
        // start new round

    }
    // if cell has ghost in it
    // if afraid mode is on
    // set that objects class to return and set its target to home
    // otherwise
    // play dying sound
    // minus one from the life
    // if lives are equal to zero
    // end game and display score
    // reset positions
    // start game 

}

function startGame() {
    setCharactersToStart()
    if (newGame) {
        newGame = false
        addPacdots()
        beginningSound.play()
        setTimeout(() => {
            pacmansMoves()
        }, 4500)

    }


}

/*------------------------event listeners----------------------*/

startButton.addEventListener('click', startGame)

document.addEventListener('keydown', pacmanDirecton)