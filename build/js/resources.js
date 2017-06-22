
let Data = {

  cakes: [
    {
      type: "Chocolate",
      ingredient: 'cocoa',            
      taste: "chocolatey goodness",
      status: 'btn-primary'
    },
    {
      type: "Strawberry",
      ingredient: 'strawberries',
      taste: "berry berry nice"
    },
    {
      type: "Butterscotch",
      ingredient: 'caramel',
      taste: "creamy caramel clouds"
    },          
  ],

  cupcakeBuilder: {
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

  cupcakeObj: {
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
  }

};

module.exports = Data;
