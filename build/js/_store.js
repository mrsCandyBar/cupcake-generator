import Templates from './_store_templates.js';
import BuildOptions from './_store_builder.js';
import DOMLocations from './_store_locations.js';

class Store {

  constructor() {
    this.items    = [];
    this.brief    = {};
    this.active   = 0;
    this.templates = Templates,
    this.builder  = BuildOptions,
    this.$dom     = DOMLocations
  }
};

module.exports = new Store();