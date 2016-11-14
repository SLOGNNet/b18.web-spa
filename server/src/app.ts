import * as express from "express";
import * as http from "http";
import * as serveStatic from "serve-static";
import * as path from "path";
import * as socketIo from "socket.io";
import { logger, setup as loggerSetup} from './logger';
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

        this.configureLogging();

        this.routes();
        this.server = http.createServer(this.app);
        this.sockets();
        this.listen();
    }

    private config(): void {
        this.port = process.env.PORT || 5000;

        this.root = path.join(path.resolve(__dirname, '../dist'));
    }

    private configureLogging() {
        loggerSetup();
    }

    private routes(): void {
        let router: express.Router;
        router = express.Router();

        router.get('/demo', (request: express.Request, result: express.Response) => {
            result.sendFile(path.join(this.root, '/demo.html'));
        });

        this.app.use('/', router);
    }

    private sockets(): void {
        const redis = require('redis');
        const redisAdapter = require('socket.io-redis');
        const sub = redis.createClient(6379, 'localhost', { return_buffers: true });
        const adapter = redisAdapter({ subClient: sub });
        this.io = socketIo(this.server, {
            adapter: adapter
        });
        new NotificationSocket(this.io, '/notifications');
        new NotificationSocket(this.io, '/drivers');
    }

    private listen(): void {
        this.server.listen(this.port);

        this.server.on("error", error => {
            logger().info("ERROR", error);
        });

        this.server.on("listening", () => {
            console.log(logger())
            logger().info(`==> Listening on port ${this.port}. Open up http://localhost:${this.port}/ in your browser.`);
        });
    }
}

let server = Server.bootstrap();
export = server.app;
