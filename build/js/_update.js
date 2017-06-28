
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
      item['status'] = (index === store['active']) ? 'active' : '';
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

  prepareEditPage(store) {
    _watchItemsInDomForUpdates(store);
    _setSelectedValuesFromBrief(store);
  }

  doesItemExist(store) {
    store['$dom']['actions']['add'].show();
    store['$dom']['actions']['remove'].hide();
    store['$dom']['actions']['favourites'].show();

    if (store['items'].length > 0) {
      store['items'].forEach(item => {
        item['status'] = '';
        
        if (JSON.stringify(item['content']) === JSON.stringify(store['brief'])) {
          store['$dom']['actions']['add'].hide();
          store['$dom']['actions']['remove'].show();
          item['status'] = 'active';
        } 
      });
    } else {
      store['$dom']['actions']['favourites'].hide();
    }
  }
};

function _watchItemsInDomForUpdates(store) {
    store['$dom']['optional'].forEach((obj) => {
      $('#' +obj.selector).on('change', function() {

        let selectCheck = document.getElementById(obj.affected_selector);
        if (selectCheck && selectCheck.type) {

          let index = ($(this).val() === obj.selected_value) ? 0 : 1;
          $('#' +obj.affected_selector)
            .val(obj.change_state[index])
            .change();

        } else {
          if ($(this).val() != obj.selected_value) {
            if ($('#' +obj.affected_selector+ ' input[type=checkbox]').is(':checked')) {
              $('#' +obj.affected_selector+ ' input[type=checkbox]')
                .prop('checked', false);
            }
          }
        };

      });
    });
  }

function _setSelectedValuesFromBrief(store) {
  store['$dom']['main'].find('select').each((i, select) => {
    $(select).find('option').each((i, el) => {

      if ($(el).text() === store['brief'][$(select)[0]['id']]) {
        $(el).prop('selected',true).change();
      } 
      $(el).attr('value', $(el).text());

    });
  });
}

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