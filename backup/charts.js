// Risk Lance - グラフ・チャート機能管理

class ChartManager {
    constructor() {
        this.animationDelay = 100;
    }

    // 社内リスクチャート更新
    updateInternalRiskCharts() {
        // 在庫推移棒グラフの更新
        this.updateInventoryChart();

        // 従業員リスク円グラフの更新
        this.updateEmployeeRiskChart();

        // システム脆弱性線グラフの更新
        this.updateVulnerabilityChart();
    }

    // 在庫推移チャート更新
    updateInventoryChart() {
        const chartBars = document.querySelectorAll('#inventory-chart .bar');
        const internalRiskData = window.dataManager.getInternalRiskData();

        if (!chartBars.length || !internalRiskData.inventory) return;

        chartBars.forEach((bar, index) => {
            const trendData = internalRiskData.inventory.trends[index];
            if (trendData) {
                // バーの高さとスタイルをアニメーション付きで更新
                setTimeout(() => {
                    bar.style.height = trendData.height;
                    if (trendData.warning) {
                        bar.classList.add('warning');
                    }

                    // ホバーイベントの追加
                    bar.addEventListener('mouseenter', () => {
                        this.showInventoryTooltip(trendData, bar);
                    });
                }, index * this.animationDelay);
            }
        });
    }

    // 従業員リスクチャート更新
    updateEmployeeRiskChart() {
        const pieChart = document.getElementById('employee-risk-chart');
        const internalRiskData = window.dataManager.getInternalRiskData();

        if (!pieChart || !internalRiskData.employees) return;

        const employeeData = internalRiskData.employees;

        // 円グラフのアニメーション
        setTimeout(() => {
            // 中央の合計人数を更新
            const centerText = pieChart.querySelector('.total-employees');
            if (centerText) {
                centerText.textContent = `${employeeData.total}名`;
            }
        }, 500);
    }

    // システム脆弱性チャート更新
    updateVulnerabilityChart() {
        const vulnerabilityChart = document.getElementById('vulnerability-chart');
        if (!vulnerabilityChart) return;

        // 線グラフのアニメーション
        const svgLine = vulnerabilityChart.querySelector('polyline');
        if (svgLine) {
            // 線の描画アニメーション
            const pathLength = svgLine.getTotalLength();
            svgLine.style.strokeDasharray = pathLength;
            svgLine.style.strokeDashoffset = pathLength;

            setTimeout(() => {
                svgLine.style.transition = 'stroke-dashoffset 2s ease-in-out';
                svgLine.style.strokeDashoffset = '0';
            }, 300);
        }
    }

    // 社外リスクチャート更新
    updateExternalRiskCharts() {
        // 地域別災害リスク更新
        this.updateDisasterRiskMap();

        // 取引先信用リスク更新
        this.updateCreditRiskChart();

        // 市場環境リスク更新
        this.updateMarketRiskGauge();
    }

    // 災害リスクマップ更新
    updateDisasterRiskMap() {
        const riskRegions = document.querySelectorAll('.risk-region');
        const externalRiskData = window.dataManager.getExternalRiskData();

        if (!riskRegions.length || !externalRiskData.disasters) return;

        riskRegions.forEach((region, index) => {
            const disasterData = externalRiskData.disasters[index];
            if (disasterData) {
                // リスク地域のクリックイベント
                region.addEventListener('click', () => {
                    window.alertManager.showDisasterRiskDetails(disasterData);
                });

                // アニメーション効果
                setTimeout(() => {
                    region.style.transform = 'translateX(0)';
                    region.style.opacity = '1';
                }, index * 200);
            }
        });
    }

    // 信用リスクチャート更新
    updateCreditRiskChart() {
        const companyRisks = document.querySelectorAll('.company-risk');
        const externalRiskData = window.dataManager.getExternalRiskData();

        if (!companyRisks.length || !externalRiskData.creditRisk) return;

        companyRisks.forEach((company, index) => {
            const creditData = externalRiskData.creditRisk[index];
            if (creditData) {
                const riskFill = company.querySelector('.risk-fill');
                if (riskFill) {
                    // リスクバーのアニメーション
                    setTimeout(() => {
                        riskFill.style.width = `${creditData.score}%`;
                    }, index * 300);
                }

                // クリックイベント
                company.addEventListener('click', () => {
                    window.alertManager.showCreditRiskDetails(creditData);
                });
            }
        });
    }

    // 市場リスクゲージ更新
    updateMarketRiskGauge() {
        const gauge = document.querySelector('.gauge-needle');
        const externalRiskData = window.dataManager.getExternalRiskData();

        if (!gauge || !externalRiskData.marketRisk) return;

        const marketData = externalRiskData.marketRisk;

        // ゲージ針のアニメーション
        setTimeout(() => {
            gauge.style.transform = `translate(-50%, -100%) rotate(${marketData.gauge}deg)`;
        }, 500);
    }

