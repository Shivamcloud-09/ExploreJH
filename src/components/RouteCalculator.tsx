import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { 
  Navigation, 
  MapPin, 
  Clock, 
  DollarSign, 
  Bus, 
  Car, 
  Train,
  Route,
  Star,
  ArrowRight
} from 'lucide-react';

interface RouteOption {
  id: string;
  type: 'bus' | 'taxi' | 'train' | 'uber';
  name: string;
  duration: string;
  cost: number;
  distance: string;
  rating: number;
  availability: 'Available' | 'Limited' | 'Full';
  features: string[];
  provider?: string;
}

const mockRouteData = {
  'ranchi-netarhat': [
    {
      id: '1',
      type: 'bus' as const,
      name: 'Jharkhand State Transport',
      duration: '3h 30m',
      cost: 150,
      distance: '156 km',
      rating: 4.2,
      availability: 'Available' as const,
      features: ['AC', 'WiFi', 'Charging Port'],
      provider: 'JRTC'
    },
    {
      id: '2',
      type: 'taxi' as const,
      name: 'Local Taxi Service',
      duration: '2h 45m',
      cost: 2500,
      distance: '156 km',
      rating: 4.5,
      availability: 'Available' as const,
      features: ['AC', 'Driver Included', 'Door to Door'],
      provider: 'Local Operators'
    },
    {
      id: '3',
      type: 'uber' as const,
      name: 'Uber Intercity',
      duration: '2h 50m',
      cost: 2200,
      distance: '156 km',
      rating: 4.3,
      availability: 'Limited' as const,
      features: ['AC', 'GPS Tracking', 'Cashless'],
      provider: 'Uber'
    }
  ],
  'ranchi-jamshedpur': [
    {
      id: '4',
      type: 'train' as const,
      name: 'Janshatabdi Express',
      duration: '2h 15m',
      cost: 185,
      distance: '136 km',
      rating: 4.4,
      availability: 'Available' as const,
      features: ['AC Chair Car', 'Catering', 'Punctual'],
      provider: 'Indian Railways'
    },
    {
      id: '5',
      type: 'bus' as const,
      name: 'Private Volvo Service',
      duration: '3h 20m',
      cost: 220,
      distance: '136 km',
      rating: 4.1,
      availability: 'Available' as const,
      features: ['AC', 'Comfortable Seats', 'Movies'],
      provider: 'Private Operators'
    },
    {
      id: '6',
      type: 'taxi' as const,
      name: 'Shared Taxi',
      duration: '2h 30m',
      cost: 800,
      distance: '136 km',
      rating: 3.9,
      availability: 'Available' as const,
      features: ['Shared Ride', 'Economic', 'Flexible Timing'],
      provider: 'Local Operators'
    }
  ]
};

const popularRoutes = [
  { from: 'Ranchi', to: 'Netarhat', key: 'ranchi-netarhat' },
  { from: 'Ranchi', to: 'Jamshedpur', key: 'ranchi-jamshedpur' },
  { from: 'Jamshedpur', to: 'Ranchi', key: 'ranchi-jamshedpur' },
  { from: 'Ranchi', to: 'Dhanbad', key: 'ranchi-jamshedpur' },
];

