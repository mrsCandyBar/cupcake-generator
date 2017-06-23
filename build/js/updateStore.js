
class UpdateStore {

  addCakeToList() {
    let visibleCake = { 
      index   : this.store.cakes.length,
      cupcake : JSON.stringify(this.store.cupcake) 
    }

    this.store.cakes.push(visibleCake);
    this.render();
  }

  removeCakeFromList(listIndex) {
    this.store.cakes.splice(listIndex, 1);

    if (this.store.cakes.length > 0) { 
      this.store.cakes.forEach((cake, index) => {
        cake.index = index;
      });
      this._showNextCakeInList(listIndex);
    } else { 
      this.randomizeCupcake(this.store); 
    }
  }

  showNextCakeInList(index) {
    index = !this.store.cakes[index] ? index - 1 : index;
    this._showCakeFromList(index)
  }

};

let Update = new UpdateStore();
module.exports = Update;