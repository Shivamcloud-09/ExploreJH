import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { MapPin, Star, Heart, Calendar, Navigation } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';
import { GuideDetails } from './GuideDetails';

const explorePlaces = [
  {
    id: 1,
    name: "Dassam Falls",
    location: "Taimara, Ranchi",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1652975247627-a29239ba56be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqaGFya2hhbmQlMjBuYXR1cmUlMjBzY2VuaWN8ZW58MXx8fHwxNzU3MjcyNDUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "A spectacular 144-foot waterfall cascading down from the Kanchi River. The falls offer breathtaking views and are perfect for photography enthusiasts.",
    address: "Taimara Village, 40km from Ranchi, Jharkhand 835103",
    bestSeason: "Post-Monsoon (Oct-Feb)",
    category: "Waterfall"
  },
  {
    id: 2,
    name: "Jagannath Temple",
    location: "Ranchi",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1740036470869-a4e5495abd42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqaGFya2hhbmQlMjBuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU3MjcyNDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "An ancient temple dedicated to Lord Jagannath, situated on a hilltop offering panoramic views of Ranchi city. The temple architecture reflects traditional Odishan style.",
    address: "Jagannathpur, Ranchi, Jharkhand 834001",
    bestSeason: "All Year Round",
    category: "Temple"
  },
  {
    id: 3,
    name: "Netarhat Hill Station",
    location: "Latehar",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1740036470869-a4e5495abd42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqaGFya2hhbmQlMjBuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU3MjcyNDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Known as the 'Queen of Chotanagpur', this hill station offers stunning sunrise and sunset views. The cool climate and pine forests make it perfect for nature lovers.",
    address: "Netarhat, Latehar District, Jharkhand 822114",
    bestSeason: "Winter (Nov-Feb)",
    category: "Hill Station"
  },
  {
    id: 4,
    name: "Palamau Tiger Reserve",
    location: "Latehar",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1740036470869-a4e5495abd42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqaGFya2hhbmQlMjBuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU3MjcyNDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "One of India's oldest tiger reserves, home to tigers, leopards, elephants, and over 174 bird species. Offers jeep safaris and nature walks.",
    address: "Betla, Latehar District, Jharkhand 822114",
    bestSeason: "Winter (Nov-Apr)",
    category: "Wildlife"
  },
  {
    id: 5,
    name: "Ranchi Lake",
    location: "Ranchi",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtlJTIwbmF0dXJlJTIwc2NlbmljfGVufDF8fHx8MTc1NzI3MjQ1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "An artificial lake surrounded by lush greenery, perfect for boating and evening walks. The lake has a small island in the center accessible by boat.",
    address: "Kanke Road, Ranchi, Jharkhand 834008",
    bestSeason: "All Year Round",
    category: "Lake"
  },
  {
    id: 6,
    name: "Hundru Falls",
    location: "Ranchi",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmZhbGwlMjBuYXR1cmV8ZW58MXx8fHwxNzU3MjcyNDU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "The highest waterfall in Jharkhand at 320 feet, formed by the Subarnarekha River. Known for its magnificent beauty and spiritual significance.",
    address: "Hundru Village, 45km from Ranchi, Jharkhand 835219",
    bestSeason: "Post-Monsoon (Oct-Jan)",
    category: "Waterfall"
  },
  {
    id: 7,
    name: "Betla National Park",
    location: "Palamu",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXRpb25hbCUyMHBhcmslMjBlbGVwaGFudHN8ZW58MXx8fHwxNzU3MjcyNDYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Wildlife sanctuary famous for elephants, tigers, leopards and diverse flora. Offers elephant safaris and tribal village visits.",
    address: "Betla, Palamu District, Jharkhand 822102",
    bestSeason: "Winter (Nov-Mar)",
    category: "Wildlife"
  },
  {
    id: 8,
    name: "Jonha Falls",
    location: "Ranchi",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmZhbGwlMjByb2Nrc3xlbnwxfHx8fDE3NTcyNzI0NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "A beautiful waterfall dropping 141 feet, surrounded by dense forests. Perfect for trekking and nature photography.",
    address: "Jonha Village, 40km from Ranchi, Jharkhand 835222",
    bestSeason: "Post-Monsoon (Sep-Feb)",
    category: "Waterfall"
  },
  {
    id: 9,
    name: "Deoghar Temple Complex",
    location: "Deoghar",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wbGUlMjBpbmRpYXxlbnwxfHx8fDE3NTcyNzI0NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Sacred pilgrimage site with the famous Baidyanath Temple, one of the twelve Jyotirlingas dedicated to Lord Shiva.",
    address: "Deoghar, Jharkhand 814112",
    bestSeason: "All Year Round",
    category: "Temple"
  },
  {
    id: 10,
    name: "Parasnath Hills",
    location: "Giridih",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1564419320461-6870880221ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWxsJTIwc3RhdGlvbiUyMGluZGlhfGVufDF8fHx8MTc1NzI3MjQ1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "The highest mountain peak in Jharkhand, sacred to Jains with multiple temples. Popular for trekking and sunrise views.",
    address: "Parasnath, Giridih District, Jharkhand 815301",
    bestSeason: "Winter (Oct-Mar)",
    category: "Mountain"
  },
  {
    id: 11,
    name: "Tribal Cultural Museum",
    location: "Ranchi",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBjdWx0dXJhbCUyMGFydGlmYWN0c3xlbnwxfHx8fDE3NTcyNzI0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Museum showcasing rich tribal heritage, traditional arts, crafts, and cultural practices of Jharkhand's indigenous communities.",
    address: "Morabadi, Ranchi, Jharkhand 834008",
    bestSeason: "All Year Round",
    category: "Cultural"
  },
  {
    id: 12,
    name: "Rock Garden",
    location: "Ranchi",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrJTIwZ2FyZGVuJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1NzI3MjQ3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Artistic garden featuring rock sculptures and natural formations. Created by artificially designed rocks and waterfalls.",
    address: "Kanke Road, Ranchi, Jharkhand 834006",
    bestSeason: "Winter (Nov-Feb)",
    category: "Garden"
  }
];

