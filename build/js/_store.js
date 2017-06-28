
class Store {

  constructor() {
    this.items    = [];
    this.brief     = {};
    this.active   = 0;
    this.builder  = {
      type: [
        "tall",
        "short"
      ],
      hasWafer: [
        "true", 
        ""
      ],
      hasCream: [
        "true", 
        ""
      ],
      flavour: [ 
        "vanilla", 
        "caramel-darker", 
        "chocolate-darker"
      ],
      holder_type: [
        "dotted", 
        "striped"
      ],
      holder_colour: [ 
        "yellow", 
        "red-lighter", 
        "purple", 
        "green", 
        "navy"
      ],
      icing_colour: [ 
        "special-vanilla", 
        "red", 
        "special-blue", 
        "brown"
      ],
      icing_type: [ 
        "smooth", 
        "run", 
        "flared", 
        "swirl" 
      ],
      sprinkles_colour: [ 
        "yellow", 
        "pink", 
        "brown", 
        "green",
        "svg__darker"
      ],
      sprinkles_type: [ 
        "salt", 
        "salt_single", 
        "sprinkles", 
        "sprinkles_single",
      ],
      topping: [ 
        "cherry", 
        "strawberry", 
        "citrus", 
        "gumball", 
        "candle", 
        "heart", 
        "flower" 
      ]
    }
  }
};

module.exports = new Store();