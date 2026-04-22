const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const testModels = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemma-4-31b-it",
  "gemini-3.1-flash-lite-preview",
  "gemini-2.0-flash",
  "gemini-1.5-flash-latest"
];

async function runTests() {
  console.log("🚀 開始測試 API 模型雷達...\n" + "=".repeat(40));
  
  for (const modelName of testModels) {
    console.log(`\n🔍 測試模型: ${modelName}`);
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("回覆我一個字：好");
      const text = result.response.text().trim();
      console.log(`✅ [測試成功] 模型存活！回覆內容: "${text}"`);
    } catch (err) {
      if (err.message.includes("404")) {
        console.log(`❌ [404 找不到] 這個模型代號已被 Google 停用或不存在。`);
      } else if (err.message.includes("429") || err.message.includes("Quota")) {
        console.log(`⚠️ [429 額度不足] 有此模型，但您的帳號目前無配額 (limit: 0) 或已用盡。`);
      } else if (err.message.includes("500")) {
        console.log(`🔥 [500 伺服器錯誤] 模型存在，但 Google 端遇到內部錯誤 (吃太飽或當機)。`);
      } else {
        console.log(`❌ [代碼報錯] ${err.message}`);
      }
    }
  }
  console.log("\n" + "=".repeat(40) + "\n🏁 測試結束！");
}

runTests();
