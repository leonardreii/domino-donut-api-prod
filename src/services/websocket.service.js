"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WebSocketService {
    constructor(app) {
        this.http = require('http').Server(app);
        this.io = require('socket.io')(this.http);
        WebSocketService.sockets = {};
    }
    Listen(port) {
        var self = this;
        this.http.listen(port);
        this.io.on('connection', function (socket) {
            WebSocketService.sockets[socket.id] = socket;
            console.log(socket.id);
            socket.on('send-order-detail', (ordersdetail) => {
                self.io.emit('placeId', { type: 'ordersdetail', text: ordersdetail });
                console.log(ordersdetail);
            });
            console.log('user connected');
            socket.on('disconnect', function () {
                console.log('user disconnected');
            });
        });
    }
}
exports.WebSocketService = WebSocketService;
//# sourceMappingURL=websocket.service.js.map