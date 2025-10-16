// Risk Lance - 業務アプリ機能管理

class BusinessAppsManager {
    constructor() {
        this.currentApp = 'sales';
        this.currentSections = {
            sales: 'dashboard',
            inventory: 'dashboard',
            customer: 'dashboard'
        };
        this.initialized = false;
    }

    // 業務アプリ画面の初期化
    initializeBusinessApps() {
        if (this.initialized) return;

        this.setupTabNavigation();
        this.setupSubNavigation();
        this.loadBusinessData();
        this.initialized = true;
    }

    // タブナビゲーションの設定
    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const appType = e.currentTarget.getAttribute('data-app');
                this.switchApp(appType);
            });
        });
    }

    // サブナビゲーションの設定
    setupSubNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.getAttribute('data-section');
                const appContainer = e.currentTarget.closest('.business-app-content');
                const appType = appContainer.id.replace('-app', '');

                this.switchSection(appType, section);
            });
        });
    }

    // アプリ切り替え
    switchApp(appType) {
        // タブボタンの更新
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.classList.remove('active');
            if (button.getAttribute('data-app') === appType) {
                button.classList.add('active');
            }
        });

        // アプリコンテンツの切り替え
        const appContents = document.querySelectorAll('.business-app-content');
        appContents.forEach(content => {
            content.classList.remove('active');
        });

        const targetApp = document.getElementById(`${appType}-app`);
        if (targetApp) {
            targetApp.classList.add('active');
            this.currentApp = appType;

            // アプリ固有の初期化
            this.initializeApp(appType);
        }
    }

    // セクション切り替え
    switchSection(appType, sectionName) {
        const appContainer = document.getElementById(`${appType}-app`);
        if (!appContainer) return;

        // ナビゲーションアイテムの更新
        const navItems = appContainer.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === sectionName) {
                item.classList.add('active');
            }
        });

        // セクションコンテンツの切り替え
        const sections = appContainer.querySelectorAll('.app-section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(`${appType}-${sectionName}`);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSections[appType] = sectionName;

            // セクション固有のデータ読み込み
            this.loadSectionData(appType, sectionName);
        }
    }

    // アプリ固有の初期化
    initializeApp(appType) {
        switch (appType) {
            case 'sales':
                this.initializeSalesApp();
                break;
            case 'inventory':
                this.initializeInventoryApp();
                break;
            case 'customer':
                this.initializeCustomerApp();
                break;
        }
    }

    // 販売管理アプリ初期化
    initializeSalesApp() {
        console.log('販売管理アプリを初期化しました');
        this.updateSalesStats();
    }

    // 在庫管理アプリ初期化
    initializeInventoryApp() {
        console.log('在庫管理アプリを初期化しました');
        this.updateInventoryStats();
    }

    // 顧客管理アプリ初期化
    initializeCustomerApp() {
        console.log('顧客管理アプリを初期化しました');
        this.updateCustomerStats();
    }

    // セクションデータ読み込み
    loadSectionData(appType, sectionName) {
        switch (`${appType}-${sectionName}`) {
            case 'sales-orders':
                this.loadSalesOrders();
                break;
            case 'sales-invoices':
                this.loadSalesInvoices();
                break;
            case 'sales-reports':
                this.loadSalesReports();
                break;
            case 'inventory-stock':
                this.loadInventoryStock();
                break;
            case 'inventory-movements':
                this.loadInventoryMovements();
                break;
            case 'inventory-alerts':
                this.loadInventoryAlerts();
                break;
            case 'customer-customers':
                this.loadCustomerList();
                break;
            case 'customer-opportunities':
                this.loadOpportunities();
                break;
            case 'customer-follow-ups':
                this.loadFollowUps();
                break;
        }
    }

    // データマネージャーからデータを取得
    loadBusinessData() {
        this.salesData = window.dataManager.getSalesData();
        this.inventoryData = window.dataManager.getInventoryData();
        this.customerData = window.dataManager.getCustomerData();
    }

    // 統計データ更新
    updateSalesStats() {
        // 販売管理の統計カードを更新
        this.updateStatCard('sales', 'today-sales', this.salesData.todaySales, '¥');
        this.updateStatCard('sales', 'monthly-sales', this.salesData.monthlySales, '¥');
        this.updateStatCard('sales', 'pending-orders', this.salesData.pendingOrders, '件');
    }

    updateInventoryStats() {
        // 在庫管理の統計カードを更新
        this.updateStatCard('inventory', 'total-items', this.inventoryData.totalItems, '');
        this.updateStatCard('inventory', 'total-value', this.inventoryData.totalValue, '¥');
        this.updateStatCard('inventory', 'alert-items', this.inventoryData.alertItems, '件');
    }

    updateCustomerStats() {
        // 顧客管理の統計カードを更新
        this.updateStatCard('customer', 'active-customers', this.customerData.activeCustomers, '');
        this.updateStatCard('customer', 'active-opportunities', this.customerData.activeOpportunities, '');
        this.updateStatCard('customer', 'new-this-month', this.customerData.newThisMonth, '');
    }

    // 統計カード更新ヘルパー
    updateStatCard(appType, cardType, value, prefix) {
        const statValue = document.querySelector(`#${appType}-app .stat-value`);
        if (statValue) {
            const formattedValue = prefix === '¥' ?
                `¥${value.toLocaleString()}` :
                `${value.toLocaleString()}${prefix}`;

            // アニメーション付きで数値を更新
            this.animateValue(statValue, 0, value, prefix);
        }
    }

    // 数値アニメーション
    animateValue(element, start, end, suffix) {
        const duration = 1000;
        const startTime = Date.now();

        const updateValue = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * progress);

            let displayValue;
            if (suffix === '¥') {
                displayValue = `¥${current.toLocaleString()}`;
            } else {
                displayValue = `${current.toLocaleString()}${suffix}`;
            }

            element.textContent = displayValue;

            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        };

        updateValue();
    }

    // データ読み込みメソッド（模擬実装）
    loadSalesOrders() {
        console.log('受注データを読み込み中...');
        // 実際のアプリケーションではAPIからデータを取得
    }

    loadSalesInvoices() {
        console.log('請求書データを読み込み中...');
    }

    loadSalesReports() {
        console.log('売上レポートを読み込み中...');
    }

    loadInventoryStock() {
        console.log('在庫一覧データを読み込み中...');
    }

    loadInventoryMovements() {
        console.log('入出庫履歴を読み込み中...');
    }

    loadInventoryAlerts() {
        console.log('在庫アラートを読み込み中...');
    }

    loadCustomerList() {
        console.log('顧客一覧を読み込み中...');
    }

    loadOpportunities() {
        console.log('商談情報を読み込み中...');
    }

    loadFollowUps() {
        console.log('フォローアップ予定を読み込み中...');
    }

    // 業務アプリ画面更新（メインアプリから呼び出される）
    updateBusinessApps() {
        // 本日の変更点を更新
        this.updateTodayChanges();

        // 現在のアプリの統計を更新
        switch (this.currentApp) {
            case 'sales':
                this.updateSalesStats();
                break;
            case 'inventory':
                this.updateInventoryStats();
                break;
            case 'customer':
                this.updateCustomerStats();
                break;
        }
    }

    // 本日の変更点更新
    updateTodayChanges() {
        const timestamp = new Date().toLocaleTimeString('ja-JP', {
            hour: '2-digit',
            minute: '2-digit'
        });

        console.log(`${timestamp}: 業務アプリデータを更新しました`);

        // 新しい活動をランダムに追加（デモ用）
        this.addRandomActivity();
    }

    // ランダム活動追加（デモ用）
    addRandomActivity() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ja-JP', {
            hour: '2-digit',
            minute: '2-digit'
        });

        const activities = [
            {
                description: '新規受注登録: GHI株式会社 ¥950,000',
                user: '田中太郎'
            },
            {
                description: '出庫: 製品X 30個 (出荷先: JKL商事)',
                user: '鈴木花子'
            },
            {
                description: '顧客情報更新: MNO工業 (連絡先変更)',
                user: '佐藤次郎'
            }
        ];

        const randomActivity = activities[Math.floor(Math.random() * activities.length)];

        // 活動をデータに追加（最大10件まで保持）
        if (this.salesData && this.salesData.recentActivities) {
            this.salesData.recentActivities.unshift({
                time: timeString,
                description: randomActivity.description,
                user: randomActivity.user
            });

            // 10件を超えたら古いものを削除
            if (this.salesData.recentActivities.length > 10) {
                this.salesData.recentActivities.pop();
            }
        }
    }

    // 業務アプリのキーボードショートカット
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + 数字キーでアプリ切り替え
            if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
                switch (e.key) {
                    case '1':
                        e.preventDefault();
                        this.switchApp('sales');
                        break;
                    case '2':
                        e.preventDefault();
                        this.switchApp('inventory');
                        break;
                    case '3':
                        e.preventDefault();
                        this.switchApp('customer');
                        break;
                }
            }
        });
    }

    // データエクスポート機能（デモ用）
    exportData(appType, format = 'csv') {
        let data;
        let filename;

        switch (appType) {
            case 'sales':
                data = this.salesData;
                filename = `sales_data_${new Date().toISOString().split('T')[0]}.${format}`;
                break;
            case 'inventory':
                data = this.inventoryData;
                filename = `inventory_data_${new Date().toISOString().split('T')[0]}.${format}`;
                break;
            case 'customer':
                data = this.customerData;
                filename = `customer_data_${new Date().toISOString().split('T')[0]}.${format}`;
                break;
        }

        console.log(`エクスポート開始: ${filename}`, data);
        alert(`${filename} のエクスポートを開始します。\n\n実際のアプリケーションではファイルダウンロードが開始されます。`);
    }
}

// グローバルにBusinessAppsManagerインスタンスを作成
window.businessAppsManager = new BusinessAppsManager();