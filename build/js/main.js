import Events from './pubsub.js';
import Data from './resources.js';
import Update from './updateStore.js';
import RandomCupcake from './randomize.js';

class generateCake {

  constructor(data) {
    this.$favourites       = $('#currentCakes');
    this.$cake             = $('#cake');
    this.$menu             = $('#menu');
    this.store            = data;
  }

  init() {
    this.bindStoreEvents(this.store);
    this.bindUIevents();
    Events.emit('create.random.cake', this.store);
  }

  render(store) {
    this._generateCake('template/favourites.html', store, this.$favourites);
    this._generateCake('template/cake.html', store.cupcake, this.$cake);
    this._checkIfCakeExists(store);
  }

  _generateCake(templateUrl, getCake, destination) {
    $.get(templateUrl, (template) => {
      let rendered = Mustache.render(template, getCake);
      destination.html(rendered);
    });
  }

  _checkIfCakeExists(store) {
    $('#add').show();
    store.cakes.forEach(cake => {
      cake.status = '';

      if (cake.cupcake === JSON.stringify(store.cupcake)) {
        $('#add').hide();
        cake.status = 'active';
      } 
    });
  }

  bindUIevents() {
    this.$menu.delegate('#randomize', 'click', (button) => {
      Events.emit('create.random.cake', this.store);
    });

    this.$menu.delegate('#add', 'click', (button) => {
      this._addCakeToList();
    });

    this.$favourites.delegate('span', 'click', (button) => {
      this._removeCakeFromList(button.currentTarget.parentElement.dataset.index);
    });

    this.$favourites.delegate('button', 'click', (button) => {
      if (!button.currentTarget.children.length > 0) {
        this._showCakeFromList(button.currentTarget.dataset.index);
      }
    });
  };

  _addCakeToList() {
    let visibleCake = { 
      index   : this.store.cakes.length,
      cupcake : JSON.stringify(this.store.cupcake) 
    }

    this.store.cakes.push(visibleCake);
    this.render();
  }

  _removeCakeFromList(listIndex) {
    this.store.cakes.splice(listIndex, 1);

    if (this.store.cakes.length > 0) { 
      this.store.cakes.forEach((cake, index) => {
        cake.index = index;
      });
      this._showNextCakeInList(listIndex);
    } else { 
      Events.emit('create.random.cake', this.store);
    }
  }

  _showNextCakeInList(index) {
    index = !this.store.cakes[index] ? index - 1 : index;
    this._showCakeFromList(index)
  }

  _showCakeFromList(listIndex) {
    this.store.cakes.forEach((cake, index) => {
      cake.status = (index === listIndex) ? 'active' : '';
    });
    
    let getCake = JSON.parse(this.store.cakes[listIndex]['cupcake']);
    this.store.cupcake = getCake;
    this.render();
  }

  bindStoreEvents(store) {
    Events.on('create.random.cake', (store) => {
      this.render(RandomCupcake.createRandomCupcake(store));
    });
    Events.on('store.update.cake', (store) => {
      this._setCakeAsSelected(store);
    });
  }
};

let startApp = new generateCake(Data).init();
$.get('getSVG.html', function (data) {
  $('#SVG_holder').append(data);
});