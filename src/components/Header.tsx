import React, { useState } from 'react';
import { Button } from './ui/button';

import { 
  TreePine, 
  Leaf,
  User, 
  LogOut, 
  MapPin, 
  ShoppingBag, 
  Calendar, 
  MessageSquare, 
  Users,
  Bot,
  Route,
  Map,
  Shield
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { PageSection } from './Homepage';
import { motion } from 'motion/react';
import { LoginSelection } from './LoginSelection';
import { useAuth } from './AuthProvider';

interface HeaderProps {
  activeSection: PageSection;
  setActiveSection: (section: PageSection) => void;
}

export function Header({ activeSection, setActiveSection }: HeaderProps) {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { user, login, logout } = useAuth();

  const handleUserLogin = (userData: any) => {
    login(userData);
  };

  const handleAdminLogin = (adminData: any) => {
    login(adminData);
    // Automatically navigate to gov dashboard after admin login
    setActiveSection('gov-dashboard');
  };

  const handleLogout = () => {
    logout();
  };



  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setActiveSection('home')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <motion.div 
                  className="bg-green-600 p-2 rounded-full"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <TreePine className="w-8 h-8 text-white" />
                </motion.div>
                <motion.div 
                  className="absolute -top-1 -right-1 bg-yellow-400 p-1 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Leaf className="w-3 h-3 text-green-800" />
                </motion.div>
              </div>
              <div>
                <motion.span 
                  className="text-2xl bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  ExploreJH
                </motion.span>
                <motion.p 
                  className="text-xs text-green-600 -mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Smart Tourism
                </motion.p>
              </div>
            </motion.div>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-4 ml-4">
              {[
                { section: 'explore', icon: MapPin, label: 'Explore Places' },
                { section: 'marketplace', icon: ShoppingBag, label: 'Marketplace' },
                { section: 'cultural', icon: Calendar, label: 'Cultural Experience' },
                { section: 'feedback', icon: MessageSquare, label: 'Feedback' }
              ].map((item, index) => (
                <motion.div
                  key={item.section}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.button
                    onClick={() => setActiveSection(item.section as PageSection)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                      activeSection === item.section 
                        ? 'bg-green-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      animate={activeSection === item.section ? { rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon className="w-4 h-4" />
                    </motion.div>
                    <span>{item.label}</span>
                  </motion.button>
                </motion.div>
              ))}

              {/* Partner with us - Direct button without dropdown */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button
                  onClick={() => setActiveSection('partner-flow')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                    activeSection === 'partner-flow' 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={activeSection === 'partner-flow' ? { rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Users className="w-4 h-4" />
                  </motion.div>
                  <span>Partner with us</span>
                </motion.button>
              </motion.div>

              {/* My Trip - Show only for logged-in users */}
              {user && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    onClick={() => setActiveSection('my-trip')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                      activeSection === 'my-trip' 
                        ? 'bg-green-600 text-white' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      animate={activeSection === 'my-trip' ? { rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <Map className="w-4 h-4" />
                    </motion.div>
                    <span>My Trip</span>
                  </motion.button>
                </motion.div>
              )}

              {/* Additional Navigation */}
              <Button
                variant={activeSection === 'ai-chat' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('ai-chat')}
                className="flex items-center space-x-2 font-medium"
              >
                <Bot className="w-4 h-4" />
                <span>AI Travel Bot</span>
              </Button>

              <Button
                variant={activeSection === 'route-calculator' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('route-calculator')}
                className="flex items-center space-x-2 font-medium"
              >
                <Route className="w-4 h-4" />
                <span>Route Calculator</span>
              </Button>

              {user?.isAdmin && (
                <Button
                  variant={activeSection === 'gov-dashboard' ? 'default' : 'outline'}
                  onClick={() => setActiveSection('gov-dashboard')}
                  className="flex items-center space-x-2 font-medium border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                >
                  <Shield className="w-4 h-4" />
                  <span>Government Dashboard</span>
                </Button>
              )}
            </nav>

            {/* Login/User Menu */}
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {user ? (
                <motion.div 
                  className="flex items-center space-x-3"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-medium border-2 border-green-500"
                    whileHover={{ scale: 1.1 }}
                  >
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </motion.div>
                  <span className="text-sm">Welcome, {user?.name?.split(' ')[0] || 'User'}!</span>
                  <motion.button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-1 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </motion.button>
                </motion.div>
              ) : (
                <motion.button
                  onClick={() => setShowLoginDialog(true)}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </motion.button>
              )}
            </motion.div>
          </div>
        </div>
      </header>

      {/* Login Selection Component */}
      <LoginSelection
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onUserLogin={handleUserLogin}
        onAdminLogin={handleAdminLogin}
      />
    </>
  );
}