
var gameWidth;
var gameHeight;
var idproducer = 0;
var flag;
var t = Date.now(); //step for objects
var p = 0; //step for me
var game;

$(document).ready(function () {

    game = new Game()
    gameWidth = $("#gamefield").width();
    gameHeight = $("#gamefield").height();


    // Object declarations

    var sun = new Circle(50, "sun")
    produceHtmlCircle(sun);

    var path1 = new Circle(330, "path")
    produceHtmlCircle(path1);

    var path2 = new Circle(290, "path")
    produceHtmlCircle(path2);

    var path3 = new Circle(240, "path")
    produceHtmlCircle(path3);

    var path4 = new Circle(200, "path")
    produceHtmlCircle(path4);

    var path5 = new Circle(150, "path")
    produceHtmlCircle(path5);

    var circleArray = [path1, path2, path3, path4, path5]

    $("#startGame").click(function () {
        if ($("#startGame").hasClass("on")) {

            $("#startGame").toggleClass("on")
            $("#startGame").text("RESET")
            if (game.currentLevel == 1) {

                //elements to collect
                var html = produceHtmlCircle(new Circle(30, "html")).hide().toggle(3000)

                var css = produceHtmlCircle(new Circle(30, "css")).hide();

                var js = produceHtmlCircle(new Circle(30, "js")).hide()

                game.collectibleElements.push(js, css, html)
                console.log(game.collectibleElements)


                //desturbing things

                produceHittable(10, "comet", circleArray[2], 67, -1)
                produceHittable(8, "comet", circleArray[3], 45, 1)
                produceHittable(5, "planet", circleArray[4], 60, -1)
                //produceHittable(5, "comet", circleArray[4], 60, 1)


            }

        } else {

            location.reload();
            $("#startGame").toggleClass("on")
        }


    });



    var me = new Me(0, 0, 0, "me1");
    produceHtmlMe(me);
    me.currentCircle = circleArray[0];
    var moveMe = setInterval(function () {
        moveMeOnCircle(circleArray[0]);
    }, 1)


    // Functions



    // interaction functions

    $(window).keydown(function (event) {
        if (event.keyCode == 73 && !(circleArray.indexOf(me.currentCircle) == circleArray.length - 1)) {
            clearInterval(moveMe);
            me.currentCircle = circleArray[circleArray.indexOf(me.currentCircle) + 1]
            p -= 0.003;
            moveMe = setInterval(function () {
                moveMeOnCircle(me.currentCircle);
            }, 1)


        } else if (event.keyCode == 79 && !(circleArray.indexOf(me.currentCircle) == 0)) {
            clearInterval(moveMe);
            me.currentCircle = circleArray[circleArray.indexOf(me.currentCircle) - 1]
            p -= 0.003;
            moveMe = setInterval(function () {
                moveMeOnCircle(me.currentCircle);

            }, 1)
        }
    });


    var collisionCheck = setInterval(function () {

        $(".comet").each(function () {

            if (hitCheck($(this), $("#me"))) {
                console.log("hit")
            }
        })

        $(".collectible").each(function () {

            if (hitCheck($(this), $("#me"))) {
                console.log("got it")
                $(this).removeClass("collectible")
                $(this).toggle(1000)
                game.collectedElements.push($(this)) 
                game.collectibleElements.splice(game.collectibleElements.indexOf($(this)), 1);
                game.collectibleElements[game.collectibleElements.length-1].toggle(3000)
                //game.collectibleElements[indexOf($(this))].

            }
        })

    }, 2)




})