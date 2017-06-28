
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

      _checkOptionalValues(store);
      store['active'] = '';
      return store;
    }
  }
}

function _randomNumber(obj) {
	return Math.round(Math.random() * (obj.length - 1));
}

function _checkOptionalValues(store) {
  store['$dom']['optional'].forEach((obj) => {
    if (store['brief'][obj.selector] === obj.selected_value) {
       
      store['brief'][obj.affected_selector] = obj.change_state[0];
      if (obj.change_state[0] === true) {
        store['brief'][obj.affected_selector] = obj.change_state[_randomNumber(obj.change_state)];
      }
      
    } else {
      store['brief'][obj.affected_selector] = obj.change_state[1];
    }
  });
}

module.exports = new Build();