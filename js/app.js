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
        // if it is the start of a new round set each open space to have a dot in it
            // filter the list of cells wich have the class open and add the class of dot to it
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
                

// * 