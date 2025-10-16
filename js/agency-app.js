// Risk Lance - 代理店向けアプリケーション機能

class AgencyApp {
    constructor() {
        this.currentScreen = 'dashboard';
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.currentFilters = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDashboard();
    }

    setupEventListeners() {
        // ログイン処理
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // ログアウト処理
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }

        // サイドバーメニュー
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => this.switchScreen(item.dataset.screen));
        });

        // 顧客管理関連
        this.setupCustomerManagementEvents();

        // 保険証券管理関連
        this.setupPolicyManagementEvents();

        // 通知関連
        this.setupNotificationEvents();

        // モーダル関連
        this.setupModalEvents();
    }

    // ログイン処理
    handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // 簡易認証（実際のプロジェクトではサーバーサイド認証）
        if (username && password) {
            document.getElementById('login-screen').classList.remove('active');
            document.getElementById('main-app').classList.add('active');
            this.loadDashboard();
        } else {
            alert('代理店IDとパスワードを入力してください。');
        }
    }

    // ログアウト処理
    handleLogout() {
        document.getElementById('main-app').classList.remove('active');
        document.getElementById('login-screen').classList.add('active');

        // フォームリセット
        document.getElementById('login-form').reset();
    }

    // 画面切り替え
    switchScreen(screenName) {
        // サイドバーメニューの状態更新
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-screen="${screenName}"]`).classList.add('active');

        // コンテンツ画面の切り替え
        document.querySelectorAll('.content-screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenName).classList.add('active');

        this.currentScreen = screenName;

        // 各画面の初期化
        switch (screenName) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'customer-management':
                this.loadCustomerManagement();
                break;
            case 'policy-management':
                this.loadPolicyManagement();
                break;
            case 'notifications':
                this.loadNotifications();
                break;
            case 'reports':
                this.loadReports();
                break;
        }
    }

    // ダッシュボード読み込み
    loadDashboard() {
        const stats = window.agencyDataManager.getSummaryStats();

        // 統計データの更新
        document.querySelector('.stat-card:nth-child(1) .stat-number').textContent = stats.totalCustomers;
        document.querySelector('.stat-card:nth-child(1) .stat-change').textContent = `+${stats.customerGrowth} 今月`;

        document.querySelector('.stat-card:nth-child(2) .stat-number').textContent = stats.totalPolicies;
        document.querySelector('.stat-card:nth-child(2) .stat-change').textContent = `+${stats.policyGrowth} 今月`;

        document.querySelector('.stat-card:nth-child(3) .stat-number').textContent = stats.urgentCases;

        document.querySelector('.stat-card:nth-child(4) .stat-number').textContent = `¥${stats.monthlyCommission.toLocaleString()}`;

        // 最近のアクティビティ更新
        this.updateRecentActivities();
    }

    // 最近のアクティビティ更新
    updateRecentActivities() {
        const activities = window.agencyDataManager.getRecentActivities();
        const activityList = document.querySelector('.activity-list');

        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item ${activity.type}">
                <i class="${activity.icon}"></i>
                <div class="activity-content">
                    <span class="activity-text">${activity.text}</span>
                    <span class="activity-time">${activity.time}</span>
                </div>
                ${activity.action ? `<button class="activity-action">${activity.action}</button>` : ''}
            </div>
        `).join('');
    }

    // 顧客管理イベント設定
    setupCustomerManagementEvents() {
        // 新規顧客登録ボタン
        const addCustomerBtn = document.getElementById('add-customer-btn');
        if (addCustomerBtn) {
            addCustomerBtn.addEventListener('click', () => this.showAddCustomerModal());
        }

        // エクスポートボタン
        const exportCustomersBtn = document.getElementById('export-customers-btn');
        if (exportCustomersBtn) {
            exportCustomersBtn.addEventListener('click', () => this.exportCustomers());
        }

        // フィルター
        const statusFilter = document.getElementById('customer-status-filter');
        const industryFilter = document.getElementById('industry-filter');
        const insuranceTypeFilter = document.getElementById('insurance-type-filter');

        [statusFilter, industryFilter, insuranceTypeFilter].forEach(filter => {
            if (filter) {
                filter.addEventListener('change', () => this.applyCustomerFilters());
            }
        });

        // ページネーション
        const prevPageBtn = document.getElementById('prev-page');
        const nextPageBtn = document.getElementById('next-page');

        if (prevPageBtn) {
            prevPageBtn.addEventListener('click', () => this.changePage(-1));
        }
        if (nextPageBtn) {
            nextPageBtn.addEventListener('click', () => this.changePage(1));
        }
    }

    // 保険証券管理イベント設定
    setupPolicyManagementEvents() {
        // 新規証券登録ボタン
        const addPolicyBtn = document.getElementById('add-policy-btn');
        if (addPolicyBtn) {
            addPolicyBtn.addEventListener('click', () => this.showAddPolicyModal());
        }

        // エクスポートボタン
        const exportPoliciesBtn = document.getElementById('export-policies-btn');
        if (exportPoliciesBtn) {
            exportPoliciesBtn.addEventListener('click', () => this.exportPolicies());
        }

        // フィルター
        const policyTypeFilter = document.getElementById('policy-type-filter');
        const insurerFilter = document.getElementById('insurer-filter');
        const policyStatusFilter = document.getElementById('policy-status-filter');
        const expiryDateFilter = document.getElementById('expiry-date-filter');

        [policyTypeFilter, insurerFilter, policyStatusFilter, expiryDateFilter].forEach(filter => {
            if (filter) {
                filter.addEventListener('change', () => this.applyPolicyFilters());
            }
        });
    }

    // 通知イベント設定
    setupNotificationEvents() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.loadNotifications(btn.dataset.category);
            });
        });
    }

    // モーダルイベント設定
    setupModalEvents() {
        // モーダルを閉じる
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal') || e.target.classList.contains('close')) {
                this.closeModal();
            }
        });

        // ESCキーでモーダルを閉じる
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    // 顧客管理画面読み込み
    loadCustomerManagement() {
        this.currentFilters = {};
        this.currentPage = 1;
        this.renderCustomerTable();
    }

    // 顧客テーブル描画
    renderCustomerTable() {
        const customers = window.agencyDataManager.getFilteredCustomers(this.currentFilters);
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedCustomers = customers.slice(startIndex, endIndex);

        const tbody = document.getElementById('customer-table-body');
        if (!tbody) return;

        tbody.innerHTML = paginatedCustomers.map(customer => `
            <tr>
                <td>${customer.name}</td>
                <td>${window.agencyDataManager.getIndustryName(customer.industry)}</td>
                <td>
                    <div class="insurance-tags">
                        ${customer.insuranceTypes.map(type =>
                            `<span class="insurance-tag">${window.agencyDataManager.getInsuranceTypeName(type)}</span>`
                        ).join('')}
                    </div>
                </td>
                <td>
                    <div class="risk-indicator">
                        <div class="risk-level ${customer.riskLevel}"></div>
                        <span class="risk-text">${window.agencyDataManager.getRiskLevelName(customer.riskLevel)}</span>
                    </div>
                </td>
                <td>${customer.lastUpdate}</td>
                <td><span class="status-badge ${customer.status}">${window.agencyDataManager.getStatusName(customer.status)}</span></td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn-sm action-btn-view" onclick="agencyApp.showCustomerDetail('${customer.id}')">詳細</button>
                        <button class="action-btn-sm action-btn-edit" onclick="agencyApp.editCustomer('${customer.id}')">編集</button>
                        ${customer.status === 'review-pending' ?
                            `<button class="action-btn-sm action-btn-alert" onclick="agencyApp.handleReview('${customer.id}')">対応</button>` : ''
                        }
                    </div>
                </td>
            </tr>
        `).join('');

        this.updatePagination(customers.length);
    }

    // 保険証券管理画面読み込み
    loadPolicyManagement() {
        this.currentFilters = {};
        this.currentPage = 1;
        this.renderPolicyTable();
    }

    // 保険証券テーブル描画
    renderPolicyTable() {
        const policies = window.agencyDataManager.getFilteredPolicies(this.currentFilters);
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const paginatedPolicies = policies.slice(startIndex, endIndex);

        const tbody = document.getElementById('policy-table-body');
        if (!tbody) return;

        tbody.innerHTML = paginatedPolicies.map(policy => `
            <tr>
                <td>${policy.policyNumber}</td>
                <td>${policy.customerName}</td>
                <td>${window.agencyDataManager.getInsuranceTypeName(policy.type)}</td>
                <td>${window.agencyDataManager.getInsurerName(policy.insurer)}</td>
                <td>${policy.startDate}</td>
                <td>${policy.endDate}</td>
                <td>¥${parseInt(policy.coverage).toLocaleString()}</td>
                <td>¥${parseInt(policy.premium).toLocaleString()}</td>
                <td><span class="status-badge ${policy.status}">${window.agencyDataManager.getStatusName(policy.status)}</span></td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn-sm action-btn-view" onclick="agencyApp.showPolicyDetail('${policy.id}')">詳細</button>
                        <button class="action-btn-sm action-btn-edit" onclick="agencyApp.editPolicy('${policy.id}')">編集</button>
                        ${policy.status === 'expiring-soon' ?
                            `<button class="action-btn-sm action-btn-alert" onclick="agencyApp.handleRenewal('${policy.id}')">更新</button>` : ''
                        }
                    </div>
                </td>
            </tr>
        `).join('');

        this.updatePolicyPagination(policies.length);
    }

    // 通知画面読み込み
    loadNotifications(category = 'all') {
        const notifications = window.agencyDataManager.getFilteredNotifications(category);
        const notificationsList = document.querySelector('.notifications-list');

        if (!notificationsList) return;

        notificationsList.innerHTML = notifications.map(notification => `
            <div class="notification-item ${notification.type}" data-notification-id="${notification.id}">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                    <h4 style="margin: 0; font-size: 1rem; color: #1f2937;">${notification.title}</h4>
                    <span style="font-size: 0.8rem; color: #6b7280;">${notification.timestamp}</span>
                </div>
                <p style="margin: 0 0 0.5rem 0; color: #374151;">${notification.message}</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 0.8rem; color: #6b7280;">顧客: ${notification.customerName}</span>
                    ${!notification.isRead ? '<span style="width: 8px; height: 8px; background: #dc2626; border-radius: 50%;"></span>' : ''}
                </div>
            </div>
        `).join('');
    }

    // 顧客フィルター適用
    applyCustomerFilters() {
        this.currentFilters = {
            status: document.getElementById('customer-status-filter')?.value,
            industry: document.getElementById('industry-filter')?.value,
            insuranceType: document.getElementById('insurance-type-filter')?.value
        };
        this.currentPage = 1;
        this.renderCustomerTable();
    }

    // 保険証券フィルター適用
    applyPolicyFilters() {
        this.currentFilters = {
            type: document.getElementById('policy-type-filter')?.value,
            insurer: document.getElementById('insurer-filter')?.value,
            status: document.getElementById('policy-status-filter')?.value,
            expiryDate: document.getElementById('expiry-date-filter')?.value
        };
        this.currentPage = 1;
        this.renderPolicyTable();
    }

    // ページネーション更新
    updatePagination(totalItems) {
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        const paginationInfo = document.querySelector('.pagination-info');
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');

        if (paginationInfo) {
            paginationInfo.textContent = `${this.currentPage} / ${totalPages} ページ`;
        }

        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 1;
        }

        if (nextBtn) {
            nextBtn.disabled = this.currentPage === totalPages;
        }
    }

    // 保険証券ページネーション更新
    updatePolicyPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        const paginationInfo = document.querySelector('#policy-management .pagination-info');
        const prevBtn = document.getElementById('policy-prev-page');
        const nextBtn = document.getElementById('policy-next-page');

        if (paginationInfo) {
            paginationInfo.textContent = `${this.currentPage} / ${totalPages} ページ`;
        }

        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 1;
        }

        if (nextBtn) {
            nextBtn.disabled = this.currentPage === totalPages;
        }
    }

    // ページ変更
    changePage(direction) {
        this.currentPage += direction;
        if (this.currentScreen === 'customer-management') {
            this.renderCustomerTable();
        } else if (this.currentScreen === 'policy-management') {
            this.renderPolicyTable();
        }
    }

    // 顧客詳細表示
    showCustomerDetail(customerId) {
        const customer = window.agencyDataManager.getCustomerById(customerId);
        if (!customer) return;

        const modalContent = document.getElementById('customer-detail-content');
        modalContent.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                <div>
                    <h4 style="margin-bottom: 1rem; color: #1f2937;">基本情報</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                        <div><strong>顧客名:</strong> ${customer.name}</div>
                        <div><strong>業種:</strong> ${window.agencyDataManager.getIndustryName(customer.industry)}</div>
                        <div><strong>担当者:</strong> ${customer.contactPerson}</div>
                        <div><strong>電話番号:</strong> ${customer.phone}</div>
                        <div><strong>リスクレベル:</strong>
                            <span class="risk-indicator">
                                <div class="risk-level ${customer.riskLevel}"></div>
                                ${window.agencyDataManager.getRiskLevelName(customer.riskLevel)}
                            </span>
                        </div>
                        <div><strong>ステータス:</strong> <span class="status-badge ${customer.status}">${window.agencyDataManager.getStatusName(customer.status)}</span></div>
                    </div>
                </div>
                <div>
                    <h4 style="margin-bottom: 1rem; color: #1f2937;">統計情報</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                        <div><strong>契約証券数:</strong> ${customer.policies.length}</div>
                        <div><strong>有効証券数:</strong> ${customer.activePolicies}</div>
                        <div><strong>年間保険料総額:</strong> ¥${customer.totalPremium.toLocaleString()}</div>
                        <div><strong>最終更新:</strong> ${customer.lastUpdate}</div>
                    </div>
                </div>
            </div>
            <div>
                <h4 style="margin-bottom: 1rem; color: #1f2937;">契約中の保険証券</h4>
                <div style="max-height: 300px; overflow-y: auto;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f8fafc;">
                                <th style="padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb;">証券番号</th>
                                <th style="padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb;">保険種目</th>
                                <th style="padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb;">保険会社</th>
                                <th style="padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb;">満期日</th>
                                <th style="padding: 0.75rem; text-align: left; border-bottom: 1px solid #e5e7eb;">ステータス</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${customer.policies.map(policy => `
                                <tr>
                                    <td style="padding: 0.75rem; border-bottom: 1px solid #f3f4f6;">${policy.policyNumber}</td>
                                    <td style="padding: 0.75rem; border-bottom: 1px solid #f3f4f6;">${window.agencyDataManager.getInsuranceTypeName(policy.type)}</td>
                                    <td style="padding: 0.75rem; border-bottom: 1px solid #f3f4f6;">${window.agencyDataManager.getInsurerName(policy.insurer)}</td>
                                    <td style="padding: 0.75rem; border-bottom: 1px solid #f3f4f6;">${policy.endDate}</td>
                                    <td style="padding: 0.75rem; border-bottom: 1px solid #f3f4f6;"><span class="status-badge ${policy.status}">${window.agencyDataManager.getStatusName(policy.status)}</span></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        this.showModal('customer-detail-modal');
    }

    // 保険証券詳細表示
    showPolicyDetail(policyId) {
        const policy = window.agencyDataManager.getPolicyById(policyId);
        if (!policy) return;

        const modalContent = document.getElementById('policy-detail-content');
        modalContent.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div>
                    <h4 style="margin-bottom: 1rem; color: #1f2937;">証券情報</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                        <div><strong>証券番号:</strong> ${policy.policyNumber}</div>
                        <div><strong>保険種目:</strong> ${window.agencyDataManager.getInsuranceTypeName(policy.type)}</div>
                        <div><strong>保険会社:</strong> ${window.agencyDataManager.getInsurerName(policy.insurer)}</div>
                        <div><strong>保険始期:</strong> ${policy.startDate}</div>
                        <div><strong>保険終期:</strong> ${policy.endDate}</div>
                        <div><strong>ステータス:</strong> <span class="status-badge ${policy.status}">${window.agencyDataManager.getStatusName(policy.status)}</span></div>
                    </div>
                </div>
                <div>
                    <h4 style="margin-bottom: 1rem; color: #1f2937;">契約内容</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                        <div><strong>保険金額:</strong> ¥${parseInt(policy.coverage).toLocaleString()}</div>
                        <div><strong>年間保険料:</strong> ¥${parseInt(policy.premium).toLocaleString()}</div>
                        <div><strong>月払保険料:</strong> ¥${Math.floor(parseInt(policy.premium) / 12).toLocaleString()}</div>
                    </div>
                </div>
            </div>
            <div style="margin-top: 2rem;">
                <h4 style="margin-bottom: 1rem; color: #1f2937;">契約者情報</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <div>
                        <div style="margin-bottom: 0.5rem;"><strong>顧客名:</strong> ${policy.customer.name}</div>
                        <div style="margin-bottom: 0.5rem;"><strong>業種:</strong> ${window.agencyDataManager.getIndustryName(policy.customer.industry)}</div>
                        <div><strong>担当者:</strong> ${policy.customer.contactPerson}</div>
                    </div>
                    <div>
                        <div style="margin-bottom: 0.5rem;"><strong>電話番号:</strong> ${policy.customer.phone}</div>
                        <div><strong>リスクレベル:</strong>
                            <span class="risk-indicator">
                                <div class="risk-level ${policy.customer.riskLevel}"></div>
                                ${window.agencyDataManager.getRiskLevelName(policy.customer.riskLevel)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.showModal('policy-detail-modal');
    }

    // モーダル表示
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
        }
    }

    // モーダル閉じる
    closeModal() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }

    // レポート画面読み込み
    loadReports() {
        // レポート生成機能の実装（今後の拡張ポイント）
        console.log('レポート画面を読み込みました');
    }

    // 顧客編集
    editCustomer(customerId) {
        console.log(`顧客編集: ${customerId}`);
        // 実装予定
    }

    // 保険証券編集
    editPolicy(policyId) {
        console.log(`証券編集: ${policyId}`);
        // 実装予定
    }

    // 見直し対応
    handleReview(customerId) {
        console.log(`見直し対応: ${customerId}`);
        // 実装予定
    }

    // 更新対応
    handleRenewal(policyId) {
        console.log(`更新対応: ${policyId}`);
        // 実装予定
    }

    // エクスポート機能
    exportCustomers() {
        console.log('顧客データエクスポート');
        // CSV出力機能の実装予定
    }

    exportPolicies() {
        console.log('証券データエクスポート');
        // CSV出力機能の実装予定
    }

    // 新規顧客追加モーダル
    showAddCustomerModal() {
        console.log('新規顧客登録モーダル表示');
        // フォームモーダル実装予定
    }

    // 新規証券追加モーダル
    showAddPolicyModal() {
        console.log('新規証券登録モーダル表示');
        // フォームモーダル実装予定
    }
}

// アプリケーション初期化
document.addEventListener('DOMContentLoaded', () => {
    window.agencyApp = new AgencyApp();
});