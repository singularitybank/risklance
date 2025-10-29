// Risk Lance - メインアプリケーション

// アプリケーション状態管理
class RiskLanceApp {
    constructor() {
        this.currentUser = null;
        this.currentScreen = 'dashboard';

        this.init();
    }

    init() {
        console.log('RiskLanceApp init called');
        this.setupEventListeners();
        this.showLoginScreen();
    }

    // イベントリスナーの設定
    setupEventListeners() {
        // ログインフォーム
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // ログアウトボタン
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }

        // サイドバーメニュー
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleMenuClick(e));
        });

        // アクションボタン
        this.setupActionButtons();
    }

    // アクションボタンの設定
    setupActionButtons() {
        // 保険見直しボタン
        const actionBtns = document.querySelectorAll('.action-btn');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleActionClick(e));
        });

        // おすすめボタン
        const recommendBtns = document.querySelectorAll('.recommend-btn');
        recommendBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleRecommendationClick(e));
        });

        // お知らせアイテム
        const notificationItems = document.querySelectorAll('.notification-item.clickable');
        notificationItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleNotificationClick(e));
        });

        // 保険契約一覧
        const insuranceRows = document.querySelectorAll('.insurance-row');
        insuranceRows.forEach(row => {
            row.addEventListener('click', (e) => this.handleInsuranceRowClick(e));
        });
    }

    // ログイン処理
    handleLogin(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        console.log('ログイン試行:', username, password);

        // 簡単な認証（デモ用）
        if (username && password) {
            this.currentUser = {
                name: 'カン　ミンソク',
                company: '株式会社サンプル',
                role: '代表取締役'
            };

            console.log('ログイン成功、画面切り替え中...');
            this.showMainApp();
            this.updateUserInterface();
        } else {
            alert('ユーザー名とパスワードを入力してください。');
        }
    }

    // ログアウト処理
    handleLogout() {
        if (confirm('ログアウトしますか？')) {
            this.currentUser = null;
            this.showLoginScreen();
        }
    }

    // メニュークリック処理
    handleMenuClick(e) {
        const menuItem = e.currentTarget;
        const screenName = menuItem.getAttribute('data-screen');

        if (screenName) {
            this.switchScreen(screenName);
            this.updateActiveMenu(menuItem);
        }
    }

    // アクションクリック処理
    handleActionClick(e) {
        const actionType = e.currentTarget.getAttribute('data-action') || 'default';

        switch (actionType) {
            case 'fire-insurance':
                window.alertManager.showInsuranceDetails('火災保険');
                break;
            case 'cyber-security':
                window.alertManager.showInsuranceRecommendation('サイバーセキュリティ保険');
                break;
            default:
                window.alertManager.showActionDialog('対応中', 'この機能は現在開発中です。');
        }
    }

    // おすすめクリック処理
    handleRecommendationClick(e) {
        const recommendationType = e.currentTarget.getAttribute('data-recommendation') || 'default';

        switch (recommendationType) {
            case 'cyber-insurance':
                window.alertManager.showInsuranceRecommendation('サイバーセキュリティ保険');
                break;
            case 'fire-coverage':
                window.alertManager.showCoverageReview('火災保険');
                break;
            default:
                window.alertManager.showRecommendationDialog('詳細情報', 'この保険商品について詳しい情報をご案内します。');
        }
    }

    // お知らせクリック処理
    handleNotificationClick(e) {
        const targetTab = e.currentTarget.getAttribute('data-target-tab');

        if (targetTab) {
            this.switchScreen(targetTab);

            // サイドバーメニューもアクティブ化
            const menuItem = document.querySelector(`.menu-item[data-screen="${targetTab}"]`);
            if (menuItem) {
                this.updateActiveMenu(menuItem);
            }
        }
    }

    // 保険契約行クリック処理
    handleInsuranceRowClick(e) {
        const policyId = e.currentTarget.getAttribute('data-policy-id');

        if (policyId && window.insuranceManager) {
            window.insuranceManager.showPolicyDetail(policyId);
        }
    }

    // 画面切り替え
    switchScreen(screenName) {
        // 全ての画面を非表示
        const screens = document.querySelectorAll('.content-screen');
        screens.forEach(screen => screen.classList.remove('active'));

        // 指定された画面を表示
        const targetScreen = document.getElementById(screenName);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenName;

            // 画面固有の初期化処理
            this.initializeScreen(screenName);
        }
    }

    // アクティブメニューの更新
    updateActiveMenu(activeItem) {
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => item.classList.remove('active'));
        activeItem.classList.add('active');
    }

    // 画面固有の初期化
    initializeScreen(screenName) {
        switch (screenName) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'business-apps':
                this.updateBusinessApps();
                break;
            case 'risk-analysis':
                this.updateRiskAnalysis();
                break;
            case 'risk-branding':
                this.updateRiskBranding();
                break;
            case 'insurance-portfolio':
                this.updateInsurancePortfolio();
                break;
        }
    }

    // ダッシュボード更新
    updateDashboard() {
        // リアルタイムデータの更新をシミュレート
        window.riskAnalysisManager.simulateDataUpdate();
    }

    // 業務アプリ更新
    updateBusinessApps() {
        // 業務アプリマネージャーの初期化
        window.businessAppsManager.initializeBusinessApps();

        // 本日の変更点を更新
        window.businessAppsManager.updateBusinessApps();
    }

    // リスク分析更新
    updateRiskAnalysis() {
        // リスクダッシュボード機能の初期化
        window.riskAnalysisManager.initializeRiskAnalysis();
    }

    // リスクブランディング更新
    updateRiskBranding() {
        // リスクブランディング機能の初期化
        window.riskBrandingManager.initializeRiskBranding();

        // リアルタイム更新開始
        window.riskBrandingManager.startRealTimeUpdates();
    }

    // 保険ポートフォリオ更新
    updateInsurancePortfolio() {
        // 保険契約一覧の更新
        window.riskAnalysisManager.updateInsuranceTable();
    }

    // ログイン画面表示
    showLoginScreen() {
        console.log('showLoginScreen called');

        const loginScreen = document.getElementById('login-screen');
        const mainApp = document.getElementById('main-app');

        console.log('初期化時 loginScreen:', loginScreen);
        console.log('初期化時 mainApp:', mainApp);

        if (loginScreen) {
            loginScreen.classList.add('active');
            console.log('login-screen activeクラスを追加');
        }

        if (mainApp) {
            mainApp.classList.remove('active');
            console.log('main-app activeクラスを削除');
        }
    }

    // メインアプリ表示
    showMainApp() {
        console.log('showMainApp called');

        const loginScreen = document.getElementById('login-screen');
        const mainApp = document.getElementById('main-app');

        console.log('loginScreen:', loginScreen);
        console.log('mainApp:', mainApp);

        if (loginScreen) {
            loginScreen.classList.remove('active');
            console.log('login-screen activeクラスを削除');
            console.log('login-screen クラス一覧:', loginScreen.className);
        }

        if (mainApp) {
            mainApp.classList.add('active');
            console.log('main-app activeクラスを追加');
            console.log('main-app クラス一覧:', mainApp.className);
            console.log('main-app computedStyle visibility:', window.getComputedStyle(mainApp).visibility);
            console.log('main-app computedStyle opacity:', window.getComputedStyle(mainApp).opacity);
        }
    }

    // ユーザーインターフェース更新
    updateUserInterface() {
        if (this.currentUser) {
            const userNameElement = document.querySelector('.user-name');
            if (userNameElement) {
                userNameElement.textContent = this.currentUser.name;
            }
        }
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing RiskLanceApp');
    window.riskLanceApp = new RiskLanceApp();
});

