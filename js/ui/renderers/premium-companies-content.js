// Risk Lance - 優良企業リスト画面コンテンツレンダラー

class PremiumCompaniesContentRenderer {
    constructor() {
        this.currentTab = 'search'; // search, favorites, new-contacts, history
        this.searchResults = [];
        this.currentPage = 1;
        this.itemsPerPage = 20;
        this.currentFilters = {};
        this.isSearched = false;
    }

    /**
     * 優良企業リスト画面のコンテンツを生成
     */
    static render() {
        const instance = new PremiumCompaniesContentRenderer();
        return `
            <div class="premium-companies-container">
                <h2>優良企業リスト</h2>
                <p class="page-description">RISK LANCE認定企業を含む、リスク対策に優れた企業データベース</p>

                ${instance.renderTabs()}
                ${instance.renderTabContent()}
            </div>
        `;
    }

    /**
     * タブを生成
     */
    renderTabs() {
        const tabs = [
            { id: 'search', label: '企業検索', icon: 'fas fa-search' },
            { id: 'favorites', label: 'お気に入り', icon: 'fas fa-star' },
            { id: 'new-contacts', label: '新着コンタクト', icon: 'fas fa-envelope' },
            { id: 'history', label: 'コンタクト履歴', icon: 'fas fa-history' }
        ];

        const tabsHtml = tabs.map(tab => `
            <button class="tab-btn ${tab.id === this.currentTab ? 'active' : ''}"
                    data-tab="${tab.id}">
                <i class="${tab.icon}"></i>
                <span>${tab.label}</span>
            </button>
        `).join('');

        return `<div class="tabs-container">${tabsHtml}</div>`;
    }

    /**
     * タブコンテンツを生成
     */
    renderTabContent() {
        switch (this.currentTab) {
            case 'search':
                return this.renderSearchTab();
            case 'favorites':
                return this.renderFavoritesTab();
            case 'new-contacts':
                return this.renderNewContactsTab();
            case 'history':
                return this.renderHistoryTab();
            default:
                return '';
        }
    }

    /**
     * 企業検索タブを生成
     */
    renderSearchTab() {
        if (!this.isSearched) {
            return this.renderSearchForm();
        } else {
            return this.renderSearchResults();
        }
    }

