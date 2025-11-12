// Risk Lance - リスクブランディング画面コンテンツレンダラー

class RiskBrandingContentRenderer {
    /**
     * リスクブランディング画面のコンテンツを生成
     * @param {Object} data - リスクブランディングデータ（league, guild）
     */
    static render(data = null) {
        // データマネージャーからデータを取得
        const brandingData = data || (window.dataManager ? window.dataManager.getRiskBrandingData() : null);

        if (!brandingData) {
            return '<p>データを読み込んでいます...</p>';
        }

        return `
            <h2>リスク・ブランディング</h2>

            <!-- リスクレポート発行 -->
            <div class="report-actions">
                <button class="report-generate-btn" id="generate-report-btn">
                    <i class="fas fa-file-pdf"></i>
                    リスクレポート発行
                </button>
                <div class="report-options">
                    <select id="report-type">
                        <option value="comprehensive">総合リスクレポート</option>
                        <option value="monthly">月次リスクレポート</option>
                        <option value="insurance">保険カバレッジレポート</option>
                        <option value="compliance">コンプライアンスレポート</option>
                    </select>
                </div>
            </div>

            <div class="branding-overview">
                ${this.renderLeagueStatus(brandingData.league)}
                ${this.renderLeagueRankings(brandingData.league)}
            </div>
        `;
    }

    /**
     * リーグステータスセクションを生成
     */
    static renderLeagueStatus(leagueData) {
        if (!leagueData || !leagueData.currentUser) {
            return '<p>リーグデータがありません。</p>';
        }

        const user = leagueData.currentUser;
        const leagueName = user.league.toUpperCase();
        const nextTierLP = 2800; // 次のティアまでのLP（固定値またはデータから計算）
        const remainingLP = nextTierLP - user.lp;
        const progressPercent = Math.round((user.lp / nextTierLP) * 100);

        // リスク評価カテゴリ生成
        const assessmentCategories = [
            { key: 'fire', label: '火災対策', level: user.riskAssessments.fire.level },
            { key: 'cyber', label: 'サイバーセキュリティ', level: user.riskAssessments.cyber.level },
            { key: 'compliance', label: 'コンプライアンス', level: user.riskAssessments.compliance.level },
            { key: 'bcp', label: 'BCP対策', level: user.riskAssessments.bcp.level },
            { key: 'financial', label: '財務リスク', level: user.riskAssessments.financial.level }
        ];

        const categoriesHtml = assessmentCategories.map(cat => {
            const stars = '★'.repeat(cat.level) + '☆'.repeat(5 - cat.level);
            return `
                <div class="category-score">
                    <span class="category">${cat.label}</span>
                    <div class="level-indicator level-${cat.level}">
                        <span class="level">Lv.${cat.level}</span>
                        <div class="stars">${stars}</div>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <!-- 企業リーグステータス -->
            <div class="enterprise-league-section">
                <h3>Risk Lance認定企業ステータス</h3>
                <div class="league-status-card">
                    <div class="current-league">
                        <div class="league-emblem ${user.league}">
                            <i class="fas fa-medal"></i>
                            <span class="league-name">${leagueName}</span>
                        </div>
                        <div class="league-info">
                            <h4>${user.company}</h4>
                            <p class="league-title">${leagueName} League企業</p>
                            <div class="league-progress">
                                <span class="current-points">${user.lp.toLocaleString()} LP</span>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${progressPercent}%"></div>
                                </div>
                                <span class="next-tier">次のリーグまで ${remainingLP.toLocaleString()} LP</span>
                            </div>
                        </div>
                    </div>

                    <div class="risk-assessment-breakdown">
                        <h5>リスク体制評価</h5>
                        <div class="assessment-categories">
                            ${categoriesHtml}
                        </div>
                        <div class="overall-assessment">
                            <span class="overall-label">総合評価</span>
                            <div class="overall-score">${leagueName} League Tier ${user.tier}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * リーグランキングセクションを生成
     */
    static renderLeagueRankings(leagueData) {
        if (!leagueData || !leagueData.rankings || !leagueData.recentParticipants) {
            return '<p>リーグランキングデータがありません。</p>';
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

        // ステータス日本語マッピング
        const statusTextMap = {
            'new': 'NEW',
            'promoted': '昇格',
            'stable': '安定',
            'rising': '上昇中'
        };

        // ランキングテーブル生成（全10件表示）
        const rankingsHtml = leagueData.rankings.map(rank => {
            const classes = ['rank-item'];
            // 1位のみtopクラス（オレンジ色）
            if (rank.rank === 1) classes.push('top');
            if (rank.current) classes.push('current');

            const tierCode = leagueTierMap[rank.league] || rank.league.substring(0, 2).toUpperCase();

            return `
                <div class="${classes.join(' ')}">
                    <span class="rank">${rank.rank}位</span>
                    <div class="league-tier ${rank.league}">${tierCode}</div>
                    <span class="company">${rank.company}</span>
                    <span class="score">${rank.lp.toLocaleString()} LP</span>
                </div>
            `;
        }).join('');

        // 直近参加企業リスト生成
        const participantsHtml = leagueData.recentParticipants.map(participant => {
            const classes = ['participant-item'];
            if (participant.status === 'new') classes.push('new');

            const tierCode = leagueTierMap[participant.league] || participant.league.substring(0, 2).toUpperCase();
            const statusText = statusTextMap[participant.status] || participant.status;
            const statusClass = participant.status === 'new' ? 'new-badge' : participant.status;

            return `
                <div class="${classes.join(' ')}">
                    <div class="participant-info">
                        <span class="company-name">${participant.company}</span>
                        <span class="join-date">${participant.joinDate}参加</span>
                    </div>
                    <div class="league-tier ${participant.league}">${tierCode}</div>
                    <span class="status ${statusClass}">${statusText}</span>
                </div>
            `;
        }).join('');

        return `
            <!-- リーグランキングと参加企業 -->
            <div class="league-rankings-section">
                <div class="rankings-container">
                    <!-- リーグランキング -->
                    <div class="league-rankings">
                        <h3>Gold Leagueランキング</h3>
                        <div class="ranking-table">
                            ${rankingsHtml}
                        </div>
                    </div>

                    <!-- 直近参加企業 -->
                    <div class="recent-participants">
                        <h3>直近リーグ参加企業</h3>
                        <div class="participants-list">
                            ${participantsHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * ギルドシステムセクションを生成
     */
    static renderGuildSystem(guildData) {
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
}

// グローバルに公開
window.RiskBrandingContentRenderer = RiskBrandingContentRenderer;

console.log('✅ RiskBrandingContentRenderer が読み込まれました');
