import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Car, 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Edit, 
  LogOut, 
  Bell, 
  CheckCircle, 
  XCircle,
  Package,
  Route,
  Award,
  BarChart3,
  Settings,
  TreePine,
  Leaf
} from 'lucide-react';

interface PartnerDashboardProps {
  partnerData: {
    email: string;
    name: string;
    id: string;
    type: 'driver' | 'guide' | 'artisan';
  };
  onLogout: () => void;
}

const partnerConfig = {
  driver: {
    title: 'Driver Dashboard',
    icon: Car,
    gradient: 'from-blue-500 to-blue-700',
    bgColor: 'bg-blue-50',
    metrics: [
      { label: 'Total Rides', value: '156', icon: Route },
      { label: 'This Month', value: '23', icon: Calendar },
      { label: 'Rating', value: '4.8', icon: Star },
      { label: 'Earnings', value: '₹45,600', icon: DollarSign }
    ]
  },
  guide: {
    title: 'Guide Dashboard',
    icon: Users,
    gradient: 'from-green-500 to-green-700',
    bgColor: 'bg-green-50',
    metrics: [
      { label: 'Tours Completed', value: '89', icon: MapPin },
      { label: 'This Month', value: '12', icon: Calendar },
      { label: 'Rating', value: '4.9', icon: Star },
      { label: 'Earnings', value: '₹32,400', icon: DollarSign }
    ]
  },
  artisan: {
    title: 'Artisan Dashboard',
    icon: ShoppingBag,
    gradient: 'from-orange-500 to-orange-700',
    bgColor: 'bg-orange-50',
    metrics: [
      { label: 'Products Sold', value: '234', icon: Package },
      { label: 'This Month', value: '34', icon: Calendar },
      { label: 'Rating', value: '4.7', icon: Star },
      { label: 'Earnings', value: '₹67,800', icon: DollarSign }
    ]
  }
};

const mockBookings = {
  driver: [
    { id: 'B001', customer: 'Amit Sharma', pickup: 'Ranchi Airport', destination: 'Hotel Radisson', date: '2025-01-20', status: 'completed', amount: '₹850' },
    { id: 'B002', customer: 'Priya Singh', pickup: 'Hotel Capitol Hill', destination: 'Jagannath Temple', date: '2025-01-21', status: 'upcoming', amount: '₹400' },
    { id: 'B003', customer: 'Rajesh Kumar', pickup: 'Ranchi Station', destination: 'Hundru Falls', date: '2025-01-22', status: 'upcoming', amount: '₹1200' }
  ],
  guide: [
    { id: 'T001', customer: 'Delhi Group (8 people)', location: 'Netarhat Hill Station', date: '2025-01-20', status: 'completed', amount: '₹3200' },
    { id: 'T002', customer: 'Mumbai Family', location: 'Betla National Park', date: '2025-01-21', status: 'upcoming', amount: '₹2800' },
    { id: 'T003', customer: 'Bangalore Couple', location: 'Jonha Falls', date: '2025-01-23', status: 'upcoming', amount: '₹1500' }
  ],
  artisan: [
    { id: 'O001', customer: 'Tourist from Kolkata', product: 'Dokra Horse Figurine', date: '2025-01-19', status: 'delivered', amount: '₹1200' },
    { id: 'O002', customer: 'International Buyer', product: 'Tribal Necklace Set', date: '2025-01-20', status: 'shipped', amount: '₹2400' },
    { id: 'O003', customer: 'Local Customer', product: 'Bamboo Craft Items', date: '2025-01-21', status: 'processing', amount: '₹800' }
  ]
};

export function PartnerDashboard({ partnerData, onLogout }: PartnerDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const config = partnerConfig[partnerData.type];
  const Icon = config.icon;
  const bookings = mockBookings[partnerData.type];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'upcoming':
      case 'shipped':
        return <Clock className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      default:
        return <XCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className={`min-h-screen ${config.bgColor}`}>
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`bg-gradient-to-r ${config.gradient} w-12 h-12 rounded-full flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl">{config.title}</h1>
                  <p className="text-gray-600 text-sm">Welcome back, {partnerData.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={onLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookings">
                {partnerData.type === 'driver' ? 'Rides' : partnerData.type === 'guide' ? 'Tours' : 'Orders'}
              </TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {config.metrics.map((metric, index) => {
                  const MetricIcon = metric.icon;
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                            <p className="text-2xl">{metric.value}</p>
                          </div>
                          <MetricIcon className={`w-8 h-8 text-${partnerData.type === 'driver' ? 'blue' : partnerData.type === 'guide' ? 'green' : 'orange'}-600`} />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Recent Activity */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {bookings.slice(0, 3).map((booking, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(booking.status)}
                          <div>
                            <p className="font-medium">{booking.customer}</p>
                            <p className="text-sm text-gray-600">
                              {partnerData.type === 'driver' 
                                ? `${booking.pickup} → ${booking.destination}`
                                : partnerData.type === 'guide'
                                ? booking.location
                                : booking.product}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                          <p className="text-sm mt-1">{booking.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg">
                      {partnerData.type === 'driver' ? 'Your Rides' : partnerData.type === 'guide' ? 'Your Tours' : 'Your Orders'}
                    </h3>
                    <Button size="sm" className={`bg-gradient-to-r ${config.gradient}`}>
                      {partnerData.type === 'driver' ? 'New Ride' : partnerData.type === 'guide' ? 'New Tour' : 'Add Product'}
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {bookings.map((booking, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="font-medium text-gray-900">#{booking.id}</span>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </div>
                          <span className="font-medium text-green-600">{booking.amount}</span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p><strong>Customer:</strong> {booking.customer}</p>
                          <p><strong>Date:</strong> {booking.date}</p>
                          {partnerData.type === 'driver' && (
                            <p><strong>Route:</strong> {booking.pickup} → {booking.destination}</p>
                          )}
                          {partnerData.type === 'guide' && (
                            <p><strong>Location:</strong> {booking.location}</p>
                          )}
                          {partnerData.type === 'artisan' && (
                            <p><strong>Product:</strong> {booking.product}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="earnings" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">Today's Earnings</p>
                    <p className="text-2xl">₹2,400</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">This Week</p>
                    <p className="text-2xl">₹14,200</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1">This Month</p>
                    <p className="text-2xl">₹45,600</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg mb-4">Payment History</h3>
                  <div className="space-y-3">
                    {[
                      { date: '2025-01-20', amount: '₹2,400', status: 'Completed' },
                      { date: '2025-01-19', amount: '₹1,800', status: 'Completed' },
                      { date: '2025-01-18', amount: '₹3,200', status: 'Completed' },
                      { date: '2025-01-17', amount: '₹1,600', status: 'Pending' }
                    ].map((payment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{payment.date}</p>
                          <p className="text-sm text-gray-600">{payment.status}</p>
                        </div>
                        <p className="font-medium text-green-600">{payment.amount}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg">Profile Information</h3>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                          <AvatarFallback className={`bg-gradient-to-r ${config.gradient} text-white text-lg`}>
                            {partnerData.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{partnerData.name}</p>
                          <p className="text-sm text-gray-600">Partner ID: {partnerData.id}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{partnerData.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">+91 98765 43210</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">Ranchi, Jharkhand</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg mb-4">Performance Metrics</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Overall Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">4.8</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Completion Rate</span>
                        <span className="font-medium">98%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Response Time</span>
                        <span className="font-medium">&lt; 5 min</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Member Since</span>
                        <span className="font-medium">Jan 2024</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center space-x-2 text-green-600">
                        <Award className="w-4 h-4" />
                        <span className="text-sm font-medium">Top Performer Badge</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}