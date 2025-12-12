import React, { useState } from 'react';
import { 
  PhoneCall, Mic, Share2, Target, Shield, Plug, 
  Signal, Headphones, TrendingUp, PhoneOutgoing,
  CheckCircle2, ArrowRight, Zap, Globe, Network, Brain,
  Mail
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { features, architectureFeatures, useCases, packages, faqs, contactInfo } from '../data/mock';

const Home = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const iconMap = {
    'phone-call': PhoneCall,
    'mic': Mic,
    'share-2': Share2,
    'target': Target,
    'shield': Shield,
    'plug': Plug,
    'signal': Signal,
    'headphones': Headphones,
    'trending-up': TrendingUp,
    'phone-outgoing': PhoneOutgoing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Demo talebiniz alındı!",
      description: "En kısa sürede sizinle iletişime geçeceğiz.",
    });
    setFormData({ name: '', email: '', company: '', phone: '', message: '' });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-teal-500/10" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
        
        <div className="container max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="text-center animate-fade-in">
            {/* Badge */}
            <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Next-Gen AI Infrastructure
            </Badge>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Operatörler ve Çağrı Merkezleri</span>
              <br />
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-teal-400 bg-clip-text text-transparent">
                İçin Yeni Nesil Yapay Zekâ Altyapısı
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-[rgb(218,218,218)] mb-10 max-w-3xl mx-auto leading-relaxed">
              MuyaSoft AI, operatörlere outbound arama, inbound çağrı, VoiceBot, Autodialer, 
              spam yönetimi, risk kontrolü ve konuşma analizini tek platformda sunar.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button 
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-200 hover:-translate-y-1"
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                Demo Talep Et
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-[rgb(63,63,63)] hover:border-blue-500 hover:bg-blue-500/10 text-white font-semibold px-8 py-6 text-lg rounded-xl transition-all duration-200 hover:-translate-y-1"
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              >
                Teknik Dökümanlar
              </Button>
            </div>

            {/* Hero Video */}
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-400 rounded-2xl blur-3xl opacity-20 animate-glow" />
              <video 
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="relative rounded-2xl shadow-2xl w-full border border-[rgba(255,255,255,0.1)]"
                src="/hero-video.mp4"
              >
                Tarayıcınız video etiketini desteklemiyor.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* MuyaSoft'un Rolü Section */}
      <section className="py-24 bg-[rgb(26,28,30)]">
        <div className="container max-w-[1200px] mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-2">
              <Globe className="w-4 h-4 mr-2" />
              White-Label AI Infrastructure
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              MuyaSoft'un Rolü
            </h2>
            <p className="text-xl text-[rgb(218,218,218)] leading-relaxed mb-8">
              <span className="text-blue-400 font-semibold">MuyaSoft operatör değildir;</span> operatörlerin arka plandaki 
              yapay zekâ motorudur. White-label olarak operatörlere altyapı sağlar.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <Card className="bg-[rgb(38,40,42)] border-[rgba(255,255,255,0.1)] hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <Brain className="w-12 h-12 text-blue-500 mb-4" />
                  <CardTitle className="text-white">AI Motor</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[rgb(161,161,170)]">Operatörlerin arkasındaki güçlü yapay zeka altyapısı</p>
                </CardContent>
              </Card>
              <Card className="bg-[rgb(38,40,42)] border-[rgba(255,255,255,0.1)] hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <Network className="w-12 h-12 text-purple-500 mb-4" />
                  <CardTitle className="text-white">White-Label</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[rgb(161,161,170)]">Kendi markanız altında müşterilerinize hizmet verin</p>
                </CardContent>
              </Card>
              <Card className="bg-[rgb(38,40,42)] border-[rgba(255,255,255,0.1)] hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <Zap className="w-12 h-12 text-teal-500 mb-4" />
                  <CardTitle className="text-white">Altyapı</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[rgb(161,161,170)]">Kurumsal düzeyde ölçeklenebilir VoIP çözümleri</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Ana Özellikler Section */}
      <section id="features" className="py-24">
        <div className="container max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-2">
              <Target className="w-4 h-4 mr-2" />
              Ana Özellikler
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Güçlü AI Özellikleri
            </h2>
            <p className="text-xl text-[rgb(218,218,218)] max-w-3xl mx-auto">
              Operatörlerinizi güçlendiren, müşteri deneyimini artıran ve operasyonel verimliliği maksimize eden özellikler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const IconComponent = iconMap[feature.icon];
              return (
                <Card key={feature.id} className="feature-card">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[rgb(161,161,170)] text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mimari Section */}
      <section id="architecture" className="py-24 bg-[rgb(26,28,30)]">
        <div className="container max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-teal-500/10 text-teal-400 border-teal-500/20 px-4 py-2">
              <Network className="w-4 h-4 mr-2" />
              Mimari
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Gelişmiş AI Mimarisi
            </h2>
            <p className="text-xl text-[rgb(218,218,218)] max-w-3xl mx-auto mb-12">
              Gerçek zamanlı işleme, yapay zeka ve güvenlik özelliklerinin mükemmel kombinasyonu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {architectureFeatures.map((item, index) => (
              <div
                key={index}
                className="bg-[rgb(38,40,42)] border border-[rgba(255,255,255,0.1)] rounded-xl p-6 hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 mt-2" />
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-[rgb(161,161,170)] text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kullanım Alanları Section */}
      <section id="use-cases" className="py-24">
        <div className="container max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-2">
              <Headphones className="w-4 h-4 mr-2" />
              Kullanım Alanları
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Kim Kullanabilir?
            </h2>
            <p className="text-xl text-[rgb(218,218,218)] max-w-3xl mx-auto">
              Farklı sektörler ve işletme ölçekleri için özelleştirilmiş çözümler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => {
              const IconComponent = iconMap[useCase.icon];
              return (
                <Card key={index} className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)] hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-teal-400 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-white text-2xl">{useCase.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[rgb(161,161,170)] text-base leading-relaxed">
                      {useCase.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Paketler Section */}
      <section id="packages" className="py-24 bg-[rgb(26,28,30)]">
        <div className="container max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Paketler
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              İhtiyacınıza Uygun Paket
            </h2>
            <p className="text-xl text-[rgb(218,218,218)] max-w-3xl mx-auto">
              Her ölçekte işletme için özel olarak tasarlanmış esnek paketler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card 
                key={index} 
                className={`relative overflow-hidden ${
                  pkg.recommended 
                    ? 'border-2 border-blue-500 shadow-xl shadow-blue-500/20' 
                    : 'border-[rgba(255,255,255,0.1)]'
                } bg-[rgb(38,40,42)] hover:-translate-y-2 transition-all duration-300`}
              >
                {pkg.recommended && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                    ÖNERİLEN
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-white text-2xl mb-2">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-blue-400 mb-2">{pkg.price}</div>
                  <CardDescription className="text-[rgb(161,161,170)]">{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span className="text-[rgb(218,218,218)] text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full mt-8 ${
                      pkg.recommended
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-transparent border-2 border-[rgb(63,63,63)] hover:border-blue-500 hover:bg-blue-500/10 text-white'
                    } font-semibold py-6 rounded-xl transition-all duration-200`}
                    onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  >
                    Başlayın
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SSS Section */}
      <section id="faq" className="py-24">
        <div className="container max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-purple-500/10 text-purple-400 border-purple-500/20 px-4 py-2">
              Sıkça Sorulan Sorular
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Merak Edilenler
            </h2>
            <p className="text-xl text-[rgb(218,218,218)] max-w-3xl mx-auto">
              MuyaSoft AI hakkında en çok sorulan sorular ve cevapları
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-[rgb(26,28,30)] border border-[rgba(255,255,255,0.1)] rounded-xl px-6 hover:border-blue-500/50 transition-colors duration-200"
                >
                  <AccordionTrigger className="text-white text-left text-lg font-semibold hover:text-blue-400 py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[rgb(161,161,170)] text-base leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* İletişim Section */}
      <section id="contact" className="py-24 bg-[rgb(26,28,30)]">
        <div className="container max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-teal-500/10 text-teal-400 border-teal-500/20 px-4 py-2">
              İletişim
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Bizimle İletişime Geçin
            </h2>
            <p className="text-xl text-[rgb(218,218,218)] max-w-3xl mx-auto">
              Demo talep edin veya sorularınız için bize ulaşın
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <Card className="bg-[rgb(38,40,42)] border-[rgba(255,255,255,0.1)]">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Demo Talep Formu</CardTitle>
                <CardDescription className="text-[rgb(161,161,170)]">
                  Formu doldurun, sizinle en kısa sürede iletişime geçelim
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Ad Soyad"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-[rgb(26,28,30)] border-[rgb(63,63,63)] text-white focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="E-posta"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-[rgb(26,28,30)] border-[rgb(63,63,63)] text-white focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="company"
                      placeholder="Şirket Adı"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="bg-[rgb(26,28,30)] border-[rgb(63,63,63)] text-white focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="phone"
                      placeholder="Telefon"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-[rgb(26,28,30)] border-[rgb(63,63,63)] text-white focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Mesajınız"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="bg-[rgb(26,28,30)] border-[rgb(63,63,63)] text-white focus:border-blue-500 min-h-[120px]"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-6 rounded-xl"
                  >
                    Demo Talebini Gönder
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-[rgb(38,40,42)] border border-[rgba(255,255,255,0.1)] rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">E-posta</h3>
                    <p className="text-[rgb(161,161,170)]">{contactInfo.email}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[rgb(38,40,42)] border border-[rgba(255,255,255,0.1)] rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <PhoneCall className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">Telefon</h3>
                    <p className="text-[rgb(161,161,170)] mb-1">{contactInfo.phone}</p>
                    <p className="text-[rgb(161,161,170)]">{contactInfo.phone2}</p>
                  </div>
                </div>
              </div>

              <div className="bg-[rgb(38,40,42)] border border-[rgba(255,255,255,0.1)] rounded-xl p-6 hover:border-teal-500/50 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-teal-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">Adres</h3>
                    <p className="text-[rgb(161,161,170)] text-sm mb-3">{contactInfo.address}</p>
                    <p className="text-[rgb(161,161,170)] text-sm">{contactInfo.address2}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-teal-500/10 border border-[rgba(255,255,255,0.1)] rounded-xl p-8">
                <h3 className="text-white font-semibold text-xl mb-3">Hızlı Başlangıç</h3>
                <p className="text-[rgb(161,161,170)] mb-6">
                  Teknik ekibimizle görüşerek 24 saat içinde sisteminizi kurabilirsiniz.
                </p>
                <div className="flex items-center space-x-2 text-blue-400">
                  <Zap className="w-5 h-5" />
                  <span className="font-semibold">Hemen başlayın!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
