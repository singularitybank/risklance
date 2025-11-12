// Risk Lance - 保険ポートフォリオ画面コンテンツレンダラー

class InsurancePortfolioContentRenderer {
    /**
     * 保険ポートフォリオ画面のコンテンツを生成
     * @param {Object} data - 保険ポートフォリオデータ（policies, coverage, recommendations）
     */
    static render(data = null) {
        // データマネージャーからデータを取得
        const portfolioData = data || (window.dataManager ? window.dataManager.getInsurancePortfolioData() : null);

        if (!portfolioData) {
            return '<p>データを読み込んでいます...</p>';
        }

        return `
            <div class="screen-header">
                <h2>保険ポートフォリオ</h2>
                <div class="header-actions">
                    <button class="btn btn-primary" id="upload-policy-btn">
                        <i class="fas fa-plus"></i>
                        新規証券登録
                    </button>
                    <button class="btn btn-secondary" id="upload-document-btn">
                        <i class="fas fa-upload"></i>
                        証券アップロード
                    </button>
                </div>
            </div>

            ${this.renderInsuranceTable(portfolioData.policies)}
            ${this.renderCoverageOverview(portfolioData.coverage)}
            ${this.renderRecommendations(portfolioData.recommendations)}
        `;
    }

    /**
     * 保険契約一覧テーブルを生成
     */
    static renderInsuranceTable(policies) {
        if (!policies || policies.length === 0) {
            return '<p>保険契約データがありません。</p>';
        }

        const rows = policies.map(policy => {
            const statusClass = policy.status === 'warning' ? 'status-warning' : 'status-ok';
            const statusText = policy.status === 'warning' ? '見直し要' : '正常';
            const rowClass = policy.status === 'warning' ? 'alert' : '';

            return `
                <tr class="${rowClass} insurance-row" data-policy-id="${policy.id}">
                    <td>${policy.type}</td>
                    <td>${policy.product}</td>
                    <td>${policy.company}</td>
                    <td>${policy.startDate}</td>
                    <td>${policy.endDate}</td>
                    <td>${policy.coverage}</td>
                    <td><span class="${statusClass}">${statusText}</span></td>
                </tr>
            `;
        }).join('');

        return `
            <!-- 保険契約一覧 -->
            <div class="insurance-table-container">
                <h3>保険契約一覧</h3>
                <table class="insurance-table">
                    <thead>
                        <tr>
                            <th>保険種目</th>
                            <th>商品名</th>
                            <th>保険会社</th>
                            <th>保険始期</th>
                            <th>保険終期</th>
                            <th>補償内容</th>
                            <th>ステータス</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
        `;
    }

    /**
     * 保険カバー率を生成
     */
    static renderCoverageOverview(coverageData) {
        if (!coverageData || coverageData.length === 0) {
            return '<p>カバー率データがありません。</p>';
        }

        const items = coverageData.map(item => `
            <div class="coverage-item">
                <h4>${item.category}</h4>
                <div class="coverage-circle">
                    <div class="circle-progress" data-percent="${item.percent}">
                        <span>${item.percent}%</span>
                    </div>
                </div>
            </div>
        `).join('');

        return `
            <!-- 保険カバー率 -->
            <div class="coverage-overview">
                <h3>保険別カバー率</h3>
                <div class="coverage-grid">
                    ${items}
                </div>
            </div>
        `;
    }

    /**
     * おすすめ保険見直しを生成
     */
    static renderRecommendations(recommendations) {
        if (!recommendations || recommendations.length === 0) {
            return '<p>おすすめ情報がありません。</p>';
        }

        const items = recommendations.map(rec => `
            <div class="recommendation-item">
                <i class="${rec.icon}"></i>
                <div class="recommendation-content">
                    <h4>${rec.title}</h4>
                    <p>${rec.description}</p>
                </div>
                <button class="recommend-btn">詳細を見る</button>
            </div>
        `).join('');

        return `
            <!-- おすすめ保険見直し -->
            <div class="recommendations">
                <h3>おすすめ保険見直し</h3>
                <div class="recommendation-list">
                    ${items}
                </div>
            </div>
        `;
    }
}

// グローバルに公開
window.InsurancePortfolioContentRenderer = InsurancePortfolioContentRenderer;

console.log('✅ InsurancePortfolioContentRenderer が読み込まれました');