    /**
     * 検索フォームを生成（検索前）
     */
    renderSearchForm() {
        return `
            <div class="search-form-container">
                <div class="search-header">
                    <h3>企業を検索</h3>
                </div>

                <div class="keyword-search">
                    <input type="text"
                           id="keyword-input"
                           class="search-input"
                           placeholder="企業名、業種、キーワードで検索...">
                    <button class="btn btn-primary" id="keyword-search-btn">
                        <i class="fas fa-search"></i>
                        検索
                    </button>
                </div>

                <div class="filter-section">
                    <h4>絞り込み条件</h4>

                    <div class="filter-grid">
                        <!-- 都道府県 -->
                        <div class="filter-group">
                            <label>都道府県</label>
                            <select id="filter-prefecture" class="filter-select" multiple>
                                <option value="北海道">北海道</option>
                                <option value="東京都">東京都</option>
                                <option value="神奈川県">神奈川県</option>
                                <option value="千葉県">千葉県</option>
                                <option value="埼玉県">埼玉県</option>
                                <option value="愛知県">愛知県</option>
                                <option value="大阪府">大阪府</option>
                                <option value="京都府">京都府</option>
                                <option value="兵庫県">兵庫県</option>
                                <option value="福岡県">福岡県</option>
                                <option value="宮城県">宮城県</option>
                                <option value="広島県">広島県</option>
                            </select>
                        </div>

                        <!-- 業種 -->
                        <div class="filter-group">
                            <label>業種</label>
                            <select id="filter-industry" class="filter-select" multiple>
                                <option value="情報通信業">情報通信業</option>
                                <option value="製造業">製造業</option>
                                <option value="金融業・保険業">金融業・保険業</option>
                                <option value="卸売業・小売業">卸売業・小売業</option>
                                <option value="建設業">建設業</option>
                                <option value="運輸業・郵便業">運輸業・郵便業</option>
                                <option value="サービス業">サービス業</option>
                            </select>
                        </div>

                        <!-- 売上高 -->
                        <div class="filter-group">
                            <label>売上高</label>
                            <div class="range-inputs">
                                <input type="number" id="filter-revenue-min" placeholder="最小（億円）" class="range-input">
                                <span>〜</span>
                                <input type="number" id="filter-revenue-max" placeholder="最大（億円）" class="range-input">
                            </div>
                        </div>

                        <!-- 従業員数 -->
                        <div class="filter-group">
                            <label>従業員数</label>
                            <div class="range-inputs">
                                <input type="number" id="filter-employees-min" placeholder="最小" class="range-input">
                                <span>〜</span>
                                <input type="number" id="filter-employees-max" placeholder="最大" class="range-input">
                            </div>
                        </div>

                        <!-- 上場区分 -->
                        <div class="filter-group">
                            <label>上場区分</label>
                            <select id="filter-listing" class="filter-select" multiple>
                                <option value="上場（東証プライム）">上場（東証プライム）</option>
                                <option value="上場（東証スタンダード）">上場（東証スタンダード）</option>
                                <option value="上場（東証グロース）">上場（東証グロース）</option>
                                <option value="非上場">非上場</option>
                            </select>
                        </div>

                        <!-- RISK LANCE認定ステータス -->
                        <div class="filter-group">
                            <label>
                                <input type="checkbox" id="filter-risk-lance-only">
                                RISK LANCE加入企業のみ
                            </label>
                        </div>

                        <!-- リーグ -->
                        <div class="filter-group">
                            <label>リーグ</label>
                            <select id="filter-league" class="filter-select" multiple>
                                <option value="challenger">Challenger League</option>
                                <option value="master">Master League</option>
                                <option value="diamond">Diamond League</option>
                                <option value="platinum">Platinum League</option>
                                <option value="gold">Gold League</option>
                                <option value="silver">Silver League</option>
                                <option value="bronze">Bronze League</option>
                            </select>
                        </div>

                        <!-- Tier -->
                        <div class="filter-group">
                            <label>Tier</label>
                            <select id="filter-tier" class="filter-select" multiple>
                                <option value="1">Tier 1</option>
                                <option value="2">Tier 2</option>
                                <option value="3">Tier 3</option>
                            </select>
                        </div>
                    </div>

                    <div class="filter-actions">
                        <button class="btn btn-secondary" id="clear-filters-btn">
                            <i class="fas fa-times"></i>
                            クリア
                        </button>
                        <button class="btn btn-primary" id="apply-filters-btn">
                            <i class="fas fa-filter"></i>
                            絞り込んで検索
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 検索結果を生成（検索後）
     */
    renderSearchResults() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageResults = this.searchResults.slice(startIndex, endIndex);

        return `
            <div class="search-results-container">
                <div class="results-sidebar">
                    ${this.renderFilterSidebar()}
                </div>

                <div class="results-main">
                    <div class="results-header">
                        <h3>検索結果: ${this.searchResults.length}件</h3>
                        <div class="results-actions">
                            <button class="btn btn-secondary" id="new-search-btn">
                                <i class="fas fa-search"></i>
                                新規検索
                            </button>
                            <button class="btn btn-secondary" id="download-list-btn">
                                <i class="fas fa-download"></i>
                                リストダウンロード
                            </button>
                        </div>
                    </div>

                    <div class="company-list">
                        ${pageResults.map(company => this.renderCompanyCard(company)).join('')}
                    </div>

                    ${this.renderPagination()}
                </div>
            </div>
        `;
    }

    /**
     * フィルターサイドバーを生成（Agoda風）
     */
    renderFilterSidebar() {
        return `
            <div class="filter-sidebar">
                <h4>絞り込み</h4>
                <div class="sidebar-filter-group">
                    <h5>RISK LANCE認定</h5>
                    <label><input type="checkbox" class="sidebar-filter" data-filter="riskLanceMemberOnly"> 加入企業のみ</label>
                </div>
                <div class="sidebar-filter-group">
                    <h5>リーグ</h5>
                    <label><input type="checkbox" class="sidebar-filter" data-filter-league="challenger"> Challenger</label>
                    <label><input type="checkbox" class="sidebar-filter" data-filter-league="master"> Master</label>
                    <label><input type="checkbox" class="sidebar-filter" data-filter-league="diamond"> Diamond</label>
                    <label><input type="checkbox" class="sidebar-filter" data-filter-league="platinum"> Platinum</label>
                    <label><input type="checkbox" class="sidebar-filter" data-filter-league="gold"> Gold</label>
                    <label><input type="checkbox" class="sidebar-filter" data-filter-league="silver"> Silver</label>
                    <label><input type="checkbox" class="sidebar-filter" data-filter-league="bronze"> Bronze</label>
                </div>
            </div>
        `;
    }

    /**
     * 企業カードを生成
     */
    renderCompanyCard(company) {
        const isFavorite = window.companyDatabase.isFavorite(company.id);
        const leagueBadge = company.league ? `<span class="league-badge ${company.league}">${company.league.toUpperCase()}</span>` : '';
        const tierBadge = company.tier ? `<span class="tier-badge">Tier ${company.tier}</span>` : '';

        return `
            <div class="company-card" data-company-id="${company.id}">
                <div class="company-header">
                    <div class="company-title">
                        <h4>${company.name}</h4>
                        <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-company-id="${company.id}">
                            <i class="fas fa-star"></i>
                        </button>
                    </div>
                    <div class="company-badges">
                        ${leagueBadge}
                        ${tierBadge}
                    </div>
                </div>
                <div class="company-info">
                    <div class="info-item"><i class="fas fa-map-marker-alt"></i> ${company.prefecture}</div>
                    <div class="info-item"><i class="fas fa-industry"></i> ${company.industry}</div>
                    <div class="info-item"><i class="fas fa-yen-sign"></i> 売上: ${(company.revenue / 100000000).toFixed(0)}億円</div>
                    <div class="info-item"><i class="fas fa-users"></i> 従業員: ${company.employees}名</div>
                </div>
                <div class="company-actions">
                    <button class="btn btn-secondary view-detail-btn" data-company-id="${company.id}">
                        <i class="fas fa-eye"></i>
                        詳細を見る
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * ページネーションを生成
     */
    renderPagination() {
        const totalPages = Math.ceil(this.searchResults.length / this.itemsPerPage);
        if (totalPages <= 1) return '';

        let paginationHtml = '<div class="pagination">';

        for (let i = 1; i <= totalPages; i++) {
            paginationHtml += `
                <button class="page-btn ${i === this.currentPage ? 'active' : ''}"
                        data-page="${i}">
                    ${i}
                </button>
            `;
        }

        paginationHtml += '</div>';
        return paginationHtml;
    }

    /**
     * お気に入りタブを生成
     */
    renderFavoritesTab() {
        const favorites = window.companyDatabase.getFavorites();

        if (favorites.length === 0) {
            return '<div class="empty-state"><i class="fas fa-star"></i><p>お気に入りに登録された企業はありません</p></div>';
        }

        return `
            <div class="favorites-container">
                <h3>お気に入り企業 (${favorites.length}件)</h3>
                <div class="company-list">
                    ${favorites.map(company => this.renderCompanyCard(company)).join('')}
                </div>
            </div>
        `;
    }

    /**
     * 新着コンタクトタブを生成
     */
    renderNewContactsTab() {
        const newContacts = window.companyDatabase.getNewContacts();

        if (newContacts.length === 0) {
            return '<div class="empty-state"><i class="fas fa-envelope"></i><p>新着コンタクトはありません</p></div>';
        }

        return '<div class="contacts-container"><h3>新着コンタクト</h3><p>（実装予定）</p></div>';
    }

    /**
     * コンタクト履歴タブを生成
     */
    renderHistoryTab() {
        const history = window.companyDatabase.getContactHistory();

        if (history.length === 0) {
            return '<div class="empty-state"><i class="fas fa-history"></i><p>コンタクト履歴はありません</p></div>';
        }

        const historyHtml = history.map(contact => `
            <div class="contact-history-item">
                <div class="contact-header">
                    <h4>${contact.company.name}</h4>
                    <span class="contact-date">${new Date(contact.sentAt).toLocaleDateString('ja-JP')}</span>
                </div>
                <p class="contact-message">${contact.message}</p>
                <span class="contact-status ${contact.status}">${contact.status === 'sent' ? '送信済み' : '返信済み'}</span>
            </div>
        `).join('');

        return `
            <div class="history-container">
                <h3>コンタクト履歴 (${history.length}件)</h3>
                <div class="contact-history-list">
                    ${historyHtml}
                </div>
            </div>
        `;
    }

    /**
     * イベントリスナーを設定
     */
    static attachEventListeners() {
        const instance = new PremiumCompaniesContentRenderer();
        instance.setupEventListeners();
    }

    /**
     * イベントリスナーを設定
     */
    setupEventListeners() {
        // タブ切り替え
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentTab = e.currentTarget.getAttribute('data-tab');
                this.refreshView();
            });
        });

        // キーワード検索
        const keywordBtn = document.getElementById('keyword-search-btn');
        if (keywordBtn) {
            keywordBtn.addEventListener('click', () => this.performSearch());
        }

        // フィルター適用検索
        const applyFiltersBtn = document.getElementById('apply-filters-btn');
        if (applyFiltersBtn) {
            applyFiltersBtn.addEventListener('click', () => this.performSearch());
        }

        // フィルタークリア
        const clearFiltersBtn = document.getElementById('clear-filters-btn');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => this.clearFilters());
        }

        // 新規検索
        const newSearchBtn = document.getElementById('new-search-btn');
        if (newSearchBtn) {
            newSearchBtn.addEventListener('click', () => {
                this.isSearched = false;
                this.refreshView();
            });
        }

        // 企業詳細表示
        document.querySelectorAll('.view-detail-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const companyId = e.currentTarget.getAttribute('data-company-id');
                this.showCompanyDetail(companyId);
            });
        });

        // お気に入りボタン
        document.querySelectorAll('.favorite-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const companyId = e.currentTarget.getAttribute('data-company-id');
                this.toggleFavorite(companyId);
            });
        });

        // ページネーション
        document.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentPage = parseInt(e.currentTarget.getAttribute('data-page'));
                this.refreshView();
            });
        });
    }

    /**
     * 検索を実行
     */
    performSearch() {
        const filters = this.collectFilters();
        this.searchResults = window.companyDatabase.searchCompanies(filters);
        this.isSearched = true;
        this.currentPage = 1;
        this.refreshView();
    }

    /**
     * フィルター条件を収集
     */
    collectFilters() {
        const filters = {};

        // キーワード
        const keywordInput = document.getElementById('keyword-input');
        if (keywordInput && keywordInput.value) {
            filters.keyword = keywordInput.value;
        }

        // 都道府県
        const prefectureSelect = document.getElementById('filter-prefecture');
        if (prefectureSelect) {
            const selected = Array.from(prefectureSelect.selectedOptions).map(opt => opt.value);
            if (selected.length > 0) filters.prefecture = selected;
        }

        // 業種
        const industrySelect = document.getElementById('filter-industry');
        if (industrySelect) {
            const selected = Array.from(industrySelect.selectedOptions).map(opt => opt.value);
            if (selected.length > 0) filters.industry = selected;
        }

        // 売上高
        const revenueMin = document.getElementById('filter-revenue-min');
        const revenueMax = document.getElementById('filter-revenue-max');
        if (revenueMin && revenueMin.value) filters.revenueMin = parseFloat(revenueMin.value) * 100000000;
        if (revenueMax && revenueMax.value) filters.revenueMax = parseFloat(revenueMax.value) * 100000000;

        // 従業員数
        const employeesMin = document.getElementById('filter-employees-min');
        const employeesMax = document.getElementById('filter-employees-max');
        if (employeesMin && employeesMin.value) filters.employeesMin = parseInt(employeesMin.value);
        if (employeesMax && employeesMax.value) filters.employeesMax = parseInt(employeesMax.value);

        // 上場区分
        const listingSelect = document.getElementById('filter-listing');
        if (listingSelect) {
            const selected = Array.from(listingSelect.selectedOptions).map(opt => opt.value);
            if (selected.length > 0) filters.listing = selected;
        }

        // RISK LANCE加入のみ
        const riskLanceOnly = document.getElementById('filter-risk-lance-only');
        if (riskLanceOnly && riskLanceOnly.checked) {
            filters.riskLanceMemberOnly = true;
        }

        // リーグ
        const leagueSelect = document.getElementById('filter-league');
        if (leagueSelect) {
            const selected = Array.from(leagueSelect.selectedOptions).map(opt => opt.value);
            if (selected.length > 0) filters.league = selected;
        }

        // Tier
        const tierSelect = document.getElementById('filter-tier');
        if (tierSelect) {
            const selected = Array.from(tierSelect.selectedOptions).map(opt => parseInt(opt.value));
            if (selected.length > 0) filters.tier = selected;
        }

        return filters;
    }

    /**
     * フィルターをクリア
     */
    clearFilters() {
        document.querySelectorAll('select.filter-select').forEach(select => {
            select.selectedIndex = -1;
        });
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.value = '';
        });
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        const keywordInput = document.getElementById('keyword-input');
        if (keywordInput) keywordInput.value = '';
    }

    /**
     * お気に入りをトグル
     */
    toggleFavorite(companyId) {
        if (window.companyDatabase.isFavorite(companyId)) {
            window.companyDatabase.removeFromFavorites(companyId);
        } else {
            window.companyDatabase.addToFavorites(companyId);
        }
        this.refreshView();
    }

    /**
     * 企業詳細を表示
     */
    showCompanyDetail(companyId) {
        const company = window.companyDatabase.getCompanyDetail(companyId);
        if (!company) return;

        const canContactResult = window.companyDatabase.canContact(companyId);
        const contactButtonHtml = company.riskLanceMember ?
            `<button class="btn btn-primary ${canContactResult.canContact ? '' : 'disabled'}"
                     id="contact-company-btn"
                     data-company-id="${companyId}"
                     ${!canContactResult.canContact ? 'disabled' : ''}>
                <i class="fas fa-envelope"></i>
                コンタクト
            </button>
            ${!canContactResult.canContact ? `<p class="contact-disabled-reason">${canContactResult.reason}</p>` : ''}` :
            '<p class="no-contact">RISK LANCE非加入企業のため、コンタクトできません</p>';

        const riskFeaturesHtml = company.riskFeatures ?
            `<h5>リスク対策の特徴</h5>
             <ul>${company.riskFeatures.map(f => `<li>${f}</li>`).join('')}</ul>` :
            '';

        const modalHtml = `
            <div id="company-detail-modal" class="modal">
                <div class="modal-overlay"></div>
                <div class="modal-content company-detail-modal">
                    <div class="modal-header">
                        <h2>${company.name}</h2>
                        <button class="modal-close" id="close-company-modal">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="company-detail-grid">
                            <div class="detail-section">
                                <h4>基本情報</h4>
                                <p><strong>所在地:</strong> ${company.address}</p>
                                <p><strong>設立:</strong> ${company.founded}</p>
                                <p><strong>代表者:</strong> ${company.ceo}</p>
                                <p><strong>業種:</strong> ${company.industry}</p>
                                <p><strong>売上高:</strong> ${(company.revenue / 100000000).toFixed(0)}億円</p>
                                <p><strong>従業員数:</strong> ${company.employees}名</p>
                                <p><strong>上場区分:</strong> ${company.listing}</p>
                            </div>
                            ${company.riskLanceMember ? `
                            <div class="detail-section">
                                <h4>RISK LANCE認定ステータス</h4>
                                <p><strong>リーグ:</strong> <span class="league-badge ${company.league}">${company.league.toUpperCase()}</span></p>
                                <p><strong>Tier:</strong> Tier ${company.tier}</p>
                                <p><strong>LP:</strong> ${company.lp.toLocaleString()} LP</p>
                                ${riskFeaturesHtml}
                            </div>` : ''}
                            <div class="detail-section full-width">
                                <h4>企業概要</h4>
                                <p>${company.description}</p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        ${contactButtonHtml}
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const modal = document.getElementById('company-detail-modal');
        setTimeout(() => modal.classList.add('active'), 10);

        // モーダルイベントリスナー
        document.getElementById('close-company-modal').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });

        modal.querySelector('.modal-overlay').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });

        const contactBtn = document.getElementById('contact-company-btn');
        if (contactBtn && canContactResult.canContact) {
            contactBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
                this.showContactModal(companyId);
            });
        }
    }

    /**
     * コンタクトモーダルを表示
     */
    showContactModal(companyId) {
        const company = window.companyDatabase.getCompanyDetail(companyId);

        const modalHtml = `
            <div id="contact-modal" class="modal">
                <div class="modal-overlay"></div>
                <div class="modal-content contact-modal">
                    <div class="modal-header">
                        <h2>コンタクト送信</h2>
                        <button class="modal-close" id="close-contact-modal">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p><strong>送信先:</strong> ${company.name}</p>
                        <textarea id="contact-message" rows="6" placeholder="メッセージを入力してください..."></textarea>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" id="cancel-contact-btn">キャンセル</button>
                        <button class="btn btn-primary" id="send-contact-btn">送信</button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const modal = document.getElementById('contact-modal');
        setTimeout(() => modal.classList.add('active'), 10);

        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        };

        document.getElementById('close-contact-modal').addEventListener('click', closeModal);
        document.getElementById('cancel-contact-btn').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

        document.getElementById('send-contact-btn').addEventListener('click', () => {
            const message = document.getElementById('contact-message').value;
            if (!message) {
                alert('メッセージを入力してください');
                return;
            }

            const result = window.companyDatabase.sendContact(companyId, message);
            if (result.success) {
                alert('コンタクトを送信しました');
                closeModal();
            } else {
                alert(result.message);
            }
        });
    }

    /**
     * ビューを再描画
     */
    refreshView() {
        const container = document.querySelector('.premium-companies-container');
        if (!container) return;

        const newHtml = this.renderTabs() + this.renderTabContent();
        container.innerHTML = `
            <h2>優良企業リスト</h2>
            <p class="page-description">RISK LANCE認定企業を含む、リスク対策に優れた企業データベース</p>
            ${newHtml}
        `;

        this.setupEventListeners();
    }
}

// グローバルに公開
window.PremiumCompaniesContentRenderer = PremiumCompaniesContentRenderer;

console.log('✅ PremiumCompaniesContentRenderer が読み込まれました');
