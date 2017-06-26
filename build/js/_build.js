
class Build {

  generateContent(templateUrl, getCake, destination) {
    let content = new Promise((resolve) => {
      $.get(templateUrl, (template) => {
        let rendered = Mustache.render(template, getCake);
        destination.html(rendered)
        resolve();
      });
    });

    return content;
  }

  createRandomCupcake(store) {
    if (store.builder) {
      for(let property in store.builder) {
        let index = _getRandomNumberBetween(store.builder[property]);
        
        if (store.cupcake[property] === store.builder[property][index]) {
          index = _getRandomNumberBetween(store.builder[property]);
        }
        store.cupcake[property] = store.builder[property][index];
      }

      _isCupcakeTall(store.cupcake);
      store.active = '';
      return store;
    }
  }
}

function _getRandomNumberBetween(obj) {
	return Math.round(Math.random() * (obj.length - 1));
}

function _isCupcakeTall(cupcake) {
	cupcake.type = cupcake['icing_type'] === 'swirl' ? 'tall' : 'short';
	cupcake = cupcake['icing_type'] === 'swirl' ? cupcake.hasCream = '' : cupcake.hasWafer = '';
}

module.exports = new Build();