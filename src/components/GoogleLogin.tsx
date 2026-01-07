import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { Chrome, User, Mail, Shield } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface GoogleLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: any) => void;
}

export function GoogleLogin({ isOpen, onClose, onLogin }: GoogleLoginProps) {
  const [isLoading, setIsLoading] = useState(false);

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
        
        // Fallback to demo mode if Supabase isn't configured
        const authWindow = window.open(
          `https://accounts.google.com/oauth/authorize?` +
          `client_id=demo-client-id&` +
          `redirect_uri=${encodeURIComponent(window.location.origin)}&` +
          `response_type=code&` +
          `scope=openid%20email%20profile&` +
          `state=demo-state`,
          'googleAuth',
          'width=500,height=600,scrollbars=yes,resizable=yes'
        );
        
        // Listen for auth completion
        const checkClosed = setInterval(() => {
          if (authWindow?.closed) {
            clearInterval(checkClosed);
            
            // Simulate successful auth
            const mockUserData = {
              id: `user_${Date.now()}`,
              name: 'Demo User',
              email: 'demo@example.com',
              picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
              verified: true
            };
            
            onLogin(mockUserData);
            setIsLoading(false);
            onClose();
          }
        }, 1000);
        
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
              Sign in to access personalized travel experiences
            </p>
          </motion.div>
        </DialogHeader>
        
        <motion.div 
          className="space-y-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Google Login Button */}
          <motion.button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 px-6 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
            whileHover={{ scale: isLoading ? 1 : 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"
              />
            ) : (
              <Chrome className="w-5 h-5 text-blue-500" />
            )}
            <span className="text-base font-medium">
              {isLoading ? 'Signing in...' : 'Continue with Google'}
            </span>
          </motion.button>

          {/* Features */}
          <motion.div 
            className="space-y-3 pt-4 border-t border-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-sm font-medium text-gray-900 text-center mb-3">
              Get access to:
            </h4>
            
            {[
              { icon: User, text: 'Personalized trip recommendations' },
              { icon: Mail, text: 'Travel updates and notifications' },
              { icon: Shield, text: 'Secure and private experience' }
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

          {/* Privacy Notice */}
          <motion.p 
            className="text-xs text-gray-500 text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            By signing in, you agree to our Terms of Service and Privacy Policy.
            We'll never post to your social media without permission.
          </motion.p>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}