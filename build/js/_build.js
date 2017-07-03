
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
      let builder = store['builder'];
      let brief = store['brief'];

      for(let property in builder) {
        let index = _randomNumber(builder[property]);
        
        if (brief[property] === builder[property][index]) {
          index = _randomNumber(builder[property]);
        }

        brief[property] = builder[property][index];
      }

      _checkOptionalValues(store);
      store['active'] = '';
      return store;
    }
  }

  doesItemExist(store, actions) {

    actions['add'].show();
    actions['remove'].hide();
    actions['favourites'].removeAttr('class');
    actions['edit'].removeAttr('class');

    if (store['items'].length > 0) {
      store['items'].forEach(item => {
        item['status'] = '';
       
        if (JSON.stringify(item['content']) === JSON.stringify(store['brief'])) {
          actions['add'].hide();
          actions['remove'].show();
          item['status'] = 'active';
        } 
      });

    } else {
      actions['favourites'].addClass('disabled');
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