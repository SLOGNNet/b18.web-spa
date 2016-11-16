import { logger } from '../logger'
const io = require('socket.io-emitter')({ host: 'localhost', port: 6379 });

setInterval(() => {
    logger().info('start notification');
    const defaultRoom = '1';
    // need to set namespace every time before emit, seems issue in socker emiter io,
    // they clear namespace value on every emit
    const message = {
         message: 'time: ' + Date.now(),
         username: 'test',
         type: 'system'
    };
    io.of('/notifications').to(defaultRoom).emit('message', message);
    io.of('/drivers').to(defaultRoom).emit('message', message);
}, 5000);
