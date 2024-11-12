import React from 'react';
import { CreditCard, DollarSign, FileText, AlertCircle } from 'lucide-react';

const loanTypes = [
  {
    title: 'Crop Loan',
    description: 'Short-term loan for seasonal agricultural operations',
    interest: '7%',
    maxAmount: '₹500,000',
  },
  {
    title: 'Equipment Financing',
    description: 'Long-term loan for agricultural machinery and equipment',
    interest: '8.5%',
    maxAmount: '₹2,000,000',
  },
  {
    title: 'Land Development',
    description: 'Loan for land improvement and development activities',
    interest: '9%',
    maxAmount: '₹1,500,000',
  },
];

export default function Loans() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Agricultural Loans</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loanTypes.map((loan) => (
          <div key={loan.title} className="bg-white rounded-xl shadow-sm p-6">
            <DollarSign className="h-8 w-8 text-green-600" />
            <h3 className="text-lg font-semibold mt-4">{loan.title}</h3>
            <p className="text-gray-600 mt-2">{loan.description}</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Interest Rate</span>
                <span className="font-semibold">{loan.interest}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Maximum Amount</span>
                <span className="font-semibold">{loan.maxAmount}</span>
              </div>
            </div>
            <button className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
              Apply Now
            </button>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Active Loans</h3>
          <div className="space-y-4">
            {[
              { name: 'Crop Loan #123', amount: '₹200,000', status: 'Active' },
              { name: 'Equipment Loan #456', amount: '₹800,000', status: 'Processing' },
            ].map((loan) => (
              <div key={loan.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">{loan.name}</p>
                  <p className="text-gray-600">{loan.amount}</p>
                </div>
                <span className={`px-2 py-1 rounded ${
                  loan.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {loan.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Required Documents</h3>
          <div className="space-y-4">
            {[
              'Land ownership documents',
              'Income proof / Bank statements',
              'Identity proof',
              'Address proof',
            ].map((doc) => (
              <div key={doc} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="h-5 w-5 text-gray-600" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}