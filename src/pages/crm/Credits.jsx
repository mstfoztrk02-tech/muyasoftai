import React from 'react';
import { CreditCard, TrendingDown, AlertCircle, Plus } from 'lucide-react';
import Header from '../../components/crm/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { creditBalance } from '../../data/crmMock';

const Credits = () => {
  return (
    <div className="flex-1 overflow-auto">
      <Header 
        title="Kredi & Bakiye Sistemi" 
        subtitle="Kredi yönetimi ve kullanım takibi"
      />
      
      <div className="p-8">
        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-teal-500/10 border-[rgba(255,255,255,0.1)] mb-8">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-[rgb(161,161,170)] mb-2">Mevcut Bakiye</div>
                <div className="text-5xl font-bold text-white mb-4">
                  {creditBalance.currentBalance.toLocaleString()} {creditBalance.currency}
                </div>
                <div className="text-sm text-[rgb(161,161,170)]">
                  Son yükleme: {creditBalance.lastRecharge}
                </div>
              </div>
              <div>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg">
                  <Plus size={20} className="mr-2" />
                  Kredi Yükle
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {creditBalance.monthlyUsage.toLocaleString()} {creditBalance.currency}
                  </div>
                  <div className="text-sm text-[rgb(161,161,170)]">Bu Ay Tüketim</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <TrendingDown className="text-orange-500" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {creditBalance.alertThreshold.toLocaleString()} {creditBalance.currency}
                  </div>
                  <div className="text-sm text-[rgb(161,161,170)]">Alarm Eşiği</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                  <AlertCircle className="text-yellow-500" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {Math.round((creditBalance.currentBalance / (creditBalance.currentBalance + creditBalance.monthlyUsage)) * 100)}%
                  </div>
                  <div className="text-sm text-[rgb(161,161,170)]">Kalan Oran</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <CreditCard className="text-green-500" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Chart */}
        <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
          <CardHeader>
            <CardTitle className="text-white">Kredi Tüketim Raporu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[rgb(218,218,218)]">Outbound Çağrılar</span>
                  <span className="text-sm font-semibold text-white">4,567 TL</span>
                </div>
                <div className="w-full bg-[rgb(38,40,42)] rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full" style={{ width: '53%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[rgb(218,218,218)]">AI VoiceBot Kullanımı</span>
                  <span className="text-sm font-semibold text-white">2,345 TL</span>
                </div>
                <div className="w-full bg-[rgb(38,40,42)] rounded-full h-3">
                  <div className="bg-gradient-to-r from-purple-500 to-teal-400 h-3 rounded-full" style={{ width: '27%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[rgb(218,218,218)]">Kampanya İşlemleri</span>
                  <span className="text-sm font-semibold text-white">1,655 TL</span>
                </div>
                <div className="w-full bg-[rgb(38,40,42)] rounded-full h-3">
                  <div className="bg-gradient-to-r from-teal-500 to-blue-400 h-3 rounded-full" style={{ width: '20%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Credits;