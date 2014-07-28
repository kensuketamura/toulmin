var nodeID;
var value;
var beforeValue;
var openFlag = false;
var buttonFlag = false;

$("button.btn-sub-claim").click(function () {
    $(".sub-claim").slideToggle("fast");
    $(".btn-sub-claim").toggleClass("active");
});

$(".goodbad").click(function () {
    var state = ".thumbs-" + $(this).attr("value") + "-num";
    var commentid = "#" + $(this).attr("id");
    var currentnum = Number($(commentid + state).html());
    $(commentid + state).html(" " + ++currentnum);
    buttonFlag = true;
});

$("a.comment-view").click(function () {
    if (!buttonFlag) {
        value = $(this).attr("id");
        value = "#" + value + ".node-panel";
        if (beforeValue) {
            if (openFlag) {
                $(beforeValue).slideToggle("fast", function () {
                });
            }
            if (beforeValue == value) {
                if (!openFlag) {
                    $(value).slideToggle("fast", function () {
                    });
                    openFlag = true;
                } else {
                    openFlag = false;
                }
            } else {
                $(value).slideToggle("fast", function () {
                });
                openFlag = true;
            }
        } else {
            $(value).slideToggle("fast", function () {
            });
            openFlag = true;
        }
        beforeValue = value;
    }

    buttonFlag = false;
});
//$(".response-button").click(function () {
//    var commentId = $(this).attr("id");
//    var commentValue = document.getElementById(commentId).value;
//    console.log(commentValue);
//    document.getElementById(commentId).value = "";
//});
//# sourceMappingURL=script.js.map
