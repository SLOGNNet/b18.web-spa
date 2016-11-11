      const io = require('socket.io-emitter')({ host: 'localhost', port: 6379 });
      
    setInterval(() => {
        console.log('start notification');
        const defaultRoom = '1';
        // need to set namespace every time before emit, seems issue in socker emiter io, 
        // they clear namespace value on every emit
        io.of('/notifications').to(defaultRoom).emit('message', { message: 'time: ' + Date.now(), username: 'test' });
    }, 5000);