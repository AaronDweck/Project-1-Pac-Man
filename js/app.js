/*------------------------JS----------------------*/

// ! mvp only need start button
// * when the page opens the user will have a start button in the center with the background 
// * of the board blured out when the user presses start the button and blur will clear out and start the game

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
// using a parameter of the current direction and preferred direction
// if the preferred direction is a legal place to move
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
// look at each available spot and calculate distance to target cell
// return the cell with the shortest distance
// move into space with current direction
// set direction to move in the cell with shortest distance

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
const excludePacdot = [31, 43, 110, 111, 112, 113, 114, 125, 129, 135, 136, 137, 139, 140, 144, 145, 147, 148, 149, 155, 156, 157, 158, 159, 187, 196, 208]
const indexOfPowerPellets = [31, 43, 196, 208]
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
            currentDirection: 'left',
            preferredDirection: 'left',
            locked: true,
            lockedTime: null,
            frightened: false,

        },
        blue: {
            name: 'blue',
            startIndex: 141,
            currentIndex: 0,
            currentDirection: 'left',
            preferredDirection: 'left',
            locked: true,
            lockedTime: null,
            frightened: false,

        },
        pink: {
            name: 'pink',
            startIndex: 142,
            currentIndex: 0,
            currentDirection: 'left',
            preferredDirection: 'left',
            locked: true,
            lockedTime: null,
            frightened: false,

        },
        orange: {
            name: 'orange',
            startIndex: 143,
            currentIndex: 0,
            currentDirection: 'left',
            preferredDirection: 'left',
            locked: true,
            lockedTime: null,
            frightened: false,

        },
    }
}

const pacman = characters.pacman
const redGhost = characters.ghosts.red
const blueGhost = characters.ghosts.blue
const pinkGhost = characters.ghosts.pink
const orangeGhost = characters.ghosts.orange
const arrOfGhosts = [redGhost, blueGhost, pinkGhost, orangeGhost]
const ghostRestartIndex = 112
const gameSpeed = 300
const livesArr = []

/*------------------------cached elements----------------------*/

const scoreEl = document.querySelector('#score')
const gameGridEl = document.querySelector('#game-grid')
const livesSectionEl = document.querySelector('#lives')
const startButton = document.querySelector('#start')
const beginningSound = document.querySelector('#beginning')
const eatingSound = document.querySelector('#eating')
const dyingSound = document.querySelector('#dying')
const highScoreEL = document.querySelector('#high-score')
const gameOver = document.querySelector('#game-over')


/*------------------------variables----------------------*/

let highScore = localStorage.getItem("p1pacmanHS")
let newGame = true
let numOfDots = 0
let dotsCollected = 0
let score = 0
let pacmanInterval
let ghostInterval
let ghostSpeed = 1.2
let lives = 3
let ghostMultiplier = 1
let frightenedTime

/*------------------------game setup----------------------*/

highScoreEL.innerHTML = highScore

let y = 1
let x = 1


for (let index = 0; index < numOfCells; index++) {

    const cell = document.createElement('div')
    cell.dataset.x = index % columns + 1
    cell.dataset.y = y
    if (index % columns === columns - 1) {
        y++
    }
    cell.classList.add('cell')
    // cell.innerHTML = index
    if (indxOfOpenCells.includes(index)) {
        cell.classList.add('open')
    } else {
        cell.classList.add('wall')
    }
    cells.push(cell)
    gameGridEl.appendChild(cell)

}

beginningSound.volume = 0.5
eatingSound.volume = 0.35
dyingSound.volume = 0.5

/*------------------------functions----------------------*/

function addLife() {
    const life = document.createElement('div')
    life.className = 'life'
    livesArr.push(life)
    livesSectionEl.appendChild(life)
}

function addPacdots() {
    numOfDots = 0
    // adding the pacdots to a cell if its a correct index and an open cell
    for (const cell of cells) {
        if (!excludePacdot.includes(cells.indexOf(cell)) && cell.classList.contains('open')) {
            cell.classList.add('pacdot')
            numOfDots += 1
        } else if (indexOfPowerPellets.includes(cells.indexOf(cell))) {
            cell.classList.add('power-pellet')
        }
    }
    dotsCollected = 0
}

function checkCellLegality(index) {
    return !cells[index].classList.contains('wall')

}

