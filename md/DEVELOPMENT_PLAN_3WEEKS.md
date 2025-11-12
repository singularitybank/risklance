# Risk Lance - 3週間開発計画書

**目的**: 事業計画書提出（3週間後）に向けたプロトタイプ強化
**審査項目**: 資金調達 + PMF（Product-Market Fit）
**作成日**: 2025年10月29日

---

## 🎯 開発方針

### 保険証券データ化は**見送り**
- 理由: 技術的ハードルが高く、3週間では実用レベル到達不可能
- 代替: 手入力でOK。コア価値（リスク分析）に集中

### フォーカスすべき価値
1. ✅ **インテリジェントなギャップ検出** - 競合優位性
2. ✅ **具体的な推奨アクション** - 実用性
3. ✅ **収益モデルの明確化** - 代理店向け機能
4. ✅ **ネットワーク効果** - 取引先向けレポート

---

## 📅 3週間スケジュール

### Week 1: コア価値の実装（Day 1-7）

| 日 | タスク | 成果物 | 工数 |
|----|-------|--------|------|
| **Day 1-2** | 保険ギャップ検出（在庫） | 在庫vs補償チェック機能 | 2日 |
| **Day 3** | 保険ギャップ検出（売上vs賠償） | 賠償責任チェック機能 | 1日 |
| **Day 4-5** | リアルタイムダッシュボード | インタラクティブUI | 2日 |
| **Day 6-7** | 推奨アクションエンジン | 具体的提案表示 | 2日 |

**マイルストーン**: コア機能が動作、デモ可能な状態

---

### Week 2: 差別化 + 収益モデル（Day 8-14）

| 日 | タスク | 成果物 | 工数 |
|----|-------|--------|------|
| **Day 8-9** | 代理店ダッシュボード（簡易版） | 顧客リスク一覧 | 2日 |
| **Day 10-11** | 提案機会自動検出 | 代理店向け提案リスト | 2日 |
| **Day 12-13** | 取引先向けレポート | 信頼性証明レポート | 2日 |
| **Day 14** | 統合テスト + データ作成 | リアルなデモデータ | 1日 |

**マイルストーン**: 収益モデルが見える、差別化ポイントが明確

---

### Week 3: プレゼン準備（Day 15-21）

| 日 | タスク | 成果物 | 工数 |
|----|-------|--------|------|
| **Day 15-16** | デモシナリオ作成 | ストーリーボード | 2日 |
| **Day 17** | デモ動画撮影・編集 | 5分デモ動画 | 1日 |
| **Day 18** | プレゼン資料（技術面） | 技術説明スライド | 1日 |
| **Day 19** | プレゼン資料（ビジネス面） | ビジネスモデル説明 | 1日 |
| **Day 20** | リハーサル×2回 | フィードバック反映 | 1日 |
| **Day 21** | 最終調整 | 本番準備完了 | 1日 |

**マイルストーン**: 事業計画書提出準備完了

---

## 🔧 優先機能の詳細仕様

### 🥇 機能1: インテリジェント保険ギャップ検出エンジン

**目的:**
- PMF証明: 顧客の最大の痛み「保険の過不足」を解決
- 資金調達: 競合優位性を明確に示す

**実装内容:**

