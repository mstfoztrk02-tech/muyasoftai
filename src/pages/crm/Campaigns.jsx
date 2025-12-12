import React from 'react';
import { Plus, Play, Pause, BarChart3 } from 'lucide-react';
import Header from '../../components/crm/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { campaigns } from '../../data/crmMock';
import { useToast } from '../../hooks/use-toast';

const Campaigns = () => {
  const { toast } = useToast();

  const handleCampaignAction = (action, campaignName) => {
    toast({
      title: `Kampanya ${action}`,
      description: `${campaignName} kampanyası ${action} edildi.`,
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'active': { text: 'Aktif', class: 'bg-green-500/10 text-green-400 border-green-500/20', icon: Play },
      'paused': { text: 'Duraklatıldı', class: 'bg-orange-500/10 text-orange-400 border-orange-500/20', icon: Pause },
      'completed': { text: 'Tamamlandı', class: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: BarChart3 }
    };
    return statusMap[status] || statusMap['paused'];
  };

  return (
    <div className="flex-1 overflow-auto">
      <Header 
        title="AI Kampanya Yönetimi" 
        subtitle="Otomatik arama kampanyalarınızı oluşturun ve yönetin"
      />
      
      <div className="p-8">
        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            <Plus size={18} className="mr-2" />
            Yeni Kampanya Oluştur
          </Button>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {campaigns.map((campaign) => {
            const status = getStatusBadge(campaign.status);
            const StatusIcon = status.icon;
            const progress = (campaign.completed / campaign.totalNumbers) * 100;
            const successRate = (campaign.success / campaign.completed) * 100;

            return (
              <Card key={campaign.id} className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)] hover:border-blue-500/50 transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white text-xl mb-2">{campaign.name}</CardTitle>
                      <p className="text-sm text-[rgb(161,161,170)]">{campaign.scenario}</p>
                    </div>
                    <Badge className={status.class}>
                      <StatusIcon size={14} className="mr-1" />
                      {status.text}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[rgb(161,161,170)]">Kampanya İlerleme</span>
                      <span className="text-sm font-semibold text-white">{progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-[rgb(38,40,42)] rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-[rgb(161,161,170)]">{campaign.completed.toLocaleString()} / {campaign.totalNumbers.toLocaleString()} numara</span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[rgb(38,40,42)] rounded-lg p-4">
                      <div className="text-2xl font-bold text-white mb-1">{campaign.success.toLocaleString()}</div>
                      <div className="text-xs text-[rgb(161,161,170)]">Başarılı Çağrı</div>
                      <div className="text-xs text-green-400 mt-1">{successRate.toFixed(1)}% oran</div>
                    </div>
                    <div className="bg-[rgb(38,40,42)] rounded-lg p-4">
                      <div className="text-2xl font-bold text-white mb-1">{campaign.callRate}</div>
                      <div className="text-xs text-[rgb(161,161,170)]">Arama Hızı</div>
                      <div className="text-xs text-blue-400 mt-1">call/dk</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    {campaign.status === 'active' && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 border-[rgb(63,63,63)] text-orange-400 hover:bg-orange-500/10 hover:border-orange-500"
                        onClick={() => handleCampaignAction('duraklatıldı', campaign.name)}
                      >
                        <Pause size={16} className="mr-2" />
                        Duraklat
                      </Button>
                    )}
                    {campaign.status === 'paused' && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1 border-[rgb(63,63,63)] text-green-400 hover:bg-green-500/10 hover:border-green-500"
                        onClick={() => handleCampaignAction('devam ettirildi', campaign.name)}
                      >
                        <Play size={16} className="mr-2" />
                        Devam Et
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-[rgb(63,63,63)] text-white hover:bg-blue-500/10 hover:border-blue-500"
                    >
                      <BarChart3 size={16} className="mr-2" />
                      Rapor Gör
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;