function moveCharacter(character, index, direction) {
    const ghostsInCell = arrOfGhosts.filter(ghost => {
        return (cells[character.currentIndex].classList.contains(ghost.name) && ghost.frightened)
    })

    if (ghostsInCell.length > 1) {
        cells[character.currentIndex].classList.remove('ghost', character.name, character.currentDirection)
    } else {
        cells[character.currentIndex].classList.remove('ghost', 'frightened', character.name, character.currentDirection)
    }

    character.currentIndex = index

    if (arrOfGhosts.includes(character)) {
        if (character.frightened) {
            // console.log('test1')
            cells[character.currentIndex].classList.add('ghost', 'frightened', character.name, direction)
        } else {
            // console.log('test2')
            cells[character.currentIndex].classList.add('ghost', character.name)
        }
    } else {
        cells[character.currentIndex].classList.add(character.name, direction)
    }
}

function getNextIndex(index, direction) {
    if (index === 135 && direction === 'left') {
        return 149
    } else if (index === 149 && direction === 'right') {
        return 135
    } else if (direction === 'left') {
        return index - 1
    } else if (direction === 'right') {
        return index + 1
    } else if (direction === 'up') {
        return index - columns
    } else if (direction === 'down') {
        return index + columns
    }
}

function getDirection(preferredIndex, currentIndex) {
    const calc = preferredIndex - currentIndex
    if (calc === 1) {
        return 'right'
    } else if (calc === -1) {
        return 'left'
    } else if (calc === columns) {
        return 'down'
    } else if (calc === -columns) {
        return 'up'
    } else if (calc === 14) {
        return 'left'
    } else if (calc === -14) {
        return 'right'
    }
}

function getShortestDistance(arrayOfIdexes) {
    const pacCellX = cells[pacman.currentIndex].dataset.x
    const pacCelly = cells[pacman.currentIndex].dataset.y

    const arrOfdistance = arrayOfIdexes.map(index => {
        const gCellX = cells[index].dataset.x
        const gCellY = cells[index].dataset.y
        const xDifference = pacCellX - gCellX
        const yDifference = pacCelly - gCellY
        const distance = Math.sqrt(((xDifference) ** 2) + ((yDifference) ** 2)) 
        return distance
    })

    const correctIndex = arrayOfIdexes[arrOfdistance.indexOf(Math.min(...arrOfdistance))]
    return correctIndex
}

function ghostsMoves() {
    // the ghost's moves
    // create an interval with the timing of its speed corresponding to the game speed
    ghostInterval = setInterval(() => {
        arrOfGhosts.forEach(ghost => {
            if (ghost.locked) {

            } else {
                // look at next space with current direction
                const la = getNextIndex(ghost.currentIndex, ghost.currentDirection)
                const directions = ['up', 'down', 'left', 'right']
                // get legal spaces around it (its previous position is not legal)
                const legalIndexes = directions.map(direction => {
                    return getNextIndex(la, direction)
                })
                const filteredIndexes = legalIndexes.filter(index => {
                    if (index === ghost.currentIndex) {
                        return false
                    } else {
                        return checkCellLegality(index)
                    }
                })
                // ! mvp is just to make it move by its self which can be made by choosing first available spot
                // if length of possible moves is equal to one
                if (filteredIndexes.length === 1) {
                    ghost.currentDirection = getDirection(filteredIndexes[0], la)
                } else {
                    // otherwise
                    if (ghost.frightened) {
                        const randomCell = filteredIndexes[Math.floor(Math.random() * filteredIndexes.length)]
                        ghost.currentDirection = getDirection(randomCell, la)
                    } else {
                        const preferedCellIndex = getShortestDistance(filteredIndexes)
                        const directionOfIndex = getDirection(preferedCellIndex, la)
                        // set direction to move in the cell with shortest distance
                        ghost.currentDirection = directionOfIndex
                    }
                }
                // move into space with current direction
                moveCharacter(ghost, la, )
                checkGhostColision(ghost)
            }
        });

    }, gameSpeed * ghostSpeed)

}

