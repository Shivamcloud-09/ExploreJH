import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  MapPin, 
  Bus, 
  Shield, 
  MessageSquare,
  Download,
  Moon,
  Sun,
  Bell,
  Settings,
  Home,
  BarChart3,
  Car,
  UserCheck,
  AlertTriangle,
  FileText,
  Globe,
  TreePine,
  Leaf,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Filter,
  Search,
  Calendar,
  Activity,
  CreditCard,
  Star,
  ThumbsUp,
  ThumbsDown,
  LogOut
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useAuth } from './AuthProvider';

interface DashboardProps {
  onClose: () => void;
  onLogout?: () => void;
}

export function GovDashboard({ onClose, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [verificationFilter, setVerificationFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const [liveStats, setLiveStats] = useState({
    totalRevenue: 2847650,
    totalTourists: 15632,
    activeGuides: 342,
    sosAlerts: 3,
    feedbackScore: 4.6
  });

  const handleLogout = async () => {
    await logout();
    if (onLogout) {
      onLogout(); // Call the logout callback to redirect to landing page
    } else {
      onClose(); // Fallback to regular close
    }
  };

  // Mock real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 1000),
        totalTourists: prev.totalTourists + Math.floor(Math.random() * 10),
        feedbackScore: 4.2 + Math.random() * 0.8
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const revenueData = [
    { name: 'Jan', bookings: 450000, marketplace: 120000, transport: 80000 },
    { name: 'Feb', bookings: 520000, marketplace: 140000, transport: 95000 },
    { name: 'Mar', bookings: 680000, marketplace: 180000, transport: 110000 },
    { name: 'Apr', bookings: 750000, marketplace: 200000, transport: 125000 },
    { name: 'May', bookings: 890000, marketplace: 250000, transport: 140000 },
    { name: 'Jun', bookings: 920000, marketplace: 280000, transport: 155000 }
  ];

  const footfallData = [
    { location: 'Netarhat', current: 1250, capacity: 2000, trend: 15 },
    { location: 'Patratu', current: 890, capacity: 1500, trend: -5 },
    { location: 'Betla National Park', current: 2100, capacity: 3000, trend: 22 },
    { location: 'Deoghar', current: 1680, capacity: 2500, trend: 8 },
    { location: 'Ranchi', current: 3200, capacity: 4000, trend: 12 }
  ];

  const transportData = [
    { name: 'Eco Buses', value: 45, color: '#22c55e' },
    { name: 'E-Rickshaws', value: 28, color: '#3b82f6' },
    { name: 'Carpool', value: 18, color: '#f59e0b' },
    { name: 'Walking Tours', value: 9, color: '#8b5cf6' }
  ];

  const partnerMetrics = [
    { type: 'Guides', count: 342, rating: 4.7, growth: 12, verified: 318, pending: 24 },
    { type: 'Drivers', count: 156, rating: 4.5, growth: 8, verified: 142, pending: 14 },
    { type: 'Artisans', count: 89, rating: 4.8, growth: 15, verified: 78, pending: 11 },
    { type: 'Homestays', count: 67, rating: 4.6, growth: 20, verified: 61, pending: 6 }
  ];

  const safetyAlerts = [
    { id: 1, type: 'SOS', location: 'Betla Trail 3', status: 'resolved', time: '2 hours ago' },
    { id: 2, type: 'Weather', location: 'Netarhat Hills', status: 'active', time: '30 mins ago' },
    { id: 3, type: 'Maintenance', location: 'Patratu Dam', status: 'pending', time: '1 hour ago' }
  ];

  const aiInsights = [
    "Peak tourist season expected next month - recommend 25% increase in transport capacity",
    "Netarhat showing highest satisfaction scores - consider expanding facilities",
    "Weather conditions optimal for outdoor activities in next 7 days",
    "Marketplace sales trending 30% higher on weekends - adjust staffing"
  ];

  // Mock verification data
  const pendingVerifications = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      type: 'Tourist Guide',
      location: 'Ranchi',
      documents: ['Aadhar', 'Guide License', 'Police Verification'],
      submittedAt: '2 days ago',
      rating: null,
      experience: '5 years'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      type: 'Driver',
      location: 'Netarhat',
      documents: ['Driving License', 'Vehicle RC', 'Insurance'],
      submittedAt: '1 day ago',
      rating: null,
      experience: '3 years'
    },
    {
      id: 3,
      name: 'Amit Craftworks',
      type: 'Artisan',
      location: 'Deoghar',
      documents: ['Business License', 'Product Samples', 'Bank Details'],
      submittedAt: '3 hours ago',
      rating: null,
      experience: '8 years'
    }
  ];

  const verifiedPartners = [
    {
      id: 1,
      name: 'Suresh Gupta',
      type: 'Tourist Guide',
      location: 'Betla',
      verifiedAt: '1 week ago',
      rating: 4.8,
      totalBookings: 145,
      revenue: 45000,
      status: 'active'
    },
    {
      id: 2,
      name: 'Maya Singh',
      type: 'Driver',
      location: 'Ranchi',
      verifiedAt: '2 weeks ago',
      rating: 4.6,
      totalBookings: 89,
      revenue: 32000,
      status: 'active'
    }
  ];

  const liveTransactions = [
    {
      id: 1,
      type: 'Booking',
      user: 'Tourist A',
      partner: 'Suresh G.',
      amount: 2500,
      status: 'completed',
      time: '5 mins ago'
    },
    {
      id: 2,
      type: 'Purchase',
      user: 'Tourist B',
      partner: 'Maya Arts',
      amount: 1200,
      status: 'processing',
      time: '12 mins ago'
    },
    {
      id: 3,
      type: 'Transport',
      user: 'Tourist C',
      partner: 'Eco Rides',
      amount: 800,
      status: 'completed',
      time: '20 mins ago'
    }
  ];

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
    { id: 'footfall', label: 'Footfall', icon: Users },
    { id: 'transport', label: 'Transport', icon: Bus },
    { id: 'partners', label: 'Partners', icon: UserCheck },
    { id: 'verification', label: 'Verification', icon: Shield },
    { id: 'safety', label: 'Safety', icon: AlertTriangle },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden"
    >
      <Card className={`bg-gradient-to-br ${color} text-white border-0`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium opacity-90">{title}</CardTitle>
          <Icon className="h-4 w-4 opacity-90" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <div className="flex items-center space-x-1 text-xs opacity-90">
            {change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            <span>{Math.abs(change)}% from last month</span>
          </div>
        </CardContent>
        <div className="absolute -right-4 -bottom-4 opacity-20">
          <Icon className="h-16 w-16" />
        </div>
      </Card>
    </motion.div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Revenue"
          value={`₹${(liveStats.totalRevenue / 100000).toFixed(1)}L`}
          change={18}
          icon={DollarSign}
          color="from-green-600 to-green-700"
        />
        <StatCard
          title="Tourist Footfall"
          value={liveStats.totalTourists.toLocaleString()}
          change={12}
          icon={Users}
          color="from-blue-600 to-blue-700"
        />
        <StatCard
          title="Active Partners"
          value={liveStats.activeGuides}
          change={8}
          icon={UserCheck}
          color="from-purple-600 to-purple-700"
        />
        <StatCard
          title="SOS Alerts"
          value={liveStats.sosAlerts}
          change={-25}
          icon={AlertTriangle}
          color="from-red-600 to-red-700"
        />
        <StatCard
          title="Satisfaction Score"
          value={liveStats.feedbackScore.toFixed(1)}
          change={5}
          icon={MessageSquare}
          color="from-orange-600 to-orange-700"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <span>Revenue Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#22c55e" name="Bookings" />
                <Bar dataKey="marketplace" fill="#3b82f6" name="Marketplace" />
                <Bar dataKey="transport" fill="#f59e0b" name="Transport" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bus className="h-5 w-5 text-blue-600" />
              <span>Transport Usage</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={transportData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {transportData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {transportData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Footfall Monitor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-green-600" />
            <span>Live Tourist Footfall</span>
            <Badge variant="outline" className="ml-auto">Live</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {footfallData.map((location, index) => (
              <motion.div
                key={location.location}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium">{location.location}</div>
                  <div className="text-sm text-gray-600">
                    {location.current}/{location.capacity} capacity
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(location.current / location.capacity) * 100}%` }}
                    />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    location.trend > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {location.trend > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <span>{Math.abs(location.trend)}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights & Safety Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span>AI Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-600"
                >
                  <p className="text-sm text-gray-700">{insight}</p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-600" />
              <span>Safety Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {safetyAlerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={alert.status === 'active' ? 'destructive' : 
                                alert.status === 'pending' ? 'secondary' : 'outline'}
                      >
                        {alert.type}
                      </Badge>
                      <span className="text-sm font-medium">{alert.location}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
                  </div>
                  <Badge variant={
                    alert.status === 'resolved' ? 'outline' : 
                    alert.status === 'active' ? 'destructive' : 'secondary'
                  }>
                    {alert.status}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderFootfall = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Visitors Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">8,945</div>
            <p className="text-sm text-gray-600">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Peak Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">2-4 PM</div>
            <p className="text-sm text-gray-600">Highest footfall period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Capacity Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">67%</div>
            <p className="text-sm text-gray-600">Across all locations</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hourly Visitor Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={[
              { hour: '6 AM', visitors: 120 },
              { hour: '8 AM', visitors: 450 },
              { hour: '10 AM', visitors: 890 },
              { hour: '12 PM', visitors: 1200 },
              { hour: '2 PM', visitors: 1450 },
              { hour: '4 PM', visitors: 1380 },
              { hour: '6 PM', visitors: 980 },
              { hour: '8 PM', visitors: 540 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="visitors" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderVerification = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Partner Verification Center</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search partners..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
          </div>
          <Select value={verificationFilter} onValueChange={setVerificationFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending Verification ({pendingVerifications.length})</TabsTrigger>
          <TabsTrigger value="verified">Verified Partners ({verifiedPartners.length})</TabsTrigger>
          <TabsTrigger value="live-data">Live Transaction Data</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingVerifications.map((partner) => (
            <Card key={partner.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold">{partner.name}</h3>
                      <Badge variant="secondary">{partner.type}</Badge>
                      <Badge variant="outline">{partner.location}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Experience: {partner.experience} • Submitted: {partner.submittedAt}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Documents:</span>
                      {partner.documents.map((doc, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Review
                    </Button>
                    <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button variant="destructive" size="sm">
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="verified" className="space-y-4">
          {verifiedPartners.map((partner) => (
            <Card key={partner.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-semibold">{partner.name}</h3>
                      <Badge variant="default" className="bg-green-600">{partner.type}</Badge>
                      <Badge variant="outline">{partner.location}</Badge>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Rating: </span>
                        <span className="text-yellow-600">{partner.rating} ⭐</span>
                      </div>
                      <div>
                        <span className="font-medium">Bookings: </span>
                        <span>{partner.totalBookings}</span>
                      </div>
                      <div>
                        <span className="font-medium">Revenue: </span>
                        <span className="text-green-600">₹{partner.revenue.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="font-medium">Verified: </span>
                        <span>{partner.verifiedAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Activity className="h-4 w-4 mr-2" />
                      View Activity
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="live-data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-green-600" />
                <span>Live Transaction Feed</span>
                <Badge variant="outline">Live</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {liveTransactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4 text-blue-600" />
                        <Badge variant="outline">{transaction.type}</Badge>
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          {transaction.user} → {transaction.partner}
                        </div>
                        <div className="text-xs text-gray-600">{transaction.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-green-600">₹{transaction.amount}</span>
                      <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Transactions Today</span>
                    <span className="font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Volume</span>
                    <span className="font-semibold text-green-600">₹2,84,750</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Success Rate</span>
                    <span className="font-semibold">98.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Transaction</span>
                    <span className="font-semibold">₹2,285</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Partner Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Top Performer</span>
                    <span className="font-semibold">Suresh Gupta (Guide)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Most Bookings</span>
                    <span className="font-semibold">Maya Singh (Driver)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer Satisfaction</span>
                    <span className="font-semibold">4.7/5.0 ⭐</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response Time</span>
                    <span className="font-semibold">2.3 mins avg</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderRevenue = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">₹28.5L</div>
            <p className="text-sm text-gray-600">+18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bookings Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">₹19.2L</div>
            <p className="text-sm text-gray-600">67% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Marketplace Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">₹6.8L</div>
            <p className="text-sm text-gray-600">24% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Transport Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">₹2.5L</div>
            <p className="text-sm text-gray-600">9% of total</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="bookings" stroke="#22c55e" strokeWidth={3} />
              <Line type="monotone" dataKey="marketplace" stroke="#3b82f6" strokeWidth={3} />
              <Line type="monotone" dataKey="transport" stroke="#f59e0b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderTransport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Vehicles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">245</div>
            <p className="text-sm text-gray-600">Across all categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Daily Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">1,567</div>
            <p className="text-sm text-gray-600">+15% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Eco-Friendly Share</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">73%</div>
            <p className="text-sm text-gray-600">Electric & hybrid vehicles</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transport Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Vehicle Utilization</h4>
              {[
                { type: 'Eco Buses', utilization: 85, color: 'bg-green-600' },
                { type: 'E-Rickshaws', utilization: 72, color: 'bg-blue-600' },
                { type: 'Carpool', utilization: 68, color: 'bg-yellow-600' },
                { type: 'Bicycles', utilization: 45, color: 'bg-purple-600' }
              ].map((vehicle, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{vehicle.type}</span>
                    <span>{vehicle.utilization}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${vehicle.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${vehicle.utilization}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Route Performance</h4>
              {[
                { route: 'Ranchi - Netarhat', satisfaction: 4.8, trips: 245 },
                { route: 'Deoghar - Betla', satisfaction: 4.6, trips: 189 },
                { route: 'City Tour Routes', satisfaction: 4.7, trips: 567 },
                { route: 'Airport Transfers', satisfaction: 4.9, trips: 123 }
              ].map((route, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{route.route}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-600">{route.trips} trips</span>
                      <span className="text-xs text-yellow-600">{route.satisfaction} ⭐</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPartners = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {partnerMetrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{metric.type}</span>
                <Badge variant="outline">{metric.count}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Verified</span>
                  <span className="text-green-600">{metric.verified}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Pending</span>
                  <span className="text-orange-600">{metric.pending}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Rating</span>
                  <span className="text-yellow-600">{metric.rating} ⭐</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Growth</span>
                  <span className="text-green-600">+{metric.growth}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Partner Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={partnerMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="verified" fill="#22c55e" name="Verified" />
              <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );

  const renderSafety = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">3</div>
            <p className="text-sm text-gray-600">Requiring attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resolved Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">12</div>
            <p className="text-sm text-gray-600">Average resolution: 45 mins</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">3.2m</div>
            <p className="text-sm text-gray-600">Average response</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Safety Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">94%</div>
            <p className="text-sm text-gray-600">Overall safety rating</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Safety Incidents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { type: 'SOS Alert', location: 'Betla Trail 3', severity: 'high', status: 'resolved', time: '2 hours ago' },
              { type: 'Weather Warning', location: 'Netarhat Hills', severity: 'medium', status: 'active', time: '30 mins ago' },
              { type: 'Equipment Failure', location: 'Patratu Dam', severity: 'low', status: 'pending', time: '1 hour ago' },
              { type: 'Medical Emergency', location: 'Ranchi Lake', severity: 'high', status: 'resolved', time: '4 hours ago' }
            ].map((incident, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Badge variant={
                    incident.severity === 'high' ? 'destructive' :
                    incident.severity === 'medium' ? 'secondary' : 'outline'
                  }>
                    {incident.type}
                  </Badge>
                  <div>
                    <div className="font-medium">{incident.location}</div>
                    <div className="text-sm text-gray-600">{incident.time}</div>
                  </div>
                </div>
                <Badge variant={
                  incident.status === 'resolved' ? 'outline' :
                  incident.status === 'active' ? 'destructive' : 'secondary'
                }>
                  {incident.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Top Bar */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            {user?.isAdmin ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800"
              >
                ← Back to Site
              </Button>
            )}
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <TreePine className="w-6 h-6 text-green-600" />
                <Leaf className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  ExploreJH - Government Tourism Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Real-time monitoring & analytics{user?.isAdmin ? ` | Welcome, ${user.name}` : ''}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch 
                checked={isDarkMode} 
                onCheckedChange={setIsDarkMode}
              />
              <Moon className="h-4 w-4" />
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Globe className="h-4 w-4" />
              EN
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 border-r min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-green-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'revenue' && renderRevenue()}
            {activeTab === 'footfall' && renderFootfall()}
            {activeTab === 'transport' && renderTransport()}
            {activeTab === 'partners' && renderPartners()}
            {activeTab === 'verification' && renderVerification()}
            {activeTab === 'safety' && renderSafety()}
            {activeTab === 'reports' && (
              <Card>
                <CardHeader>
                  <CardTitle>Reports & Analytics</CardTitle>
                  <CardDescription>
                    Generate detailed reports and export data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Button variant="outline" className="h-24 flex-col">
                      <FileText className="h-6 w-6 mb-2" />
                      Monthly Report
                    </Button>
                    <Button variant="outline" className="h-24 flex-col">
                      <BarChart3 className="h-6 w-6 mb-2" />
                      Analytics Report
                    </Button>
                    <Button variant="outline" className="h-24 flex-col">
                      <Users className="h-6 w-6 mb-2" />
                      Partner Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            {activeTab === 'settings' && (
              <Card>
                <CardHeader>
                  <CardTitle>Dashboard Settings</CardTitle>
                  <CardDescription>
                    Configure dashboard preferences and system settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span>Enable real-time notifications</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Auto-refresh data</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Show detailed analytics</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}