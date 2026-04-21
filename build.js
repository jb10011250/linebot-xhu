const fs = require('fs');
const XLSX = require('xlsx');

try {
  // 1. 讀取 Excel 檔案
  const workbook = XLSX.readFile('LINE_Bot_內容對照表.xlsx');
  const sheetName = workbook.SheetNames.find(n => n.includes('內容對照表')) || workbook.SheetNames[1] || workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

  let keywordMap = {};
  let menusMap = {};

  // 處理特殊字元以防破壞產生的 JS 語法
  function escapeText(str) {
    if (!str) return '';
    return String(str).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
  }

  // 產生圖片網址（若為一般網址則直接使用，否則當作附檔名補上主機位址）
  function buildImageUrlSnippet(fileName) {
    let p = fileName.trim();
    if (p.startsWith('http://') || p.startsWith('https://')) {
      return `\`${escapeText(p)}\``;
    }
    return `\`\${BASE_URL}/public/${escapeText(p)}\``;
  }

  // 2. 尋訪每一列
  rows.forEach(row => {
    const code = String(row['代碼'] || '').trim();
    const keyword = String(row['關鍵字（Key）'] || '').trim();
    const w1 = row['回應文字1（W1）'];
    const p1 = row['回應圖片1（P1）'];
    const w2 = row['回應文字2（W2）'];
    const p2 = row['回應圖片2（P2）'];

    // 忽略標頭定義、純標記、非文字機器人邏輯等項目
    if (!code || code.includes('Rich Menu') || code === 'NKW' || ['A0','B0','C0','D0','E0','F0'].includes(code)) return;

    // A. 收集關鍵字映射
    if (keyword) {
      keywordMap[keyword] = code;
    }

    // B. 收集訊息組合
    let messages = [];

    if (w1) messages.push(`{ type: 'text', text: \`${escapeText(w1)}\` }`);
    if (p1) messages.push(`{ type: 'image', originalContentUrl: ${buildImageUrlSnippet(p1)}, previewImageUrl: ${buildImageUrlSnippet(p1)} }`);
    if (w2) messages.push(`{ type: 'text', text: \`${escapeText(w2)}\` }`);
    if (p2) messages.push(`{ type: 'image', originalContentUrl: ${buildImageUrlSnippet(p2)}, previewImageUrl: ${buildImageUrlSnippet(p2)} }`);

    // 只要有內容就註冊到此代碼下
    if (messages.length > 0) {
      menusMap[code] = `    '${escapeText(code)}': [\n      ${messages.join(',\n      ')}\n    ]`;
    }
  });

  // 3. 輸出 keywords.js
  const keywordsContent = `// 機器人自動轉換產生的關鍵字對照表 (Key -> Code)
// 執行 node build.js 會覆蓋此檔案，請勿直接修改。
module.exports.keywordMap = {
${Object.entries(keywordMap).map(([k, v]) => `  '${escapeText(k)}': '${escapeText(v)}'`).join(',\n')}
};
`;
  fs.writeFileSync('keywords.js', keywordsContent, 'utf-8');

  // 4. 輸出 menus.js
  const menusContent = `// 機器人自動轉換產生的回應對照表 (Code -> Messages)
// 執行 node build.js 會覆蓋此檔案，請勿直接修改。
const carousels = require('./carousels');
require('dotenv').config();

const BASE_URL = process.env.BASE_URL || 'https://linebot-xhu.onrender.com';

module.exports.getReply = function(code) {
  const replies = {
    // --- 手動設定的業務入口輪播 (不會被 Excel 覆寫) ---
    'NKW': [
      { type: 'text', text: '您好！\\n有任何地政相關問題，歡迎點擊下方主選單，或輸入代碼查詢。' },
      carousels.mainMenu() 
    ],
    'A0': [
      { type: 'text', text: '請選擇您想了解的【登記業務】項目：' },
      carousels.registrationMenu1()
    ],
    'B0': [ { type: 'text', text: '本區為【測量業務諮詢】(輪播圖尚未建置)' } ],
    'C0': [ { type: 'text', text: '本區為【地價業務諮詢】(輪播圖尚未建置)' } ],
    'D0': [ { type: 'text', text: '本區為【資訊業務諮詢】(輪播圖尚未建置)' } ],
    'E0': [ { type: 'text', text: '本區為【地用業務諮詢】(輪播圖尚未建置)' } ],
    'F0': [ { type: 'text', text: '本區為【檔案及其他業務】(輪播圖尚未建置)' } ],

    // --- Excel 動態擷取的資料 ---
${Object.values(menusMap).join(',\n')}
  };

  return replies[code] || [{ type: 'text', text: '很抱歉，尚未建立此關鍵字的自動回應內容。' }];
};
`;
  fs.writeFileSync('menus.js', menusContent, 'utf-8');

  console.log("✅ 轉換成功！已從 Excel 將全數內容建立至 keywords.js 與 menus.js 中！");

} catch (err) {
  console.error("❌ 轉換失敗：", err);
}
