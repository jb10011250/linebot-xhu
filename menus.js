// 機器人自動轉換產生的回應對照表
const carousels = require('./carousels');
require('dotenv').config();
const BASE_URL = process.env.BASE_URL || 'https://linebot-xhu.onrender.com';

module.exports.getReply = function(code) {
  const replies = {
    'NKW': [
      { type: 'text', text: '您好！\n有任何地政相關的問題歡迎輸入以下數字取得更多相關資訊，或撥打本所電話03-5903588，將有人員進一步協助您！\n【 1 】－上班時間\n【 2 】－聯絡電話\n【 3 】－地所住址\n【 4 】－官方網站\n【 5 】－粉絲專頁\n【 6 】－其他問題\n快邀請親朋好友一起加入官方LINE，將會不定時收到最新活動消息唷！' },
      { type: 'text', text: '新湖地政官方帳號提供線上諮詢服務\n點選下方圖示可進行簡易的地政諮詢~\n若您想詢問其他問題，歡迎撥打本所電話03-5903588，將由專人為您解答，謝謝您！' },
      carousels.dynamicGrid([{"code":"A0","label":"登記業務（入口）","keyword":"登記業務諮詢","thumbnail":"登記業務諮詢.png?v=1776835361389"},{"code":"B0","label":"測量業務（入口）","keyword":"測量業務諮詢","thumbnail":"測量業務諮詢.png?v=1776835361389"},{"code":"C0","label":"地價業務（入口）","keyword":"地價業務諮詢","thumbnail":"地價業務諮詢.png?v=1776835361389"},{"code":"D0","label":"資訊業務（入口）","keyword":"資訊業務諮詢","thumbnail":"資訊業務諮詢.png?v=1776835361389"},{"code":"E0","label":"地用業務（入口）","keyword":"地用業務諮詢","thumbnail":"地用業務諮詢.png?v=1776835361389"},{"code":"F0","label":"檔案及其他（入口）","keyword":"檔案應用其他綜合業務諮詢","thumbnail":"檔案應用其他綜合業務諮詢.png?v=1776835361389"}], BASE_URL)
    ],
    // 以下為動態生成的 6 大業務入口
    'A0': [
      { type: 'text', text: '請選擇【登記業務諮詢】項目：' },
      carousels.dynamicCarousel([{"code":"A1","label":"如何申請地籍謄本","keyword":"謄本申請","thumbnail":"登記底圖.png?v=1776835361389"},{"code":"A2","label":"登記費、書狀費如何計算","keyword":"登記規費","thumbnail":"登記底圖.png?v=1776835361389"},{"code":"A3","label":"如何查詢登記案件公告","keyword":"公告","thumbnail":"登記底圖.png?v=1776835361389"},{"code":"A4","label":"如何查詢登記案件辦理情形","keyword":"登記案件辦理情形","thumbnail":"登記底圖.png?v=1776835361389"},{"code":"A5","label":"哪些登記案件可以跨所申請","keyword":"跨所登記","thumbnail":"登記底圖.png?v=1776835361389"},{"code":"A6","label":"地政便民工作站有哪些服務","keyword":"便民工作站","thumbnail":"登記底圖.png?v=1776835361389"},{"code":"A7","label":"如何申請住址變更","keyword":"住址變更","thumbnail":"登記底圖.png?v=1776835361389"},{"code":"A8","label":"如何查詢名下不動產資料","keyword":"歸戶查詢","thumbnail":"登記底圖.png?v=1776835361389"},{"code":"A9","label":"地政相關表單下載","keyword":"書表下載","thumbnail":"登記底圖.png?v=1776835361389"},{"code":"A10","label":"常見登記案件申辦須知","keyword":"案件辦理須知","thumbnail":"登記底圖.png?v=1776835361389"}], BASE_URL),
      carousels.dynamicCarousel([{"code":"A11","label":"如何辦理繼承","keyword":"繼承","thumbnail":"登記底圖.png?v=1776835361389"},{"code":"A12","label":"如何辦理地籍異動即時通","keyword":"地籍異動即時通","thumbnail":"登記底圖.png?v=1776835361389"},{"code":"A13","label":"如何辦理住址隱匿","keyword":"住址隱匿","thumbnail":"登記底圖.png?v=1776835361389"},{"code":"A14","label":"如何線上辦理土地登記","keyword":"數位櫃台","thumbnail":"登記底圖.png?v=1776835361389"},{"code":"A15","label":"如何查詢合法地政士","keyword":"地政士","thumbnail":"登記底圖.png?v=1776835361389"},{"code":"A16","label":"外籍及大陸地區人士專區","keyword":"外國人","thumbnail":"登記底圖.png?v=1776835361389"}], BASE_URL)
    ],
    'B0': [
      { type: 'text', text: '請選擇【測量業務諮詢】項目：' },
      carousels.dynamicCarousel([{"code":"B1","label":"鑑界規費怎麼算","keyword":"鑑界規費試算","thumbnail":"測量底圖.png?v=1776835361389"},{"code":"B2","label":"辦理土地複丈需要購買界標嗎","keyword":"界標","thumbnail":"測量底圖.png?v=1776835361389"},{"code":"B3","label":"法院會同地點在哪／如何繳費","keyword":"法院案件查詢","thumbnail":"測量底圖.png?v=1776835361389"},{"code":"B4","label":"如何查詢測量案件辦理情形","keyword":"測量案件辦理情形","thumbnail":"測量底圖.png?v=1776835361389"},{"code":"B5","label":"地政士如何繪製測量成果圖","keyword":"單機版建物測量繪圖軟體","thumbnail":"測量底圖.png?v=1776835361389"},{"code":"B6","label":"如何簡化申請建物第一次測量","keyword":"簡化建物第一次測量","thumbnail":"測量底圖.png?v=1776835361389"},{"code":"B7","label":"何時需要檢附建物地籍測繪資料","keyword":"建物地籍測繪資料","thumbnail":"測量底圖.png?v=1776835361389"},{"code":"B8","label":"辦理土地複丈如何收費","keyword":"測量規費","thumbnail":"測量底圖.png?v=1776835361389"}], BASE_URL)
    ],
    'C0': [
      { type: 'text', text: '請選擇【地價業務諮詢】項目：' },
      carousels.dynamicCarousel([{"code":"C1","label":"如何查詢公告土地現值","keyword":"公告土地現值","thumbnail":"地價底圖.png?v=1776835361389"},{"code":"C2","label":"如何試算土地增值稅","keyword":"增值稅試算","thumbnail":"地價底圖.png?v=1776835361389"},{"code":"C3","label":"更多實價登錄相關資訊","keyword":"實價登錄","thumbnail":"地價底圖.png?v=1776835361389"},{"code":"C4","label":"如何申報買賣實價登錄","keyword":"買賣實價登錄","thumbnail":"地價底圖.png?v=1776835361389"},{"code":"C5","label":"如何申報租賃及預售屋實價登錄","keyword":"預售屋實價登錄","thumbnail":"地價底圖.png?v=1776835361389"},{"code":"C6","label":"如何查詢實價登錄資訊","keyword":"實價登錄查詢網站","thumbnail":"地價底圖.png?v=1776835361389"},{"code":"C7","label":"實價登錄的申報期限","keyword":"申報期限","thumbnail":"地價底圖.png?v=1776835361389"},{"code":"C8","label":"哪些情形需要申報實價登錄","keyword":"實價登錄申報種類","thumbnail":"地價底圖.png?v=1776835361389"}], BASE_URL)
    ],
    'D0': [
      { type: 'text', text: '請選擇【資訊業務諮詢】項目：' },
      carousels.dynamicCarousel([{"code":"D1","label":"地籍謄本櫃員機有哪些服務","keyword":"地籍謄本櫃員機","thumbnail":""},{"code":"D2","label":"如何申請土地基本資料","keyword":"土地基本資料申請","thumbnail":""},{"code":"D3","label":"土地基本資料如何收費","keyword":"土地基本資料收費","thumbnail":""}], BASE_URL)
    ],
    'E0': [
      { type: 'text', text: '請選擇【地用業務諮詢】項目：' },
      carousels.dynamicCarousel([{"code":"E1","label":"辦理更正編定須準備什麼","keyword":"更正編定","thumbnail":"地用底圖.png?v=1776835361389"},{"code":"E2","label":"辦理變更編定須準備什麼","keyword":"變更編定","thumbnail":"地用底圖.png?v=1776835361389"},{"code":"E3","label":"如何查詢土地參考資訊檔","keyword":"土地參考資訊檔","thumbnail":"地用底圖.png?v=1776835361389"},{"code":"E4","label":"如何查詢國土計畫法相關資料","keyword":"國土計劃","thumbnail":"地用底圖.png?v=1776835361389"},{"code":"E5","label":"農地違規使用有什麼罰則","keyword":"違規使用","thumbnail":"地用底圖.png?v=1776835361389"},{"code":"E6","label":"如何查詢土地容許使用項目","keyword":"容許使用","thumbnail":"地用底圖.png?v=1776835361389"},{"code":"E7","label":"更多土地使用相關資訊","keyword":"地用","thumbnail":"地用底圖.png?v=1776835361389"}], BASE_URL)
    ],
    'F0': [
      { type: 'text', text: '請選擇【檔案及綜合業務】項目：' },
      carousels.dynamicCarousel([{"code":"F1","label":"申請檔案應用需要準備什麼","keyword":"檔案應用","thumbnail":"檔案應用底圖.png?v=1776835361389"},{"code":"F2","label":"申請擔任志工需要準備什麼","keyword":"志工招募","thumbnail":"檔案應用底圖.png?v=1776835361389"},{"code":"F3","label":"申請寒暑假青年志工需要準備什麼","keyword":"青年志工","thumbnail":"檔案應用底圖.png?v=1776835361389"}], BASE_URL)
    ],

    // --- Excel 動態擷取的子業務資料 ---
    'RM-1': [
      { type: 'text', text: `【連結】新湖地政所官方網站` }
    ],
    'RM-2': [
      { type: 'text', text: `【連結】案件查詢系統` }
    ],
    'RM-3': [
      { type: 'text', text: `【連結】線上取號系統` }
    ],
    'RM-4': [
      { type: 'text', text: `【連結】Facebook粉絲專頁` }
    ],
    'RM-5': [
      { type: 'text', text: `【連結】預約服務系統` }
    ],
    'RM-6': [
      { type: 'text', text: `分享此官方LINE給好友` }
    ],
    'NUM-1': [
      { type: 'text', text: `阿吸，您好！
這是我們的上班服務時間：
週一至週五
上午 08:00~12:00、下午 13:00~17:00
※午間時段提供收發案件、簡易案件與各類謄本申請服務` }
    ],
    'NUM-2': [
      { type: 'text', text: `阿吸， 您好！
這是我們的聯絡方式，有任何地政相關的問題歡迎詢問喔！
📞聯絡電話：(03) 491-7647 #153【總機專線】
💌電子郵件： use01.b@mail.tyland.gov.tw
🔍更多資訊：https://www.zhongli-land.tycg.gov.tw/cp.aspx?n=5584` }
    ],
    'NUM-3': [
      { type: 'text', text: `阿吸，您好！
這是我們的所在地理位置！
📌地址：桃園市中壢區松勇二街59號
🗺交通資訊：https://www.zhongli-land.tycg.gov.tw/cp.aspx?n=5585
🌏Google地圖：https://goo.gl/maps/ZGBdkhxqQpkYVv7v5` }
    ],
    'NUM-4': [
      { type: 'text', text: `阿吸，您好！
這是我們的官方網站！
🌏網址：https://www.zhongli-land.tycg.gov.tw/
更多更完整的地政消息盡在官方網站！` }
    ],
    'NUM-5': [
      { type: 'text', text: `阿吸，您好！
這是我們的Facebook臉書粉絲專頁！
🌏網址：https://www.facebook.com/Zhongliland/
歡迎您加入按讚追蹤！以即時得知最新的活動資訊喔！` }
    ],
    'NUM-6': [
      { type: 'text', text: `阿吸，您好！
如您想詢問地政相關問題，歡迎至我們的Facebook臉書粉絲專頁留言，或撥打本所電話03-4917647，將由專人為您解答，謝謝您！(two hearts)
🌏臉書：https://www.facebook.com/Zhongliland/` }
    ],
    'A1': [
      { type: 'text', text: `阿吸，您好！
■　土地登記簿謄本分類、申請人資格及申請方式資訊如下：
https://land.tycg.gov.tw/News_Content.aspx?n=4104&s=1467853

■　申請地籍資料謄本費用查詢連結點如下：
https://land.tycg.gov.tw/News_Content.aspx?n=4104&s=1467909

■　網路申請電子謄本連結點如下：
https://land.tycg.gov.tw/News_Content.aspx?n=4103&s=553588

如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/謄本申請.jpg?v=1776835361389`, previewImageUrl: `${BASE_URL}/public/謄本申請.jpg?v=1776835361389` }
    ],
    'A2': [
      { type: 'text', text: `阿吸，您好！
■　地政規費之收費標準連結點如下：
https://land.tycg.gov.tw/cp.aspx?n=4117

■　線上試算連結點：
https://www.land.tycg.gov.tw/chaspx/Smenulist.aspx/7

如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` }
    ],
    'A3': [
      { type: 'text', text: `阿吸，您好！
■　公告案件查詢連結點如下：
https://www.land.tycg.gov.tw/chaspx/SQry6.aspx/10

如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` }
    ],
    'A4': [
      { type: 'text', text: `阿吸，您好！
■　案件辦理情形查詢連結點如下：
https://www.land.tycg.gov.tw/chaspx/SQry3.aspx/22

如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` }
    ],
    'A5': [
      { type: 'text', text: `阿吸，您好！
■　跨所受理登記服務項目資訊如下：
https://land.tycg.gov.tw/News_Content.aspx?n=4104&s=1467876

如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/跨所登記.jpg?v=1776835361389`, previewImageUrl: `${BASE_URL}/public/跨所登記.jpg?v=1776835361389` }
    ],
    'A6': [
      { type: 'text', text: `阿吸，您好！
■　本所地政便民工作站服務項目資訊如下：
https://www.zhongli-land.tycg.gov.tw/cp.aspx?n=5512

■六和地政便民工作站
https://maps.app.goo.gl/VfHx9U6nhJbjJ6Hy8
■觀音地政便民工作站
https://maps.app.goo.gl/tuD5dYCFPbrEjs9c9
■自強地政便民工作站
https://maps.app.goo.gl/7bSR8AmJqfMRpubF6


如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/便民工作站.jpg?v=1776835361389`, previewImageUrl: `${BASE_URL}/public/便民工作站.jpg?v=1776835361389` }
    ],
    'A7': [
      { type: 'text', text: `阿吸，您好！
■　住址變更方式資訊如下:
https://land.tycg.gov.tw/News_Content.aspx?n=3946&s=688343

如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` }
    ],
    'A8': [
      { type: 'text', text: `阿吸，您好！
如您想得知名下的不動產有多少，可以到各地政事務所申請地籍總歸戶，或到國稅局或稅捐機關申請全國財產總歸戶資料！

如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` }
    ],
    'A9': [
      { type: 'text', text: `阿吸感謝您使用本所「LINE+ibon卡厲害」多元化領取地政表單服務(two hearts)
輸入下列數字~獲得更多表單資訊：
【901】登記申請書
【902】登記清冊
【903】買賣登記
【904】贈與登記
【905】一般繼承登記
【906】分割繼承登記
【907】預告登記
【908】書狀補給登記
【909】抵押權設定
【910】地籍異動即時通
【911】住址隱匿
【912】檔案應用
【913】更正編定
【914】土地基本資料庫電子資料流通

(magnifying glass)如查詢不到您想要的資料，可撥打本所電話 03-4917647，將有人員進一步協助您~` }
    ],
    'A10': [
      { type: 'text', text: `阿吸，您好！
■　常見登記案件申辦須知連結點如下：
https://land.tycg.gov.tw/News.aspx?n=3946&sms=10047
如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` }
    ],
    'A11': [
      { type: 'text', text: `阿吸，您好！
■　繼承登記申辦須知及申請書範例連結點如下：
https://land.tycg.gov.tw/News_Content.aspx?n=3946&s=688348` },
      { type: 'text', text: `阿吸您好~ 本所LINE+ibon卡厲害~ 為您搜尋到的文件如下：  
【一般繼承登記-空白表單】
■ 列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUSBLM9IVLPG
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/7C52A6CD72D445FC8C3B5006721D00F06

【一般繼承登記-範例】
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/A24DBF7C50704DE393B54529609185D26

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/QR一般繼承空白表單申請書,登記清冊,繼承系統表,權狀切結書.jpg?v=1776835361389`, previewImageUrl: `${BASE_URL}/public/QR一般繼承空白表單申請書,登記清冊,繼承系統表,權狀切結書.jpg?v=1776835361389` }
    ],
    'A12': [
      { type: 'text', text: `阿吸您好~ 
「地籍異動即時通」登記名義人申請後，只要名下已登記的不動產被移轉、設定抵押或書狀補給時，於辦理「收件」、「異動完成」時，系統分別自動通知義務人或權利人，民眾就能即時掌握不動產權利異動的資訊。
詳情請點選以下連結：
https://land.tycg.gov.tw/cp.aspx?n=3975

 【地籍異動即時通申請書】
■ 列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUSK7IBHM59G
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/3F903D2B4724453CAA11CC0613E3983D6
■ 地籍異動即時通申請須知:
https://land.tycg.gov.tw/cp.aspx?n=3975
如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/QR地籍異動即時通申請書.jpg?v=1776835361389`, previewImageUrl: `${BASE_URL}/public/QR地籍異動即時通申請書.jpg?v=1776835361389` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/地籍異動即時通文宣.jpg?v=1776835361389`, previewImageUrl: `${BASE_URL}/public/地籍異動即時通文宣.jpg?v=1776835361389` }
    ],
    'A13': [
      { type: 'text', text: `阿吸您好~
登記名義人申請「住址隱匿」後，任何人申請第二類謄本時，將隱匿登記名義人的部分住址，僅顯示至段(路、街、道)，或前6個中文字，其後資料均隱匿(例如:桃園市桃園區三民路一段***)。
詳情請點選以下連結：
https://land.tycg.gov.tw/cp.aspx?n=4010

 【住址隱匿申請書】
■ 列印代碼如下：
（提醒您，在ibon機台輸入此列印代碼或掃描下方圖片QRcode，就可進行列印~）
       ASUS7SG4UIKXG
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/74FDF4AB29D64E07B8BBE42A3F4E75B26

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/QR住址隱匿即時通申請書.jpg?v=1776835361389`, previewImageUrl: `${BASE_URL}/public/QR住址隱匿即時通申請書.jpg?v=1776835361389` }
    ],
    'A14': [
      { type: 'text', text: `阿吸，您好！
數位櫃臺提供「網路申辦案件」、「線上支付規費」、「線上聲明登錄」、「地籍異動即時通」、「申請(解除)住址隱匿」、「MyData 查驗」、「地政案件辦理情形查詢」、「人工登記簿謄本(第二類)」與「臨櫃申請書產製」、「指定送達處所」、「地政繳費資料(非網路申請)」與「地籍圖重測異議複丈」等服務。

(open book)數位櫃臺連結點如下：
https://dcland.moi.gov.tw/

如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/數位櫃台登記申請線上辦jpg?v=1776835361389`, previewImageUrl: `${BASE_URL}/public/數位櫃台登記申請線上辦jpg?v=1776835361389` }
    ],
    'A15': [
      { type: 'text', text: `阿吸，您好！
■　合法地政士連結點如下：
https://resim.moi.gov.tw/Home/AgentIndex

貼心提醒:委託合法地政士，確保不動產交易安全，保障民眾自身之財產權益！

如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/地政士.jpg?v=1776835361389`, previewImageUrl: `${BASE_URL}/public/地政士.jpg?v=1776835361389` }
    ],
    'A16': [
      { type: 'text', text: `阿吸，您好！
■　外籍及大陸地區人士專區
連結點如下：
https://land.tycg.gov.tw/cp.aspx?n=3957
如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` }
    ],
    'REG-901': [
      { type: 'text', text: `阿吸您好~ 本所LINE+ibon卡厲害~ 為您搜尋到的文件如下： 
【登記申請書-空白表單】 
■ 列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUSQGFSJSHJ7

■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/E0E1AB97CBDF40E2BEA6ABFA434CA8236

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` }
    ],
    'REG-902': [
      { type: 'text', text: `阿吸您好~本所LINE+ibon卡厲害~ 為您搜尋到的文件如下：
 【登記清冊-空白表單】 
■ 列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUSSYJLIJGBK

■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/81AF52F1CF3846928F7C22394AF0F97E6

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` }
    ],
    'REG-903': [
      { type: 'text', text: `阿吸您好~ 本所LINE+ibon卡厲害~ 為您搜尋到的文件如下： 
【買賣登記-空白表單】
■ 列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUS9BSK4NJ5Q
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/BA22824CD31649FDB083A30422ADB2266

【買賣登記-範例】
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/F4EDDC949BDE4B5991F09350DEC5EAC86

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` }
    ],
    'REG-904': [
      { type: 'text', text: `阿吸您好~本所LINE+ibon卡厲害~ 為您搜尋到的文件如下： 
【贈與登記-空白表單】
■ 列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUSLKF4HBBNK
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/399A3ABC948F4936939C18E8A74B3B7C6

【贈與登記-範例】
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/153441EDDC4D4C06BA873D0F6521F0016

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` }
    ],
    'REG-905': [
      { type: 'text', text: `阿吸，您好！
■　繼承登記申辦須知及申請書範例連結點如下：
https://land.tycg.gov.tw/News_Content.aspx?n=3946&s=688348` },
      { type: 'text', text: `阿吸您好~ 本所LINE+ibon卡厲害~ 為您搜尋到的文件如下：  
【一般繼承登記-空白表單】
■ 列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUSBLM9IVLPG
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/7C52A6CD72D445FC8C3B5006721D00F06

【一般繼承登記-範例】
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/A24DBF7C50704DE393B54529609185D26

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` }
    ],
    'REG-906': [
      { type: 'text', text: `阿吸您好~ 本所LINE+ibon卡厲害~ 為您搜尋到的文件如下： 
【分割繼承登記-空白表單】
■  列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUS9MNWKKLWI
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/F98149AA36DF45B99965E4E9087913AF6

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` }
    ],
    'REG-907': [
      { type: 'text', text: `阿吸您好~ 本所LINE+ibon卡厲害~ 為您搜尋到的文件如下： 
【預告登記-空白表單】
■ 列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUSKYNLBVIBH
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/83B9F416895342878ABC598FE1F1B6326

【預告登記-範例】
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/B03E669A79564F698F5975CD1B8202416

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` }
    ],
    'REG-908': [
      { type: 'text', text: `阿吸您好~ 本所LINE+ibon卡厲害~ 為您搜尋到的文件如下： 
【書狀補給登記-空白表單】
■ 列印代碼如下：
（提醒您，至ibon機台輸入以下列印或掃描下方圖片QRcode，代碼即可列印文件）
        ASUS6NHH7YJWG
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/2EC428B5B0F54E9A93B169DC6BC923556

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` }
    ],
    'REG-909': [
      { type: 'text', text: `阿吸您好~ 本所LINE+ibon卡厲害~ 為您搜尋到的文件如下：  
【抵押權設定-空白表單】
■ 列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUS5BNUNWFSL
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/241F160EA30C4EABAFAF7E497A46E9206

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` }
    ],
    'REG-910': [
      { type: 'text', text: `阿吸您好~ 
「地籍異動即時通」登記名義人申請後，只要名下已登記的不動產被移轉、設定抵押或書狀補給時，於辦理「收件」、「異動完成」時，系統分別自動通知義務人或權利人，民眾就能即時掌握不動產權利異動的資訊。
詳情請點選以下連結：
https://land.tycg.gov.tw/cp.aspx?n=3975

 【地籍異動即時通申請書】
■ 列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUSK7IBHM59G
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/3F903D2B4724453CAA11CC0613E3983D6
■ 地籍異動即時通申請須知:
https://land.tycg.gov.tw/cp.aspx?n=3975
如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/QR地籍異動即時通申請書.jpg?v=1776835361389`, previewImageUrl: `${BASE_URL}/public/QR地籍異動即時通申請書.jpg?v=1776835361389` }
    ],
    'REG-911': [
      { type: 'text', text: `阿吸您好~
登記名義人申請「住址隱匿」後，任何人申請第二類謄本時，將隱匿登記名義人的部分住址，僅顯示至段(路、街、道)，或前6個中文字，其後資料均隱匿(例如:桃園市桃園區三民路一段***)。
詳情請點選以下連結：
https://land.tycg.gov.tw/cp.aspx?n=4010

 【住址隱匿申請書】
■ 列印代碼如下：
（提醒您，在ibon機台輸入此列印代碼或掃描下方圖片QRcode，就可進行列印~）
       ASUS7SG4UIKXG
■ 電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/74FDF4AB29D64E07B8BBE42A3F4E75B26

如查詢不到您想要的資料，可洽本所 03-4917647 協助您~` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/QR住址隱匿即時通申請書.jpg?v=1776835361389`, previewImageUrl: `${BASE_URL}/public/QR住址隱匿即時通申請書.jpg?v=1776835361389` }
    ],
    'REG-912': [
      { type: 'text', text: `阿吸，您好！
有關檔案應用申請相關說明，可參閱本所官網檔案應用專區Q&A資訊，連結如下：
https://www.zhongli-land.tycg.gov.tw/archive_QA.htm` },
      { type: 'text', text: `本所LINE+ibon卡厲害~ 為您搜尋到的文件如下： 
【檔案應用申請書】
■　列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
      ASUSXSVFN5A4N
■　電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/9578C16467DC4329B9BF12B95B74768F6
■　列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
      ASUS6X67GPX7F
■　電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/981FD14C2794402F904EA435F6D007DC6

如查詢不到您想要的資料，可洽本所 03-4917647 分機413燕先生協助您~` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/QR檔案應用申請書.jpg?v=1776835361389`, previewImageUrl: `${BASE_URL}/public/QR檔案應用申請書.jpg?v=1776835361389` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/QR檔案應用代理人委任書?v=1776835361389`, previewImageUrl: `${BASE_URL}/public/QR檔案應用代理人委任書?v=1776835361389` }
    ],
    'REG-913': [
      { type: 'text', text: `阿吸，您好！
辦理更正編定，可向土地所在地政事務所申請，除門牌編釘證明(佐證資料)及航照圖(佐證資料)外，請檢具檢具以下其一文件：
曾於該建物設籍之戶籍謄本、繳納房屋稅籍證明、用電證明或繳納自來水費用證明、建物完工證明書或其他證明文件。` },
      { type: 'text', text: `本所LINE+ibon卡厲害服務~ 為您搜尋到的文件如下： 
【更正編定申請書】
■ 　列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
        ASUSJ5VXFSVGH
■ 　電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/94EEE13CF36646168905E84DC1E90F1B6

【更正編定申請書填寫範例】
■ 　電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/C0E5EAEA43574243AFAA2994D367E0656

如您尚有其他問題，可撥打本所電話03-4917647分機414或419，將有專人進一步協助您，謝謝您！` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/QR更正編定申請書.jpg?v=1776835361389`, previewImageUrl: `${BASE_URL}/public/QR更正編定申請書.jpg?v=1776835361389` }
    ],
    'REG-914': [
      { type: 'text', text: `阿吸您好~ 本所LINE+ibon卡厲害~ 為您搜尋到的文件如下： 
【土地基本資料電子資料流通申請書】 
■ 　列印代碼如下：
（提醒您，至ibon機台輸入以下列印代碼或掃描下方圖片QRcode，即可列印文件）
       ASUSUH4IYSKAV
■ 　電子檔下載點：
https://www.asuswebstorage.com/navigate/a/#/s/B246250DBB9F4FC7BDBBEDB79C3381196

如查詢不到您想要的資料，可洽本所 03-4917647 分機503呂先生協助您~` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/QR土地基本資料庫電子資料申請表.jpg?v=1776835361389`, previewImageUrl: `${BASE_URL}/public/QR土地基本資料庫電子資料申請表.jpg?v=1776835361389` }
    ],
    'B1': [
      { type: 'text', text: `阿吸，您好！

■有關鑑界規費試算，您可於「土地複丈規費(鑑界、分割)服務網」查詢鑑界應繳規費(magnifying glass)：https://easymap.land.moi.gov.tw/BSWeb
相關操作方式可至本所官網查詢(typing)：
https://www.zhongli-land.tycg.gov.tw/News_Content.aspx?n=14066&s=1090601
或循下列操作步驟辦理：
(one)輸入土地基本資訊（縣市、行政區、地段及地號）。
(two)選擇欲鑑定之界址點，並按下「重新計算」顯示規費最新計算過程及試算結果。
(three)視需要可下載列印PDF檔，並附於申請書內，以利計收規費，減少規費退補費程序。

(Cony hug)有關其他測量規費計費方法請輸入關鍵字「測量費」以獲取更多資訊!!` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/複丈試算網站介紹.jpg?v=1776835361389`, previewImageUrl: `${BASE_URL}/public/複丈試算網站介紹.jpg?v=1776835361389` }
    ],
    'B2': [
      { type: 'text', text: `阿吸，您好！
112年 5月 1日以後申辦土地複丈案件，將由地政事務所提供制式界標予申請人使用，申請人「不用」再自行準備制式界標；但應注意地政事務所僅提供界標予申請人使用，還是要由申請人自行埋設並妥為維護管理，因此現場記得幫我們準備鐵鎚或方便埋設界標的工具，以利複丈作業進行。` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/免自備制式界標文宣.jpg?v=1776835361389`, previewImageUrl: `${BASE_URL}/public/免自備制式界標文宣.jpg?v=1776835361389` }
    ],
    'B3': [
      { type: 'text', text: `阿吸，您好！

(wow)有關本所辦理法院囑託案件會合地點及應（預）繳規費，可直接點選以下網址後，選擇「地政事務所」及「囑託文號」查詢(magnifying glass)：
https://www.land.tycg.gov.tw/CourtCase/default.aspx` },
      { type: 'text', text: `繳費可選擇以下兩種方式：

(one)匯款繳費
(thumbtack)匯款帳戶明細
◇戶名:桃園市中壢地政事務所代收各項費用專戶
◇銀行代碼:812
◇帳號：2012-39-0000438-6
◇代收金融機構名稱：台新國際商業銀行中壢分行
(thumbtack)法院囑託測量案件請加註[執行日期]及[公文文號]。
(thumbtack)請於匯款完畢後，傳真流水單至本所（FAX:(03)4024137），並與（03）4917647分機244張小姐確認，謝謝您的配合。

(two)數位櫃台繳費
(thumbtack)自113年7月1日起，數位櫃台增加「非網路申請案建線上繳費功能」，提供地政規費線上繳納機制，可選擇以「晶片金融卡」、「活期性存款帳戶（限本人）」或「信用卡」等方式進行線上繳費，無需赴登記機關或金融機構臨櫃繳費，請多加利用。
(thumbtack)詳情了解:
(1)數位櫃台網址: https://dcland.moi.gov.tw/
(2)請申請人（或代理人）先向本所承辦員（03-4917647分機236葉先生）表明欲線上繳納地政規費，以利本所建檔及通知繳費事宜。` }
    ],
    'B4': [
      { type: 'text', text: `阿吸，您好！
■　案件辦理情形查詢連結點如下：
https://www.land.tycg.gov.tw/chaspx/SQry3.aspx/22

如您尚有其他問題，可撥打本所電話03-4917647，將有專人進一步協助您，謝謝您！` }
    ],
    'B5': [
      { type: 'text', text: `阿吸，您好！

為推廣數值法簡化建物第一次測量作業，內政部釋出免費單機版軟體(sparkles)（SBpublic）(sparkles)提供各界完整繪製成果圖功能。依《地籍測量實施規則》第282條之2、282條之3條規定辦理建物第一次測量，請利用該軟體系統繪製建物成果圖或標示圖。

(Brown hug)SBPublic軟體下載請搜尋「簡化建物第一次測量」，或點選以下網址下載：
https://easymap.land.moi.gov.tw/K01/

(Cony hug)提醒於繪製完成後記得匯出中央政府鎖定共通格式電子檔（*zjb)，連同案件送交地政事務所辦理，可省下每建號600元之數值化作業喔!!` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/共通式電子檔建物向量圖.jpg?v=1776835361389`, previewImageUrl: `${BASE_URL}/public/共通式電子檔建物向量圖.jpg?v=1776835361389` }
    ],
    'B6': [
      { type: 'text', text: `阿吸，您好！

(musical note)您知道嗎(eyes)申請建物第一次測量及登記除檢附應繳資料交由地所人員據以繪製建物測量成果圖外，民眾還可利用免費提供之建物測量繪圖軟體自行繪製建物平面圖及建物位置圖(notepad)，連同共通格式電子檔(*.ZJB)(floppy disk)一併繳交予地所，以利後續申辦建物第一次測量登記時，得優先及加速辦理(hourglass full)，達成簡政便民目標(thumbs up)。

(sparkle)簡化建物第一次測量便民服務實施標的及法源依據：
◎實施標的：自102年10月1日以後領有使用執照之建物。

◎法源依據：
(one)地籍測量實施規則第282條之2
建物測量成果圖採地政士及專業人士轉繪簽章者，得免由地政機關轉繪，得於地政機關審查並發給檢附之「建物測量成果圖」後，據以辦理建物第一次登記。
(two)地籍測量實施規則第282條之3
建物標示圖採建築師或測量技師繪製簽證者，免先申請建物所有權第一次測量，得檢附建築師或測量技師得依使用執照竣工平面圖繪製及簽證之建物標示圖後，由登記機關辦理登記。

(sparkle)為推廣數值法簡化建物第一次測量作業，內政部釋出免費單機版軟體（SBpublic）提供各界完整繪製成果圖功能，詳情可輸入關鍵字「單機版建物測量繪圖軟體」了解唷！` }
    ],
    'B7': [
      { type: 'text', text: `阿吸，您好！

(Q):建物地籍測繪資料檢附時機?：
(A):「建物位置圖」以轉繪使用執照竣工平面圖方式辦理者需檢附檢附建物地籍測繪資料。

(Q):為什麼要檢附建物地籍測繪資料：
(A):有鑑於使用執照竣工圖上所載地籍配置資訊是否為實地測量結果不無疑義，為保障民眾權益、避免繪製建物位置與實地不符等，112年5月1日起建物位置轉繪作業應參依實地測繪，並由建築師、測量技師或其他得為測量相關簽證之專門職業及技術人員簽證之建物位置與土地界址、圖根點或鄰近基本控制點、辦理測繪業務所設控制點等其他測量標之距離或邊角資料辦理。

(typing)有關建物地籍測繪資料應涵蓋內容應包含「測繪基本資訊」、「測點圖例圖說」、「距離角度數據」、「簽證印鑑或執業圖記」等4項元素，詳情可洽本所官網了解(magnifying glass)：
https://www.zhongli-land.tycg.gov.tw/News_Content.aspx?n=14066&s=1090602` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/建物地籍測繪資料.jpg?v=1776835361389`, previewImageUrl: `${BASE_URL}/public/建物地籍測繪資料.jpg?v=1776835361389` }
    ],
    'B8': [
      { type: 'text', text: `阿吸，您好！
自112年5月1日起「土地複丈費及建築改良物測量費收費標準」新制正式上線，規費調整請參照以下資訊：
1. 土地複丈費之收費基準表
https://www.land.moi.gov.tw/lawfile/files/20230116151153-u1.pdf
2. 建物第一次測量費之收費基準表
https://www.land.moi.gov.tw/lawfile/files/20230116151455-u1.pdf
3. 建物複丈之收費基準表
https://www.land.moi.gov.tw/lawfile/files/20230116151536-u1.pdf

如您尚有其他問題，可撥打本所電話03-4917647分機245、202，將有專人進一步協助您，謝謝您！` },
      { type: 'image', originalContentUrl: `${BASE_URL}/public/測量收費標準.jpg?v=1776835361389`, previewImageUrl: `${BASE_URL}/public/測量收費標準.jpg?v=1776835361389` }
    ],
    'C3': [
      { type: 'text', text: `請輸入代號取得更多資訊：
【301】申報種類
【302】買賣申報...` }
    ],
    'E7': [
      { type: 'text', text: `請輸入代號取得更多地用資訊：
【11】分辨非都市土地和都市土地
【12】非都市土地種類...` }
    ]
  };

  return replies[code] || [{ type: 'text', text: '很抱歉，尚未建立此關鍵字的自動回應內容。' }];
};
