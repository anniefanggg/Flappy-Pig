document.addEventListener('DOMContentLoaded' , () => {
  // Define variables.
  const pig = document.querySelector('.pig')
  const gameDisplay = document.querySelector('.game-container')
  const ground = document.querySelector('.ground')

  // Hard code starting position of pig.
  let pigLeft = 220
  let pigBottom = 100
  let gravity = 2

  function startGame() {
    /*
      Parameters: None
      Returns: None
      Purpose: Graphs pig relative to the sky element.
    */
    pigBottom -= gravity
    pig.style.bottom = pigBottom + 'px'
    pig.style.left = pigLeft + 'px'
  }
  // Get the pig to appear to be dropping forever.
  let timerId = setInterval(startGame, 20)

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

})
