import React, { useState, useEffect } from 'react';
import { Download, Filter, Search, Phone, Clock, PlayCircle, StopCircle, Plus, Upload, X, Eye, Trash2 } from 'lucide-react';
import Header from '../../components/crm/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { useToast } from '../../hooks/use-toast';
import { callRecords } from '../../data/crmMock';
import * as XLSX from 'xlsx';

const Calls = () => {
  const { toast } = useToast();
  const [records, setRecords] = useState(callRecords);
  const [callCount, setCallCount] = useState('1');
  const [activeCalls, setActiveCalls] = useState([]);
  const [isAutoCalling, setIsAutoCalling] = useState(false);
  const [isCallingStopped, setIsCallingStopped] = useState(false);
  const [numberQueue, setNumberQueue] = useState([]);
  
  // Modals
  const [showAddNumberModal, setShowAddNumberModal] = useState(false);
  const [showExcelUploadModal, setShowExcelUploadModal] = useState(false);
  
  // Form states
  const [newNumber, setNewNumber] = useState({ phone: '', name: '', note: '' });
  const [excelFile, setExcelFile] = useState(null);
  const [excelPreview, setExcelPreview] = useState([]);
  const [excelCount, setExcelCount] = useState(0);

  // Filter state
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusBadge = (status) => {
    const statusMap = {
      'answered': { text: 'Cevaplandı', class: 'bg-green-500/10 text-green-400 border-green-500/20' },
      'no-answer': { text: 'Cevap Yok', class: 'bg-gray-500/10 text-gray-400 border-gray-500/20' },
      'busy': { text: 'Meşgul', class: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
      'failed': { text: 'Başarısız', class: 'bg-red-500/10 text-red-400 border-red-500/20' }
    };
    return statusMap[status] || statusMap['failed'];
  };

  const getCallStatusBadge = (status) => {
    const statusMap = {
      'waiting': { text: 'Beklemede', class: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
      'calling': { text: 'Aranıyor', class: 'bg-purple-500/10 text-purple-400 border-purple-500/20 animate-pulse' },
      'answered': { text: 'Bağlandı', class: 'bg-green-500/10 text-green-400 border-green-500/20' },
      'busy': { text: 'Meşgul', class: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
      'unavailable': { text: 'Numara Kullanılamıyor', class: 'bg-red-500/10 text-red-400 border-red-500/20' },
      'no-answer': { text: 'Cevap Yok', class: 'bg-gray-500/10 text-gray-400 border-gray-500/20' },
      'failed': { text: 'Başarısız', class: 'bg-red-500/10 text-red-400 border-red-500/20' }
    };
    return statusMap[status] || statusMap['waiting'];
  };

  const getRiskBadge = (risk) => {
    const riskMap = {
      'low': { text: 'Düşük', class: 'bg-green-500/10 text-green-400 border-green-500/20' },
      'medium': { text: 'Orta', class: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
      'high': { text: 'Yüksek', class: 'bg-red-500/10 text-red-400 border-red-500/20' }
    };
    return riskMap[risk] || riskMap['low'];
  };

  // Tekil Numara Ekleme
  const handleAddNumber = () => {
    if (!newNumber.phone) {
      toast({
        title: "Hata!",
        description: "Telefon numarası zorunludur.",
        variant: "destructive"
      });
      return;
    }

    const number = {
      id: `NUM-${Date.now()}`,
      phone: newNumber.phone,
      name: newNumber.name || 'İsimsiz',
      note: newNumber.note || '',
      status: 'waiting',
      attempts: 0,
      duration: 0,
      lastCall: null,
      result: '-'
    };

    setNumberQueue(prev => [...prev, number]);
    setNewNumber({ phone: '', name: '', note: '' });
    setShowAddNumberModal(false);

    toast({
      title: "Numara Eklendi!",
      description: `${number.phone} kuyruğa eklendi.`,
    });
  };

  // Excel Dosya Yükleme
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setExcelFile(file);
    
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);

      // İlk 5 satır önizleme
      setExcelPreview(data.slice(0, 5));
      setExcelCount(data.length);
    };
    reader.readAsBinaryString(file);
  };

  // Excel'den Toplu İçe Aktar
  const handleExcelImport = () => {
    if (!excelFile) {
      toast({
        title: "Hata!",
        description: "Lütfen bir dosya seçin.",
        variant: "destructive"
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);

      const numbers = data.map((row, index) => ({
        id: `NUM-${Date.now()}-${index}`,
        phone: row['Telefon'] || row['telefon'] || row['Phone'] || row['phone'] || '',
        name: row['Ad'] || row['İsim'] || row['Name'] || row['name'] || 'İsimsiz',
        note: row['Not'] || row['note'] || '',
        status: 'waiting',
        attempts: 0,
        duration: 0,
        lastCall: null,
        result: '-'
      })).filter(num => num.phone);

      setNumberQueue(prev => [...prev, ...numbers]);
      setShowExcelUploadModal(false);
      setExcelFile(null);
      setExcelPreview([]);

      toast({
        title: "Toplu İçe Aktar Başarılı!",
        description: `${numbers.length} numara kuyruğa eklendi.`,
      });
    };
    reader.readAsBinaryString(excelFile);
  };

  // Numara Silme
  const handleDeleteNumber = (id) => {
    setNumberQueue(prev => prev.filter(num => num.id !== id));
    toast({
      title: "Numara Silindi",
      description: "Numara kuyruktan kaldırıldı.",
    });
  };

  // Otomatik Arama Başlatma
  const startAutoCalls = async () => {
    if (numberQueue.filter(n => n.status === 'waiting').length === 0) {
      toast({
        title: "Uyarı!",
        description: "Kuyrukta bekleyen numara yok!",
        variant: "destructive"
      });
      return;
    }

    setIsAutoCalling(true);
    setIsCallingStopped(false);
    
    toast({
      title: "Otomatik Arama Başlatıldı!",
      description: "Çağrılar başlatılıyor...",
    });

    const waitingNumbers = numberQueue.filter(n => n.status === 'waiting');
    const count = Math.min(parseInt(callCount), waitingNumbers.length);

    for (let i = 0; i < count; i++) {
      if (isCallingStopped) break;

      setTimeout(() => {
        if (isCallingStopped) return;
        
        const number = waitingNumbers[i];
        if (!number) return;

        // Durumu güncelle
        setNumberQueue(prev => prev.map(n => 
          n.id === number.id ? { ...n, status: 'calling', attempts: n.attempts + 1 } : n
        ));

        // Aktif çağrıya ekle
        const callId = `CALL-${Date.now()}-${i}`;
        const newCall = {
          id: callId,
          numberId: number.id,
          phone: number.phone,
          startTime: new Date(),
          elapsedTime: 0,
          status: 'Aranıyor...'
        };
        
        setActiveCalls(prev => [...prev, newCall]);

        // Simülasyon: Rastgele sonuç
        const outcomes = [
          { status: 'answered', delay: 15000 },
          { status: 'busy', delay: 5000 },
          { status: 'no-answer', delay: 8000 },
          { status: 'unavailable', delay: 3000 }
        ];
        const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];

        setTimeout(() => {
          completeCall(callId, number.id, number.phone, outcome.status);
        }, outcome.delay);
      }, i * 2000);
    }
  };

  // Aramayı Durdur
  const stopAutoCalls = () => {
    setIsCallingStopped(true);
    setIsAutoCalling(false);
    toast({
      title: "Otomatik Arama Durduruldu!",
      description: "Yeni aramalar başlatılmayacak.",
    });
  };

  // Çağrı Tamamlama
  const completeCall = (callId, numberId, phone, outcome) => {
    const aiSummaries = {
      'answered': [
        'Müşteri ürün bilgisi talep etti, fiyat teklifi verildi.',
        'Müşteri ilgili ancak karar vermedi.',
        'Olumlu görüşme, takip gerekiyor.',
        'Müşteri kredi paketine ilgi gösterdi.',
        'Detaylı bilgi istendi, email gönderilecek.'
      ],
      'busy': ['Meşgul - Farklı saatte tekrar denenecek.'],
      'no-answer': ['Cevapsız - Farklı gün ve saatte aranacak.'],
      'unavailable': ['Geçersiz numara - Listeden çıkarıldı.']
    };

    const duration = outcome === 'answered' 
      ? Math.floor(Math.random() * 180) + 30
      : 0;

    const summary = aiSummaries[outcome][Math.floor(Math.random() * aiSummaries[outcome].length)];

    // CDR kaydı ekle
    const newRecord = {
      id: callId,
      caller: '+90 850 000 00 00',
      callee: phone,
      timestamp: new Date().toLocaleString('tr-TR'),
      duration: `${String(Math.floor(duration / 60)).padStart(2, '0')}:${String(duration % 60).padStart(2, '0')}`,
      status: outcome,
      spamRisk: 'low',
      aiSummary: summary
    };

    setRecords(prev => [newRecord, ...prev]);

    // Kuyruktan güncelle
    setNumberQueue(prev => prev.map(n => 
      n.id === numberId ? { 
        ...n, 
        status: outcome, 
        duration: duration,
        lastCall: new Date().toLocaleString('tr-TR'),
        result: summary
      } : n
    ));

    // Aktif çağrılardan kaldır
    setActiveCalls(prev => prev.filter(call => call.id !== callId));
  };

  // Aktif çağrılar için timer
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCalls(prev => prev.map(call => ({
        ...call,
        elapsedTime: Math.floor((new Date() - call.startTime) / 1000)
      })));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Süre formatı
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Filtreleme
  const filteredQueue = statusFilter === 'all' 
    ? numberQueue 
    : numberQueue.filter(n => n.status === statusFilter);

  return (
    <div className="flex-1 overflow-auto">
      <Header 
        title="Çağrı Kayıtları (CDR)" 
        subtitle="Detaylı çağrı geçmişi ve AI analizi"
      />
      
      <div className="p-8">
        {/* Otomatik Arama Modülü */}
        <Card className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-teal-500/10 border-[rgba(255,255,255,0.1)] mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-4">
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
                  <PlayCircle className="text-blue-500" size={24} />
                  Otomatik Arama Modülü
                </h3>
                <p className="text-[rgb(161,161,170)] text-sm">
                  Belirlediğiniz sayı kadar otomatik arama başlatılır. Gerçek zamanlı durum takibi yapabilirsiniz.
                </p>
                <div className="mt-2">
                  <Badge className={`${isAutoCalling ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                    Durum: {isAutoCalling ? 'Çalışıyor' : isCallingStopped ? 'Durduruldu' : 'Beklemede'}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex flex-col">
                  <label className="text-[rgb(161,161,170)] text-xs mb-1">Arama Adedi</label>
                  <Select value={callCount} onValueChange={setCallCount}>
                    <SelectTrigger className="w-32 bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)]">
                      {[1, 2, 3, 5, 10, 20, 50, 100, 200, 500, 1000].map(num => (
                        <SelectItem key={num} value={String(num)} className="text-white hover:bg-[rgb(63,63,63)]">
                          {num} Arama
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 h-[42px] mt-auto shadow-lg shadow-blue-500/30"
                  onClick={startAutoCalls}
                  disabled={isAutoCalling}
                >
                  <PlayCircle size={18} className="mr-2" />
                  {isAutoCalling ? 'Arama Yapılıyor...' : 'Otomatik Arama Başlat'}
                </Button>

                <Button
                  variant="outline"
                  className="border-2 border-red-500 text-red-400 hover:bg-red-500/10 font-semibold px-6 h-[42px] mt-auto"
                  onClick={stopAutoCalls}
                  disabled={!isAutoCalling}
                >
                  <StopCircle size={18} className="mr-2" />
                  Aramayı Durdur
                </Button>
              </div>
            </div>

            {/* Durum Göstergeleri */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-[rgba(255,255,255,0.1)]">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Bağlandı</Badge>
                <span className="text-xs text-[rgb(161,161,170)]">Başarılı</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20">Meşgul</Badge>
                <span className="text-xs text-[rgb(161,161,170)]">Meşgul</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-red-500/10 text-red-400 border-red-500/20">Numara Kullanılamıyor</Badge>
                <span className="text-xs text-[rgb(161,161,170)]">Hata</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20">Cevap Yok</Badge>
                <span className="text-xs text-[rgb(161,161,170)]">Cevapsız</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Numara Yönetimi Butonları */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => setShowAddNumberModal(true)}
          >
            <Plus size={18} className="mr-2" />
            Numara Ekle
          </Button>
          <Button
            className="bg-purple-500 hover:bg-purple-600 text-white"
            onClick={() => setShowExcelUploadModal(true)}
          >
            <Upload size={18} className="mr-2" />
            Excel ile Toplu Numara Ekle
          </Button>
        </div>

        {/* Ana Grid: Arama İstatistikleri + Aktif Çağrılar */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          <div className="xl:col-span-2">
            <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Phone className="text-blue-500" size={20} />
                  Arama İstatistikleri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="bg-[rgb(38,40,42)] p-4 rounded-lg">
                    <div className="text-2xl font-bold text-white mb-1">{numberQueue.length}</div>
                    <div className="text-xs text-[rgb(161,161,170)]">Toplam Aranan</div>
                  </div>
                  <div className="bg-[rgb(38,40,42)] p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      {numberQueue.filter(r => r.status === 'answered').length}
                    </div>
                    <div className="text-xs text-[rgb(161,161,170)]">Bağlandı</div>
                  </div>
                  <div className="bg-[rgb(38,40,42)] p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-400 mb-1">
                      {numberQueue.filter(r => r.status === 'busy').length}
                    </div>
                    <div className="text-xs text-[rgb(161,161,170)]">Meşgul</div>
                  </div>
                  <div className="bg-[rgb(38,40,42)] p-4 rounded-lg">
                    <div className="text-2xl font-bold text-red-400 mb-1">
                      {numberQueue.filter(r => r.status === 'unavailable').length}
                    </div>
                    <div className="text-xs text-[rgb(161,161,170)]">Kullanılamıyor</div>
                  </div>
                  <div className="bg-[rgb(38,40,42)] p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-400 mb-1">
                      {numberQueue.filter(r => r.status === 'no-answer').length}
                    </div>
                    <div className="text-xs text-[rgb(161,161,170)]">Cevap Yok</div>
                  </div>
                  <div className="bg-[rgb(38,40,42)] p-4 rounded-lg">
                    <div className="text-2xl font-bold text-red-500 mb-1">
                      {numberQueue.filter(r => r.status === 'failed').length}
                    </div>
                    <div className="text-xs text-[rgb(161,161,170)]">Başarısız</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Aktif Çağrılar Paneli */}
          <Card 
            className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)] h-fit cursor-pointer hover:border-purple-500/50 transition-colors"
            onClick={() => setStatusFilter(statusFilter === 'calling' ? 'all' : 'calling')}
          >
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Clock className="text-purple-500" size={20} />
                  Aktif Çağrılar
                </span>
                <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                  {activeCalls.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeCalls.length === 0 ? (
                <div className="text-center py-8">
                  <Phone className="mx-auto mb-2 text-[rgb(161,161,170)]" size={32} />
                  <p className="text-[rgb(161,161,170)] text-sm">Aktif çağrı yok</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {activeCalls.map((call) => (
                    <div key={call.id} className="bg-[rgb(38,40,42)] p-3 rounded-lg border border-[rgba(255,255,255,0.1)] animate-pulse">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="text-white font-medium text-sm mb-1">{call.phone}</div>
                          <div className="text-xs text-[rgb(161,161,170)]">
                            Başlangıç: {call.startTime.toLocaleTimeString('tr-TR')}
                          </div>
                        </div>
                        <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 animate-pulse">
                          Aranıyor
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={14} className="text-blue-400" />
                        <span className="text-blue-400 font-mono font-semibold">
                          {formatTime(call.elapsedTime)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Otomatik Arama Kuyruğu Tablosu */}
        <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)] mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Otomatik Arama Kuyruğu</CardTitle>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('all')}
                  className="text-xs"
                >
                  Tümü ({numberQueue.length})
                </Button>
                <Button
                  size="sm"
                  variant={statusFilter === 'waiting' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('waiting')}
                  className="text-xs"
                >
                  Beklemede
                </Button>
                <Button
                  size="sm"
                  variant={statusFilter === 'calling' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('calling')}
                  className="text-xs"
                >
                  Aranıyor
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.1)]">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Sıra</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Telefon Numarası</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Müşteri Adı</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Çağrı Durumu</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Son Arama</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Deneme</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Süre (sn)</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Sonuç</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQueue.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center py-12">
                        <p className="text-[rgb(161,161,170)]">Kuyrukta numara yok. Yukarıdan numara ekleyin.</p>
                      </td>
                    </tr>
                  ) : (
                    filteredQueue.map((number, index) => {
                      const statusBadge = getCallStatusBadge(number.status);
                      return (
                        <tr key={number.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgb(38,40,42)] transition-colors">
                          <td className="py-4 px-6">
                            <span className="text-white font-medium">{index + 1}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-white font-medium">{number.phone}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-[rgb(218,218,218)]">{number.name}</span>
                          </td>
                          <td className="py-4 px-6">
                            <Badge className={statusBadge.class}>
                              {statusBadge.text}
                            </Badge>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-[rgb(161,161,170)] text-sm">{number.lastCall || '-'}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-white">{number.attempts}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-white font-mono">{number.duration}</span>
                          </td>
                          <td className="py-4 px-6 max-w-xs">
                            <p className="text-[rgb(161,161,170)] text-sm truncate">{number.result}</p>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex gap-2">
                              {(number.status === 'calling' || number.status === 'answered') && (
                                <Button
                                  size="sm"
                                  className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-blue-500/20"
                                >
                                  <Eye size={14} className="mr-1" />
                                  Çağrıya Gir
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                                onClick={() => handleDeleteNumber(number.id)}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* CDR Kayıtları (Orijinal Tablo) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex flex-1 max-w-md space-x-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgb(161,161,170)]" size={18} />
              <Input
                placeholder="Numara, CDR ID ara..."
                className="pl-10 bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white"
              />
            </div>
            <Button variant="outline" className="border-[rgb(63,63,63)] text-white hover:bg-[rgb(38,40,42)]">
              <Filter size={18} />
            </Button>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            <Download size={18} className="mr-2" />
            Rapor İndir
          </Button>
        </div>

        <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.1)]">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">CDR ID</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Arayan</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Aranan</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Tarih/Saat</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Süre</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Çağrı Durumu</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Risk</th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-[rgb(161,161,170)]">Arama Sonuç Özeti (TTS)</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => {
                    const status = getStatusBadge(record.status);
                    const risk = getRiskBadge(record.spamRisk);
                    return (
                      <tr key={record.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgb(38,40,42)] transition-colors">
                        <td className="py-4 px-6">
                          <span className="text-blue-400 font-mono text-sm">{record.id}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-white text-sm font-medium">{record.caller}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-white text-sm font-medium">{record.callee}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-[rgb(161,161,170)] text-sm">{record.timestamp}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-white text-sm font-mono">{record.duration}</span>
                        </td>
                        <td className="py-4 px-6">
                          <Badge className={status.class}>
                            {status.text}
                          </Badge>
                        </td>
                        <td className="py-4 px-6">
                          <Badge className={risk.class}>
                            {risk.text}
                          </Badge>
                        </td>
                        <td className="py-4 px-6 max-w-xs">
                          <p className="text-[rgb(161,161,170)] text-sm truncate">{record.aiSummary}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Numara Ekleme Modal */}
      <Dialog open={showAddNumberModal} onOpenChange={setShowAddNumberModal}>
        <DialogContent className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Numara Ekle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label className="text-[rgb(161,161,170)]">Telefon Numarası *</Label>
              <Input
                placeholder="+90 532 123 4567"
                value={newNumber.phone}
                onChange={(e) => setNewNumber({...newNumber, phone: e.target.value})}
                className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white mt-2"
              />
            </div>
            <div>
              <Label className="text-[rgb(161,161,170)]">Müşteri Adı (opsiyonel)</Label>
              <Input
                placeholder="Ahmet Yılmaz"
                value={newNumber.name}
                onChange={(e) => setNewNumber({...newNumber, name: e.target.value})}
                className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white mt-2"
              />
            </div>
            <div>
              <Label className="text-[rgb(161,161,170)]">Not (opsiyonel)</Label>
              <Input
                placeholder="Özel not..."
                value={newNumber.note}
                onChange={(e) => setNewNumber({...newNumber, note: e.target.value})}
                className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddNumberModal(false)} className="border-[rgb(63,63,63)] text-white">
              İptal
            </Button>
            <Button onClick={handleAddNumber} className="bg-blue-500 hover:bg-blue-600 text-white">
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Excel Upload Modal */}
      <Dialog open={showExcelUploadModal} onOpenChange={setShowExcelUploadModal}>
        <DialogContent className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)] text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Excel ile Toplu Numara Ekle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-[rgb(161,161,170)] text-sm">
              Lütfen .xlsx veya .csv dosyanızda <strong>'Telefon'</strong> sütunu bulunduğundan emin olun.
            </p>
            
            <div className="border-2 border-dashed border-[rgb(63,63,63)] rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
              <Upload className="mx-auto mb-4 text-[rgb(161,161,170)]" size={48} />
              <p className="text-white mb-2">Dosyayı buraya sürükleyin veya</p>
              <label className="inline-block">
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="cursor-pointer text-blue-400 hover:text-blue-300 underline">
                  Dosya Seç
                </span>
              </label>
            </div>

            {excelFile && (
              <div className="bg-[rgb(38,40,42)] p-4 rounded-lg">
                <p className="text-white font-medium mb-2">📄 {excelFile.name}</p>
                <p className="text-green-400 text-sm">Toplam {excelCount} adet numara bulundu</p>
                
                {excelPreview.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[rgb(161,161,170)] text-sm mb-2">Önizleme (İlk 5 satır):</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-[rgba(255,255,255,0.1)]">
                            {Object.keys(excelPreview[0]).map((key) => (
                              <th key={key} className="text-left py-2 px-3 text-[rgb(161,161,170)]">
                                {key}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {excelPreview.map((row, idx) => (
                            <tr key={idx} className="border-b border-[rgba(255,255,255,0.05)]">
                              {Object.values(row).map((val, i) => (
                                <td key={i} className="py-2 px-3 text-white">
                                  {String(val)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExcelUploadModal(false)} className="border-[rgb(63,63,63)] text-white">
              İptal
            </Button>
            <Button onClick={handleExcelImport} className="bg-purple-500 hover:bg-purple-600 text-white" disabled={!excelFile}>
              İçe Aktar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calls;
