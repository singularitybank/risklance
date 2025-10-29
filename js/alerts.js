// Risk Lance - アラート機能管理

class AlertManager {
    constructor() {
        this.notifications = [];
        this.notificationDropdownOpen = false;
        this.initializeNotifications();
    }

    // 通知システム初期化
    initializeNotifications() {
        // デフォルトの通知を追加
        this.notifications = [
            {
                id: 1,
                type: 'info',
                title: '取引先からリスク評価レポート提出の要望',
                message: 'ABC商事様より、取引継続のためリスク評価レポートの提出を依頼されました',
                icon: 'fas fa-file-alt',
                timestamp: new Date(),
                targetScreen: 'risk-branding',
                unread: true
            },
            {
                id: 2,
                type: 'warning',
                title: '火災保険の更新期限',
                message: '火災保険の更新期限が近づいています（2024年3月15日）',
                icon: 'fas fa-exclamation-triangle',
                timestamp: new Date(),
                targetScreen: 'insurance-portfolio',
                unread: true
            },
            {
                id: 3,
                type: 'success',
                title: 'Risk Lance認定企業ランキング',
                message: 'Aランクを達成しました',
                icon: 'fas fa-trophy',
                timestamp: new Date(),
                targetScreen: 'risk-branding',
                unread: true
            }
        ];

        // 通知アイコンのクリックイベント設定
        this.setupNotificationIcon();
    }

