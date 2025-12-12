import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Özellikler', href: '#features' },
    { label: 'Mimari', href: '#architecture' },
    { label: 'Kullanım Alanları', href: '#use-cases' },
    { label: 'Paketler', href: '#packages' },
    { label: 'SSS', href: '#faq' },
    { label: 'İletişim', href: '#contact' },
    { label: 'CRM Panel', href: '/crm', isLink: true }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[rgb(17,17,19)]/95 backdrop-blur-lg border-b border-[rgb(63,63,63)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
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

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              item.isLink ? (
                <a
                  key={index}
                  href={item.href}
                  className="text-white bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 transition-all duration-200 text-sm font-semibold px-4 py-2 rounded-lg border border-purple-500 animate-slow-pulse shadow-lg shadow-purple-500/50"
                >
                  {item.label}
                </a>
              ) : (
                <a
                  key={index}
                  href={item.href}
                  className="text-[rgb(218,218,218)] hover:text-[rgb(59,130,246)] transition-colors duration-200 text-sm font-medium"
                >
                  {item.label}
                </a>
              )
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              className="bg-[rgb(59,130,246)] hover:bg-[rgb(37,99,235)] text-white font-semibold px-6 py-2 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Demo Talep Et
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            {menuItems.map((item, index) => (
              item.isLink ? (
                <a
                  key={index}
                  href={item.href}
                  className="block text-white bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 transition-all duration-200 text-sm font-semibold px-4 py-3 rounded-lg border border-purple-500 animate-slow-pulse shadow-lg shadow-purple-500/50 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <a
                  key={index}
                  href={item.href}
                  className="block text-[rgb(218,218,218)] hover:text-[rgb(59,130,246)] transition-colors duration-200 text-sm font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              )
            ))}
            <Button
              className="w-full bg-[rgb(59,130,246)] hover:bg-[rgb(37,99,235)] text-white font-semibold px-6 py-2 rounded-xl"
              onClick={() => {
                setIsMobileMenuOpen(false);
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Demo Talep Et
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;