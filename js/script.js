$(document).ready(function () {


    var gameWidth = $("#gamefield").width();
    var gameHeight = $("#gamefield").height();

    var curTime = Date.now(),
        r = 100,
        left = "",
        top = "",
        alpha = 2 * 3.14,
        t = 0;

    // Object declarations

    var circle1 = new Circle(200, "path")
    produceHtmlCircle(circle1);


    var circle2 = new Circle(400, "path")
    produceHtmlCircle(circle2);


    var circle3 = new Circle(50, "sun")
    produceHtmlCircle(circle3);

    var me = new Me(0, 0, 0, "me1");
    produceHtmlMe(me);


    var startTime = setInterval(function () {
        let t = Date.now() - curTime;
        moveObjOnCircle("#me", circle1);

    }, 5)


    // Functions

    function produceHtmlCircle(circle) {

        var circleWidth = 2 * circle.r;
        var circleHeight = 2 * circle.r;

        var top = gameHeight / 2 - circle.r;
        var left = gameWidth / 2 - circle.r;

        var id = "circle" + Date.now() + Math.random();


        var htmlCircle = $("<div id='" + id + "' class='" + circle.circleClass + "'></div>")
        htmlCircle.appendTo($("#gamefield"));
        htmlCircle.css({
            "width": circleWidth,
            "height": circleHeight,
            "top": top,
            "left": left
        })

        circle.htmlCircle = htmlCircle;
        circle.x = gameHeight / 2;
        circle.y = gameWidth / 2;


    }




    function produceHtmlMe(me) {

        var htmlMe = $("<div id='me' class='" + me.meClass + "'></div>")
        htmlMe.appendTo($("#gamefield"));


        me.htmlMe = htmlMe;

    }




    function moveObjOnCircle(objId, circle) {
        t += 0.02;

        var r = circle.r;
        var xcenter = gameWidth / 2 - 25;
        var ycenter = gameHeight / 2 - 25;
        var newLeft = Math.floor(xcenter + (r * Math.cos(t)));
        var newTop = Math.floor(ycenter + (r * Math.sin(t)));
        $(objId).animate({
            top: newTop,
            left: newLeft,
        }, 1, function () {
            moveObjOnCircle(objId, circle);
        });
    }

















})