export function RouteCalculator() {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const calculateRoutes = () => {
    if (!fromLocation.trim() || !toLocation.trim()) {
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    // Simulate API call
    setTimeout(() => {
      const routeKey = `${fromLocation.toLowerCase()}-${toLocation.toLowerCase()}`;
      const foundRoutes = mockRouteData[routeKey as keyof typeof mockRouteData] || [];
      
      // Sort by cost (cheapest first)
      const sortedRoutes = [...foundRoutes].sort((a, b) => a.cost - b.cost);
      setRoutes(sortedRoutes);
      setIsLoading(false);
    }, 1500);
  };

  const getTransportIcon = (type: string) => {
    switch (type) {
      case 'bus': return <Bus className="w-5 h-5" />;
      case 'taxi': return <Car className="w-5 h-5" />;
      case 'train': return <Train className="w-5 h-5" />;
      case 'uber': return <Navigation className="w-5 h-5" />;
      default: return <Route className="w-5 h-5" />;
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'text-green-600 bg-green-100';
      case 'Limited': return 'text-yellow-600 bg-yellow-100';
      case 'Full': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleQuickSearch = (from: string, to: string) => {
    setFromLocation(from);
    setToLocation(to);
    setTimeout(() => calculateRoutes(), 100);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Route className="w-12 h-12 text-blue-600 mr-3" />
            <h2 className="text-4xl">Route Calculator</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the cheapest and most convenient transportation options between any two destinations in Jharkhand
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div className="md:col-span-2">
                <Label htmlFor="from">From</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="from"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    placeholder="Enter starting location"
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="to">To</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="to"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    placeholder="Enter destination"
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Button
                  onClick={calculateRoutes}
                  disabled={isLoading || !fromLocation.trim() || !toLocation.trim()}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? 'Calculating...' : 'Find Routes'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Popular Routes */}
        {!hasSearched && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg mb-4">Popular Routes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {popularRoutes.map((route, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => handleQuickSearch(route.from, route.to)}
                    className="p-4 h-auto flex flex-col items-center text-center hover:bg-blue-50"
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-sm">{route.from}</span>
                      <ArrowRight className="w-4 h-4 mx-2 text-gray-400" />
                      <span className="text-sm">{route.to}</span>
                    </div>
                    <span className="text-xs text-gray-500">Quick Search</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {isLoading && (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Calculating best routes and prices...</p>
            </CardContent>
          </Card>
        )}

        {/* Route Results */}
        {hasSearched && !isLoading && (
          <div>
            {routes.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg mb-2">No Routes Found</h3>
                  <p className="text-gray-600">
                    Sorry, we couldn't find any routes between {fromLocation} and {toLocation}.
                    Try searching for popular destinations like Ranchi, Jamshedpur, or Netarhat.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl">
                    Routes from <span className="text-blue-600">{fromLocation}</span> to{' '}
                    <span className="text-blue-600">{toLocation}</span>
                  </h3>
                  <Badge variant="secondary">
                    {routes.length} option{routes.length > 1 ? 's' : ''} found
                  </Badge>
                </div>

                <div className="space-y-4">
                  {routes.map((route, index) => (
                    <Card key={route.id} className={`hover:shadow-lg transition-shadow ${index === 0 ? 'ring-2 ring-green-200 bg-green-50' : ''}`}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${
                              route.type === 'bus' ? 'bg-blue-100 text-blue-600' :
                              route.type === 'train' ? 'bg-purple-100 text-purple-600' :
                              route.type === 'taxi' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-green-100 text-green-600'
                            }`}>
                              {getTransportIcon(route.type)}
                            </div>
                            <div>
                              <h4 className="text-lg">{route.name}</h4>
                              <p className="text-sm text-gray-600">{route.provider}</p>
                            </div>
                          </div>
                          
                          {index === 0 && (
                            <Badge className="bg-green-500 text-white">
                              Cheapest Option
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center">
                            <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                            <div>
                              <div className="text-lg">₹{route.cost}</div>
                              <div className="text-xs text-gray-500">Total Cost</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <Clock className="w-5 h-5 text-blue-600 mr-2" />
                            <div>
                              <div className="text-lg">{route.duration}</div>
                              <div className="text-xs text-gray-500">Duration</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <Navigation className="w-5 h-5 text-purple-600 mr-2" />
                            <div>
                              <div className="text-lg">{route.distance}</div>
                              <div className="text-xs text-gray-500">Distance</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <Star className="w-5 h-5 text-yellow-500 mr-2" />
                            <div>
                              <div className="text-lg">{route.rating}</div>
                              <div className="text-xs text-gray-500">Rating</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex flex-wrap gap-2">
                            {route.features.map((feature, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          
                          <Badge className={getAvailabilityColor(route.availability)}>
                            {route.availability}
                          </Badge>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-600">
                            {route.type === 'bus' && 'Multiple departures daily'}
                            {route.type === 'train' && 'Book in advance recommended'}
                            {route.type === 'taxi' && 'Door-to-door service'}
                            {route.type === 'uber' && 'Book through app'}
                          </div>
                          
                          <Button
                            className={`${
                              route.availability === 'Available' 
                                ? 'bg-green-600 hover:bg-green-700' 
                                : 'bg-gray-400 cursor-not-allowed'
                            }`}
                            disabled={route.availability !== 'Available'}
                          >
                            {route.availability === 'Available' ? 'Book Now' : 'Not Available'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}