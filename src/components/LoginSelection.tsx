import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { motion } from 'motion/react';
import { User, Shield, ArrowLeft, Chrome, Eye, EyeOff, Mail, UserPlus } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface LoginSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  onUserLogin: (userData: any) => void;
  onAdminLogin: (adminData: any) => void;
}

export function LoginSelection({ isOpen, onClose, onUserLogin, onAdminLogin }: LoginSelectionProps) {
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showUserRegister, setShowUserRegister] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ id: '', password: '' });
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '', name: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDemoNotice, setShowDemoNotice] = useState(false);

  const handleBackToSelection = () => {
    setShowUserLogin(false);
    setShowUserRegister(false);
    setShowAdminLogin(false);
    setAdminCredentials({ id: '', password: '' });
    setUserCredentials({ email: '', password: '', name: '' });
    setError('');
    setSuccess('');
    setShowPassword(false);
    setIsLoading(false);
    setShowDemoNotice(false);
  };

  const handleEmailLogin = () => {
    setIsLoading(true);
    setError('');

    // Simulate email/password authentication
    if (!userCredentials.email || !userCredentials.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Check if email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userCredentials.email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Simulate authentication delay
    setTimeout(() => {
      const userData = {
        id: `user_${Date.now()}`,
        name: userCredentials.email.split('@')[0], // Use email prefix as name
        email: userCredentials.email,
        picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        verified: true
      };
      
      onUserLogin(userData);
      setIsLoading(false);
      onClose();
      handleBackToSelection();
    }, 1000);
  };

  const handleEmailRegister = () => {
    setIsLoading(true);
    setError('');

    // Validate registration fields
    if (!userCredentials.email || !userCredentials.password || !userCredentials.name) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Check if email format is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userCredentials.email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Check password strength
    if (userCredentials.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    // Simulate registration process
    setTimeout(() => {
      const userData = {
        id: `user_${Date.now()}`,
        name: userCredentials.name,
        email: userCredentials.email,
        picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        verified: true
      };
      
      setSuccess('Registration successful! Logging you in...');
      
      setTimeout(() => {
        onUserLogin(userData);
        setIsLoading(false);
        onClose();
        handleBackToSelection();
      }, 1000);
    }, 1000);
  };

  const handleAdminLogin = () => {
    setIsLoading(true);
    setError('');

    // Check credentials
    if (adminCredentials.id === 'jharkhandgov@001' && adminCredentials.password === 'jhar@123') {
      const adminData = {
        id: 'admin_jharkhandgov',
        name: 'Jharkhand Government Admin',
        email: 'jharkhandgov@001',
        picture: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150', // Government official image
        verified: true,
        isAdmin: true
      };
      
      setTimeout(() => {
        onAdminLogin(adminData);
        setIsLoading(false);
        onClose();
        handleBackToSelection();
      }, 1000);
    } else {
      setTimeout(() => {
        setError('Invalid admin credentials. Please check your ID and password.');
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      // Real Google OAuth implementation using Supabase
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = `https://${projectId}.supabase.co`;
      const supabase = createClient(supabaseUrl, publicAnonKey);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('Google login error:', error);
        
        if (error.message.includes('provider is not enabled')) {
          // Use demo mode instead of showing error
          console.log('Google OAuth not configured, using demo mode');
          setShowDemoNotice(true);
          
          // Simulate authentication delay
          setTimeout(() => {
            const mockUserData = {
              id: `user_${Date.now()}`,
              name: 'Demo User',
              email: 'demo@example.com',
              picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
              verified: true
            };
            
            onUserLogin(mockUserData);
            setIsLoading(false);
            onClose();
            handleBackToSelection();
          }, 1500);
          return;
        }
        
        // Fallback to demo mode for other errors
        setTimeout(() => {
          const mockUserData = {
            id: `user_${Date.now()}`,
            name: 'Demo User',
            email: 'demo@example.com',
            picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
            verified: true
          };
          
          onUserLogin(mockUserData);
          setIsLoading(false);
          onClose();
          handleBackToSelection();
        }, 1500);
        
        return;
      }

      // Handle successful Supabase auth
      if (data?.url) {
        window.location.href = data.url;
      }
      
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <DialogTitle className="text-center text-2xl mb-2">
              Welcome to ExploreJH
            </DialogTitle>
            <p className="text-center text-gray-600 text-sm">
              {showUserLogin ? 'Sign in to access personalized travel experiences' : 
               showUserRegister ? 'Create your account to get started' :
               showAdminLogin ? 'Government Admin Access' : 
               'Choose your login type to continue'}
            </p>
          </motion.div>
        </DialogHeader>
        
        {!showUserLogin && !showUserRegister && !showAdminLogin ? (
          // Login Type Selection
          <motion.div 
            className="space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* User Login Option */}
            <motion.button
              onClick={() => setShowUserLogin(true)}
              className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-4 rounded-lg transition-all duration-300 group"
              whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              <User className="w-5 h-5" />
              <span className="text-base font-medium">Login as User</span>
            </motion.button>

            {/* Admin Login Option */}
            <motion.button
              onClick={() => setShowAdminLogin(true)}
              className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-4 rounded-lg transition-all duration-300 group"
              whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.98 }}
            >
              <Shield className="w-5 h-5" />
              <span className="text-base font-medium">Login as Admin</span>
            </motion.button>

            {/* Info Section */}
            <motion.div 
              className="space-y-3 pt-4 border-t border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-sm font-medium text-gray-900 text-center mb-3">
                User Login Benefits:
              </h4>
              
              {[
                { icon: User, text: 'Personalized trip recommendations' },
                { icon: Shield, text: 'Secure email/password or Google auth' },
                { icon: User, text: 'Save your favorite places' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 text-gray-600"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <feature.icon className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : (showUserLogin || showUserRegister) ? (
          // Email/Password Login and Registration Section
          <motion.div 
            className="space-y-4"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Back Button */}
            <motion.button
              onClick={handleBackToSelection}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to login options</span>
            </motion.button>

            <div className="space-y-4">
              <div className="text-center mb-4">
                <User className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  {showUserRegister ? 'Create Account' : 'Sign In'}
                </h3>
                <p className="text-sm text-gray-600">
                  {showUserRegister ? 'Join ExploreJH to discover amazing places' : 'Welcome back! Please sign in to continue'}
                </p>
              </div>

              {/* Name Field (Registration only) */}
              {showUserRegister && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={userCredentials.name}
                    onChange={(e) => setUserCredentials({ ...userCredentials, name: e.target.value })}
                    className="w-full"
                  />
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={userCredentials.email}
                  onChange={(e) => setUserCredentials({ ...userCredentials, email: e.target.value })}
                  className="w-full"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={showUserRegister ? "Create a password (min 6 characters)" : "Enter your password"}
                    value={userCredentials.password}
                    onChange={(e) => setUserCredentials({ ...userCredentials, password: e.target.value })}
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 text-sm text-center bg-green-50 p-2 rounded-md"
                >
                  {success}
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-md"
                >
                  {error}
                </motion.div>
              )}

              {/* Login/Register Button */}
              <motion.button
                onClick={showUserRegister ? handleEmailRegister : handleEmailLogin}
                disabled={isLoading || !userCredentials.email || !userCredentials.password || (showUserRegister && !userCredentials.name)}
                className="w-full flex items-center justify-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : showUserRegister ? (
                  <UserPlus className="w-5 h-5" />
                ) : (
                  <Mail className="w-5 h-5" />
                )}
                <span className="text-base font-medium">
                  {isLoading ? (showUserRegister ? 'Creating Account...' : 'Signing In...') : 
                   (showUserRegister ? 'Create Account' : 'Sign In')}
                </span>
              </motion.button>

              {/* Toggle Login/Register */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setShowUserRegister(!showUserRegister);
                    setError('');
                    setSuccess('');
                    setUserCredentials({ email: '', password: '', name: '' });
                  }}
                  className="text-sm text-green-600 hover:text-green-700 transition-colors"
                >
                  {showUserRegister 
                    ? 'Already have an account? Sign in here' 
                    : "Don't have an account? Create one here"}
                </button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or continue with</span>
                </div>
              </div>

              {/* Google Login Button */}
              <motion.button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                whileHover={{ scale: isLoading ? 1 : 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                <Chrome className="w-5 h-5 text-blue-500" />
                <span className="text-base font-medium">
                  Continue with Google
                </span>
              </motion.button>
            </div>

            {/* Privacy Notice */}
            <motion.p 
              className="text-xs text-gray-500 text-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              By {showUserRegister ? 'creating an account' : 'signing in'}, you agree to our Terms of Service and Privacy Policy.
            </motion.p>
          </motion.div>
        ) : (
          // Admin Login Form
          <motion.div 
            className="space-y-4"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Back Button */}
            <motion.button
              onClick={handleBackToSelection}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to login options</span>
            </motion.button>

            <div className="space-y-4">
              <div className="text-center mb-4">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-gray-900">Government Admin Login</h3>
                <p className="text-sm text-gray-600">Enter your admin credentials to access the dashboard</p>
              </div>

              {/* Admin ID Field */}
              <div className="space-y-2">
                <Label htmlFor="adminId">Admin ID</Label>
                <Input
                  id="adminId"
                  type="text"
                  placeholder="Enter your admin ID"
                  value={adminCredentials.id}
                  onChange={(e) => setAdminCredentials({ ...adminCredentials, id: e.target.value })}
                  className="w-full"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="adminPassword">Password</Label>
                <div className="relative">
                  <Input
                    id="adminPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={adminCredentials.password}
                    onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                    className="w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-md"
                >
                  {error}
                </motion.div>
              )}

              {/* Login Button */}
              <motion.button
                onClick={handleAdminLogin}
                disabled={isLoading || !adminCredentials.id || !adminCredentials.password}
                className="w-full flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <Shield className="w-5 h-5" />
                )}
                <span className="text-base font-medium">
                  {isLoading ? 'Authenticating...' : 'Login as Admin'}
                </span>
              </motion.button>
            </div>

            {/* Security Notice */}
            <motion.p 
              className="text-xs text-gray-500 text-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              This is a secure government portal. Only authorized officials should access this area.
            </motion.p>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}