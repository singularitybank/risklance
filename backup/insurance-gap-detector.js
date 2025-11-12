// Risk Lance - インテリジェント保険ギャップ検出エンジン
// 目的: 業務データと保険データを照合し、保険の過不足を自動検出

class IntelligentGapDetector {
    constructor() {
        this.dataManager = window.dataManager;

        // insuranceManagerが存在しない場合は、保険データを直接定義
        if (window.insuranceManager) {
            this.insuranceManager = window.insuranceManager;
        } else {
            // 保険データを直接定義
            this.insuranceManager = {
                policyData: {
                    '1': {
                        id: '1',
                        type: '火災保険',
                        inventoryCoverageAmount: 50000000 // 5,000万円
                    },
                    '2': {
                        id: '2',
                        type: '賠償責任保険',
                        coverage: {
                            personalInjury: '1億円/1事故'
                        }
                    },
                    '3': {
                        id: '3',
                        type: '労災保険',
                        coverage: {
                            death: '5,000万円/1名'
                        }
                    }
                }
            };
        }
    }

    /**
     * 1. 在庫金額チェック（最優先機能）
     * 過去3ヶ月連続で在庫が8,000万円を超えている場合、
     * 火災保険の補償額と比較してギャップを検出
     */
    detectInventoryGap() {
        try {
            // dataManagerの存在確認
            if (!this.dataManager) {
                console.warn('DataManagerが初期化されていません');
                return { hasGap: false };
            }

            // insuranceManagerの存在確認
            if (!this.insuranceManager || !this.insuranceManager.policyData) {
                console.warn('InsuranceManagerが初期化されていません');
                return { hasGap: false };
            }

            const inventoryData = this.dataManager.getInventoryData();
            const fireInsurance = this.insuranceManager.policyData['1']; // 火災保険

            if (!inventoryData || !fireInsurance) {
                console.warn('在庫データまたは火災保険データが見つかりません');
                return { hasGap: false };
            }

            // 過去3ヶ月の在庫推移を取得
            const monthlyHistory = inventoryData.monthlyValueHistory || [];
            const recentMonths = monthlyHistory.slice(-3);

            if (recentMonths.length < 3) {
                console.warn('在庫データが3ヶ月分未満です');
                return { hasGap: false };
            }

            const threshold = 80000000; // 8,000万円

            // 全ての月で8,000万円以上かチェック
            const allMonthsExceedThreshold = recentMonths.every(
                month => month.value >= threshold
            );

            if (allMonthsExceedThreshold) {
                const currentValue = recentMonths[recentMonths.length - 1].value;
                const coverageAmount = fireInsurance.inventoryCoverageAmount || 50000000;
                const gap = currentValue - coverageAmount;

                if (gap > 0) {
                    return {
                        hasGap: true,
                        category: "在庫補償不足",
                        urgency: "high",
                        currentValue: currentValue,
                        coverageAmount: coverageAmount,
                        gap: gap,
                        monthlyData: recentMonths,
                        recommendation: {
                            title: "火災保険の補償額増額を推奨",
                            action: `商品・製品の補償額を${this.formatCurrency(currentValue)}に増額`,
                            reason: `在庫金額が過去3ヶ月連続で${this.formatCurrency(threshold)}を超えています`,
                            estimatedCost: "月額 +2万円（推定）",
                            expectedBenefit: `万が一の際の損失リスク${this.formatCurrency(gap)}をカバー`,
                            roi: `年間24万円の追加保険料で${this.formatCurrency(gap)}のリスクを削減`
                        }
                    };
                }
            }

            return { hasGap: false };
        } catch (error) {
            console.error('在庫ギャップ検出でエラー:', error);
            return { hasGap: false, error: error.message };
        }
    }

