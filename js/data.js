// Risk Lance - ダミーデータ管理

class DataManager {
    constructor() {
        this.data = {};
        this.init();
    }

    // データマネージャー初期化
    init() {
        console.log('DataManager initialized');
        this.loadDummyData();
        this.loadLeagueData();
        this.loadGuildData();
        this.loadBusinessData();
    }

    // ダミーデータ読み込み
    loadDummyData() {
        // 保険契約データ
        this.data.insuranceData = [
            {
                id: 1,
                type: '火災保険',
                product: '企業総合保険',
                company: '○○損保',
                startDate: '2023-03-15',
                endDate: '2024-03-15',
                coverage: '建物・設備 5億円',
                status: 'warning'
            },
            {
                id: 2,
                type: '賠償責任保険',
                product: 'PL保険',
                company: '△△海上',
                startDate: '2023-04-01',
                endDate: '2024-03-31',
                coverage: '対人・対物 1億円',
                status: 'ok'
            },
            {
                id: 3,
                type: '労災保険',
                product: '労災上乗せ保険',
                company: '□□生命',
                startDate: '2023-04-01',
                endDate: '2024-03-31',
                coverage: '死亡・後遺障害 5000万円',
                status: 'ok'
            }
        ];

        // リスクデータ
        this.data.riskData = {
            totalScore: 75,
            categories: {
                fire: { level: 20, label: '低' },
                liability: { level: 60, label: '中' },
                management: { level: 40, label: '中' }
            },
            coverage: 78
        };

        // 業務データ
        this.data.businessData = {
            sales: {
                current: 15240000,
                change: 12.3
            },
            inventory: {
                items: 1245,
                change: -5.2
            },
            customers: {
                active: 342,
                change: 8.7
            },
            insurance: {
                contracts: 12,
                status: 'ok'
            }
        };

        // 初期通知
        this.data.notifications = [
            {
                id: 1,
                type: 'warning',
                message: '火災保険の更新期限が近づいています（2024年3月15日）',
                icon: 'fas fa-exclamation-triangle',
                timestamp: new Date()
            },
            {
                id: 2,
                type: 'info',
                message: '新しいリスク評価レポートが利用可能です',
                icon: 'fas fa-info-circle',
                timestamp: new Date()
            },
            {
                id: 3,
                type: 'success',
                message: 'Risk Lance認定企業ランキングでAランクを達成しました',
                icon: 'fas fa-trophy',
                timestamp: new Date()
            }
        ];

        // 緊急アラートデータ
        this.data.emergencyAlerts = [
            {
                id: 1,
                level: 'critical',
                title: '緊急: 洪水リスク警告',
                description: '倉庫所在地（埼玉県越谷市）で48時間以内に洪水発生の可能性（65%）',
                coverage: 'uncovered',
                coverageText: '保険カバー: なし',
                action: '対策を確認',
                icon: 'fas fa-exclamation-triangle'
            },
            {
                id: 2,
                level: 'high',
                title: '取引先信用リスク',
                description: '主要取引先の関連会社（ABC商事関連2社）が債務超過状態',
                coverage: 'partial',
                coverageText: '保険カバー: 部分的',
                action: '詳細確認',
                icon: 'fas fa-building'
            }
        ];

        // 社内リスクデータ
        this.data.internalRiskData = {
            inventory: {
                trends: [
                    { month: '4月', value: 12, height: '60%' },
                    { month: '5月', value: 15, height: '75%' },
                    { month: '6月', value: 17, height: '85%' },
                    { month: '7月', value: 18, height: '90%' },
                    { month: '8月', value: 19, height: '95%' },
                    { month: '9月', value: 20, height: '100%', warning: true }
                ],
                riskLevel: 'medium',
                coverage: { status: 'covered', text: '火災保険: 80%カバー' }
            },
            employees: {
                safe: 40,
                caution: 35,
                highRisk: 25,
                total: 245,
                riskLevel: 'high',
                coverage: { status: 'covered', text: '労災保険: 100%カバー' }
            },
            cybersecurity: {
                vulnerabilityTrend: 'increasing',
                riskLevel: 'high',
                coverage: { status: 'uncovered', text: 'サイバー保険: 未加入' }
            }
        };

        // 社外リスクデータ
        this.data.externalRiskData = {
            disasters: [
                {
                    location: '埼玉倉庫',
                    type: '洪水リスク',
                    probability: 65,
                    level: 'high-risk',
                    icon: 'fas fa-water'
                },
                {
                    location: '東京本社',
                    type: '地震リスク',
                    probability: 35,
                    level: 'medium-risk',
                    icon: 'fas fa-home'
                },
                {
                    location: '大阪支店',
                    type: '総合リスク',
                    probability: 15,
                    level: 'low-risk',
                    icon: 'fas fa-building'
                }
            ],
            creditRisk: [
                {
                    company: 'ABC商事',
                    score: 85,
                    level: 'high'
                },
                {
                    company: 'XYZ工業',
                    score: 45,
                    level: 'medium'
                },
                {
                    company: 'DEF物流',
                    score: 20,
                    level: 'low'
                }
            ],
            marketRisk: {
                gauge: 45, // 度数（0-180）
                factors: [
                    { name: '原材料価格', trend: 'up', value: '+15%' },
                    { name: '為替変動', trend: 'down', value: '-8%' },
                    { name: '競合他社', trend: 'up', value: '+3社' }
                ],
                riskLevel: 'medium',
                coverage: { status: 'uncovered', text: '市場リスク: 保険適用外' }
            }
        };

        // 総合リスクサマリー
        this.data.riskSummary = {
            critical: 2,
            high: 5,
            medium: 8,
            coverageRate: 68
        };
    }

