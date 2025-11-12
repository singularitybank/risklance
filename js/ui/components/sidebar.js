// Risk Lance - サイドバーコンポーネント
// メニューを動的に生成

class Sidebar {
    constructor() {
        this.menuConfig = window.MENU_CONFIG;
        this.sidebarElement = null;
    }

    /**
     * サイドバーメニューを描画
     */
    render() {
        this.sidebarElement = document.getElementById('sidebar-menu');
        if (!this.sidebarElement) {
            console.error('サイドバー要素が見つかりません');
            return;
        }

        const menuItems = this.menuConfig.getMenuItems();

        // メニューアイテムのHTML生成
        const menuHTML = menuItems.map(item => {
            const activeClass = item.active ? 'active' : '';
            return `
                <div class="menu-item ${activeClass}"
                     data-screen="${item.screen}"
                     data-menu-id="${item.id}">
                    <i class="${item.icon}"></i>
                    <span>${item.label}</span>
                </div>
            `;
        }).join('');

        this.sidebarElement.innerHTML = menuHTML;

        // イベントハンドラーを設定
        this.setupEventHandlers();
    }

    /**
     * メニューアイテムのクリックイベントを設定
     */
    setupEventHandlers() {
        const menuItems = this.sidebarElement.querySelectorAll('.menu-item');

        menuItems.forEach(menuItem => {
            menuItem.addEventListener('click', (e) => {
                const screen = e.currentTarget.getAttribute('data-screen');
                const menuId = e.currentTarget.getAttribute('data-menu-id');

                if (window.riskLanceApp) {
                    // 画面切り替え
                    window.riskLanceApp.switchScreen(screen);

                    // アクティブメニューを更新
                    this.setActiveMenuItem(menuId);

                    // メニュー設定のアクティブ状態も更新
                    this.menuConfig.setActiveMenuItem(menuId);
                }
            });
        });
    }

    /**
     * アクティブなメニューアイテムを設定
     * @param {string} menuId - メニューID
     */
    setActiveMenuItem(menuId) {
        const menuItems = this.sidebarElement.querySelectorAll('.menu-item');

        menuItems.forEach(item => {
            const itemId = item.getAttribute('data-menu-id');
            if (itemId === menuId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    /**
     * 画面に基づいてアクティブメニューを設定
     * @param {string} screenName - 画面名
     */
    setActiveMenuByScreen(screenName) {
        const menuItems = this.menuConfig.getMenuItems();
        const matchingItem = menuItems.find(item => item.screen === screenName);

        if (matchingItem) {
            this.setActiveMenuItem(matchingItem.id);
            this.menuConfig.setActiveMenuItem(matchingItem.id);
        }
    }

    /**
     * メニューを再描画
     */
    refresh() {
        this.render();
    }
}

// グローバルインスタンス作成
window.sidebarComponent = new Sidebar();

console.log('✅ Sidebar コンポーネントが読み込まれました');
