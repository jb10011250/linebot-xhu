const carousels = require('./carousels');

module.exports.getReply = function(code) {
  const replies = {
    'NKW': [
      { type: 'text', text: '您好！\n有任何地政相關問題，歡迎點擊下方主選單，或輸入代碼查詢。' },
      carousels.mainMenu() 
    ],

    'A0': [
      { type: 'text', text: '請選擇您想了解的【登記業務】項目：' },
      carousels.registrationMenu1()
    ],
    'B0': [ { type: 'text', text: '本區為【測量業務諮詢】(內容建置中)' } ],
    'C0': [ { type: 'text', text: '本區為【地價業務諮詢】(內容建置中)' } ],
    'D0': [ { type: 'text', text: '本區為【資訊業務諮詢】(內容建置中)' } ],
    'E0': [ { type: 'text', text: '本區為【地用業務諮詢】(內容建置中)' } ],
    'F0': [ { type: 'text', text: '本區為【檔案及其他綜合業務】(內容建置中)' } ],

    'A1': [ { type: 'text', text: '【謄本申請】\n您可以至本所或使用「全國地政電子謄本系統」線上申請！' } ],
    'REG-901': [ { type: 'text', text: '【登記申請書】下載連結：\n(從試算表補充網址)' } ]
  };

  return replies[code] || [{ type: 'text', text: '查無此服務代碼內容。' }];
};
