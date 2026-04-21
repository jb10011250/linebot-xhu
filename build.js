const fs = require('fs');
const XLSX = require('xlsx');

try {
  const workbook = XLSX.readFile('LINE_Bot_內容對照表.xlsx');
  const sheetName = workbook.SheetNames.find(n => n.includes('內容對照表')) || workbook.SheetNames[1] || workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

  let keywordMap = {};
  let menusMap = {};

  function escapeText(str) {
    if (!str) return '';
    return String(str).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
  }

  function buildImageUrlSnippet(fileName) {
    let p = fileName.trim();
    if (p.startsWith('http://') || p.startsWith('https://')) {
      return `\`${escapeText(p)}\``;
    }
    return `\`\${BASE_URL}/public/${escapeText(p)}\``;
  }

  rows.forEach(row => {
    const code = String(row['代碼'] || '').trim();
    const keyword = String(row['關鍵字（Key）'] || '').trim();
    const w1 = row['回應文字1（W1）'];
    const p1 = row['回應圖片1（P1）'];
    const w2 = row['回應文字2（W2）'];
    const p2 = row['回應圖片2（P2）'];

    if (!code || code.includes('Rich Menu') || code.startsWith('【')) return;

    // 1. 寫入關鍵字映射
    if (keyword) {
      if (keyword === '（非關鍵字觸發）') return; 
      keywordMap[keyword] = code;
    }

    // 特殊代碼 (如入口輪播與 NKW) 的版面由外部 menus.js 客製化，因此跳過產生固定的圖文物件
    if (['A0','B0','C0','D0','E0','F0', 'NKW', 'NKW-1', 'NKW-2', 'NKW-3'].includes(code)) return;

    // 2. 建立一般的圖文結構
    let messages = [];

    if (w1) messages.push(`{ type: 'text', text: \`${escapeText(w1)}\` }`);
    if (p1) messages.push(`{ type: 'image', originalContentUrl: ${buildImageUrlSnippet(p1)}, previewImageUrl: ${buildImageUrlSnippet(p1)} }`);
    if (w2) messages.push(`{ type: 'text', text: \`${escapeText(w2)}\` }`);
    if (p2) messages.push(`{ type: 'image', originalContentUrl: ${buildImageUrlSnippet(p2)}, previewImageUrl: ${buildImageUrlSnippet(p2)} }`);

    if (messages.length > 0) {
      menusMap[code] = `    '${escapeText(code)}': [\n      ${messages.join(',\n      ')}\n    ]`;
    }
  });

  const keywordsContent = `// 機器人自動轉換產生的關鍵字對照表 (Key -> Code)
// 執行 node build.js 會覆蓋此檔案，請勿直接修改。
module.exports.keywordMap = {
${Object.entries(keywordMap).map(([k, v]) => `  '${escapeText(k)}': '${escapeText(v)}'`).join(',\n')}
};
`;
  fs.writeFileSync('keywords.js', keywordsContent, 'utf-8');

  // 對於 NKW (首頁)，根據 Excel 上的定義，我們需要組合 NKW-1, NKW-2 及圖片六宮格 NKW-3
  // 為了程式碼整潔，直接寫入固定結構
  const menusContent = `// 機器人自動轉換產生的回應對照表 (Code -> Messages)
// 執行 node build.js 會覆蓋此檔案，請勿直接修改。
const carousels = require('./carousels');
require('dotenv').config();

const BASE_URL = process.env.BASE_URL || 'https://linebot-xhu.onrender.com';

module.exports.getReply = function(code) {
  const replies = {
    // --- 手動設定的特殊業務入口輪播與預設訊息 ---
    'NKW': [
      { type: 'text', text: '您好！\\n有任何地政相關的問題歡迎輸入以下數字取得更多相關資訊，或撥打本所電話03-5903588，將有人員進一步協助您！\\n【 1 】－上班時間\\n【 2 】－聯絡電話\\n【 3 】－地所住址\\n【 4 】－官方網站\\n【 5 】－粉絲專頁\\n【 6 】－其他問題\\n快邀請親朋好友一起加入官方LINE，將會不定時收到最新活動消息唷！' },
      { type: 'text', text: '新湖地政官方帳號提供線上諮詢服務\\n點選下方圖示可進行簡易的地政諮詢~\\n若您想詢問其他問題，歡迎撥打本所電話03-5903588，將由專人為您解答，謝謝您！' },
      carousels.mainMenu(BASE_URL) 
    ],
    'A0': [
      { type: 'text', text: '請選擇您想了解的【登記業務】項目：' },
      carousels.registrationMenu1(BASE_URL)
    ],
    'B0': [ { type: 'text', text: '本區為【測量業務諮詢】(輪播圖尚未建置，可先嘗試輸入「鑑界規費試算」)' } ],
    'C0': [ { type: 'text', text: '本區為【地價業務諮詢】(輪播圖尚未建置，可先嘗試輸入「301」)' } ],
    'D0': [ { type: 'text', text: '本區為【資訊業務諮詢】(輪播圖尚未建置)' } ],
    'E0': [ { type: 'text', text: '本區為【地用業務諮詢】(輪播圖尚未建置)' } ],
    'F0': [ { type: 'text', text: '本區為【檔案及其他綜合業務諮詢】(輪播圖尚未建置)' } ],

    // --- Excel 動態擷取的資料 ---
${Object.values(menusMap).join(',\n')}
  };

  return replies[code] || [{ type: 'text', text: '很抱歉，尚未建立此關鍵字的自動回應內容。' }];
};
`;
  fs.writeFileSync('menus.js', menusContent, 'utf-8');

  console.log("✅ 轉換成功！已修正關鍵字映射與圖片解析！");

} catch (err) {
  console.error("❌ 轉換失敗：", err);
}
