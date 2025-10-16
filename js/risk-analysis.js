// Risk Lance - リスク分析機能管理

class RiskAnalysisManager {
    constructor() {
        this.initialized = false;
    }

    // リスク分析画面の初期化
    initializeRiskAnalysis() {
        if (this.initialized) return;

        // 緊急アラートの表示
        this.displayEmergencyAlerts();

        // 社内リスクグラフの更新
        this.updateInternalRiskCharts();

        // 社外リスクグラフの更新
        this.updateExternalRiskCharts();

        // 総合リスクサマリーの更新
        this.updateRiskSummary();

        this.initialized = true;
    }

    // リスク分析画面更新
    updateRiskAnalysis() {
        // リスクメーターの更新
        window.chartManager.updateRiskMeters();

        // 緊急アラートの表示
        this.displayEmergencyAlerts();

        // 社内リスクグラフの更新
        this.updateInternalRiskCharts();

        // 社外リスクグラフの更新
        this.updateExternalRiskCharts();

        // 総合リスクサマリーの更新
        this.updateRiskSummary();
    }

    // 緊急アラート表示
    displayEmergencyAlerts() {
        window.alertManager.displayEmergencyAlerts();
    }

    // 社内リスクチャート更新
    updateInternalRiskCharts() {
        window.chartManager.updateInternalRiskCharts();
    }

    // 社外リスクチャート更新
    updateExternalRiskCharts() {
        window.chartManager.updateExternalRiskCharts();
    }

    // 総合リスクサマリー更新
    updateRiskSummary() {
        window.chartManager.updateRiskSummary();
    }

    // データ更新シミュレーション
    simulateDataUpdate() {
        // 売上データの更新
        const salesValue = document.querySelector('.dashboard-cards .card:first-child .value');
        if (salesValue) {
            const currentValue = parseInt(salesValue.textContent.replace(/[¥,]/g, ''));
            const newValue = currentValue + Math.floor(Math.random() * 100000);
            salesValue.textContent = `¥${newValue.toLocaleString()}`;
        }

        // 通知バッジの更新
        window.alertManager.updateNotificationBadge();
    }

    // 本日の変更点更新
    updateTodayChanges() {
        const timestamp = new Date().toLocaleTimeString('ja-JP', {
            hour: '2-digit',
            minute: '2-digit'
        });

        console.log(`${timestamp}: 業務アプリデータを更新しました`);
    }

    // ランキング更新
    updateRankings() {
        console.log('ランキングデータを更新しました');
    }

    // 保険テーブル更新
    updateInsuranceTable() {
        // 保険契約の期限チェック
        window.alertManager.checkInsuranceExpiry();
    }

    // リスクレベル判定
    getRiskLevel(score) {
        if (score <= 30) return { level: 'low', label: '低', color: '#27ae60' };
        if (score <= 70) return { level: 'medium', label: '中', color: '#f39c12' };
        return { level: 'high', label: '高', color: '#e74c3c' };
    }

    // リスクスコア計算
    calculateRiskScore(category, data) {
        // 簡易的なリスクスコア計算ロジック
        switch (category) {
            case 'inventory':
                return data.trends ?
                    Math.min(100, data.trends[data.trends.length - 1].value * 5) : 50;
            case 'employees':
                return data.highRisk ? data.highRisk * 4 : 50;
            case 'cybersecurity':
                return data.vulnerabilityTrend === 'increasing' ? 85 : 40;
            default:
                return 50;
        }
    }

    // リスク予測
    predictRiskTrend(historicalData, timeframe = 30) {
        // 簡易的な予測ロジック（実際のシステムではML/AIを使用）
        if (!historicalData || historicalData.length < 2) {
            return { trend: 'stable', confidence: 50 };
        }

        const recent = historicalData.slice(-3);
        const average = recent.reduce((sum, item) => sum + item.value, 0) / recent.length;
        const previousAverage = historicalData.slice(-6, -3)
            .reduce((sum, item) => sum + item.value, 0) / 3;

        const change = ((average - previousAverage) / previousAverage) * 100;

        if (change > 10) {
            return { trend: 'increasing', confidence: 75, change: change.toFixed(1) };
        } else if (change < -10) {
            return { trend: 'decreasing', confidence: 75, change: change.toFixed(1) };
        } else {
            return { trend: 'stable', confidence: 60, change: change.toFixed(1) };
        }
    }

