document.addEventListener('DOMContentLoaded' , () => {
  // Define variables.
  const pig = document.querySelector('.pig')
  const gameDisplay = document.querySelector('.game-container')
  const ground = document.querySelector('.ground')

  // Hard code starting position of pig.
  let pigLeft = 220
  let pigBottom = 100
  let gravity = 2
  let isGameOver = false
  let gap = 450

  function startGame() {
    /*
      Parameters: None
      Returns: None
      Purpose: Graphs pig relative to the sky element.
    */
    if (!isGameOver) {
      pigBottom -= gravity
      pig.style.bottom = pigBottom + 'px'
      pig.style.left = pigLeft + 'px'
    }
  }
  // Get the pig to appear to be dropping forever.
  let gameTimerId = setInterval(startGame, 20)

  function control(event) {
    /*
      Parameters: event object, which contains information about the event
        that triggered the event listener.
      Returns: None
      Purpose: Makes sure pig only moves upwards if spacebar is hit.
    */
    if (event.keyCode === 32) {
      jump()
    }
  }

  function jump() {
    /*
      Parameters: None
      Returns: None
      Purpose: Move the pig upwards, making it appear to jump.
    */
    if (pigBottom < 500) pigBottom += 50
    pig.style.bottom = pigBottom + 'px'
    console.log(pigBottom)
  }
  document.addEventListener('keyup', control)

    function generateObstacle() {
      /*
        Parameters: None
        Returns: None
        Purpose: Generates an obstacle of random height that moves to the left
        as long as game is not yet over.
      */
      let obstacleLeft = 500
      let randomHeight = Math.random() * 80
      let obstacleBottom = randomHeight
      const obstacle = document.createElement('div')
      const northObstacle = document.createElement('div')

      // If game is not over continue to generate obstacles.
      if (!isGameOver) {
        obstacle.classList.add('obstacle')
        northObstacle.classList.add('northObstacle')
      }
      // Add obstacle to the game display.
      gameDisplay.appendChild(obstacle)
      gameDisplay.appendChild(northObstacle)
      // Move obstacle to the left and up/down.
      obstacle.style.left = obstacleLeft + 'px'
      northObstacle.style.left = obstacleLeft + 'px'
      obstacle.style.bottom = obstacleBottom + 'px'
      northObstacle.style.bottom = obstacleBottom + gap + 'px'

      function moveObstacle() {
        /*
          Parameters: None
          Returns: None
          Purpose: Either moves obstacle to left until it is off the screen or until game is over.
        */
        if (!isGameOver) {}
        obstacleLeft -= 2
        // Add 100 px to the obstacle relative to the div it is in.
        obstacle.style.left = obstacleLeft + 'px'
        northObstacle.style.left = obstacleLeft + 'px'

        // Once obstacle has moved left until it is off the screen, remove it.
        if (obstacleLeft === -60) {
          clearInterval(timerId)
          gameDisplay.removeChild(obstacle)
          gameDisplay.removeChild(northObstacle)
        }
        // Game ends if these requirements are met.
        if (
          obstacleLeft > 200 && obstacleLeft < 280 && pigLeft === 220 &&
          (pigBottom < obstacleBottom + 153 || pigBottom > obstacleBottom + gap - 200) ||
          pigBottom === 0) {
          gameOver()
          // Game timer is reset.
          clearInterval(timerId)
        }

      }
      // Moves obstacle every 20 ms and generates new obstacle every 3000 ms.
      let timerId = setInterval(moveObstacle, 20)
      if (!isGameOver) setTimeout(generateObstacle, 3000)
    }
    
    generateObstacle()

    function gameOver() {
      /*
        Parameters: None
        Returns: None
        Purpose: Stops game timer and also jumping effect associated with space bar.
      */
      // When game is over stop timer
      clearInterval(gameTimerId)
      console.log('game over')
      isGameOver = true
      displayGameOver()
      // Removes jumping effect (keyup) when space bar (control) is hit.
      document.removeEventListener('keyup', control)
    }

    function displayGameOver () {
      /*
        Parameters: None
        Returns: None
        Purpose: Displays alert if game is over.
      */
      if (isGameOver) {
        alert("Game over. Reload page to play again.")
      }
    }
})
