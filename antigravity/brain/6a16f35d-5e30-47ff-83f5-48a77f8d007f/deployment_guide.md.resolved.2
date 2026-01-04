# デプロイメントガイド: 秘封工倶楽部

現在の環境では `npm` や `git` コマンドが実行できないため、以下の手順に従って手動でデプロイを行ってください。

## 前提条件
- **目標**: Vercel上でのWebサイト公開
- **必要なもの**: `npm`, `git`, Vercelアカウント, GitHubアカウント

## ステップ 1: ローカルでの検証 (Local Verification)
**注: `npm` コマンドが見つからないエラーが出る場合は、このステップをスキップしてステップ2に進んでください。Vercel上でビルドが行われます。**

1. `hifuu-kou-club` ディレクトリでターミナルを開きます。
2. ビルドコマンドを実行します:
   ```bash
   npm run build
   ```
3. **失敗した場合**: エラーを修正してください（環境変数の不足や構文エラーなど）。
   - **`npm` コマンドが見つからない場合**: そのままステップ2へ進みます。
4. **成功した場合**: ステップ2へ進んでください。

## ステップ 2: GitHubへのプッシュ (Push to GitHub)
最新のコードをGitHubにアップロードします。
**注: ターミナルで `git` が使えない場合は、VS Codeの「ソース管理」機能（左側の枝のアイコン）を使用してください。**

1. VS Code左側の「ソース管理」アイコンをクリックします。
2. 変更内容が表示されている場合、メッセージ入力欄に "Ready for deployment" と入力し、「コミット」ボタン（チェックマークまたは「コミット」）を押します。
3. 「変更の同期」または「プッシュ」ボタンを押して、GitHubへ送信します。

(以下のコマンドは参考用です)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

## ステップ 3: Vercelへのデプロイ (Deploy to Vercel)

1. [Vercel](https://vercel.com) にログインします。
2. **"Add New..."** -> **"Project"** をクリックします。
3. GitHubリポジトリ（`hifuu-kou-club` または親リポジトリ）を **Import** します。
4. **プロジェクト設定 (Configure Project)**:
   - **Framework Preset**: Next.js
   - **Root Directory**: **重要!** "Edit" をクリックして `hifuu-kou-club` を選択してください（もしリポジトリのルート直下にない場合）。
   - **Environment Variables**: `.env.local` や Supabase プロジェクトから以下のキーを追加してください:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - (その他 API ルートで使用するキーがあれば、例: `SUPABASE_SERVICE_ROLE_KEY`)
5. **"Deploy"** をクリックします。

## ステップ 4: 動作確認 (Verify)
- Vercel が提供するデプロイURLにアクセスします。
- データが読み込まれない場合は、コンソールやネットワークタブを確認してください。
- "Content", "News", "Diary" ページが正しく機能するか確認してください。
