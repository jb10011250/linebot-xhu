# 地政 AI 助理：純雲端 (Serverless) 搬家計畫書

本計畫書探討如何將現有的 LINE Bot 遷移到 Vercel 或 Cloudflare，實現「Git ➔ 雲端 ➔ Webhook」的零延遲架構。

## 🎯 為什麼要搬家？
*   **零等待**：Vercel/Cloudflare 部署速度極快，推上去幾秒鐘就上線。
*   **不休眠**：這類「無伺服器 (Serverless)」架構沒有冷啟動休眠問題（或是冷啟動極快），民眾發訊息不需等待 Render 甦醒。
*   **免主機**：不需要任何本地電腦開機。

## 🏗️ 推薦方案：Vercel (最推薦)
Vercel 支援完整的 Node.js 環境，是搬遷成本最低的選擇。

### 1. 調整架構
*   目前我們使用 Express 長時間監聽。在 Vercel 上，我們會把它改成「API Route」模式。
*   將 `index.js` 修改為 Vercel 支援的 `handler` 格式。

### 2. 知識庫處理 (關鍵！)
*   Vercel 與 Cloudflare 沒有傳統硬碟。
*   **對策**：在 `build` 階段，執行一個預處理腳本，將 `knowledge/*.docx` 內容全部提取並轉成一個大的 `knowledge.json` 檔案。
*   程式碼直接 `import` 這個 JSON 檔案，就不需要讀取檔案系統了。

## 🏗️ 方案二：Cloudflare Pages/Workers (效能最高)
這是真正的純雲端架構，但改寫成本較高。

### 1. 修改 SDK
*   Cloudflare 的執行環境不是標準 Node.js，需確認 `@google/generative-ai` 的相容性（最新版本通常已支援）。
*   LINE 的 SDK 可能需要更換為更輕量、支援 Fetch API 的版本。

## 🚀 測試建議流程
如果您想另開專案測試：
1.  **建立 Vercel 帳號** 並關聯您的 GitHub。
2.  **建立專案**，並在 Vercel 儀表板設定 `CHANNEL_ACCESS_TOKEN` 等環境變數。
3.  **上傳程式碼**：觀察 Vercel 的部署日誌。
4.  **切換 Webhook**：將 LINE Developer Console 的 Webhook URL 改成 Vercel 提供的 `.vercel.app` 網址。

---
**本計畫書由您的 AI 指南員 Antigravity 產出，作為未來升級之參考。**
