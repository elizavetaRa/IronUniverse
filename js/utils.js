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

    /*if (circle.circleClass == "planet") {


        $("<img src='img/sun.png'></img>").css({
            "width": circleWidth,
            "height": circleHeight
        })
            .appendTo($("#" + id))

    }*/



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
            "top": top + 220,
            "left": left
        })
        htmlCircle.addClass("collectible")

    }


    if (circle.circleClass == "css") {
        $("<img src='img/css.png'></img>").css({
            "width": circleWidth,
            "height": circleHeight
        })
            .appendTo($("#" + id))

        htmlCircle.css({
            "top": top - 200,
            "left": left + 50
        })
        htmlCircle.addClass("collectible")

    }


    if (circle.circleClass == "js") {
        $("<img src='img/js.png'></img>").css({
            "width": circleWidth,
            "height": circleHeight
        })
            .appendTo($("#" + id))

        htmlCircle.css({
            "top": top,
            "left": left + 200
        })

        htmlCircle.addClass("collectible")

    }


    circle.htmlCircle = htmlCircle;
    circle.x = gameHeight / 2;
    circle.y = gameWidth / 2;
    circle.id = id;

    return $("#"+id)


}


function produceHtmlMe(me) {

    var htmlMe = $("<div id='me' class='" + me.meClass + "'><img src='img/me1.png'></img></div>")
    htmlMe.appendTo($("#gamefield"));


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


function produceHittable(r, hittableClass, circle, v, direction) {
    var hittable = new Circle(r, hittableClass)
    produceHtmlCircle(hittable);
    var selectorHittable = '#' + hittable.id;
    var startTime = setInterval(function () {
        moveObjOnCircle(selectorHittable, circle, v, direction);
    }, 3)

    return hittable
}



function moveObjOnCircle(objId, circle, velocity, direction) {

    t += 0.01;
    var xcenter = gameWidth / 2;
    var ycenter = gameHeight / 2;
    var newLeft = Math.floor(xcenter + direction*(circle.r * Math.cos(t)));
    var newTop = Math.floor(ycenter + (circle.r * Math.sin(t)));
    $(objId).animate({
        top: newTop,
        left: newLeft,
    }, velocity);
}


function moveMeOnCircle(circle) {

    var xcenter = gameWidth / 2 - 25;
    var ycenter = gameHeight / 2 - 25;
    var newLeft = Math.floor(xcenter + (circle.r * Math.cos(p)));
    var newTop = Math.floor(ycenter + (circle.r * Math.sin(p)));
    $("#me").animate({
        top: newTop,
        left: newLeft,
    }, 0, function () {
        p += 0.0008;

    });

}