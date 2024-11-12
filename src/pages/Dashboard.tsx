import React from 'react';
import { Sprout, Droplets, CloudRain, CreditCard } from 'lucide-react';

const stats = [
  { icon: Sprout, label: 'Total Products', value: '2,345', change: '+12%' },
  { icon: Droplets, label: 'Active Loans', value: '₹12.4M', change: '+5%' },
  { icon: CloudRain, label: 'Weather Alerts', value: '3', change: 'Active' },
  { icon: CreditCard, label: 'Monthly Revenue', value: '₹1.2M', change: '+8%' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ icon: Icon, label, value, change }) => (
          <div key={label} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-green-50 rounded-lg">
                <Icon className="h-6 w-6 text-green-600" />
              </div>
              <span className={`text-sm ${
                change.includes('+') ? 'text-green-600' : 'text-blue-600'
              }`}>
                {change}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-gray-900">{value}</h2>
            <p className="text-gray-600">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Products</h2>
          <div className="space-y-4">
            {['Organic Fertilizer', 'Neem Pesticide', 'Hybrid Seeds'].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span>{item}</span>
                <span className="text-green-600">In Stock</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Loans</h2>
          <div className="space-y-4">
            {[
              { name: 'Farmer Support Loan', amount: '₹50,000' },
              { name: 'Equipment Finance', amount: '₹1,20,000' },
              { name: 'Crop Insurance', amount: '₹25,000' },
            ].map((loan) => (
              <div key={loan.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span>{loan.name}</span>
                <span className="font-semibold">{loan.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}