import express = require('express');
import routes = require('./routes/index');
import user = require('./routes/user');
import http = require('http');
import path = require('path');
import socketIO = require('socket.io');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.cookieParser());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

import stylus = require('stylus');
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server: http.Server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

// クライアントの接続を待つ(IPアドレスとポート番号を結びつけます)
var io = socketIO.listen(server);

// クライアントが接続してきたときの処理
io.sockets.on('connection', function (socket) {
    console.log("connection");
    // メッセージを受けたときの処理
    socket.on('message', function (data) {
        // つながっているクライアント全員に送信
        console.log("message");
        io.sockets.emit('message', { value: data.value });
    });

    // クライアントが切断したときの処理
    socket.on('disconnect', function () {
        console.log("disconnect");
    });

    socket.on('response send', function (data) {
        //var room, name;

        //socket.get('room', function (err, _room) {
        //    room = _room;
        //});
        //socket.get('name', function (err, _name) {
        //    name = _name;
        //});
        console.log("Server Response");
        console.log(data);
        socket.json.emit('response push', { target_id: data.target_id, user_id: data.user_id, body: data.body, date: data.date });
        socket.broadcast.json.emit('response push', { target_id: data.target_id, user_id: data.user_id, body: data.body, date: data.date });
    });
});
