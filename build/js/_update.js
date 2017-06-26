
class UpdateStore {

  addCakeToList(store) {
    let visibleCake = { 
      index   : store.cakes.length,
      cupcake : JSON.stringify(store.cupcake) 
    }

    store.active = parseFloat(visibleCake.index);
    visibleCake.cupcake = JSON.parse(visibleCake.cupcake);
    store.cakes.push(visibleCake);
    return store;
  }

  showCakeFromList(store) {
    let listIndex = store.active;

    store.cakes.forEach((cake, index) => {
      cake.status = (index === listIndex) ? 'active' : '';
    });

    let getCake = JSON.stringify(store.cakes[listIndex]['cupcake']);
    store.cupcake = JSON.parse(getCake);
    return store;
  }

  updateCakeInList(store) {
    _createNewCupcake(store);
    if (store.cakes.length > 0 && store.cakes[store.active]) {
      let visibleCake = JSON.stringify(store.cupcake);
      let newIndex = parseFloat(store.active)

      store.active = newIndex;
      store.cakes[newIndex].cupcake = JSON.parse(visibleCake);
    } 

    return store;
  }

  removeCakeFromList(store) {
    let listIndex = store.active;
    let action = new Promise((resolve, reject) => {
      store.cakes.splice(listIndex, 1);

      if (store.cakes.length > 0) { 
        store.cakes.forEach((cake, index) => {
          cake.index = index;
        });

        listIndex = !store.cakes[listIndex] ? listIndex - 1 : listIndex;
        store.active = listIndex;
        store = this.showCakeFromList(store);
        resolve(store);

      } else { 
        reject(store); 
      }
    });

    return action;
  }

  selectedOptionsForEditPage(page) {
    page.find('select').each(function(){
      $(this).find('option').each(function() {
        if ($(this).text() === $(this).attr('value')) {
          $(this).prop('selected',true);
        } else {
          $(this).attr('value',$(this).text());
        }
      });
    });
  }

  isCakeTall(typeOfCupcake) {
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

  hasCakeBeenAddedToList(store) {
    $('#add').show();
    $('#remove').hide();
    $('#toggle_menu').show();

    if (store.cakes.length > 0) {
      store.cakes.forEach(cake => {
        cake.status = '';
        
        if (JSON.stringify(cake.cupcake) === JSON.stringify(store.cupcake)) {
          $('#add').hide();
          $('#remove').show();
          cake.status = 'active';
        } 
      });
    } else {
      $('#toggle_menu').hide();
    }
  }
};

function _createNewCupcake(store) {
  for(let property in store.builder) {
    if (document.getElementById(property).type && document.getElementById(property).type.indexOf('select') > -1) {
      store.cupcake[property] = $('#' + property).val();
    } else {
      store.cupcake[property] = $('#' + property).find('input[type=checkbox]').prop('checked');
    }
  };
  return store;
}

module.exports = new UpdateStore();