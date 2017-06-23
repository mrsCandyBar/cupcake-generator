
class UpdateStore {

  addCakeToList(store) {
    let visibleCake = { 
      index   : store.cakes.length,
      cupcake : JSON.stringify(store.cupcake) 
    }

    visibleCake.cupcake = JSON.parse(visibleCake.cupcake);
    store.cakes.push(visibleCake);
    return store;
  }

  showCakeFromList(obj) {
    let store = obj.store;
    let listIndex = obj.index;

    store.cakes.forEach((cake, index) => {
      cake.status = (index === listIndex) ? 'active' : '';
    });
    
    let getCake = JSON.stringify(store.cakes[listIndex]['cupcake']);
    store.cupcake = JSON.parse(getCake);
    return store;
  }

  removeCakeFromList(obj) {
    let action = new Promise((resolve, reject) => {
      let store = obj.store;
      let listIndex = obj.index;
      store.cakes.splice(listIndex, 1);

      if (store.cakes.length > 0) { 
        store.cakes.forEach((cake, index) => {
          cake.index = index;
        });

        listIndex = !store.cakes[listIndex] ? listIndex - 1 : listIndex;
        store = this.showCakeFromList({store: store, index: listIndex})
        resolve(store);

      } else { 
        reject(store); 
      }
    });

    return action;
  }
};

module.exports = new UpdateStore();