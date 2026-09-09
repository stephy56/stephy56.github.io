#!/usr/bin/env bash
# 每日發佈：把目前資料夾的變更推上 GitHub，GitHub Pages 會自動更新網站。
# 用法：先把當天新的 reviews.json 覆蓋到 data/reviews.json，然後在 site/ 資料夾執行  ./publish.sh
set -e
cd "$(dirname "$0")"
STAMP="$(date +%Y-%m-%d)"
git add -A
if git diff --cached --quiet; then
  echo "沒有變更，無需發佈。"
  exit 0
fi
git commit -m "更新每日導讀 ${STAMP}"
git push
echo "✅ 已發佈。約 1 分鐘後網站會更新。"
