
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
    $("#slider").css({ left: left }).animate({ "left": 0 }, 1500);


    // Object declarations

    var sun = new Circle(50, "sun")
    produceHtmlCircle(sun);

    var path1 = new Circle(320, "path")
    produceHtmlCircle(path1);

    var path2 = new Circle(275, "path")
    produceHtmlCircle(path2);

    var path3 = new Circle(231, "path")
    produceHtmlCircle(path3);

    var path4 = new Circle(187, "path")
    produceHtmlCircle(path4);

    var path5 = new Circle(143, "path")
    produceHtmlCircle(path5);

    var path6 = new Circle(99, "path")
    produceHtmlCircle(path6);

    game.circleArray = [path1, path2, path3, path4, path5, path6]


    var me = new Me(0, 0, 0, "me1");
    produceHtmlMe(me);
    me.currentCircle = game.circleArray[0];
    var moveMe = setInterval(function () {
        moveMeOnCircle(me, game.circleArray[0]);
    }, 20)



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

            produceHittable(10, "comet", game.circleArray[2], 0.02, -1)

            produceHittable(8, "comet", game.circleArray[3], 0.012, 1)

            produceHittable(5, "planet", game.circleArray[4], 0.024, -1)

        } else {

            location.reload();
            $("#startGame").toggleClass("on")
        }


    });






    // Key functions for movements inside and outside

    $(window).keydown(function (event) {
        if (event.keyCode === 73 && !(game.circleArray.indexOf(me.currentCircle) === game.circleArray.length - 1)) {
            clearInterval(moveMe);
            me.currentCircle = game.circleArray[game.circleArray.indexOf(me.currentCircle) + 1]

            moveMe = setInterval(function () {
                moveMeOnCircle(me, me.currentCircle);
            }, 20)
        } else if (event.keyCode === 79 && !(game.circleArray.indexOf(me.currentCircle) === 0)) {
            clearInterval(moveMe);
            me.currentCircle = game.circleArray[game.circleArray.indexOf(me.currentCircle) - 1]

            moveMe = setInterval(function () {
                moveMeOnCircle(me, me.currentCircle);
            }, 20)
            //easter egg coming!
        } else if (event.keyCode === 76) {
            game.lives++;
        } else if (event.keyCode === 83) {
            gameStop = !gameStop
        } else if (event.keyCode === 32) {
            event.preventDefault();
        } else if (event.keyCode === 68 && game.collectedElements.length >= 2) {
            me.direction *= -1
        }
    });


    // Collision checks with different things

    var collisionCheck = setInterval(function () {

        if (gameStop == false) {

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
                        if (game.collectibleElements[game.collectibleElements.length - 1]) {
                            game.collectibleElements[game.collectibleElements.length - 1].toggle(2000)
                        }

                    }, 2500)


                    // Game levels depending on amount of collected elements

                    if (game.collectedElements.length === 2) {
                        produceHittable(10, "planet", game.circleArray[1], 0.007, 1)
                        produceMessage('Great! You get a power of changing direction! Press "d" for it.', "I am cool!")
                    }

                    if (game.collectedElements.length === 4) {
                        produceMessage("You got REACT, so now your speed is going up!", "I like it!")
                        me.velocity = me.velocity + me.velocity
                    }

                    if (game.collectedElements.length === 5) {
                        produceHittable(7, "comet", game.circleArray[0], 0.01, 1)

                    }

                    if (game.collectedElements.length === 7) {
                        produceHittable(8, "comet", game.circleArray[2], 0.01, 1)
                    }

                    // if all elements are collected, you win
                    if (game.collectedElements.length === 8) {

                        $("#me").hide()
                        $("#message button").remove()
                        produceMessage("Congrats! You got everything to be the new IRONSTAR!", "COOOL, I am a star!")
                        setTimeout(function () {
                            hideMessage()
                            $("#youstar").css({ top: gameHeight / 2 - 75, left: gameWidth / 2 - 75 }).show()

                        }, 3000)


                    }


                }
            })

            // Lives up if coin
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

            if (game.lives === 0){
                gameStop = true;
                $("#message button").remove()
                produceMessage("You lost :(  Say thanks to asteroids with bugs, they are guilty.")
            }
        }

    })



    $("#message button").click(function () {

        hideMessage()

        setTimeout(function () {
            gameStop = false;
        }, 1800)

    })















})