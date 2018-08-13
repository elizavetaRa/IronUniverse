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