```javascript
// js/insurance-gap-detector.js (新規作成)

class IntelligentGapDetector {
    constructor() {
        this.dataManager = window.dataManager;
        this.insuranceManager = window.insuranceManager;
    }

    // 1. 在庫金額チェック（既存機能を強化）
    detectInventoryGap() {
        const inventoryData = this.dataManager.getInventoryData();
        const fireInsurance = this.insuranceManager.policyData['1']; // 火災保険

        // 過去3ヶ月の在庫推移を取得
        const recentMonths = inventoryData.monthlyValueHistory.slice(-3);
        const threshold = 80000000; // 8,000万円

        // 全ての月で8,000万円以上かチェック
        const allMonthsExceedThreshold = recentMonths.every(
            month => month.value >= threshold
        );

        if (allMonthsExceedThreshold) {
            const currentValue = recentMonths[recentMonths.length - 1].value;
            const coverageAmount = fireInsurance.inventoryCoverageAmount;
            const gap = currentValue - coverageAmount;

            return {
                hasGap: gap > 0,
                category: "在庫補償不足",
                currentValue: currentValue,
                coverageAmount: coverageAmount,
                gap: gap,
                urgency: "high",
                recommendation: {
                    title: "火災保険の補償額増額を推奨",
                    action: `商品・製品の補償額を${this.formatCurrency(currentValue)}に増額`,
                    estimatedCost: "月額 +2万円（推定）",
                    expectedBenefit: `万が一の際の損失リスク${this.formatCurrency(gap)}をカバー`,
                    roi: `年間24万円の追加保険料で${this.formatCurrency(gap)}のリスクを削減`
                }
            };
        }

        return { hasGap: false };
    }

    // 2. 売上規模 vs 賠償責任保険（NEW）
    detectLiabilityGap() {
        const salesData = this.dataManager.getSalesData();
        const liabilityPolicy = this.insuranceManager.policyData['2']; // 賠償責任保険

        // 年間売上を推定（月次データから）
        const annualRevenue = salesData.monthlySales * 12;

        // 推奨: 年間売上の10%程度の賠償保険
        const recommendedCoverage = annualRevenue * 0.1;
        const currentCoverage = this.parseCurrency(liabilityPolicy.coverage.personalInjury);

        const gap = recommendedCoverage - currentCoverage;

        if (gap > 0) {
            return {
                hasGap: true,
                category: "賠償責任保険不足",
                annualRevenue: annualRevenue,
                currentCoverage: currentCoverage,
                recommendedCoverage: recommendedCoverage,
                gap: gap,
                urgency: "medium",
                recommendation: {
                    title: "賠償責任保険の補償額見直しを推奨",
                    action: `対人・対物賠償額を${this.formatCurrency(recommendedCoverage)}に増額`,
                    reason: `年間売上${this.formatCurrency(annualRevenue)}に対して補償が不足`,
                    estimatedCost: "月額 +1.5万円（推定）",
                    expectedBenefit: "製造物責任や業務過誤による賠償リスクをカバー"
                }
            };
        }

        return { hasGap: false };
    }

    // 3. 従業員数 vs 労災保険（NEW）
    detectWorkersCompGap() {
        const employeeData = this.dataManager.getEmployeeData();
        const wcPolicy = this.insuranceManager.policyData['3']; // 労災保険

        const employeeCount = employeeData.totalCount;
        const perEmployeeCoverage = 50000000; // 1人あたり5,000万円推奨
        const recommendedCoverage = employeeCount * perEmployeeCoverage;
        const currentCoverage = this.parseCurrency(wcPolicy.coverage.death);

        const gap = recommendedCoverage - currentCoverage;

        if (gap > 0) {
            return {
                hasGap: true,
                category: "労災補償不足",
                employeeCount: employeeCount,
                currentCoverage: currentCoverage,
                recommendedCoverage: recommendedCoverage,
                gap: gap,
                urgency: "medium",
                recommendation: {
                    title: "労災上乗せ保険の補償額増額を推奨",
                    action: `死亡・後遺障害補償を${this.formatCurrency(recommendedCoverage)}に増額`,
                    reason: `従業員${employeeCount}名に対して1人あたり5,000万円の補償が標準`,
                    estimatedCost: "月額 +1万円（推定）",
                    expectedBenefit: "従業員の安全と企業の責任を守る"
                }
            };
        }

        return { hasGap: false };
    }

    // 4. 総合ギャップ分析
    analyzeAllGaps() {
        const gaps = [];

        const inventoryGap = this.detectInventoryGap();
        if (inventoryGap.hasGap) gaps.push(inventoryGap);

        const liabilityGap = this.detectLiabilityGap();
        if (liabilityGap.hasGap) gaps.push(liabilityGap);

        const wcGap = this.detectWorkersCompGap();
        if (wcGap.hasGap) gaps.push(wcGap);

        // 緊急度でソート
        gaps.sort((a, b) => {
            const urgencyOrder = { high: 0, medium: 1, low: 2 };
            return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
        });

        return {
            totalGaps: gaps.length,
            gaps: gaps,
            totalGapAmount: gaps.reduce((sum, gap) => sum + gap.gap, 0),
            riskScoreImpact: this.calculateRiskScoreImpact(gaps)
        };
    }

    // リスクスコアへの影響計算
    calculateRiskScoreImpact(gaps) {
        // ギャップがない場合のスコア向上
        const currentScore = 67; // 現在のリスクスコア
        const potentialImprovement = gaps.length * 6; // 1件解決で+6点
        return {
            current: currentScore,
            potential: Math.min(currentScore + potentialImprovement, 100),
            improvement: potentialImprovement
        };
    }

    // ヘルパー関数
    formatCurrency(amount) {
        return `¥${(amount / 10000).toLocaleString()}万円`;
    }

    parseCurrency(coverageString) {
        // "1億円/1事故" -> 100000000
        const match = coverageString.match(/(\d+)億円/);
        if (match) {
            return parseInt(match[1]) * 100000000;
        }
        return 0;
    }
}

// グローバルインスタンス作成
window.gapDetector = new IntelligentGapDetector();
```

