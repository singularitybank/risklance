// 保険マネージャー - 保険契約の詳細表示

class InsuranceManager {
    constructor() {
        this.policyData = {
            '1': {
                id: '1',
                type: '火災保険',
                productName: '企業総合保険',
                company: '○○損保',
                policyNumber: 'FIRE-2023-001234',
                contractDate: '2023年3月15日',
                startDate: '2023年3月15日',
                endDate: '2024年3月15日',
                status: '見直し要',
                premium: '¥1,250,000',
                coverage: {
                    building: '建物: 5億円',
                    equipment: '設備・什器: 1億円',
                    inventory: '商品・製品: 5,000万円',
                    businessInterruption: '営業損失: 3,000万円/月'
                },
                inventoryCoverageAmount: 50000000, // 在庫補償金額（5,000万円）
                deductible: '1事故につき10万円',
                specialConditions: [
                    '地震保険付帯（建物評価額の50%）',
                    '水災補償含む',
                    '盗難補償含む'
                ],
                contactPerson: '営業担当: 山田太郎',
                contactPhone: 'TEL: 03-1234-5678',
                notes: '更新期限が近づいています。見直しをご検討ください。',
                riskScore: 85,
                renewalRecommendation: '補償内容の見直しと保険料の最適化を推奨'
            },
            '2': {
                id: '2',
                type: '賠償責任保険',
                productName: 'PL保険',
                company: '△△海上',
                policyNumber: 'PL-2023-005678',
                contractDate: '2023年4月1日',
                startDate: '2023年4月1日',
                endDate: '2024年3月31日',
                status: '正常',
                premium: '¥850,000',
                coverage: {
                    personalInjury: '対人賠償: 1億円/1事故',
                    propertyDamage: '対物賠償: 1億円/1事故',
                    productLiability: '生産物賠償: 5,000万円/期間中',
                    litigation: '訴訟費用: 実費補償'
                },
                deductible: '1事故につき5万円',
                specialConditions: [
                    'リコール費用補償特約付帯',
                    '海外PL補償含む',
                    '使用者賠償責任補償特約付帯'
                ],
                contactPerson: '営業担当: 佐藤花子',
                contactPhone: 'TEL: 03-2345-6789',
                notes: '補償内容は適切です。継続をお勧めします。',
                riskScore: 45,
                renewalRecommendation: '現状の補償内容で継続推奨'
            },
            '3': {
                id: '3',
                type: '労災保険',
                productName: '労災上乗せ保険',
                company: '□□生命',
                policyNumber: 'WC-2023-009012',
                contractDate: '2023年4月1日',
                startDate: '2023年4月1日',
                endDate: '2024年3月31日',
                status: '正常',
                premium: '¥420,000',
                coverage: {
                    death: '死亡・後遺障害: 5,000万円',
                    medical: '入院日額: 1万円',
                    outpatient: '通院日額: 5,000円',
                    familySupport: '遺族補償: 3,000万円'
                },
                deductible: 'なし',
                specialConditions: [
                    '業務上災害・通勤災害両方補償',
                    '海外出張中も補償対象',
                    '精神障害補償特約付帯'
                ],
                contactPerson: '営業担当: 鈴木一郎',
                contactPhone: 'TEL: 03-3456-7890',
                notes: '従業員の安全を守る重要な保険です。',
                riskScore: 20,
                renewalRecommendation: '現状の補償内容で継続推奨'
            }
        };
    }

    // 在庫金額チェック（3ヶ月以上8,000万円超過しているか）
    checkInventoryValue() {
        const inventoryData = window.dataManager.getInventoryData();
        const monthlyHistory = inventoryData.monthlyValueHistory;

        if (!monthlyHistory || monthlyHistory.length < 3) {
            return null;
        }

        // 最新3ヶ月分を取得
        const recentMonths = monthlyHistory.slice(-3);

        // 全ての月で8,000万円以上かチェック
        const threshold = 80000000; // 8,000万円
        const allMonthsExceedThreshold = recentMonths.every(month => month.value >= threshold);

        if (allMonthsExceedThreshold) {
            const policy = this.policyData['1'];
            const coverageAmount = policy.inventoryCoverageAmount;
            const currentValue = recentMonths[recentMonths.length - 1].value;

            return {
                hasAlert: true,
                currentValue: currentValue,
                coverageAmount: coverageAmount,
                shortage: currentValue - coverageAmount,
                months: recentMonths
            };
        }

        return null;
    }

