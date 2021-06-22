import http from 'http';
import { Server } from 'socket.io';

let io: Server;

export default {
  connect: (server: http.Server): void => {
    io = new Server(server);
    io.on('connect', (socket) => {
      console.log('Client connected ' + socket.id);
    });
  },
  emit: (event: string, message: string): void => {
    if (io) {
      io.sockets.emit(event, message);
    }
  },
};
