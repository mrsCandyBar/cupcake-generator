
class UpdateStore {

  addCakeToList(store) {
    let visibleCake = { 
      index   : store.cakes.length,
      cupcake : JSON.stringify(store.cupcake) 
    }

    store.active = visibleCake.index;
    visibleCake.cupcake = JSON.parse(visibleCake.cupcake);
    store.cakes.push(visibleCake);
    return store;
  }

  showCakeFromList(store) {
    let listIndex = store.index;

    store.cakes.forEach((cake, index) => {
      cake.status = (index === listIndex) ? 'active' : '';
    });
    store.active = parseFloat(listIndex);
    
    let getCake = JSON.stringify(store.cakes[listIndex]['cupcake']);
    store.cupcake = JSON.parse(getCake);
    return store;
  }

  updateCakeInList(store) {
    console.log('store >>> inside', store)
    if (!store.index == '') {

      let visibleCake = JSON.stringify(store.cupcake);
      let newIndex = parseFloat(store.index)

      store.active = newIndex;
      store.cakes[newIndex].cupcake = JSON.parse(visibleCake);
      
      console.log('store >>> inside 2', store)
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
};

module.exports = new UpdateStore();