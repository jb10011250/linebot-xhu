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

// A0 - 登記業務諮詢 第一組輪播 (舊的靜態範本，若有需要可保留)
module.exports.registrationMenu1 = (BASE_URL) => ({
  type: 'flex',
  altText: '登記業務諮詢 (請選擇)',
  contents: {
    type: 'carousel',
    contents: [
      bubbleButton('謄本', '謄本申請', '#1565C0'),
      bubbleButton('登記規費', '登記規費', '#1565C0')
    ]
  }
});

// 動態產生主選單六宮格 (Grid)
module.exports.dynamicGrid = (items, BASE_URL) => {
  // 檢查夠不夠組合成排版，我們預期是每列3個，所以把 items 分成多列
  const rows = [];
  for (let i = 0; i < items.length; i += 3) {
    const chunk = items.slice(i, i + 3);
    const rowContents = chunk.map(item => {
      let url = item.thumbnail || '';
      if (url && !url.startsWith('http')) url = `${BASE_URL}/public/${url}`;
      
      // 如果沒有縮圖就用純文字按鈕頂替
      if (!url) {
         return {
           type: 'button',
           action: { type: 'message', label: String(item.label).substring(0, 20), text: item.keyword },
           style: 'primary',
           flex: 1
         };
      }
      return {
        type: 'image',
        url: url,
        size: 'full',
        aspectMode: 'cover',
        aspectRatio: '1:1.3',
        action: { type: 'message', label: String(item.label).substring(0, 20), text: item.keyword },
        flex: 1
      };
    });

    rows.push({
      type: 'box',
      layout: 'horizontal',
      contents: rowContents
    });
  }

  return {
    type: 'flex',
    altText: '請點擊六宮格業務選項',
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        paddingAll: '0px',
        contents: rows
      }
    }
  };
};

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