    /**
     * 2. 売上規模 vs 賠償責任保険
     * 年間売上の10%程度の賠償保険が推奨される
     */
    detectLiabilityGap() {
        try {
            // dataManagerの存在確認
            if (!this.dataManager) {
                console.warn('DataManagerが初期化されていません');
                return { hasGap: false };
            }

            // insuranceManagerの存在確認
            if (!this.insuranceManager || !this.insuranceManager.policyData) {
                console.warn('InsuranceManagerが初期化されていません');
                return { hasGap: false };
            }

            const salesData = this.dataManager.getSalesData();
            const liabilityPolicy = this.insuranceManager.policyData['2']; // 賠償責任保険

            if (!salesData || !liabilityPolicy) {
                return { hasGap: false };
            }

            // 年間売上を推定（月次データから）
            const monthlySales = salesData.monthlySales || 250000000; // 2.5億円/月
            const annualRevenue = monthlySales * 12;

            // 推奨: 年間売上の10%程度の賠償保険
            const recommendedCoverage = annualRevenue * 0.1;

            // 現在の補償額を取得（文字列から数値に変換）
            const currentCoverage = this.parseCurrency(liabilityPolicy.coverage.personalInjury);

            const gap = recommendedCoverage - currentCoverage;

            if (gap > 0) {
                return {
                    hasGap: true,
                    category: "賠償責任保険不足",
                    urgency: "medium",
                    annualRevenue: annualRevenue,
                    currentCoverage: currentCoverage,
                    recommendedCoverage: recommendedCoverage,
                    gap: gap,
                    recommendation: {
                        title: "賠償責任保険の補償額見直しを推奨",
                        action: `対人・対物賠償額を${this.formatCurrency(recommendedCoverage)}に増額`,
                        reason: `年間売上${this.formatCurrency(annualRevenue)}に対して補償が不足しています`,
                        estimatedCost: "月額 +1.5万円（推定）",
                        expectedBenefit: "製造物責任や業務過誤による賠償リスクをカバー"
                    }
                };
            }

            return { hasGap: false };
        } catch (error) {
            console.error('賠償責任ギャップ検出でエラー:', error);
            return { hasGap: false, error: error.message };
        }
    }

    /**
     * 3. 従業員数 vs 労災保険
     * 従業員1人あたり5,000万円の補償が推奨される
     */
    detectWorkersCompGap() {
        try {
            // dataManagerの存在確認
            if (!this.dataManager) {
                console.warn('DataManagerが初期化されていません');
                return { hasGap: false };
            }

            // insuranceManagerの存在確認
            if (!this.insuranceManager || !this.insuranceManager.policyData) {
                console.warn('InsuranceManagerが初期化されていません');
                return { hasGap: false };
            }

            // データマネージャーから従業員データを取得
            const employeeData = this.dataManager.data?.employeeData || { totalCount: 50 };
            const wcPolicy = this.insuranceManager.policyData['3']; // 労災保険

            if (!wcPolicy) {
                return { hasGap: false };
            }

            const employeeCount = employeeData.totalCount || 50;
            const perEmployeeCoverage = 50000000; // 1人あたり5,000万円推奨
            const recommendedCoverage = employeeCount * perEmployeeCoverage;

            // 現在の補償額を取得
            const currentCoverage = this.parseCurrency(wcPolicy.coverage.death);

            const gap = recommendedCoverage - currentCoverage;

            if (gap > 0) {
                return {
                    hasGap: true,
                    category: "労災補償不足",
                    urgency: "medium",
                    employeeCount: employeeCount,
                    currentCoverage: currentCoverage,
                    recommendedCoverage: recommendedCoverage,
                    gap: gap,
                    recommendation: {
                        title: "労災上乗せ保険の補償額増額を推奨",
                        action: `死亡・後遺障害補償を${this.formatCurrency(recommendedCoverage)}に増額`,
                        reason: `従業員${employeeCount}名に対して1人あたり5,000万円の補償が標準です`,
                        estimatedCost: "月額 +1万円（推定）",
                        expectedBenefit: "従業員の安全と企業の責任を守ります"
                    }
                };
            }

            return { hasGap: false };
        } catch (error) {
            console.error('労災補償ギャップ検出でエラー:', error);
            return { hasGap: false, error: error.message };
        }
    }

