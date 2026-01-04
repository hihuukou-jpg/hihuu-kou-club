# 実装計画 - UI改善とSupabase移行

## 目標の説明
ナビゲーションを英語化し、レイアウトの問題を修正してWebサイトのUIを洗練させます。また、本番環境への準備として、データの保存先をローカルのJSONファイルからSupabaseへ移行します。

## ユーザーレビューが必要な事項
- [ ] Supabaseの認証情報（プロジェクトURL、Anon Key）が有効か確認してください。
- [ ] UIのテキスト変更（英語化）を確認してください。

## 変更内容

### UI改善
#### [MODIFY] [Navigation.js](file:///c:/Users/kouki/.gemini/hifuu-kou-club/components/Navigation.js)
- ナビゲーション項目を英語に更新: "NEWS", "DIARY", "CHARACTERS", "CONTENT"。
- "秘封工倶楽部"のロゴテキストのスタイルを修正し、折り返しを防止（`whitespace-nowrap`）。

#### [MODIFY] [VideoSection.js](file:///c:/Users/kouki/.gemini/hifuu-kou-club/components/VideoSection.js)
- セクションタイトルを "MUSIC VIDEO / CONTENT" から "CONTENT" に変更。

### Supabase移行

#### [ACTION] Supabaseテーブルの作成
- SupabaseのSQLエディタで `supabase_schema.sql` のSQLコマンドを実行してください。

#### [NEW] [lib/supabase.js](file:///c:/Users/kouki/.gemini/hifuu-kou-club/lib/supabase.js)
- 環境変数を使用してSupabaseクライアントを初期化します。

#### [MODIFY] [app/api/news/route.js](file:///c:/Users/kouki/.gemini/hifuu-kou-club/app/api/news/route.js)
- GET: `supabase.from('news').select('*').order('date', { ascending: false })`
- POST: `supabase.from('news').insert(body)`

#### [MODIFY] [app/api/diary/route.js](file:///c:/Users/kouki/.gemini/hifuu-kou-club/app/api/diary/route.js)
- GET: `supabase.from('diary').select('*').order('date', { ascending: false })`
- POST: `supabase.from('diary').insert(body)`

#### [MODIFY] [app/api/videos/route.js](file:///c:/Users/kouki/.gemini/hifuu-kou-club/app/api/videos/route.js)
- GET: `supabase.from('videos').select('*').order('created_at', { ascending: false })`
- POST: `supabase.from('videos').insert(body)`

#### [MODIFY] [app/api/characters/route.js](file:///c:/Users/kouki/.gemini/hifuu-kou-club/app/api/characters/route.js)
- GET: `supabase.from('characters').select('*')`

## 検証計画
### 自動テスト
- Supabase接続を確認するテストスクリプトを作成します。
- APIエンドポイントがSupabaseからデータを返すことを確認します。

### 手動検証
- ナビゲーションバーの英語テキストとレイアウトを確認します。
- "CONTENT" セクションのタイトルを確認します。
- News/Diary/Characters がフロントエンドで正しく読み込まれることを確認します。
