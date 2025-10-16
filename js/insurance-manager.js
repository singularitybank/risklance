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
                status: '更新要',
                premium: '¥1,250,000',
                coverage: {
                    building: '建物: 5億円',
                    equipment: '設備・什器: 1億円',
                    inventory: '商品・製品: 5,000万円',
                    businessInterruption: '営業損失: 3,000万円/月'
                },
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

    // 保険詳細モーダル表示
    showPolicyDetail(policyId) {
        const policy = this.policyData[policyId];

        if (!policy) {
            console.error('保険データが見つかりません:', policyId);
            return;
        }

        // モーダルHTML生成
        const modalHtml = this.generatePolicyDetailModal(policy);

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
    generatePolicyDetailModal(policy) {
        const coverageHtml = Object.entries(policy.coverage)
            .map(([key, value]) => `<li>${value}</li>`)
            .join('');

        const conditionsHtml = policy.specialConditions
            .map(condition => `<li>${condition}</li>`)
            .join('');

        const statusClass = policy.status === '正常' ? 'status-ok' : 'status-warning';
        const riskClass = policy.riskScore > 70 ? 'high' : policy.riskScore > 40 ? 'medium' : 'low';

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
    }
}

// グローバルインスタンス作成
document.addEventListener('DOMContentLoaded', () => {
    window.insuranceManager = new InsuranceManager();
});
