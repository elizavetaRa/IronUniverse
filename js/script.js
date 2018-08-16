
var gameWidth;
var gameHeight;
var idproducer = 0;
var flag;
//var t = 0;
var p = 0; //step for me
var game;
var coin;
var gameStop = false;

$(document).ready(function () {


    game = new Game()
    gameWidth = $("#gamefield").width();
    gameHeight = $("#gamefield").height();


    //Start animation for menu

    var left = $("#slider").css("left");
    $("#slider").css({left: left}).animate({"left": 0}, 2000);

    produceMessage("Hello Ironhacker, the Iron-God sent you to become a new star in the Iron Universe.")

    // Object declarations

    var sun = new Circle(50, "sun")
    produceHtmlCircle(sun);

    var path1 = new Circle(340, "path")
    produceHtmlCircle(path1);

    var path2 = new Circle(290, "path")
    produceHtmlCircle(path2);

    var path3 = new Circle(240, "path")
    produceHtmlCircle(path3);

    var path4 = new Circle(200, "path")
    produceHtmlCircle(path4);

    var path5 = new Circle(150, "path")
    produceHtmlCircle(path5);

    var path6 = new Circle(110, "path")
    produceHtmlCircle(path6);

    game.circleArray = [path1, path2, path3, path4, path5, path6]

    $("#startGame").click(function () {
        if ($("#startGame").hasClass("on")) {

            $("#startGame").toggleClass("on")
            $("#startGame").text("RESET")


            //Elements to collect

            var html = produceHtmlCircle(new Circle(25, "html")).hide().toggle(500)

            var css = produceHtmlCircle(new Circle(25, "css")).hide();

            var js = produceHtmlCircle(new Circle(25, "js")).hide()

            var react = produceHtmlCircle(new Circle(25, "react")).hide()

            var jquery = produceHtmlCircle(new Circle(25, "jquery")).hide()

            var node = produceHtmlCircle(new Circle(25, "node")).hide()

            var angular = produceHtmlCircle(new Circle(25, "angular")).hide()

            var mongo = produceHtmlCircle(new Circle(25, "mongo")).hide()

            game.collectibleElements.push(mongo, angular, node, jquery, react, js, css, html)

            coin = produceHtmlCircle(new Circle(10, "coin"))



            //desturbing things on start
            
            produceHittable(10, "comet", game.circleArray[2], 0.005, -1)

            produceHittable(8, "comet", game.circleArray[3], 0.003, 1)

            produceHittable(5, "planet", game.circleArray[4], 0.006, -1)

        } else {

            location.reload();
            $("#startGame").toggleClass("on")
        }


    });


    
    var me = new Me(0, 0, 0, "me1");
    produceHtmlMe(me);
    me.currentCircle = game.circleArray[0];
    var moveMe = setInterval(function () {
        moveMeOnCircle(me, game.circleArray[0]);
    }, 5)


    // Key functions for movements inside and outside

    $(window).keydown(function (event) {
        if (event.keyCode == 73 && !(game.circleArray.indexOf(me.currentCircle) == game.circleArray.length - 1)) {
            clearInterval(moveMe);
            me.currentCircle = game.circleArray[game.circleArray.indexOf(me.currentCircle) + 1]

            moveMe = setInterval(function () {
                moveMeOnCircle(me, me.currentCircle);
            }, 1)
        } else if (event.keyCode == 79 && !(game.circleArray.indexOf(me.currentCircle) == 0)) {
            clearInterval(moveMe);
            me.currentCircle = game.circleArray[game.circleArray.indexOf(me.currentCircle) - 1]

            moveMe = setInterval(function () {
                moveMeOnCircle(me, me.currentCircle);
            }, 1)
            //easter egg coming!
        } else if (event.keyCode == 76){          
            game.lives++;
        } else if (event.keyCode == 83){
            gameStop = !gameStop
        }
    });


    // Collision checks with different things

    var collisionCheck = setInterval(function () {

        $(".comet, .planet").each(function () {

            if (hitCheck($(this), $("#me"))) {
                if ($("#me").hasClass("hittable")) {
                    game.lives--;
                    $("#hits").text("LIVES: " + game.lives)
                    $("#me").toggleClass("hittable")
                    var wait = setTimeout(function () {
                        $("#me").toggleClass("hittable")
                    }, 1000)

                }

            }
        })

        $(".collectible").each(function () {

            if (hitCheck($(this), $("#me"))) {
                $(this).removeClass("collectible")
                $(this).toggle(700)
                game.collectedElements.push($(this))
                game.collectibleElements.splice(game.collectibleElements.indexOf($(this)), 1);


                // Show collected cards instead of placeholder
                $("#ph" + game.collectedElements.length).hide(500);
                $("#c" + game.collectedElements.length).show(500);


                var timeout = setTimeout(function () {
                    game.collectibleElements[game.collectibleElements.length - 1].toggle(2000)
                }, 2500)


                // Game levels depending on amount of collected elements
                if (game.collectedElements.length === 2) {
                    produceHittable(10, "planet", game.circleArray[1], 0.009, 1)
                }

                if (game.collectedElements.length === 5) {
                    produceHittable(10, "comet", game.circleArray[2], 0.01, 1)
                }
                // if all elements are collected, you win
                if (game.collectedElements.length === 8) {

                    var winTimeout = setTimeout(function(){
                        alert("WON! NOW YOU ARE THE NEW IRONSTAR!")
        
                    }, 1000)}
                

            }
        })

        // lives up
        if (coin !== undefined && hitCheck($(".coin"), $("#me"))) {
            coin.hide()
            coin.removeClass(".coin")
            game.lives++
            $("#hits").text("LIVES: " + game.lives)

            var toggleCoin = setTimeout(function () {
                coin.addClass("coin")
                coin.css(randomPosition(game.circleArray))
                coin.show(500)
            }, 3000)


        }


    })















})