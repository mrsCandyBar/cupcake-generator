import Events from './pubsub.js';
import Data from './resources.js';

class generateCake {

  constructor(data) {
    this.description      = $('#description');
    this.menu             = $('#menu');
    this.favourites       = $('#currentCakes');
    this.cake             = $('#cake');
    this.added            = false
    this.store            = data;
    /*this.store.index      = () => {
        let current = this;
        for (let cake = 0; cake < this.store.cakes.length; cake++) {
          if (this.store.cakes[cake].type === current.type) {
            return cake;
          }
        }
      }*/

    this.cakes            = this.store.cakes;
    this.builder          = this.store.builder;
    this.cupcake          = this.store.cupcake;
  }

  init() {
    this._randomizeCupcake(this.builder, this.cupcake);
    this.bindUIevents();
    /*this.bindStoreEvents(this.store);*/
  }

  _randomizeCupcake(builder, cupcake) {
    for(let property in cupcake) {
      
      if (builder[property]) {
        let getValue = this._getRandomNumberBetween(0, builder[property].length - 1);
        cupcake[property] = builder[property][getValue];
        
        if (property === 'icing_type') {
          if (cupcake[property] === 'swirl') {
            cupcake.type = 'tall';
            cupcake.hasCream = '';
          } else {
            cupcake.type = 'short';
            cupcake.hasWafer = '';
          }
        } 
      }
    }

    this.added = false;
    this.render();
  }

  render() {
    this._generateCake('template/favourites.html', this.store, this.favourites);
    this._generateCake('template/cake.html', this.cupcake, this.cake);
    this._checkVisibility();
  }

  _generateCake(templateUrl, getCake, destination) {
    $.get(templateUrl, (template) => {
      let rendered = Mustache.render(template, getCake);
      destination.html(rendered);
    });
  }

  bindUIevents() {
    this.menu.delegate('#randomize', 'click', (button) => {
      this._randomizeCupcake(this.builder, this.cupcake);
    });

    this.menu.delegate('#add', 'click', (button) => {
      let getCake = JSON.stringify(this.cupcake);
      getCake = JSON.parse(getCake);
      this.cakes.push(getCake);

      this.added = true;
      this.render();
    });

    /*this.menu.delegate('button', 'click', (button) => {

      this.selectedCake = button.currentTarget.dataset.index ? button.currentTarget.dataset.index : this._getRandomNumberBetween(0,2);
      Events.emit('store.update.selected.cake', this.selectedCake);

      this.render(button.currentTarget.dataset);
    });*/
  };

  _checkVisibility() {
    if (this.added === true) {
      $('#add').hide();
    } else {
      $('#add').show();
    }
  }

  _getRandomNumberBetween(min, max) {
    let randomNumber,
      numberMin = min, 
      numberMax = max,
      maxTries = 3;

    for (let noOfTries = 0; noOfTries < maxTries; noOfTries++) {
      randomNumber = Math.round(Math.random() * (numberMax - numberMin) + numberMin);

      this.selectedCake = randomNumber;
      return this.selectedCake;

      /*if (randomNumber != this.selectedCake) {
        this.selectedCake = randomNumber;
        return this.selectedCake;
      } 

      if (noOfTries === (maxTries - 1)) {
        this.selectedCake = this.selectedCake != 0 ? 0 : 1;
        return this.selectedCake;
      } */
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

$.get('getSVG.html', function (data) {
  $('#SVG_holder').append(data);
});