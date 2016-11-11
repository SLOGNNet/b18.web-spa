export class NotificationSocket {
    nsp: any;
    name: string;
    data: any;
    socket: any;

    constructor(io: any, namespace: string) {
        this.nsp = io.of(namespace);
        this.nsp.on("connection", (socket: any) => {
            var room = socket.handshake['query']['roomId'] || 0;
            console.log(`Client connected to ${namespace} to room ${room}`);
            this.socket = socket;
            this.socket.join(room);
            this.nsp.to(room).emit('message', { message: `You have connected to ${namespace}` });
            this.listen(room, namespace);
        });
    }

    private listen(room: string, namepsace: string): void {
        this.socket.on("disconnect", () => this.disconnect(room, namepsace));
    }

    private disconnect(room: string, namepsace: string): void {
        this.socket.leave(room);
        console.log(`Client disconnected from ${namepsace} room ${room}`);
    }
}
