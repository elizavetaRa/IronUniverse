$(document).ready(function () {


    var gameWidth = $("#gamefield").width();
    var gameHeight = $("#gamefield").height();
    var idproducer = 0;

    var curTime = Date.now(),
        r = 100,
        left = "",
        top = "",
        alpha = 2 * 3.14,
        t = 0;

    // Object declarations

    var circle1 = new Circle(200, "path")
    produceHtmlCircle(circle1);


    var circle2 = new Circle(270, "path")
    produceHtmlCircle(circle2);

    var circle3 = new Circle(230, "path")
    produceHtmlCircle(circle3);

    var circle4 = new Circle(200, "path")
    produceHtmlCircle(circle4);


    var circle5 = new Circle(50, "sun")
    produceHtmlCircle(circle5);

    var me = new Me(0, 0, 0, "me1");
    produceHtmlMe(me);
    var startTimeMe = setInterval(function () {
        let t = Date.now() - curTime;
        let velocity = 2;
        moveObjOnCircle("#me", circle1, velocity);

    }, 2)


    var comet1 = new Circle(10, "comet")
    produceHtmlCircle(comet1);
    var selectorComet1 = '#' + comet1.id;
    var startTime2 = setInterval(function () {
        let t = Date.now() - curTime;
        let velocity = 20;
        moveObjOnCircle(selectorComet1, circle2, velocity);

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
        t += 0.01;


        var r = circle.r;
        var xcenter = gameWidth / 2 - 25;
        var ycenter = gameHeight / 2 - 25;
        var newLeft = Math.floor(xcenter + (r * Math.cos(t)));
        var newTop = Math.floor(ycenter + (r * Math.sin(t)));
        $(objId).animate({
            top: newTop,
            left: newLeft,
        }, velocity, function () {
            moveObjOnCircle(objId, circle, velocity);
        });
    }


    console.log("Halo"+startTimeMe);

    $(window).keydown(function (event) {
        if (event.keyCode == 73) {
            console.log("inside")
            clearInterval(startTimeMe);



        } else if (event.keyCode == 79) {

            alert("o")
        }
    });










})