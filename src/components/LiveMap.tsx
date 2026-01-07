import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Clock, 
  Car, 
  Locate,
  Route,
  Timer
} from 'lucide-react';
import { toast } from "sonner@2.0.3";

interface LiveMapProps {
  isOpen: boolean;
  onClose: () => void;
  shop: {
    id: number;
    name: string;
    location: string;
    phone: string;
    hours: string;
    address?: string;
  } | null;
}

// Mock store coordinates (in a real app, these would come from your database)
const storeCoordinates: { [key: string]: { lat: number; lng: number; address: string } } = {
  'Dumka': { lat: 24.2677, lng: 87.2497, address: 'Main Market, Dumka, Jharkhand 814101' },
  'Ranchi': { lat: 23.3441, lng: 85.3096, address: 'Albert Ekka Chowk, Ranchi, Jharkhand 834001' },
  'Chaibasa': { lat: 22.5562, lng: 85.8057, address: 'Gandhi Chowk, Chaibasa, Jharkhand 833201' },
  'Jamshedpur': { lat: 22.8046, lng: 86.2029, address: 'Sakchi Market, Jamshedpur, Jharkhand 831001' },
  'Hazaribagh': { lat: 23.9929, lng: 85.3647, address: 'Canary Hill, Hazaribagh, Jharkhand 825301' },
  'Dhanbad': { lat: 23.7957, lng: 86.4304, address: 'Bank More, Dhanbad, Jharkhand 826001' }
};

export function LiveMap({ isOpen, onClose, shop }: LiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [travelTime, setTravelTime] = useState<string>('');
  const [distance, setDistance] = useState<string>('');
  const [directions, setDirections] = useState<string[]>([]);

  // Get user's current location
  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          setIsLoadingLocation(false);
          calculateRoute(location);
          toast.success("Location found! 📍");
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoadingLocation(false);
          // Fallback to Ranchi location for demo
          const fallbackLocation = { lat: 23.3441, lng: 85.3096 };
          setUserLocation(fallbackLocation);
          calculateRoute(fallbackLocation);
          toast.info("Using Ranchi as your location for demo purposes 📍");
        }
      );
    } else {
      setIsLoadingLocation(false);
      toast.error("Geolocation is not supported by this browser");
    }
  };

  // Calculate route and directions (mock implementation)
  const calculateRoute = (fromLocation: { lat: number; lng: number }) => {
    if (!shop || !storeCoordinates[shop.location]) return;

    const storeCoord = storeCoordinates[shop.location];
    
    // Mock route calculation (in real app, use Google Directions API)
    const mockTravelTime = Math.floor(Math.random() * 45) + 15; // 15-60 minutes
    const mockDistance = (Math.random() * 20 + 5).toFixed(1); // 5-25 km
    
    setTravelTime(`${mockTravelTime} min`);
    setDistance(`${mockDistance} km`);
    
    // Mock directions
    const mockDirections = [
      "Head north on Main Road",
      `Turn right toward ${shop.location}`,
      "Continue straight for 2.5 km",
      "Turn left at the traffic light",
      `Arrive at ${shop.name}`
    ];
    setDirections(mockDirections);
  };

  // Initialize map when dialog opens
  useEffect(() => {
    if (isOpen && shop) {
      getCurrentLocation();
    }
  }, [isOpen, shop]);

  // Mock map rendering (in real app, integrate with Leaflet or Google Maps)
  const renderMap = () => {
    if (!shop || !storeCoordinates[shop.location]) {
      return (
        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Store location not available</p>
        </div>
      );
    }

    const storeCoord = storeCoordinates[shop.location];
    
    return (
      <div className="w-full h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg relative overflow-hidden">
        {/* Mock map background */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-grid-pattern"></div>
        </div>
        
        {/* Store marker */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="bg-red-500 text-white p-2 rounded-full shadow-lg">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
            {shop.name}
          </div>
        </motion.div>
        
        {/* User location marker (if available) */}
        {userLocation && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div className="bg-blue-500 text-white p-2 rounded-full shadow-lg animate-pulse">
              <Locate className="w-4 h-4" />
            </div>
          </motion.div>
        )}
        
        {/* Mock route line */}
        {userLocation && (
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute inset-0"
          >
            <svg className="w-full h-full">
              <path
                d="M 25% 25% Q 40% 15% 50% 50%"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeDasharray="5,5"
                fill="none"
                className="animate-pulse"
              />
            </svg>
          </motion.div>
        )}
        
        {/* Map controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <Button size="sm" variant="outline" className="bg-white/90">
            <Navigation className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" className="bg-white/90">
            <Route className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Live Directions to {shop?.name}</span>
          </DialogTitle>
        </DialogHeader>
        
        {shop && (
          <div className="space-y-6">
            {/* Store Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{shop.name}</h3>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {storeCoordinates[shop.location]?.address || shop.location}
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800">Open</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <span>{shop.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span>{shop.hours}</span>
                </div>
              </div>
            </div>
            
            {/* Live Map */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Live Map & Directions</h4>
                <Button 
                  onClick={getCurrentLocation} 
                  disabled={isLoadingLocation}
                  size="sm" 
                  variant="outline"
                >
                  {isLoadingLocation ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full mr-2"
                      />
                      Locating...
                    </>
                  ) : (
                    <>
                      <Locate className="w-4 h-4 mr-2" />
                      My Location
                    </>
                  )}
                </Button>
              </div>
              
              {renderMap()}
              
              {/* Travel Info */}
              {userLocation && travelTime && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <Timer className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                    <div className="text-lg font-semibold text-blue-600">{travelTime}</div>
                    <div className="text-sm text-gray-600">Travel Time</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <Car className="w-5 h-5 text-green-600 mx-auto mb-1" />
                    <div className="text-lg font-semibold text-green-600">{distance}</div>
                    <div className="text-sm text-gray-600">Distance</div>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Step-by-step Directions */}
            {directions.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center">
                  <Route className="w-4 h-4 mr-2" />
                  Step-by-step Directions
                </h4>
                <div className="space-y-2">
                  {directions.map((direction, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-2 rounded border-l-4 border-blue-500 bg-blue-50"
                    >
                      <div className="bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                      <span className="text-sm text-gray-700">{direction}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4 border-t">
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  if (storeCoordinates[shop.location]) {
                    const { lat, lng } = storeCoordinates[shop.location];
                    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
                  }
                }}
              >
                <Navigation className="w-4 h-4 mr-2" />
                Open in Google Maps
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(storeCoordinates[shop.location]?.address || shop.location);
                  toast.success("Address copied to clipboard! 📋");
                }}
              >
                Copy Address
              </Button>
            </div>
            
            {/* Payment Note */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <div className="bg-yellow-500 text-white rounded-full p-1">
                  <Clock className="w-3 h-3" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-yellow-800">On-site Payment Available</p>
                  <p className="text-yellow-700">
                    You can make purchases directly at the store with cash or local payment methods.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}