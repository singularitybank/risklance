// Risk Lance - 代理店向けサンプルデータ管理

class AgencyDataManager {
    constructor() {
        this.customers = this.generateCustomerData();
        this.policies = this.generatePolicyData();
        this.notifications = this.generateNotificationData();
        this.summaryStats = this.generateSummaryStats();
    }

    // 顧客データ生成
    generateCustomerData() {
        return [
            {
                id: 'C001',
                name: '株式会社ABC商事',
                industry: 'manufacturing',
                insuranceTypes: ['fire', 'liability', 'auto'],
                riskLevel: 'medium',
                lastUpdate: '2024-09-15',
                status: 'review-pending',
                contactPerson: '田中太郎',
                phone: '03-1234-5678',
                policies: ['P001', 'P002', 'P003']
            },
            {
                id: 'C002',
                name: 'XYZ工業株式会社',
                industry: 'manufacturing',
                insuranceTypes: ['fire', 'workers-comp'],
                riskLevel: 'high',
                lastUpdate: '2024-09-10',
                status: 'expired-policies',
                contactPerson: '佐藤花子',
                phone: '03-2345-6789',
                policies: ['P004', 'P005']
            },
            {
                id: 'C003',
                name: 'テック企業DEF',
                industry: 'service',
                insuranceTypes: ['liability', 'cyber'],
                riskLevel: 'low',
                lastUpdate: '2024-09-18',
                status: 'active',
                contactPerson: '山田次郎',
                phone: '03-3456-7890',
                policies: ['P006']
            },
            {
                id: 'C004',
                name: '小売チェーンGHI',
                industry: 'retail',
                insuranceTypes: ['fire', 'liability', 'auto'],
                riskLevel: 'medium',
                lastUpdate: '2024-09-12',
                status: 'active',
                contactPerson: '鈴木一郎',
                phone: '03-4567-8901',
                policies: ['P007', 'P008']
            },
            {
                id: 'C005',
                name: '建設株式会社JKL',
                industry: 'construction',
                insuranceTypes: ['workers-comp', 'liability'],
                riskLevel: 'high',
                lastUpdate: '2024-09-14',
                status: 'review-pending',
                contactPerson: '高橋美智子',
                phone: '03-5678-9012',
                policies: ['P009']
            }
        ];
    }

    // 保険証券データ生成
    generatePolicyData() {
        return [
            {
                id: 'P001',
                policyNumber: 'FI-2024-001',
                customerId: 'C001',
                customerName: '株式会社ABC商事',
                type: 'fire',
                insurer: 'tokio-marine',
                startDate: '2024-04-01',
                endDate: '2025-03-31',
                coverage: '500,000,000',
                premium: '1,250,000',
                status: 'active'
            },
            {
                id: 'P002',
                policyNumber: 'LI-2024-002',
                customerId: 'C001',
                customerName: '株式会社ABC商事',
                type: 'liability',
                insurer: 'sompo',
                startDate: '2024-04-01',
                endDate: '2025-03-31',
                coverage: '100,000,000',
                premium: '800,000',
                status: 'active'
            },
            {
                id: 'P003',
                policyNumber: 'AU-2024-003',
                customerId: 'C001',
                customerName: '株式会社ABC商事',
                type: 'auto',
                insurer: 'ms-ad',
                startDate: '2024-04-01',
                endDate: '2025-03-31',
                coverage: '20,000,000',
                premium: '350,000',
                status: 'active'
            },
            {
                id: 'P004',
                policyNumber: 'FI-2023-004',
                customerId: 'C002',
                customerName: 'XYZ工業株式会社',
                type: 'fire',
                insurer: 'tokio-marine',
                startDate: '2023-10-01',
                endDate: '2024-09-30',
                coverage: '800,000,000',
                premium: '2,100,000',
                status: 'expiring-soon'
            },
            {
                id: 'P005',
                policyNumber: 'WC-2024-005',
                customerId: 'C002',
                customerName: 'XYZ工業株式会社',
                type: 'workers-comp',
                insurer: 'aioi',
                startDate: '2024-04-01',
                endDate: '2025-03-31',
                coverage: '50,000,000',
                premium: '650,000',
                status: 'active'
            },
            {
                id: 'P006',
                policyNumber: 'CY-2024-006',
                customerId: 'C003',
                customerName: 'テック企業DEF',
                type: 'cyber',
                insurer: 'ms-ad',
                startDate: '2024-07-01',
                endDate: '2025-06-30',
                coverage: '200,000,000',
                premium: '1,500,000',
                status: 'active'
            },
            {
                id: 'P007',
                policyNumber: 'FI-2024-007',
                customerId: 'C004',
                customerName: '小売チェーンGHI',
                type: 'fire',
                insurer: 'sompo',
                startDate: '2024-01-01',
                endDate: '2024-12-31',
                coverage: '300,000,000',
                premium: '900,000',
                status: 'active'
            },
            {
                id: 'P008',
                policyNumber: 'LI-2024-008',
                customerId: 'C004',
                customerName: '小売チェーンGHI',
                type: 'liability',
                insurer: 'tokio-marine',
                startDate: '2024-01-01',
                endDate: '2024-12-31',
                coverage: '150,000,000',
                premium: '750,000',
                status: 'active'
            },
            {
                id: 'P009',
                policyNumber: 'WC-2024-009',
                customerId: 'C005',
                customerName: '建設株式会社JKL',
                type: 'workers-comp',
                insurer: 'aioi',
                startDate: '2024-04-01',
                endDate: '2025-03-31',
                coverage: '80,000,000',
                premium: '1,200,000',
                status: 'active'
            }
        ];
    }

