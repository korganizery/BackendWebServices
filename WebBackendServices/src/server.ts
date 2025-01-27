import bodyParser from "body-parser";
import cors from "cors";
import express from 'express';
import http from "http";
import { Server } from "socket.io";
import webpush from 'web-push';



// 创建 Express 应用
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 5000;
// const MONGODB_URI = "mongodb://localhost:27017/chatApp";

app.use(cors());
app.use(bodyParser.json());

// VAPID keys
const vapidKeys = webpush.generateVAPIDKeys();
console.log('Public Key:', vapidKeys.publicKey);
console.log('Private Key:', vapidKeys.privateKey);


webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);


const subscriptions: any[] = [];

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);
  res.status(201).json({});
});

app.post('/sendNotification', (req, res) => {
  const notificationPayload = {
    notification: {
      title: 'New Notification',
      body: 'This is a test notification',
      icon: './favicon.ico'
    }
  };

  const promises = subscriptions.map(sub =>
    webpush.sendNotification(sub, JSON.stringify(notificationPayload))
  );

  Promise.all(promises)
    .then(() => res.status(200).json({ message: 'Notification sent successfully.' }))
    .catch(err => {
      console.error('Error sending notification:', err);
      res.sendStatus(500);
    });
});

// 手动添加数据并推送通知
app.post('/manualNotification', (req, res) => {
  const notificationPayload = {
    notification: {
      title: 'Manual Notification',
      body: 'This is a manually triggered notification',
      icon: './favicon.ico'
    }
  };

  const promises = subscriptions.map(sub =>
    webpush.sendNotification(sub, JSON.stringify(notificationPayload))
  );

  Promise.all(promises)
    .then(() => res.status(200).json({ message: 'Manual notification sent successfully.' }))
    .catch(err => {
      console.error('Error sending manual notification:', err);
      res.sendStatus(500);
    });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
