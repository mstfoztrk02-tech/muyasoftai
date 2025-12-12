import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Network,
  Phone,
  Target,
  Shield,
  CreditCard,
  Key,
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/crm' },
    { icon: Network, label: 'Trunk Yönetimi', path: '/crm/trunks' },
    { icon: Phone, label: 'Çağrı Kayıtları', path: '/crm/calls' },
    { icon: Target, label: 'Kampanyalar', path: '/crm/campaigns' },
    { icon: Shield, label: 'Spam & Risk', path: '/crm/spam' },
    { icon: CreditCard, label: 'Kredi & Bakiye', path: '/crm/credits' },
    { icon: Key, label: 'API Anahtarları', path: '/crm/api-keys' },
    { icon: Settings, label: 'Ayarlar', path: '/crm/settings' }
  ];

  return (
    <div className="w-64 bg-[rgb(26,28,30)] border-r border-[rgba(255,255,255,0.1)] h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[rgba(255,255,255,0.1)]">
        <Link to="/" className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
          <img 
            src="https://customer-assets.emergentagent.com/job_fa8c4ac4-8ad1-4ccf-bde7-b1396ba926d7/artifacts/ey1jv1jt_image.png" 
            alt="MuyaSoft" 
            className="h-10 w-auto"
          />
          <div>
            <div className="text-white font-bold text-lg">MuyaSoft</div>
            <div className="text-[rgb(161,161,170)] text-xs animate-pulse">ÖRNEK CRM PANELİ</div>
          </div>
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'text-[rgb(161,161,170)] hover:bg-[rgb(38,40,42)] hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.1)]">
        <Link 
          to="/"
          className="flex items-center space-x-3 px-4 py-3 rounded-xl text-[rgb(161,161,170)] hover:bg-[rgb(38,40,42)] hover:text-red-400 transition-all duration-200 w-full"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Çıkış Yap</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;