
var gameWidth;
var gameHeight;
var idproducer;
var flag;

$(document).ready(function () {


    gameWidth = $("#gamefield").width();
    gameHeight = $("#gamefield").height();
    idproducer = 0;


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

            p -= 0.003;

            moveMe = setInterval(function () {
                moveMeOnCircle(me.currentCircle);
            }, 1)


        } else if (event.keyCode == 79) {

            console.log("outside")

            clearInterval(moveMe);
            $("#me").stop(true)
            me.currentCircle = circleArray[circleArray.indexOf(me.currentCircle) - 1]
            p -= 0.003;
            moveMe = setInterval(function () {
                moveMeOnCircle(me.currentCircle);

            }, 1)
        }
    });


    var hitTest = setInterval(function(){

        $(".comet").each(function(){

           if (hitCheck($(this), $("#me"))){
               console.log("hit")
           }
        })

        $(".html").each(function(){

            if (hitCheck($(this), $("#me"))){
                console.log("got it")
                
            }
         })

    }, 2)


    function hitCheck(a, b) {
        var aTop = a.offset().top;
        var aLeft = a.offset().left;
        var bTop = b.offset().top;
        var bLeft = b.offset().left;

        return !(
                ((aTop + a.height()) < (bTop)) ||
                (aTop > (bTop + b.height())) ||
                ((aLeft + a.width()) < bLeft) ||
                (aLeft > (bLeft + b.width()))
                );
    }












})