    // 保険詳細モーダル表示
    showPolicyDetail(policyId) {
        const policy = this.policyData[policyId];

        if (!policy) {
            console.error('保険データが見つかりません:', policyId);
            return;
        }

        // 在庫金額チェック（火災保険の場合）
        let inventoryAlert = null;
        if (policyId === '1') {
            inventoryAlert = this.checkInventoryValue();
        }

        // モーダルHTML生成
        const modalHtml = this.generatePolicyDetailModal(policy, inventoryAlert);

        // 既存のモーダルを削除
        const existingModal = document.getElementById('policy-detail-modal');
        if (existingModal) {
            existingModal.remove();
        }

        // モーダルをDOMに追加
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        // モーダル表示
        const modal = document.getElementById('policy-detail-modal');
        setTimeout(() => modal.classList.add('active'), 10);

        // イベントリスナー設定
        this.setupModalEventListeners(modal);
    }

    // モーダルHTML生成
    generatePolicyDetailModal(policy, inventoryAlert) {
        const coverageHtml = Object.entries(policy.coverage)
            .map(([key, value]) => `<li>${value}</li>`)
            .join('');

        const conditionsHtml = policy.specialConditions
            .map(condition => `<li>${condition}</li>`)
            .join('');

        const statusClass = policy.status === '正常' ? 'status-ok' : 'status-warning';
        const riskClass = policy.riskScore > 70 ? 'high' : policy.riskScore > 40 ? 'medium' : 'low';

        // 在庫金額アラートHTML生成
        let inventoryAlertHtml = '';
        if (inventoryAlert) {
            const formatCurrency = (value) => `¥${(value / 10000).toLocaleString()}万円`;
            inventoryAlertHtml = `
                <div class="alert-item critical inventory-alert">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div class="alert-content">
                        <h4>【重要】商品・製品の補償額不足</h4>
                        <p>倉庫在庫の合計金額が過去3ヶ月以上${formatCurrency(80000000)}を超えています。</p>
                        <div class="alert-details">
                            <div class="detail-row">
                                <span class="detail-label">現在の在庫金額:</span>
                                <span class="detail-value highlight">${formatCurrency(inventoryAlert.currentValue)}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">現在の補償金額:</span>
                                <span class="detail-value">${formatCurrency(inventoryAlert.coverageAmount)}</span>
                            </div>
                            <div class="detail-row">
                                <span class="detail-label">不足額:</span>
                                <span class="detail-value warning">${formatCurrency(inventoryAlert.shortage)}</span>
                            </div>
                        </div>
                        <p class="alert-recommendation">
                            <i class="fas fa-lightbulb"></i>
                            商品・製品の保険金額を増額することをお勧めします。
                        </p>
                        <button class="btn btn-primary inventory-risk-btn" id="view-inventory-risk-btn">
                            <i class="fas fa-chart-line"></i>
                            在庫リスクを確認
                        </button>
                    </div>
                </div>
            `;
        }

        return `
            <div id="policy-detail-modal" class="modal">
                <div class="modal-overlay"></div>
                <div class="modal-content policy-detail-modal">
                    <div class="modal-header">
                        <h2>${policy.type} - 詳細情報</h2>
                        <button class="modal-close" id="close-policy-modal">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        ${inventoryAlertHtml}
                        <div class="policy-detail-grid">
                            <!-- 基本情報 -->
                            <div class="detail-section">
                                <h3>基本情報</h3>
                                <div class="detail-item">
                                    <span class="label">証券番号:</span>
                                    <span class="value">${policy.policyNumber}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="label">商品名:</span>
                                    <span class="value">${policy.productName}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="label">保険会社:</span>
                                    <span class="value">${policy.company}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="label">契約日:</span>
                                    <span class="value">${policy.contractDate}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="label">保険期間:</span>
                                    <span class="value">${policy.startDate} ～ ${policy.endDate}</span>
                                </div>
                                <div class="detail-item">
                                    <span class="label">ステータス:</span>
                                    <span class="value"><span class="${statusClass}">${policy.status}</span></span>
                                </div>
                                <div class="detail-item">
                                    <span class="label">保険料:</span>
                                    <span class="value premium">${policy.premium}</span>
                                </div>
                            </div>

                            <!-- 補償内容 -->
                            <div class="detail-section">
                                <h3>補償内容</h3>
                                <ul class="coverage-list">
                                    ${coverageHtml}
                                </ul>
                                <div class="detail-item">
                                    <span class="label">免責金額:</span>
                                    <span class="value">${policy.deductible}</span>
                                </div>
                            </div>

                            <!-- 特約・特別条件 -->
                            <div class="detail-section">
                                <h3>特約・特別条件</h3>
                                <ul class="conditions-list">
                                    ${conditionsHtml}
                                </ul>
                            </div>

                            <!-- リスク評価 -->
                            <div class="detail-section">
                                <h3>リスク評価</h3>
                                <div class="risk-score-display">
                                    <div class="score-circle ${riskClass}">
                                        <span class="score">${policy.riskScore}</span>
                                        <span class="score-label">リスクスコア</span>
                                    </div>
                                    <div class="recommendation">
                                        <i class="fas fa-lightbulb"></i>
                                        <p>${policy.renewalRecommendation}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- 担当者情報 -->
                            <div class="detail-section">
                                <h3>担当者情報</h3>
                                <div class="contact-info">
                                    <p><i class="fas fa-user"></i> ${policy.contactPerson}</p>
                                    <p><i class="fas fa-phone"></i> ${policy.contactPhone}</p>
                                </div>
                            </div>

                            <!-- 備考 -->
                            <div class="detail-section full-width">
                                <h3>備考</h3>
                                <p class="notes">${policy.notes}</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" id="download-policy-btn">
                            <i class="fas fa-download"></i> 証券ダウンロード
                        </button>
                        <button class="btn btn-primary" id="renew-policy-btn">
                            <i class="fas fa-sync"></i> 更新手続き
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // モーダルイベントリスナー設定
    setupModalEventListeners(modal) {
        // 閉じるボタン
        const closeBtn = modal.querySelector('#close-policy-modal');
        const overlay = modal.querySelector('.modal-overlay');

        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        };

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        // ダウンロードボタン
        const downloadBtn = modal.querySelector('#download-policy-btn');
        downloadBtn.addEventListener('click', () => {
            alert('証券ダウンロード機能は現在開発中です。');
        });

        // 更新ボタン
        const renewBtn = modal.querySelector('#renew-policy-btn');
        renewBtn.addEventListener('click', () => {
            alert('更新手続き機能は現在開発中です。');
        });

        // 在庫リスク確認ボタン
        const inventoryRiskBtn = modal.querySelector('#view-inventory-risk-btn');
        if (inventoryRiskBtn) {
            inventoryRiskBtn.addEventListener('click', () => {
                closeModal();
                // リスクダッシュボードに遷移
                this.navigateToRiskDashboard();
            });
        }
    }

    // リスクダッシュボードに遷移
    navigateToRiskDashboard() {
        // サイドバーのリスクダッシュボードメニューをアクティブに
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.dataset.screen === 'risk-analysis') {
                item.classList.add('active');
            }
        });

        // コンテンツ画面を切り替え
        const contentScreens = document.querySelectorAll('.content-screen');
        contentScreens.forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById('risk-analysis').classList.add('active');

        // 在庫水準推移のセクションまでスクロール
        setTimeout(() => {
            const inventoryChart = document.getElementById('inventory-chart');
            if (inventoryChart) {
                inventoryChart.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // ハイライト効果
                inventoryChart.style.outline = '3px solid var(--danger-color)';
                inventoryChart.style.outlineOffset = '8px';
                setTimeout(() => {
                    inventoryChart.style.outline = 'none';
                }, 2000);
            }
        }, 100);
    }
}

// グローバルインスタンス作成
document.addEventListener('DOMContentLoaded', () => {
    window.insuranceManager = new InsuranceManager();
});
