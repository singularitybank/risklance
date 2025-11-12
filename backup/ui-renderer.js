// Risk Lance - UI描画マネージャー
// データを動的にHTMLに描画

class UIRenderer {
    constructor() {
        this.dataManager = window.dataManager;
    }

    /**
     * ダッシュボードの動的要素を描画
     */
    renderDashboard() {
        const data = this.dataManager.getDashboardData();

        // お知らせの描画
        this.renderNotifications();

        // ダッシュボードカードの描画
        this.renderDashboardCards(data);

        // リスクダッシュボードの描画
        this.renderRiskDashboard(data);

        // ステータスセクションの描画
        this.renderStatusSection(data);
    }

    /**
     * お知らせを描画
     */
    renderNotifications() {
        const notifications = this.dataManager.getNotifications();
        const notificationList = document.getElementById('notification-list');

        if (!notificationList) return;

        notificationList.innerHTML = notifications.map(notification => {
            const iconClass = notification.icon || 'fas fa-info-circle';
            const typeClass = this.getNotificationTypeClass(notification.type);
            const targetTab = this.getNotificationTargetTab(notification.type);

            return `
                <div class="notification-item ${typeClass} clickable" data-target-tab="${targetTab}">
                    <i class="${iconClass}"></i>
                    <span>${notification.message}</span>
                </div>
            `;
        }).join('');

        // クリックイベントを再設定
        this.setupNotificationClickHandlers();
    }

    /**
     * 通知タイプに応じたCSSクラスを取得
     */
    getNotificationTypeClass(type) {
        const typeMap = {
            'warning': 'alert-item critical',
            'info': '',
            'success': ''
        };
        return typeMap[type] || '';
    }

    /**
     * 通知タイプに応じたターゲットタブを取得
     */
    getNotificationTargetTab(type) {
        const tabMap = {
            'warning': 'insurance-portfolio',
            'info': 'risk-analysis',
            'success': 'risk-branding'
        };
        return tabMap[type] || 'dashboard';
    }