    // 総合リスクサマリー更新
    updateRiskSummary() {
        const riskSummary = window.dataManager.getRiskSummary();
        if (!riskSummary) return;

        // カウントアニメーション
        this.animateCounters();

        // サマリーカードのクリックイベント
        this.setupSummaryCardEvents();
    }

    // カウンターアニメーション
    animateCounters() {
        const riskSummary = window.dataManager.getRiskSummary();

        const counters = [
            { selector: '.summary-card.critical .count', target: riskSummary.critical },
            { selector: '.summary-card.high .count', target: riskSummary.high },
            { selector: '.summary-card.medium .count', target: riskSummary.medium },
            { selector: '.summary-card.coverage .percentage', target: riskSummary.coverageRate, suffix: '%' }
        ];

        counters.forEach(counter => {
            const element = document.querySelector(counter.selector);
            if (element) {
                this.animateNumber(element, 0, counter.target, counter.suffix || '件');
            }
        });
    }

    // 数値アニメーション
    animateNumber(element, start, end, suffix) {
        const duration = 1000;
        const startTime = Date.now();

        const updateNumber = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * progress);

            element.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        };

        updateNumber();
    }

    // サマリーカードイベント設定
    setupSummaryCardEvents() {
        const summaryCards = document.querySelectorAll('.summary-card');
        summaryCards.forEach(card => {
            card.addEventListener('click', () => {
                const cardType = card.classList[1]; // critical, high, medium, coverage
                window.alertManager.showSummaryDetails(cardType);
            });
        });
    }

    // リスクメーター更新
    updateRiskMeters() {
        const meters = document.querySelectorAll('.meter-value');
        meters.forEach(meter => {
            const randomRotation = Math.floor(Math.random() * 180);
            meter.style.transform = `rotate(${randomRotation}deg)`;
        });
    }

    // 在庫ツールチップ表示
    showInventoryTooltip(trendData, barElement) {
        // 簡易ツールチップ表示（実際のプロジェクトではより洗練されたツールチップライブラリを使用）
        const existingTooltip = document.querySelector('.inventory-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }

        const tooltip = document.createElement('div');
        tooltip.className = 'inventory-tooltip';
        tooltip.innerHTML = `
            <div style="background: #2c3e50; color: white; padding: 8px 12px; border-radius: 4px; font-size: 12px; position: absolute; z-index: 1000;">
                ${trendData.month}: ${trendData.value}M円
                ${trendData.warning ? '<br><span style="color: #f39c12;">⚠ 在庫過多警告</span>' : ''}
            </div>
        `;

        const rect = barElement.getBoundingClientRect();
        tooltip.style.position = 'absolute';
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.top - 60) + 'px';

        document.body.appendChild(tooltip);

        // 3秒後に自動削除
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 3000);
    }

    // プログレスバーとカバレッジアニメーション
    initializeProgressAnimations() {
        // プログレスバーアニメーション
        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });

        // カバレッジサークルアニメーション
        const coverageBars = document.querySelectorAll('.covered');
        coverageBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 1000);
        });

        // 保険カバー率円グラフアニメーション
        this.updateInsuranceCoverageCircles();
    }

    // 保険カバー率円グラフ更新
    updateInsuranceCoverageCircles() {
        const coverageItems = document.querySelectorAll('.coverage-item');
        const coverageData = [85, 70, 90, 100]; // 火災、賠償、傷害・医療、自動車

        coverageItems.forEach((item, index) => {
            const circle = item.querySelector('.circle-progress');
            if (circle && coverageData[index]) {
                const percent = coverageData[index];

                // CSS変数を設定してアニメーション
                setTimeout(() => {
                    circle.style.setProperty('--percent', percent);

                    // データ属性も設定
                    circle.setAttribute('data-percent', percent);

                    // 円グラフの背景グラデーションを動的に更新
                    const angle = (percent / 100) * 360;
                    let color = '#27ae60'; // 緑（高いカバー率）

                    if (percent < 80) {
                        color = '#f39c12'; // オレンジ（中程度のカバー率）
                    }
                    if (percent < 60) {
                        color = '#e74c3c'; // 赤（低いカバー率）
                    }

                    circle.style.background = `conic-gradient(${color} 0deg, ${color} ${angle}deg, #ecf0f1 ${angle}deg)`;
                }, index * 200);
            }
        });
    }
}

// グローバルにChartManagerインスタンスを作成
window.chartManager = new ChartManager();