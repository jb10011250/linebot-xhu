require('dotenv').config();
const express = require('express');
const line = require('@line/bot-sdk');
const { keywordMap } = require('./keywords');
const { getReply } = require('./menus');

const config = {
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
};

const client = new line.Client(config);
const app = express();

app.get('/', (req, res) => {
  res.send('Bot is alive. Webhook 準備就緒。');
});

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const text = event.message.text.trim();
  const code = keywordMap[text];         

  if (code) {
    const messages = getReply(code);     
    return client.replyMessage(event.replyToken, messages);
  }

  const defaultMessages = getReply('NKW');
  return client.replyMessage(event.replyToken, defaultMessages);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot 伺服器已啟動，監聽 port: ${PORT}`);
});
