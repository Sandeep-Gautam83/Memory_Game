document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
      { name: 'fries', img: 'images/fries.png' },
      { name: 'cheeseburger', img: 'images/cheeseburger.png' },
      { name: 'ice-cream', img: 'images/ice-cream.png' },
      { name: 'pizza', img: 'images/pizza.png' },
      { name: 'milkshake', img: 'images/milkshake.png' },
      { name: 'hotdog', img: 'images/hotdog.png' },
      { name: 'fries', img: 'images/fries.png' },
      { name: 'cheeseburger', img: 'images/cheeseburger.png' },
      { name: 'ice-cream', img: 'images/ice-cream.png' },
      { name: 'pizza', img: 'images/pizza.png' },
      { name: 'milkshake', img: 'images/milkshake.png' },
      { name: 'hotdog', img: 'images/hotdog.png' },
    ];
  
    cardArray.sort(() => 0.5 - Math.random());
  
    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    const livesDisplay = document.querySelector('#lives');
    const restartButton = document.querySelector('#restart');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let lives = 5;
  
    // Create the game board
    function createBoard() {
      grid.innerHTML = '';
      cardArray.forEach((_, i) => {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
      });
    }
  
    // Check for matches
    function checkForMatch() {
      const cards = document.querySelectorAll('img');
      const [optionOneId, optionTwoId] = cardsChosenId;
  
      if (optionOneId === optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
        alert('You clicked the same card!');
      } else if (cardsChosen[0] === cardsChosen[1]) {
        alert('You found a match!');
        cards[optionOneId].setAttribute('src', 'images/white.png');
        cards[optionTwoId].setAttribute('src', 'images/white.png');
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
      } else {
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
        lives--;
        updateLivesDisplay();
        alert('Try again!');
      }

      cardsChosen = [];
      cardsChosenId = [];
      resultDisplay.textContent = ` ${cardsWon.length}`;
      checkGameOver();
    }
  
    // Flip the card
    function flipCard() {
      const cardId = this.getAttribute('data-id');
      if (!cardsChosenId.includes(cardId)) {
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        if (cardsChosen.length === 2) {
          setTimeout(checkForMatch, 500);
        }
      }
    }
  
    // Check if the game is over
    function checkGameOver() {
      if (cardsWon.length === cardArray.length / 2) {
        resultDisplay.textContent = 'Congratulations! You found them all!';
        grid.innerHTML = '';
      } else if (lives === 0) {
        alert('Game Over! You ran out of lives!');
        grid.innerHTML = '';
      }
    }
  
    // Update lives display
    function updateLivesDisplay() {
      livesDisplay.textContent = '❤️'.repeat(lives);
    }
  
    // Restart the game
    function restartGame() {
      lives = 5;
      cardsWon = [];
      updateLivesDisplay();
      cardArray.sort(() => 0.5 - Math.random());
      createBoard();
    }
  
    restartButton.addEventListener('click', restartGame);
  
    // Initial setup
    updateLivesDisplay();
    createBoard();
});