export class WebSocketService {
	private http:any;
    private io:any;
    private sockets:any;
    constructor(app:any) {
        this.http = require('http').Server(app);
        this.io = require('socket.io')(this.http);
        this.sockets = {};
	}
    Listen(port:any){
        this.http.listen(port);
        this.io.on('connection', function (socket:any) {
            this.sockets[socket.id]=socket;
        socket.emit('socketId', { socketId: socket.id });
        // socket.on('my other event', function (data:any) {
        //         console.log(`socket id : ${socket.id} ,data :${data}`);
        //         this.io.sockets.connected[socket.id].emit('news', `${data} gile lu ndro`);
        // });
        });
    }
    getSockets(){
        return this.sockets;
    }
}