    /**
     * 4. 総合ギャップ分析
     * すべてのギャップを統合して優先順位付け
     */
    analyzeAllGaps() {
        const gaps = [];

        // 各種ギャップを検出
        const inventoryGap = this.detectInventoryGap();
        if (inventoryGap.hasGap) {
            gaps.push(inventoryGap);
        }

        const liabilityGap = this.detectLiabilityGap();
        if (liabilityGap.hasGap) {
            gaps.push(liabilityGap);
        }

        const wcGap = this.detectWorkersCompGap();
        if (wcGap.hasGap) {
            gaps.push(wcGap);
        }

        // 緊急度でソート（high > medium > low）
        gaps.sort((a, b) => {
            const urgencyOrder = { high: 0, medium: 1, low: 2 };
            return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
        });

        // 総合評価
        const totalGapAmount = gaps.reduce((sum, gap) => sum + (gap.gap || 0), 0);
        const riskScoreImpact = this.calculateRiskScoreImpact(gaps);

        return {
            totalGaps: gaps.length,
            gaps: gaps,
            totalGapAmount: totalGapAmount,
            riskScoreImpact: riskScoreImpact,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * リスクスコアへの影響計算
     * ギャップを解消することで得られるスコア向上を計算
     */
    calculateRiskScoreImpact(gaps) {
        const currentScore = 67; // 現在のリスクスコア（データから取得予定）
        const improvementPerGap = 6; // 1件解決で+6点

        const potentialImprovement = gaps.length * improvementPerGap;
        const potentialScore = Math.min(currentScore + potentialImprovement, 100);

        return {
            current: currentScore,
            potential: potentialScore,
            improvement: potentialImprovement,
            message: gaps.length > 0
                ? `${gaps.length}件の対策実行で+${potentialImprovement}点向上`
                : '現在ギャップはありません'
        };
    }

    /**
     * ギャップ詳細を表示するモーダル
     */
    showGapDetailModal(gapCategory) {
        const gapAnalysis = this.analyzeAllGaps();
        const gap = gapAnalysis.gaps.find(g => g.category === gapCategory);

        if (!gap) {
            console.error('ギャップが見つかりません:', gapCategory);
            return;
        }

        const modalHtml = this.generateGapDetailModalHtml(gap);

        // 既存のモーダルを削除
        const existingModal = document.getElementById('gap-detail-modal');
        if (existingModal) {
            existingModal.remove();
        }

        // モーダルをDOMに追加
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        // モーダル表示
        const modal = document.getElementById('gap-detail-modal');
        setTimeout(() => modal.classList.add('active'), 10);

        // イベントリスナー設定
        this.setupGapModalEventListeners(modal);
    }

    /**
     * ギャップ詳細モーダルHTML生成
     */
    generateGapDetailModalHtml(gap) {
        const urgencyClass = gap.urgency === 'high' ? 'urgent' : 'warning';
        const urgencyLabel = gap.urgency === 'high' ? '🔴 緊急' : '🟡 推奨';

        return `
            <div id="gap-detail-modal" class="modal">
                <div class="modal-overlay"></div>
                <div class="modal-content gap-detail-modal ${urgencyClass}">
                    <div class="modal-header">
                        <span class="urgency-badge">${urgencyLabel}</span>
                        <h2>${gap.category}</h2>
                        <button class="modal-close" id="close-gap-modal">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>

                    <div class="modal-body">
                        ${this.generateGapDetailContent(gap)}
                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-secondary" id="close-gap-btn">
                            後で確認
                        </button>
                        <button class="btn btn-primary" id="contact-agent-btn">
                            <i class="fas fa-phone"></i> 今すぐ相談する
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * ギャップ詳細コンテンツ生成
     */
    generateGapDetailContent(gap) {
        let detailHtml = `
            <div class="gap-overview">
                <h3>現状分析</h3>
        `;

        // カテゴリー別の詳細表示
        if (gap.category === "在庫補償不足") {
            detailHtml += `
                <div class="gap-stats">
                    <div class="stat-item">
                        <span class="stat-label">現在の在庫金額</span>
                        <span class="stat-value highlight">${this.formatCurrency(gap.currentValue)}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">現在の補償金額</span>
                        <span class="stat-value">${this.formatCurrency(gap.coverageAmount)}</span>
                    </div>
                    <div class="stat-item critical">
                        <span class="stat-label">不足額</span>
                        <span class="stat-value">${this.formatCurrency(gap.gap)}</span>
                    </div>
                </div>

                <div class="monthly-trend">
                    <h4>過去3ヶ月の在庫推移</h4>
                    <div class="trend-chart">
                        ${this.generateInventoryTrendChart(gap.monthlyData)}
                    </div>
                    <p class="trend-note">
                        <i class="fas fa-info-circle"></i>
                        3ヶ月連続で8,000万円を超えています
                    </p>
                </div>
            `;
        } else {
            detailHtml += `
                <div class="gap-stats">
                    <div class="stat-item">
                        <span class="stat-label">推奨補償額</span>
                        <span class="stat-value highlight">${this.formatCurrency(gap.recommendedCoverage)}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">現在の補償額</span>
                        <span class="stat-value">${this.formatCurrency(gap.currentCoverage)}</span>
                    </div>
                    <div class="stat-item critical">
                        <span class="stat-label">不足額</span>
                        <span class="stat-value">${this.formatCurrency(gap.gap)}</span>
                    </div>
                </div>
            `;
        }

        detailHtml += `</div>`; // gap-overview終了

        // 推奨アクション
        detailHtml += `
            <div class="gap-recommendation">
                <h3>💡 推奨アクション</h3>
                <div class="recommendation-card">
                    <h4>${gap.recommendation.title}</h4>
                    <p class="rec-reason">${gap.recommendation.reason}</p>

                    <div class="rec-details">
                        <div class="rec-item">
                            <i class="fas fa-tasks"></i>
                            <div>
                                <strong>対応策</strong>
                                <p>${gap.recommendation.action}</p>
                            </div>
                        </div>

                        <div class="rec-item">
                            <i class="fas fa-yen-sign"></i>
                            <div>
                                <strong>推定コスト</strong>
                                <p>${gap.recommendation.estimatedCost}</p>
                            </div>
                        </div>

                        <div class="rec-item">
                            <i class="fas fa-chart-line"></i>
                            <div>
                                <strong>期待効果</strong>
                                <p>${gap.recommendation.expectedBenefit}</p>
                            </div>
                        </div>

                        ${gap.recommendation.roi ? `
                            <div class="rec-item highlight">
                                <i class="fas fa-calculator"></i>
                                <div>
                                    <strong>投資対効果（ROI）</strong>
                                    <p>${gap.recommendation.roi}</p>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;

        return detailHtml;
    }

    /**
     * 在庫推移チャート生成（簡易版）
     */
    generateInventoryTrendChart(monthlyData) {
        if (!monthlyData || monthlyData.length === 0) {
            return '<p>データがありません</p>';
        }

        const maxValue = Math.max(...monthlyData.map(m => m.value));
        const threshold = 80000000;

        return `
            <div class="simple-bar-chart">
                ${monthlyData.map(month => {
                    const heightPercent = (month.value / maxValue) * 100;
                    const isAboveThreshold = month.value >= threshold;
                    const barClass = isAboveThreshold ? 'above-threshold' : '';

                    return `
                        <div class="chart-bar-group">
                            <div class="chart-bar ${barClass}" style="height: ${heightPercent}%">
                                <span class="bar-value">${this.formatCurrency(month.value)}</span>
                            </div>
                            <div class="chart-label">${month.month}</div>
                        </div>
                    `;
                }).join('')}
            </div>
            <div class="threshold-line">
                <span>基準値: ${this.formatCurrency(threshold)}</span>
            </div>
        `;
    }

    /**
     * モーダルイベントリスナー設定
     */
    setupGapModalEventListeners(modal) {
        const closeBtn = modal.querySelector('#close-gap-modal');
        const closeBtnFooter = modal.querySelector('#close-gap-btn');
        const overlay = modal.querySelector('.modal-overlay');
        const contactBtn = modal.querySelector('#contact-agent-btn');

        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (closeBtnFooter) closeBtnFooter.addEventListener('click', closeModal);
        if (overlay) overlay.addEventListener('click', closeModal);

        if (contactBtn) {
            contactBtn.addEventListener('click', () => {
                alert('提携代理店への相談フォームを開きます（実装予定）\n\n実際のシステムでは、ここから代理店に直接連絡できます。');
                closeModal();
            });
        }
    }

    /**
     * ヘルパー関数: 通貨フォーマット
     */
    formatCurrency(amount) {
        if (!amount || isNaN(amount)) return '¥0円';

        const manAmount = amount / 10000;
        if (manAmount >= 10000) {
            return `¥${(manAmount / 10000).toLocaleString()}億円`;
        }
        return `¥${manAmount.toLocaleString()}万円`;
    }

    /**
     * ヘルパー関数: 通貨文字列のパース
     */
    parseCurrency(coverageString) {
        if (!coverageString) return 0;

        // "1億円/1事故" や "5,000万円" などのパターンに対応
        const okuMatch = coverageString.match(/(\d+)億円/);
        if (okuMatch) {
            return parseInt(okuMatch[1]) * 100000000;
        }

        const manMatch = coverageString.match(/(\d+,?\d*)万円/);
        if (manMatch) {
            const manValue = manMatch[1].replace(/,/g, '');
            return parseInt(manValue) * 10000;
        }

        return 0;
    }

    /**
     * ダッシュボードにギャップアラートを表示
     */
    renderGapAlertsToDashboard(containerId = 'insurance-gap-alerts-container') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn('ギャップアラート用コンテナが見つかりません:', containerId);
            return;
        }

        const gapAnalysis = this.analyzeAllGaps();

        if (gapAnalysis.totalGaps === 0) {
            // ギャップなし: 成功メッセージを表示
            container.innerHTML = `
                <div class="no-gaps-message">
                    <i class="fas fa-check-circle"></i>
                    <p><strong>保険補償は適切です</strong></p>
                    <p>現在、保険の補償漏れは検出されていません</p>
                </div>
            `;
            return;
        }

        // ギャップあり: アラートを表示
        let html = `
            <div class="gaps-summary">
                <div class="gaps-count">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div>
                        <div class="count">${gapAnalysis.totalGaps}</div>
                        <div class="label">件の保険ギャップ</div>
                    </div>
                </div>
                <div class="gaps-amount">
                    <div>総不足額</div>
                    <strong>${this.formatCurrency(gapAnalysis.totalGapAmount)}</strong>
                </div>
            </div>

            <div class="gaps-list">
        `;

        // 各ギャップをカード表示
        gapAnalysis.gaps.forEach(gap => {
            const urgencyIcon = gap.urgency === 'high' ? '🔴' :
                                gap.urgency === 'medium' ? '🟡' : '🟢';
            const urgencyClass = gap.urgency === 'high' ? 'urgent' : 'warning';

            html += `
                <div class="gap-item ${urgencyClass}">
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
                        詳細を見る <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            `;
        });

        html += '</div>';

        container.innerHTML = html;
    }
}

// グローバルインスタンス作成（遅延初期化）
function initializeGapDetector() {
    if (!window.gapDetector) {
        window.gapDetector = new IntelligentGapDetector();
        console.log('✅ IntelligentGapDetector が初期化されました');
    }
    return window.gapDetector;
}

// DOMContentLoaded後に初期化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGapDetector);
} else {
    initializeGapDetector();
}

// グローバル関数: ギャップ詳細表示
function viewGapDetail(category) {
    const detector = window.gapDetector || initializeGapDetector();
    if (detector) {
        detector.showGapDetailModal(category);
    }
}

console.log('✅ IntelligentGapDetector が読み込まれました');
