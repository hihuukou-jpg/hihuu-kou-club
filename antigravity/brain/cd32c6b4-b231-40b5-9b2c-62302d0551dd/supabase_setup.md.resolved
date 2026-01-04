# Supabase セットアップガイド

本格運用（サーバーへの公開）のために、データベースサービスの **Supabase** を導入します。
以下の手順に従って設定を行い、必要なキーを取得してください。

## 手順1: Supabaseへの登録とプロジェクト作成

1. [Supabase公式サイト](https://supabase.com/) にアクセスし、「Start your project」から登録（GitHubアカウントなどでログイン）します。
2. 「New Project」をクリックします。
3. 適当な **Name** （例: `hifuu-kou-club`）と **Database Password** を設定し、「Create new project」を押します。
4. プロジェクトの作成が完了するまで数分待ちます。

## 手順2: APIキーの取得

プロジェクトのダッシュボードが開いたら：

1. 左側のメニューから **Project Settings** (歯車アイコン) → **API** をクリックします。
2. 以下の3つの情報をメモ帳などに控えてください。
    *   **Project URL** (`https://...supabase.co` の形式)
    *   **Project API keys** の `anon` / `public` キー
    *   **Project API keys** の `service_role` / `secret` キー (**重要**: これは管理者権限キーです)

## 手順3: データベース（テーブル）の作成

1. 左側のメニューから **SQL Editor** をクリックします。
2. 「New query」をクリックし、以下のSQL文をすべてコピー＆ペーストして「Run」ボタンを押します。

```sql
-- News Table
CREATE TABLE news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Diary Table
CREATE TABLE diary (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Characters Table
CREATE TABLE characters (
  id TEXT PRIMARY KEY, -- Using string ID like 'renko'
  name TEXT NOT NULL,
  role TEXT,
  description TEXT,
  color TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Videos Table
CREATE TABLE videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) but allow all access for now (since we handle auth in API)
-- Or better, we just use Service Role key in API so RLS is bypassed.
```

## 手順4: 画像保存用ストレージの作成

1. 左側のメニューから **Storage** をクリックします。
2. 「New Bucket」をクリックします。
3. **Name** に `uploads` と入力します。
4. **Public bucket** のスイッチを **ON** にします（必須）。
5. 「Save」をクリックします。

---

## 準備完了

取得した「Project URL」「anon key」「service_role key」をAIに伝えてください（または `.env` ファイルに書き込んでください）。
