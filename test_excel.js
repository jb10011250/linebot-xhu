const XLSX = require('xlsx');

try {
  const workbook = XLSX.readFile('LINE_Bot_內容對照表.xlsx');
  console.log("發現的所有工作表(Sheets):", workbook.SheetNames);
  
  // 試著去讀取可能包含資料的工作表 (假設是第二個工作表或名稱像"對照表")
  const dataSheetName = workbook.SheetNames.length > 1 ? workbook.SheetNames[1] : workbook.SheetNames[0];
  console.log("\n>>> 正在讀取工作表:", dataSheetName);
  
  const worksheet = workbook.Sheets[dataSheetName];
  // 抓取包含欄位標題的第一列當作 key    
  const data = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
  
  if (data.length > 0) {
    console.log("=== 發現以下欄位 ===");
    console.log(Object.keys(data[0]));
    console.log("\n=== 第一筆資料範例 ===");
    console.log(data[0]);
    console.log(`\n總共讀取到 ${data.length} 筆資料。`);
  } else {
    console.log("工作表是空的！");
  }
} catch (err) {
  console.error("讀取 Excel 失敗：", err.message);
}
