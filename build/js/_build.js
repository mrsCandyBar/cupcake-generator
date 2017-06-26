
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
    if (store.builder) {
      for(let property in store.builder) {
        let index = _getRandomNumberBetween(store.builder[property]);
        
        if (store.brief[property] === store.builder[property][index]) {
          index = _getRandomNumberBetween(store.builder[property]);
        }
        store.brief[property] = store.builder[property][index];
      }

      _isItemTall(store.brief);
      store.active = '';
      return store;
    }
  }
}

function _getRandomNumberBetween(obj) {
	return Math.round(Math.random() * (obj.length - 1));
}

function _isItemTall(item) {
	item.type  = item['icing_type'] === 'swirl' ? 'tall' : 'short';
	item       = item['icing_type'] === 'swirl' ? item.hasCream = '' : item.hasWafer = '';
}

module.exports = new Build();