import * as express from "express";
import * as http from "http";
import * as serveStatic from "serve-static";
import * as path from "path";
import * as socketIo from "socket.io";

import { NotificationSocket } from "./socket";

declare var process, __dirname;

class Server {
    public app: any;
    private server: any;
    private io: any;
    private root: string;
    private port: number;
    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();

        this.config();

        this.routes();

        this.server = http.createServer(this.app);

        this.sockets();

        this.demoNotificationEmitter();

        this.listen();
    }

    private config(): void {
        this.port = process.env.PORT || 5000;

        this.root = path.join(path.resolve(__dirname, '../dist'));
    }

    private routes(): void {
        let router: express.Router;
        router = express.Router();

        router.get('/', (request: express.Request, result: express.Response) => {
            result.sendFile(path.join(this.root, '/index.html'));
        });

        this.app.use('*', router);
    }

    private demoNotificationEmitter(): void {
        const io = require('socket.io-emitter')({ host: 'localhost', port: 6379 });
        const socket = io.of('/notifications');
        setInterval(() => {
            console.log('start notification');
            socket.emit('notification', { message: 'time: ' + Date.now(), username: 'test' });
        }, 5000);
    }

    private sockets(): void {
        const redis = require('redis');
        const redisAdapter = require('socket.io-redis');
        const sub = redis.createClient(6379, 'localhost', { return_buffers: true });
        const adapter = redisAdapter({ subClient: sub });
        this.io = socketIo(this.server, {
            adapter: adapter
        });
        let notificationSocket = new NotificationSocket(this.io);
    }

    private listen(): void {
        this.server.listen(this.port);

        this.server.on("error", error => {
            console.log("ERROR", error);
        });

        this.server.on("listening", () => {
            console.log('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', this.port, this.port);
        });

    }
}

let server = Server.bootstrap();
export = server.app;
