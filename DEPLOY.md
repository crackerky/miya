# Netlifyデプロイガイド

## 🚀 デプロイ前の準備

### 1. 画像ファイル名の変更

日本語ファイル名はLinux環境で問題を引き起こす可能性があるため、以下のように変更してください：

```bash
# publicフォルダー内で実行
mv "255ha王国.png" "kingdom-255ha.png"
mv "昆虫たくさん.png" "insects-collection.png"
mv "遺跡.png" "ruins.png"
```

または、`rename-images.sh`を実行してください。

### 2. ビルドテスト

デプロイ前にローカルでビルドを確認：

```bash
npm run build
```

エラーがないことを確認してください。

## 📋 Netlifyデプロイ手順

### 方法1: GitHub経由（推奨）

1. GitHubにリポジトリを作成
2. コードをプッシュ
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

3. Netlifyにログイン
4. "New site from Git"をクリック
5. GitHubを選択し、リポジトリを選択
6. ビルド設定：
   - Build command: `npm run build`
   - Publish directory: `.next`
7. "Deploy site"をクリック

### 方法2: Netlify CLI

1. Netlify CLIをインストール
   ```bash
   npm install -g netlify-cli
   ```

2. ログイン
   ```bash
   netlify login
   ```

3. デプロイ
   ```bash
   netlify deploy --prod
   ```

## ⚠️ 一般的な問題と解決策

### 問題1: Page Not Found

**原因**: Next.js App Routerの設定問題
**解決策**: `netlify.toml`ファイルが正しく配置されていることを確認

### 問題2: 画像が表示されない

**原因**: ファイル名の大文字小文字の不一致
**解決策**: すべての画像参照が正確に一致していることを確認

### 問題3: ビルドエラー

**原因**: TypeScriptエラーまたはESLintエラー
**解決策**: `npm run build`でローカルでビルドを確認

### 問題4: 音声ファイルが再生されない

**原因**: ファイルパスの問題
**解決策**: `/sounds/`で始まるパスを使用していることを確認

## 📁 必要なファイル

デプロイに含まれるべきファイル：
- `netlify.toml` - Netlify設定
- `package.json` - 依存関係
- `next.config.mjs` - Next.js設定
- すべての`.tsx`、`.ts`ファイル
- `public/`フォルダー内のすべてのアセット

## 🔍 デバッグ

Netlifyのデプロイログを確認：
1. Netlifyダッシュボードにログイン
2. サイトを選択
3. "Deploys"タブ
4. 失敗したデプロイをクリック
5. ログを確認

## 📞 サポート

問題が解決しない場合：
1. [Netlify Community](https://answers.netlify.com/)
2. [Next.js Documentation](https://nextjs.org/docs)
3. GitHubのIssueを作成
