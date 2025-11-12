# Risk Lance - ファイル構成再設計

**目的**: ベストプラクティスに基づき、保守性・拡張性の高いファイル構成に再構築

---

## 現在の構成（問題点）

```
risklance/
├── index.html
├── app.js
└── js/
    ├── data.js
    ├── alerts.js
    ├── charts.js
    ├── risk-analysis.js
    ├── business-apps.js
    ├── risk-branding.js
    ├── insurance-manager.js
    ├── insurance-gap-detector.js
    └── ui-renderer.js
```

**問題点**:
- フラットな構造で、ファイル数が増えると管理困難
- 機能別の分類がない
- 依存関係が不明確
- コアロジックとUIロジックが混在

---

## 新しい構成（ベストプラクティス）

```
risklance/
├── index.html
├── app.js                          # メインアプリケーション（エントリーポイント）
│
├── js/
│   ├── config/                     # 設定ファイル
│   │   ├── constants.js            # 定数定義
│   │   └── menu-config.js          # メニュー設定
│   │
│   ├── core/                       # コア機能（ビジネスロジック）
│   │   ├── data-manager.js         # データ管理（旧data.js）
│   │   └── app-state.js            # アプリケーション状態管理
│   │
│   ├── modules/                    # 機能モジュール
│   │   ├── insurance/              # 保険関連
│   │   │   ├── insurance-manager.js
│   │   │   └── gap-detector.js
│   │   │
│   │   ├── risk/                   # リスク分析関連
│   │   │   ├── risk-analysis.js
│   │   │   └── risk-branding.js
│   │   │
│   │   ├── business/               # 業務アプリ関連
│   │   │   └── business-apps.js
│   │   │
│   │   └── charts/                 # グラフ関連
│   │       └── charts.js
│   │
│   ├── ui/                         # UI関連
│   │   ├── components/             # UIコンポーネント
│   │   │   ├── sidebar.js          # サイドバー
│   │   │   ├── header.js           # ヘッダー
│   │   │   ├── notifications.js    # 通知
│   │   │   ├── dashboard-cards.js  # ダッシュボードカード
│   │   │   └── modals.js           # モーダル
│   │   │
│   │   └── renderers/              # レンダラー
│   │       ├── dashboard-renderer.js
│   │       ├── business-apps-renderer.js
│   │       ├── risk-renderer.js
│   │       └── insurance-renderer.js
│   │
│   └── utils/                      # ユーティリティ
│       ├── helpers.js              # ヘルパー関数
│       ├── formatters.js           # フォーマッター
│       └── validators.js           # バリデーター
│
└── css/                            # スタイル（現状維持）
    ├── main.css
    ├── dashboard.css
    └── ...
```

---

## ファイルの責務

### config/ - 設定

**constants.js**
- アプリケーション定数
- エラーメッセージ
- デフォルト値

**menu-config.js**
- サイドバーメニューの定義
- 画面設定
- ルーティング設定

---

### core/ - コア機能

**data-manager.js** (旧data.js)
- データの永続化
- データ取得・更新
- データフォーマット

**app-state.js** (新規)
- アプリケーション状態管理
- ユーザー情報
- 現在の画面状態

---

### modules/ - 機能モジュール

各機能を独立したモジュールとして管理:

**insurance/** - 保険機能
- 保険マネージャー
- ギャップ検出

**risk/** - リスク機能
- リスク分析
- リスクブランディング

**business/** - 業務アプリ機能
- 販売管理
- 在庫管理
- 顧客管理

**charts/** - グラフ機能
- グラフ生成
- グラフアニメーション

---

### ui/ - UI関連

**components/** - UIコンポーネント
- 再利用可能なUIパーツ
- 単一責任

**renderers/** - レンダラー
- 画面ごとのレンダリングロジック
- データとUIの橋渡し

---

### utils/ - ユーティリティ

**helpers.js**
- 汎用ヘルパー関数
- DOM操作ヘルパー

**formatters.js**
- 日付フォーマット
- 通貨フォーマット
- 数値フォーマット

**validators.js**
- データバリデーション
- フォームバリデーション

---

## 移行計画

### Phase 1: 設定ファイルの作成
1. menu-config.js を作成
2. constants.js を作成

### Phase 2: コアファイルの再編成
1. data.js → core/data-manager.js
2. app-state.js を新規作成

### Phase 3: UIコンポーネントの分離
1. sidebar.js を作成
2. ui-renderer.js を分割

### Phase 4: モジュールの整理
1. 既存ファイルを modules/ に移動
2. 命名規則を統一

### Phase 5: ユーティリティの抽出
1. 共通関数を utils/ に移動
2. formatters.js を作成

### Phase 6: index.htmlの更新
1. 新しいファイル構造に対応
2. 読み込み順序を最適化

---

## メリット

### 1. 保守性の向上
- ファイルの場所が明確
- 責務が明確に分離
- 変更箇所が特定しやすい

### 2. 拡張性の向上
- 新機能追加が容易
- モジュール単位で開発可能
- チーム開発に適した構造

### 3. テスタビリティの向上
- モジュールごとに単体テスト可能
- 依存関係が明確
- モックの作成が容易

### 4. パフォーマンスの向上
- 必要なモジュールのみ読み込み可能
- 遅延読み込みに対応しやすい
- バンドルサイズの最適化が容易

---

## 実装方針

### 1. 段階的移行
- 一度にすべてを変更せず、段階的に移行
- 各段階でテストを実施
- 後方互換性を維持

### 2. 命名規則の統一
- ファイル名: kebab-case (例: data-manager.js)
- クラス名: PascalCase (例: DataManager)
- 変数/関数名: camelCase (例: getDashboardData)

### 3. モジュールパターンの採用
- ES6 Modules (import/export)
- 将来的なバンドル化を考慮
- グローバル汚染を最小限に

### 4. ドキュメント化
- 各ファイルにJSDocコメント
- READMEに構成図を記載
- 依存関係を明記

---

実施日: 2025年10月29日