**デモシナリオ:**
```
【画面1】ダッシュボード
→ 「⚠️ 警告: 3件の保険ギャップを検出しました」
→ クリック

【画面2】ギャップ詳細
┌─────────────────────────────────────────┐
│ 🔴 【緊急】在庫補償不足                  │
│                                         │
│ 現在の在庫金額: ¥9,500万円              │
│ 現在の補償金額: ¥5,000万円              │
│ 不足額: ¥4,500万円                      │
│                                         │
│ 💡 推奨アクション                        │
│ 火災保険の補償額を¥9,500万円に増額      │
│                                         │
│ 推定追加コスト: 月額 +2万円             │
│ 期待効果: 損失リスク¥4,500万円をカバー  │
│ ROI: 年間24万円で¥4,500万円を保護       │
│                                         │
│ [今すぐ相談する] [後で確認]             │
└─────────────────────────────────────────┘
```

---

### 🥈 機能2: リアルタイムリスクダッシュボード

**目的:**
- PMF証明: 第一印象で「これは便利だ！」と感じさせる
- 資金調達: UI/UXの完成度を示す

**実装内容:**

```javascript
// js/enhanced-dashboard.js (新規作成)

class EnhancedDashboard {
    constructor() {
        this.gapDetector = window.gapDetector;
        this.updateInterval = null;
    }

    // ダッシュボード初期化
    initialize() {
        this.renderRiskScore();
        this.renderGapAlerts();
        this.renderQuickStats();
        this.startRealTimeUpdates();
    }

    // 総合リスクスコア表示
    renderRiskScore() {
        const gapAnalysis = this.gapDetector.analyzeAllGaps();
        const score = gapAnalysis.riskScoreImpact.current;

        const scoreContainer = document.getElementById('risk-score-display');

        // 大きな円形ゲージ
        const scoreColor = score >= 80 ? '#4caf50' : score >= 60 ? '#ff9800' : '#f44336';

        scoreContainer.innerHTML = `
            <div class="risk-score-gauge">
                <svg width="200" height="200" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#e0e0e0" stroke-width="20"/>
                    <circle cx="100" cy="100" r="80" fill="none" stroke="${scoreColor}"
                            stroke-width="20" stroke-dasharray="${score * 5.03} 503"
                            stroke-linecap="round" transform="rotate(-90 100 100)"
                            class="score-circle-animated"/>
                </svg>
                <div class="score-number">${score}<span class="score-suffix">点</span></div>
                <div class="score-label">リスクスコア</div>
            </div>

            <div class="score-improvement">
                <i class="fas fa-arrow-up"></i>
                対策実行で <strong>+${gapAnalysis.riskScoreImpact.improvement}点</strong> 向上可能
            </div>
        `;
    }

    // ギャップアラート表示
    renderGapAlerts() {
        const gapAnalysis = this.gapDetector.analyzeAllGaps();
        const alertContainer = document.getElementById('gap-alerts-container');

        if (gapAnalysis.totalGaps === 0) {
            alertContainer.innerHTML = `
                <div class="no-gaps-message">
                    <i class="fas fa-check-circle"></i>
                    <p>保険ギャップは検出されませんでした</p>
                </div>
            `;
            return;
        }

        alertContainer.innerHTML = `
            <div class="gaps-summary">
                <div class="gaps-count">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span class="count">${gapAnalysis.totalGaps}</span>
                    <span class="label">件の保険ギャップ</span>
                </div>
                <div class="gaps-amount">
                    総不足額: <strong>${this.formatCurrency(gapAnalysis.totalGapAmount)}</strong>
                </div>
            </div>

            <div class="gaps-list">
                ${gapAnalysis.gaps.map(gap => this.renderGapItem(gap)).join('')}
            </div>
        `;
    }

    // 個別ギャップアイテム
    renderGapItem(gap) {
        const urgencyClass = gap.urgency === 'high' ? 'urgent' : 'warning';
        const urgencyIcon = gap.urgency === 'high' ? '🔴' : '🟡';

        return `
            <div class="gap-item ${urgencyClass}" data-category="${gap.category}">
                <div class="gap-header">
                    <span class="urgency-icon">${urgencyIcon}</span>
                    <h4>${gap.category}</h4>
                </div>
                <div class="gap-details">
                    <div class="gap-amount">
                        不足額: <strong>${this.formatCurrency(gap.gap)}</strong>
                    </div>
                    <div class="gap-recommendation">
                        ${gap.recommendation.title}
                    </div>
                </div>
                <button class="view-detail-btn" onclick="viewGapDetail('${gap.category}')">
                    詳細を見る <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
    }

    // クイック統計
    renderQuickStats() {
        const statsContainer = document.getElementById('quick-stats');

        statsContainer.innerHTML = `
            <div class="stat-item">
                <i class="fas fa-shield-alt"></i>
                <div class="stat-value">94%</div>
                <div class="stat-label">保険カバレッジ率</div>
            </div>
            <div class="stat-item">
                <i class="fas fa-file-contract"></i>
                <div class="stat-value">3件</div>
                <div class="stat-label">有効保険契約</div>
            </div>
            <div class="stat-item">
                <i class="fas fa-exclamation-circle"></i>
                <div class="stat-value" id="alert-count">3件</div>
                <div class="stat-label">要対応アラート</div>
            </div>
        `;
    }

    // リアルタイム更新シミュレーション
    startRealTimeUpdates() {
        // 30秒ごとにアニメーション
        this.updateInterval = setInterval(() => {
            this.animateScoreUpdate();
        }, 30000);
    }

    animateScoreUpdate() {
        // スコアの微細な変動をシミュレート
        const scoreElement = document.querySelector('.score-number');
        if (scoreElement) {
            scoreElement.classList.add('pulse-animation');
            setTimeout(() => {
                scoreElement.classList.remove('pulse-animation');
            }, 1000);
        }
    }

    // ヘルパー
    formatCurrency(amount) {
        return `¥${(amount / 10000).toLocaleString()}万円`;
    }
}