    // データ取得メソッド
    getInsuranceData() {
        return this.data.insuranceData;
    }

    getRiskData() {
        return this.data.riskData;
    }

    getBusinessData() {
        return this.data.businessData;
    }

    getNotifications() {
        return this.data.notifications;
    }

    getEmergencyAlerts() {
        return this.data.emergencyAlerts;
    }

    getInternalRiskData() {
        return this.data.internalRiskData;
    }

    getExternalRiskData() {
        return this.data.externalRiskData;
    }

    getRiskSummary() {
        return this.data.riskSummary;
    }

    // リーグデータ読み込み
    loadLeagueData() {
        this.data.leagueData = {
            currentUser: {
                company: '株式会社サンプル',
                league: 'gold',
                tier: 2,
                lp: 2450,
                rank: 7,
                riskAssessments: {
                    fire: { level: 4, score: 85 },
                    cyber: { level: 3, score: 68 },
                    compliance: { level: 5, score: 95 },
                    bcp: { level: 3, score: 72 },
                    financial: { level: 4, score: 88 }
                }
            },
            rankings: [
                { rank: 1, company: 'テックイノベーション㈱', league: 'challenger', lp: 3850 },
                { rank: 2, company: 'グローバル商事㈱', league: 'master', lp: 3720 },
                { rank: 3, company: '安全第一工業㈱', league: 'diamond', lp: 3580 },
                { rank: 4, company: 'セキュリティエキスパート㈱', league: 'diamond', lp: 3200 },
                { rank: 5, company: 'リスクマスター㈱', league: 'platinum', lp: 2980 },
                { rank: 6, company: 'プロテクト工業㈱', league: 'platinum', lp: 2750 },
                { rank: 7, company: 'あなたの会社', league: 'gold', lp: 2450, current: true },
                { rank: 8, company: '製造エキスパート㈱', league: 'gold', lp: 2380 },
                { rank: 9, company: 'セーフティ商事㈱', league: 'gold', lp: 2250 },
                { rank: 10, company: 'バランス企業㈱', league: 'gold', lp: 2100 }
            ],
            recentParticipants: [
                { company: 'スタートアップ企業A', joinDate: '2024-09-20', league: 'bronze', status: 'new' },
                { company: '地域密着企業B', joinDate: '2024-09-18', league: 'silver', status: 'promoted' },
                { company: '老舗商事C', joinDate: '2024-09-15', league: 'gold', status: 'stable' },
                { company: '先進技術工業D', joinDate: '2024-09-12', league: 'platinum', status: 'rising' },
                { company: '新興ベンチャーE', joinDate: '2024-09-10', league: 'bronze', status: 'new' }
            ]
        };
    }

    // ギルドデータ読み込み
    loadGuildData() {
        this.data.guildData = {
            currentGuild: {
                name: '東京世田谷区卸売業ギルド',
                league: 'platinum',
                totalLP: 38450,
                averageLP: 2563,
                memberCount: 15,
                rank: 5
            },
            members: [
                { name: 'あなたの会社', level: 19, league: 'gold', lp: 2450, role: 'leader' },
                { name: '協力会社A', level: 22, league: 'platinum', lp: 3200 },
                { name: 'パートナー企業B', level: 18, league: 'gold', lp: 2100 },
                { name: '関連会社C', level: 15, league: 'silver', lp: 1850 },
                { name: '業界新人D', level: 8, league: 'bronze', lp: 980 }
            ],
            guildRankings: [
                { rank: 1, name: 'エリート企業連合', league: 'master', totalLP: 52800, memberCount: 12 },
                { rank: 2, name: '先進技術コンソーシアム', league: 'diamond', totalLP: 47200, memberCount: 18 },
                { rank: 3, name: 'セキュリティアライアンス', league: 'diamond', totalLP: 43600, memberCount: 14 },
                { rank: 4, name: 'リスクマネジメント連盟', league: 'platinum', totalLP: 40800, memberCount: 22 },
                { rank: 5, name: '東京世田谷区卸売業ギルド', league: 'platinum', totalLP: 38450, memberCount: 15, current: true },
                { rank: 6, name: '関西安全協会', league: 'platinum', totalLP: 36900, memberCount: 20 }
            ]
        };
    }

