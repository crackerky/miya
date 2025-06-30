# 研究ノート No.77 ～255haの王国解明記～

フィールドノート風の研究記録ウェブサイトです。

## 🚨 セットアップ手順（必須）

### 1. node_modulesの削除とクリーンインストール

```bash
cd C:\Users\crack\Documents\深山

# node_modulesフォルダが存在する場合は削除
rmdir /s /q node_modules

# package-lock.jsonも削除
del package-lock.json

# クリーンインストール
npm install
```

### 2. 画像の配置

#### 背景画像
PNG画像が配置されました：
- 場所: `C:\Users\crack\Documents\深山\public\paper-texture.png`

#### 章の画像
以下の画像をpublicフォルダーに配置してください：
- `public/kingdom-255ha.png` - 第1章「ここには何が眠っているのか」の画像
- `public/insects-collection.png` - 第2章「昆虫の100の新種があるということは〜菌類の想定新種数〜」の画像
- `public/ruins.png` - 第3章「なぜ80もの古代遺跡が存在する謎」の画像

※ `setup-image.bat` を実行すると、画像配置の詳細手順が表示されます。

### 3. 音声ファイルの配置（完了）

以下の音声ファイルが配置されました：
- `public/sounds/page-turn.mp3` - ページめくり音 ✓
- `public/sounds/clip-snap.mp3` - クリップのクリック音 ✓
- `public/sounds/pencil writing.mp4` - 鉛筆の書き音 ✓

音声は以下のタイミングで再生されます：
- **ページめくり音**：目次カードクリック時、スクロール5ページごと
- **クリップ音**：ヘッダーのクリップクリック時
- **鉛筆音**：ヒーローセクションのテキストアニメーション時

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスしてください。

## 🎯 実装された機能

### 各章の詳細ページ

#### 📚 第1章：探検記録アーカイブ
- 12件の詳細な探検記録を本棚風に表示
- フィルター機能（完了/継続中/機密指定）
- 各記録の詳細モーダル表示

#### 🔬 第2章：標本コレクション
- 15種の新種昆虫・菌類の標本カタログ
- グリッド/リスト表示切り替え
- 種類別フィルターとソート機能
- 詳細な標本情報モーダル

#### 🗿 第3章：遺跡カタログ
- 16件の古代遺跡の詳細情報
- カタログ/地図/年表の3つの表示モード
- 遺跡タイプ別フィルター
- 未解明の謎の一覧表示

### ヘッダーコンポーネントの要素と演出

#### 📎 左側クリップ
- **CSS擬似要素でメタリックな質感を実現**
- ホバー時: 微妙に回転（2度）
- クリック時: パチンと音が鳴る（音声ファイル配置時）
- グラデーションとシャドウで立体感を演出

#### 📝 タイトル部分
- 手書きフォント「Klee One」で「研究ノート No.77」
- サブタイトルは鉛筆書き風の薄い文字（opacity: 0.8）
- **スクロール時にインクが滲むようなブラー効果**

#### 📊 ページ番号
- arutega.jp風の進行状況表示
- 「Page 023/255」形式（255haとかけている）
- スクロールに応じてページ番号が増加
- 5ページごとにページめくり音（音声ファイル配置時）

#### 🔖 しおり紐
- SVGで描画、グラデーションで立体感
- **ホバー時に紐が揺れるアニメーション**
- 各章へのクイックジャンプメニュー

### アニメーション機能

- **スクロール連動**: ページ番号、ブラー効果
- **ジェスチャー反応**: クリップの回転、しおり紐の揺れ
- **音声フィードバック**: ページめくり音、クリップ音
- **視覚的フィードバック**: ホバー効果、遷移アニメーション

## 技術スタック

- **Next.js 14** - App Router使用
- **React 18** - 最新の安定版React
- **TypeScript** - 型安全な開発
- **Tailwind CSS 3** - ユーティリティファーストCSS
- **Framer Motion** - スムーズなアニメーション
- **Google Fonts** - Klee One（手書き風）、Courier Prime（タイプライター風）

## プロジェクト構造

```
深山/
├── app/
│   ├── globals.css      # グローバルスタイル（背景画像設定含む）
│   ├── layout.tsx       # ルートレイアウト
│   ├── page.tsx         # ホームページ
│   ├── chapter1/
│   │   ├── page.tsx     # 探検記録アーカイブ
│   │   └── layout.tsx
│   ├── chapter2/
│   │   ├── page.tsx     # 標本コレクション
│   │   └── layout.tsx
│   └── chapter3/
│       ├── page.tsx     # 遺跡カタログ
│       └── layout.tsx
├── components/
│   ├── FieldNotesHeader.tsx        # ヘッダーコンポーネント
│   ├── FieldNotesHeader.module.css  # ヘッダー専用スタイル
│   ├── HeroSection.tsx             # ヒーローセクション
│   └── TableOfContents.tsx         # 目次コンポーネント
├── public/
│   ├── paper-texture.png           # 背景画像（配置済み）
│   ├── kingdom-255ha.png          # 第1章画像（要配置）
│   ├── insects-collection.png    # 第2章画像（要配置）
│   ├── ruins.png                 # 第3章画像（要配置）
│   └── sounds/                     # 音声ファイルフォルダ
│       ├── README.md               # 音声ファイルの説明
│       ├── page-turn.mp3          # ページめくり音（配置済み）
│       ├── clip-snap.mp3          # クリップ音（配置済み）
│       └── pencil writing.mp4     # 鉛筆音（配置済み）
├── package.json
├── tsconfig.json
├── next.config.mjs
├── postcss.config.js
└── tailwind.config.js
```

## ライセンス

MIT License
