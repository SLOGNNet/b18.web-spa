export class NotificationSocket {
    nsp: any;
    name: string;
    data: any;
    socket: any;

    constructor(io: any) {
        this.nsp = io.of("/notifications" );
        this.nsp.on("connection", (socket: any) => {
            console.log("Client connected to notifications");
            this.socket = socket;
            this.listen();
        });
    }

    private listen(): void {
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("notification", (message: any) => this.onNotification(message));
    }

    private disconnect(): void {
        console.log("Client disconnected from notifications:");
    }

    private onNotification(message: any): void {
        console.log('send notification ' + message);
        this.nsp.emit("notification", message);
    }
}
