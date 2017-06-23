
class RandomizeCupcake {

  createRandomCupcake(store) {
    if (store.builder) {
      for(let property in store.builder) {
        let index = _getRandomNumberBetween(store.builder[property]);
        store.cupcake[property] = store.builder[property][index];
      }

      _isCupcakeTall(store.cupcake);
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

module.exports = new RandomizeCupcake();