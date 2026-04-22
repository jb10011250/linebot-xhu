const { GoogleGenerativeAI } = require("@google/generative-ai");
const mammoth = require('mammoth');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// 模型設定 (完全淘汰 1.5 舊時代世代！主力回歸您擁有 1500 次配額的 Gemma 4)
const MODELS = [
  "gemma-4-31b-it",                // 第一主力：您的 1500 次高額度模型
  "gemini-3.1-flash-lite-preview", // 第二備援：實驗版最新輕量化模型
  "gemini-3.0-flash"               // 終極備援：理論上的現代穩定版
];

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

// 知識庫快取
let cachedKnowledge = null;

/**
 * 載入所有 DOCX 文件並合併為文字
 */
async function loadKnowledgeBase() {
  if (cachedKnowledge) return cachedKnowledge;

  const kbDir = path.join(__dirname, 'knowledge');
  if (!fs.existsSync(kbDir)) {
    console.warn("⚠️ 找不到 knowledge 目錄，AI 將進入通用諮詢模式。");
    return "";
  }

  const files = fs.readdirSync(kbDir).filter(f => f.endsWith('.docx'));
  let fullText = "";

  console.log(`[AI服務] 正在載入官方知識庫 (${files.length} 份文件)...`);

  for (const file of files) {
    try {
      const result = await mammoth.extractRawText({ path: path.join(kbDir, file) });
      fullText += `\n\n【文件名稱：${file}】\n` + "─".repeat(20) + "\n" + result.value;
    } catch (err) {
      console.error(`[AI服務] 無法讀取核心文件 ${file}:`, err.message);
    }
  }

  cachedKnowledge = fullText;
  return fullText;
}

/**
 * 送出 AI 請求
 */
async function getAIResponse(userMessage, userName = "民眾") {
  const kbText = await loadKnowledgeBase();
  
  // 建立系統指令 (System Instruction / Prompt)
  const systemPrompt = `
你是「新湖地政事務所 - 地政 8888 專業 AI 客服助手」。
你的溝通對象是「${userName}」。

【核心任務】
請利用以下提供的「地政業務官方知識庫」來回答用戶的問題。

【絕對規則】
1. 你的回答內容「必須 100% 來自」提供的知識庫。
2. 如果知識庫中找不到相關資訊，你必須謙虛地回答：「很抱歉，在我的官方資料庫中找不到相關資訊，建議您致電本所專員協助您。」，不准自己編造。
3. 如果用戶的問題與「地政、不動產、房屋稅務、法律規費」無關，請回覆：「我是地政專業客服，目前僅能回答地政相關問題喔！」
4. 專業領域僅限：地政、不動產、房屋稅務、測量工程、土地規劃、房市新聞。
5. 語氣要求：語氣親切、專業、有耐心，多用「您」來稱呼對方。
6. 格式要求：盡量使用條列式，段落清晰，適合於 LINE 手機畫面閱讀。
7. 【極度重要限制】：輸出應直接進入內容主體。絕對禁止輸出任何思考過程、內心獨白或 <thought>、<rules> 標籤。請針對問題直接給出最終要傳給民眾的解答。
8. 你的回覆第一句「必須」是類似「您好！」或「為您整理如下：」的對話開頭。

【地政業務官方知識庫開始】
${kbText}
【地政業務官方知識庫結束】
  `;

  for (const modelName of MODELS) {
    try {
      let modelConfig = { model: modelName };
      
      // 只有 Gemini 實驗模型才支援 thinkingConfig，Gemma 系列會報 400 錯誤
      if (modelName.includes('gemini') && modelName.includes('preview')) {
        modelConfig.generationConfig = {
          thinkingConfig: { thinkingBudget: 0 }
        };
      }
      
      const model = genAI.getGenerativeModel(modelConfig);
      
      const prompt = `${systemPrompt}\n\n用戶提問：${userMessage}\n\n請直接回覆正式中文答案：`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (err) {
      console.error(`AI 模型 ${modelName} 呼叫失敗，嘗試備援...`, err.message);
      continue;
    }
  }

  return "很抱歉，AI 暫時忙線中，請稍後再試或是輸入其他關鍵字。";
}

module.exports = { getAIResponse };
