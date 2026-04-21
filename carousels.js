// 六宮格與各種圖片輪播（Carousel）設定檔
// 用於產生 LINE Flex Message 格式的輪播選單

// 通用按鈕泡泡 (Bubble) 產生器 - 用於尚無圖片時的版面
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

// 主選單 (六大業務入口 - NKW-3)
// 這裡將原本的純文字按鈕，改為直接使用您這六張圖拼合成的「無縫 Flex Message 六宮格」
module.exports.mainMenu = (BASE_URL) => ({
  type: 'flex',
  altText: '請點擊六宮格業務選項',
  contents: {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      paddingAll: '0px', // 滿版
      contents: [
        {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'image',
              url: `${BASE_URL}/public/登記業務諮詢.jpg`,
              size: 'full',
              aspectMode: 'cover',
              aspectRatio: '1:1.3',
              action: { type: 'message', label: '登記業務諮詢', text: '登記業務諮詢' },
              flex: 1
            },
            {
              type: 'image',
              url: `${BASE_URL}/public/測量業務諮詢.jpg`,
              size: 'full',
              aspectMode: 'cover',
              aspectRatio: '1:1.3',
              action: { type: 'message', label: '測量業務諮詢', text: '測量業務諮詢' },
              flex: 1
            },
            {
              type: 'image',
              url: `${BASE_URL}/public/地價業務諮詢.jpg`,
              size: 'full',
              aspectMode: 'cover',
              aspectRatio: '1:1.3',
              action: { type: 'message', label: '地價業務諮詢', text: '地價業務諮詢' },
              flex: 1
            }
          ]
        },
        {
          type: 'box',
          layout: 'horizontal',
          contents: [
            {
              type: 'image',
              url: `${BASE_URL}/public/資訊業務諮詢.jpg`,
              size: 'full',
              aspectMode: 'cover',
              aspectRatio: '1:1.3',
              action: { type: 'message', label: '資訊業務諮詢', text: '資訊業務諮詢' },
              flex: 1
            },
            {
              type: 'image',
              url: `${BASE_URL}/public/地用業務諮詢.jpg`,
              size: 'full',
              aspectMode: 'cover',
              aspectRatio: '1:1.3',
              action: { type: 'message', label: '地用業務諮詢', text: '地用業務諮詢' },
              flex: 1
            },
            {
              type: 'image',
              url: `${BASE_URL}/public/檔案應用其他綜合業務諮詢.jpg`,
              size: 'full',
              aspectMode: 'cover',
              aspectRatio: '1:1.3',
              action: { type: 'message', label: '檔案應用', text: '檔案應用其他綜合業務諮詢' },
              flex: 1
            }
          ]
        }
      ]
    }
  }
});

// A0 - 登記業務諮詢 第一組輪播 (若尚未提供圖片，暫時保留預設按鈕，未來可依樣畫葫蘆改掉)
module.exports.registrationMenu1 = (BASE_URL) => ({
  type: 'flex',
  altText: '登記業務諮詢 (請選擇)',
  contents: {
    type: 'carousel',
    contents: [
      bubbleButton('謄本', '謄本申請', '#1565C0'),
      bubbleButton('登記規費', '登記規費', '#1565C0'),
      bubbleButton('公告', '公告', '#1565C0'),
      bubbleButton('辦理情形', '登記案件辦理情形', '#1565C0'),
      bubbleButton('跨所', '跨所登記', '#1565C0')
    ]
  }
});

// 動態產生子選單的通用 Carousel
module.exports.dynamicCarousel = (items, BASE_URL) => {
  return {
    type: 'flex',
    altText: '請選擇業務項目',
    contents: {
      type: 'carousel',
      contents: items.map(item => {
        // 基本的底層 Bubble 結構
        let bubble = {
          type: 'bubble',
          size: 'micro', // 放縮圖用小卡比較精緻
          body: {
            type: 'box',
            layout: 'vertical',
            paddingAll: 'md',
            contents: [{
              type: 'button',
              action: { type: 'message', label: String(item.label).substring(0,20), text: item.keyword },
              style: 'primary',
              color: '#1565C0'
            }]
          }
        };

        // 如果填了【選單縮圖】，就掛載 Hero Image
        if (item.thumbnail) {
          let url = item.thumbnail;
          if (!url.startsWith('http')) url = `${BASE_URL}/public/${url}`;
            
          bubble.hero = {
            type: 'image',
            url: url,
            size: 'full',
            aspectRatio: '1:1',
            aspectMode: 'cover'
          };
          // 若有圖，我們把按鈕改成 secondary
          bubble.body.contents[0].style = 'secondary';
        }
        return bubble;
      })
    }
  };
};
