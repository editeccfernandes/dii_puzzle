sintomas = ['sintoma_6', 'sintoma_4', 'sintoma_7'];

var delayInMilliseconds = 100; //1 second

var correctAnswers = 0;
var allCorrectAnswers = 3;

$('.stopwatch').countimer({
  autoStart: true,
  useHours: false,

});


var timer0 = $('.timer').startTimer({
  onComplete: function () {
    if (correctAnswers <= 2) {

      $('#perdeste').popup('show');

      $("#rightAnswers").html(correctAnswers);
      $("#allRightAnswers").html(allCorrectAnswers)


    } else if (correctAnswers == 3) {
      $('.stopwatch').countimer('stop');
      $('#ganhaste').popup('show');

    }
  }
}).trigger('start');


Array.prototype.remove = function (v) {
  if (this.indexOf(v) != -1) {
    this.splice(this.indexOf(v), 1);
    return true;
  }
  return false;
}

class MemoryGame {

  constructor() {
    this.duration = 1000;
    this.cardsContainer = document.querySelector('.js-cards');
    this.cards = Array.from(this.cardsContainer.children);
  }

  shuffleCards() {
    this.cards.forEach(card => {
      const randomNumber = Math.floor(Math.random() * this.cards.length) + 1;

      card.classList.remove('has-match');

      setTimeout(() => {
        card.style.order = `${randomNumber}`;
      }, 400);
    });
  }

  checkAllCards() {
    if (!this.cards.every(card => card.classList.contains('has-match'))) return;

    setTimeout(() => {
      this.shuffleCards();
    }, this.duration);
  }

  stopEvent() {
    this.cardsContainer.classList.add('no-event');

    setTimeout(() => {
      this.cardsContainer.classList.remove('no-event');
    }, this.duration);
  }


  checkIfMatched(card) {
    if (sintomas.includes(card.dataset.sintoma)) {
      card.classList.remove('flipped');


      sintomas.remove("" + card.dataset.sintoma + "");
      setTimeout(function () {
        card.classList.add('has-match');
      }, delayInMilliseconds);
      correctAnswers++;
      if (correctAnswers == 3) {
        timer0.trigger('pause');
        $('.stopwatch').countimer('stop');


        window.setTimeout(function () {
          $.confetti.start();

          $('#ganhaste').popup('show');

        }, 6000)
      }
      this.checkAllCards();


    } else {
      card.classList.add('no-match');

      setTimeout(() => {
        card.classList.remove('flipped');
      }, this.duration);
    }
  }

  flip(selectedCard) {
    selectedCard.classList.add('flipped');

    const flippedCards = this.cards.filter(card => card.classList.contains('flipped'));

    if (flippedCards.length === 1) {
      this.stopEvent();
      this.checkIfMatched(flippedCards[0]);
    }
  }
}

const game = new MemoryGame();
game.cards.forEach(card => {

  card.addEventListener('click', game.flip.bind(game, card));
});

function shuffle() {
  var container = document.getElementById("container");
  var elementsArray = Array.prototype.slice.call(container.getElementsByClassName('js-card'));
  elementsArray.forEach(function (element) {
    container.removeChild(element);
  })
  shuffleArray(elementsArray);
  elementsArray.forEach(function (element) {
    container.appendChild(element);
  })
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

shuffle();


$('#perdeste').popup({
  opacity: 0,
  transition: 'all 0.5s'
});
$('#ganhaste').popup({
  opacity: 0,
  transition: 'all 0.5s'
});


$(".refreshBrowser").on("click", function () {
  location.reload();
})