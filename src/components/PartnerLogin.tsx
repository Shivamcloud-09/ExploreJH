import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  ArrowLeft, 
  Car, 
  Users, 
  ShoppingBag, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  TreePine,
  Leaf
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PartnerLoginProps {
  partnerType: 'driver' | 'guide' | 'artisan';
  onBack: () => void;
  onLogin: (partnerType: 'driver' | 'guide' | 'artisan', userData: any) => void;
  onRegister: (partnerType: 'driver' | 'guide' | 'artisan') => void;
}

const partnerConfig = {
  driver: {
    title: 'Driver Login',
    icon: Car,
    description: 'Welcome back, Driver Partner!',
    gradient: 'from-blue-500 to-blue-700',
    bgColor: 'bg-blue-50'
  },
  guide: {
    title: 'Guide Login',
    icon: Users,
    description: 'Welcome back, Tour Guide!',
    gradient: 'from-green-500 to-green-700',
    bgColor: 'bg-green-50'
  },
  artisan: {
    title: 'Artisan Login',
    icon: ShoppingBag,
    description: 'Welcome back, Artisan Partner!',
    gradient: 'from-orange-500 to-orange-700',
    bgColor: 'bg-orange-50'
  }
};

// Mock user data for demo
const mockUsers = {
  driver: {
    'driver@test.com': { password: 'driver123', name: 'Rajesh Kumar', id: 'DRV001' },
    'driver.demo@explorejh.com': { password: 'demo123', name: 'Demo Driver', id: 'DRV002' }
  },
  guide: {
    'guide@test.com': { password: 'guide123', name: 'Priya Sharma', id: 'GUD001' },
    'guide.demo@explorejh.com': { password: 'demo123', name: 'Demo Guide', id: 'GUD002' }
  },
  artisan: {
    'artisan@test.com': { password: 'artisan123', name: 'Mukesh Singh', id: 'ART001' },
    'artisan.demo@explorejh.com': { password: 'demo123', name: 'Demo Artisan', id: 'ART002' }
  }
};

export function PartnerLogin({ partnerType, onBack, onLogin, onRegister }: PartnerLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const config = partnerConfig[partnerType];
  const Icon = config.icon;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const users = mockUsers[partnerType];
    const user = users[email as keyof typeof users];

    if (user && user.password === password) {
      toast.success(`Welcome back, ${user.name}!`);
      onLogin(partnerType, { 
        email, 
        name: user.name, 
        id: user.id, 
        type: partnerType 
      });
    } else {
      toast.error('Invalid email or password. Try demo credentials.');
    }

    setIsLoading(false);
  };

  const handleDemoLogin = () => {
    const demoEmail = `${partnerType}.demo@explorejh.com`;
    setEmail(demoEmail);
    setPassword('demo123');
    toast.success('Demo credentials filled! Click Login to continue.');
  };

  return (
    <div className={`min-h-screen ${config.bgColor} flex items-center justify-center py-16`}>
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            {i % 2 === 0 ? (
              <TreePine className="w-4 h-4 text-gray-300 opacity-30" />
            ) : (
              <Leaf className="w-3 h-3 text-gray-400 opacity-40" />
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Partner Selection</span>
        </Button>

        <Card className="shadow-2xl border-0 overflow-hidden">
          {/* Header */}
          <div className={`bg-gradient-to-r ${config.gradient} p-6 text-center`}>
            <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon className={`w-8 h-8 text-${partnerType === 'driver' ? 'blue' : partnerType === 'guide' ? 'green' : 'orange'}-600`} />
            </div>
            <h1 className="text-2xl text-white mb-2">{config.title}</h1>
            <p className="text-white opacity-90 text-sm">{config.description}</p>
          </div>

          <CardContent className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="password" className="flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Password</span>
                </Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className={`text-${partnerType === 'driver' ? 'blue' : partnerType === 'guide' ? 'green' : 'orange'}-600 hover:underline`}>
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r ${config.gradient} hover:opacity-90 text-white border-0`}
              >
                {isLoading ? 'Signing in...' : 'Login'}
              </Button>
            </form>

            {/* Demo Login */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center mb-4">
                <span className="text-sm text-gray-500">Want to try demo?</span>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={handleDemoLogin}
                className="w-full"
              >
                Use Demo Credentials
              </Button>
            </div>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                New partner?{' '}
                <button
                  type="button"
                  onClick={() => onRegister(partnerType)}
                  className={`text-${partnerType === 'driver' ? 'blue' : partnerType === 'guide' ? 'green' : 'orange'}-600 hover:underline font-medium`}
                >
                  Register here
                </button>
              </p>
            </div>

            {/* Demo Credentials Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm mb-2 text-gray-700">Demo Credentials:</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <div>Email: {partnerType}.demo@explorejh.com</div>
                <div>Password: demo123</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}