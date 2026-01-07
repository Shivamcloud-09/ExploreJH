import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Phone, 
  MapPin, 
  Shield, 
  Heart, 
  Pill, 
  Search, 
  Navigation,
  AlertTriangle 
} from 'lucide-react';

const emergencyServices = [
  {
    category: 'Police Stations',
    icon: Shield,
    color: 'blue',
    services: [
      {
        name: 'Ranchi Police Station',
        address: 'Main Road, Ranchi, Jharkhand 834001',
        phone: '+91 651 2300100',
        distance: '2.3 km',
        available: '24/7'
      },
      {
        name: 'Jamshedpur Police Station',
        address: 'Sakchi, Jamshedpur, Jharkhand 831001',
        phone: '+91 657 2426774',
        distance: '5.1 km',
        available: '24/7'
      },
      {
        name: 'Dhanbad Police Station',
        address: 'Bank More, Dhanbad, Jharkhand 826001',
        phone: '+91 326 2300200',
        distance: '8.7 km',
        available: '24/7'
      }
    ]
  },
  {
    category: 'Hospitals',
    icon: Heart,
    color: 'red',
    services: [
      {
        name: 'RIMS Hospital Ranchi',
        address: 'Bariatu, Ranchi, Jharkhand 834009',
        phone: '+91 651 2450145',
        distance: '3.2 km',
        available: '24/7 Emergency'
      },
      {
        name: 'Tata Main Hospital',
        address: 'Northern Town, Jamshedpur, Jharkhand 831001',
        phone: '+91 657 2426699',
        distance: '6.8 km',
        available: '24/7 Emergency'
      },
      {
        name: 'Patliputra Medical College',
        address: 'Dhanbad, Jharkhand 826004',
        phone: '+91 326 2305000',
        distance: '9.1 km',
        available: '24/7 Emergency'
      }
    ]
  },
  {
    category: 'Pharmacies',
    icon: Pill,
    color: 'green',
    services: [
      {
        name: 'Apollo Pharmacy',
        address: 'Main Road, Ranchi, Jharkhand 834001',
        phone: '+91 651 2234567',
        distance: '1.8 km',
        available: '24/7'
      },
      {
        name: 'MedPlus Health Services',
        address: 'Bistupur, Jamshedpur, Jharkhand 831001',
        phone: '+91 657 2345678',
        distance: '4.5 km',
        available: '8 AM - 10 PM'
      },
      {
        name: 'Guardian Pharmacy',
        address: 'City Center, Dhanbad, Jharkhand 826001',
        phone: '+91 326 2456789',
        distance: '7.2 km',
        available: '9 AM - 9 PM'
      }
    ]
  }
];

const helplineNumbers = [
  { name: 'Police Emergency', number: '100', description: 'For immediate police assistance' },
  { name: 'Medical Emergency', number: '108', description: 'Ambulance and medical emergency' },
  { name: 'Fire Emergency', number: '101', description: 'Fire department emergency' },
  { name: 'Tourist Helpline', number: '1363', description: 'Jharkhand Tourism helpline' },
  { name: 'Women Helpline', number: '181', description: 'Women in distress helpline' },
  { name: 'Child Helpline', number: '1098', description: 'Emergency assistance for children' }
];

export function SOSSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredServices = emergencyServices.map(category => ({
    ...category,
    services: category.services.filter(service =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.address.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.services.length > 0);

  const displayServices = selectedCategory 
    ? filteredServices.filter(category => category.category === selectedCategory)
    : filteredServices;

  const callNumber = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const openMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <section className="py-16 bg-red-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="w-12 h-12 text-red-600 mr-3" />
            <h2 className="text-4xl text-red-600">Emergency SOS</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quick access to emergency services, police stations, hospitals, and pharmacies in your area
          </p>
        </div>

        {/* Emergency Helpline Numbers */}
        <Card className="mb-8 border-red-200">
          <CardContent className="p-6">
            <h3 className="text-xl mb-4 text-red-600">Emergency Helpline Numbers</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {helplineNumbers.map((helpline, index) => (
                <div key={index} className="text-center">
                  <Button
                    onClick={() => callNumber(helpline.number)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white mb-2"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {helpline.number}
                  </Button>
                  <div className="text-sm">
                    <div className="text-gray-800">{helpline.name}</div>
                    <div className="text-gray-600 text-xs">{helpline.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for emergency services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(null)}
            >
              All Services
            </Button>
            {emergencyServices.map((category) => (
              <Button
                key={category.category}
                variant={selectedCategory === category.category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.category)}
              >
                {category.category}
              </Button>
            ))}
          </div>
        </div>

        {/* Emergency Services */}
        <div className="space-y-8">
          {displayServices.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.category}>
                <div className="flex items-center mb-4">
                  <Icon className={`w-6 h-6 mr-3 text-${category.color}-600`} />
                  <h3 className="text-2xl">{category.category}</h3>
                  <Badge variant="secondary" className="ml-3">
                    {category.services.length} available
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.services.map((service, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-lg mb-1">{service.name}</h4>
                            <div className="flex items-center text-sm text-gray-600 mb-2">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span className="line-clamp-2">{service.address}</span>
                            </div>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`text-${category.color}-600 border-${category.color}-200`}
                          >
                            {service.distance}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-4">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                            {service.available}
                          </span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            onClick={() => callNumber(service.phone)}
                            className={`flex-1 bg-${category.color}-600 hover:bg-${category.color}-700 text-white`}
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </Button>
                          <Button
                            onClick={() => openMaps(service.address)}
                            variant="outline"
                            className="flex-1"
                          >
                            <Navigation className="w-4 h-4 mr-2" />
                            Directions
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Safety Tips */}
        <Card className="mt-12 bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <h3 className="text-xl mb-4 text-yellow-800">Safety Tips for Tourists</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
              <ul className="space-y-2">
                <li>• Always carry a charged mobile phone</li>
                <li>• Share your location with family/friends</li>
                <li>• Keep emergency numbers saved in your phone</li>
                <li>• Carry a copy of your ID documents</li>
              </ul>
              <ul className="space-y-2">
                <li>• Stay hydrated, especially during trekking</li>
                <li>• Follow local guide instructions</li>
                <li>• Avoid traveling alone in remote areas</li>
                <li>• Keep basic first aid supplies handy</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}