function pacmansMoves() {
    pacmanInterval = setInterval(() => {
        const nextPreferredCell = getNextIndex(pacman.currentIndex, pacman.preferredDirection)
        const nextCell = getNextIndex(pacman.currentIndex, pacman.currentDirection)
        if (checkCellLegality(nextPreferredCell)) {
            console.log(pacman.preferredDirection)
            moveCharacter(pacman, nextPreferredCell, pacman.preferredDirection)
            pacman.currentDirection = pacman.preferredDirection

        } else {
            if (checkCellLegality(nextCell)) {
                console.log(pacman.preferredDirection)
                console.log(pacman.currentDirection)
                moveCharacter(pacman, nextCell, pacman.currentDirection)
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

function resetCharacters() {
    pacman.currentDirection = 'left'
    pacman.preferredDirection = 'left'
    moveCharacter(pacman, pacman.startIndex, pacman.currentDirection)
    arrOfGhosts.forEach(ghost => {
        moveCharacter(ghost, ghost.startIndex)
        ghost.locked = true
        ghost.currentDirection = 'up'
    })
}

function handleHighScore() {
    if (score > highScore) {
        localStorage.setItem('p1pacmanHS', score)
        highScore = localStorage.getItem('p1pacmanHS')
    }
    highScoreEL.innerHTML = highScore

}

function removeFrightenedMode() {
    console.log('frightened mode over')
    arrOfGhosts.forEach(ghost => {
        ghost.frightened = false
        cells[ghost.currentIndex].classList.remove('frightened')
    })
    ghostSpeed = 1.1
    clearInterval(ghostInterval)
    ghostMultiplier = 1
}

function resetGame() {
    eatingSound.pause()
    eatingSound.currentTime = 0
    clearInterval(pacmanInterval)
    clearInterval(ghostInterval)
    clearTimeout(frightenedTime)
    removeFrightenedMode()
    arrOfGhosts.forEach(ghost => {
        clearTimeout(ghost.lockedTime)
    })
}

function checkGhostColision(character) {
    const cellClassList = cells[character.currentIndex].classList
    if (cellClassList.contains('ghost') && cellClassList.contains('pacman')) {
        // check if ghost is frightened if afraid mode is on
        arrOfGhosts.forEach(ghost => {
            if (cellClassList.contains(ghost.name)) {
                if (ghost.frightened) {
                    ghost.frightened = false
                    ghost.currentDirection = 'up'
                    console.log(ghostMultiplier)
                    score += 200 * ghostMultiplier
                    ghostMultiplier += 1
                    scoreEl.innerHTML = score
                    moveCharacter(ghost, 112,)
                } else {
                    // otherwise
                    resetGame()
                    // play dying sound
                    dyingSound.play()
                    // minus one from the life
                    lives--
                    livesSectionEl.removeChild(livesArr[livesArr.length - 1])
                    livesArr.pop()
                    // if lives are equal to zero
                    if (lives <= 0) {
                        // end game and display score
                        gameOver.classList.add('show')
                        handleHighScore()
                        score = 0
                        lives = 3
                        newGame = true
                        setTimeout(() => {
                            gameOver.classList.remove('show')
                            startButton.classList.remove('hide')
                        }, 3000)
                    } else {
                        setTimeout(() => {
                            startGame()

                        }, 1500)
                    }
                }
            }
        })


    }
}

function checkCell(character) {
    const cellClassList = cells[character.currentIndex].classList
    // if cell has a dot in it
    if (cellClassList.contains('pacdot')) {
        // play eating sound
        if (eatingSound.paused) {
            eatingSound.play()
        }
        // clear the dot and add 10 points to the score and 1 to collected dots
        cellClassList.remove('pacdot')
        score += 10
        dotsCollected += 1
        scoreEl.innerHTML = score
        // if collected dots are equal to the number of dots
        if (dotsCollected === numOfDots) {
            // start new round
            resetGame()
            addPacdots()
            startGame()
        }
    } else if (cellClassList.contains('power-pellet')) {
        cellClassList.remove('power-pellet')
        score += 40
        scoreEl.innerHTML = score
        arrOfGhosts.forEach(ghost => ghost.frightened = true)
        ghostSpeed = 1.6
        clearInterval(ghostInterval)
        ghostsMoves()
        clearTimeout(frightenedTime)
        frightenedTime = setTimeout(() => {
            removeFrightenedMode()
            ghostsMoves()
        }, 8000)



    } else {
        eatingSound.pause()
        eatingSound.currentTime = 0
    }
    // if cell has ghost in it
    checkGhostColision(character)


}

function unlockGhosts() {
    for (let index = 0; index < arrOfGhosts.length; index++) {
        const ghost = arrOfGhosts[index];
        ghost.lockedTime = setTimeout(() => {
            moveCharacter(ghost, 112)
            ghost.locked = false
        }, index * 2500)

    }
}

function startGame() {
    // console.log('lives:',lives)
    startButton.classList.add('hide')
    resetCharacters()
    if (newGame) {
        for (let index = 0; index < lives; index++) {
            addLife()
        }
        scoreEl.innerHTML = '00'
        newGame = false
        addPacdots()
        beginningSound.play()
        setTimeout(() => {
            pacmansMoves()
            unlockGhosts()
            ghostsMoves()
        }, 4500)

    } else {
        setTimeout(() => {
            pacmansMoves()
            unlockGhosts()
            ghostsMoves()
        }, 1500)
    }



}

/*------------------------event listeners----------------------*/

startButton.addEventListener('click', startGame)
document.addEventListener('keydown', pacmanDirecton)
