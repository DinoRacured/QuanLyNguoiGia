import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

const userSensorData1 = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  const userId = socket.id;

  const MathTemp = Math.random() * (40 - 35) + 35;
  const OxyTemp = Math.random() * (100 - 90) + 80;

  userSensorData1[userId] = {
    temperature: MathTemp,
    Oxy: OxyTemp,
  };

  socket.emit('sensorData', {
    sensor1: userSensorData1[userId],
  });

  setInterval(() => {
    userSensorData1[userId] = {
      temperature: Math.random() * (40 - 35) + 35,
      Oxy: Math.random() * (100 - 90) + 80,
    };

    socket.emit('sensorData', {
      sensor1: userSensorData1[userId],
    });
  }, 5000);

  socket.on('disconnect', () => {
    console.log('User disconnected');
    delete userSensorData1[userId];
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});