    // 業務アプリデータ読み込み
    loadBusinessData() {
        // 販売管理のダミーデータ
        this.data.salesData = {
            todaySales: 2450000,
            monthlySales: 15240000,
            pendingOrders: 12,
            recentOrders: [
                {
                    id: 'SO-2024-001234',
                    customer: 'ABC商事',
                    amount: 1200000,
                    status: 'pending',
                    date: '2024-09-21'
                },
                {
                    id: 'SO-2024-001233',
                    customer: 'XYZ工業',
                    amount: 800000,
                    status: 'completed',
                    date: '2024-09-21'
                },
                {
                    id: 'SO-2024-001232',
                    customer: 'DEF商店',
                    amount: 650000,
                    status: 'pending',
                    date: '2024-09-20'
                }
            ],
            recentActivities: [
                {
                    time: '14:30',
                    description: '新規受注登録: ABC商事様 ¥1,200,000',
                    user: '田中太郎'
                },
                {
                    time: '13:45',
                    description: '出荷完了登録: XYZ工業様 ¥800,000',
                    user: '鈴木花子'
                },
                {
                    time: '12:20',
                    description: '請求書発行: 5件 (総額 ¥3,450,000)',
                    user: '佐藤次郎'
                },
                {
                    time: '11:15',
                    description: '見積書作成: DEF商店様 ¥650,000',
                    user: '田中太郎'
                }
            ]
        };

        // 在庫管理のダミーデータ
        this.data.inventoryData = {
            totalItems: 1245,
            totalValue: 18500000,
            alertItems: 8,
            recentMovements: [
                {
                    time: '15:20',
                    description: '入庫: 部品A 100個 (倉庫A)',
                    user: '山田倉庫',
                    type: 'in'
                },
                {
                    time: '14:10',
                    description: '出庫: 製品B 50個 (出荷先: ABC商事)',
                    user: '鈴木花子',
                    type: 'out'
                },
                {
                    time: '13:30',
                    description: '在庫調整: 部品C -5個 (破損処理)',
                    user: '佐藤次郎',
                    type: 'adjustment'
                },
                {
                    time: '12:45',
                    description: '在庫不足アラート: 部品C (残り10個)',
                    user: 'システム',
                    type: 'alert',
                    urgent: true
                }
            ],
            // 過去6ヶ月の在庫金額推移（百万円単位）
            monthlyValueHistory: [
                { month: '2024-04', value: 65000000 },  // 6,500万円
                { month: '2024-05', value: 70000000 },  // 7,000万円
                { month: '2024-06', value: 74000000 },  // 7,400万円
                { month: '2024-07', value: 80000000 },  // 8,000万円
                { month: '2024-08', value: 81000000 },  // 8,100万円
                { month: '2024-09', value: 82000000 }   // 8,200万円（現在）
            ]
        };

        // 顧客管理のダミーデータ
        this.data.customerData = {
            activeCustomers: 342,
            activeOpportunities: 28,
            newThisMonth: 15,
            recentActivities: [
                {
                    time: '16:00',
                    description: '新規顧客登録: 株式会社NewTech',
                    user: '田中太郎'
                },
                {
                    time: '15:30',
                    description: '商談進展: XYZ工業 → 提案段階',
                    user: '鈴木花子'
                },
                {
                    time: '14:45',
                    description: 'フォローアップ完了: ABC商事 (満足度: 高)',
                    user: '佐藤次郎'
                },
                {
                    time: '13:20',
                    description: '顧客情報更新: DEF商店 (担当者変更)',
                    user: '山田倉庫'
                }
            ]
        };
    }

    // リーグデータ取得
    getLeagueData() {
        return this.data.leagueData;
    }

    // ギルドデータ取得
    getGuildData() {
        return this.data.guildData;
    }

    // 販売データ取得
    getSalesData() {
        return this.data.salesData;
    }

    // 在庫データ取得
    getInventoryData() {
        return this.data.inventoryData;
    }

    // 顧客データ取得
    getCustomerData() {
        return this.data.customerData;
    }

    // データ更新メソッド
    addNotification(notification) {
        notification.id = Date.now();
        notification.timestamp = new Date();
        this.data.notifications.push(notification);
        return notification;
    }

    updateBusinessData(newData) {
        this.data.businessData = { ...this.data.businessData, ...newData };
    }

    updateRiskData(newData) {
        this.data.riskData = { ...this.data.riskData, ...newData };
    }
}

// グローバルにDataManagerインスタンスを作成
window.dataManager = new DataManager();