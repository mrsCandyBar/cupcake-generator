import Store from   './_store.js';
import Update from  './_update.js';
import Build from   './_build.js';

class ItemGenerator {

  constructor() {
    this.store             = Store;
    this.$pages            = {
      main :        'template/cake.html',
      edit :        'template/edit.html',
      favourites :  'template/favourites.html'
    }
  }

  init() {
    this.bindUIevents(Store);
    this.store['$dom']['actions']['randomize'].trigger('click');
  }

  bindUIevents(store) {
    Store['$dom']['actions']['randomize'].on('click', () => {
      this._render(Build.randomItem(store)); 
    });

    Store['$dom']['actions']['add'].on('click', () => {
      this._render(Update.addItem(store)); 
    });

    Store['$dom']['actions']['favourites'].on('click', () => {
      this._togglePage(store, 'favourites').then((resolve) => {}, (error) => {});
    });

    Store['$dom']['actions']['edit'].on('click', () => {
      this._togglePage(store, 'edit').then((resolve) => {
        Update.selectedOptions(Store['$dom']['main']);
        Update.isItemTall(store);
      }, (error) => { });
    });

    Store['$dom']['actions']['remove'].on('click', () => {
      Update.removeItem(store).then((updateStore) => {
        this._render(updateStore);
      }, (emptyStore) => {
        this._render(Build.randomItem(store)); 
      });
    });

    Store['$dom']['main'].delegate('button', 'click', (button) => {
      let action = button.currentTarget.id;
      if (action === 'save') {
        this._render(Update.updateItem(store));
      } 
      else {
        store.active = button.currentTarget.dataset.index;
        this._render(Update.showItem(store));
      }
    });

    /*Store['$dom']['actions']['optional'][0]['property'].on('change', () => {
      Update.isItemTall(store);
    });*/
  };

  _render(store) {
    Build.content(this.$pages.main, store, Store['$dom']['main']);
    Update.doesItemExist(store);
  }

  _togglePage(store, menuItem) {
    let pageClass = Store['$dom']['main'].attr('class');
    let renderPage = new Promise((resolve, reject) => {

      if (pageClass === menuItem) {
        Store['$dom']['main'].attr('class', '');
        reject(this._render(store));

      } else {
        Store['$dom']['main'].attr('class', menuItem);
        resolve(Build.content(this.$pages[menuItem], store, Store['$dom']['main'])); 
      }
    });

    return renderPage;
  }
};

// Add SVG elements
$.get('SVG.html', function (data) {
  $('#SVG').append(data);
});

// Prevent unneccessary dom traversal
Store.$dom = {
  main          : $('#main'),
  actions       : {
    randomize   : $('#randomize'),
    add         : $('#add'),
    remove      : $('#remove'),
    favourites  : $('#favourites'),
    edit        : $('#edit')
  },
  optional      : [
    {
      selector          : 'icing_type',
      selected_value    : 'swirl',
      affected_selector : 'type',
      change_state      : ['tall', 'short']
    },
    {
      selector          : 'type',
      selected_value    : 'tall',
      affected_selector : 'hasWafer',
      change_state      : [true, false]
    },
    {
      selector          : 'type',
      selected_value    : 'short',
      affected_selector : 'hasCream',
      change_state      : [true, false]
    }
  ]
}

let startApp = new ItemGenerator().init();