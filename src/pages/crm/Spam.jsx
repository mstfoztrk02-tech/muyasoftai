import React from 'react';
import { AlertTriangle, Shield, Ban } from 'lucide-react';
import Header from '../../components/crm/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { spamAlerts } from '../../data/crmMock';

const Spam = () => {
  return (
    <div className="flex-1 overflow-auto">
      <Header 
        title="Spam & Risk Yönetimi" 
        subtitle="Spam tespiti ve risk analizi"
      />
      
      <div className="p-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">342</div>
                  <div className="text-sm text-[rgb(161,161,170)]">Bugün Engellendi</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <Ban className="text-red-500" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">98.2%</div>
                  <div className="text-sm text-[rgb(161,161,170)]">Tespit Doğruluğu</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Shield className="text-green-500" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">156</div>
                  <div className="text-sm text-[rgb(161,161,170)]">Aktif Uyarı</div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <AlertTriangle className="text-orange-500" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts */}
        <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
          <CardHeader>
            <CardTitle className="text-white">Son Spam Tespitleri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.1)]">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Numara</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Risk Skoru</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Sebep</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Tarih/Saat</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Aksiyon</th>
                  </tr>
                </thead>
                <tbody>
                  {spamAlerts.map((alert) => (
                    <tr key={alert.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgb(38,40,42)] transition-colors">
                      <td className="py-4 px-6">
                        <span className="text-white font-medium">{alert.number}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-24 bg-[rgb(38,40,42)] rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                alert.riskScore > 80 ? 'bg-red-500' : alert.riskScore > 60 ? 'bg-orange-500' : 'bg-yellow-500'
                              }`}
                              style={{ width: `${alert.riskScore}%` }}
                            />
                          </div>
                          <span className={`text-sm font-bold ${
                            alert.riskScore > 80 ? 'text-red-400' : alert.riskScore > 60 ? 'text-orange-400' : 'text-yellow-400'
                          }`}>
                            {alert.riskScore}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-[rgb(161,161,170)] text-sm">{alert.reason}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-[rgb(161,161,170)] text-sm">{alert.timestamp}</span>
                      </td>
                      <td className="py-4 px-6">
                        <Badge className={alert.action === 'blocked' 
                          ? 'bg-red-500/10 text-red-400 border-red-500/20'
                          : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                        }>
                          {alert.action === 'blocked' ? 'Engellendi' : 'İşaretlendi'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Spam;