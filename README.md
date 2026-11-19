# LEXORA MVP

A zero-build, mobile-friendly vocabulary learning prototype.

## Run it
1. Unzip the project.
2. Open `index.html` in a modern browser, or upload the folder to any static web host.
3. On mobile Chrome, use **Add to Home screen** to create an app-like shortcut.

## Included
- Visual guess stage
- Context sentence stage
- Reveal with English definition, Chinese meaning, example and collocations
- Add custom vocabulary
- Local browser storage (`localStorage`)
- Starter Supabase/PostgreSQL schema in `supabase_schema.sql`

## Current prototype limitations
- Demo images are illustrative remote images, not production-cleared vocabulary assets.
- The example stage uses a simplified multiple-choice interaction.
- New words added by the user are stored only in the current browser.
- No accounts, cloud sync, automated dictionary lookup, audio, or FSRS scheduling yet.

## Recommended next milestones
1. Replace demo imagery with a licensed image provider and store source/license/attribution.
2. Add dictionary lookup and curated example sentences.
3. Connect Supabase Auth + database.
4. Implement FSRS scheduling and confidence ratings.
5. Add PWA manifest/service worker, then test installability on Android/iOS.


## LEXI tutor prototype
- A new **LEXI 家教** tab is included.
- The browser prototype demonstrates target-word prompts with simple local scripted replies.
- `server_example/app/api/tutor/route.ts` is a Next.js server route example for real AI chat.
- Copy `.env.example` to `.env.local` in a Next.js project and add your own API key.
- Never put an AI provider API key in browser JavaScript or commit `.env.local`.
- The API route is an integration example, not wired into the static HTML prototype yet.


## v0.3：純文字自由猜測

- 第一階段只顯示圖片與單字，使用者自行輸入猜測；沒有選項、提示或預先翻譯。
- 第二階段顯示一個英文例句，使用者再次自由輸入理解。
- 完成兩次猜測後才揭曉英文定義、中文意思、搭配詞與例句。
- 本機原型會記錄兩次猜測，方便使用者對照答案；目前**沒有**接入 AI 語意評分，不會假裝判斷猜測正確與否。
- LEXI 對話頁仍是示範邏輯；要進行真正自由對話與語意回饋，需部署伺服器 API 並設定 API 金鑰。
