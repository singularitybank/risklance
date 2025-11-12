// Risk Lance - リスクダッシュボード画面コンテンツレンダラー

class RiskAnalysisContentRenderer {
    /**
     * リスクダッシュボード画面のコンテンツを生成
     * @param {Object} data - リスク分析データ（actionItems, emergencyAlerts, internalRisk, externalRisk, summary）
     */
    static render(data = null) {
        // データマネージャーからデータを取得
        const riskData = data || (window.dataManager ? window.dataManager.getRiskAnalysisData() : null);

        if (!riskData) {
            return '<p>データを読み込んでいます...</p>';
        }

        return `
            <h2>リスクダッシュボード</h2>

            ${this.renderActionItems(riskData.actionItems)}

            <!-- リスクダッシュボード詳細 -->
            <div class="detailed-risk-dashboard">
                <h3>総合リスクダッシュボード</h3>

                ${this.renderEmergencyAlerts(riskData.emergencyAlerts)}
                ${this.renderInternalRiskAnalysis(riskData.internalRisk)}
                ${this.renderExternalRiskAnalysis(riskData.externalRisk)}
                ${this.renderRiskSummary(riskData.summary)}
            </div>
        `;
    }

    /**
     * 必要なアクションを生成
     */
    static renderActionItems(actionItems) {
        if (!actionItems || actionItems.length === 0) {
            return '<p>アクションアイテムがありません。</p>';
        }

        const items = actionItems.map(item => `
            <div class="action-item ${item.level}">
                <i class="${item.icon}"></i>
                <div class="action-content">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
                <button class="action-btn">${item.action}</button>
            </div>
        `).join('');

        return `
            <!-- 必要なアクション -->
            <div class="action-items">
                <h3>必要なアクション</h3>
                <div class="action-list">
                    ${items}
                </div>
            </div>
        `;
    }

    /**
     * 緊急アラートを生成
     */
    static renderEmergencyAlerts(alerts) {
        if (!alerts || alerts.length === 0) {
            return '<p>緊急アラートはありません。</p>';
        }

        const alertItems = alerts.map(alert => `
            <div class="alert-item ${alert.level}">
                <i class="${alert.icon}"></i>
                <div class="alert-content">
                    <h4>${alert.title}</h4>
                    <p>${alert.description}</p>
                    <span class="coverage-status ${alert.coverage}">${alert.coverageText}</span>
                </div>
                <button class="alert-action">${alert.action}</button>
            </div>
        `).join('');

        return `
            <!-- 緊急アラート -->
            <div class="emergency-alerts">
                ${alertItems}
            </div>
        `;
    }

