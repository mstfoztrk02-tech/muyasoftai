import React, { useState, useEffect } from 'react';
import { Save, Key, Mail, Globe, Shield, Loader2, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import Header from '../../components/crm/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useToast } from '../../hooks/use-toast';
import settingsService from '../../services/settingsService';

const Settings = () => {
  const { toast } = useToast();
  
  // State
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState(null);
  const [showPasswords, setShowPasswords] = useState({});

  // Form states
  const [apiKeys, setApiKeys] = useState({
    elevenlabs_api_key: '',
    custom_ai_server_url: '',
    custom_ai_api_key: '',
    sippy_api_url: '',
    sippy_api_key: '',
    issabel_api_url: '',
    issabel_api_key: ''
  });

  const [smtp, setSmtp] = useState({
    smtp_host: '',
    smtp_port: 587,
    smtp_username: '',
    smtp_password: '',
    smtp_from_email: '',
    smtp_use_tls: true
  });

  const [general, setGeneral] = useState({
    timezone: 'Europe/Istanbul',
    language: 'tr',
    company_name: 'MuyaSoft AI',
    default_codec: 'G711',
    max_concurrent_calls: 100
  });

  const [security, setSecurity] = useState({
    enable_2fa: false,
    session_timeout: 3600,
    max_login_attempts: 5,
    ip_whitelist: null
  });

  // Fetch settings
  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await settingsService.getSettings();
      setSettings(data);
      setApiKeys(data.api_keys || apiKeys);
      setSmtp(data.smtp || smtp);
      setGeneral(data.general || general);
      setSecurity(data.security || security);
    } catch (err) {
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
    fetchSettings();
  }, []);

  // Save API Keys
  const handleSaveAPIKeys = async () => {
    setSaving(true);
    try {
      await settingsService.updateAPIKeys(apiKeys);
      toast({
        title: "Başarılı!",
        description: "API anahtarları güncellendi.",
      });
      fetchSettings();
    } catch (err) {
      toast({
        title: "Hata!",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  // Save SMTP
  const handleSaveSMTP = async () => {
    setSaving(true);
    try {
      await settingsService.updateSMTP(smtp);
      toast({
        title: "Başarılı!",
        description: "SMTP ayarları güncellendi.",
      });
      fetchSettings();
    } catch (err) {
      toast({
        title: "Hata!",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  // Save General
  const handleSaveGeneral = async () => {
    setSaving(true);
    try {
      await settingsService.updateGeneral(general);
      toast({
        title: "Başarılı!",
        description: "Genel ayarlar güncellendi.",
      });
      fetchSettings();
    } catch (err) {
      toast({
        title: "Hata!",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  // Save Security
  const handleSaveSecurity = async () => {
    setSaving(true);
    try {
      await settingsService.updateSecurity(security);
      toast({
        title: "Başarılı!",
        description: "Güvenlik ayarları güncellendi.",
      });
      fetchSettings();
    } catch (err) {
      toast({
        title: "Hata!",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-auto">
        <Header title="Ayarlar" subtitle="Sistem ayarları ve yapılandırma" />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-blue-500" size={40} />
          <span className="ml-4 text-white text-lg">Ayarlar yükleniyor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <Header 
        title="Ayarlar" 
        subtitle="Sistem ayarları ve yapılandırma"
      />
      
      <div className="p-8">
        <Tabs defaultValue="api-keys" className="w-full">
          <TabsList className="bg-[rgb(26,28,30)] border border-[rgba(255,255,255,0.1)] mb-6">
            <TabsTrigger value="api-keys" className="data-[state=active]:bg-blue-500">
              <Key size={16} className="mr-2" />
              API Anahtarları
            </TabsTrigger>
            <TabsTrigger value="smtp" className="data-[state=active]:bg-blue-500">
              <Mail size={16} className="mr-2" />
              SMTP
            </TabsTrigger>
            <TabsTrigger value="general" className="data-[state=active]:bg-blue-500">
              <Globe size={16} className="mr-2" />
              Genel
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-blue-500">
              <Shield size={16} className="mr-2" />
              Güvenlik
            </TabsTrigger>
          </TabsList>

          {/* API Keys Tab */}
          <TabsContent value="api-keys">
            <div className="space-y-6">
              {/* ElevenLabs */}
              <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
                <CardHeader className="border-b border-[rgba(255,255,255,0.1)]">
                  <CardTitle className="text-white flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <span className="text-purple-400 font-bold">E</span>
                    </div>
                    ElevenLabs TTS/STT
                  </CardTitle>
                  <p className="text-sm text-[rgb(161,161,170)] mt-2">
                    Text-to-Speech ve Speech-to-Text servisi için API anahtarı
                  </p>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="relative">
                    <Label className="text-[rgb(161,161,170)] mb-2 block">API Key</Label>
                    <div className="relative">
                      <Input
                        type={showPasswords.elevenlabs ? "text" : "password"}
                        value={apiKeys.elevenlabs_api_key || ''}
                        onChange={(e) => setApiKeys({...apiKeys, elevenlabs_api_key: e.target.value})}
                        placeholder="sk_..."
                        className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('elevenlabs')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(161,161,170)] hover:text-white"
                      >
                        {showPasswords.elevenlabs ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {apiKeys.elevenlabs_api_key && (
                      <div className="flex items-center gap-2 mt-2 text-green-400 text-sm">
                        <CheckCircle size={14} />
                        <span>API anahtarı ayarlandı</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Custom AI Server */}
              <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
                <CardHeader className="border-b border-[rgba(255,255,255,0.1)]">
                  <CardTitle className="text-white flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <span className="text-blue-400 font-bold">AI</span>
                    </div>
                    Custom AI Server
                  </CardTitle>
                  <p className="text-sm text-[rgb(161,161,170)] mt-2">
                    Fraud detection, keyword filtering, TTS fallback
                  </p>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div>
                    <Label className="text-[rgb(161,161,170)] mb-2 block">Server URL</Label>
                    <Input
                      value={apiKeys.custom_ai_server_url || ''}
                      onChange={(e) => setApiKeys({...apiKeys, custom_ai_server_url: e.target.value})}
                      placeholder="https://ai.example.com/api"
                      className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
                    />
                  </div>
                  <div className="relative">
                    <Label className="text-[rgb(161,161,170)] mb-2 block">API Key</Label>
                    <div className="relative">
                      <Input
                        type={showPasswords.custom_ai ? "text" : "password"}
                        value={apiKeys.custom_ai_api_key || ''}
                        onChange={(e) => setApiKeys({...apiKeys, custom_ai_api_key: e.target.value})}
                        placeholder="API anahtarı"
                        className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('custom_ai')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(161,161,170)] hover:text-white"
                      >
                        {showPasswords.custom_ai ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sippy Soft */}
              <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
                <CardHeader className="border-b border-[rgba(255,255,255,0.1)]">
                  <CardTitle className="text-white flex items-center gap-2">
                    <div className="w-8 h-8 bg-teal-500/10 rounded-lg flex items-center justify-center">
                      <span className="text-teal-400 font-bold">S</span>
                    </div>
                    Sippy Soft PBX
                  </CardTitle>
                  <p className="text-sm text-[rgb(161,161,170)] mt-2">
                    Sippy Soft API entegrasyonu için bilgiler
                  </p>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div>
                    <Label className="text-[rgb(161,161,170)] mb-2 block">API URL</Label>
                    <Input
                      value={apiKeys.sippy_api_url || ''}
                      onChange={(e) => setApiKeys({...apiKeys, sippy_api_url: e.target.value})}
                      placeholder="https://sippy.example.com/api"
                      className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
                    />
                  </div>
                  <div className="relative">
                    <Label className="text-[rgb(161,161,170)] mb-2 block">API Key</Label>
                    <div className="relative">
                      <Input
                        type={showPasswords.sippy ? "text" : "password"}
                        value={apiKeys.sippy_api_key || ''}
                        onChange={(e) => setApiKeys({...apiKeys, sippy_api_key: e.target.value})}
                        placeholder="API anahtarı"
                        className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('sippy')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(161,161,170)] hover:text-white"
                      >
                        {showPasswords.sippy ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Issabel */}
              <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
                <CardHeader className="border-b border-[rgba(255,255,255,0.1)]">
                  <CardTitle className="text-white flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                      <span className="text-orange-400 font-bold">I</span>
                    </div>
                    Issabel PBX
                  </CardTitle>
                  <p className="text-sm text-[rgb(161,161,170)] mt-2">
                    Issabel API entegrasyonu için bilgiler
                  </p>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div>
                    <Label className="text-[rgb(161,161,170)] mb-2 block">API URL</Label>
                    <Input
                      value={apiKeys.issabel_api_url || ''}
                      onChange={(e) => setApiKeys({...apiKeys, issabel_api_url: e.target.value})}
                      placeholder="https://issabel.example.com/api"
                      className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
                    />
                  </div>
                  <div className="relative">
                    <Label className="text-[rgb(161,161,170)] mb-2 block">API Key</Label>
                    <div className="relative">
                      <Input
                        type={showPasswords.issabel ? "text" : "password"}
                        value={apiKeys.issabel_api_key || ''}
                        onChange={(e) => setApiKeys({...apiKeys, issabel_api_key: e.target.value})}
                        placeholder="API anahtarı"
                        className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('issabel')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(161,161,170)] hover:text-white"
                      >
                        {showPasswords.issabel ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={handleSaveAPIKeys}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <Save size={18} className="mr-2" />
                    API Anahtarlarını Kaydet
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          {/* SMTP Tab */}
          <TabsContent value="smtp">
            <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
              <CardHeader>
                <CardTitle className="text-white">SMTP Yapılandırması</CardTitle>
                <p className="text-sm text-[rgb(161,161,170)] mt-2">
                  E-posta bildirimleri için SMTP ayarları
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-[rgb(161,161,170)] mb-2 block">SMTP Host</Label>
                    <Input
                      value={smtp.smtp_host || ''}
                      onChange={(e) => setSmtp({...smtp, smtp_host: e.target.value})}
                      placeholder="smtp.gmail.com"
                      className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-[rgb(161,161,170)] mb-2 block">Port</Label>
                    <Input
                      type="number"
                      value={smtp.smtp_port}
                      onChange={(e) => setSmtp({...smtp, smtp_port: parseInt(e.target.value)})}
                      className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-[rgb(161,161,170)] mb-2 block">Username</Label>
                  <Input
                    value={smtp.smtp_username || ''}
                    onChange={(e) => setSmtp({...smtp, smtp_username: e.target.value})}
                    placeholder="user@example.com"
                    className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
                  />
                </div>

                <div className="relative">
                  <Label className="text-[rgb(161,161,170)] mb-2 block">Password</Label>
                  <div className="relative">
                    <Input
                      type={showPasswords.smtp ? "text" : "password"}
                      value={smtp.smtp_password || ''}
                      onChange={(e) => setSmtp({...smtp, smtp_password: e.target.value})}
                      placeholder="••••••••"
                      className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('smtp')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgb(161,161,170)] hover:text-white"
                    >
                      {showPasswords.smtp ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label className="text-[rgb(161,161,170)] mb-2 block">From Email</Label>
                  <Input
                    value={smtp.smtp_from_email || ''}
                    onChange={(e) => setSmtp({...smtp, smtp_from_email: e.target.value})}
                    placeholder="noreply@example.com"
                    className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="smtp_use_tls"
                    checked={smtp.smtp_use_tls}
                    onChange={(e) => setSmtp({...smtp, smtp_use_tls: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="smtp_use_tls" className="text-[rgb(161,161,170)] cursor-pointer">
                    TLS Kullan
                  </Label>
                </div>

                <Button 
                  onClick={handleSaveSMTP}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      SMTP Ayarlarını Kaydet
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* General Tab */}
          <TabsContent value="general">
            <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
              <CardHeader>
                <CardTitle className="text-white">Genel Ayarlar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-[rgb(161,161,170)] mb-2 block">Şirket Adı</Label>
                  <Input
                    value={general.company_name}
                    onChange={(e) => setGeneral({...general, company_name: e.target.value})}
                    className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
                  />
                </div>

                <div>
                  <Label className="text-[rgb(161,161,170)] mb-2 block">Zaman Dilimi</Label>
                  <Select value={general.timezone} onValueChange={(value) => setGeneral({...general, timezone: value})}>
                    <SelectTrigger className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)]">
                      <SelectItem value="Europe/Istanbul" className="text-white">İstanbul (GMT+3)</SelectItem>
                      <SelectItem value="Europe/London" className="text-white">London (GMT)</SelectItem>
                      <SelectItem value="America/New_York" className="text-white">New York (GMT-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-[rgb(161,161,170)] mb-2 block">Varsayılan Codec</Label>
                  <Select value={general.default_codec} onValueChange={(value) => setGeneral({...general, default_codec: value})}>
                    <SelectTrigger className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)]">
                      <SelectItem value="G711" className="text-white">G.711</SelectItem>
                      <SelectItem value="G729" className="text-white">G.729</SelectItem>
                      <SelectItem value="OPUS" className="text-white">OPUS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-[rgb(161,161,170)] mb-2 block">Max Concurrent Calls</Label>
                  <Input
                    type="number"
                    value={general.max_concurrent_calls}
                    onChange={(e) => setGeneral({...general, max_concurrent_calls: parseInt(e.target.value)})}
                    className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
                  />
                </div>

                <Button 
                  onClick={handleSaveGeneral}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Genel Ayarları Kaydet
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
              <CardHeader>
                <CardTitle className="text-white">Güvenlik Ayarları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="enable_2fa"
                    checked={security.enable_2fa}
                    onChange={(e) => setSecurity({...security, enable_2fa: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="enable_2fa" className="text-[rgb(161,161,170)] cursor-pointer">
                    İki Faktörlü Kimlik Doğrulama (2FA)
                  </Label>
                </div>

                <div>
                  <Label className="text-[rgb(161,161,170)] mb-2 block">Oturum Zaman Aşımı (saniye)</Label>
                  <Input
                    type="number"
                    value={security.session_timeout}
                    onChange={(e) => setSecurity({...security, session_timeout: parseInt(e.target.value)})}
                    className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
                  />
                </div>

                <div>
                  <Label className="text-[rgb(161,161,170)] mb-2 block">Max Giriş Denemesi</Label>
                  <Input
                    type="number"
                    value={security.max_login_attempts}
                    onChange={(e) => setSecurity({...security, max_login_attempts: parseInt(e.target.value)})}
                    className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
                  />
                </div>

                <Button 
                  onClick={handleSaveSecurity}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white mt-4"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <Save size={18} className="mr-2" />
                      Güvenlik Ayarlarını Kaydet
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