    // 通知データ生成
    generateNotificationData() {
        return [
            {
                id: 'N001',
                type: 'urgent',
                category: 'review',
                title: '保険見直し依頼',
                message: '株式会社ABC商事から保険見直しの依頼がありました。',
                timestamp: '2024-09-21 10:30',
                customerName: '株式会社ABC商事',
                isRead: false
            },
            {
                id: 'N002',
                type: 'warning',
                category: 'expiry',
                title: '満期間近通知',
                message: 'XYZ工業の火災保険が来月満期になります。',
                timestamp: '2024-09-20 14:15',
                customerName: 'XYZ工業株式会社',
                isRead: false
            },
            {
                id: 'N003',
                type: 'info',
                category: 'review',
                title: '新規顧客登録',
                message: 'テック企業DEFを新規顧客として登録しました。',
                timestamp: '2024-09-18 16:45',
                customerName: 'テック企業DEF',
                isRead: true
            },
            {
                id: 'N004',
                type: 'warning',
                category: 'risk',
                title: 'リスク状況変化',
                message: '建設株式会社JKLのリスクレベルが変更されました。',
                timestamp: '2024-09-17 11:20',
                customerName: '建設株式会社JKL',
                isRead: true
            },
            {
                id: 'N005',
                type: 'urgent',
                category: 'expiry',
                title: '更新手続き要請',
                message: '小売チェーンGHIの保険更新手続きが必要です。',
                timestamp: '2024-09-16 09:30',
                customerName: '小売チェーンGHI',
                isRead: false
            }
        ];
    }

    // サマリー統計データ生成
    generateSummaryStats() {
        return {
            totalCustomers: 247,
            totalPolicies: 589,
            urgentCases: 8,
            monthlyCommission: 2340000,
            customerGrowth: 12,
            policyGrowth: 23
        };
    }

    // 最近のアクティビティ生成
    getRecentActivities() {
        return [
            {
                type: 'urgent',
                icon: 'fas fa-exclamation-circle',
                text: '株式会社ABC商事から保険見直しの依頼',
                time: '2時間前',
                action: '対応'
            },
            {
                type: 'warning',
                icon: 'fas fa-calendar-alt',
                text: 'XYZ工業の火災保険が来月満期',
                time: '1日前',
                action: '確認'
            },
            {
                type: 'info',
                icon: 'fas fa-handshake',
                text: '新規顧客：テック企業DEFを登録',
                time: '3日前',
                action: null
            }
        ];
    }

