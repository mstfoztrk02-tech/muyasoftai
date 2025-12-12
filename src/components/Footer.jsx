import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Instagram } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    product: [
      { label: 'Özellikler', href: '#features' },
      { label: 'Fiyatlandırma', href: '#packages' },
      { label: 'SSS', href: '#faq' },
      { label: 'Demo', href: '#contact' }
    ],
    company: [
      { label: 'Hakkımızda', href: '#' },
      { label: 'Kariyer', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'İletişim', href: '#contact' }
    ],
    resources: [
      { label: 'Dokümantasyon', href: '#' },
      { label: 'API Referansı', href: '#' },
      { label: 'Entegrasyonlar', href: '#' },
      { label: 'Destek', href: '#' }
    ]
  };

  return (
    <footer className="bg-[rgb(26,28,30)] border-t border-[rgba(255,255,255,0.1)] mt-32">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="https://customer-assets.emergentagent.com/job_fa8c4ac4-8ad1-4ccf-bde7-b1396ba926d7/artifacts/ey1jv1jt_image.png" 
                alt="MuyaSoft AI" 
                className="h-12 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">MUYA SOFT</span>
                <span className="text-xs text-[rgb(161,161,170)]">AI Solutions</span>
              </div>
            </div>
            <p className="text-[rgb(161,161,170)] text-sm mb-6 max-w-sm">
              Operatörler ve çağrı merkezleri için yeni nesil yapay zekâ altyapısı. White-label AI çözümleri ile işinizi bir üst seviyeye taşıyın.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.instagram.com/muya.cy?igsh=NDAzcjZlaXhrMjBk" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[rgb(38,40,42)] flex items-center justify-center text-[rgb(161,161,170)] hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-200 hover:-translate-y-1"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-[rgb(38,40,42)] flex items-center justify-center text-[rgb(161,161,170)] hover:bg-[rgb(59,130,246)] hover:text-white transition-all duration-200 hover:-translate-y-1"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-[rgb(38,40,42)] flex items-center justify-center text-[rgb(161,161,170)] hover:bg-[rgb(59,130,246)] hover:text-white transition-all duration-200 hover:-translate-y-1"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-[rgb(38,40,42)] flex items-center justify-center text-[rgb(161,161,170)] hover:bg-[rgb(59,130,246)] hover:text-white transition-all duration-200 hover:-translate-y-1"
              >
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h3 className="text-white font-semibold mb-4">Ürün</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-[rgb(161,161,170)] hover:text-[rgb(59,130,246)] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Şirket</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-[rgb(161,161,170)] hover:text-[rgb(59,130,246)] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Kaynaklar</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-[rgb(161,161,170)] hover:text-[rgb(59,130,246)] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[rgba(255,255,255,0.1)] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-[rgb(161,161,170)] text-sm">
              © 2025 MuyaSoft AI. Tüm hakları saklıdır.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-[rgb(161,161,170)] hover:text-[rgb(59,130,246)] transition-colors duration-200 text-sm">
                Gizlilik Politikası
              </a>
              <a href="#" className="text-[rgb(161,161,170)] hover:text-[rgb(59,130,246)] transition-colors duration-200 text-sm">
                Kullanım Şartları
              </a>
              <a href="#" className="text-[rgb(161,161,170)] hover:text-[rgb(59,130,246)] transition-colors duration-200 text-sm">
                Çerez Politikası
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;