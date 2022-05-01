import * as http from 'http';
import socketio from 'socket.io';

function initialiseRegistersServer(server: http.Server): socketio.Server {
  const io = new socketio.Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    socket.on('textUpdated', (payload: string) => {
      socket.broadcast.emit('textUpdated', payload);
    });

    socket.on('getJobs', () => {
      socket.emit('getJobs', [
        { id: 1, name: 'Nathan', location: 'Melbourne' },
        { id: 2, name: 'James', location: 'Shepparton' },
      ]);
    });
  });

  return io;
}

export default initialiseRegistersServer;
