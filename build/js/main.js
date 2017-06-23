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
    this.builder          = this.store.builder;
    this.cupcake          = this.store.cupcake;
    this.cakes            = this.store.cakes;
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
    console.log('woot 2');
    cupcake.type  = cupcake['icing_type'] === 'swirl' ? 'tall' : 'short';
    cupcake       = cupcake['icing_type'] === 'swirl' ? cupcake.hasCream = '' : cupcake.hasWafer = '';
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
      this.randomizeCupcake(this.store);
    });

    this.menu.delegate('#add', 'click', (button) => {
      this.cupcake.index = this.store.cakes.length - 1;
      let getCake = JSON.stringify(this.cupcake);
      this.cakes.push({ cupcake: getCake });

      this.added = true;
      this.render();
    });

    this.favourites.delegate('span', 'click', (button) => {
      let getCake = button.currentTarget.parentElement.dataset.index;
      this.cakes.splice(getCake, 1);

      if (this.cakes.length > 0) {
        if (this.cakes[getCake]) {
          getCake = this.cakes[getCake]['cupcake'];
        } else {
          getCake = this.cakes[getCake - 1]['cupcake']
        }
        getCake = JSON.parse(getCake);
        this.cupcake = getCake;
        this.render();
      }
      else {
        this.added = false;
        this.randomizeCupcake(this.store);
      } 

      return false;
    });

    this.favourites.delegate('button', 'click', (button) => {
      this.cakes.forEach((cake, index) => {
        cake.status = (index == button.currentTarget.dataset.index) ? 'active' : '';
      });
      let getCake = JSON.parse(this.cakes[button.currentTarget.dataset.index]['cupcake']);
      this.cupcake = getCake;
      this.added = true;
      this.render();
    });
  };

  _checkVisibility() {
    if (this.added === true) {
      $('#add').hide();
    } else {
      this.cakes.forEach((cake, index) => {
        cake.status = '';
      });
      $('#add').show();
    }
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