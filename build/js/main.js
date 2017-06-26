import Events from './pubsub.js';
import Data from './resources.js';
import Update from './updateStore.js';
import RandomCupcake from './randomize.js';

class GenerateCake {

  constructor(data) {
    this.$cake             = $('#cake');
    this.$control          = $('#controls');
    this.store             = data;
  }

  init() {
    $.get('getSVG.html', function (data) {
      $('#SVG_holder').append(data);
    });

    this.bindStoreEvents();
    this.bindUIevents(this.store);
    Events.emit('create.random.cake', this.store);
  }

  render(store) {
    _generateCake('template/cake.html', store, this.$cake);
    _checkIfCakeExists(store, this.$control);
  }

  bindUIevents(store) {
    this.$control.delegate('button', 'click', (button) => {
      let buttonId = button.currentTarget.id;

      if (buttonId === 'randomize') {
        Events.emit('create.random.cake', store); } 

      else if (buttonId === 'add') {
        Events.emit('add.random.cake', store); }

      else if (buttonId === 'edit') {
        Events.emit('edit.cake.from.list', store); }

      else if (buttonId === 'remove') {
        Events.emit('remove.cake.from.list', store); }

      else if (buttonId === 'toggle_menu') { 
        _generateCake('template/favourites.html', store, this.$cake); 
      }
    });

    this.$cake.delegate('button', 'click', (button) => {
      let buttonId = button.currentTarget.id;

      if (buttonId === 'save') {
        Events.emit('update.current.cake', store);

      } else {
        store.active = button.currentTarget.dataset.index;
        Events.emit('select.cake.from.list', store);
      }
    });

    this.$cake.delegate('#icing_type', 'change', (button) => {
      toggleOptional(store.cupcake.type);
    });
  };

  bindStoreEvents() {
    Events.on('create.random.cake', (store) => {
      store.active = '';
      this.render(RandomCupcake.createRandomCupcake(store));
    });

    Events.on('add.random.cake', (store) => {
      this.render(Update.addCakeToList(store));
    });
    
    Events.on('edit.cake.from.list', (store) => {
      _generateCake('template/edit.html', store, this.$cake);
      setTimeout(() => {
        removeDuplicateOptions();
        toggleOptional(store.cupcake.type);
      },200);
    });

    Events.on('remove.cake.from.list', (store) => {
      Update.removeCakeFromList(store).then((updateStore) => {
        this.render(updateStore);
      }, (emptyStore) => {
        Events.emit('create.random.cake', store);
      });
    });

    Events.on('select.cake.from.list', (store) => {
      this.render(Update.showCakeFromList(store));
    });

    Events.on('update.current.cake', (store) => {
      let updateStore = createNewCupcake(store);
      this.render(Update.updateCakeInList(updateStore));
    });
  }
};

let startApp = new GenerateCake(Data).init();

function _generateCake(templateUrl, getCake, destination) {
  $.get(templateUrl, (template) => {
    let rendered = Mustache.render(template, getCake);
    destination.html(rendered);
  });
}

function _checkIfCakeExists(store, controls) {
    controls.find('#add').show();
    controls.find('#remove').hide();
    controls.find('#toggle_menu').show();

    if (store.cakes.length > 0) {
      store.cakes.forEach(cake => {
        cake.status = '';
        
        if (JSON.stringify(cake.cupcake) === JSON.stringify(store.cupcake)) {
          controls.find('#add').hide();
          controls.find('#remove').show();
          cake.status = 'active';
        } 
      });
    } else {
      controls.find('#toggle_menu').hide();
    }
  }

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