import Events from './_publishAndSubscribeToEvents.js';
import Store from './_store.js';
import Update from './_update.js';
import Build from './_build.js';

class GenerateCake {

  constructor(data) {
    this.store             = data;
    this.$cake             = $('#cake');
    this.$control          = $('#controls');
    this.$pages            = {
      cake : 'template/cake.html',
      edit : 'template/edit.html',
      menu : 'template/menu.html'
    }
  }

  init() {
    $.get('getSVG.html', function (data) {
      $('#SVG_holder').append(data);
    });

    this.bindStoreEvents();
    this.bindUIevents(this.store);
    Events.emit('create.random.cake', this.store);
  }

  render(store) {
    Build.generateContent(this.$pages.cake, store, this.$cake);
    Update.hasCakeBeenAddedToList(store);
  }

  bindUIevents(store) {
    this.$control.delegate('button', 'click', (button) => {
      let buttonId = button.currentTarget.id;

      if (buttonId === 'randomize') {
        Events.emit('create.random.cake', store); } 

      else if (buttonId === 'add') {
        Events.emit('add.random.cake', store); }

      else if (buttonId === 'edit') {
        Events.emit('edit.cake.from.list', store); }

      else if (buttonId === 'remove') {
        Events.emit('remove.cake.from.list', store); }

      else if (buttonId === 'toggle_menu') { 
        this.togglePage(store, 'menu').then((resolve) => {
        }, (error) => { });
      }
    });

    this.$cake.delegate('button', 'click', (button) => {
      let buttonId = button.currentTarget.id;

      if (buttonId === 'save') {
        Events.emit('update.current.cake', store);

      } else {
        store.active = button.currentTarget.dataset.index;
        Events.emit('select.cake.from.list', store);
      }
    });

    this.$cake.delegate('#icing_type', 'change', (button) => {
      Update.isCakeTall(store.cupcake.type);
    });
  };

  bindStoreEvents() {
    Events.on('create.random.cake', (store) => {
      this.render(Build.createRandomCupcake(store));
    });

    Events.on('add.random.cake', (store) => {
      this.render(Update.addCakeToList(store));
    });
    
    Events.on('edit.cake.from.list', (store) => {
      this.togglePage(store, 'edit').then((resolve) => {
        Update.selectedOptionsForEditPage(this.$cake);
        Update.isCakeTall(store.cupcake.type);
      }, (error) => { });
    });

    Events.on('remove.cake.from.list', (store) => {
      Update.removeCakeFromList(store).then((updateStore) => {
        this.render(updateStore);
      }, (emptyStore) => {
        Events.emit('create.random.cake', store);
      });
    });

    Events.on('select.cake.from.list', (store) => {
      this.render(Update.showCakeFromList(store));
    });

    Events.on('update.current.cake', (store) => {
      this.render(Update.updateCakeInList(store));
    });
  }

  togglePage(store, menuItem) {
    let pageClass = this.$cake.attr('class');

    let renderPage = new Promise((resolve, reject) => {
      if (pageClass === menuItem) {
        $('#cake').attr('class', '');
        resolve(this.render(store));

      } else {
        $('#cake').attr('class', menuItem);
        reject(Build.generateContent(this.$pages[menuItem], store, this.$cake)); 
      }
    });
    return renderPage;
  }
};

let startApp = new GenerateCake(Store).init();