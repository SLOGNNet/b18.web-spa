import { logger } from '../logger'

export class MessagesSocket {
    nsp: any;
    name: string;
    data: any;
    socket: any;
    logger: any;

    constructor(io: any, namespace: string) {
        this.nsp = io.of(namespace);
        this.nsp.on("connection", (socket: any) => {
            console.log(socket.handshake['query'])
            var room = socket.handshake['query']['roomId'] || 0;
            logger().info(`Client connected to ${namespace} to room ${room}`);
            this.socket = socket;
            this.socket.join(room);
            this.nsp.to(room).emit('message', { message: `You have connected to ${namespace}`, type: 'system' });
            this.listen(room, namespace);
        });
    }

    private listen(room: string, namepsace: string): void {
        this.socket.on("disconnect", () => this.disconnect(room, namepsace));
    }

    private disconnect(room: string, namepsace: string): void {
        this.socket.leave(room);
        logger().info(`Client disconnected from ${namepsace} room ${room}`);
    }
}
