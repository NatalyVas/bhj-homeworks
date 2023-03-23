class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');

    this.wordNow;
    this.reset();
    
    this.countTime;

    this.registerEvents();
    this.intervaId;
      
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = 0;
    this.lossElement.textContent = 0;
  }

  registerEvents() {
    /*
      TODO:
      Написать обработчик события, который откликается
      на каждый введённый символ.
      В случае правильного ввода слова вызываем this.success()
      При неправильном вводе символа - this.fail();
      DOM-элемент текущего символа находится в свойстве this.currentSymbol.
     */

    /* 
      Для обратного отсчета времени написала функцию setTime(), ставила ее в setNewWord()
      для отсчета интервала времени заново. добавила условие проверки счетчика времени перед this.success()
      и this.fail() (здесь ниже в обработчике события). Но что-то здесь не так, не могу разобраться
    */

        document.addEventListener(`keydown`, (event) => this.currentSymbol.textContent.toUpperCase() === event.key.toUpperCase() && this.countTime >= 0 ? 
          this.success()
         : this.fail());
  }

  setTime(wordNow) {
    document.querySelector(`.status__time`).textContent = this.wordNow.length;
    this.countTime = this.wordNow.length;
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.countTime -= 1;
      document.querySelector(`.status__time`).textContent = this.countTime;
      if (this.countTime < 0) {
        this.fail();
      }
    }, 1000);

  }

  success() {
    if(this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      alert('Победа!');
      this.reset();
    }
    this.setNewWord();
    
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      alert('Вы проиграли!');
      this.reset();
    }
    this.setNewWord();
    
  }

  setNewWord() {
    const word = this.getWord();

    this.renderWord(word);
    this.wordNow = word;
    this.setTime(this.wordNow);
  }

  getWord() {
    const words = [
        'bob',
        'awesome',
        'netology',
        'hello',
        'kitty',
        'rock',
        'youtube',
        'popcorn',
        'cinema',
        'love',
        'javascript'
      ],
      index = Math.floor(Math.random() * words.length);

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

const game = new Game(document.getElementById('game'))

