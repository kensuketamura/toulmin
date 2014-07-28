declare var io: any;

class SocketManager {
    private socket;
    constructor() {
        this.socket = null;
    }

    Connect(room: string, host: string) {
        this.socket = io.connect(host);
    }

    isConnecting(): boolean {
        if (this.socket) {
            return true;
        }
        return false;
    }

    EventListener(room: string, name: string) {
        this.socket.on('connected', () => {
            this.socket.json.emit('init', { 'room': room, 'name': name });
        });

        this.socket.on('response push', (data) => {
            console.log(data);
            if (data) {
                this.UpdateReaponse(data.target_id, data.user_id, data.body, data.date);
            }
        });

    }

    UpdateReaponse(target_id, user_id, body, date) {
        console.log(body);
        var target = target_id;
        var t = {
            response_id: "response",
            body: body,
            date: date
        }
        $("#response_item_tmpl").tmpl([t]).appendTo(target);
    }

    SendResponse(target_id, user_id, body) {
        this.socket.json.emit('response send', { target_id: target_id, user_id: user_id, body: body, date: new Date() });
    }
}

$(function () {
    var socket: SocketManager = new SocketManager();
    socket.Connect("", "/");
    $(".response-button").click(function () {
        var commentId = $(this).attr("id");
        var commentValue = document.getElementById(commentId).value;
        console.log(commentValue);
        console.log(commentId);
        document.getElementById(commentId).value = "";

        socket.SendResponse("#" + commentId + "-list", "guest", commentValue);
    });

    socket.EventListener("Sample", "Guest");

});