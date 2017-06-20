import Events from './pubsub.js';
import Data from './resources.js';

class generateCake {

  constructor(data) {
    this.description      = $('#description');
    this.menu             = $('#menu');
    this.selectedCake     = 0;
    this.store            = data;
    this.store.index      = () => {
        let current = this;
        for (let cake = 0; cake < this.store.cakes.length; cake++) {
          if (this.store.cakes[cake].type === current.type) {
            return cake;
          }
        }
      }
  }

  init() {
    this.render();
    this.bindUIevents();
    this.bindStoreEvents(this.store);
  }

  render() {
    this._generateCake('template/description.html', this.store.cakes[this.selectedCake], this.description);
    this._generateCake('template/menu.html', this.store, this.menu);
  }

  _generateCake(templateUrl, getCake, destination) {
    $.get(templateUrl, (template) => {
      let rendered = Mustache.render(template, getCake);
      destination.html(rendered);
    });
  }

  bindUIevents() {
    this.menu.delegate('button', 'click', (button) => {

      this.selectedCake = button.currentTarget.dataset.index ? button.currentTarget.dataset.index : this._getRandomNumberBetween(0,2);
      Events.emit('store.update.selected.cake', this.selectedCake);

      this.render(button.currentTarget.dataset);
    });
  };

  _getRandomNumberBetween(min, max) {
    let randomNumber,
      numberMin = min, 
      numberMax = max,
      maxTries = 3;

    for (let noOfTries = 0; noOfTries < maxTries; noOfTries++) {
      randomNumber = Math.round(Math.random() * (numberMax - numberMin) + numberMin);

      if (randomNumber != this.selectedCake) {
        this.selectedCake = randomNumber;
        return this.selectedCake;
      } 

      if (noOfTries === (maxTries - 1)) {
        this.selectedCake = this.selectedCake != 0 ? 0 : 1;
        return this.selectedCake;
      } 
    }
  }

  bindStoreEvents(store) {
    Events.on('store.update.selected.cake', (selectedCake) => {
      this._setCakeAsSelected(store.cakes, selectedCake);
    });
  }

  _setCakeAsSelected(cakes, selectedCake) {
    cakes.forEach((cake, index) => {
      cake.status = (index != this.selectedCake) ? '' : 'btn-primary';
    });
  }
};

let startApp = new generateCake(Data).init();