// 六宮格與各種圖片輪播（Carousel）設定檔
// 用於產生 LINE Flex Message 格式的輪播選單

function bubbleButton(label, keyword, color) {
  return {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [{
        type: 'button',
        action: { 
          type: 'message', 
          label: label, 
          text: keyword 
        },
        style: 'primary',
        color: color
      }]
    }
  };
}

module.exports.mainMenu = () => ({
  type: 'flex',
  altText: '請選擇業務諮詢項目',
  contents: {
    type: 'carousel',
    contents: [
      bubbleButton('登記業務諮詢', '登記業務諮詢', '#1565C0'),
      bubbleButton('測量業務諮詢', '測量業務諮詢', '#2E7D32'),
      bubbleButton('地價業務諮詢', '地價業務諮詢', '#E65100'),
      bubbleButton('資訊業務諮詢', '資訊業務諮詢', '#6A1B9A'),
      bubbleButton('地用業務諮詢', '地用業務諮詢', '#00838F'),
      bubbleButton('檔案應用其他綜合業務諮詢', '檔案應用', '#4E342E'),
    ]
  }
});

module.exports.registrationMenu1 = () => ({
  type: 'flex',
  altText: '登記業務諮詢 (第一頁)',
  contents: {
    type: 'carousel',
    contents: [
      bubbleButton('謄本', '謄本', '#1565C0'),
      bubbleButton('登記規費', '登記規費', '#1565C0'),
      bubbleButton('公告', '公告', '#1565C0'),
      bubbleButton('登記案件辦理情形', '登記案件辦理情形', '#1565C0'),
      bubbleButton('跨所', '跨所', '#1565C0')
    ]
  }
});
