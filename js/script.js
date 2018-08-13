$(document).ready(function () {


    var gameWidth = $("#gamefield").width();
    var gameHeight = $("#gamefield").height();
    var idproducer = 0;
    var flag = true;

    var curTime = Date.now(),
        r = 100,
        left = "",
        top = "",
        alpha = 2 * 3.14,
        t = 0;

    // Object declarations




    var circle1 = new Circle(330, "path")
    produceHtmlCircle(circle1);

    var circle2 = new Circle(280, "path")
    produceHtmlCircle(circle2);

    var circle3 = new Circle(220, "path")
    produceHtmlCircle(circle3);

    var circle4 = new Circle(150, "path")
    produceHtmlCircle(circle4);

    var circleArray = [circle1, circle2, circle3, circle4]




    var circle5 = new Circle(50, "sun")
    produceHtmlCircle(circle5);


    //elements to collect
    var circle6 = new Circle(30, "html")
    produceHtmlCircle(circle6);






    var me = new Me(0, 0, 0, "me1");
    produceHtmlMe(me);
    var p = 0;
    me.currentCircle = circle1;
    var moveMe = setInterval(function () {
        moveMeOnCircle(circle1);
    }, 1)

    //desturbing things

    var comet1 = new Circle(10, "comet")
    produceHtmlCircle(comet1);
    var selectorComet1 = '#' + comet1.id;
    var t2 = Date.now();
    var startTime2 = setInterval(function () {

        let velocity = 67;
        moveObjOnCircle(selectorComet1, circle2, velocity);

    }, 2)


    var comet2 = new Circle(8, "comet")
    produceHtmlCircle(comet2);
    var selectorComet2 = '#' + comet2.id;
    var t3 = Date.now();
    var startTime3 = setInterval(function () {

        let velocity2 = 45;
        moveObjOnCircle(selectorComet2, circle3, velocity2);

    }, 2)

    var comet3 = new Circle(5, "comet")
    produceHtmlCircle(comet3);
    var selectorComet3 = '#' + comet3.id;
    var t4 = Date.now();
    var startTime4 = setInterval(function () {

        let velocity3 = 60;
        moveObjOnCircle(selectorComet3, circle4, velocity3);

    }, 2)




    // Functions

    function produceHtmlCircle(circle) {

        var circleWidth = 2 * circle.r;
        var circleHeight = 2 * circle.r;

        var top = gameHeight / 2 - circle.r;
        var left = gameWidth / 2 - circle.r;


        var id = "circle" + idproducer;
        idproducer++;
        var htmlCircle = $("<div id='" + id + "' class='" + circle.circleClass + "'></div>")
        htmlCircle.appendTo($("#gamefield"));
        htmlCircle.css({
            "width": circleWidth,
            "height": circleHeight,
            "top": top,
            "left": left
        })

        if (circle.circleClass == "sun") {
            $("<img src='img/sun.png'></img>").css({
                "width": circleWidth,
                "height": circleHeight
            })
                .appendTo($("#" + id))

        }

        if (circle.circleClass == "html") {
            $("<img src='img/html.png'></img>").css({
                "width": circleWidth,
                "height": circleHeight
            })
                .appendTo($("#" + id))

            htmlCircle.css({
                "top": top+220,
                "left": left
            })

        }

        circle.htmlCircle = htmlCircle;
        circle.x = gameHeight / 2;
        circle.y = gameWidth / 2;
        circle.id = id;


    }




    function produceHtmlMe(me) {

        var htmlMe = $("<div id='me' class='" + me.meClass + "'><img src='img/me1.png'></img></div>")
        htmlMe.appendTo($("#gamefield"));


        me.htmlMe = htmlMe;

    }




    function moveObjOnCircle(objId, circle, velocity) {


        t2 += 0.01;


        var r = circle.r;
        var xcenter = gameWidth / 2 - 25;
        var ycenter = gameHeight / 2 - 25;
        var newLeft = Math.floor(xcenter + (r * Math.cos(t2)));
        var newTop = Math.floor(ycenter + (r * Math.sin(t2)));
        $(objId).animate({
            top: newTop,
            left: newLeft,
        }, velocity, function () {
            // Animation complete.
        });
    }



    function moveMeOnCircle(circle) {

        var r = circle.r;
        var xcenter = gameWidth / 2 - 25;
        var ycenter = gameHeight / 2 - 25;
        var newLeft = Math.floor(xcenter + (r * Math.cos(p)));
        var newTop = Math.floor(ycenter + (r * Math.sin(p)));
        $("#me").animate({
            top: newTop,
            left: newLeft,
        }, 0, function () {
            p += 0.0008;

        });

    }



// interaction functions

    $(window).keydown(function (event) {
        if (event.keyCode == 73) {

            clearInterval(moveMe);
            $("#me").stop(true)

            me.currentCircle = circleArray[circleArray.indexOf(me.currentCircle) + 1]

            p -= 0.002;

            moveMe = setInterval(function () {

                moveMeOnCircle(me.currentCircle);

            }, 1)


        } else if (event.keyCode == 79) {

            console.log("outside")

            clearInterval(moveMe);
            $("#me").stop(true)
            me.currentCircle = circleArray[circleArray.indexOf(me.currentCircle) - 1]

            p -= 0.002;

            moveMe = setInterval(function () {

                moveMeOnCircle(me.currentCircle);

            }, 1)
        }
    });











})