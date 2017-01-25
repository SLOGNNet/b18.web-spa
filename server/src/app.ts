import * as express from 'express';
import * as http from 'http';
import * as serveStatic from 'serve-static';
import * as path from 'path';
import * as socketIo from 'socket.io';
import { logger, setup as loggerSetup } from './logger';
import crossHeaders from '../middleware/cross';
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dest = __dirname + '/uploads/';
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

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
    // cross-domain
    this.app.use(crossHeaders);
    this.config();
    this.configureLogging();
    this.routes();
    this.server = http.createServer(this.app);
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

    router.post('/upload', function (req: any, res) {
      upload.any()(req, res, function (err) {
        if (!req.files || req.files.length === 0) {
            res.send('No files were uploaded.');
            return;
        }
        if (err) {
          res.send('File upload error.');
        } else {
          res.send('File uploaded.');
        }
      });
    });

    this.app.use('/', router);
  }

  private listen(): void {
    this.server.listen(this.port);

    this.server.on('error', error => {
      logger().info('ERROR', error);
    });

    this.server.on('listening', () => {
      logger().info(`==> Listening on port ${this.port}. Open up http://localhost:${this.port}/ in your browser.`);
    });
  }
}

const server = Server.bootstrap();
export default server.app;
