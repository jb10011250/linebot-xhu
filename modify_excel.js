const ExcelJS = require('exceljs');

async function modifyExcel() {
  try {
    const filePath = 'LINE_Bot_內容對照表.xlsx';
    console.log("正在讀取 Excel...");
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    
    const sheetName = workbook.worksheets.find(ws => ws.name.includes('內容對照表'))?.name || workbook.worksheets[1].name;
    const worksheet = workbook.getWorksheet(sheetName);
    
    // 檢查是否已經加過這欄了
    const row1 = worksheet.getRow(1);
    let columnToInsertAt = 3; // 預期在 C 欄 (在B：功能說明 之後)
    
    let hasThumbnailColumn = false;
    row1.eachCell((cell, colNumber) => {
      if (cell.value && cell.value.toString().includes('選單縮圖')) {
        hasThumbnailColumn = true;
      }
    });

    if (hasThumbnailColumn) {
      console.log("您已經有 '選單縮圖' 欄位，無需再次修改！");
      return;
    }

    console.log(`在工作表 [${sheetName}] 中，於第 C 欄插入 [選單縮圖] 欄位...`);
    
    // 插入新直行
    // 我們想要把原本的 C(3) 變成 D(4)，所以在 index 3 的地方 splice 出一行
    worksheet.spliceColumns(3, 0, [
      { header: '選單縮圖', key: 'thumbnail', width: 20 }
    ]);
    
    // 幫它標註一點底色或說明 (非必須，維持排版乾淨即可)
    worksheet.getCell('C1').value = '選單縮圖';
    worksheet.getCell('C1').font = { bold: true };
    worksheet.getCell('C1').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFFF00' } // 黃色標記
    };

    // 存檔 (覆蓋原檔)
    console.log("正在套用並儲存檔案 (為了安全，儲存為 'LINE_Bot_內容對照表.xlsx')...");
    await workbook.xlsx.writeFile(filePath);
    console.log("✅ 修改成功！快去打開您的 Excel 確認看看吧！");
    
  } catch (error) {
    console.error("❌ 發生錯誤：", error.message);
  }
}

modifyExcel();
