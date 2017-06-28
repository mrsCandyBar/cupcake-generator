import Store  from  './_store.js';
import Build  from  './_build.js';
import Update from  './_update.js';
import Edit   from  './_edit.js';

class ItemGenerator {

  constructor() {
    this.store    = Store;
    this.$pages   = this.store['templates'];
    this.container = this.store['$dom']['main'],
    this.actions   = this.store['$dom']['actions']
  }

  init() {
    this.createActions(this.store);
  }

  createActions(store) {

    Build.content(this.$pages.actions, store, this.actions)
      .then((response) => {
        this.actions = {
          randomize   : this.actions.find('#randomize'),
          add         : this.actions.find('#add'),
          remove      : this.actions.find('#remove'),
          favourites  : this.actions.find('#favourites'),
          edit        : this.actions.find('#edit')
        }

        this.bindUIevents(store);
        this.actions['randomize'].trigger('click');
    });
  }

  bindUIevents(store) {
    
    this.actions['randomize'].on('click', () => {
      this._render(Build.randomItem(store)); 
    });

    this.actions['add'].on('click', () => {
      this._render(Update.addItem(store)); 
    });

    this.actions['favourites'].on('click', () => {
      this._togglePage(store, 'favourites').then((resolve) => {}, (error) => {});
    });

    this.actions['edit'].on('click', () => {
      this._togglePage(store, 'edit').then((resolve) => {
        Edit.prepareEditPage(store);
      }, (error) => { });
    });

    this.actions['remove'].on('click', () => {
      Update.removeItem(store).then((updateStore) => {
        this._render(updateStore);
      }, (emptyStore) => {
        this._render(Build.randomItem(store)); 
      });
    });

    this.container.delegate('button', 'click', (button) => {
      let action = button.currentTarget.id;
      if (action === 'save') {
        this._render(Update.updateItem(store));
      } 
      else {
        store.active = button.currentTarget.dataset.index;
        this._render(Update.showItem(store));
      }
    });
  };

  _render(store) {

    this._togglePage(store, 'main').then((resolve) => {
      Build.doesItemExist(store, this.actions);
    }, (error) => {});

  }

  _togglePage(store, menuItem) {
    let pageClass = this.container.attr('class');
    let renderPage = new Promise((resolve, reject) => {

      if (pageClass === menuItem && pageClass != 'main') {
        this.container.attr('class', '');
        reject(Build.content(this.$pages.main, store, this.container));

      } else {
        this.container.attr('class', menuItem);
        resolve(Build.content(this.$pages[menuItem], store, this.container)); 
      }
    });

    return renderPage;
  }
};

$.get('SVG.html', function (data) {
  $('#SVG').append(data);
});

let startApp = new ItemGenerator().init();