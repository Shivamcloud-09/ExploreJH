import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { 
  MapPin, Navigation, Phone, Clock, Star, 
  Loader2, Car, User, Bike, ExternalLink
} from 'lucide-react';

interface StoreMapProps {
  isOpen: boolean;
  onClose: () => void;
  store: any;
}

interface DirectionStep {
  instruction: string;
  distance: string;
  duration: string;
}

interface RouteInfo {
  distance: string;
  duration: string;
  steps: DirectionStep[];
}

export function StoreMap({ isOpen, onClose, store }: StoreMapProps) {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [directions, setDirections] = useState<RouteInfo | null>(null);
  const [travelMode, setTravelMode] = useState<'driving' | 'walking' | 'bicycling'>('driving');
  const [mapError, setMapError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Mock store coordinates for demonstration
  const storeLocations: { [key: string]: { lat: number; lng: number } } = {
    'Dumka': { lat: 24.2676, lng: 87.2497 },
    'Ranchi': { lat: 23.3441, lng: 85.3096 },
    'Chaibasa': { lat: 22.5562, lng: 85.8067 },
    'Jamshedpur': { lat: 22.8046, lng: 86.2029 },
    'Hazaribagh': { lat: 23.9981, lng: 85.3615 },
    'Dhanbad': { lat: 23.7957, lng: 86.4304 }
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    setMapError(null);

    if (!navigator.geolocation) {
      setMapError('Geolocation is not supported by this browser');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        setIsLoadingLocation(false);
        calculateRoute(location);
      },
      (error) => {
        console.error('Error getting location:', error);
        // Use mock location for demo
        const mockLocation = { lat: 23.3441, lng: 85.3096 }; // Ranchi
        setUserLocation(mockLocation);
        setIsLoadingLocation(false);
        calculateRoute(mockLocation);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const calculateRoute = (fromLocation: { lat: number; lng: number }) => {
    const storeLocation = storeLocations[store?.location] || storeLocations['Ranchi'];
    
    // Mock directions calculation
    const mockDirections: RouteInfo = {
      distance: travelMode === 'walking' ? '2.3 km' : travelMode === 'bicycling' ? '2.1 km' : '1.8 km',
      duration: travelMode === 'walking' ? '28 mins' : travelMode === 'bicycling' ? '12 mins' : '8 mins',
      steps: [
        {
          instruction: 'Head north on Main Road',
          distance: '0.3 km',
          duration: '2 mins'
        },
        {
          instruction: 'Turn right onto Market Street',
          distance: '0.8 km',
          duration: '3 mins'
        },
        {
          instruction: 'Continue straight to destination',
          distance: '0.7 km',
          duration: '3 mins'
        }
      ]
    };

    setDirections(mockDirections);
  };

  const initializeMap = () => {
    if (!mapRef.current || !userLocation || !store) return;

    const storeLocation = storeLocations[store.location] || storeLocations['Ranchi'];
    
    // Create a simple visual map representation
    const mapContainer = mapRef.current;
    mapContainer.innerHTML = `
      <div class="relative w-full h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-green-200/20 to-blue-200/20"></div>
        
        <!-- Your Location -->
        <div class="absolute top-4 left-4 flex items-center bg-blue-500 text-white px-3 py-1 rounded-full text-sm shadow-lg">
          <div class="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
          Your Location
        </div>
        
        <!-- Store Location -->
        <div class="absolute bottom-4 right-4 flex items-center bg-red-500 text-white px-3 py-1 rounded-full text-sm shadow-lg">
          <div class="w-2 h-2 bg-white rounded-full mr-2"></div>
          ${store.name}
        </div>
        
        <!-- Route Line -->
        <svg class="absolute inset-0 w-full h-full pointer-events-none">
          <path d="M 20 20 Q 150 100 280 240" stroke="#059669" stroke-width="3" fill="none" stroke-dasharray="5,5" class="animate-pulse"/>
        </svg>
        
        <!-- Distance Badge -->
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-lg border-2 border-green-500">
          <div class="text-center">
            <div class="text-lg font-bold text-green-600">${directions?.distance || '2.1 km'}</div>
            <div class="text-sm text-gray-600">${directions?.duration || '8 mins'}</div>
          </div>
        </div>
      </div>
    `;
    
    setMapLoaded(true);
  };

  const openInGoogleMaps = () => {
    const storeLocation = storeLocations[store?.location] || storeLocations['Ranchi'];
    const url = `https://www.google.com/maps/dir/?api=1&destination=${storeLocation.lat},${storeLocation.lng}&travelmode=${travelMode}`;
    window.open(url, '_blank');
  };

  const openInAppleMaps = () => {
    const storeLocation = storeLocations[store?.location] || storeLocations['Ranchi'];
    const url = `http://maps.apple.com/?daddr=${storeLocation.lat},${storeLocation.lng}&dirflg=${travelMode === 'walking' ? 'w' : travelMode === 'bicycling' ? 'b' : 'd'}`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    if (isOpen && store) {
      getCurrentLocation();
    }
  }, [isOpen, store]);

  useEffect(() => {
    if (userLocation && directions) {
      initializeMap();
    }
  }, [userLocation, directions, travelMode]);

  useEffect(() => {
    if (userLocation && travelMode) {
      calculateRoute(userLocation);
    }
  }, [travelMode, userLocation]);

  if (!store) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-red-500" />
            <span>Navigate to {store.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Store Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">{store.name}</h3>
                <p className="text-gray-600 text-sm">By {store.owner}</p>
                <div className="flex items-center mt-1">
                  <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                  <span className="text-sm text-gray-600">{store.location}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-sm">{store.rating}</span>
                </div>
                <Badge className="mt-1">{store.category}</Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                {store.phone}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                {store.hours}
              </div>
            </div>
          </div>

          {/* Travel Mode Selection */}
          <div>
            <h4 className="font-medium mb-3">Travel Mode</h4>
            <div className="flex space-x-2">
              {[
                { mode: 'driving' as const, icon: Car, label: 'Driving' },
                { mode: 'walking' as const, icon: User, label: 'Walking' },
                { mode: 'bicycling' as const, icon: Bike, label: 'Cycling' }
              ].map(({ mode, icon: Icon, label }) => (
                <Button
                  key={mode}
                  variant={travelMode === mode ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTravelMode(mode)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Map Loading State */}
          {isLoadingLocation && (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
              <motion.div 
                className="text-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin text-green-600" />
                <p className="text-gray-600">Getting your location...</p>
              </motion.div>
            </div>
          )}

          {/* Map Error */}
          {mapError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{mapError}</p>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={getCurrentLocation}
                className="mt-2"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Interactive Map */}
          {!isLoadingLocation && !mapError && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div ref={mapRef} className="w-full"></div>
            </motion.div>
          )}

          {/* Route Information */}
          {directions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-green-50 rounded-lg p-4"
            >
              <h4 className="font-medium mb-3 text-green-800">Route Information</h4>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{directions.distance}</div>
                  <div className="text-sm text-gray-600">Distance</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{directions.duration}</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-sm text-gray-800">Directions:</h5>
                {directions.steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm">
                    <div className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700">{step.instruction}</p>
                      <p className="text-gray-500 text-xs">{step.distance} • {step.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* External Map Links */}
          <div className="flex space-x-3">
            <Button 
              onClick={openInGoogleMaps}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in Google Maps
            </Button>
            <Button 
              onClick={openInAppleMaps}
              variant="outline"
              className="flex-1"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in Apple Maps
            </Button>
          </div>

          {/* Live Location Updates */}
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center space-x-2 text-blue-700">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-blue-500 rounded-full"
              />
              <span className="text-sm font-medium">Live Location Tracking Active</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Get real-time directions and traffic updates
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}