
let Data = {

  cakes: [],

  cupcake: {
    flavour: '',
    hasWafer: '',
    hasCream: '',
    holder_type: '',
    holder_colour: '',
    icing_type: '',
    icing_colour: '',
    sprinkles_type: '',
    sprinkles_colour: '',
    topping: ''
  },

  builder: {
    flavour: [ 
      "vanilla", 
      "caramel-darker", 
      "chocolate-darker"
    ],
    hasWafer: [
      'true', 
      ''
    ],
    hasCream: [
      'true', 
      ''
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
      "green"
    ],
    sprinkles_type: [ 
      "salt", 
      "sprinkles", 
      "sprinkles_single" 
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
  },
};

module.exports = Data;
