import Events from './pubsub.js';
import Data from './resources.js';

class generateCake {

  constructor(data) {
    this.$favourites       = $('#currentCakes');
    this.$cake             = $('#cake');
    this.$menu             = $('#menu');
    this.store            = data;
  }

  init() {
    this.randomizeCupcake(this.store);
    this.bindUIevents();
    /*this.bindStoreEvents(this.store);*/
  }

  randomizeCupcake(store) {
    if (store.cupcake && store.builder) {
      for(let property in store.cupcake) {
        if (store.builder[property]) {
          let index = this._getRandomNumberBetween(store.builder[property]);
          store.cupcake[property] = store.builder[property][index];
        }
      }

      this._isCupcakeTall(store.cupcake);
      this.render();
    }
  }

  _getRandomNumberBetween(obj) {
    return Math.round(Math.random() * (obj.length - 1));
  }

  _isCupcakeTall(cupcake) {
    cupcake.type = cupcake['icing_type'] === 'swirl' ? 'tall' : 'short';
    cupcake = cupcake['icing_type'] === 'swirl' ? cupcake.hasCream = '' : cupcake.hasWafer = '';
  }

  render() {
    this._generateCake('template/favourites.html', this.store, this.$favourites);
    this._generateCake('template/cake.html', this.store.cupcake, this.$cake);
    this._checkIfCakeExists(this.store);
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
      this.randomizeCupcake(this.store);
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
      this.randomizeCupcake(this.store); 
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

  

  /*bindStoreEvents(store) {
    Events.on('store.update.selected.cake', (selectedCake) => {
      this._setCakeAsSelected(store.cakes, selectedCake);
    });
  }

  _setCakeAsSelected(cakes, selectedCake) {
    cakes.forEach((cake, index) => {
      cake.status = (index != this.selectedCake) ? '' : 'btn-primary';
    });
  }*/
};

let startApp = new generateCake(Data).init();
$.get('getSVG.html', function (data) {
  $('#SVG_holder').append(data);
});