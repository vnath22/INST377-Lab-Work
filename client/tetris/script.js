document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const square = Arrary.from(document.querySelectorAll('.grid div'));
  const ScoreDisplay = document.querySelect('#score');
  const startBtn = document.querySelect('#start-button');
  const width = 10;
  let nextRandom = 0
  let timerId


  // The Tetrominoes
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ];

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ];

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ];

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, otetromino, iTetromino];

  let currentPosition = 4;
  let currentRotation = 0;

  // select the tetromino randomly and its first rotation
  let random = Math.floor(Math.random() * theTetrominoes.length);
  let current = theTetrominoes[random][0];

  // draw the tetromino
  function draw() {
    current.forEach((index) => {
      square[currentPosition + index].classList.add('tetromino');
    });
  }

    //undraw the tetromino
    function undraw() {
        current.forEach((index) => {
          square[currentPosition + index].classList.remove('tetromino');
        });

    //make the tetromino move down every second
    // timerId = setInterval(moveDown, 1000);

    //assign functions to keyCodes
    function control(e){
        if(e.keyCodes === 37){
            moveLeft()
        } else if (e.keyCodes === 38){
            rotate()
        } else if (e.keyCodes === 39){
            moverRight()
        } else if (e.keyCodes === 40){
            moveDown()
        }
    }
    document.addEventListener('keyup', control)

    //move down function 
    function moveDown() {
        undraw();
        currentPosition +=width;
        draw();
    }

    //freeze function
    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'));
            //start a new tetromino falling
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[random][currentPosition]
            currentPosition = 4
            draw()
            displayShape()
        }
    }

    //move the tetromino left, unless is at the edge or there is a blockage
    function moveLeft(){
        undraw()
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if(!isAtLeftEdge) currentPosition -= 1, width

        if(current.some(index => square[currentPosition + index].classList.contains('taken'))){
            currentPosition += 1
        }

        draw()
    }

    //move the tetromino right, unless is at the edge or there is a blockage
    function moveRight(){
        undraw()
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)

        if(!isAtRightEdge) currentPosition +=1

        if(current.some(index => square[currentPosition + index].classList.contains('taken'))){
            currentPosition -=1
        }

        draw()
    }

    // rotate the tetromino
    function rotate(){
        undraw()
        currentPosition ++
        if(currentPosition === current.length){ // if the current rotation get to 4, make it go back to 0
            currentPosition = 0
        }
        current = theTetrominoes[random][currentRotation]
        draw()
    }

    //show up-next tetromino in mini-grid
    const displaySquares = document.querySelectorAll('.mimi-grid div')
    const displayWidth = 4
    let displayIndex = 0

    // the Tetrominoes without rotations
    const upNextTetrominoes = [
        [1, displayWidth+1, displayWidth*2+1, 2],  //lTetromino
        [0, displayWidth, displayWidth+1, displayWidth*2+1],  //zTetromino
        [1, displayWidth, displayWidth+1, displayWidth+2],  //tTetromino
        [0, 1, displayWidth, displayWidth+1],  //oTetromino
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]  //iTetromino
    ]

    //display the stage in the mini-grid display
    function displayShape(){
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
        })
        upNextTetrominoes[nextRandom].forEach(index => {displaySquares[displayIndex + index].classList.add('tetromino')})
    }

    //add function to the button
    startBtn.addEventListener('click', () =>{
        if (timerId){
            clearInterval(timerId)
            timerId = null
        }else {
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            displayShape()
        }
    })


    
    // //add score
    // function addScore() {
    //     for()
    // }


});
