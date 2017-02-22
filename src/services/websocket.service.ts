export class WebSocketService {
	private http:any;
    private io:any;
    public static sockets:any;
    constructor(app:any) {
        this.http = require('http').Server(app);
        this.io = require('socket.io')(this.http);
        WebSocketService.sockets = {};
	}
    Listen(port:any){
        var self = this;
        this.http.listen(port);
        this.io.on('connection', function (socket:any) {
        WebSocketService.sockets[socket.id]=socket;
        socket.emit('socketId', { socketId: socket.id });
        socket.on('send-order-detail', (ordersdetail:any) => {
            self.io.emit('placeId', {type:'ordersdetail', text: ordersdetail});
            console.log( ordersdetail);
        });
        console.log('user connected');
        socket.on('disconnect', function(){
            console.log('user disconnected');
        });

        // socket.on('my other event', function (data:any) {
        //         console.log(`socket id : ${socket.id} ,data :${data}`);
        //         this.io.sockets.connected[socket.id].emit('news', `${data} gile lu ndro`);
        // });
        });
    }
}

