import React from 'react';
import { Card, CardContent } from '../ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, subtitle, trend, trendValue, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    teal: 'from-teal-500 to-teal-600',
    red: 'from-red-500 to-red-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <Card className="bg-[rgb(26,28,30)] border-[rgba(255,255,255,0.1)] hover:border-blue-500/50 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}>
                <Icon className="text-white" size={24} />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{value}</div>
            <div className="text-sm text-[rgb(161,161,170)]">{title}</div>
            {subtitle && (
              <div className="text-xs text-[rgb(161,161,170)] mt-1">{subtitle}</div>
            )}
          </div>
          {trend && (
            <div className={`flex items-center space-x-1 ${
              trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              <span className="text-sm font-medium">{trendValue}%</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;