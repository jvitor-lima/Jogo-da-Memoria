const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const contError = document.querySelector('.pontuacao');

const characters = [
  'gwen',
  'teemo',
  'poro',
  'zyra',
  'lulu',
  'zoe',
  'neeko',
  'xayah',
  'fizz',
  'yummi',
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 20) {
    clearInterval(this.loop);
    alert(`sua pontuação foi: ${contError.innerHTML}`)
    if (contError.innerHTML >= 250){
      alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML} segundos`);
      alert(`Encaminhando para o proximo nivel... `)
      window.location.href = "../pages/game_hard.html";
    }else{
      alert(`Que pena, ${spanPlayer.innerHTML}! Sua pontuação foi abaixo de 250`);
      alert(`Estamos reiniciando a fase para que você tente novamente... `)
      window.location.href = "../pages/game_medium.html";
  }
}
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');
    firstCard = '';
    secondCard = '';
    addPontuacao ();
    //const audio = new Audio('../audio/ping.mp3');
    //audio.play();
    checkEndGame();
  } else {
    removePontuacao();
    const audio = new Audio('../audio/ping.mp3');
    audio.play();
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');
      firstCard = '';
      secondCard = '';

    }, 500);
  }

}

const revealCard = ({ target }) => {

  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {

    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;

  } else if (secondCard === '') {

    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;

    checkCards();

  }  
}

const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character)

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [ ...characters, ...characters ];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}
const removePontuacao = () => {
  const pontos = +contError.innerHTML;
  contError.innerHTML = pontos - 25;
}
const addPontuacao = () => {
  const pontos = +contError.innerHTML;
  contError.innerHTML = pontos + 50;
}

const startTimer = () => {

  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);

}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}
