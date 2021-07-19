import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.BMCJT_PUSHER_APP || '',
  key: process.env.BMCJT_PUSHER_KEY || '',
  secret: process.env.BMCJT_PUSHER_SECRET || '',
  cluster: process.env.BMCJT_PUSHER_CLUSTER || '',
  useTLS: true,
});

const sendMsg = (channel: string, event: string, message?: string): void => {
  pusher.trigger(channel, event, {
    message,
  });
};

export default { sendMsg };
