import React from 'react';
import { Menu, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { logout, user } = useAuth();

  return (
    <nav className="bg-white shadow-sm h-16">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold text-green-600">AgroManage</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="h-5 w-5" />
          </button>
          <span className="text-gray-600">{user?.username}</span>
          <button 
            onClick={logout}
            className="p-2 hover:bg-gray-100 rounded-lg text-red-600"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}