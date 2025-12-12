// CRM Dashboard Mock Data

export const dashboardStats = {
  totalCalls: 15847,
  activeCalls: 23,
  successRate: 78.5,
  spamDetected: 342,
  onlineTrunks: 15,
  totalTrunks: 18
};

export const callTrafficData = [
  { time: '00:00', calls: 45 },
  { time: '02:00', calls: 32 },
  { time: '04:00', calls: 28 },
  { time: '06:00', calls: 56 },
  { time: '08:00', calls: 124 },
  { time: '10:00', calls: 189 },
  { time: '12:00', calls: 256 },
  { time: '14:00', calls: 234 },
  { time: '16:00', calls: 198 },
  { time: '18:00', calls: 167 },
  { time: '20:00', calls: 89 },
  { time: '22:00', calls: 67 }
];

export const aiPerformanceData = [
  { metric: 'ASR Accuracy', value: 95.8 },
  { metric: 'NLP Success', value: 89.3 },
  { metric: 'Spam Detection', value: 98.2 },
  { metric: 'Call Routing', value: 92.5 }
];

export const trunks = [
  {
    id: 1,
    name: 'Trunk-TR-01',
    provider: 'VoIP Provider A',
    status: 'online',
    health: 98,
    codec: 'G729',
    concurrent: '50/100',
    ip: '185.45.23.12'
  },
  {
    id: 2,
    name: 'Trunk-TR-02',
    provider: 'VoIP Provider B',
    status: 'online',
    health: 95,
    codec: 'G711',
    concurrent: '32/100',
    ip: '185.45.23.13'
  },
  {
    id: 3,
    name: 'Trunk-EU-01',
    provider: 'VoIP Provider C',
    status: 'offline',
    health: 0,
    codec: 'OPUS',
    concurrent: '0/100',
    ip: '185.45.23.14'
  },
  {
    id: 4,
    name: 'Trunk-US-01',
    provider: 'VoIP Provider D',
    status: 'online',
    health: 87,
    codec: 'G729',
    concurrent: '78/150',
    ip: '185.45.23.15'
  },
  {
    id: 5,
    name: 'Trunk-TR-03',
    provider: 'VoIP Provider A',
    status: 'warning',
    health: 65,
    codec: 'G711',
    concurrent: '95/100',
    ip: '185.45.23.16'
  }
];

export const callRecords = [
  {
    id: 'CDR-2025-001',
    caller: '+90 532 123 4567',
    callee: '+90 212 456 7890',
    timestamp: '2025-01-04 14:35:22',
    duration: '03:45',
    status: 'answered',
    spamRisk: 'low',
    aiSummary: 'Müşteri ürün bilgisi talep etti, fiyat teklifi verildi.'
  },
  {
    id: 'CDR-2025-002',
    caller: '+90 533 234 5678',
    callee: '+90 212 456 7891',
    timestamp: '2025-01-04 14:32:15',
    duration: '00:00',
    status: 'no-answer',
    spamRisk: 'medium',
    aiSummary: 'Cevapsız arama.'
  },
  {
    id: 'CDR-2025-003',
    caller: '+90 534 345 6789',
    callee: '+90 212 456 7892',
    timestamp: '2025-01-04 14:28:45',
    duration: '07:12',
    status: 'answered',
    spamRisk: 'low',
    aiSummary: 'Satış görüşmesi, müşteri ilgili ancak karar vermedi.'
  },
  {
    id: 'CDR-2025-004',
    caller: '+90 535 456 7890',
    callee: '+90 212 456 7893',
    timestamp: '2025-01-04 14:25:10',
    duration: '00:15',
    status: 'busy',
    spamRisk: 'low',
    aiSummary: 'Meşgul.'
  },
  {
    id: 'CDR-2025-005',
    caller: '+90 536 567 8901',
    callee: '+90 212 456 7894',
    timestamp: '2025-01-04 14:20:33',
    duration: '00:00',
    status: 'failed',
    spamRisk: 'high',
    aiSummary: 'Spam şüphesi - otomatik engelendi.'
  }
];

export const campaigns = [
  {
    id: 1,
    name: 'Yeni Ürün Lansmanı',
    status: 'active',
    totalNumbers: 5000,
    completed: 3245,
    success: 2567,
    callRate: 120,
    scenario: 'Product Launch Script'
  },
  {
    id: 2,
    name: 'Müşteri Memnuniyeti Anketi',
    status: 'paused',
    totalNumbers: 2000,
    completed: 856,
    success: 645,
    callRate: 80,
    scenario: 'Survey Script'
  },
  {
    id: 3,
    name: 'Ödeme Hatırlatma',
    status: 'active',
    totalNumbers: 1500,
    completed: 1234,
    success: 998,
    callRate: 150,
    scenario: 'Payment Reminder Script'
  },
  {
    id: 4,
    name: 'Promo Kampanyası',
    status: 'completed',
    totalNumbers: 10000,
    completed: 10000,
    success: 7856,
    callRate: 0,
    scenario: 'Promotion Script'
  }
];

export const spamAlerts = [
  {
    id: 1,
    number: '+90 536 567 8901',
    riskScore: 95,
    reason: 'Yüksek frekanslı arama',
    timestamp: '2025-01-04 14:20:33',
    action: 'blocked'
  },
  {
    id: 2,
    number: '+90 537 678 9012',
    riskScore: 87,
    reason: 'Şüpheli davranış pattern',
    timestamp: '2025-01-04 14:15:22',
    action: 'flagged'
  },
  {
    id: 3,
    number: '+90 538 789 0123',
    riskScore: 72,
    reason: 'Kara liste eşleşmesi',
    timestamp: '2025-01-04 14:10:45',
    action: 'blocked'
  },
  {
    id: 4,
    number: '+90 539 890 1234',
    riskScore: 68,
    reason: 'Anormal arama süresi',
    timestamp: '2025-01-04 14:05:12',
    action: 'flagged'
  }
];

export const creditBalance = {
  currentBalance: 15420,
  currency: 'TL',
  lastRecharge: '2025-01-01',
  monthlyUsage: 8567,
  alertThreshold: 5000
};

export const apiKeys = [
  {
    id: 1,
    name: 'Production API Key',
    key: 'mys_prod_xK7jR9pL3mN5qW8vY2tU4zA6',
    created: '2024-12-01',
    lastUsed: '2025-01-04 14:30:22',
    status: 'active',
    ipWhitelist: ['185.45.23.0/24', '192.168.1.0/24']
  },
  {
    id: 2,
    name: 'Development API Key',
    key: 'mys_dev_aB3cD5eF7gH9iJ1kL2mN4oP6',
    created: '2024-12-15',
    lastUsed: '2025-01-04 12:15:45',
    status: 'active',
    ipWhitelist: ['192.168.1.100']
  },
  {
    id: 3,
    name: 'Testing API Key',
    key: 'mys_test_qR5sT7uV9wX1yZ3aB5cD7eF9',
    created: '2024-11-20',
    lastUsed: '2024-12-28 16:45:10',
    status: 'inactive',
    ipWhitelist: ['10.0.0.0/8']
  }
];
