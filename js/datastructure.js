
var Circle = function (r, circleClass, x, y) {
    
    this.id;
    this.r = r;
    this.x = x;
    this.y = y;
    this.t;
    this.htmlCircle;
    this.circleClass = circleClass;

}


var Me = function (r, x, y, meClass) {

    this.r = r;
    this.x = x;
    this.y = y;
    this.velocity = 2.5
    this.direction = 1

    this.currentCircle;

    this.htmlMe;
    this.meClass = meClass;


}



var Game = function () {


    this.collectibleElements = [];
    this.collectedElements = [];
    this.circleArray = []
    this.lives = 3;


}