export function ExplorePlaces() {
  const [showAllPlaces, setShowAllPlaces] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showGuideDetails, setShowGuideDetails] = useState(false);

  const displayPlaces = showAllPlaces ? explorePlaces : explorePlaces.slice(0, 4);
  const filteredPlaces = displayPlaces.filter(place => 
    place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleWishlist = (placeId: number) => {
    setWishlist(prev => 
      prev.includes(placeId) 
        ? prev.filter(id => id !== placeId)
        : [...prev, placeId]
    );
  };

  const PlaceCard = ({ place, index = 0 }: { place: any; index?: number }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
    >
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group">
        <div className="relative overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            <ImageWithFallback
              src={place.image}
              alt={place.name}
              className="w-full h-48 object-cover group-hover:brightness-110 transition-all duration-500"
              onClick={() => setSelectedPlace(place)}
            />
          </motion.div>
          
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(place.id);
            }}
            className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={wishlist.includes(place.id) ? { 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            } : {}}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={wishlist.includes(place.id) ? {
                fill: "#ef4444",
                color: "#ef4444"
              } : {
                fill: "transparent",
                color: "#4b5563"
              }}
              transition={{ duration: 0.3 }}
            >
              <Heart 
                className={`w-5 h-5 ${wishlist.includes(place.id) ? 'text-red-500 fill-red-500' : 'text-gray-600'}`}
              />
            </motion.div>
          </motion.button>
          
          <motion.div 
            className="absolute bottom-4 left-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="bg-white/90 text-gray-800 shadow-lg">
              {place.category}
            </Badge>
          </motion.div>
        </div>
        
        <CardContent className="p-6" onClick={() => setSelectedPlace(place)}>
          <motion.div 
            className="flex items-start justify-between mb-3"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div>
              <motion.h3 
                className="text-xl mb-1"
                whileHover={{ color: '#059669' }}
                transition={{ duration: 0.2 }}
              >
                {place.name}
              </motion.h3>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                {place.location}
              </div>
            </div>
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.1 }}
            >
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-sm">{place.rating}</span>
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-gray-600 text-sm mb-4 line-clamp-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            {place.description}
          </motion.p>
          
          <motion.div 
            className="flex items-center justify-between"
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {place.bestSeason}
            </div>
            <motion.span 
              className="text-green-600 hover:text-green-700 text-sm transition-colors cursor-pointer"
              whileHover={{ x: 5 }}
            >
              View Details →
            </motion.span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-4xl mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Explore Places
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Discover the hidden gems and popular destinations across Jharkhand
            </motion.p>
          </motion.div>

          <AnimatePresence>
            {showAllPlaces && (
              <motion.div 
                className="mb-8 max-w-md mx-auto"
                initial={{ y: -20, opacity: 0, height: 0 }}
                animate={{ y: 0, opacity: 1, height: 'auto' }}
                exit={{ y: -20, opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Input
                  type="text"
                  placeholder="Search places, locations, or categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
              layout
              key={filteredPlaces.length}
            >
              {filteredPlaces.map((place, index) => (
                <PlaceCard key={place.id} place={place} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          <motion.div 
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setShowAllPlaces(!showAllPlaces)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(34, 197, 94, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-2">
                <span>{showAllPlaces ? 'Show Less' : 'Explore All Tourist Places'}</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Place Details Dialog */}
      <Dialog open={!!selectedPlace} onOpenChange={() => setSelectedPlace(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedPlace?.name}</span>
              <Button
                variant="outline"
                size="sm"
                className="text-green-600 border-green-600 hover:bg-green-50"
                onClick={() => setShowGuideDetails(true)}
              >
                <Navigation className="w-4 h-4 mr-2" />
                Get a Guide
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          {selectedPlace && (
            <div className="space-y-6">
              <ImageWithFallback
                src={selectedPlace.image}
                alt={selectedPlace.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="mb-2">Description</h4>
                  <p className="text-gray-600 text-sm">{selectedPlace.description}</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2">Address</h4>
                    <p className="text-gray-600 text-sm flex items-start">
                      <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      {selectedPlace.address}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="mb-2">Best Season to Visit</h4>
                    <p className="text-gray-600 text-sm flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {selectedPlace.bestSeason}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="mb-2">Rating</h4>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 mr-2" />
                      <span>{selectedPlace.rating} / 5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Guide Details Dialog */}
      <GuideDetails
        isOpen={showGuideDetails}
        onClose={() => setShowGuideDetails(false)}
        placeName={selectedPlace?.name}
      />
    </>
  );
}