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
            const hasChildren = item.children && item.children.length > 0;
            const expandIcon = hasChildren ? '<i class="expand-icon fas fa-chevron-down"></i>' : '';
            // デフォルトでサブメニューを展開
            const expandedClass = hasChildren ? 'expanded' : '';

            // サブメニューHTML生成
            let submenuHTML = '';
            if (hasChildren) {
                const submenuItems = item.children.map(child => {
                    const childActiveClass = child.active ? 'active' : '';
                    return `
                        <div class="submenu-item ${childActiveClass}"
                             data-screen="${child.screen}"
                             data-menu-id="${child.id}"
                             data-parent-id="${item.id}">
                            <i class="${child.icon}"></i>
                            <span>${child.label}</span>
                        </div>
                    `;
                }).join('');

                submenuHTML = `<div class="submenu">${submenuItems}</div>`;
            }

            // メニューアイテムHTML（submenuを内部に配置、デフォルトで展開）
            const html = `
                <div class="menu-item ${activeClass} ${hasChildren ? 'has-children' : ''} ${expandedClass}"
                     data-screen="${item.screen}"
                     data-menu-id="${item.id}">
                    <div class="menu-item-content">
                        <i class="${item.icon}"></i>
                        <span>${item.label}</span>
                        ${expandIcon}
                    </div>
                    ${submenuHTML}
                </div>
            `;

            return html;
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
        const submenuItems = this.sidebarElement.querySelectorAll('.submenu-item');

        // 親メニューアイテムのクリックイベント
        menuItems.forEach(menuItem => {
            const hasChildren = menuItem.classList.contains('has-children');

            if (hasChildren) {
                // サブメニューがある場合：展開アイコンとメニューラベルで処理を分ける
                const menuContent = menuItem.querySelector('.menu-item-content');
                const expandIcon = menuItem.querySelector('.expand-icon');

                // メニューラベル部分のクリック（画面遷移）
                menuContent.addEventListener('click', (e) => {
                    // 展開アイコンをクリックした場合は除外
                    if (e.target === expandIcon || e.target.closest('.expand-icon')) {
                        return;
                    }

                    const screen = menuItem.getAttribute('data-screen');
                    const menuId = menuItem.getAttribute('data-menu-id');

                    if (window.riskLanceApp) {
                        // 画面切り替え
                        window.riskLanceApp.switchScreen(screen);

                        // アクティブメニューを更新
                        this.setActiveMenuItem(menuId);

                        // メニュー設定のアクティブ状態も更新
                        this.menuConfig.setActiveMenuItem(menuId);
                    }
                });

                // 展開アイコンのクリック（サブメニュートグル）
                if (expandIcon) {
                    expandIcon.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.toggleSubmenu(menuItem);
                    });
                }
            } else {
                // サブメニューがない場合：通常のクリック処理
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
            }
        });

        // サブメニューアイテムのクリックイベント
        submenuItems.forEach(submenuItem => {
            submenuItem.addEventListener('click', (e) => {
                e.stopPropagation();
                const screen = e.currentTarget.getAttribute('data-screen');
                const menuId = e.currentTarget.getAttribute('data-menu-id');

                if (window.riskLanceApp) {
                    // 画面切り替え
                    window.riskLanceApp.switchScreen(screen);

                    // アクティブメニューを更新
                    this.setActiveSubmenuItem(menuId);
                }
            });
        });
    }

    /**
     * サブメニューのトグル
     * @param {HTMLElement} menuItem - メニューアイテム要素
     */
    toggleSubmenu(menuItem) {
        const isExpanded = menuItem.classList.contains('expanded');

        // 全てのメニューアイテムの展開状態を解除
        const allMenuItems = this.sidebarElement.querySelectorAll('.menu-item');
        allMenuItems.forEach(item => item.classList.remove('expanded'));

        // クリックされたメニューアイテムの展開状態をトグル
        if (!isExpanded) {
            menuItem.classList.add('expanded');
        }
    }

    /**
     * アクティブなメニューアイテムを設定
     * @param {string} menuId - メニューID
     */
    setActiveMenuItem(menuId) {
        const menuItems = this.sidebarElement.querySelectorAll('.menu-item');
        const submenuItems = this.sidebarElement.querySelectorAll('.submenu-item');

        menuItems.forEach(item => {
            const itemId = item.getAttribute('data-menu-id');
            if (itemId === menuId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // サブメニューのアクティブ状態も解除
        submenuItems.forEach(item => {
            item.classList.remove('active');
        });
    }

    /**
     * アクティブなサブメニューアイテムを設定
     * @param {string} menuId - メニューID
     */
    setActiveSubmenuItem(menuId) {
        const menuItems = this.sidebarElement.querySelectorAll('.menu-item');
        const submenuItems = this.sidebarElement.querySelectorAll('.submenu-item');

        // 親メニューのアクティブ状態を解除
        menuItems.forEach(item => {
            item.classList.remove('active');
        });

        // サブメニューアイテムのアクティブ状態を設定
        submenuItems.forEach(item => {
            const itemId = item.getAttribute('data-menu-id');
            if (itemId === menuId) {
                item.classList.add('active');
                // 親メニューを展開
                const parentId = item.getAttribute('data-parent-id');
                const parentMenu = this.sidebarElement.querySelector(`.menu-item[data-menu-id="${parentId}"]`);
                if (parentMenu) {
                    parentMenu.classList.add('expanded');
                }
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
