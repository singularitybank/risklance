// Risk Lance - アイデアのアーカイブ画面コンテンツレンダラー

class ArchiveContentRenderer {
    /**
     * アイデアのアーカイブ画面のコンテンツを生成
     */
    static render() {
        return `
            <h2>アイデアのアーカイブ</h2>
            <div class="archive-container">
                ${this.renderArchiveList()}
                <div id="archive-detail-section" class="archive-detail-section"></div>
            </div>
        `;
    }

    /**
     * アーカイブリストを生成
     */
    static renderArchiveList() {
        const archiveItems = [
            {
                id: 'guild-system',
                title: 'ギルドシステム',
                description: '企業間のリスク管理協力とナレッジ共有を促進するギルド機能',
                date: '2024-11-12',
                status: 'archived'
            },
            {
                id: 'risk-sharing',
                title: 'リスク情報共有プラットフォーム',
                description: '業界横断のリスク情報共有とベンチマーク機能',
                date: '2024-10-15',
                status: 'archived'
            },
            {
                id: 'ai-risk-advisor',
                title: 'AIリスクアドバイザー',
                description: '機械学習によるリスク予測とアドバイス機能',
                date: '2024-09-20',
                status: 'archived'
            }
        ];

        const itemsHtml = archiveItems.map(item => {
            return `
                <div class="archive-item" data-archive-id="${item.id}">
                    <div class="archive-item-header">
                        <h4>${item.title}</h4>
                        <span class="archive-date">${item.date}</span>
                    </div>
                    <p class="archive-description">${item.description}</p>
                    <div class="archive-actions">
                        <button class="btn-view-archive" data-archive-id="${item.id}">
                            <i class="fas fa-eye"></i>
                            詳細を表示
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="archive-list-section">
                <h3>アーカイブされた機能アイデア</h3>
                <div class="archive-list">
                    ${itemsHtml}
                </div>
            </div>
        `;
    }

    /**
     * ギルドシステムの詳細を生成
     */
    static renderGuildSystemDetail() {
        // データマネージャーからギルドデータを取得
        const brandingData = window.dataManager ? window.dataManager.getRiskBrandingData() : null;
        const guildData = brandingData ? brandingData.guild : null;

        if (!guildData || !guildData.currentGuild || !guildData.members || !guildData.guildRankings) {
            return '<p>ギルドデータがありません。</p>';
        }

        // リーグ略称マッピング
        const leagueTierMap = {
            'challenger': 'CH',
            'master': 'MA',
            'diamond': 'DI',
            'platinum': 'PL',
            'gold': 'GO',
            'silver': 'SI',
            'bronze': 'BR'
        };

        const guild = guildData.currentGuild;
        const guildLeagueTier = leagueTierMap[guild.league] || guild.league.substring(0, 2).toUpperCase();
        const guildLeagueName = guild.league.charAt(0).toUpperCase() + guild.league.slice(1);

        // ギルドメンバーリスト生成
        const membersHtml = guildData.members.map(member => {
            const classes = ['member-item'];
            if (member.role === 'leader') classes.push('leader');

            const tierCode = leagueTierMap[member.league] || member.league.substring(0, 2).toUpperCase();
            const roleHtml = member.role === 'leader' ? '<span class="role">リーダー</span>' : '';

            return `
                <div class="${classes.join(' ')}">
                    <span class="member-name">${member.name}</span>
                    <div class="member-level">Lv.${member.level}</div>
                    <div class="league-tier ${member.league}">${tierCode}</div>
                    <span class="member-lp">${member.lp.toLocaleString()} LP</span>
                    ${roleHtml}
                </div>
            `;
        }).join('');

        // ギルドランキング生成
        const guildRankingsHtml = guildData.guildRankings.map(guildRank => {
            const classes = ['guild-rank-item'];
            // 1位のみtopクラス（オレンジ色）
            if (guildRank.rank === 1) classes.push('top');
            if (guildRank.current) classes.push('current');

            const tierCode = leagueTierMap[guildRank.league] || guildRank.league.substring(0, 2).toUpperCase();

            return `
                <div class="${classes.join(' ')}">
                    <span class="rank">${guildRank.rank}位</span>
                    <div class="league-tier ${guildRank.league}">${tierCode}</div>
                    <span class="guild-name">${guildRank.name}</span>
                    <span class="guild-score">${guildRank.totalLP.toLocaleString()} LP</span>
                    <span class="member-count">${guildRank.memberCount}社</span>
                </div>
            `;
        }).join('');

        return `
            <!-- ギルドシステム -->
            <div class="guild-system-section">
                <h3>ギルドシステム</h3>
                <div class="guild-overview">
                    <!-- 所属ギルド情報 -->
                    <div class="guild-info-card">
                        <div class="guild-header">
                            <div class="guild-emblem">
                                <i class="fas fa-shield"></i>
                            </div>
                            <div class="guild-details">
                                <h4>${guild.name}</h4>
                                <div class="guild-league">
                                    <div class="league-tier ${guild.league}">${guildLeagueTier}</div>
                                    <span>${guildLeagueName} League</span>
                                </div>
                                <div class="guild-stats">
                                    <span>メンバー: ${guild.memberCount}社</span>
                                    <span>合計LP: ${guild.totalLP.toLocaleString()}</span>
                                    <span>平均LP: ${guild.averageLP.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div class="guild-members">
                            <h5>ギルドメンバー</h5>
                            <div class="members-list">
                                ${membersHtml}
                            </div>
                        </div>
                    </div>

                    <!-- ギルドランキング -->
                    <div class="guild-rankings">
                        <h4>ギルドランキング</h4>
                        <div class="guild-ranking-table">
                            ${guildRankingsHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * アーカイブアイテムの詳細を表示
     */
    static showArchiveDetail(archiveId) {
        const detailSection = document.getElementById('archive-detail-section');
        if (!detailSection) return;

        let content = '';
        switch (archiveId) {
            case 'guild-system':
                content = this.renderGuildSystemDetail();
                break;
            case 'risk-sharing':
                content = '<p>この機能の詳細は準備中です。</p>';
                break;
            case 'ai-risk-advisor':
                content = '<p>この機能の詳細は準備中です。</p>';
                break;
            default:
                content = '<p>詳細情報が見つかりません。</p>';
        }

        detailSection.innerHTML = content;
        detailSection.scrollIntoView({ behavior: 'smooth' });
    }

    /**
     * イベントリスナーを設定
     */
    static attachEventListeners() {
        // アーカイブアイテムの詳細表示ボタン
        document.querySelectorAll('.btn-view-archive').forEach(button => {
            button.addEventListener('click', (e) => {
                const archiveId = e.currentTarget.getAttribute('data-archive-id');
                this.showArchiveDetail(archiveId);
            });
        });
    }
}

// グローバルに公開
window.ArchiveContentRenderer = ArchiveContentRenderer;

console.log('✅ ArchiveContentRenderer が読み込まれました');
