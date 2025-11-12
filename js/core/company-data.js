// Risk Lance - 優良企業データベース
// RISK LANCE認定企業のデータ管理

class CompanyDatabase {
    constructor() {
        this.companies = this.generateCompanies();
        this.favorites = new Set(); // お気に入りリスト
        this.contacts = []; // コンタクト履歴
        this.newContacts = []; // 新着コンタクト

        // 自社情報（ログインユーザーの会社）
        this.myCompany = {
            id: 'my-company',
            name: '株式会社サンプル',
            league: 'gold',
            tier: 2,
            lp: 2450
        };
    }

    /**
     * 企業データを生成
     */
    generateCompanies() {
        const companies = [
            // Challenger League企業
            {
                id: 'comp-001',
                name: '東京リスクマネジメント株式会社',
                prefecture: '東京都',
                industry: '情報通信業',
                revenue: 15000000000, // 150億円
                employees: 350,
                listing: '上場（東証プライム）',
                league: 'challenger',
                tier: 1,
                lp: 3200,
                riskLanceMember: true,
                address: '東京都千代田区丸の内1-1-1',
                founded: '2005年4月',
                ceo: '山田太郎',
                website: 'https://example.com',
                description: 'リスクマネジメント分野のリーディングカンパニー。AI技術を活用したリスク予測システムを開発。',
                riskFeatures: ['サイバーセキュリティ体制完備', 'BCP対策優良企業', 'ISO27001認証取得']
            },
            {
                id: 'comp-002',
                name: '大阪セキュリティ工業株式会社',
                prefecture: '大阪府',
                industry: '製造業',
                revenue: 12000000000,
                employees: 280,
                listing: '上場（東証スタンダード）',
                league: 'challenger',
                tier: 1,
                lp: 3150,
                riskLanceMember: true,
                address: '大阪府大阪市北区梅田2-2-2',
                founded: '1998年6月',
                ceo: '佐藤花子',
                website: 'https://example.com',
                description: 'セキュリティ機器の製造・販売。防災システムの開発に強み。',
                riskFeatures: ['防災システム導入済', '全社員安全教育実施', '労災ゼロ達成3年連続']
            },

            // Master League企業
            {
                id: 'comp-003',
                name: '名古屋保険コンサルティング株式会社',
                prefecture: '愛知県',
                industry: '金融業・保険業',
                revenue: 8500000000,
                employees: 200,
                listing: '非上場',
                league: 'master',
                tier: 1,
                lp: 2950,
                riskLanceMember: true,
                address: '愛知県名古屋市中区栄3-3-3',
                founded: '2008年9月',
                ceo: '鈴木一郎',
                website: 'https://example.com',
                description: '企業向け保険コンサルティングの専門会社。リスク分析に定評。',
                riskFeatures: ['リスク分析専門チーム配置', '保険最適化実績200社以上', 'コンプライアンス体制完備']
            },
            {
                id: 'comp-004',
                name: '福岡テクノロジーズ株式会社',
                prefecture: '福岡県',
                industry: '情報通信業',
                revenue: 7200000000,
                employees: 180,
                listing: '上場（東証グロース）',
                league: 'master',
                tier: 2,
                lp: 2800,
                riskLanceMember: true,
                address: '福岡県福岡市博多区博多駅前4-4-4',
                founded: '2012年3月',
                ceo: '田中次郎',
                website: 'https://example.com',
                description: 'クラウドセキュリティサービスの開発・提供。九州エリアのリーダー企業。',
                riskFeatures: ['クラウドセキュリティ専門', 'データバックアップ体制完備', '24時間監視体制']
            },

            // Diamond League企業
            {
                id: 'comp-005',
                name: '横浜商事株式会社',
                prefecture: '神奈川県',
                industry: '卸売業・小売業',
                revenue: 6000000000,
                employees: 150,
                listing: '非上場',
                league: 'diamond',
                tier: 1,
                lp: 2700,
                riskLanceMember: true,
                address: '神奈川県横浜市西区みなとみらい5-5-5',
                founded: '2010年7月',
                ceo: '高橋美咲',
                website: 'https://example.com',
                description: '建築資材の専門商社。安全管理体制に優れた企業。',
                riskFeatures: ['在庫管理システム完備', '品質管理ISO9001認証', '物流安全対策優良']
            },
            {
                id: 'comp-006',
                name: '札幌建設株式会社',
                prefecture: '北海道',
                industry: '建設業',
                revenue: 5500000000,
                employees: 120,
                listing: '非上場',
                league: 'diamond',
                tier: 2,
                lp: 2550,
                riskLanceMember: true,
                address: '北海道札幌市中央区北1条西6-6-6',
                founded: '2006年11月',
                ceo: '伊藤健太',
                website: 'https://example.com',
                description: '総合建設会社。安全施工管理を重視した経営方針。',
                riskFeatures: ['労働安全衛生優良企業', '建設業労働災害防止協会会員', '安全パトロール毎日実施']
            },

            // Platinum League企業
            {
                id: 'comp-007',
                name: '仙台物流サービス株式会社',
                prefecture: '宮城県',
                industry: '運輸業・郵便業',
                revenue: 4200000000,
                employees: 95,
                listing: '非上場',
                league: 'platinum',
                tier: 1,
                lp: 2400,
                riskLanceMember: true,
                address: '宮城県仙台市青葉区中央7-7-7',
                founded: '2011年5月',
                ceo: '渡辺雄太',
                website: 'https://example.com',
                description: '東北エリアの物流ネットワーク構築。環境配慮型物流を推進。',
                riskFeatures: ['GPS追跡システム導入', '安全運転教育プログラム', '事故ゼロ記録更新中']
            },
            {
                id: 'comp-008',
                name: '広島製薬株式会社',
                prefecture: '広島県',
                industry: '製造業',
                revenue: 3800000000,
                employees: 85,
                listing: '非上場',
                league: 'platinum',
                tier: 2,
                lp: 2250,
                riskLanceMember: true,
                address: '広島県広島市中区紙屋町8-8-8',
                founded: '2009年2月',
                ceo: '中村愛',
                website: 'https://example.com',
                description: '医薬品・健康食品の製造販売。品質管理体制が充実。',
                riskFeatures: ['GMP認証取得', '品質保証体制完備', '衛生管理徹底']
            },

            // Gold League企業（自社と同レベル）
            {
                id: 'comp-009',
                name: '京都ソリューションズ株式会社',
                prefecture: '京都府',
                industry: '情報通信業',
                revenue: 3200000000,
                employees: 70,
                listing: '非上場',
                league: 'gold',
                tier: 1,
                lp: 2350,
                riskLanceMember: true,
                address: '京都府京都市下京区四条通9-9-9',
                founded: '2013年8月',
                ceo: '小林健二',
                website: 'https://example.com',
                description: 'ITソリューション提供企業。中小企業向けシステム開発が得意。',
                riskFeatures: ['情報セキュリティマネジメント体制', 'プライバシーマーク取得', 'データ保護対策完備']
            },
            {
                id: 'comp-010',
                name: '株式会社サンプル',
                prefecture: '東京都',
                industry: '情報通信業',
                revenue: 2800000000,
                employees: 60,
                listing: '非上場',
                league: 'gold',
                tier: 2,
                lp: 2450,
                riskLanceMember: true,
                address: '東京都渋谷区渋谷10-10-10',
                founded: '2014年4月',
                ceo: 'カン　ミンソク',
                website: 'https://example.com',
                description: '自社企業。リスクマネジメントプラットフォーム運営。',
                riskFeatures: ['リスク分析AI導入', '保険最適化システム', 'BCP策定支援']
            },

            // Silver League企業
            {
                id: 'comp-011',
                name: '神戸商事株式会社',
                prefecture: '兵庫県',
                industry: '卸売業・小売業',
                revenue: 2200000000,
                employees: 50,
                listing: '非上場',
                league: 'silver',
                tier: 1,
                lp: 1950,
                riskLanceMember: true,
                address: '兵庫県神戸市中央区三宮町11-11-11',
                founded: '2015年10月',
                ceo: '岡田真',
                website: 'https://example.com',
                description: '食品卸売業。品質管理と配送管理を徹底。',
                riskFeatures: ['食品衛生管理体制', 'HACCP認証', '温度管理システム導入']
            },
            {
                id: 'comp-012',
                name: '千葉エンジニアリング株式会社',
                prefecture: '千葉県',
                industry: '製造業',
                revenue: 1800000000,
                employees: 40,
                listing: '非上場',
                league: 'silver',
                tier: 2,
                lp: 1750,
                riskLanceMember: true,
                address: '千葉県千葉市中央区新町12-12-12',
                founded: '2016年6月',
                ceo: '松本優子',
                website: 'https://example.com',
                description: '精密機械部品の製造。品質第一の企業方針。',
                riskFeatures: ['ISO9001認証取得済', '不良品率0.1%以下', '納期遵守率99%']
            },

            // Bronze League企業
            {
                id: 'comp-013',
                name: '埼玉サービス株式会社',
                prefecture: '埼玉県',
                industry: 'サービス業',
                revenue: 1200000000,
                employees: 30,
                listing: '非上場',
                league: 'bronze',
                tier: 1,
                lp: 1350,
                riskLanceMember: true,
                address: '埼玉県さいたま市大宮区桜木町13-13-13',
                founded: '2017年12月',
                ceo: '木村拓也',
                website: 'https://example.com',
                description: '総合清掃サービス。安全作業を重視。',
                riskFeatures: ['安全作業マニュアル整備', '定期安全研修実施', '労災保険完備']
            },

            // RISK LANCE非加入企業
            {
                id: 'comp-014',
                name: '東京テクノ株式会社',
                prefecture: '東京都',
                industry: '情報通信業',
                revenue: 10000000000,
                employees: 250,
                listing: '上場（東証プライム）',
                league: null,
                tier: null,
                lp: null,
                riskLanceMember: false,
                address: '東京都港区六本木14-14-14',
                founded: '2000年1月',
                ceo: '前田浩',
                website: 'https://example.com',
                description: 'ソフトウェア開発大手企業。',
                riskFeatures: null
            },
            {
                id: 'comp-015',
                name: '大阪流通株式会社',
                prefecture: '大阪府',
                industry: '卸売業・小売業',
                revenue: 8000000000,
                employees: 180,
                listing: '非上場',
                league: null,
                tier: null,
                lp: null,
                riskLanceMember: false,
                address: '大阪府大阪市中央区本町15-15-15',
                founded: '1995年8月',
                ceo: '井上誠',
                website: 'https://example.com',
                description: '総合商社。全国展開中。',
                riskFeatures: null
            },
            {
                id: 'comp-016',
                name: '横浜工業株式会社',
                prefecture: '神奈川県',
                industry: '製造業',
                revenue: 6500000000,
                employees: 140,
                listing: '非上場',
                league: null,
                tier: null,
                lp: null,
                riskLanceMember: false,
                address: '神奈川県横浜市鶴見区鶴見16-16-16',
                founded: '2003年3月',
                ceo: '加藤修',
                website: 'https://example.com',
                description: '自動車部品製造。海外展開も積極的。',
                riskFeatures: null
            }
        ];

        return companies;
    }