    // 顧客データ取得（フィルタリング対応）
    getFilteredCustomers(filters = {}) {
        let filteredCustomers = [...this.customers];

        if (filters.status && filters.status !== 'all') {
            filteredCustomers = filteredCustomers.filter(customer => customer.status === filters.status);
        }

        if (filters.industry && filters.industry !== 'all') {
            filteredCustomers = filteredCustomers.filter(customer => customer.industry === filters.industry);
        }

        if (filters.insuranceType && filters.insuranceType !== 'all') {
            filteredCustomers = filteredCustomers.filter(customer =>
                customer.insuranceTypes.includes(filters.insuranceType)
            );
        }

        return filteredCustomers;
    }

    // 保険証券データ取得（フィルタリング対応）
    getFilteredPolicies(filters = {}) {
        let filteredPolicies = [...this.policies];

        if (filters.type && filters.type !== 'all') {
            filteredPolicies = filteredPolicies.filter(policy => policy.type === filters.type);
        }

        if (filters.insurer && filters.insurer !== 'all') {
            filteredPolicies = filteredPolicies.filter(policy => policy.insurer === filters.insurer);
        }

        if (filters.status && filters.status !== 'all') {
            filteredPolicies = filteredPolicies.filter(policy => policy.status === filters.status);
        }

        if (filters.expiryDate) {
            filteredPolicies = filteredPolicies.filter(policy => policy.endDate === filters.expiryDate);
        }

        return filteredPolicies;
    }

    // 通知データ取得（フィルタリング対応）
    getFilteredNotifications(category = 'all') {
        if (category === 'all') {
            return this.notifications;
        }
        return this.notifications.filter(notification => notification.category === category);
    }

    // 顧客詳細取得
    getCustomerById(customerId) {
        const customer = this.customers.find(c => c.id === customerId);
        if (!customer) return null;

        const customerPolicies = this.policies.filter(p => p.customerId === customerId);

        return {
            ...customer,
            policies: customerPolicies,
            totalPremium: customerPolicies.reduce((sum, policy) => sum + parseInt(policy.premium.replace(/,/g, '')), 0),
            activePolicies: customerPolicies.filter(p => p.status === 'active').length
        };
    }

    // 保険証券詳細取得
    getPolicyById(policyId) {
        const policy = this.policies.find(p => p.id === policyId);
        if (!policy) return null;

        const customer = this.customers.find(c => c.id === policy.customerId);

        return {
            ...policy,
            customer: customer
        };
    }

    // 統計データ取得
    getSummaryStats() {
        return this.summaryStats;
    }

    // 業種名の日本語変換
    getIndustryName(industry) {
        const industryNames = {
            'manufacturing': '製造業',
            'retail': '小売業',
            'service': 'サービス業',
            'construction': '建設業'
        };
        return industryNames[industry] || industry;
    }

    // 保険種目名の日本語変換
    getInsuranceTypeName(type) {
        const typeNames = {
            'fire': '火災保険',
            'liability': '賠償責任保険',
            'auto': '自動車保険',
            'workers-comp': '労災保険',
            'cyber': 'サイバー保険'
        };
        return typeNames[type] || type;
    }

    // 保険会社名の日本語変換
    getInsurerName(insurer) {
        const insurerNames = {
            'tokio-marine': '東京海上',
            'sompo': '損保ジャパン',
            'ms-ad': '三井住友海上',
            'aioi': 'あいおいニッセイ'
        };
        return insurerNames[insurer] || insurer;
    }

    // ステータス名の日本語変換
    getStatusName(status) {
        const statusNames = {
            'active': 'アクティブ',
            'review-pending': '見直し要求あり',
            'expired-policies': '満期間近',
            'expiring-soon': '満期間近',
            'expired': '満期',
            'cancelled': '解約'
        };
        return statusNames[status] || status;
    }

    // リスクレベル名の日本語変換
    getRiskLevelName(level) {
        const levelNames = {
            'low': '低リスク',
            'medium': '中リスク',
            'high': '高リスク'
        };
        return levelNames[level] || level;
    }
}

// グローバルインスタンス作成
window.agencyDataManager = new AgencyDataManager();