// グローバルインスタンス
window.enhancedDashboard = new EnhancedDashboard();
```

**CSS追加:**

```css
/* css/enhanced-dashboard.css (新規作成) */

.risk-score-gauge {
    position: relative;
    text-align: center;
    margin: 20px auto;
}

.score-circle-animated {
    transition: stroke-dasharray 1s ease-in-out;
}

.score-number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 48px;
    font-weight: bold;
    color: #333;
}

.score-suffix {
    font-size: 24px;
    color: #666;
}

.score-label {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
}

.pulse-animation {
    animation: pulse 1s ease-in-out;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.gaps-summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: linear-gradient(135deg, #fff3cd, #fff8e1);
    border-radius: 10px;
    margin-bottom: 20px;
    border-left: 4px solid #ff9800;
}

.gaps-count {
    display: flex;
    align-items: center;
    gap: 10px;
}

.gaps-count .count {
    font-size: 36px;
    font-weight: bold;
    color: #f57c00;
}

.gap-item {
    background: white;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 15px;
    border-left: 4px solid #ff9800;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.2s, box-shadow 0.2s;
}

.gap-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.gap-item.urgent {
    border-left-color: #f44336;
    background: linear-gradient(to right, #ffebee, white);
}

.view-detail-btn {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s;
}

.view-detail-btn:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
```

---

### 🥉 機能3: 具体的な推奨アクションエンジン

**実装内容:**

```javascript
// js/recommendation-engine.js (新規作成)

class RecommendationEngine {
    constructor() {
        this.gapDetector = window.gapDetector;
    }

    // 推奨アクション生成
    generateRecommendations() {
        const gapAnalysis = this.gapDetector.analyzeAllGaps();
        const recommendations = [];

        // ギャップベースの推奨
        gapAnalysis.gaps.forEach(gap => {
            recommendations.push({
                id: `gap-${gap.category}`,
                priority: gap.urgency,
                category: "保険見直し",
                title: gap.recommendation.title,
                description: gap.recommendation.reason || '',
                action: gap.recommendation.action,
                estimatedCost: gap.recommendation.estimatedCost,
                expectedBenefit: gap.recommendation.expectedBenefit,
                roi: gap.recommendation.roi,
                nextSteps: this.generateNextSteps(gap),
                impact: {
                    riskReduction: gap.gap,
                    scoreImprovement: 6
                }
            });
        });

        // リスクスコア改善の推奨
        if (gapAnalysis.riskScoreImpact.current < 80) {
            recommendations.push({
                id: 'improve-risk-score',
                priority: 'medium',
                category: "リスク管理強化",
                title: "リスク体制の総合的改善",
                description: `現在のリスクスコアは${gapAnalysis.riskScoreImpact.current}点です`,
                action: "BCP策定、情報セキュリティ対策、コンプライアンス強化",
                expectedBenefit: `リスクスコア${gapAnalysis.riskScoreImpact.potential}点達成でゴールドリーグ昇格`,
                nextSteps: [
                    { text: "BCPテンプレートをダウンロード（無料）", action: "download-bcp" },
                    { text: "リスク管理コンサルに相談（有料）", action: "consult" }
                ]
            });
        }

        return this.prioritizeRecommendations(recommendations);
    }

    // 次のステップ生成
    generateNextSteps(gap) {
        const steps = [
            {
                text: "提携代理店に相談（無料）",
                action: "contact-agent",
                icon: "fa-phone"
            },
            {
                text: "複数社の見積もりを比較",
                action: "compare-quotes",
                icon: "fa-balance-scale"
            }
        ];

        if (gap.urgency === 'high') {
            steps.unshift({
                text: "🔴 今すぐ対応を推奨",
                action: "urgent-action",
                icon: "fa-exclamation-triangle"
            });
        }

        return steps;
    }

    // 優先順位付け
    prioritizeRecommendations(recommendations) {
        const priorityOrder = { high: 0, medium: 1, low: 2 };

        return recommendations.sort((a, b) => {
            // 優先度でソート
            const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
            if (priorityDiff !== 0) return priorityDiff;

            // 同じ優先度なら影響度でソート
            return (b.impact?.riskReduction || 0) - (a.impact?.riskReduction || 0);
        });
    }

    // 推奨アクション表示
    renderRecommendations(containerId) {
        const recommendations = this.generateRecommendations();
        const container = document.getElementById(containerId);

        container.innerHTML = `
            <div class="recommendations-header">
                <h3>推奨アクション（${recommendations.length}件）</h3>
                <p>リスクを低減し、ビジネスを守るための具体的な対策</p>
            </div>

            <div class="recommendations-list">
                ${recommendations.map(rec => this.renderRecommendationCard(rec)).join('')}
            </div>
        `;
    }

    // 推奨カード
    renderRecommendationCard(recommendation) {
        const priorityClass = {
            high: 'priority-high',
            medium: 'priority-medium',
            low: 'priority-low'
        }[recommendation.priority];

        const priorityLabel = {
            high: '🔴 緊急',
            medium: '🟡 推奨',
            low: '🟢 任意'
        }[recommendation.priority];

        return `
            <div class="recommendation-card ${priorityClass}">
                <div class="rec-header">
                    <span class="rec-priority">${priorityLabel}</span>
                    <span class="rec-category">${recommendation.category}</span>
                </div>

                <h4 class="rec-title">${recommendation.title}</h4>

                ${recommendation.description ? `
                    <p class="rec-description">${recommendation.description}</p>
                ` : ''}

                <div class="rec-details">
                    <div class="rec-detail-item">
                        <i class="fas fa-tasks"></i>
                        <div>
                            <strong>対応策</strong>
                            <p>${recommendation.action}</p>
                        </div>
                    </div>

                    ${recommendation.estimatedCost ? `
                        <div class="rec-detail-item">
                            <i class="fas fa-yen-sign"></i>
                            <div>
                                <strong>推定コスト</strong>
                                <p>${recommendation.estimatedCost}</p>
                            </div>
                        </div>
                    ` : ''}

                    <div class="rec-detail-item">
                        <i class="fas fa-chart-line"></i>
                        <div>
                            <strong>期待効果</strong>
                            <p>${recommendation.expectedBenefit}</p>
                        </div>
                    </div>

                    ${recommendation.roi ? `
                        <div class="rec-detail-item highlight">
                            <i class="fas fa-calculator"></i>
                            <div>
                                <strong>ROI（投資対効果）</strong>
                                <p>${recommendation.roi}</p>
                            </div>
                        </div>
                    ` : ''}
                </div>

                <div class="rec-actions">
                    <h5>次のステップ</h5>
                    <div class="next-steps">
                        ${recommendation.nextSteps.map(step => `
                            <button class="next-step-btn" onclick="executeAction('${step.action}')">
                                <i class="fas ${step.icon}"></i>
                                ${step.text}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
}

// グローバルインスタンス
window.recommendationEngine = new RecommendationEngine();

// アクション実行
function executeAction(actionType) {
    switch(actionType) {
        case 'contact-agent':
            alert('提携代理店への相談フォームを開きます（実装予定）');
            // TODO: 代理店連絡フォームモーダルを表示
            break;
        case 'compare-quotes':
            alert('見積もり比較機能は開発中です');
            break;
        case 'urgent-action':
            alert('緊急対応窓口に接続します（実装予定）');
            break;
        case 'download-bcp':
            alert('BCPテンプレートをダウンロードします（実装予定）');
            break;
        case 'consult':
            alert('コンサルタント紹介フォームを開きます（実装予定）');
            break;
    }
}
```

---

## 🎬 デモシナリオ（完全版）

### Part 1: 問題提起（1分）

**画面**: 中小企業のオフィス映像

**ナレーション:**
```
「日本には380万社の中小企業があります。
 その多くが、自社の保険が適切か分かりません。

例えば、製造業のA社。
在庫が9,500万円あるのに、
火災保険の補償は5,000万円しかありません。

万が一の火災で、4,500万円の損失が
補償されないリスクがあります。

しかし、A社の社長は気づいていません。
保険証券を見ても、何が不足しているか
分からないからです。

これが、中小企業が直面する
リアルな課題です。」
```

---

### Part 2: Risk Lanceのデモ（3分）

#### シーン1: ログイン → ダッシュボード（30秒）

**操作**: ログイン → ダッシュボード表示

**画面表示:**
```
┌─────────────────────────────────────┐
│      リスクスコア: 67点            │
│         ━━━━━━━━━━━━              │
│         🟡 改善の余地あり          │
│                                    │
│   ⚠️ 緊急対応: 3件                │
│   保険カバレッジ率: 78%            │
└─────────────────────────────────────┘
```

**ナレーション:**
```
「Risk Lanceにログインすると、
 企業のリスク状況が一目で分かります。

リスクスコアは67点。
3件の緊急対応が必要なアラートがあります。

では、何が問題なのか見てみましょう。」
```

---

#### シーン2: 保険ギャップ詳細（1分）

**操作**: アラートをクリック → 詳細表示

**画面表示:**
```
┌─────────────────────────────────────────┐
│ 🔴 【緊急】在庫補償不足                  │
│                                         │
│ 現在の在庫金額: ¥9,500万円              │
│ 現在の補償金額: ¥5,000万円              │
│ 不足額: ¥4,500万円                      │
│                                         │
│ [過去3ヶ月の在庫推移グラフ]             │
│  9月: 8,500万円                         │
│ 10月: 9,200万円                         │
│ 11月: 9,500万円 ← 継続的に増加         │
│                                         │
│ 💡 推奨アクション                        │
│ 火災保険の商品・製品補償額を             │
│ ¥9,500万円に増額することを推奨します    │
│                                         │
│ 推定追加コスト: 月額 +2万円             │
│ 期待効果: 損失リスク¥4,500万円をカバー  │
│ ROI: 年間24万円で¥4,500万円を保護       │
│                                         │
│ [今すぐ相談する] [詳細を見る]           │
└─────────────────────────────────────────┘
```

**ナレーション:**
```
「Risk Lanceは、業務データと保険データを
 自動で照合します。

在庫が3ヶ月連続で8,000万円を超えているのに、
火災保険の補償は5,000万円しかありません。

4,500万円のギャップがあります。

そして、具体的にどうすればいいか、
推奨アクションを表示します。

補償額を増やすコストは月額2万円。
これで4,500万円のリスクをカバーできます。

投資対効果も明確です。」
```

---

#### シーン3: 推奨アクション一覧（40秒）

**操作**: 推奨アクション画面へ遷移

**画面表示:**
```
┌─────────────────────────────────────────┐
│  推奨アクション（3件）                   │
├─────────────────────────────────────────┤
│ 🔴 【緊急】火災保険の補償額増額          │
│   コスト: 月額+2万円                    │
│   効果: リスク¥4,500万円をカバー         │
│   [提携代理店に相談（無料）]             │
│                                         │
│ 🟡 【推奨】賠償責任保険の見直し          │
│   売上30億円に対して補償1億円と不足      │
│   [見積もり比較]                        │
│                                         │
│ 🟡 【推奨】BCP（事業継続計画）策定       │
│   効果: リスクスコア +8点               │
│   [BCPテンプレートDL（無料）]            │
└─────────────────────────────────────────┘
```

**ナレーション:**
```
「Risk Lanceは、優先順位をつけて
 具体的なアクションを提案します。

何をすればいいか、一目で分かります。

そして、そのまま代理店に相談したり、
見積もりを比較したりできます。

企業は迷わず、適切な対策を
実行できるのです。」
```

---

#### シーン4: 代理店側の画面（40秒）

**操作**: 代理店ログイン → ダッシュボード

**画面表示:**
```
┌─────────────────────────────────────────┐
│  代理店ダッシュボード                    │
│  山田代理店                             │
├─────────────────────────────────────────┤
│  管理顧客: 47社                         │
│  今月の提案機会: 5社                    │
│  想定手数料: ¥500,000                   │
│                                         │
│  【要対応顧客】                          │
│  ┌─────────────────────┐             │
│  │ ABC商事                │             │
│  │ リスクスコア: 67点      │             │
│  │ ⚠️ 要対応: 3件         │             │
│  │ [詳細] [提案書生成]    │             │
│  └─────────────────────┘             │
└─────────────────────────────────────────┘
```

**ナレーション:**
```
「代理店側では、顧客のリスク状況を
 リアルタイムで把握できます。

ABC商事に3件のアラート。
これは提案のチャンスです。

Risk Lanceが自動で提案内容を生成するので、
代理店はそのまま顧客に提示できます。

これまで気づけなかった提案機会を、
Risk Lanceが発見するのです。

代理店の収益向上にも貢献します。」
```

---

#### シーン5: 取引先向けレポート（30秒）

**操作**: レポート生成 → プレビュー

**画面表示:**
```
┌─────────────────────────────────────────┐
│  信頼性レポート                          │
│  株式会社テックソリューションズ          │
├─────────────────────────────────────────┤
│  総合リスクスコア: 87点                  │
│  🥇 ゴールドリーグ（8位/150社）         │
│                                         │
│  保険カバレッジ率: 94%                  │
│  認証: ISO 27001, ISO 22301             │
│                                         │
│  ✅ Risk Lance 認証企業                 │
│  ✅ リスク管理体制: 業界最高水準         │
│                                         │
│  発行日: 2025年10月29日                 │
└─────────────────────────────────────────┘
```

**ナレーション:**
```
「さらに、企業は自社の信頼性を
 取引先に証明できます。

Risk Lanceが発行する信頼性レポート。

リスクスコア、保険カバレッジ、
認証情報などが記載されています。

取引先は、この企業が適切な
リスク管理をしていることを確認できます。

これが企業の競争力になります。

そして、このレポートを見た取引先が
Risk Lanceに興味を持つ。

ネットワーク効果で広がっていきます。」
```

---

### Part 3: ビジネスモデル（1分）

**スライド表示 + ナレーション:**

```
【スライド1: 収益モデル】

1. SaaS: 企業向け月額課金
   ベーシック: ¥9,800/月
   プレミアム: ¥29,800/月

2. 代理店手数料: 保険成約時 5-10%

3. プレミアム機能: 高度なレポート、コンサル

【スライド2: 市場規模】

TAM: 中小企業380万社 × ¥3万/年 = 1,140億円
SAM: 従業員10名以上 × 50% = 300億円
SOM(3年後): 5,000社 × ¥30万/年 = 15億円

【スライド3: 競合優位性】

従来:
- 証券の保管・管理のみ
- 代理店依存の提案

Risk Lance:
✅ インテリジェントなギャップ検出
✅ 具体的な推奨アクション
✅ 信頼性の可視化
✅ ネットワーク効果

【スライド4: トラクション】

ヒアリング: 30社実施
「使いたい」: 24社（80%）
PoC参加予定: 5社
代理店提携交渉: 3社
```

**ナレーション:**
```
「Risk Lanceのビジネスモデルは明確です。

企業からの月額課金と、
代理店経由の手数料。

市場規模は1,000億円以上。

従来の保険管理システムとの違いは、
インテリジェントな分析と提案。

そして、既に30社にヒアリングを実施。
80%が『使いたい』と回答しています。

これが、Risk Lanceです。」
```

---

## ✅ チェックリスト

### Week 1 完了時（Day 7）
- [ ] 保険ギャップ検出エンジン実装完了
- [ ] リアルタイムダッシュボード実装完了
- [ ] 推奨アクションエンジン実装完了
- [ ] デモ用データ作成完了
- [ ] 基本動作確認完了

### Week 2 完了時（Day 14）
- [ ] 代理店ダッシュボード実装完了
- [ ] 提案機会自動検出実装完了
- [ ] 取引先向けレポート実装完了
- [ ] 全機能の統合完了
- [ ] 統合テスト完了

### Week 3 完了時（Day 21）
- [ ] デモシナリオ完成
- [ ] デモ動画撮影・編集完了
- [ ] プレゼン資料完成
- [ ] リハーサル3回実施
- [ ] バックアッププラン準備完了
- [ ] 事業計画書提出準備完了

---

## 📞 緊急連絡先・リソース

### 技術サポート
- GitHub Issues: （リポジトリURL）
- 開発チャット: （Slack/Discord）

### 参考資料
- AWS ドキュメント
- FastAPI 公式ドキュメント
- React 公式ドキュメント

---

**最終更新**: 2025年10月29日
**次回レビュー**: 2025年11月5日（Week 1完了時）
