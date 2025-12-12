import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, RefreshCw, Network, Activity, AlertCircle, CheckCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import Header from '../../components/crm/Header';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { useToast } from '../../hooks/use-toast';
import trunksService from '../../services/trunksService';

const Trunks = () => {
  const { toast } = useToast();
  
  // State
  const [trunks, setTrunks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTrunk, setSelectedTrunk] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    provider: 'Other',
    sip_server: '',
    sip_port: 5060,
    username: '',
    password: '',
    masked: true,
    max_concurrent_calls: 30,
    codec: 'G711',
    status: 'online',
    description: '',
    health_check_enabled: true,
    health_check_interval: 60
  });

  // Fetch trunks
  const fetchTrunks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await trunksService.getTrunks({ page: 1, page_size: 100 });
      setTrunks(response.trunks || []);
    } catch (err) {
      setError(err.message);
      toast({
        title: "Hata!",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrunks();
  }, []);

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      provider: 'Other',
      sip_server: '',
      sip_port: 5060,
      username: '',
      password: '',
      masked: true,
      max_concurrent_calls: 30,
      codec: 'G711',
      status: 'online',
      description: '',
      health_check_enabled: true,
      health_check_interval: 60
    });
    setShowPassword(false);
  };

  // Handle create
  const handleCreate = async () => {
    if (!formData.name || !formData.sip_server || !formData.username || !formData.password) {
      toast({
        title: "Hata!",
        description: "Lütfen zorunlu alanları doldurun.",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    try {
      await trunksService.createTrunk(formData);
      toast({
        title: "Başarılı!",
        description: "Trunk başarıyla oluşturuldu.",
      });
      setShowCreateModal(false);
      resetForm();
      fetchTrunks();
    } catch (err) {
      toast({
        title: "Hata!",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Handle edit
  const openEditModal = (trunk) => {
    setSelectedTrunk(trunk);
    setFormData({
      name: trunk.name,
      provider: trunk.provider,
      sip_server: trunk.sip_server,
      sip_port: trunk.sip_port,
      username: trunk.username,
      password: '', // Don't pre-fill password
      masked: trunk.masked,
      max_concurrent_calls: trunk.max_concurrent_calls,
      codec: trunk.codec,
      status: trunk.status,
      description: trunk.description || '',
      health_check_enabled: trunk.health_check_enabled,
      health_check_interval: trunk.health_check_interval
    });
    setShowEditModal(true);
  };

  const handleEdit = async () => {
    if (!formData.name || !formData.sip_server || !formData.username) {
      toast({
        title: "Hata!",
        description: "Lütfen zorunlu alanları doldurun.",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    try {
      // Only send password if it's been changed
      const updateData = { ...formData };
      if (!updateData.password) {
        delete updateData.password;
      }
      
      await trunksService.updateTrunk(selectedTrunk.id, updateData);
      toast({
        title: "Başarılı!",
        description: "Trunk başarıyla güncellendi.",
      });
      setShowEditModal(false);
      resetForm();
      setSelectedTrunk(null);
      fetchTrunks();
    } catch (err) {
      toast({
        title: "Hata!",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete
  const openDeleteModal = (trunk) => {
    setSelectedTrunk(trunk);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await trunksService.deleteTrunk(selectedTrunk.id);
      toast({
        title: "Başarılı!",
        description: "Trunk başarıyla silindi.",
      });
      setShowDeleteModal(false);
      setSelectedTrunk(null);
      fetchTrunks();
    } catch (err) {
      toast({
        title: "Hata!",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Handle health check
  const handleHealthCheck = async (trunkId, trunkName) => {
    toast({
      title: "Health Check Başlatıldı",
      description: `${trunkName} için health check yapılıyor...`,
    });

    try {
      await trunksService.performHealthCheck(trunkId);
      toast({
        title: "Başarılı!",
        description: "Health check tamamlandı.",
      });
      fetchTrunks();
    } catch (err) {
      toast({
        title: "Hata!",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const statusMap = {
      'online': { text: 'Online', class: 'bg-green-500/10 text-green-400 border-green-500/20' },
      'offline': { text: 'Offline', class: 'bg-red-500/10 text-red-400 border-red-500/20' },
      'error': { text: 'Hata', class: 'bg-red-500/10 text-red-400 border-red-500/20' },
      'maintenance': { text: 'Bakım', class: 'bg-orange-500/10 text-orange-400 border-orange-500/20' }
    };
    return statusMap[status] || statusMap['offline'];
  };

  // Get health badge
  const getHealthBadge = (healthStatus, healthPercentage) => {
    if (healthStatus === 'healthy') {
      return { icon: CheckCircle, class: 'text-green-400', text: `${healthPercentage}%` };
    } else if (healthStatus === 'unhealthy') {
      return { icon: AlertCircle, class: 'text-red-400', text: `${healthPercentage}%` };
    } else {
      return { icon: Activity, class: 'text-gray-400', text: 'Bilinmiyor' };
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="flex-1 overflow-auto">
      <Header 
        title="TRUNK Yönetimi" 
        subtitle="VoIP/PBX trunk'larınızı yönetin ve izleyin"
      />
      
      <div className="p-8">
        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-3">
            <Button 
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => {
                resetForm();
                setShowCreateModal(true);
              }}
            >
              <Plus size={18} className="mr-2" />
              Yeni Trunk Ekle
            </Button>
            <Button 
              variant="outline" 
              className="border-[rgb(63,63,63)] text-white hover:bg-[rgb(38,40,42)]"
              onClick={fetchTrunks}
              disabled={loading}
            >
              {loading ? <Loader2 size={18} className="mr-2 animate-spin" /> : <RefreshCw size={18} className="mr-2" />}
              Yenile
            </Button>
          </div>

          <div className="text-[rgb(161,161,170)] text-sm">
            Toplam: <span className="text-white font-semibold">{trunks.length}</span> trunk
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="text-red-400" size={20} />
              <span className="text-red-400">{error}</span>
            </div>
            <Button 
              onClick={fetchTrunks}
              variant="outline"
              size="sm"
              className="border-red-500/20 text-red-400 hover:bg-red-500/10"
            >
              Tekrar Dene
            </Button>
          </div>
        )}

        {/* Loading State */}
        {loading && trunks.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-500" size={40} />
            <span className="ml-4 text-white text-lg">Trunk'lar yükleniyor...</span>
          </div>
        ) : trunks.length === 0 ? (
          <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
            <CardContent className="p-20 text-center">
              <Network className="mx-auto mb-4 text-[rgb(161,161,170)]" size={64} />
              <h3 className="text-xl font-semibold text-white mb-2">Henüz trunk eklenmemiş</h3>
              <p className="text-[rgb(161,161,170)] mb-6">İlk trunk'ınızı ekleyerek başlayın.</p>
              <Button 
                className="bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => {
                  resetForm();
                  setShowCreateModal(true);
                }}
              >
                <Plus size={18} className="mr-2" />
                Yeni Trunk Ekle
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Trunks Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {trunks.map((trunk) => {
              const statusBadge = getStatusBadge(trunk.status);
              const healthBadge = getHealthBadge(trunk.health_status, trunk.health_percentage);
              const HealthIcon = healthBadge.icon;

              return (
                <Card key={trunk.id} className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)] hover:border-blue-500/50 transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-1">{trunk.name}</h3>
                        <p className="text-sm text-[rgb(161,161,170)]">{trunk.sip_server}:{trunk.sip_port}</p>
                      </div>
                      <Badge className={statusBadge.class}>
                        {statusBadge.text}
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[rgb(161,161,170)]">Provider:</span>
                        <span className="text-white font-medium">{trunk.provider}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[rgb(161,161,170)]">Username:</span>
                        <span className="text-white font-mono">{trunk.username}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[rgb(161,161,170)]">Codec:</span>
                        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                          {trunk.codec}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[rgb(161,161,170)]">Concurrent Calls:</span>
                        <span className="text-white">{trunk.current_concurrent_calls || 0} / {trunk.max_concurrent_calls}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[rgb(161,161,170)]">Health:</span>
                        <div className="flex items-center gap-2">
                          <HealthIcon className={healthBadge.class} size={16} />
                          <span className={healthBadge.class}>{healthBadge.text}</span>
                        </div>
                      </div>
                      {trunk.last_health_check && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[rgb(161,161,170)]">Son Kontrol:</span>
                          <span className="text-[rgb(161,161,170)] text-xs">
                            {new Date(trunk.last_health_check).toLocaleString('tr-TR')}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-[rgba(255,255,255,0.1)]">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-blue-500/20 text-blue-400 hover:bg-blue-500/10"
                        onClick={() => handleHealthCheck(trunk.id, trunk.name)}
                      >
                        <Activity size={14} className="mr-1" />
                        Health Check
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[rgb(63,63,63)] text-white hover:bg-[rgb(38,40,42)]"
                        onClick={() => openEditModal(trunk)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                        onClick={() => openDeleteModal(trunk)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <Dialog open={showCreateModal || showEditModal} onOpenChange={(open) => {
        if (!open) {
          setShowCreateModal(false);
          setShowEditModal(false);
          resetForm();
          setSelectedTrunk(null);
        }
      }}>
        <DialogContent className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">
              {showCreateModal ? 'Yeni Trunk Ekle' : 'Trunk Düzenle'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[rgb(161,161,170)]">Trunk Adı *</Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="TR-Trunk-01"
                  className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white mt-2"
                />
              </div>
              <div>
                <Label className="text-[rgb(161,161,170)]">Provider *</Label>
                <Select value={formData.provider} onValueChange={(value) => setFormData(prev => ({...prev, provider: value}))}>
                  <SelectTrigger className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)]">
                    <SelectItem value="Sippy" className="text-white">Sippy Soft</SelectItem>
                    <SelectItem value="Issabel" className="text-white">Issabel</SelectItem>
                    <SelectItem value="FreePBX" className="text-white">FreePBX</SelectItem>
                    <SelectItem value="Other" className="text-white">Diğer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <Label className="text-[rgb(161,161,170)]">SIP Server *</Label>
                <Input
                  name="sip_server"
                  value={formData.sip_server}
                  onChange={handleInputChange}
                  placeholder="sip.example.com"
                  className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white mt-2"
                />
              </div>
              <div>
                <Label className="text-[rgb(161,161,170)]">SIP Port *</Label>
                <Input
                  name="sip_port"
                  type="number"
                  value={formData.sip_port}
                  onChange={handleInputChange}
                  className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-[rgb(161,161,170)]">Username *</Label>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="sipuser"
                  className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white mt-2"
                />
              </div>
              <div>
                <Label className="text-[rgb(161,161,170)]">
                  Password {showEditModal && '(boş bırakılırsa değişmez)'}
                </Label>
                <div className="relative mt-2">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder={showEditModal ? "••••••••" : "Şifre"}
                    className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(161,161,170)] hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="text-[rgb(161,161,170)]">Max Calls</Label>
                <Input
                  name="max_concurrent_calls"
                  type="number"
                  value={formData.max_concurrent_calls}
                  onChange={handleInputChange}
                  className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white mt-2"
                />
              </div>
              <div>
                <Label className="text-[rgb(161,161,170)]">Codec</Label>
                <Select value={formData.codec} onValueChange={(value) => setFormData(prev => ({...prev, codec: value}))}>
                  <SelectTrigger className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)]">
                    <SelectItem value="G711" className="text-white">G.711</SelectItem>
                    <SelectItem value="G729" className="text-white">G.729</SelectItem>
                    <SelectItem value="OPUS" className="text-white">OPUS</SelectItem>
                    <SelectItem value="GSM" className="text-white">GSM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[rgb(161,161,170)]">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({...prev, status: value}))}>
                  <SelectTrigger className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)]">
                    <SelectItem value="online" className="text-white">Online</SelectItem>
                    <SelectItem value="offline" className="text-white">Offline</SelectItem>
                    <SelectItem value="maintenance" className="text-white">Bakım</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-[rgb(161,161,170)]">Açıklama</Label>
              <Input
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Trunk açıklaması..."
                className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white mt-2"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="health_check_enabled"
                name="health_check_enabled"
                checked={formData.health_check_enabled}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <Label htmlFor="health_check_enabled" className="text-[rgb(161,161,170)] cursor-pointer">
                Health Check Etkin
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowCreateModal(false);
                setShowEditModal(false);
                resetForm();
                setSelectedTrunk(null);
              }}
              className="border-[rgb(63,63,63)] text-white"
              disabled={submitting}
            >
              İptal
            </Button>
            <Button 
              onClick={showCreateModal ? handleCreate : handleEdit}
              className="bg-blue-500 hover:bg-blue-600 text-white"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                showCreateModal ? 'Oluştur' : 'Güncelle'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Trunk'ı Sil</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-[rgb(161,161,170)]">
              <span className="text-white font-semibold">{selectedTrunk?.name}</span> trunk'ını silmek istediğinizden emin misiniz? 
              Bu işlem geri alınamaz.
            </p>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowDeleteModal(false);
                setSelectedTrunk(null);
              }}
              className="border-[rgb(63,63,63)] text-white"
              disabled={submitting}
            >
              İptal
            </Button>
            <Button 
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Siliniyor...
                </>
              ) : (
                'Sil'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Trunks;
