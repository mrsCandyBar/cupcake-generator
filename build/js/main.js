import Store from   './_store.js';
import Update from  './_update.js';
import Build from   './_build.js';

class GenerateCake {

  constructor() {
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

    this.bindUIevents(Store);
    this.$control.find('#randomize').trigger('click');
  }

  render(store) {
    Build.generateContent(this.$pages.cake, store, this.$cake);
    Update.hasCakeBeenAddedToList(store);
  }

  bindUIevents(store) {
    this.$control.delegate('button', 'click', (button) => {
      let buttonId = button.currentTarget.id;

      if (buttonId === 'randomize') {
        this.render(Build.createRandomCupcake(store)); 
      }

      else if (buttonId === 'add') {
        this.render(Update.addCakeToList(store));
      }

      else if (buttonId === 'edit') {
        this.togglePage(store, 'edit').then((resolve) => {
          Update.selectedOptionsForEditPage(this.$cake);
          Update.isCakeTall(store.cupcake.type);
        }, (error) => { });
      }

      else if (buttonId === 'remove') {
        Update.removeCakeFromList(store).then((updateStore) => {
          this.render(updateStore);
        }, (emptyStore) => {
          this.render(Build.createRandomCupcake(store)); 
        });
      }

      else if (buttonId === 'toggle_menu') { 
        this.togglePage(store, 'menu').then((resolve) => {
        }, (error) => { });
      }
    });

    this.$cake.delegate('button', 'click', (button) => {
      let buttonId = button.currentTarget.id;

      if (buttonId === 'save') {
        this.render(Update.updateCakeInList(store));

      } else {
        store.active = button.currentTarget.dataset.index;
        this.render(Update.showCakeFromList(store));
      }
    });

    this.$cake.delegate('#icing_type', 'change', (button) => {
      Update.isCakeTall(store.cupcake.type);
    });
  };

  togglePage(store, menuItem) {
    let pageClass = this.$cake.attr('class');
    let renderPage = new Promise((resolve, reject) => {

      if (pageClass === menuItem) {
        $('#cake').attr('class', '');
        reject(this.render(store));

      } else {
        $('#cake').attr('class', menuItem);
        resolve(Build.generateContent(this.$pages[menuItem], store, this.$cake)); 
      }
    });

    return renderPage;
  }
};

let startApp = new GenerateCake().init();