var SocketManager = (function () {
    function SocketManager() {
        this.socket = null;
    }
    SocketManager.prototype.Connect = function (room, host) {
        this.socket = io.connect(host);
    };

    SocketManager.prototype.isConnecting = function () {
        if (this.socket) {
            return true;
        }
        return false;
    };

    SocketManager.prototype.EventListener = function (room, name) {
        var _this = this;
        this.socket.on('connected', function () {
            _this.socket.json.emit('init', { 'room': room, 'name': name });
        });

        this.socket.on('response push', function (data) {
            console.log(data);
            if (data) {
                _this.UpdateReaponse(data.target_id, data.user_id, data.body, data.date);
            }
        });
    };

    SocketManager.prototype.UpdateReaponse = function (target_id, user_id, body, date) {
        console.log(body);
        var target = target_id;
        var t = {
            response_id: "response",
            body: body,
            date: date
        };
        $("#response_item_tmpl").tmpl([t]).appendTo(target);
    };

    SocketManager.prototype.SendResponse = function (target_id, user_id, body) {
        this.socket.json.emit('response send', { target_id: target_id, user_id: user_id, body: body, date: new Date() });
    };
    return SocketManager;
})();

$(function () {
    var socket = new SocketManager();
    socket.Connect("", "/");
    $(".response-button").click(function () {
        var commentId = $(this).attr("id");
        var commentValue = document.getElementById(commentId).value;
        if (!commentValue) {
            alert("コメントを入力してください");
            document.getElementById(commentId).focus();
            return;
        }
        console.log(commentValue);
        console.log(commentId);
        document.getElementById(commentId).value = "";

        socket.SendResponse("#" + commentId + "-list", "guest", commentValue);
    });

    socket.EventListener("Sample", "Guest");
});
//# sourceMappingURL=MainView.js.map
