// Risk Lance - 業務アプリ画面コンテンツレンダラー

class BusinessAppsContentRenderer {
    /**
     * 業務アプリ画面のコンテンツを生成
     */
    static render() {
        return `
            <h2>業務アプリ</h2>

            <!-- 業務アプリタブナビゲーション -->
            <div class="business-app-tabs">
                <button class="tab-button active" data-app="sales">
                    <i class="fas fa-chart-line"></i>
                    販売管理
                </button>
                <button class="tab-button" data-app="inventory">
                    <i class="fas fa-boxes"></i>
                    在庫管理
                </button>
                <button class="tab-button" data-app="customer">
                    <i class="fas fa-users"></i>
                    顧客管理
                </button>
            </div>

            ${this.renderSalesApp()}
            ${this.renderInventoryApp()}
            ${this.renderCustomerApp()}
        `;
    }

    /**
     * 販売管理アプリを生成
     */
    static renderSalesApp() {
        return `
            <!-- 販売管理アプリ -->
            <div id="sales-app" class="business-app-content active">
                <div class="app-layout">
                    <!-- 左側: ナビゲーション -->
                    <div class="app-navigation">
                        <h3>販売管理メニュー</h3>
                        <nav class="app-nav-menu">
                            <button class="nav-item active" data-section="dashboard">
                                <i class="fas fa-tachometer-alt"></i>
                                ダッシュボード
                            </button>
                            <button class="nav-item" data-section="orders">
                                <i class="fas fa-shopping-cart"></i>
                                受注管理
                            </button>
                            <button class="nav-item" data-section="invoices">
                                <i class="fas fa-file-invoice"></i>
                                請求書管理
                            </button>
                            <button class="nav-item" data-section="reports">
                                <i class="fas fa-chart-bar"></i>
                                売上レポート
                            </button>
                            <button class="nav-item" data-section="settings">
                                <i class="fas fa-cog"></i>
                                設定
                            </button>
                        </nav>
                    </div>

                    <!-- 右側: コンテンツエリア -->
                    <div class="app-main-content">
                        <!-- ダッシュボード -->
                        <div class="app-section active" id="sales-dashboard">
                            <h4>販売管理ダッシュボード</h4>
                            <div class="recent-activities">
                                <h5>直近の入力内容</h5>
                                <div class="activity-list">
                                    <!-- アクティビティはJavaScriptで動的に生成されます -->
                                </div>
                            </div>

                            <div class="quick-stats">
                                <div class="stat-card">
                                    <h6>今日の売上</h6>
                                    <span class="stat-value">¥0</span>
                                </div>
                                <div class="stat-card">
                                    <h6>今月の売上</h6>
                                    <span class="stat-value">¥0</span>
                                </div>
                                <div class="stat-card">
                                    <h6>未処理受注</h6>
                                    <span class="stat-value">0件</span>
                                </div>
                            </div>
                        </div>

                        <!-- 受注管理 -->
                        <div class="app-section" id="sales-orders">
                            <h4>受注管理</h4>
                            <div class="recent-activities">
                                <h5>最新の受注情報</h5>
                                <div class="order-list">
                                    <!-- 受注はJavaScriptで動的に生成されます -->
                                </div>
                            </div>
                        </div>

                        <!-- その他のセクション -->
                        <div class="app-section" id="sales-invoices">
                            <h4>請求書管理</h4>
                            <p>請求書管理機能は開発中です。</p>
                        </div>

                        <div class="app-section" id="sales-reports">
                            <h4>売上レポート</h4>
                            <p>売上レポート機能は開発中です。</p>
                        </div>

                        <div class="app-section" id="sales-settings">
                            <h4>設定</h4>
                            <p>設定画面は開発中です。</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 在庫管理アプリを生成
     */
    static renderInventoryApp() {
        return `
            <!-- 在庫管理アプリ -->
            <div id="inventory-app" class="business-app-content">
                <div class="app-layout">
                    <div class="app-navigation">
                        <h3>在庫管理メニュー</h3>
                        <nav class="app-nav-menu">
                            <button class="nav-item active" data-section="dashboard">
                                <i class="fas fa-tachometer-alt"></i>
                                ダッシュボード
                            </button>
                            <button class="nav-item" data-section="stock">
                                <i class="fas fa-warehouse"></i>
                                在庫一覧
                            </button>
                            <button class="nav-item" data-section="movements">
                                <i class="fas fa-exchange-alt"></i>
                                入出庫履歴
                            </button>
                            <button class="nav-item" data-section="alerts">
                                <i class="fas fa-exclamation-triangle"></i>
                                在庫アラート
                            </button>
                        </nav>
                    </div>
                    <div class="app-main-content">
                        <div class="app-section active" id="inventory-dashboard">
                            <h4>在庫管理ダッシュボード</h4>
                            <div class="recent-activities">
                                <h5>直近の入出庫記録</h5>
                                <div class="activity-list">
                                    <!-- アクティビティはJavaScriptで動的に生成されます -->
                                </div>
                            </div>

                            <div class="quick-stats">
                                <div class="stat-card">
                                    <h6>総在庫アイテム</h6>
                                    <span class="stat-value">0</span>
                                </div>
                                <div class="stat-card">
                                    <h6>在庫総額</h6>
                                    <span class="stat-value">¥0</span>
                                </div>
                                <div class="stat-card alert">
                                    <h6>要注意在庫</h6>
                                    <span class="stat-value">0件</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 顧客管理アプリを生成
     */
    static renderCustomerApp() {
        return `
            <!-- 顧客管理アプリ -->
            <div id="customer-app" class="business-app-content">
                <div class="app-layout">
                    <div class="app-navigation">
                        <h3>顧客管理メニュー</h3>
                        <nav class="app-nav-menu">
                            <button class="nav-item active" data-section="dashboard">
                                <i class="fas fa-tachometer-alt"></i>
                                ダッシュボード
                            </button>
                            <button class="nav-item" data-section="customers">
                                <i class="fas fa-address-book"></i>
                                顧客一覧
                            </button>
                            <button class="nav-item" data-section="opportunities">
                                <i class="fas fa-handshake"></i>
                                商談管理
                            </button>
                            <button class="nav-item" data-section="follow-ups">
                                <i class="fas fa-calendar-check"></i>
                                フォローアップ
                            </button>
                        </nav>
                    </div>
                    <div class="app-main-content">
                        <div class="app-section active" id="customer-dashboard">
                            <h4>顧客管理ダッシュボード</h4>
                            <div class="recent-activities">
                                <h5>直近の顧客活動</h5>
                                <div class="activity-list">
                                    <!-- アクティビティはJavaScriptで動的に生成されます -->
                                </div>
                            </div>

                            <div class="quick-stats">
                                <div class="stat-card">
                                    <h6>アクティブ顧客</h6>
                                    <span class="stat-value">0</span>
                                </div>
                                <div class="stat-card">
                                    <h6>進行中商談</h6>
                                    <span class="stat-value">0</span>
                                </div>
                                <div class="stat-card">
                                    <h6>今月新規</h6>
                                    <span class="stat-value">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// グローバルに公開
window.BusinessAppsContentRenderer = BusinessAppsContentRenderer;

console.log('✅ BusinessAppsContentRenderer が読み込まれました');
