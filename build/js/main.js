import Events from './pubsub.js';
import Data from './resources.js';
import Update from './updateStore.js';
import RandomCupcake from './randomize.js';

class generateCake {

  constructor(data) {
    this.$favourites       = $('#currentCakes');
    this.$cake             = $('#cake');
    this.$menu             = $('#menu');
    this.$add              = $('#add');
    this.store               = data;
  }

  init() {
    this.bindStoreEvents();
    this.bindUIevents(this.store);
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
    this.$add.show();
    store.cakes.forEach(cake => {
      cake.status = '';

      if (cake.cupcake === JSON.stringify(store.cupcake)) {
        this.$add.hide();
        cake.status = 'active';
      } 
    });
  }

  bindUIevents(store) {
    this.$menu.delegate('#randomize', 'click', (button) => {
      Events.emit('create.random.cake', store);
    });

    this.$menu.delegate('#add', 'click', (button) => {
      Events.emit('add.random.cake', store);
    });

    this.$favourites.delegate('button', 'click', (button) => {
      if (!button.currentTarget.children.length > 0) {
        Events.emit('select.cake.from.list', { store: store, index: button.currentTarget.dataset.index});
      }
    });

    this.$favourites.delegate('span', 'click', (button) => {
      Events.emit('remove.cake.from.list', { store: store, index: button.currentTarget.parentElement.dataset.index});
    });
  };

  bindStoreEvents() {
    Events.on('create.random.cake', (store) => {
      this.render(RandomCupcake.createRandomCupcake(store));
    });
    Events.on('add.random.cake', (store) => {
      this.render(Update.addCakeToList(store));
    });
    Events.on('select.cake.from.list', (store) => {
      this.render(Update.showCakeFromList(store));
    });
    Events.on('remove.cake.from.list', (store) => {
      Update.removeCakeFromList(store).then((updateStore) => {
        this.render(updateStore);
      }, (emptyStore) => {
        this.render(RandomCupcake.createRandomCupcake(emptyStore));
      });
    });
  }
};

let startApp = new generateCake(Data).init();
$.get('getSVG.html', function (data) {
  $('#SVG_holder').append(data);
});