// 追加のユーティリティ関数

// 数値フォーマット関数
function formatNumber(num) {
    return num.toLocaleString('ja-JP');
}

// 日付フォーマット関数
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// パーセンテージ計算関数
function calculatePercentage(value, total) {
    return Math.round((value / total) * 100);
}

// データ更新シミュレーション（定期実行）
setInterval(() => {
    if (window.riskLanceApp && window.riskLanceApp.currentUser) {
        // 5分ごとにダッシュボードデータを更新
        if (window.riskLanceApp.currentScreen === 'dashboard') {
            window.riskAnalysisManager.simulateDataUpdate();
        }

        // リスクアラート監視
        if (window.riskLanceApp.currentScreen === 'risk-analysis') {
            window.riskAnalysisManager.monitorRiskAlerts();
        }
    }
}, 300000); // 5分 = 300,000ミリ秒

// ページ読み込み完了時の処理
window.addEventListener('load', () => {
    console.log('Risk Lance アプリケーションが開始されました');

    // プログレスバーアニメーション
    window.chartManager.initializeProgressAnimations();
});

// エラーハンドリング
window.addEventListener('error', (e) => {
    console.error('アプリケーションエラー:', e.error);
});

// レスポンシブ対応
window.addEventListener('resize', () => {
    // ウィンドウサイズ変更時の処理
    if (window.innerWidth <= 768) {
        // モバイル表示時の処理
        document.body.classList.add('mobile-view');
    } else {
        document.body.classList.remove('mobile-view');
    }
});