    /**
     * 企業を検索
     * @param {Object} filters - 検索フィルター
     * @returns {Array} 検索結果
     */
    searchCompanies(filters = {}) {
        let results = [...this.companies];

        // キーワード検索
        if (filters.keyword) {
            const keyword = filters.keyword.toLowerCase();
            results = results.filter(company =>
                company.name.toLowerCase().includes(keyword) ||
                company.industry.toLowerCase().includes(keyword) ||
                company.description.toLowerCase().includes(keyword)
            );
        }

        // 都道府県フィルター
        if (filters.prefecture && filters.prefecture.length > 0) {
            results = results.filter(company => filters.prefecture.includes(company.prefecture));
        }

        // 業種フィルター
        if (filters.industry && filters.industry.length > 0) {
            results = results.filter(company => filters.industry.includes(company.industry));
        }

        // 売上高フィルター
        if (filters.revenueMin !== undefined) {
            results = results.filter(company => company.revenue >= filters.revenueMin);
        }
        if (filters.revenueMax !== undefined) {
            results = results.filter(company => company.revenue <= filters.revenueMax);
        }

        // 従業員数フィルター
        if (filters.employeesMin !== undefined) {
            results = results.filter(company => company.employees >= filters.employeesMin);
        }
        if (filters.employeesMax !== undefined) {
            results = results.filter(company => company.employees <= filters.employeesMax);
        }

        // 上場区分フィルター
        if (filters.listing && filters.listing.length > 0) {
            results = results.filter(company => filters.listing.includes(company.listing));
        }

        // RISK LANCE加入フィルター
        if (filters.riskLanceMemberOnly) {
            results = results.filter(company => company.riskLanceMember);
        }

        // リーグフィルター
        if (filters.league && filters.league.length > 0) {
            results = results.filter(company => company.league && filters.league.includes(company.league));
        }

        // Tierフィルター
        if (filters.tier && filters.tier.length > 0) {
            results = results.filter(company => company.tier && filters.tier.includes(company.tier));
        }

        return results;
    }

