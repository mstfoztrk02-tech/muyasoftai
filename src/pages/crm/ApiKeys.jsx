import React, { useState, useEffect } from 'react';
import { Volume2, Loader2, Play, Square, CheckCircle, AlertCircle } from 'lucide-react';
import Header from '../../components/crm/Header';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { useToast } from '../../hooks/use-toast';
import elevenlabsService from '../../services/elevenlabsService';
import settingsService from '../../services/settingsService';

const ApiKeys = () => {
  const { toast } = useToast();
  
  // State
  const [loading, setLoading] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('21m00Tcm4TlvDq8ikWAM'); // Default Rachel
  const [text, setText] = useState('Merhaba, ben ElevenLabs TTS sistemi. Sesimi test ediyorsunuz.');
  const [generating, setGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [apiKeyConfigured, setApiKeyConfigured] = useState(false);

  // Check if API key is configured
  useEffect(() => {
    checkAPIKey();
    fetchVoices();
  }, []);

  const checkAPIKey = async () => {
    try {
      const settings = await settingsService.getSettings();
      setApiKeyConfigured(!!settings.api_keys?.elevenlabs_api_key);
    } catch (err) {
      console.error('Failed to check API key:', err);
    }
  };

  const fetchVoices = async () => {
    try {
      setLoading(true);
      const response = await elevenlabsService.getVoices();
      setVoices(response.voices || []);
    } catch (err) {
      console.error('Failed to fetch voices:', err);
      // Don't show error if API key is not configured yet
      if (!apiKeyConfigured) {
        return;
      }
      toast({
        title: "Hata!",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast({
        title: "Hata!",
        description: "Lütfen metin girin.",
        variant: "destructive"
      });
      return;
    }

    setGenerating(true);
    setAudioUrl(null);
    
    // Stop current audio if playing
    if (audio) {
      audio.pause();
      setPlaying(false);
    }

    try {
      const response = await elevenlabsService.textToSpeech(text, selectedVoice);
      
      if (response.audio_base64) {
        setAudioUrl(response.audio_base64);
        toast({
          title: "Başarılı!",
          description: `Ses oluşturuldu. Karakter sayısı: ${response.character_count}`,
        });
      }
    } catch (err) {
      toast({
        title: "Hata!",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setGenerating(false);
    }
  };

  const handlePlay = () => {
    if (!audioUrl) return;

    if (playing && audio) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        const newAudio = new Audio(`data:audio/mpeg;base64,${audioUrl}`);
        newAudio.play();
        newAudio.onended = () => setPlaying(false);
        setAudio(newAudio);
        setPlaying(true);
      } catch (err) {
        toast({
          title: "Hata!",
          description: "Ses çalınamadı.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <Header 
        title="ElevenLabs TTS Test" 
        subtitle="Text-to-Speech test arayüzü"
      />
      
      <div className="p-8 max-w-4xl mx-auto">
        {!apiKeyConfigured && (
          <Card className="bg-orange-500/10 border-orange-500/20 mb-6">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-orange-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="text-orange-400 font-semibold mb-2">API Anahtarı Gerekli</h3>
                  <p className="text-[rgb(161,161,170)] text-sm">
                    ElevenLabs TTS kullanmak için önce API anahtarınızı Ayarlar bölümünden eklemelisiniz.
                  </p>
                  <Button 
                    className="mt-3 bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => window.location.href = '/crm/settings'}
                  >
                    Ayarlara Git
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)]">
          <CardHeader className="border-b border-[rgba(255,255,255,0.1)]">
            <CardTitle className="text-white flex items-center gap-2">
              <Volume2 size={24} className="text-purple-400" />
              Text-to-Speech Generator
            </CardTitle>
            <p className="text-sm text-[rgb(161,161,170)] mt-2">
              Metni sese dönüştürün ve sesli mesajlar oluşturun
            </p>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Voice Selection */}
            <div>
              <Label className="text-[rgb(161,161,170)] mb-2 block">Ses Seçimi</Label>
              <Select 
                value={selectedVoice} 
                onValueChange={setSelectedVoice}
                disabled={loading || voices.length === 0}
              >
                <SelectTrigger className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white">
                  <SelectValue placeholder="Ses seçin" />
                </SelectTrigger>
                <SelectContent className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)]">
                  {voices.length > 0 ? (
                    voices.map((voice) => (
                      <SelectItem key={voice.voice_id} value={voice.voice_id} className="text-white">
                        {voice.name} {voice.category ? `(${voice.category})` : ''}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="21m00Tcm4TlvDq8ikWAM" className="text-white">
                      Rachel (Default)
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {loading && (
                <p className="text-xs text-[rgb(161,161,170)] mt-2 flex items-center gap-2">
                  <Loader2 size={12} className="animate-spin" />
                  Sesler yükleniyor...
                </p>
              )}
            </div>

            {/* Text Input */}
            <div>
              <Label className="text-[rgb(161,161,170)] mb-2 block">Metin</Label>
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Sese dönüştürülecek metni buraya yazın..."
                className="bg-[rgb(38,40,42)] border-[rgb(63,63,63)] text-white min-h-[150px]"
                maxLength={5000}
              />
              <p className="text-xs text-[rgb(161,161,170)] mt-2">
                {text.length} / 5000 karakter
              </p>
            </div>

            {/* Generate Button */}
            <Button 
              onClick={handleGenerate}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white"
              disabled={generating || !text.trim() || !apiKeyConfigured}
            >
              {generating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Ses Oluşturuluyor...
                </>
              ) : (
                <>
                  <Volume2 size={18} className="mr-2" />
                  Ses Oluştur
                </>
              )}
            </Button>

            {/* Audio Player */}
            {audioUrl && (
              <Card className="bg-[rgb(38,40,42)] border-[rgba(255,255,255,0.1)]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                        <CheckCircle className="text-green-400" size={24} />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">Ses Hazır</h4>
                        <p className="text-sm text-[rgb(161,161,170)]">
                          {text.length} karakter işlendi
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={handlePlay}
                      className={`${
                        playing 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : 'bg-green-500 hover:bg-green-600'
                      } text-white`}
                    >
                      {playing ? (
                        <>
                          <Square size={18} className="mr-2" />
                          Durdur
                        </>
                      ) : (
                        <>
                          <Play size={18} className="mr-2" />
                          Oynat
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Voice Info */}
            {voices.length > 0 && selectedVoice && (
              <Card className="bg-[rgb(38,40,42)] border-[rgba(255,255,255,0.1)]">
                <CardContent className="p-4">
                  <div className="text-sm">
                    <p className="text-[rgb(161,161,170)] mb-1">Seçili Ses:</p>
                    <p className="text-white font-semibold">
                      {voices.find(v => v.voice_id === selectedVoice)?.name || 'Rachel'}
                    </p>
                    {voices.find(v => v.voice_id === selectedVoice)?.description && (
                      <p className="text-[rgb(161,161,170)] text-xs mt-2">
                        {voices.find(v => v.voice_id === selectedVoice)?.description}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Example Texts */}
        <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)] mt-6">
          <CardHeader>
            <CardTitle className="text-white text-lg">Örnek Metinler</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              'Merhaba, MuyaSoft AI çağrı merkezine hoş geldiniz. Size nasıl yardımcı olabilirim?',
              'Günaydın! Bugün sizlere özel kampanyalarımız hakkında bilgi vermek istiyorum.',
              'Ödeme planınız hakkında bilgi almak için lütfen 1\'e, müşteri temsilcisine bağlanmak için 2\'ye basın.',
            ].map((exampleText, index) => (
              <div 
                key={index}
                className="p-3 bg-[rgb(38,40,42)] rounded-lg cursor-pointer hover:bg-[rgb(50,52,54)] transition-colors"
                onClick={() => setText(exampleText)}
              >
                <p className="text-white text-sm">{exampleText}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApiKeys;
