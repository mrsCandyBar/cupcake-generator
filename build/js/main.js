import Events from './pubsub.js';
import Data from './resources.js';
import Update from './updateStore.js';
import RandomCupcake from './randomize.js';

class generateCake {

  constructor(data) {
    this.$cake             = $('#cake');
    this.$control          = $('#controls');
    this.$add              = $('#add');
    this.$remove           = $('#remove');
    this.$menu             = $('#toggle_menu');
    this.store             = data;
  }

  init() {
    this.bindStoreEvents();
    this.bindUIevents(this.store);
    Events.emit('create.random.cake', this.store);
  }

  render(store) {
    this._generateCake('template/cake.html', store, this.$cake);
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
    this.$remove.hide();
    this.$menu.show();

    console.log('store >>>', store);
    if (store.cakes.length > 0) {
      store.cakes.forEach(cake => {
        cake.status = '';
        
        if (JSON.stringify(cake.cupcake) === JSON.stringify(store.cupcake)) {
          this.$add.hide();
          this.$remove.show();
          cake.status = 'active';
        } 
      });
    } else {
      this.$menu.hide();
    }
  }

  bindUIevents(store) {
    this.$control.delegate('#randomize', 'click', (button) => {
      store.index = '';
      Events.emit('create.random.cake', store);
    });

    this.$control.delegate('#add', 'click', (button) => {
      Events.emit('add.random.cake', store);
    });

    this.$control.delegate('#remove', 'click', (button) => {
      Events.emit('remove.cake.from.list', store);
    });

    this.$control.delegate('#toggle_menu', 'click', (button) => {
      this._generateCake('template/favourites.html', store, this.$cake);
    });

    this.$control.delegate('#edit', 'click', (button) => {
      Events.emit('edit.cake.from.list', store);
    });

    this.$cake.delegate('nav button', 'click', (button) => {
      store.index = button.currentTarget.dataset.index;
      Events.emit('select.cake.from.list', store);
    });

    this.$cake.delegate('#icing_type', 'change', (button) => {
      toggleOptional(store.cupcake.type);
    });

    this.$cake.delegate('#save', 'click', (button) => {
      Events.emit('update.current.cake', store);
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
        Events.emit('create.random.cake', store);
      });
    });

    Events.on('edit.cake.from.list', (store) => {
      this._generateCake('template/edit.html', store, this.$cake);
      setTimeout(() => {
        removeDuplicateOptions();
        toggleOptional(store.cupcake.type);
      },200);
    });

    Events.on('update.current.cake', (store) => {
      let updateStore = createNewCupcake(store);
      this.render(Update.updateCakeInList(updateStore));
    });
  }
};

let startApp = new generateCake(Data).init();
$.get('getSVG.html', function (data) {
  $('#SVG_holder').append(data);
});

function toggleOptional(typeOfCupcake) {
  if ($('#icing_type').val() === 'swirl') {
    $('#hasCream')
      .hide()
      .find('input').prop('checked', false);
    $('#hasWafer').show();
    typeOfCupcake = "tall";

  } else {
    $('#hasCream').show();
    $('#hasWafer')
      .hide()
      .find('input').prop('checked', false);
    typeOfCupcake = "short";
  }
}

function createNewCupcake(store) {
  for(let property in store.builder) {
    if (document.getElementById(property).type && document.getElementById(property).type.indexOf('select') > -1) {
      store.cupcake[property] = $('#' + property).val();
    } else {
      store.cupcake[property] = $('#' + property).find('input[type=checkbox]').prop('checked');
    }
  };

  return store;
}

function removeDuplicateOptions() {
    
  $('#cake select').each(function(){
    let selectBox = $(this);
    
    selectBox.find('option').each(function() {
      let duplicate = 0;
      let option = $(this);

      selectBox.find('option').each(function() {
        if ($(this).text() === option.text()) {
          duplicate++;
          $(this).attr('value',$(this).text());

          if (duplicate === 2) {
            option.remove();
            $(this).prop('selected',true);
          }
        }
      });
    });
  });
}