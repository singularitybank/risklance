# Risk Lance MVP - 要件定義書

**プロジェクト名**: Risk Lance - データ駆動型リスクマネジメントプラットフォーム
**バージョン**: MVP 1.0
**作成日**: 2025年10月29日
**ステータス**: 要件定義フェーズ

---

## 目次

1. [プロジェクト概要](#1-プロジェクト概要)
2. [目的とビジョン](#2-目的とビジョン)
3. [ターゲットユーザー](#3-ターゲットユーザー)
4. [機能要件](#4-機能要件)
5. [非機能要件](#5-非機能要件)
6. [技術仕様](#6-技術仕様)
7. [システムアーキテクチャ](#7-システムアーキテクチャ)
8. [データモデル](#8-データモデル)
9. [API設計](#9-api設計)
10. [セキュリティ要件](#10-セキュリティ要件)
11. [開発計画](#11-開発計画)
12. [リスクと対策](#12-リスクと対策)
13. [成功指標](#13-成功指標)

---

## 1. プロジェクト概要

### 1.1 背景
企業のリスクマネジメントと保険ポートフォリオ最適化を支援するWebアプリケーション。従来の静的な保険管理から、データ駆動型のリアルタイムリスク分析・予測へシフトすることで、企業のレジリエンス向上を実現する。

### 1.2 プロジェクトスコープ

**MVP（Minimum Viable Product）に含む機能:**
- ✅ ユーザー認証・認可
- ✅ ダッシュボード（業務データ概要）
- ✅ 保険ポートフォリオ管理
- ✅ リスク分析・ダッシュボード
- ✅ リスク・ブランディング（リーグ/ギルドシステム）
- ✅ 総合リスクレポート生成
- ✅ 業務アプリ連携（販売・在庫・顧客管理）
- ✅ 代理店管理システム

**MVP後のフェーズ（Phase 2以降）:**
- AI/機械学習によるリスク予測
- 外部APIとの連携（気象庁、信用調査機関等）
- モバイルアプリ
- 多言語対応

---

## 2. 目的とビジョン

### 2.1 目的
1. **リスクの可視化** - 企業が直面するリスクをリアルタイムで把握
2. **保険の最適化** - 適切な保険カバレッジの提案と見直し
3. **継続的改善** - リスク対策の実行履歴とPDCAサイクル支援
4. **信頼性の向上** - リーグ/ギルドシステムによる企業信頼性の可視化

### 2.2 ビジョン
「すべての企業が適切なリスクマネジメントを実践できる世界」を実現する。

### 2.3 ビジネス価値
- 保険代理店: 顧客満足度向上、業務効率化、手数料増加
- 企業ユーザー: リスク低減、保険コスト最適化、事業継続性向上
- 取引先: 取引先の信頼性評価、与信判断支援

---

## 3. ターゲットユーザー

### 3.1 プライマリユーザー

#### 企業ユーザー（経営者・リスク管理担当者）
- **属性**: 中小企業～大企業のCFO、経営企画、リスク管理部門
- **ニーズ**:
  - リスクの全体像を把握したい
  - 保険の過不足を確認したい
  - 取引先に信頼性をアピールしたい
  - データに基づいた意思決定をしたい

#### 保険代理店
- **属性**: 損害保険代理店、保険ブローカー
- **ニーズ**:
  - 顧客のリスク状況を把握したい
  - 満期管理を効率化したい
  - 保険提案の質を高めたい
  - 複数顧客を一元管理したい

### 3.2 セカンダリユーザー

- 取引先企業（信用評価の参照）
- 金融機関（融資審査の参考）
- 監査法人（リスク管理体制の評価）

---

## 4. 機能要件

### 4.1 認証・認可機能

| 要件ID | 機能 | 説明 | 優先度 |
|--------|------|------|--------|
| AUTH-001 | ユーザー登録 | メールアドレス、パスワードによる新規登録 | 必須 |
| AUTH-002 | ログイン | 企業ユーザー/代理店ユーザーのログイン | 必須 |
| AUTH-003 | ログアウト | セッション無効化 | 必須 |
| AUTH-004 | パスワードリセット | メールによるパスワード再設定 | 必須 |
| AUTH-005 | MFA（多要素認証） | SMS/メールによる2段階認証 | 推奨 |
| AUTH-006 | ロール管理 | 企業管理者、一般ユーザー、代理店の権限分離 | 必須 |

**技術実装**: Amazon Cognito + FastAPI JWT

---

### 4.2 ダッシュボード機能（企業向け）

| 要件ID | 機能 | 説明 | 優先度 |
|--------|------|------|--------|
| DASH-001 | 業務データ概要表示 | 売上、在庫、顧客数等の統計 | 必須 |
| DASH-002 | 通知・お知らせ | システム通知、満期通知の表示 | 必須 |
| DASH-003 | アラート表示 | 緊急リスク警告の表示 | 必須 |
| DASH-004 | クイックアクション | よく使う機能へのショートカット | 推奨 |

---

### 4.3 保険ポートフォリオ管理

| 要件ID | 機能 | 説明 | 優先度 |
|--------|------|------|--------|
| INS-001 | 保険契約一覧 | 加入中の保険契約リスト表示 | 必須 |
| INS-002 | 保険詳細表示 | 証券番号、補償内容、保険料等の詳細 | 必須 |
| INS-003 | 保険カバレッジ率 | リスクに対する保険カバー率の可視化 | 必須 |
| INS-004 | 見直し推奨 | AIによる保険見直し提案 | 推奨 |
| INS-005 | 在庫補償額チェック | 在庫金額と補償額の比較（3ヶ月連続チェック） | 必須 |
| INS-006 | 保険証券アップロード | PDF/画像のアップロード | 推奨 |
| INS-007 | 満期通知 | 満期30日前の自動通知 | 必須 |

**重要機能詳細: 在庫補償額チェック（INS-005）**
- 過去3ヶ月の在庫金額が連続で8,000万円を超える場合、警告を表示
- 火災保険の商品・製品補償額と比較
- 不足額を算出し、リスクダッシュボードへリンク

---

### 4.4 業務アプリ連携

#### 4.4.1 販売管理アプリ

| 要件ID | 機能 | 説明 | 優先度 |
|--------|------|------|--------|
| BIZ-001 | 受注管理 | 受注データの登録・閲覧 | 必須 |
| BIZ-002 | 請求書管理 | 請求書の発行・管理 | 推奨 |
| BIZ-003 | 売上統計 | 日次・月次売上の表示 | 必須 |
| BIZ-004 | 売上レポート | 期間別・顧客別売上分析 | 推奨 |

#### 4.4.2 在庫管理アプリ

| 要件ID | 機能 | 説明 | 優先度 |
|--------|------|------|--------|
| BIZ-101 | 在庫一覧 | 在庫品目と数量の表示 | 必須 |
| BIZ-102 | 在庫金額計算 | 在庫評価額の自動計算 | 必須 |
| BIZ-103 | 入出庫履歴 | 入庫・出庫の履歴管理 | 必須 |
| BIZ-104 | 在庫アラート | 在庫不足・過剰在庫の警告 | 必須 |
| BIZ-105 | 月次在庫推移 | 在庫金額の月次推移グラフ | 必須 |

#### 4.4.3 顧客管理（CRM）

| 要件ID | 機能 | 説明 | 優先度 |
|--------|------|------|--------|
| BIZ-201 | 顧客リスト | 顧客の一覧表示 | 必須 |
| BIZ-202 | 顧客詳細 | 顧客情報の詳細表示・編集 | 必須 |
| BIZ-203 | 商談管理 | 商談の進捗管理 | 推奨 |
| BIZ-204 | フォローアップ | フォローアップ予定の管理 | 推奨 |

---

### 4.5 リスク分析・ダッシュボード

| 要件ID | 機能 | 説明 | 優先度 |
|--------|------|------|--------|
| RISK-001 | 緊急アラートシステム | 洪水リスク、取引先信用リスク等の緊急警告 | 必須 |
| RISK-002 | 社内リスク分析 | 在庫、従業員、サイバーセキュリティリスク | 必須 |
| RISK-003 | 社外リスク分析 | 災害、信用、市場環境リスク | 必須 |
| RISK-004 | リスクスコア算出 | 総合リスクスコアの自動計算 | 必須 |
| RISK-005 | グラフ表示 | 棒グラフ、円グラフ、線グラフによる可視化 | 必須 |
| RISK-006 | 推奨アクション | リスクに応じた対策提案 | 推奨 |
| RISK-007 | リスク履歴 | 過去のリスク推移表示 | 必須 |

---

### 4.6 リスク・ブランディング

#### 4.6.1 リーグシステム

| 要件ID | 機能 | 説明 | 優先度 |
|--------|------|------|--------|
| LEAGUE-001 | リーグ分類 | Bronze～Challenger 7段階のリーグ | 必須 |
| LEAGUE-002 | LP（リーグポイント）管理 | リスク体制評価に基づくポイント計算 | 必須 |
| LEAGUE-003 | ランキング表示 | リーグ内順位の表示 | 必須 |
| LEAGUE-004 | 進捗表示 | 次リーグまでの進捗バー | 必須 |
| LEAGUE-005 | リアルタイム更新 | ランキングの定期更新 | 推奨 |

#### 4.6.2 ギルドシステム

| 要件ID | 機能 | 説明 | 優先度 |
|--------|------|------|--------|
| GUILD-001 | ギルド作成 | 企業連合によるギルド形成 | 推奨 |
| GUILD-002 | ギルド参加 | 既存ギルドへの参加申請 | 推奨 |
| GUILD-003 | ギルドランキング | ギルド間のランキング | 推奨 |
| GUILD-004 | メンバー管理 | ギルドメンバーの統計表示 | 推奨 |

#### 4.6.3 リスク体制評価

| 要件ID | 機能 | 説明 | 優先度 |
|--------|------|------|--------|
| ASSESS-001 | 6カテゴリー評価 | 情報セキュリティ、財務、運用、コンプライアンス、BCP、品質 | 必須 |
| ASSESS-002 | レベル判定 | Lv.1～5の自動判定 | 必須 |
| ASSESS-003 | スコア表示 | カテゴリー別スコア（0～100点） | 必須 |

---

### 4.7 総合リスクレポート生成

| 要件ID | 機能 | 説明 | 優先度 |
|--------|------|------|--------|
| REPORT-001 | レポート種別選択 | 総合/月次/保険/コンプライアンス | 必須 |
| REPORT-002 | データ収集 | 各種データの自動集約 | 必須 |
| REPORT-003 | HTML/PDF生成 | レポートの生成 | 必須 |
| REPORT-004 | リーグ/ギルド情報 | リーグ・ギルド情報の組み込み | 必須 |
| REPORT-005 | リスク推移チャート | 過去12ヶ月のリスク推移 | 必須 |
| REPORT-006 | 保険加入状況 | 保険カバレッジの詳細 | 必須 |
| REPORT-007 | リスク対策履歴 | 実施した対策の履歴 | 必須 |
| REPORT-008 | 取引先向けサマリー | 信頼性評価情報 | 必須 |
| REPORT-009 | ダウンロード | PDF形式でのダウンロード | 必須 |
| REPORT-010 | レポート履歴 | 過去生成したレポートの管理 | 推奨 |

---

### 4.8 代理店管理システム

#### 4.8.1 顧客管理

| 要件ID | 機能 | 説明 | 優先度 |
|--------|------|------|--------|
| AGENCY-001 | 顧客リスト | 代理店が管理する顧客一覧 | 必須 |
| AGENCY-002 | 顧客フィルタ | 業種、ステータス、保険種目でフィルタ | 必須 |
| AGENCY-003 | 顧客詳細 | 顧客の保有保険・リスク状況表示 | 必須 |
| AGENCY-004 | 顧客登録 | 新規顧客の登録 | 必須 |
| AGENCY-005 | 顧客エクスポート | 顧客データのCSVエクスポート | 推奨 |

#### 4.8.2 保険証券管理

| 要件ID | 機能 | 説明 | 優先度 |
|--------|------|------|--------|
| AGENCY-101 | 証券一覧 | 管理している保険証券の一覧 | 必須 |
| AGENCY-102 | 証券検索 | 証券番号・顧客名での検索 | 必須 |
| AGENCY-103 | 満期管理 | 満期日による証券管理 | 必須 |
| AGENCY-104 | 証券フィルタ | 保険種目、保険会社、ステータスでフィルタ | 必須 |
| AGENCY-105 | 証券登録 | 新規証券の登録 | 必須 |
| AGENCY-106 | 証券エクスポート | 証券データのCSVエクスポート | 推奨 |

#### 4.8.3 通知・アラート

| 要件ID | 機能 | 説明 | 優先度 |
|--------|------|------|--------|
| AGENCY-201 | 満期通知 | 満期30日前の通知 | 必須 |
| AGENCY-202 | 見直し依頼 | 顧客からの見直し依頼通知 | 必須 |
| AGENCY-203 | リスク警告 | 顧客のリスク状況悪化通知 | 必須 |
| AGENCY-204 | 緊急対応案件 | 即座に対応が必要な案件 | 必須 |
| AGENCY-205 | 通知フィルタ | カテゴリー別通知フィルタ | 推奨 |

#### 4.8.4 統計・レポート

| 要件ID | 機能 | 説明 | 優先度 |
|--------|------|------|--------|
| AGENCY-301 | ダッシュボード | 総顧客数、証券数、手数料等の統計 | 必須 |
| AGENCY-302 | 顧客別売上 | 顧客別の手数料収入レポート | 推奨 |
| AGENCY-303 | 満期管理レポート | 今後3ヶ月の満期予定一覧 | 必須 |
| AGENCY-304 | リスク分析レポート | 顧客のリスク状況集計 | 推奨 |

---

## 5. 非機能要件

### 5.1 パフォーマンス

| 要件ID | 項目 | 目標値 | 説明 |
|--------|------|--------|------|
| PERF-001 | ページ読み込み時間 | < 2秒 | 初回ページ表示 |
| PERF-002 | API応答時間 | < 500ms | 通常のAPI呼び出し |
| PERF-003 | レポート生成時間 | < 10秒 | 総合リスクレポート生成 |
| PERF-004 | 同時接続数 | 1,000ユーザー | MVP時点での目標 |
| PERF-005 | データベースクエリ | < 100ms | 95パーセンタイル |

### 5.2 可用性

| 要件ID | 項目 | 目標値 | 説明 |
|--------|------|--------|------|
| AVAIL-001 | 稼働率 | 99.9% | 月間ダウンタイム < 43分 |
| AVAIL-002 | 復旧時間 | < 1時間 | 障害発生時の目標復旧時間 |
| AVAIL-003 | バックアップ | 日次 | データベースの自動バックアップ |
| AVAIL-004 | マルチAZ構成 | 必須 | RDS、ECSのマルチAZ配置 |

### 5.3 スケーラビリティ

| 要件ID | 項目 | 目標値 | 説明 |
|--------|------|--------|------|
| SCALE-001 | 水平スケーリング | 自動 | ECS Fargateの自動スケール |
| SCALE-002 | データベース拡張 | 垂直スケール | RDSのスペック変更対応 |
| SCALE-003 | ストレージ | 無制限 | S3による拡張可能なストレージ |

### 5.4 セキュリティ

| 要件ID | 項目 | 説明 | 優先度 |
|--------|------|------|--------|
| SEC-001 | HTTPS通信 | すべての通信をHTTPS化 | 必須 |
| SEC-002 | データ暗号化 | RDS暗号化、S3暗号化 | 必須 |
| SEC-003 | パスワードポリシー | 8文字以上、英数字記号混在 | 必須 |
| SEC-004 | セッション管理 | タイムアウト30分、トークン更新 | 必須 |
| SEC-005 | CORS設定 | 許可されたオリジンのみ | 必須 |
| SEC-006 | SQL インジェクション対策 | ORMによるパラメータ化クエリ | 必須 |
| SEC-007 | XSS対策 | フロントエンドでのエスケープ処理 | 必須 |
| SEC-008 | CSRF対策 | トークンによる検証 | 必須 |
| SEC-009 | 監査ログ | ユーザーアクションの記録 | 推奨 |

### 5.5 ユーザビリティ

| 要件ID | 項目 | 説明 |
|--------|------|------|
| USAB-001 | レスポンシブデザイン | PC、タブレット、スマートフォン対応 |
| USAB-002 | ブラウザサポート | Chrome、Firefox、Safari、Edge最新版 |
| USAB-003 | 日本語UI | すべてのUIを日本語で提供 |
| USAB-004 | アクセシビリティ | WCAG 2.1 AA準拠 |
| USAB-005 | エラーメッセージ | わかりやすいエラー表示 |

### 5.6 保守性

| 要件ID | 項目 | 説明 |
|--------|------|------|
| MAINT-001 | コードカバレッジ | テストカバレッジ > 80% |
| MAINT-002 | ドキュメント | API仕様書（OpenAPI）、README |
| MAINT-003 | ログ管理 | CloudWatch Logsへの集約 |
| MAINT-004 | モニタリング | CloudWatch/X-Rayによる監視 |

---

## 6. 技術仕様

### 6.1 技術スタック

#### フロントエンド
```
- React 18 (TypeScript)
- Material-UI (MUI) v5
- React Router v6
- React Query (TanStack Query) v5
- Zustand v4 (状態管理)
- Recharts v2 (グラフ)
- Axios v1 (HTTP通信)
- React Hook Form v7 (フォーム管理)
- Zod v3 (バリデーション)
```

#### バックエンド
```
- Python 3.11+
- FastAPI 0.109+
- SQLAlchemy 2.0 (ORM)
- Alembic (マイグレーション)
- Pydantic V2 (バリデーション)
- Uvicorn (ASGIサーバー)
- PostgreSQL 15 (データベース)
- Redis 7 (キャッシュ)
```

#### AWS サービス
```
- Amazon ECS Fargate (コンテナ実行環境)
- Amazon RDS PostgreSQL (データベース)
- Amazon ElastiCache Redis (キャッシュ)
- Amazon S3 (静的ファイル・レポート保存)
- Amazon CloudFront (CDN)
- Amazon Cognito (認証)
- Amazon ALB (ロードバランサー)
- Amazon CloudWatch (監視)
- AWS Certificate Manager (SSL証明書)
- AWS Secrets Manager (認証情報管理)
```

#### 開発・デプロイ
```
- Docker / Docker Compose
- AWS CDK (Python) - IaC
- GitHub Actions - CI/CD
- Poetry - Python依存管理
- Pytest - テストフレームワーク
```

### 6.2 開発環境

#### 推奨ローカル開発環境
- OS: Windows 10/11, macOS, Linux
- Python: 3.11+
- Node.js: 18+ (LTS)
- Docker Desktop
- IDE: VS Code / PyCharm

---

## 7. システムアーキテクチャ

### 7.1 全体構成図

```
┌──────────────────────────────────────────────────────────────┐
│                         Users                                 │
│            (企業ユーザー / 代理店ユーザー)                      │
└────────────────────────┬─────────────────────────────────────┘
                         │ HTTPS
                         ▼
┌──────────────────────────────────────────────────────────────┐
│               Amazon CloudFront (CDN)                         │
│             + AWS Certificate Manager (SSL)                   │
└────────────┬──────────────────────────┬──────────────────────┘
             │                          │
             │ React SPA                │ API Requests
             ▼                          ▼
┌─────────────────────┐      ┌──────────────────────┐
│   Amazon S3         │      │  Application Load    │
│  (Static Hosting)   │      │  Balancer (ALB)      │
│  - React Build      │      └──────────┬───────────┘
│  - Assets           │                 │
└─────────────────────┘                 │
                                        ▼
                         ┌──────────────────────────┐
                         │   Amazon ECS Fargate     │
                         │   - FastAPI Containers   │
                         │   - Uvicorn Workers      │
                         │   - Auto Scaling         │
                         └──────────┬───────────────┘
                                    │
            ┌───────────────────────┼───────────────────────┐
            │                       │                       │
            ▼                       ▼                       ▼
┌───────────────────┐   ┌──────────────────┐   ┌─────────────────┐
│ Amazon RDS        │   │ Amazon Cognito   │   │ Amazon S3       │
│ PostgreSQL        │   │ (User Pools)     │   │ - Reports       │
│ - Multi-AZ        │   │ - JWT Tokens     │   │ - Uploads       │
│ - Encrypted       │   └──────────────────┘   └─────────────────┘
└────────┬──────────┘
         │ Read Replica
         ▼
┌───────────────────┐
│ ElastiCache       │
│ (Redis)           │
│ - Session Store   │
│ - Ranking Cache   │
└───────────────────┘

┌───────────────────────────────────────────────────────────────┐
│                    Monitoring & Logging                        │
│  - CloudWatch Logs, Metrics, Alarms                          │
│  - AWS X-Ray (Distributed Tracing)                           │
└───────────────────────────────────────────────────────────────┘
```

### 7.2 ネットワーク構成

```
VPC (10.0.0.0/16)
│
├── Public Subnet (10.0.1.0/24, 10.0.2.0/24)
│   ├── ALB
│   └── NAT Gateway
│
└── Private Subnet (10.0.11.0/24, 10.0.12.0/24)
    ├── ECS Fargate Tasks
    ├── RDS PostgreSQL
    └── ElastiCache Redis
```

---

## 8. データモデル

### 8.1 ER図概要

```
┌──────────────┐         ┌──────────────────┐
│    Users     │1      N │ InsurancePolicies│
│──────────────│─────────│──────────────────│
│ id (PK)      │         │ id (PK)          │
│ email        │         │ user_id (FK)     │
│ cognito_id   │         │ policy_type      │
│ role         │         │ company          │
│ company_name │         │ coverage_amount  │
│ created_at   │         │ start_date       │
└──────┬───────┘         │ end_date         │
       │                 │ status           │
       │                 └──────────────────┘
       │
       │1             N
       │         ┌──────────────────┐
       ├─────────│  RiskAssessments │
       │         │──────────────────│
       │         │ id (PK)          │
       │         │ user_id (FK)     │
       │         │ category         │
       │         │ level            │
       │         │ score            │
       │         │ assessed_at      │
       │         └──────────────────┘
       │
       │1             N
       │         ┌──────────────────┐
       ├─────────│  InventoryData   │
       │         │──────────────────│
       │         │ id (PK)          │
       │         │ user_id (FK)     │
       │         │ month            │
       │         │ total_value      │
       │         │ items_count      │
       │         └──────────────────┘
       │
       │1             N
       │         ┌──────────────────┐
       ├─────────│  SalesData       │
       │         │──────────────────│
       │         │ id (PK)          │
       │         │ user_id (FK)     │
       │         │ date             │
       │         │ amount           │
       │         │ orders_count     │
       │         └──────────────────┘
       │
       │1             N
       │         ┌──────────────────┐
       ├─────────│  LeagueMembers   │
       │         │──────────────────│
       │         │ id (PK)          │
       │         │ user_id (FK)     │
       │         │ league           │
       │         │ lp               │
       │         │ rank             │
       │         └──────────────────┘
       │
       │1             N
       │         ┌──────────────────┐
       └─────────│  Reports         │
                 │──────────────────│
                 │ id (PK)          │
                 │ user_id (FK)     │
                 │ report_type      │
                 │ file_url (S3)    │
                 │ generated_at     │
                 └──────────────────┘

┌──────────────────┐         ┌──────────────────┐
│  AgencyUsers     │1      N │   Customers      │
│──────────────────│─────────│──────────────────│
│ id (PK)          │         │ id (PK)          │
│ email            │         │ agency_id (FK)   │
│ agency_name      │         │ company_name     │
│ cognito_id       │         │ industry         │
└──────────────────┘         │ risk_status      │
                             └────────┬─────────┘
                                      │1
                                      │
                                      │N
                             ┌──────────────────┐
                             │ AgencyPolicies   │
                             │──────────────────│
                             │ id (PK)          │
                             │ customer_id (FK) │
                             │ policy_number    │
                             │ policy_type      │
                             │ insurer          │
                             │ start_date       │
                             │ end_date         │
                             │ status           │
                             │ premium          │
                             └──────────────────┘
```

### 8.2 主要テーブル定義

#### Users（ユーザー）
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    cognito_id VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL, -- 'company', 'agency'
    company_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### InsurancePolicies（保険契約）
```sql
CREATE TABLE insurance_policies (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    policy_type VARCHAR(100) NOT NULL,
    product_name VARCHAR(255),
    company VARCHAR(255),
    policy_number VARCHAR(100) UNIQUE,
    coverage JSONB,
    coverage_amount BIGINT,
    premium BIGINT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    risk_score INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### RiskAssessments（リスク評価）
```sql
CREATE TABLE risk_assessments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    category VARCHAR(100) NOT NULL,
    level INTEGER NOT NULL CHECK (level >= 1 AND level <= 5),
    score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
    assessed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### InventoryData（在庫データ）
```sql
CREATE TABLE inventory_data (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    month DATE NOT NULL,
    total_value BIGINT NOT NULL,
    items_count INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, month)
);
```

#### LeagueMembers（リーグメンバー）
```sql
CREATE TABLE league_members (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) UNIQUE,
    league VARCHAR(50) NOT NULL,
    lp INTEGER DEFAULT 0,
    rank INTEGER,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Reports（レポート）
```sql
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    report_type VARCHAR(50) NOT NULL,
    file_url TEXT NOT NULL,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 9. API設計

### 9.1 API エンドポイント一覧

#### 認証 (Auth)
```
POST   /api/v1/auth/register          # ユーザー登録
POST   /api/v1/auth/login             # ログイン
POST   /api/v1/auth/logout            # ログアウト
POST   /api/v1/auth/refresh           # トークン更新
POST   /api/v1/auth/forgot-password   # パスワードリセット
GET    /api/v1/auth/me                # 現在のユーザー情報
```

#### 保険 (Insurance)
```
GET    /api/v1/insurance/policies                      # 保険契約一覧
GET    /api/v1/insurance/policies/{id}                 # 保険契約詳細
POST   /api/v1/insurance/policies                      # 保険契約登録
PUT    /api/v1/insurance/policies/{id}                 # 保険契約更新
DELETE /api/v1/insurance/policies/{id}                 # 保険契約削除
GET    /api/v1/insurance/policies/{id}/inventory-check # 在庫補償額チェック
GET    /api/v1/insurance/coverage-rate                 # 保険カバレッジ率
```

#### リスク分析 (Risk)
```
GET    /api/v1/risk/dashboard           # リスクダッシュボードデータ
GET    /api/v1/risk/alerts               # 緊急アラート一覧
GET    /api/v1/risk/assessments          # リスク評価一覧
POST   /api/v1/risk/assessments          # リスク評価登録
GET    /api/v1/risk/score                # 総合リスクスコア
GET    /api/v1/risk/recommendations      # 推奨アクション
```

#### リーグ・ギルド (League)
```
GET    /api/v1/league/my-status          # 自分のリーグ状況
GET    /api/v1/league/rankings           # リーグランキング
GET    /api/v1/league/guilds             # ギルド一覧
GET    /api/v1/league/guilds/{id}        # ギルド詳細
POST   /api/v1/league/guilds             # ギルド作成
POST   /api/v1/league/guilds/{id}/join   # ギルド参加
```

#### レポート (Report)
```
GET    /api/v1/reports                   # レポート履歴
POST   /api/v1/reports/comprehensive     # 総合レポート生成
POST   /api/v1/reports/monthly           # 月次レポート生成
GET    /api/v1/reports/{id}              # レポート取得
GET    /api/v1/reports/{id}/download     # レポートダウンロード
```

#### 業務アプリ (Business)
```
GET    /api/v1/business/sales/summary    # 売上サマリー
GET    /api/v1/business/sales/orders     # 受注一覧
GET    /api/v1/business/inventory        # 在庫一覧
GET    /api/v1/business/inventory/history # 在庫推移
GET    /api/v1/business/customers        # 顧客一覧
```

#### 代理店 (Agency)
```
GET    /api/v1/agency/customers               # 顧客一覧
GET    /api/v1/agency/customers/{id}          # 顧客詳細
POST   /api/v1/agency/customers               # 顧客登録
GET    /api/v1/agency/policies                # 証券一覧
GET    /api/v1/agency/policies/{id}           # 証券詳細
POST   /api/v1/agency/policies                # 証券登録
GET    /api/v1/agency/notifications           # 通知一覧
GET    /api/v1/agency/dashboard               # 統計ダッシュボード
```

### 9.2 API レスポンス形式

#### 成功レスポンス
```json
{
  "success": true,
  "data": {
    // データオブジェクト
  },
  "message": "Success"
}
```

#### エラーレスポンス
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "入力内容に誤りがあります",
    "details": [
      {
        "field": "email",
        "message": "有効なメールアドレスを入力してください"
      }
    ]
  }
}
```

### 9.3 認証方式

- **JWT (JSON Web Token)** を使用
- Amazon Cognito から発行されたトークンを使用
- Authorization ヘッダーに Bearer トークンを含める

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 10. セキュリティ要件

### 10.1 認証・認可

1. **Amazon Cognito** を利用したユーザー管理
2. **JWT トークン** による認証（有効期限: 1時間）
3. **リフレッシュトークン** による自動更新（有効期限: 30日）
4. **ロールベースアクセス制御（RBAC）**
   - 企業管理者
   - 企業一般ユーザー
   - 代理店ユーザー

### 10.2 データ保護

1. **通信の暗号化**
   - すべてのHTTPS通信（TLS 1.2以上）
   - CloudFront + ACMによるSSL証明書管理

2. **保存データの暗号化**
   - RDS: AES-256暗号化
   - S3: サーバーサイド暗号化（SSE-S3）
   - Secrets Manager: 認証情報の暗号化保存

3. **個人情報保護**
   - 最小権限の原則
   - データマスキング（ログ出力時）
   - 定期的なデータ削除（退会ユーザー）

### 10.3 脆弱性対策

1. **SQLインジェクション対策**: SQLAlchemy ORM使用
2. **XSS対策**: React の自動エスケープ + Content Security Policy
3. **CSRF対策**: SameSite Cookie + トークン検証
4. **レートリミット**: API Gateway / ALB でのレート制限
5. **DDoS対策**: CloudFront + AWS Shield

### 10.4 監査・ログ

1. **アクセスログ**: CloudWatch Logs
2. **監査ログ**: ユーザーアクション記録（DB）
3. **異常検知**: CloudWatch Alarms
4. **定期的なセキュリティ監査**

---

## 11. 開発計画

### 11.1 開発フェーズ

#### Phase 0: 準備（1週間）
- プロジェクトセットアップ
- リポジトリ作成
- 開発環境構築
- CI/CDパイプライン構築

#### Phase 1: 基盤構築（2-3週間）
- AWS インフラ構築（VPC、RDS、ECS、Cognito）
- 認証機能実装（Cognito連携）
- データベース設計・マイグレーション
- フロントエンド基礎構築（React, Router, MUI）

**成果物:**
- インフラコード（AWS CDK）
- 認証API
- ログイン・ログアウト画面

#### Phase 2: コア機能実装（4-6週間）
- ダッシュボード
- 保険ポートフォリオ管理（一覧、詳細、在庫チェック）
- リスク分析・ダッシュボード（グラフ表示）
- 基本的なレポート機能

**成果物:**
- ダッシュボード画面
- 保険管理画面
- リスク分析画面
- APIエンドポイント（保険、リスク）

#### Phase 3: 高度な機能（3-4週間）
- リーグ・ギルドシステム
- 総合リスクレポート生成
- 業務アプリ連携（販売・在庫・顧客）
- 代理店管理システム

**成果物:**
- リスクブランディング画面
- レポート生成機能
- 業務アプリ画面
- 代理店システム

#### Phase 4: 最適化・テスト（2-3週間）
- パフォーマンス最適化
- セキュリティ監査
- 負荷テスト（JMeter / Locust）
- ユーザーテスト
- バグ修正

**成果物:**
- テストレポート
- パフォーマンスレポート
- リリース版

#### Phase 5: リリース準備（1週間）
- 本番環境デプロイ
- ドキュメント整備
- トレーニング資料作成
- リリース

**合計: 13-18週間（約3-4ヶ月）**

### 11.2 マイルストーン

| マイルストーン | 期間 | 完了条件 |
|--------------|------|---------|
| M0: 準備完了 | Week 1 | リポジトリ作成、CI/CD構築完了 |
| M1: 基盤完了 | Week 4 | 認証、インフラ、DB構築完了 |
| M2: コア機能完了 | Week 10 | ダッシュボード、保険、リスク機能完了 |
| M3: 全機能完了 | Week 14 | リーグ、レポート、代理店機能完了 |
| M4: テスト完了 | Week 17 | 負荷テスト、セキュリティ監査完了 |
| M5: リリース | Week 18 | 本番環境リリース |

### 11.3 チーム構成（推奨）

| ロール | 人数 | 責任範囲 |
|--------|------|---------|
| プロジェクトマネージャー | 1名 | プロジェクト全体管理 |
| フロントエンドエンジニア | 2名 | React開発 |
| バックエンドエンジニア | 2名 | FastAPI開発 |
| インフラエンジニア | 1名 | AWS構築・運用 |
| QAエンジニア | 1名 | テスト・品質管理 |
| UIデザイナー | 1名（兼任可） | UI/UXデザイン |

**合計: 7-8名**

---

## 12. リスクと対策

### 12.1 技術的リスク

| リスク | 影響度 | 発生確率 | 対策 |
|--------|--------|---------|------|
| パフォーマンス不足 | 高 | 中 | 早期負荷テスト、キャッシング戦略 |
| データベース設計ミス | 高 | 中 | 早期ER図レビュー、マイグレーション戦略 |
| AWS コスト超過 | 中 | 高 | コスト監視、予算アラート設定 |
| セキュリティ脆弱性 | 高 | 低 | 定期的なセキュリティ監査、ペネトレーションテスト |

### 12.2 プロジェクトリスク

| リスク | 影響度 | 発生確率 | 対策 |
|--------|--------|---------|------|
| 要件変更 | 中 | 高 | アジャイル開発、スプリント単位での調整 |
| スケジュール遅延 | 高 | 中 | バッファ期間設定、優先度管理 |
| リソース不足 | 高 | 中 | 早期採用、外部委託検討 |
| 技術的負債蓄積 | 中 | 中 | コードレビュー、リファクタリング時間確保 |

### 12.3 ビジネスリスク

| リスク | 影響度 | 発生確率 | 対策 |
|--------|--------|---------|------|
| ユーザー獲得失敗 | 高 | 中 | ユーザーテスト、MVP検証 |
| 競合サービス出現 | 中 | 中 | 差別化機能の強化、迅速な機能追加 |
| 保険業界規制変更 | 中 | 低 | 法務相談、柔軟な設計 |

---

## 13. 成功指標（KPI）

### 13.1 MVP リリース時の目標

| KPI | 目標値 | 測定方法 |
|-----|--------|---------|
| 登録ユーザー数 | 50社以上 | Cognito ユーザー数 |
| 代理店ユーザー数 | 10社以上 | Cognito ユーザー数 |
| 月間アクティブユーザー（MAU） | 30社以上 | CloudWatch / GA4 |
| 保険契約登録数 | 200件以上 | データベース |
| レポート生成数 | 50件以上/月 | データベース |
| システム稼働率 | 99.9%以上 | CloudWatch |
| ページ読み込み時間 | < 2秒 | CloudWatch RUM |
| ユーザー満足度 | 4.0/5.0以上 | アンケート |

### 13.2 ビジネス指標

| 指標 | 説明 |
|-----|------|
| 顧客獲得コスト（CAC） | 1顧客獲得にかかるコスト |
| 顧客生涯価値（LTV） | 1顧客からの総収益 |
| 解約率（Churn Rate） | 月次解約率 < 5% |
| NPS（Net Promoter Score） | 顧客推奨度 > 30 |

### 13.3 技術指標

| 指標 | 目標値 |
|-----|--------|
| APIエラー率 | < 0.1% |
| データベースクエリ時間 | < 100ms (p95) |
| デプロイ頻度 | 週1回以上 |
| 平均復旧時間（MTTR） | < 1時間 |
| テストカバレッジ | > 80% |

---

## 付録

### A. 用語集

| 用語 | 説明 |
|-----|------|
| LP (League Point) | リーグポイント。リスク体制評価に基づいて算出されるポイント |
| リーグ | Bronze～Challengerの7段階の企業ランク |
| ギルド | 複数企業による連合グループ |
| リスクスコア | 総合的なリスク評価値（0～100点） |
| 保険カバレッジ率 | リスクに対する保険カバー率（%） |
| MVP | Minimum Viable Product（実用最小限の製品） |

### B. 参考資料

- AWS Well-Architected Framework
- FastAPI公式ドキュメント: https://fastapi.tiangolo.com/
- React公式ドキュメント: https://react.dev/
- Material-UI: https://mui.com/
- SQLAlchemy: https://www.sqlalchemy.org/

### C. 変更履歴

| 日付 | バージョン | 変更内容 | 作成者 |
|-----|-----------|---------|-------|
| 2025-10-29 | 1.0 | 初版作成 | Risk Lance Team |

---

## 承認

| 役割 | 氏名 | 承認日 | 署名 |
|-----|------|--------|------|
| プロジェクトオーナー |  |  |  |
| 技術責任者 |  |  |  |
| プロダクトマネージャー |  |  |  |

---

**文書ステータス**: Draft
**次回レビュー日**: 2025年11月5日
**最終更新日**: 2025年10月29日
