
class UpdateStore {

  addItem(store) {
    let obj = { 
      index : store['items'].length,
      content : returnNewObj(store['brief']) 
    }
    store['active'] = parseFloat(obj['index']);
    store['items'].push(obj);
    return store;
  }

  showItem(store) {
    store['items'].forEach((item, index) => {
      item['status'] = '';
      if (index === store['active']) {
        item['status'] = 'active';
      }
    });

    let returnContent = store['items'][store.active]['content'];
    store['brief'] = returnNewObj(returnContent);
    return store;
  }

  updateItem(store) {
    _createNewBrief(store);
    if (store['items'].length > 0 && store['items'][store.active]) {
      store['items'][store.active]['content'] = returnNewObj(store['brief']);
    } 
    return store;
  }

  removeItem(store) {
    let action = new Promise((resolve, reject) => {
      store['items'].splice(store['active'], 1);

      if (store['items'].length > 0) { 
        store['items'].forEach((item, index) => {
          item['index'] = index;
        });

        store['active'] = !store['items'][store.active] ? store['active'] - 1 : store['active'];
        store = this.showItem(store);
        resolve(store);

      } else { 
        reject(store); 
      }
    });
    return action;
  }

  selectedOptions(page) {
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

  isItemTall(itemType) {
    if ($('#icing_type').val() === 'swirl') {
      $('#hasCream')
        .hide()
        .find('input').prop('checked', false);
      $('#hasWafer').show();
      itemType = "tall";

    } else {
      $('#hasCream').show();
      $('#hasWafer')
        .hide()
        .find('input').prop('checked', false);
      itemType = "short";
    }
  }

  doesItemExist(store) {
    $('#add').show();
    $('#remove').hide();
    $('#favourites').show();

    if (store['items'].length > 0) {
      store['items'].forEach(item => {
        item['status'] = '';
        
        if (JSON.stringify(item['content']) === JSON.stringify(store['brief'])) {
          $('#add').hide();
          $('#remove').show();
          item['status'] = 'active';
        } 
      });
    } else {
      $('#favourites').hide();
    }
  }
};

function _createNewBrief(store) {
  for(let property in store['builder']) {
    if (document.getElementById(property).type && document.getElementById(property).type.indexOf('select') > -1) {
      store['brief'][property] = $('#' + property).val();
    } else {
      store['brief'][property] = $('#' + property).find('input[type=checkbox]').prop('checked');
    }
  };
  return store;
}

function returnNewObj(obj) {
  let newObj = JSON.stringify(obj);
  newObj = JSON.parse(newObj);
  return newObj;
}

module.exports = new UpdateStore();