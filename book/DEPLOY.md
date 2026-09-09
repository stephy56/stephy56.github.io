# 把「每日導讀」加進你現有的網站（stephy56.github.io）

做法跟你上次放「加拿大職業道德」那頁一樣，只是這次是一整個資料夾。
它會出現在 `你的網址/book/`，而且**不會**出現在你個人網站的任何選單裡——除非你自己去加連結。

## 一、放上去（跟 CPA 那頁一樣的方式）
把這個 `book` 資料夾整包放進你的 repo 根目錄（跟 `about.html`、`cpa-principle-practice.html` 同一層）。

- **用網頁上傳**（你上次的做法）：進到 repo → `Add file ▸ Upload files` → 把整個 `book` 資料夾拖進去 → Commit。
  （只有 `book/index.html`、`book/presentation.html`、`book/assets`、`book/data` 這幾個檔案時，很快就傳完。）
- 幾十秒後就能開：`https://stephy56.github.io/book/`（若你有綁自己的網域，就是 `你的網域/book/`）。

> 這頁不會自動連到你的作品集。想日後把它列進選單再說；不加，它就是一個只有知道網址的人才進得來的獨立頁面。

## 二、投影片圖片（1,851 張）——這是唯一比較費工的部分
`book/slides/` 目前是空的（只有一個說明檔）。完整的簡報圖片有 1,851 張，我另外用 5 個
`slides-partX.zip` 傳給你。把它們**全部解壓**後，所有 `slide-XXXX.jpg` 放進 `book/slides/`。

- 檔案很多，**網頁上傳一次只能 100 個檔案**、又容易中斷，很痛苦。
  強烈建議用 **GitHub Desktop**（免費）：把整理好的 `book` 資料夾放進本機 repo → 它會一次認出全部 1,851 張 → 一鍵 Commit & Push。這是最省事的方法。
- 若你暫時不想弄圖片：**先只放「每日導讀」也完全可以**。少了 `slides/`，只有「簡報全覽」那頁的縮圖會顯示不出來，導讀本身完全正常。圖片之後任何時候補上都行。

## 三、每天更新
每天早上 7:00，排程任務會把最新的 **`reviews.json`** 傳到這個對話（Day 1、Day 2… 會一天天累積）。
你只要更新 repo 裡的這一個檔案：`book/data/reviews.json`。

- **最快**：在 GitHub 網頁進到 `book/data/reviews.json` → 按鉛筆（或 `Upload files` 覆蓋）→ 貼上／上傳新的內容 → Commit。約一分鐘後網站就更新。
- 用 GitHub Desktop 的話：把新的 `reviews.json` 蓋掉舊的 → Commit & Push（或直接雙擊 `book/publish.sh`）。

就這樣——網站永遠停在你現有的網域底下，跟你的個人作品集互不干擾。
