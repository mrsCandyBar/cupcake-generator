
class Build {

  content(templateUrl, store, destination) {
    let content = new Promise((resolve) => {
      $.get(templateUrl, (template) => {
        let rendered = Mustache.render(template, store);
        destination.html(rendered)
        resolve();
      });

    });
    return content;
  }

  randomItem(store) {
    if (store['builder']) {
      for(let property in store['builder']) {
        let index = _randomNumber(store['builder'][property]);
        
        if (store['brief'][property] === store['builder'][property][index]) {
          index = _randomNumber(store['builder'][property]);
        }
        store['brief'][property] = store['builder'][property][index];
      }

      _isItemTall(store);
      store['active'] = '';
      return store;
    }
  }
}

function _randomNumber(obj) {
	return Math.round(Math.random() * (obj.length - 1));
}

function _isItemTall(store) {

  /*store['$dom']['optional'].forEach((obj) => {
    let selected_option = (obj.selector === obj.selected_value) ? obj.change_state[0] : obj.change_state[1];
    let checked_value =  (obj.selector === obj.selected_value) ? 'checked' : '';

    let optionalSelector = document.getElementById(obj.affected_selector);
    if (optionalSelector && optionalSelector.type) {
      optionalSelector = selected_option;
    } else {
      $('#' + obj.affected_selector).find('input[type=checkbox]').prop(checked_value);
    }
  });*/
}

module.exports = new Build();