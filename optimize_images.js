
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const targetFiles = [
    "地價業務諮詢.png",
    "地用業務諮詢.png",
    "檔案應用其他綜合業務諮詢.png",
    "測量業務諮詢.png",
    "登記業務諮詢.png",
    "資訊業務諮詢.png",
    "檔案應用底圖.png"
];

console.log("🚀 開始影像瘦身計畫...");

targetFiles.forEach((fileName, index) => {
    const srcPath = path.join(publicDir, fileName);
    if (!fs.existsSync(srcPath)) {
        console.warn(`⚠️ 找不到檔案: ${fileName}`);
        return;
    }

    const tempPng = path.join(publicDir, `temp_${index}.png`);
    const tempJpg = path.join(publicDir, `temp_${index}.jpg`);
    const finalJpg = path.join(publicDir, fileName.replace('.png', '.jpg'));

    try {
        // 1. 先複製成英文檔名繞過編碼問題
        fs.copyFileSync(srcPath, tempPng);
        
        // 2. 呼叫 PowerShell 進行縮放與轉換
        const psCommand = `powershell -Command "Add-Type -AssemblyName System.Drawing; $img = [System.Drawing.Image]::FromFile('${tempPng}'); $newWidth = 1024; $newHeight = [int]($img.Height * ($newWidth / $img.Width)); $bmp = new-object System.Drawing.Bitmap($newWidth, $newHeight); $g = [System.Drawing.Graphics]::FromImage($bmp); $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic; $g.DrawImage($img, 0, 0, $newWidth, $newHeight); $bmp.Save('${tempJpg}', [System.Drawing.Imaging.ImageFormat]::Jpeg); $g.Dispose(); $bmp.Dispose(); $img.Dispose();"`;
        
        execSync(psCommand);

        // 3. 改回正確名稱
        if (fs.existsSync(tempJpg)) {
            fs.renameSync(tempJpg, finalJpg);
            const stats = fs.statSync(finalJpg);
            console.log(`✅ ${fileName} -> ${path.basename(finalJpg)} ({0} KB)`.replace('{0}', (stats.size / 1024).toFixed(2)));
        }

    } catch (err) {
        console.error(`❌ 處理 ${fileName} 時出錯:`, err.message);
    } finally {
        // 4. 清理臨時檔
        if (fs.existsSync(tempPng)) fs.unlinkSync(tempPng);
        if (fs.existsSync(tempJpg)) fs.unlinkSync(tempJpg);
    }
});

console.log("\n✨ 所有影像優化完成！");
console.log("👉 請將 Excel 內對應的副檔名從 .png 修改為 .jpg，然後重新執行上傳。");
