// Risk Lance - メニュー設定
// サイドバーメニューの定義と設定

const MENU_CONFIG = {
    items: [
        {
            id: 'dashboard',
            label: 'メインポータル',
            icon: 'fas fa-home',
            screen: 'dashboard',
            order: 1,
            active: true
        },
        {
            id: 'insurance-portfolio',
            label: '保険ポートフォリオ',
            icon: 'fas fa-umbrella',
            screen: 'insurance-portfolio',
            order: 2,
            active: false
        },
        {
            id: 'business-apps',
            label: '業務アプリ',
            icon: 'fas fa-briefcase',
            screen: 'business-apps',
            order: 3,
            active: false
        },
        {
            id: 'risk-analysis',
            label: 'リスク・ダッシュボード',
            icon: 'fas fa-chart-line',
            screen: 'risk-analysis',
            order: 4,
            active: false
        },
        {
            id: 'risk-branding',
            label: 'リスク・ブランディング',
            icon: 'fas fa-award',
            screen: 'risk-branding',
            order: 5,
            active: false
        }
    ],

    // メニューアイテムを取得
    getMenuItems() {
        return this.items.sort((a, b) => a.order - b.order);
    },

    // IDからメニューアイテムを取得
    getMenuItem(id) {
        return this.items.find(item => item.id === id);
    },

    // アクティブなメニューアイテムを取得
    getActiveMenuItem() {
        return this.items.find(item => item.active);
    },

    // アクティブなメニューを設定
    setActiveMenuItem(id) {
        this.items.forEach(item => {
            item.active = item.id === id;
        });
    }
};

// グローバルに公開
window.MENU_CONFIG = MENU_CONFIG;

console.log('✅ メニュー設定が読み込まれました');