    /**
     * 通知のクリックハンドラーを設定
     */
    setupNotificationClickHandlers() {
        const notificationItems = document.querySelectorAll('.notification-item.clickable');
        notificationItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const targetTab = e.currentTarget.getAttribute('data-target-tab');
                if (targetTab && window.riskLanceApp) {
                    window.riskLanceApp.switchScreen(targetTab);
                    const menuItem = document.querySelector(`.menu-item[data-screen="${targetTab}"]`);
                    if (menuItem) {
                        window.riskLanceApp.updateActiveMenu(menuItem);
                    }
                }
            });
        });
    }

    /**
     * ダッシュボードカードを描画
     */
    renderDashboardCards(data) {
        const cardsContainer = document.getElementById('dashboard-cards');
        if (!cardsContainer) return;

        const cards = [
            {
                title: '販売管理',
                value: data.sales.monthly,
                label: '今月売上',
                change: data.sales.change,
                changeType: data.sales.change >= 0 ? 'positive' : 'negative'
            },
            {
                title: '在庫管理',
                value: data.inventory.items.toLocaleString(),
                label: '在庫アイテム',
                change: data.inventory.change,
                changeType: data.inventory.change >= 0 ? 'positive' : 'negative'
            },
            {
                title: '顧客管理',
                value: data.customers.active.toLocaleString(),
                label: 'アクティブ顧客',
                change: data.customers.change,
                changeType: data.customers.change >= 0 ? 'positive' : 'negative'
            },
            {
                title: '保険管理',
                value: data.insurance.contracts,
                label: '契約中保険',
                status: data.insurance.status,
                statusText: data.insurance.status === 'ok' ? '正常' : '要確認'
            }
        ];

        cardsContainer.innerHTML = cards.map(card => {
            if (card.status !== undefined) {
                // 保険管理カード（ステータス表示）
                return `
                    <div class="card">
                        <h4>${card.title}</h4>
                        <div class="card-content">
                            <div class="metric">
                                <span class="value">${card.value}</span>
                                <span class="label">${card.label}</span>
                            </div>
                            <div class="status-${card.status}">${card.statusText}</div>
                        </div>
                    </div>
                `;
            } else {
                // その他のカード（変化率表示）
                const changeSign = card.change >= 0 ? '+' : '';
                return `
                    <div class="card">
                        <h4>${card.title}</h4>
                        <div class="card-content">
                            <div class="metric">
                                <span class="value">${card.value}</span>
                                <span class="label">${card.label}</span>
                            </div>
                            <div class="change ${card.changeType}">${changeSign}${card.change}%</div>
                        </div>
                    </div>
                `;
            }
        }).join('');
    }

    /**
     * リスクダッシュボードを描画
     */
    renderRiskDashboard(data) {
        const riskDashboard = document.querySelector('#risk-dashboard-summary .risk-overview');
        if (!riskDashboard) return;

        const riskLevel = data.riskScore >= 80 ? 'low' : data.riskScore >= 50 ? 'medium' : 'high';

        const categories = [
            { name: '火災リスク', data: data.riskCategories.fire },
            { name: '賠償リスク', data: data.riskCategories.liability },
            { name: '経営リスク', data: data.riskCategories.management }
        ];

        riskDashboard.innerHTML = `
            <div class="risk-level ${riskLevel}">
                <div class="risk-score">${data.riskScore}</div>
                <div class="risk-label">総合リスクスコア</div>
            </div>
            <div class="risk-categories">
                ${categories.map(cat => `
                    <div class="risk-category">
                        <span class="category-name">${cat.name}</span>
                        <div class="progress-bar">
                            <div class="progress" style="width: ${cat.data.level}%"></div>
                        </div>
                        <span class="risk-value">${cat.data.label}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    /**
     * ステータスセクションを描画
     */
    renderStatusSection(data) {
        const statusSection = document.getElementById('status-section');
        if (!statusSection) return;

        const leagueData = data.league;
        const guildData = this.dataManager.getGuildData();

        const leagueName = leagueData.league.toUpperCase();
        const leagueMedalClass = leagueData.league; // gold, silver, etc

        statusSection.innerHTML = `
            <div class="league-status">
                <h4>リーグステータス</h4>
                <div class="league-info">
                    <div class="league-medal-display">
                        <div class="league-medal ${leagueMedalClass}">
                            <i class="fas fa-medal"></i>
                        </div>
                        <div class="league-details">
                            <span class="league-rank">Aランク (${leagueName})</span>
                            <span class="league-points">${leagueData.lp.toLocaleString()}ポイント</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="guild-status">
                <h4>ギルドステータス</h4>
                <div class="guild-info">
                    <span class="guild-name">${guildData.currentGuild.name}</span>
                    <span class="guild-rank">${guildData.currentGuild.rank}位/${guildData.currentGuild.memberCount}企業</span>
                </div>
            </div>
        `;
    }

    /**
     * 販売管理アプリを描画
     */
    renderSalesApp() {
        const salesData = this.dataManager.getSalesData();

        // アクティビティリストを描画
        this.renderActivityList(salesData.recentActivities, '#sales-dashboard .activity-list');

        // 統計カードを描画
        this.renderSalesStats(salesData);

        // 受注リストを描画
        this.renderOrderList(salesData.recentOrders);
    }

    /**
     * アクティビティリストを描画
     */
    renderActivityList(activities, selector) {
        const activityList = document.querySelector(selector);
        if (!activityList || !activities) return;

        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <span class="activity-time">${activity.time}</span>
                <span class="activity-desc">${activity.description}</span>
                <span class="activity-user">${activity.user}</span>
            </div>
        `).join('');
    }

    /**
     * 販売統計を描画
     */
    renderSalesStats(salesData) {
        const statCards = document.querySelectorAll('#sales-dashboard .stat-card');
        if (statCards.length >= 3) {
            // 今日の売上
            const todayValue = statCards[0].querySelector('.stat-value');
            if (todayValue) todayValue.textContent = this.dataManager.formatCurrency(salesData.todaySales);

            // 今月の売上
            const monthlyValue = statCards[1].querySelector('.stat-value');
            if (monthlyValue) monthlyValue.textContent = this.dataManager.formatCurrency(salesData.monthlySales);

            // 未処理受注
            const pendingValue = statCards[2].querySelector('.stat-value');
            if (pendingValue) pendingValue.textContent = `${salesData.pendingOrders}件`;
        }
    }

    /**
     * 受注リストを描画
     */
    renderOrderList(orders) {
        const orderList = document.querySelector('#sales-orders .order-list');
        if (!orderList || !orders) return;

        orderList.innerHTML = orders.map(order => `
            <div class="order-item">
                <span class="order-id">#${order.id}</span>
                <span class="order-customer">${order.customer}</span>
                <span class="order-amount">${this.dataManager.formatCurrency(order.amount)}</span>
                <span class="order-status ${order.status}">${order.status === 'pending' ? '処理中' : '完了'}</span>
            </div>
        `).join('');
    }

    /**
     * 在庫管理アプリを描画
     */
    renderInventoryApp() {
        const inventoryData = this.dataManager.getInventoryData();

        // アクティビティリストを描画
        const activityList = document.querySelector('#inventory-dashboard .activity-list');
        if (activityList && inventoryData.recentMovements) {
            activityList.innerHTML = inventoryData.recentMovements.map(movement => `
                <div class="activity-item ${movement.urgent ? 'urgent' : ''}">
                    <span class="activity-time">${movement.time}</span>
                    <span class="activity-desc">${movement.description}</span>
                    <span class="activity-user">${movement.user}</span>
                </div>
            `).join('');
        }

        // 統計カードを描画
        const statCards = document.querySelectorAll('#inventory-dashboard .stat-card');
        if (statCards.length >= 3) {
            // 総在庫アイテム
            const itemsValue = statCards[0].querySelector('.stat-value');
            if (itemsValue) itemsValue.textContent = inventoryData.totalItems.toLocaleString();

            // 在庫総額
            const valueElement = statCards[1].querySelector('.stat-value');
            if (valueElement) valueElement.textContent = this.dataManager.formatCurrency(inventoryData.totalValue);

            // 要注意在庫
            const alertsValue = statCards[2].querySelector('.stat-value');
            if (alertsValue) alertsValue.textContent = `${inventoryData.alertItems}件`;
        }
    }

    /**
     * 顧客管理アプリを描画
     */
    renderCustomerApp() {
        const customerData = this.dataManager.getCustomerData();

        // アクティビティリストを描画
        const activityList = document.querySelector('#customer-dashboard .activity-list');
        if (activityList && customerData.recentActivities) {
            activityList.innerHTML = customerData.recentActivities.map(activity => `
                <div class="activity-item">
                    <span class="activity-time">${activity.time}</span>
                    <span class="activity-desc">${activity.description}</span>
                    <span class="activity-user">${activity.user}</span>
                </div>
            `).join('');
        }

        // 統計カードを描画
        const statCards = document.querySelectorAll('#customer-dashboard .stat-card');
        if (statCards.length >= 3) {
            // アクティブ顧客
            const activeValue = statCards[0].querySelector('.stat-value');
            if (activeValue) activeValue.textContent = customerData.activeCustomers.toLocaleString();

            // 進行中商談
            const opportunitiesValue = statCards[1].querySelector('.stat-value');
            if (opportunitiesValue) opportunitiesValue.textContent = customerData.activeOpportunities.toLocaleString();

            // 今月新規
            const newValue = statCards[2].querySelector('.stat-value');
            if (newValue) newValue.textContent = customerData.newThisMonth.toLocaleString();
        }
    }

    /**
     * リスク分析画面を描画
     */
    renderRiskAnalysis() {
        const creditRiskData = this.dataManager.getExternalRiskData().creditRisk;

        // 取引先信用リスクを描画
        const riskCompanies = document.querySelector('.credit-risk-chart .risk-companies');
        if (riskCompanies && creditRiskData) {
            riskCompanies.innerHTML = creditRiskData.map(company => `
                <div class="company-risk ${company.level}">
                    <div class="company-info">
                        <span class="company-name">${company.company}</span>
                        <span class="risk-score">${company.score}</span>
                    </div>
                    <div class="risk-bar">
                        <div class="risk-fill" style="width: ${company.score}%"></div>
                    </div>
                </div>
            `).join('');
        }
    }

    /**
     * リスクブランディング画面を描画
     */
    renderRiskBranding() {
        const leagueData = this.dataManager.getLeagueData();

        // リーグ進捗バー
        const progressFill = document.querySelector('.league-progress .progress-fill');
        if (progressFill && leagueData.currentUser) {
            const progress = (leagueData.currentUser.lp % 1000) / 10; // 次のティアまでの進捗
            progressFill.style.width = `${progress}%`;
        }

        // 現在のポイント
        const currentPoints = document.querySelector('.current-points');
        if (currentPoints && leagueData.currentUser) {
            currentPoints.textContent = `${leagueData.currentUser.lp.toLocaleString()} LP`;
        }

        // 次のティアまで
        const nextTier = document.querySelector('.next-tier');
        if (nextTier && leagueData.currentUser) {
            const pointsToNext = 1000 - (leagueData.currentUser.lp % 1000);
            nextTier.textContent = `次のリーグまで ${pointsToNext} LP`;
        }
    }

    /**
     * すべての動的コンテンツを初期化
     */
    initializeAll() {
        this.renderDashboard();
    }
}

// グローバルインスタンス作成
window.uiRenderer = new UIRenderer();

console.log('✅ UIRenderer が読み込まれました');