    /**
     * 企業詳細を取得
     * @param {string} companyId - 企業ID
     * @returns {Object} 企業詳細
     */
    getCompanyDetail(companyId) {
        return this.companies.find(c => c.id === companyId);
    }

    /**
     * お気に入りに追加
     * @param {string} companyId - 企業ID
     */
    addToFavorites(companyId) {
        this.favorites.add(companyId);
    }

    /**
     * お気に入りから削除
     * @param {string} companyId - 企業ID
     */
    removeFromFavorites(companyId) {
        this.favorites.delete(companyId);
    }

    /**
     * お気に入りリストを取得
     * @returns {Array} お気に入り企業リスト
     */
    getFavorites() {
        return this.companies.filter(c => this.favorites.has(c.id));
    }

    /**
     * お気に入りかどうかをチェック
     * @param {string} companyId - 企業ID
     * @returns {boolean}
     */
    isFavorite(companyId) {
        return this.favorites.has(companyId);
    }

    /**
     * コンタクト可能かチェック
     * @param {string} companyId - 企業ID
     * @returns {Object} {canContact: boolean, reason: string}
     */
    canContact(companyId) {
        const company = this.getCompanyDetail(companyId);

        if (!company) {
            return { canContact: false, reason: '企業が見つかりません' };
        }

        if (!company.riskLanceMember) {
            return { canContact: false, reason: 'RISK LANCE非加入企業のため、コンタクトできません' };
        }

        if (companyId === this.myCompany.id) {
            return { canContact: false, reason: '自社にはコンタクトできません' };
        }

        // 自社よりステータスが高い企業にはコンタクト不可
        const leagueOrder = ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'master', 'challenger'];
        const myLeagueIndex = leagueOrder.indexOf(this.myCompany.league);
        const targetLeagueIndex = leagueOrder.indexOf(company.league);

