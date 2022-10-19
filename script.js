const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let fisrtCard, secondCard;
let lockBoard = false;

function flipCard() {
    if(lockBoard) return;
    if(this === fisrtCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard){
        hasFlippedCard = true;
        fisrtCard = this;
        return; 
    }

    secondCard = this;
    hasFlippedCard = false;
    chechForMath();
}


function chechForMath() {
    if(fisrtCard.dataset.card === secondCard.dataset.card){
    disableCards();
    return;
    }
    unflipCards();
}

function disableCards() {
    fisrtCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard)

    resetBoard();
}


function unflipCards(){
    lockBoard = true;

    setTimeout(() => {
        fisrtCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 950);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [fisrtCard, secondCard] = [null, null];
}
 

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
})