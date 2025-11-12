// Risk Lance - ダッシュボード画面コンテンツレンダラー

class DashboardContentRenderer {
    /**
     * ダッシュボード画面のコンテンツを生成
     */
    static render() {
        return `
            <!-- お知らせ -->
            <div class="notifications-section">
                <h3>お知らせ</h3>
                <div class="notification-list" id="notification-list">
                    <!-- 通知はJavaScriptで動的に生成されます -->
                </div>
            </div>

            <!-- 保険ギャップ検出アラート -->
            <div id="insurance-gap-alerts-container"></div>

            <!-- ダッシュボードカード -->
            <div class="dashboard-cards" id="dashboard-cards">
                <!-- カードはJavaScriptで動的に生成されます -->
            </div>

            <!-- リスクダッシュボード -->
            <div class="risk-dashboard" id="risk-dashboard-summary">
                <h3>リスクダッシュボード（総合版）</h3>
                <div class="risk-overview">
                    <!-- リスクダッシュボードはJavaScriptで動的に生成されます -->
                </div>
            </div>

            <!-- ステータス -->
            <div class="status-section" id="status-section">
                <!-- ステータスはJavaScriptで動的に生成されます -->
            </div>
        `;
    }
}

// グローバルに公開
window.DashboardContentRenderer = DashboardContentRenderer;

console.log('✅ DashboardContentRenderer が読み込まれました');