    // リスク相関分析
    analyzeRiskCorrelations() {
        const internalRisk = window.dataManager.getInternalRiskData();
        const externalRisk = window.dataManager.getExternalRiskData();

        // 在庫リスクと災害リスクの相関
        const inventoryRisk = this.calculateRiskScore('inventory', internalRisk.inventory);
        const disasterRisk = externalRisk.disasters
            .reduce((max, disaster) => Math.max(max, disaster.probability), 0);

        const correlation = {
            inventoryDisaster: inventoryRisk * disasterRisk / 100,
            employeeCyber: internalRisk.employees.highRisk *
                (internalRisk.cybersecurity.vulnerabilityTrend === 'increasing' ? 80 : 20) / 100
        };

        return correlation;
    }

    // リスク対策提案
    generateRiskRecommendations() {
        const internalRisk = window.dataManager.getInternalRiskData();
        const externalRisk = window.dataManager.getExternalRiskData();
        const recommendations = [];

        // 在庫リスク対策
        if (internalRisk.inventory.trends.some(trend => trend.warning)) {
            recommendations.push({
                category: 'inventory',
                priority: 'high',
                title: '在庫過多リスク対策',
                actions: [
                    '在庫回転率の改善',
                    '需要予測精度の向上',
                    '在庫保険の補償額見直し'
                ]
            });
        }

        // サイバーセキュリティ対策
        if (internalRisk.cybersecurity.riskLevel === 'high') {
            recommendations.push({
                category: 'cybersecurity',
                priority: 'critical',
                title: 'サイバーセキュリティ強化',
                actions: [
                    'サイバー保険の加入検討',
                    'セキュリティ監査の実施',
                    '従業員教育の強化'
                ]
            });
        }

        // 災害リスク対策
        const highRiskDisasters = externalRisk.disasters
            .filter(disaster => disaster.level === 'high-risk');

        if (highRiskDisasters.length > 0) {
            recommendations.push({
                category: 'disaster',
                priority: 'critical',
                title: '災害リスク対策',
                actions: [
                    'BCPの策定・見直し',
                    '代替拠点の確保',
                    '災害保険の補償範囲拡大'
                ]
            });
        }

        return recommendations;
    }

    // リスクレポート生成
    generateRiskReport() {
        const internalRisk = window.dataManager.getInternalRiskData();
        const externalRisk = window.dataManager.getExternalRiskData();
        const riskSummary = window.dataManager.getRiskSummary();

        const report = {
            timestamp: new Date(),
            summary: riskSummary,
            internal: {
                inventory: this.calculateRiskScore('inventory', internalRisk.inventory),
                employees: this.calculateRiskScore('employees', internalRisk.employees),
                cybersecurity: this.calculateRiskScore('cybersecurity', internalRisk.cybersecurity)
            },
            external: {
                disasters: externalRisk.disasters.map(d => ({
                    location: d.location,
                    type: d.type,
                    probability: d.probability
                })),
                creditRisk: externalRisk.creditRisk.map(c => ({
                    company: c.company,
                    score: c.score
                })),
                marketRisk: externalRisk.marketRisk.gauge
            },
            recommendations: this.generateRiskRecommendations(),
            correlations: this.analyzeRiskCorrelations()
        };

        return report;
    }

    // リスクアラート監視
    monitorRiskAlerts() {
        const thresholds = {
            critical: 80,
            high: 60,
            medium: 40
        };

        const internalRisk = window.dataManager.getInternalRiskData();
        const inventoryScore = this.calculateRiskScore('inventory', internalRisk.inventory);
        const cyberScore = this.calculateRiskScore('cybersecurity', internalRisk.cybersecurity);

        // 閾値を超えた場合のアラート生成
        if (inventoryScore > thresholds.high) {
            window.alertManager.addNotification({
                type: 'warning',
                message: `在庫リスクが高水準です (スコア: ${inventoryScore})`,
                icon: 'fas fa-exclamation-triangle'
            });
        }

        if (cyberScore > thresholds.critical) {
            window.alertManager.addNotification({
                type: 'critical',
                message: `サイバーセキュリティリスクが危険水準です (スコア: ${cyberScore})`,
                icon: 'fas fa-shield-alt'
            });
        }
    }
}

// グローバルにRiskAnalysisManagerインスタンスを作成
window.riskAnalysisManager = new RiskAnalysisManager();