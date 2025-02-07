function produceHtmlCircle(circle) {

    var id = "circle" + idproducer;
    circle.id = id;

    idproducer++;

    var circleWidth = 2 * circle.r;
    var circleHeight = 2 * circle.r;

    var top = gameHeight / 2 - circle.r;
    var left = gameWidth / 2 - circle.r;



    var htmlCircle = $("<div id='" + id + "' class='" + circle.circleClass + "'></div>")
    htmlCircle.appendTo($("#gamefield"));
    htmlCircle.css({
        "width": circleWidth,
        "height": circleHeight,
        "top": top,
        "left": left
    })

    if (circle.circleClass == "comet") {
        $("<img src='img/bug.png'></img>").css({
            "width": circleWidth,
            "height": circleHeight
        })
            .appendTo($("#" + id))
    }




    if (circle.circleClass == "sun") {

        $("<div id='shine'></div>").css({
            "width": 100,
            "height": 100
        })
            .appendTo($("#" + id))

        $("<img src='img/sun.png'></img>").css({
            "width": 130,
            "height": 130
        })
            .appendTo($("#" + id))




    }

    if (circle.circleClass == "html") {
        $("<img src='img/html.png'></img>").css({
            "width": circleWidth,
            "height": circleHeight
        })
            .appendTo($("#" + id))

        htmlCircle.css(randomPosition(game.circleArray))
        htmlCircle.addClass("collectible")

    }


    if (circle.circleClass == "css") {
        $("<img src='img/css.png'></img>").css({
            "width": circleWidth,
            "height": circleHeight
        })
            .appendTo($("#" + id))

        htmlCircle.css(randomPosition(game.circleArray))
        htmlCircle.addClass("collectible")

    }


    if (circle.circleClass == "js") {
        $("<img src='img/js.png'></img>").css({
            "width": circleWidth,
            "height": circleHeight
        })
            .appendTo($("#" + id))

        htmlCircle.css(randomPosition(game.circleArray))

        htmlCircle.addClass("collectible")

    }

    if (circle.circleClass == "node") {
        $("<img src='img/node.png'></img>").css({
            "width": circleWidth,
            "height": circleHeight
        })
            .appendTo($("#" + id))

        htmlCircle.css({
            "top": top - 100,
            "left": left + 200
        })

        htmlCircle.addClass("collectible")

    }

    if (circle.circleClass == "jquery") {
        $("<img src='img/jquery.png'></img>").css({
            "width": circleWidth,
            "height": circleHeight
        })
            .appendTo($("#" + id))

        htmlCircle.css(randomPosition(game.circleArray))

        htmlCircle.addClass("collectible")

    }


    if (circle.circleClass == "angular") {
        $("<img src='img/angular.png'></img>").css({
            "width": circleWidth,
            "height": circleHeight
        })
            .appendTo($("#" + id))

        htmlCircle.css(randomPosition(game.circleArray))
        htmlCircle.addClass("collectible")

    }

    if (circle.circleClass == "react") {
        $("<img src='img/react.png'></img>").css({
            "width": circleWidth,
            "height": circleHeight
        })
            .appendTo($("#" + id))

        htmlCircle.css(randomPosition(game.circleArray))

        htmlCircle.addClass("collectible")

    }

    if (circle.circleClass == "mongo") {
        $("<img src='img/mongo.png'></img>").css({
            "width": circleWidth,
            "height": circleHeight
        })
            .appendTo($("#" + id))

        htmlCircle.css(randomPosition(game.circleArray))

        htmlCircle.addClass("collectible")

    }

    if (circle.circleClass == "coin") {
        $("<img src='img/coin.png'></img>").css({
            "width": circleWidth,
            "height": circleHeight
        })
            .appendTo($("#" + id))

        htmlCircle.css(randomPosition(game.circleArray))

        htmlCircle.addClass("coin hitting")
        htmlCircle.addClass("hitting")

    }
    circle.htmlCircle = htmlCircle;
    circle.x = gameHeight / 2;
    circle.y = gameWidth / 2;
    circle.id = id;

    return $("#" + id)
}



function randomPosition(circleArray) {
    // pick one of circle array (var c)
    // r = c.r
    // offsetLeft && offsetTop mit c.id

    var r = circleArray[Math.floor(Math.random() * circleArray.length)].r;
    var angle = Math.random() * Math.PI * 2;

    var x = Math.cos(angle) * r;
    var y = Math.sin(angle) * r;

    //var offsetLeft = $('#circle1')[0].offsetLeft;

    //console.log("gameWidth ",  gameWidth/2-r)
    //var offsetTop = $('#circle1')[0].offsetTop;

    var offsetLeft = gameWidth / 2
    var offsetTop = gameHeight / 2

    return { top: y + offsetTop - 25, left: x + offsetLeft - 25 };
}


function produceHtmlMe(me) {

    var htmlMe = $("<div id='me' class='" + me.meClass + " hittable'><img src='img/me1.png'></img></div>")
    htmlMe.appendTo($("#gamefield"));
    htmlMe.addClass = "hittable"




    me.htmlMe = htmlMe;

}



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

function produceHittable(r, hittableClass, circle, t, direction) {
    var hittable = new Circle(r, hittableClass)
    hittable.t = t;
    produceHtmlCircle(hittable);
    var selectorHittable = '#' + hittable.id;
    var startTime = setInterval(function () {
        moveObjOnCircle(hittable, selectorHittable, circle, t, direction);
    }, 1000 / 50)

    return hittable
}



function moveObjOnCircle(hittable, objId, circle, t, direction) {
    if (!gameStop) {
        //if (window.debug)
        //console.log("DEBUG");

        hittable.t += t;
        var xcenter = gameWidth / 2;
        var ycenter = gameHeight / 2;
        var newLeft = Math.floor(xcenter + direction * (circle.r * Math.cos(hittable.t))) - hittable.r / 2;
        var newTop = Math.floor(ycenter + (circle.r * Math.sin(hittable.t))) - hittable.r / 2;
        $(objId).css({
            top: newTop,
            left: newLeft,
        });
    }
}


function moveMeOnCircle(me, circle) {

    if (!gameStop) {

        p += me.direction * me.velocity / circle.r;
        var xcenter = gameWidth / 2 - 20;
        var ycenter = gameHeight / 2 - 20;
        var newLeft = Math.floor(xcenter + (circle.r * Math.cos(p)));
        var newTop = Math.floor(ycenter + (circle.r * Math.sin(p)));
        $("#me").css({
            top: newTop,
            left: newLeft,
        });
    }

}

function produceMessage(text, buttontext) {
    console.log(text)
    //Anamation for message
    gameStop = true;
    var mestop = -gameHeight * 1.4
    var mesheight = gameHeight * 20 / 100 / 2
    $("#message h2").text(text)
    $("#message button").text(buttontext)
    $("#message").css({ top: mestop }).animate({ "top": gameHeight / 2 - mesheight }, 2000);

}

function hideMessage() {
    var mesheight = gameHeight * 20 / 100 / 2
    $("#message").css({ top: gameHeight / 2 - mesheight }).animate({ "top": gameHeight * 1.4 }, 2000);

}