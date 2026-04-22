
# 指定圖片資料夾 (直接使用絕對路徑)
$publicDir = "x:\LINEBOT_XHU\public"
$targetFiles = @(
    "地價業務諮詢.png",
    "地用業務諮詢.png",
    "檔案應用其他綜合業務諮詢.png",
    "測量業務諮詢.png",
    "登記業務諮詢.png",
    "資訊業務諮詢.png",
    "檔案應用底圖.png"
)

# 載入 .NET 影像處理庫
Add-Type -AssemblyName System.Drawing

foreach ($fileName in $targetFiles) {
    $filePath = "$publicDir\$fileName"
    if (Test-Path $filePath) {
        Write-Host "正在處理: $fileName ..."
        
        try {
            # 讀取原始圖
            $img = [System.Drawing.Image]::FromFile($filePath)
            
            # 設定目標尺寸 (寬度 1024，高度按比例縮放)
            $newWidth = 1024
            $newHeight = [int]($img.Height * ($newWidth / $img.Width))
            
            # 建立新的縮圖畫布
            $bmp = new-object System.Drawing.Bitmap($newWidth, $newHeight)
            $g = [System.Drawing.Graphics]::FromImage($bmp)
            
            # 設定高品質縮放參數
            $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
            $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
            $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
            
            # 繪製縮圖
            $g.DrawImage($img, 0, 0, $newWidth, $newHeight)
            
            # 準備存成 JPG (副檔名更換)
            $newFileName = $fileName.Replace(".png", ".jpg")
            $newFilePath = "$publicDir\$newFileName"
            
            # 儲存 (使用系統 JPEG 引訊)
            $bmp.Save($newFilePath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
            
            # 釋放資源
            $g.Dispose()
            $bmp.Dispose()
            $img.Dispose()
            
            $size = (Get-Item $newFilePath).Length / 1KB
            Write-Host "✅ 完成！新檔案: $newFileName (大小: {0:N2} KB)" -ForegroundColor Green -Args $size
        } catch {
            Write-Host "❌ 處理 $fileName 時出錯: $($_.Exception.Message)" -ForegroundColor Red
        }
    } else {
        Write-Host "⚠️ 找不到檔案: $fileName" -ForegroundColor Yellow
    }
}