        if (targetLeagueIndex > myLeagueIndex) {
            return { canContact: false, reason: '自社よりもステータスが高い企業のため、コンタクトできません' };
        }

        if (targetLeagueIndex === myLeagueIndex && company.tier < this.myCompany.tier) {
            return { canContact: false, reason: '自社よりもステータスが高い企業のため、コンタクトできません' };
        }

        return { canContact: true, reason: '' };
    }

    /**
     * コンタクトを送信
     * @param {string} companyId - 企業ID
     * @param {string} message - メッセージ
     */
    sendContact(companyId, message) {
        const canContactResult = this.canContact(companyId);
        if (!canContactResult.canContact) {
            return { success: false, message: canContactResult.reason };
        }

        const contact = {
            id: `contact-${Date.now()}`,
            companyId: companyId,
            company: this.getCompanyDetail(companyId),
            message: message,
            sentAt: new Date().toISOString(),
            status: 'sent',
            from: this.myCompany.name
        };

        this.contacts.push(contact);

        return { success: true, message: 'コンタクトを送信しました' };
    }

    /**
     * コンタクト履歴を取得
     * @returns {Array} コンタクト履歴
     */
    getContactHistory() {
        return this.contacts;
    }

    /**
     * 新着コンタクトを取得
     * @returns {Array} 新着コンタクト
     */
    getNewContacts() {
        return this.newContacts;
    }
}

// グローバルインスタンス作成
window.companyDatabase = new CompanyDatabase();

console.log('✅ CompanyDatabase が読み込まれました');