    /**
     * 社内リスク分析セクションを生成
     */
    static renderInternalRiskAnalysis(internalRisk) {
        if (!internalRisk) {
            return '<p>社内リスクデータがありません。</p>';
        }

        // 在庫水準推移のバーチャート生成
        const inventoryBars = internalRisk.inventory.trends.map(trend => `
            <div class="bar warning" style="height: ${trend.height}" data-value="${trend.value}">
                <span class="bar-label">${trend.month}</span>
                <span class="bar-value">${trend.value}</span>
            </div>
        `).join('');

        return `
            <!-- 社内リスク分析 -->
            <div class="risk-section">
                <h4>社内リスク分析</h4>
                <div class="risk-analysis-grid">
                    <div class="chart-container">
                        <h5>在庫水準推移（過去6ヶ月）</h5>
                        <div class="bar-chart" id="inventory-chart">
                            <div class="chart-bars">
                                ${inventoryBars}
                            </div>
                        </div>
                        <div class="risk-assessment">
                            <span class="risk-level ${internalRisk.inventory.riskLevel}">${internalRisk.inventory.riskText}</span>
                            <span class="coverage-status ${internalRisk.inventory.coverage.status}">${internalRisk.inventory.coverage.text}</span>
                        </div>
                        <button class="btn btn-primary request-review-btn" id="request-inventory-insurance-review" title="保険見直し依頼を担当代理店に送信します">
                            <i class="fas fa-envelope"></i>
                            保険見直し依頼
                        </button>
                    </div>

                    <div class="chart-container">
                        <h5>従業員リスク分布</h5>
                        <div class="pie-chart" id="employee-risk-chart">
                            <div class="pie-slice slice-1" style="--percentage: ${internalRisk.employees.safe}"></div>
                            <div class="pie-slice slice-2" style="--percentage: ${internalRisk.employees.caution}"></div>
                            <div class="pie-slice slice-3" style="--percentage: ${internalRisk.employees.highRisk}"></div>
                            <div class="pie-center">
                                <span class="total-employees">${internalRisk.employees.total}名</span>
                            </div>
                        </div>
                        <div class="pie-legend">
                            <div class="legend-item">
                                <span class="legend-color slice-1-color"></span>
                                <span>安全作業者 (${internalRisk.employees.safe}%)</span>
                            </div>
                            <div class="legend-item">
                                <span class="legend-color slice-2-color"></span>
                                <span>注意必要 (${internalRisk.employees.caution}%)</span>
                            </div>
                            <div class="legend-item">
                                <span class="legend-color slice-3-color"></span>
                                <span>高リスク (${internalRisk.employees.highRisk}%)</span>
                            </div>
                        </div>
                        <div class="risk-assessment">
                            <span class="risk-level ${internalRisk.employees.riskLevel}">${internalRisk.employees.riskText}</span>
                            <span class="coverage-status ${internalRisk.employees.coverage.status}">${internalRisk.employees.coverage.text}</span>
                        </div>
                    </div>

                    <div class="chart-container">
                        <h5>システム脆弱性トレンド</h5>
                        <div class="line-chart" id="vulnerability-chart">
                            <div class="chart-grid">
                                <div class="grid-line"></div>
                                <div class="grid-line"></div>
                                <div class="grid-line"></div>
                                <div class="grid-line"></div>
                            </div>
                            <svg class="line-chart-svg" viewBox="0 0 300 150">
                                <polyline points="10,130 60,100 110,80 160,60 210,45 260,70" stroke="#e74c3c" stroke-width="3" fill="none"/>
                                <circle cx="260" cy="70" r="4" fill="#e74c3c"/>
                            </svg>
                            <div class="chart-labels">
                                <span>4月</span>
                                <span>5月</span>
                                <span>6月</span>
                                <span>7月</span>
                                <span>8月</span>
                                <span>9月</span>
                            </div>
                        </div>
                        <div class="risk-assessment">
                            <span class="risk-level ${internalRisk.cybersecurity.riskLevel}">${internalRisk.cybersecurity.riskText}</span>
                            <span class="coverage-status ${internalRisk.cybersecurity.coverage.status}">${internalRisk.cybersecurity.coverage.text}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 社外リスク分析セクションを生成
     */
    static renderExternalRiskAnalysis(externalRisk) {
        if (!externalRisk) {
            return '<p>社外リスクデータがありません。</p>';
        }

        // 地域別災害リスク生成
        const disasterRegions = externalRisk.disasters.map(disaster => `
            <div class="risk-region ${disaster.level}" data-region="${disaster.location}">
                <i class="${disaster.icon}"></i>
                <span class="region-name">${disaster.location}</span>
                <span class="risk-value">${disaster.type}: ${disaster.probability}%</span>
            </div>
        `).join('');

        // 市場要因生成
        const marketFactors = externalRisk.marketRisk.factors.map(factor => {
            const arrow = factor.trend === 'up' ? '↗' : '↘';
            return `
                <div class="factor">
                    <span class="factor-name">${factor.name}</span>
                    <span class="factor-trend ${factor.trend}">${arrow} ${factor.value}</span>
                </div>
            `;
        }).join('');

        return `
            <!-- 社外リスク分析 -->
            <div class="risk-section">
                <h4>社外リスク分析</h4>
                <div class="risk-analysis-grid">
                    <div class="chart-container">
                        <h5>地域別災害リスク</h5>
                        <div class="disaster-risk-map">
                            ${disasterRegions}
                        </div>
                        <div class="risk-assessment">
                            <span class="risk-level ${externalRisk.disasterRiskLevel}">${externalRisk.disasterRiskText}</span>
                            <span class="coverage-status ${externalRisk.disasterCoverage.status}">${externalRisk.disasterCoverage.text}</span>
                        </div>
                    </div>

                    <div class="chart-container">
                        <h5>取引先信用リスク</h5>
                        <div class="credit-risk-chart">
                            <div class="risk-companies">
                                <!-- 取引先リスクはJavaScriptで動的に生成されます -->
                            </div>
                        </div>
                        <div class="risk-assessment">
                            <span class="risk-level ${externalRisk.creditRiskLevel}">${externalRisk.creditRiskText}</span>
                            <span class="coverage-status ${externalRisk.creditCoverage.status}">${externalRisk.creditCoverage.text}</span>
                        </div>
                    </div>

                    <div class="chart-container">
                        <h5>市場環境リスク</h5>
                        <div class="market-risk-gauge">
                            <div class="gauge-container">
                                <div class="gauge">
                                    <div class="gauge-needle" style="transform: rotate(${externalRisk.marketRisk.gauge}deg)"></div>
                                </div>
                                <div class="gauge-labels">
                                    <span class="low">低</span>
                                    <span class="medium">中</span>
                                    <span class="high">高</span>
                                </div>
                            </div>
                            <div class="market-factors">
                                ${marketFactors}
                            </div>
                        </div>
                        <div class="risk-assessment">
                            <span class="risk-level ${externalRisk.marketRisk.riskLevel}">${externalRisk.marketRisk.riskLevel === 'medium' ? '中リスク' : '高リスク'}</span>
                            <span class="coverage-status ${externalRisk.marketRisk.coverage.status}">${externalRisk.marketRisk.coverage.text}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * リスクサマリーセクションを生成
     */
    static renderRiskSummary(summary) {
        if (!summary) {
            return '<p>リスクサマリーデータがありません。</p>';
        }

        return `
            <!-- 総合リスクサマリー -->
            <div class="risk-summary">
                <h4>総合リスクサマリー</h4>
                <div class="summary-cards">
                    <div class="summary-card critical">
                        <i class="fas fa-exclamation-circle"></i>
                        <div class="card-content">
                            <h5>緊急対応必要</h5>
                            <span class="count">${summary.critical}件</span>
                        </div>
                    </div>
                    <div class="summary-card high">
                        <i class="fas fa-exclamation-triangle"></i>
                        <div class="card-content">
                            <h5>高リスク</h5>
                            <span class="count">${summary.high}件</span>
                        </div>
                    </div>
                    <div class="summary-card medium">
                        <i class="fas fa-info-circle"></i>
                        <div class="card-content">
                            <h5>中リスク</h5>
                            <span class="count">${summary.medium}件</span>
                        </div>
                    </div>
                    <div class="summary-card coverage">
                        <i class="fas fa-shield-alt"></i>
                        <div class="card-content">
                            <h5>保険カバー率</h5>
                            <span class="percentage">${summary.coverageRate}%</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// グローバルに公開
window.RiskAnalysisContentRenderer = RiskAnalysisContentRenderer;

console.log('✅ RiskAnalysisContentRenderer が読み込まれました');
