require('dotenv').config();
const express = require('express');
const line = require('@line/bot-sdk');
const { keywordMap } = require('./keywords');
const { getReply } = require('./menus');
const aiService = require('./ai_service'); // 引入 AI 服務層

// 使用暫時的記憶體儲存哪些使用者目前在 AI 模式
// 注意：Render 免費版重啟時此清單會清空
const userStates = {}; 

const config = {
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
};

const client = new line.Client(config);
const app = express();
const path = require('path');

// 智慧快取解碼器：將 /public/xxx.v123.png 轉回 /public/xxx.png 讀取實體檔案
app.use('/public', (req, res, next) => {
  // 匹配中間帶有 .v 加上純數字的檔名格式
  if (req.url.match(/\.v\d+\./)) {
    req.url = req.url.replace(/\.v\d+\./, '.');
  }
  next();
});

app.use('/public', express.static(path.join(__dirname, 'public')));

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

  const userId = event.source.userId;
  let messages = [];

  // --- 關鍵路徑 A: 檢查是否要退出「AI 助理」模式 ---
  const exitKeywords = ['退出', '結束', '離開', '返回', '跳出'];
  if (userStates[userId] === 'AI_MODE' && exitKeywords.some(key => text.includes(key))) {
      userStates[userId] = null;
      messages = [{ type: 'text', text: `好的，已幫 ${userName} 離開 AI 諮詢模式。回到主選單囉！` }];
      // 順便把主選單拋出來
      messages = messages.concat(getReply('NKW'));
      messages = personalizeMessages(messages, userName);
      return client.replyMessage(event.replyToken, messages);
  }

  // --- 關鍵路徑 B: 檢查是否進入「AI 助理」模式 ---
  // 這邊對應圖文選單 RM4 的關鍵字
  if (text.includes('AI助理') || text.includes('AI 助理') || text.includes('智能助理')) {
      userStates[userId] = 'AI_MODE';
      const welcomeMsg = [
          { type: 'text', text: `您好 ${userName}！我是「地政 8888」專業 AI 客服。` },
          { type: 'text', text: `我已準備好為您解答地政、房屋、稅務等問題。\n\n⚠️ 注意：我所有的回答均來自官方知識庫文件。\n若要結束諮詢，請輸入「退出」或「返回」。` }
      ];
      return client.replyMessage(event.replyToken, welcomeMsg);
  }

  // --- 關鍵路徑 C: 處理 AI 模式下的對話流量 ---
  if (userStates[userId] === 'AI_MODE') {
      try {
          // 顯示載入動畫 (如果您的 SDK 版本支援的話)
          // await client.showLoadingAnimation(event.source.userId, 10);
          
          const aiAnswer = await aiService.getAIResponse(text, userName);
          
          // AI 回答同樣可以用 personalizeMessages 處理，雖然我們已經在 Prompt 傳過 userName
          // 但二次過濾確保萬無一失
          const reply = personalizeMessages([{ type: 'text', text: aiAnswer }], userName);
          return client.replyMessage(event.replyToken, reply);
      } catch (err) {
          console.error("AI 回報錯誤:", err.message);
          return client.replyMessage(event.replyToken, [{ type: 'text', text: "哎呀，服務稍微斷線了，請再試一次！" }]);
      }
  }

  // --- 原有的關鍵字邏輯 (NORMAL_MODE) ---
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
