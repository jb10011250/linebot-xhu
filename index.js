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

app.use('/public', express.static('public'));

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

// 遞迴替換字串的輔助函數，用來找出訊息結構裡面所有的文字並替換稱呼
function personalizeMessages(obj, userName) {
  if (typeof obj === 'string') {
    // 這裡同時支援替換您的名字「阿吸」或是未來您統一代用的變數「{Name}」
    return obj.replace(/阿吸/g, userName).replace(/\{Name\}/gi, userName);
  } else if (Array.isArray(obj)) {
    return obj.map(item => personalizeMessages(item, userName));
  } else if (typeof obj === 'object' && obj !== null) {
    const newObj = {};
    for (const key in obj) {
      newObj[key] = personalizeMessages(obj[key], userName);
    }
    return newObj;
  }
  return obj;
}

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const text = event.message.text.trim();
  const code = keywordMap[text];

  // 嘗試取得該使用者的 LINE 暱稱
  let userName = '親愛的民眾'; // 預設稱呼
  if (event.source.userId) {
    try {
      const profile = await client.getProfile(event.source.userId);
      userName = profile.displayName;
    } catch (e) {
      console.error('無法取得使用者名稱：', e.message);
    }
  }

  let messages = [];

  if (code) {
    messages = getReply(code);
  } else {
    // 找不到關鍵字回傳預設首頁
    messages = getReply('NKW');
  }

  // 在發送前，過濾並動態將「阿吸」或「{Name}」替換為真實的 LINE 暱稱
  messages = personalizeMessages(messages, userName);

  return client.replyMessage(event.replyToken, messages);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot 伺服器已啟動，監聽 port: ${PORT}`);
});
