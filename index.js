require('dotenv').config();
const express = require('express');
const line = require('@line/bot-sdk');

// 設定 LINE Bot API 的驗證資訊
const config = {
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
};

// 建立 LINE Client 實例
const client = new line.Client(config);
const app = express();

// Render 喚醒用的端點，並可確認伺服器活著
app.get('/', (req, res) => {
  res.send('Bot is alive. Webhook 已經準備就緒。');
});

// 定義 Webhook 路由
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(() => res.sendStatus(200))
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

// 處理所有的訊息事件
async function handleEvent(event) {
  // 如果不是訊息或不是純文字訊息，就忽略
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  // 最簡易的鸚鵡回應邏輯，用於驗證通道是否正常
  const echoMessage = { type: 'text', text: `收到：${event.message.text}` };

  // 透過 replyToken 回覆訊息
  return client.replyMessage(event.replyToken, echoMessage);
}

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot 伺服器已啟動，監聽 port: ${PORT}`);
});
