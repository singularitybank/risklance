// Risk Lance - リスクブランディング機能管理

class RiskBrandingManager {
    constructor() {
        this.currentUserLeague = 'gold';
        this.currentLP = 2450;
        this.guildData = null;
        this.leagueData = null;
        this.reportTypes = {
            comprehensive: '総合リスクレポート',
            monthly: '月次リスクレポート',
            insurance: '保険カバレッジレポート',
            compliance: 'コンプライアンスレポート'
        };
        this.initialized = false;

        // データマネージャーからデータを取得するように変更
    }

    // リスクブランディング機能初期化
    initializeRiskBranding() {
        if (this.initialized) return;

        this.loadBrandingData();
        this.setupReportGeneration();
        this.setupLeagueInteractions();
        this.updateLeagueDisplay();
        this.updateGuildDisplay();
        this.initialized = true;
    }

    // レポート生成機能設定
    setupReportGeneration() {
        const reportBtn = document.getElementById('generate-report-btn');
        if (reportBtn) {
            reportBtn.addEventListener('click', () => {
                this.generateRiskReport();
            });
        }
    }

    // リーグインタラクション設定
    setupLeagueInteractions() {
        // ランキング項目のホバーエフェクト
        const rankItems = document.querySelectorAll('.rank-item, .participant-item, .guild-rank-item, .member-item');
        rankItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                this.showRankTooltip(e.currentTarget);
            });

            item.addEventListener('mouseleave', () => {
                this.hideRankTooltip();
            });
        });
    }

    // レポート生成処理
    generateRiskReport() {
        const reportType = document.getElementById('report-type').value;
        const reportName = this.reportTypes[reportType];

        console.log(`${reportName}を生成中...`);

        // 総合リスクレポートの場合は詳細なHTMLレポートを即座に表示
        if (reportType === 'comprehensive') {
            this.showComprehensiveReport();
            return;
        }

        // その他のレポートは従来通りのシミュレーション
        window.alertManager.showActionDialog(
            'レポート生成',
            `${reportName}の生成を開始しました。\n\n生成には数分かかる場合があります。\n完了時にダウンロードリンクをお送りします。`
        );

        setTimeout(() => {
            this.showReportGenerationComplete(reportName);
        }, 3000);
    }

    // レポート生成完了通知
    showReportGenerationComplete(reportName) {
        const notification = {
            title: 'レポート生成完了',
            message: `${reportName}が生成されました。`,
            type: 'success',
            timestamp: new Date().toLocaleTimeString('ja-JP', {
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        window.dataManager.addNotification(notification);

        // ダウンロードリンクのシミュレーション
        const filename = `risk_report_${reportName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
        window.alertManager.showActionDialog(
            'ダウンロード準備完了',
            `${reportName}のダウンロードが可能です。\n\nファイル名: ${filename}\n\n実際のアプリケーションではここにダウンロードリンクが表示されます。`
        );
    }

    // ランキングツールチップ表示
    showRankTooltip(element) {
        // 詳細情報を表示（実装は簡略化）
        const companyName = element.querySelector('.company, .company-name, .guild-name, .member-name')?.textContent;
        if (companyName) {
            element.title = `${companyName}の詳細情報を確認`;
        }
    }

    // ツールチップ非表示
    hideRankTooltip() {
        // ツールチップを非表示（実装は簡略化）
    }

    // データマネージャーからデータを取得
    loadBrandingData() {
        this.leagueData = window.dataManager.getLeagueData();
        this.guildData = window.dataManager.getGuildData();
    }

    // リーグ表示更新
    updateLeagueDisplay() {
        this.updateLeagueProgress();
        this.updateRiskAssessments();
        this.updateRankings();
        this.updateRecentParticipants();
    }

    // リーグ進捗更新
    updateLeagueProgress() {
        const currentLP = this.leagueData.currentUser.lp;
        const progressFill = document.querySelector('.progress-fill');

        if (progressFill) {
            // 現在のリーグ内での進捗を計算
            const leagueThresholds = this.getLeagueThresholds();
            const currentLeague = this.leagueData.currentUser.league;
            const currentThreshold = leagueThresholds[currentLeague];
            const nextThreshold = this.getNextLeagueThreshold(currentLeague);

            if (currentThreshold && nextThreshold) {
                const progress = ((currentLP - currentThreshold) / (nextThreshold - currentThreshold)) * 100;
                progressFill.style.width = `${Math.min(Math.max(progress, 0), 100)}%`;
            }
        }
    }

    // リスク体制評価更新
    updateRiskAssessments() {
        const assessments = this.leagueData.currentUser.riskAssessments;

        Object.keys(assessments).forEach(category => {
            const assessment = assessments[category];
            const levelElement = document.querySelector(`[data-category="${category}"] .level`);
            const starsElement = document.querySelector(`[data-category="${category}"] .stars`);

            if (levelElement) {
                levelElement.textContent = `Lv.${assessment.level}`;
            }

            if (starsElement) {
                starsElement.textContent = '★'.repeat(assessment.level) + '☆'.repeat(5 - assessment.level);
            }
        });
    }

    // ランキング更新
    updateRankings() {
        // リアルタイムでランキングを更新（シミュレーション）
        const rankingItems = document.querySelectorAll('.rank-item');
        rankingItems.forEach((item, index) => {
            if (this.leagueData.rankings[index]) {
                const ranking = this.leagueData.rankings[index];
                const scoreElement = item.querySelector('.score');
                if (scoreElement && !ranking.current) {
                    // スコアに微細な変動を追加（デモ用）
                    const variation = Math.floor(Math.random() * 20) - 10;
                    const newScore = ranking.lp + variation;
                    scoreElement.textContent = `${newScore.toLocaleString()} LP`;
                }
            }
        });
    }

    // 直近参加企業更新
    updateRecentParticipants() {
        // 定期的に新しい参加者を追加（シミュレーション）
        if (Math.random() < 0.1) { // 10%の確率で新しい参加者を追加
            this.addNewParticipant();
        }
    }

    // 新しい参加者追加
    addNewParticipant() {
        const newCompanies = [
            '革新技術企業F',
            'セキュリティ新星G',
            'リスク対策プロH',
            '安全管理専門I',
            '次世代保険J'
        ];

        const newParticipant = {
            company: newCompanies[Math.floor(Math.random() * newCompanies.length)],
            joinDate: new Date().toISOString().split('T')[0],
            league: 'bronze',
            status: 'new'
        };

        this.leagueData.recentParticipants.unshift(newParticipant);

        // 最大5件まで保持
        if (this.leagueData.recentParticipants.length > 5) {
            this.leagueData.recentParticipants.pop();
        }

        console.log(`新しい参加者が追加されました: ${newParticipant.company}`);
    }

    // ギルド表示更新
    updateGuildDisplay() {
        this.updateGuildStats();
        this.updateGuildMembers();
        this.updateGuildRankings();
    }

    // ギルド統計更新
    updateGuildStats() {
        const guild = this.guildData.currentGuild;

        // ギルド統計の更新をシミュレート
        guild.totalLP += Math.floor(Math.random() * 100) - 50;
        guild.averageLP = Math.floor(guild.totalLP / guild.memberCount);

        const statsElements = document.querySelectorAll('.guild-stats span');
        statsElements.forEach(element => {
            if (element.textContent.includes('合計LP')) {
                element.textContent = `合計LP: ${guild.totalLP.toLocaleString()}`;
            } else if (element.textContent.includes('平均LP')) {
                element.textContent = `平均LP: ${guild.averageLP.toLocaleString()}`;
            }
        });
    }

    // ギルドメンバー更新
    updateGuildMembers() {
        // メンバーのレベルアップをシミュレート
        this.guildData.members.forEach(member => {
            if (Math.random() < 0.05) { // 5%の確率でレベルアップ
                member.level += 1;
                member.lp += Math.floor(Math.random() * 100) + 50;

                console.log(`${member.name}がレベルアップしました: Lv.${member.level}`);
            }
        });
    }

    // ギルドランキング更新
    updateGuildRankings() {
        // ギルドランキングの微細な変動をシミュレート
        this.guildData.guildRankings.forEach(guild => {
            if (!guild.current) {
                const variation = Math.floor(Math.random() * 200) - 100;
                guild.totalLP += variation;
            }
        });

        // ランキングをソート
        this.guildData.guildRankings.sort((a, b) => b.totalLP - a.totalLP);

        // 順位を更新
        this.guildData.guildRankings.forEach((guild, index) => {
            guild.rank = index + 1;
        });
    }

    // リーグ閾値取得
    getLeagueThresholds() {
        return {
            bronze: 0,
            silver: 1000,
            gold: 2000,
            platinum: 3000,
            diamond: 4000,
            master: 5000,
            challenger: 6000
        };
    }

    // 次のリーグ閾値取得
    getNextLeagueThreshold(currentLeague) {
        const thresholds = this.getLeagueThresholds();
        const leagues = Object.keys(thresholds);
        const currentIndex = leagues.indexOf(currentLeague);

        if (currentIndex >= 0 && currentIndex < leagues.length - 1) {
            const nextLeague = leagues[currentIndex + 1];
            return thresholds[nextLeague];
        }

        return thresholds.challenger + 1000; // Challengerの場合の仮想上限
    }

    // LP計算（リスク体制評価から）
    calculateLPFromAssessments(assessments) {
        let totalLP = 0;

        Object.values(assessments).forEach(assessment => {
            totalLP += assessment.level * 100 + assessment.score * 5;
        });

        return totalLP;
    }

    // リーグ判定
    determineLeague(lp) {
        const thresholds = this.getLeagueThresholds();

        if (lp >= thresholds.challenger) return 'challenger';
        if (lp >= thresholds.master) return 'master';
        if (lp >= thresholds.diamond) return 'diamond';
        if (lp >= thresholds.platinum) return 'platinum';
        if (lp >= thresholds.gold) return 'gold';
        if (lp >= thresholds.silver) return 'silver';
        return 'bronze';
    }

    // レポート履歴管理
    getReportHistory() {
        return [
            {
                id: 'RPT-2024-001',
                type: 'comprehensive',
                generatedDate: '2024-09-15',
                status: 'completed',
                downloadCount: 3
            },
            {
                id: 'RPT-2024-002',
                type: 'monthly',
                generatedDate: '2024-09-01',
                status: 'completed',
                downloadCount: 5
            },
            {
                id: 'RPT-2024-003',
                type: 'insurance',
                generatedDate: '2024-08-20',
                status: 'completed',
                downloadCount: 2
            }
        ];
    }

    // リアルタイム更新開始
    startRealTimeUpdates() {
        // 30秒ごとにデータを更新
        setInterval(() => {
            this.updateRankings();
            this.updateRecentParticipants();
            this.updateGuildStats();
        }, 30000);

        // 5分ごとにメンバーレベルをチェック
        setInterval(() => {
            this.updateGuildMembers();
        }, 300000);
    }

    // 総合リスクレポート表示
    showComprehensiveReport() {
        // レポートデータ生成
        const reportData = this.generateReportData();

        // HTMLレポートを直接生成
        const reportHtml = this.generateComprehensiveReportHtml(reportData);
        this.displayReport(reportHtml);
    }

    // レポートデータ生成
    generateReportData() {
        const currentDate = new Date();
        const oneYearAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());

        return {
            companyName: '株式会社テックソリューションズ',
            reportPeriod: `${oneYearAgo.toLocaleDateString('ja-JP')} ～ ${currentDate.toLocaleDateString('ja-JP')}`,
            issueDate: currentDate.toLocaleDateString('ja-JP'),

            // 概要データ
            totalRiskScore: '87点',
            insuranceCoverage: '94',
            riskMitigationCount: '28',
            complianceRate: '99',

            // リーグ・ギルド情報
            leagueBadge: '🥇',
            leagueName: 'ゴールド',
            currentLP: this.leagueData?.currentUser?.lp?.toLocaleString() || '2,750',
            currentRank: '8',
            lpToNext: '250',
            guildName: this.guildData?.currentGuild?.name || 'エリートリスクガーディアンズ',
            guildMemberCount: this.guildData?.currentGuild?.memberCount || '32',
            guildRank: '2',
            guildTotalLP: this.guildData?.currentGuild?.totalLP?.toLocaleString() || '87,200',
            guildAverageLP: this.guildData?.currentGuild?.averageLP?.toLocaleString() || '2,725',
            guildGrowthRate: '+18.7',

            // リスク体制評価
            assessments: [
                { category: '情報セキュリティ', level: '5', stars: '★★★★★', score: 95 },
                { category: '財務リスク', level: '4', stars: '★★★★☆', score: 88 },
                { category: '運用リスク', level: '4', stars: '★★★★☆', score: 82 },
                { category: 'コンプライアンス', level: '5', stars: '★★★★★', score: 98 },
                { category: 'BCP/災害対策', level: '4', stars: '★★★★☆', score: 85 },
                { category: '品質管理', level: '4', stars: '★★★★☆', score: 91 }
            ],

            // 保険加入状況
            insurances: [
                { type: '損害保険', amount: '10億円', coverage: '火災・盗難・災害・自然災害', status: 'adequate', statusText: '適切' },
                { type: 'サイバー保険', amount: '5億円', coverage: '情報漏洩・システム障害・ランサムウェア', status: 'adequate', statusText: '適切' },
                { type: '賠償責任保険', amount: '8億円', coverage: 'PL・業務過誤・情報漏洩', status: 'adequate', statusText: '適切' },
                { type: '取引信用保険', amount: '3億円', coverage: '売掛金・貸倒れ・信用リスク', status: 'insufficient', statusText: '要改善' },
                { type: '役員賠償保険', amount: '2億円', coverage: '役員責任・法的費用・株主訴訟', status: 'adequate', statusText: '適切' },
                { type: '業務停止保険', amount: '4億円', coverage: '営業停止・事業中断・利益損失', status: 'adequate', statusText: '適切' }
            ],

            // リスク推移データ
            riskTrendData: '過去12ヶ月: 72点→76点→79点→82点→84点→87点（継続的改善）',
            monthlyScores: [
                { month: '2023年10月', score: 72, trend: 'stable' },
                { month: '2023年11月', score: 74, trend: 'up' },
                { month: '2023年12月', score: 76, trend: 'up' },
                { month: '2024年1月', score: 79, trend: 'up' },
                { month: '2024年2月', score: 81, trend: 'up' },
                { month: '2024年3月', score: 82, trend: 'up' },
                { month: '2024年4月', score: 84, trend: 'up' },
                { month: '2024年5月', score: 85, trend: 'up' },
                { month: '2024年6月', score: 86, trend: 'up' },
                { month: '2024年7月', score: 87, trend: 'up' },
                { month: '2024年8月', score: 87, trend: 'stable' },
                { month: '2024年9月', score: 87, trend: 'stable' }
            ],

            // リスク対策実行履歴
            riskActions: [
                { action: 'ゼロトラスト・セキュリティアーキテクチャ導入', date: '2024-09-20', status: '完了', statusClass: 'status-completed', impact: '高' },
                { action: 'AIベースの異常検知システム実装', date: '2024-09-05', status: '完了', statusClass: 'status-completed', impact: '高' },
                { action: 'BCP計画の全面的見直しと訓練実施', date: '2024-08-25', status: '完了', statusClass: 'status-completed', impact: '中' },
                { action: 'サプライチェーンリスク評価システム構築', date: '2024-08-10', status: '実施中', statusClass: 'status-ongoing', impact: '高' },
                { action: 'GDPR・個人情報保護法対応強化', date: '2024-07-15', status: '完了', statusClass: 'status-completed', impact: '高' },
                { action: 'クラウドセキュリティ体制強化', date: '2024-06-30', status: '完了', statusClass: 'status-completed', impact: '中' },
                { action: '内部統制システムSOX法対応', date: '2024-06-10', status: '完了', statusClass: 'status-completed', impact: '高' },
                { action: 'リスク評価プロセス自動化', date: '2024-05-20', status: '完了', statusClass: 'status-completed', impact: '中' },
                { action: '災害時リモートワーク体制構築', date: '2024-04-15', status: '完了', statusClass: 'status-completed', impact: '中' },
                { action: '取引先リスク評価システム導入', date: '2024-03-25', status: '完了', statusClass: 'status-completed', impact: '中' }
            ],

            // 取引先向け評価
            riskManagementLevel: '業界最高水準',
            standardComparison: '大幅に上回る',
            insuranceScope: '包括的かつ十分',
            improvementRecord: '継続的・体系的',
            improvementCount: '10',
            industryPosition: '上位2%',

            // 追加評価項目
            certifications: [
                'ISO 27001（情報セキュリティ）',
                'ISO 22301（事業継続）',
                'SOC 2 Type II',
                'PCI DSS Level 1'
            ],
            auditResults: {
                external: '適正意見（監査法人）',
                internal: '重要な指摘事項なし',
                compliance: '法令違反なし'
            },
            financialStrength: {
                rating: 'A+',
                liquidityRatio: '285%',
                debtEquityRatio: '0.32',
                operatingMargin: '12.5%'
            }
        };
    }

    // 総合リスクレポートHTML生成
    generateComprehensiveReportHtml(data) {
        return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>総合リスクレポート - ${data.companyName}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Meiryo', 'Yu Gothic', sans-serif;
            background: #f8f9fa;
            padding: 20px;
            line-height: 1.6;
        }

        .report-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .report-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .report-title {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .report-subtitle {
            font-size: 16px;
            opacity: 0.9;
        }

        .report-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            font-size: 14px;
            flex-wrap: wrap;
            gap: 10px;
        }

        .report-body {
            padding: 30px;
        }

        .section {
            margin-bottom: 30px;
        }

        .section-title {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 2px solid #667eea;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .overview-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .overview-card {
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            border-radius: 10px;
            padding: 20px;
            border-left: 4px solid #667eea;
            text-align: center;
        }

        .overview-card h3 {
            color: #333;
            font-size: 16px;
            margin-bottom: 10px;
        }

        .overview-value {
            font-size: 28px;
            font-weight: bold;
            color: #667eea;
        }

        .league-status {
            display: flex;
            align-items: center;
            gap: 20px;
            background: linear-gradient(135deg, #ffd89b 0%, #19547b 100%);
            color: white;
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 20px;
        }

        .league-badge {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background: rgba(255,255,255,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            flex-shrink: 0;
        }

        .league-info h3 {
            font-size: 20px;
            margin-bottom: 8px;
        }

        .league-stats {
            font-size: 14px;
            opacity: 0.9;
        }

        .guild-info {
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            border-radius: 12px;
            padding: 25px;
            margin-top: 20px;
            color: #333;
        }

        .guild-name {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 15px;
        }

        .guild-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 20px;
            margin-top: 15px;
        }

        .guild-stat {
            text-align: center;
            background: rgba(255,255,255,0.3);
            padding: 15px;
            border-radius: 8px;
        }

        .guild-stat-value {
            font-size: 20px;
            font-weight: bold;
            color: #333;
        }

        .guild-stat-label {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
        }

        .assessment-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 15px;
        }

        .assessment-item {
            text-align: center;
            padding: 20px;
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            border-radius: 10px;
            border: 1px solid #dee2e6;
        }

        .assessment-category {
            font-size: 13px;
            color: #666;
            margin-bottom: 8px;
            font-weight: 500;
        }

        .assessment-level {
            font-size: 18px;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 8px;
        }

        .assessment-stars {
            color: #ffc107;
            font-size: 16px;
        }

        .assessment-score {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
        }

        .insurance-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 15px;
        }

        .insurance-card {
            background: #e8f5e8;
            border: 2px solid #4caf50;
            border-radius: 8px;
            padding: 18px;
            position: relative;
        }

        .insurance-card.insufficient {
            background: #fff3cd;
            border-color: #ffc107;
        }

        .insurance-status {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: bold;
        }

        .insurance-card .insurance-status {
            background: #4caf50;
            color: white;
        }

        .insurance-card.insufficient .insurance-status {
            background: #ffc107;
            color: #333;
        }

        .insurance-type {
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 16px;
        }

        .insurance-detail {
            font-size: 14px;
            color: #666;
            margin-bottom: 5px;
        }

        .trend-chart {
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            border-radius: 10px;
            padding: 25px;
            margin: 15px 0;
            text-align: center;
        }

        .trend-summary {
            font-size: 18px;
            font-weight: bold;
            color: #28a745;
            margin-bottom: 15px;
        }

        .monthly-scores {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
            gap: 10px;
            margin-top: 15px;
        }

        .score-item {
            text-align: center;
            padding: 10px;
            background: white;
            border-radius: 6px;
            border: 1px solid #dee2e6;
        }

        .score-month {
            font-size: 11px;
            color: #666;
        }

        .score-value {
            font-size: 16px;
            font-weight: bold;
            color: #667eea;
        }

        .risk-history {
            background: linear-gradient(135deg, #f8f9fa, #e9ecef);
            border-radius: 10px;
            padding: 25px;
        }

        .history-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #dee2e6;
            background: white;
            margin-bottom: 10px;
            border-radius: 6px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .history-item:last-child {
            margin-bottom: 0;
        }

        .history-content {
            flex-grow: 1;
        }

        .history-action {
            font-weight: 600;
            color: #333;
            margin-bottom: 5px;
        }

        .history-meta {
            font-size: 12px;
            color: #666;
        }

        .history-status {
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            white-space: nowrap;
        }

        .status-completed {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .status-ongoing {
            background: #fff3cd;
            color: #856404;
            border: 1px solid #ffeaa7;
        }

        .impact-badge {
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 3px;
            margin-left: 8px;
        }

        .impact-high {
            background: #dc3545;
            color: white;
        }

        .impact-medium {
            background: #ffc107;
            color: #333;
        }

        .summary-section {
            background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
            padding: 25px;
            border-radius: 12px;
            border: 2px solid #2196f3;
        }

        .summary-title {
            color: #1976d2;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .summary-item {
            margin-bottom: 15px;
            padding: 10px;
            background: rgba(255,255,255,0.5);
            border-radius: 6px;
        }

        .summary-label {
            font-weight: bold;
            color: #333;
        }

        .summary-value {
            color: #1976d2;
            font-weight: 600;
        }

        .certifications {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 10px;
        }

        .certification-badge {
            background: #28a745;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: bold;
        }

        .footer {
            background: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #dee2e6;
        }

        @media print {
            body { padding: 0; }
            .report-container { box-shadow: none; }
        }
    </style>
</head>
<body>
    <div class="report-container">
        <div class="report-header">
            <div class="report-title">総合リスクレポート</div>
            <div class="report-subtitle">企業リスク管理総合評価書</div>
            <div class="report-meta">
                <div>企業名: ${data.companyName}</div>
                <div>レポート期間: ${data.reportPeriod}</div>
                <div>発行日: ${data.issueDate}</div>
            </div>
        </div>

        <div class="report-body">
            <!-- 概要セクション -->
            <div class="section">
                <div class="section-title">📊 リスク管理概要</div>
                <div class="overview-grid">
                    <div class="overview-card">
                        <h3>総合リスクスコア</h3>
                        <div class="overview-value">${data.totalRiskScore}</div>
                    </div>
                    <div class="overview-card">
                        <h3>保険カバレッジ率</h3>
                        <div class="overview-value">${data.insuranceCoverage}%</div>
                    </div>
                    <div class="overview-card">
                        <h3>リスク対策実施数</h3>
                        <div class="overview-value">${data.riskMitigationCount}件</div>
                    </div>
                    <div class="overview-card">
                        <h3>コンプライアンス適合率</h3>
                        <div class="overview-value">${data.complianceRate}%</div>
                    </div>
                </div>
            </div>

            <!-- リーグ・ギルド情報 -->
            <div class="section">
                <div class="section-title">🏆 リーグ・ギルド情報</div>
                <div class="league-status">
                    <div class="league-badge">${data.leagueBadge}</div>
                    <div class="league-info">
                        <h3>${data.leagueName}リーグ</h3>
                        <div class="league-stats">現在LP: ${data.currentLP} | 順位: ${data.currentRank}位 | 次リーグまで: ${data.lpToNext}LP</div>
                    </div>
                </div>
                <div class="guild-info">
                    <div class="guild-name">ギルド: ${data.guildName}</div>
                    <div>所属メンバー数: ${data.guildMemberCount}社 | ギルド順位: ${data.guildRank}位</div>
                    <div class="guild-stats">
                        <div class="guild-stat">
                            <div class="guild-stat-value">${data.guildTotalLP}</div>
                            <div class="guild-stat-label">合計LP</div>
                        </div>
                        <div class="guild-stat">
                            <div class="guild-stat-value">${data.guildAverageLP}</div>
                            <div class="guild-stat-label">平均LP</div>
                        </div>
                        <div class="guild-stat">
                            <div class="guild-stat-value">${data.guildGrowthRate}%</div>
                            <div class="guild-stat-label">成長率</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- リスク体制評価 -->
            <div class="section">
                <div class="section-title">📋 リスク体制評価</div>
                <div class="assessment-grid">
                    ${data.assessments.map(assessment => `
                        <div class="assessment-item">
                            <div class="assessment-category">${assessment.category}</div>
                            <div class="assessment-level">Lv.${assessment.level}</div>
                            <div class="assessment-stars">${assessment.stars}</div>
                            <div class="assessment-score">${assessment.score}点</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- 保険加入状況 -->
            <div class="section">
                <div class="section-title">🛡️ 保険加入状況</div>
                <div class="insurance-grid">
                    ${data.insurances.map(insurance => `
                        <div class="insurance-card ${insurance.status}">
                            <div class="insurance-status">${insurance.statusText}</div>
                            <div class="insurance-type">${insurance.type}</div>
                            <div class="insurance-detail">保険金額: ${insurance.amount}</div>
                            <div class="insurance-detail">カバー範囲: ${insurance.coverage}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- リスク推移チャート -->
            <div class="section">
                <div class="section-title">📈 過去1年間のリスク推移</div>
                <div class="trend-chart">
                    <div class="trend-summary">${data.riskTrendData}</div>
                    <div class="monthly-scores">
                        ${data.monthlyScores.map(score => `
                            <div class="score-item">
                                <div class="score-month">${score.month.slice(-2)}</div>
                                <div class="score-value">${score.score}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- リスク対策実行履歴 -->
            <div class="section">
                <div class="section-title">✅ リスク対策実行履歴</div>
                <div class="risk-history">
                    ${data.riskActions.map(action => `
                        <div class="history-item">
                            <div class="history-content">
                                <div class="history-action">${action.action}</div>
                                <div class="history-meta">${action.date} <span class="impact-badge impact-${action.impact === '高' ? 'high' : action.impact === '中' ? 'medium' : 'low'}">${action.impact}インパクト</span></div>
                            </div>
                            <div class="history-status ${action.statusClass}">${action.status}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- 取引先向け評価サマリー -->
            <div class="section">
                <div class="section-title">🤝 取引先向け評価サマリー</div>
                <div class="summary-section">
                    <div class="summary-title">信頼性評価</div>
                    <div class="summary-item">
                        <span class="summary-label">リスク管理体制:</span>
                        <span class="summary-value">${data.riskManagementLevel}</span> - 業界標準を${data.standardComparison}
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">保険適用範囲:</span>
                        <span class="summary-value">${data.insuranceScope}</span> - 主要リスクに対する十分な保証
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">継続的改善:</span>
                        <span class="summary-value">${data.improvementRecord}</span> - 過去1年で${data.improvementCount}件の改善施策を実施
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">業界内位置:</span>
                        <span class="summary-value">${data.industryPosition}</span> - ${data.leagueName}リーグ${data.currentRank}位の実績
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">財務健全性:</span>
                        <span class="summary-value">格付${data.financialStrength.rating}</span> - 流動比率${data.financialStrength.liquidityRatio}
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">認証・監査:</span>
                        <div class="certifications">
                            ${data.certifications.map(cert => `<span class="certification-badge">${cert}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
            <div>本レポートは Risk Lance プラットフォームにより自動生成されています</div>
            <div>発行者: Risk Lance システム | 連絡先: support@risklance.com</div>
            <div style="margin-top: 10px;">© 2024 Risk Lance. All rights reserved. | 機密文書 - 無断転載禁止</div>
        </div>
    </div>
</body>
</html>`;
    }

    // テンプレートにデータを埋め込み（旧関数 - 互換性のため残す）
    populateTemplate(template, data) {
        let html = template;

        // 単純な置換処理
        Object.keys(data).forEach(key => {
            const value = data[key];
            if (Array.isArray(value)) {
                // 配列データの処理（assessments, insurances, riskActions）
                if (key === 'assessments') {
                    const assessmentHtml = value.map(item =>
                        `<div class="assessment-item">
                            <div class="assessment-category">${item.category}</div>
                            <div class="assessment-level">Lv.${item.level}</div>
                            <div class="assessment-stars">${item.stars}</div>
                        </div>`
                    ).join('');
                    html = html.replace(/{{#assessments}}[\s\S]*?{{\/assessments}}/g, assessmentHtml);
                } else if (key === 'insurances') {
                    const insuranceHtml = value.map(item =>
                        `<div class="insurance-card ${item.status}">
                            <div class="insurance-type">${item.type}</div>
                            <div class="insurance-amount">保険金額: ${item.amount}</div>
                            <div class="insurance-amount">カバー範囲: ${item.coverage}</div>
                        </div>`
                    ).join('');
                    html = html.replace(/{{#insurances}}[\s\S]*?{{\/insurances}}/g, insuranceHtml);
                } else if (key === 'riskActions') {
                    const actionsHtml = value.map(item =>
                        `<div class="history-item">
                            <div>
                                <div class="history-action">${item.action}</div>
                                <div class="history-date">${item.date}</div>
                            </div>
                            <div class="history-status ${item.statusClass}">${item.status}</div>
                        </div>`
                    ).join('');
                    html = html.replace(/{{#riskActions}}[\s\S]*?{{\/riskActions}}/g, actionsHtml);
                }
            } else {
                // 単純な文字列置換
                const regex = new RegExp(`{{${key}}}`, 'g');
                html = html.replace(regex, value);
            }
        });

        return html;
    }

    // レポート表示
    displayReport(reportHtml) {
        // 新しいウィンドウでレポートを表示
        const reportWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes');
        reportWindow.document.write(reportHtml);
        reportWindow.document.close();

        // 完了通知
        const notification = {
            title: '総合リスクレポート生成完了',
            message: '総合リスクレポートが新しいウィンドウで表示されました。',
            type: 'success',
            timestamp: new Date().toLocaleTimeString('ja-JP', {
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        window.dataManager.addNotification(notification);
    }

    // 簡易レポート表示（フォールバック）
    displaySimpleReport(data) {
        const simpleReport = `
            <h2>${data.companyName} - 総合リスクレポート</h2>
            <p>レポート期間: ${data.reportPeriod}</p>
            <h3>概要</h3>
            <ul>
                <li>総合リスクスコア: ${data.totalRiskScore}</li>
                <li>保険カバレッジ率: ${data.insuranceCoverage}%</li>
                <li>リスク対策実施数: ${data.riskMitigationCount}件</li>
                <li>コンプライアンス適合率: ${data.complianceRate}%</li>
            </ul>
            <h3>リーグ情報</h3>
            <p>${data.leagueName}リーグ - ${data.currentLP}LP (${data.currentRank}位)</p>
        `;

        window.alertManager.showActionDialog(
            '総合リスクレポート',
            simpleReport
        );
    }

    // プレミアム機能（拡張用）
    unlockPremiumFeatures() {
        // 詳細分析レポート
        // リアルタイム通知
        // カスタムダッシュボード
        console.log('プレミアム機能が解除されました');
    }
}

// グローバルにRiskBrandingManagerインスタンスを作成
window.riskBrandingManager = new RiskBrandingManager();