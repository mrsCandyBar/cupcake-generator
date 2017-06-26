import Store from   './_store.js';
import Update from  './_update.js';
import Build from   './_build.js';

class ItemGenerator {

  constructor() {
    this.$main             = $('#main');
    this.$actions          = $('#actions');
    this.$pages            = {
      main :        'template/cake.html',
      edit :        'template/edit.html',
      favourites :  'template/favourites.html'
    }
  }

  init() {
    this.bindUIevents(Store);
    this.$actions.find('#randomize').trigger('click');
  }

  bindUIevents(store) {
    this.$actions.delegate('button', 'click', (button) => {
      let action = button.currentTarget.id;

      if (action === 'randomize') {
        this._render(Build.randomItem(store)); }

      else if (action === 'add') {
        this._render(Update.addItem(store)); }

      else if (action === 'favourites') { 
        this._togglePage(store, 'favourites').then((resolve) => {
        }, (error) => { });
      }

      else if (action === 'edit') {
        this._togglePage(store, 'edit').then((resolve) => {
          Update.selectedOptions(this.$main);
          Update.isItemTall(store.brief.type);
        }, (error) => { });
      }

      else if (action === 'remove') {
        Update.removeItem(store).then((updateStore) => {
          this._render(updateStore);
        }, (emptyStore) => {
          this._render(Build.randomItem(store)); 
        });
      }
    });

    this.$main.delegate('button', 'click', (button) => {
      let action = button.currentTarget.id;
      if (action === 'save') {
        this._render(Update.updateItem(store));

      } else {
        store.active = button.currentTarget.dataset.index;
        this._render(Update.showItem(store));
      }
    });

    this.$main.delegate('#icing_type', 'change', (button) => {
      Update.isItemTall(store.brief.type);
    });
  };

  _render(store) {
    Build.content(this.$pages.main, store, this.$main);
    Update.doesItemExist(store);
  }

  _togglePage(store, menuItem) {
    let pageClass = this.$main.attr('class');
    let renderPage = new Promise((resolve, reject) => {

      if (pageClass === menuItem) {
        this.$main.attr('class', '');
        reject(this._render(store));

      } else {
        this.$main.attr('class', menuItem);
        resolve(Build.content(this.$pages[menuItem], store, this.$main)); 
      }
    });

    return renderPage;
  }
};

let startApp = new ItemGenerator().init();
$.get('SVG.html', function (data) {
  $('#SVG').append(data);
});