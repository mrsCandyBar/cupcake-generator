
class BuildOptions {

  constructor() {
    
    this.type     = [ "tall", "short" ],
    this.hasWafer = [ "true",  "" ],
    this.hasCream = [ "true",  "" ],
    
    this.flavour = [ 
      "vanilla", 
      "caramel-darker", 
      "chocolate-darker"
    ],
    
    this.holder_type = [
      "dotted", 
      "striped"
    ],
    
    this.holder_colour = [ 
      "yellow", 
      "red-lighter", 
      "purple", 
      "green", 
      "navy"
    ],
    
    this.icing_colour = [ 
      "special-vanilla", 
      "red", 
      "special-blue", 
      "brown"
    ],
    
    this.icing_type = [ 
      "smooth", 
      "run", 
      "flared", 
      "swirl" 
    ],
    
    this.sprinkles_colour = [ 
      "yellow", 
      "pink", 
      "brown", 
      "green"
    ],
    
    this.sprinkles_type = [ 
      "salt", 
      "salt_single", 
      "sprinkles", 
      "sprinkles_single",
    ],
    
    this.topping = [ 
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

module.exports = new BuildOptions();