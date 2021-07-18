import Pusher from 'pusher';

const pusher = new Pusher({
  appId: '1064673',
  key: '6814256d3829ff3d95fa',
  secret: '2c412c63a02d43f5596f',
  cluster: 'ap4',
  useTLS: true,
});

const sendMsg = (channel: string, event: string, message?: string): void => {
  pusher.trigger(channel, event, {
    message,
  });
};

export default { sendMsg };
