const fs = require('fs');
const XLSX = require('xlsx');

const workbook = XLSX.readFile('LINE_Bot_內容對照表.xlsx');
const sheetName = workbook.SheetNames.find(n => n.includes('內容對照表')) || workbook.SheetNames[1];
const worksheet = workbook.Sheets[sheetName];
const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

fs.writeFileSync('dump.json', JSON.stringify(rows, null, 2), 'utf-8');
