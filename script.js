const gameContainer = document.getElementById("game");
let firstCard, secondCard;
let hasFlippedCard, hasCompletedSecondClick = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  // for (let i = 0; i < colorArray.length; i++) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
// **Part Two - Implementing clicks and matches**
// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  // console.log("you just clicked", event.target);
  let element = event.target;

  //- Clicking a card should change the background color to be the color of the class it has.
  let color = element.className;
  element.style.backgroundColor = color;

  //"Flip" each element/card that has been clicked on.
  flipCard(event);
}

async function flipCard(event) {
  //element represents the card that has been clicked.
  let element = event.target;
  // element.classList.add('flipped');
  let lockBoard = false;

  if (lockBoard === true) {
    return;
  }
  else if (element !== firstCard) {
    //Set first Card if no cards have been flipped yet
    if (!hasFlippedCard) {
      firstCard = element;
      element.classList.add('flipped');
      hasFlippedCard = true;
      return;
    }
  }
  //Return if clicking on the same card (firstCard).
  else if (element === firstCard) {
    element.classList.add('flipped');
    return;
  }
  //Set Second Card
  //Set lockBoard = true so, Users can only change at most two cards at a time.
  secondCard = element;
  hasCompletedSecondClick = true;
  lockBoard = true;
  //After two card draws, hasFlippedCard needs to be reset
  hasFlippedCard = false;
  element.classList.add('flipped');
  //See if cards match.
  cardsMatch();
  return secondCard;
}

function cardsMatch() {
  if (hasCompletedSecondClick === true) {
    {
      let isMatch = firstCard.style.backgroundColor === secondCard.style.backgroundColor;
      // hasCompletedSecondClick = false;
      //If there's two matching cards, those cards stay face up. Otherwise, turn cards over again.
      isMatch ? stayFaceUP() : turnCardsOver();
    }
  }
}

function stayFaceUP() {
  firstCard.classList.add('matched');
  secondCard.classList.add('matched');
  hasCompletedSecondClick = false;
}

// //This function turns the cards over again after a second.
function turnCardsOver() {
  //lockBoard = true;
  setTimeout(() => {
    firstCard.style.backgroundColor = null;
    secondCard.style.backgroundColor = null;
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    hasCompletedSecondClick = false;
  }, 1000);
}

// when the DOM loads
createDivsForColors(shuffledColors);