    // 通知アイコンのイベント設定
    setupNotificationIcon() {
        const notificationIcon = document.querySelector('.notification-icon');
        if (notificationIcon) {
            notificationIcon.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleNotificationDropdown();
            });
        }

        // ドロップダウン外をクリックしたら閉じる
        document.addEventListener('click', (e) => {
            const dropdown = document.querySelector('.notification-dropdown');
            if (dropdown && this.notificationDropdownOpen && !dropdown.contains(e.target)) {
                this.closeNotificationDropdown();
            }
        });
    }

    // 通知ドロップダウンの表示切り替え
    toggleNotificationDropdown() {
        if (this.notificationDropdownOpen) {
            this.closeNotificationDropdown();
        } else {
            this.openNotificationDropdown();
        }
    }

    // 通知ドロップダウンを開く
    openNotificationDropdown() {
        // 既存のドロップダウンを削除
        const existingDropdown = document.querySelector('.notification-dropdown');
        if (existingDropdown) {
            existingDropdown.remove();
        }

        // ドロップダウンHTML生成
        const dropdownHtml = this.generateNotificationDropdownHtml();

        // ヘッダーに追加
        const header = document.querySelector('.header');
        if (header) {
            header.insertAdjacentHTML('beforeend', dropdownHtml);
            this.notificationDropdownOpen = true;

            // 各通知アイテムにクリックイベントを設定
            this.setupNotificationItemEvents();
        }
    }

    // 通知ドロップダウンを閉じる
    closeNotificationDropdown() {
        const dropdown = document.querySelector('.notification-dropdown');
        if (dropdown) {
            dropdown.remove();
            this.notificationDropdownOpen = false;
        }
    }

    // 通知ドロップダウンHTML生成
    generateNotificationDropdownHtml() {
        const notificationsHtml = this.notifications.map(notif => `
            <div class="notification-dropdown-item ${notif.unread ? 'unread' : ''}" data-notification-id="${notif.id}" data-target-screen="${notif.targetScreen}">
                <i class="${notif.icon} notification-dropdown-icon ${notif.type}"></i>
                <div class="notification-dropdown-content">
                    <div class="notification-dropdown-title">${notif.title}</div>
                    <div class="notification-dropdown-message">${notif.message}</div>
                    <div class="notification-dropdown-time">${this.formatTime(notif.timestamp)}</div>
                </div>
            </div>
        `).join('');

        return `
            <div class="notification-dropdown">
                <div class="notification-dropdown-header">
                    <h3>通知</h3>
                    <span class="notification-count">${this.notifications.filter(n => n.unread).length}件の未読</span>
                </div>
                <div class="notification-dropdown-list">
                    ${notificationsHtml}
                </div>
            </div>
        `;
    }

    // 通知アイテムのイベント設定
    setupNotificationItemEvents() {
        const items = document.querySelectorAll('.notification-dropdown-item');
        items.forEach(item => {
            item.addEventListener('click', () => {
                const notificationId = parseInt(item.dataset.notificationId);
                const targetScreen = item.dataset.targetScreen;
                this.handleNotificationClick(notificationId, targetScreen);
            });
        });
    }

    // 通知クリック処理
    handleNotificationClick(notificationId, targetScreen) {
        // 通知を既読にする
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.unread = false;
        }

        // 通知バッジを更新
        this.updateNotificationBadge();

        // ドロップダウンを閉じる
        this.closeNotificationDropdown();

        // 対象画面に遷移
        if (targetScreen && window.riskLanceApp) {
            window.riskLanceApp.switchScreen(targetScreen);

            // サイドバーメニューもアクティブ化
            const menuItem = document.querySelector(`.menu-item[data-screen="${targetScreen}"]`);
            if (menuItem) {
                window.riskLanceApp.updateActiveMenu(menuItem);
            }
        }
    }

    // 時刻フォーマット
    formatTime(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (minutes < 1) return 'たった今';
        if (minutes < 60) return `${minutes}分前`;
        if (hours < 24) return `${hours}時間前`;
        return `${days}日前`;
    }

    // 緊急アラート表示
    displayEmergencyAlerts() {
        const alertsContainer = document.querySelector('.emergency-alerts');
        const emergencyAlerts = window.dataManager.getEmergencyAlerts();

        if (!alertsContainer || !emergencyAlerts) return;

        emergencyAlerts.forEach(alert => {
            const alertElement = alertsContainer.querySelector(`[data-alert-id="${alert.id}"]`);
            if (alertElement) {
                // 既存のアラートボタンにイベントリスナーを追加
                const actionBtn = alertElement.querySelector('.alert-action');
                if (actionBtn) {
                    actionBtn.addEventListener('click', () => this.handleAlertAction(alert));
                }
            }
        });
    }

    // アラートアクション処理
    handleAlertAction(alert) {
        switch (alert.level) {
            case 'critical':
                this.showCriticalAlertDialog(alert);
                break;
            case 'high':
                this.showHighAlertDialog(alert);
                break;
            default:
                this.showAlertDialog(alert);
        }
    }

    // 緊急アラートダイアログ表示
    showCriticalAlertDialog(alert) {
        const message = `【緊急対応が必要です】\n\n${alert.title}\n\n${alert.description}\n\n${alert.coverageText}\n\n即座に対策本部を設置し、以下の対応を実施してください：\n1. 現地状況の確認\n2. 在庫・設備の緊急移動\n3. 保険会社への連絡\n4. 代替拠点の確保`;

        if (confirm(message + '\n\n対策本部を設置しますか？')) {
            this.activateEmergencyResponse(alert);
        }
    }

    // 高リスクアラートダイアログ表示
    showHighAlertDialog(alert) {
        const message = `【高リスク警告】\n\n${alert.title}\n\n${alert.description}\n\n${alert.coverageText}\n\n推奨アクション：\n1. 取引条件の見直し\n2. 信用保険の検討\n3. 定期的な信用調査\n4. 取引分散の検討`;

        alert(message);
    }

    // アラートダイアログ表示
    showAlertDialog(alert) {
        alert(`${alert.title}\n\n${alert.description}\n\n${alert.coverageText}`);
    }

    // 災害リスク詳細表示
    showDisasterRiskDetails(disasterData) {
        const message = `【災害リスク詳細】\n\n拠点: ${disasterData.location}\nリスク種類: ${disasterData.type}\n発生確率: ${disasterData.probability}%\n\n推奨対策：\n1. 定期的な防災訓練の実施\n2. 災害対応マニュアルの整備\n3. 保険補償内容の確認\n4. 代替拠点の準備`;

        alert(message);
    }

    // 信用リスク詳細表示
    showCreditRiskDetails(creditData) {
        const riskLevel = creditData.level === 'high' ? '高リスク' :
                         creditData.level === 'medium' ? '中リスク' : '低リスク';

        const message = `【取引先信用リスク詳細】\n\n企業名: ${creditData.company}\nリスクスコア: ${creditData.score}\nリスクレベル: ${riskLevel}\n\n推奨アクション：\n1. 定期的な信用調査\n2. 取引条件の見直し\n3. 債権保全策の検討\n4. 取引信用保険の活用`;

        alert(message);
    }

    // サマリー詳細表示
    showSummaryDetails(cardType) {
        const riskSummary = window.dataManager.getRiskSummary();
        let message = '';

        switch (cardType) {
            case 'critical':
                message = '【緊急対応必要案件】\n\n1. 洪水リスク警告（埼玉倉庫）\n2. 取引先信用リスク（ABC商事）\n\n即座に対応が必要です。';
                break;
            case 'high':
                message = '【高リスク案件】\n\n1. システム脆弱性\n2. 在庫過多リスク\n3. 従業員安全リスク\n4. 為替変動リスク\n5. 競合他社参入リスク\n\n計画的な対応を検討してください。';
                break;
            case 'medium':
                message = '【中リスク案件】\n\n8件の中リスク案件があります。\n定期的な監視と予防的対策を継続してください。';
                break;
            case 'coverage':
                message = `【保険カバー率詳細】\n\n現在のカバー率: ${riskSummary.coverageRate}%\n\n未カバー項目：\n- サイバーセキュリティ\n- 洪水災害（一部地域）\n- 市場リスク\n\n保険見直しを推奨します。`;
                break;
        }

        alert(message);
    }

    // 緊急対応システム起動
    activateEmergencyResponse(alert) {
        // 緊急対応システムの模擬実装
        this.addNotification({
            type: 'critical',
            message: `緊急対応システムが起動されました - ${alert.title}`,
            icon: 'fas fa-exclamation-circle'
        });

        // 通知音やアラートの実装（実際のシステムでは音声やメール通知）
        console.log('🚨 緊急対応システム起動:', alert.title);

        // 関係者への通知（模擬）
        setTimeout(() => {
            this.addNotification({
                type: 'info',
                message: '関係部署に緊急対応の指示を送信しました',
                icon: 'fas fa-paper-plane'
            });
        }, 2000);
    }

    // 通知追加
    addNotification(notification) {
        const newNotification = window.dataManager.addNotification(notification);
        this.updateNotificationDisplay();
        return newNotification;
    }

    // 通知表示更新
    updateNotificationDisplay() {
        const notifications = window.dataManager.getNotifications();
        const notificationList = document.querySelector('.notification-list');

        if (notificationList && notifications.length > 0) {
            const latestNotification = notifications[notifications.length - 1];

            const notificationElement = document.createElement('div');
            notificationElement.className = 'notification-item';
            notificationElement.innerHTML = `
                <i class="${latestNotification.icon} ${latestNotification.type}"></i>
                <span>${latestNotification.message}</span>
            `;

            notificationList.appendChild(notificationElement);
        }
    }

    // 通知バッジ更新
    updateNotificationBadge() {
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            const unreadCount = this.notifications.filter(n => n.unread).length;
            badge.textContent = unreadCount;

            // 未読がない場合はバッジを非表示
            if (unreadCount === 0) {
                badge.style.display = 'none';
            } else {
                badge.style.display = 'block';
            }
        }
    }

    // 保険期限チェック
    checkInsuranceExpiry() {
        const today = new Date();
        const expiryThreshold = 30; // 30日前に警告
        const insuranceData = window.dataManager.getInsuranceData();

        insuranceData.forEach(insurance => {
            const expiryDate = new Date(insurance.endDate);
            const daysUntilExpiry = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

            if (daysUntilExpiry <= expiryThreshold && daysUntilExpiry > 0) {
                this.addNotification({
                    type: 'warning',
                    message: `${insurance.type}の更新期限が近づいています（${daysUntilExpiry}日後）`,
                    icon: 'fas fa-exclamation-triangle'
                });
            }
        });
    }

    // 保険詳細表示
    showInsuranceDetails(insuranceType) {
        alert(`${insuranceType}の詳細情報を表示します。\n\n現在の補償内容を確認し、適切な見直し案をご提案いたします。`);
    }

    // 保険推奨表示
    showInsuranceRecommendation(insuranceType) {
        alert(`${insuranceType}のご提案\n\n貴社のリスク分析結果に基づき、${insuranceType}の導入をお勧めいたします。\n\n詳細な見積もりをご希望の場合は、担当者にお声がけください。`);
    }

    // 補償見直し表示
    showCoverageReview(insuranceType) {
        alert(`${insuranceType}の補償見直し\n\n現在の事業規模と比較して、補償額の調整が必要な可能性があります。\n\n無料診断をご希望の場合は、お気軽にお申し付けください。`);
    }

    // アクションダイアログ表示
    showActionDialog(title, message) {
        alert(`${title}\n\n${message}`);
    }

    // 推奨ダイアログ表示
    showRecommendationDialog(title, message) {
        alert(`${title}\n\n${message}\n\n担当者より詳細をご連絡いたします。`);
    }
}

// グローバルにAlertManagerインスタンスを作成
window.alertManager = new AlertManager();