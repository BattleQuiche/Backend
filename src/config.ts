import * as webpush from 'web-push';

if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}

if (
  !process.env.NOTIFICATION_PUB_KEY ||
  !process.env.NOTIFICATION_PRIVATE_KEY
) {
  const vapidKeys = webpush.generateVAPIDKeys();
  process.env.NOTIFICATION_PUB_KEY = vapidKeys.publicKey;
  process.env.NOTIFICATION_PRIVATE_KEY = vapidKeys.privateKey;
}

export default () => ({
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  notificationPubKey: process.env.NOTIFICATION_PUB_KEY,
  notificationPrivateKey: process.env.NOTIFICATION_PRIVATE_KEY,
});
