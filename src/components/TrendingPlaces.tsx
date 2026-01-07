import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Thermometer, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';

const trendingPlaces = [
  {
    id: 1,
    name: "Hundru Falls",
    location: "Ranchi",
    season: "Winter",
    temperature: "15-25°C",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1652975247627-a29239ba56be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmZhbGwlMjBuYXR1cmUlMjBzY2VuaWN8ZW58MXx8fHwxNzU3MjcyNDUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "98-foot waterfall perfect for winter visits",
    trending: "Most Visited"
  },
  {
    id: 2,
    name: "Betla National Park",
    location: "Latehar",
    season: "Winter",
    temperature: "12-22°C",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1740036470869-a4e5495abd42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqaGFya2hhbmQlMjBuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU3MjcyNDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Wildlife sanctuary with tigers and elephants",
    trending: "Wildlife Special"
  },
  {
    id: 3,
    name: "Rock Garden",
    location: "Ranchi",
    season: "All Year",
    temperature: "20-30°C",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1740036470869-a4e5495abd42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqaGFya2hhbmQlMjBuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU3MjcyNDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Artistic rock formations and gardens",
    trending: "Instagram Favorite"
  }
];

export function TrendingPlaces() {
  const currentSeason = "Winter"; // This would be dynamic based on current date

  return (
    <section className="py-16 bg-white">
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
            Trending This {currentSeason}
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Discover the most popular destinations perfect for the current season in Jharkhand
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingPlaces.map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              whileInView={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group">
                <div className="relative overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <ImageWithFallback
                      src={place.image}
                      alt={place.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="absolute top-4 left-4"
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Badge className="bg-red-500 text-white shadow-lg">{place.trending}</Badge>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute top-4 right-4"
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Badge variant="secondary" className="bg-white/90 text-gray-800 shadow-lg">
                      {place.season}
                    </Badge>
                  </motion.div>
                  
                  {/* Overlay animation */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              
                <CardContent className="p-6">
                  <motion.div 
                    className="flex items-start justify-between mb-3"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
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
                        <motion.div
                          animate={{ x: [0, 2, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <MapPin className="w-4 h-4 mr-1" />
                        </motion.div>
                        {place.location}
                      </div>
                    </div>
                    <motion.div 
                      className="flex items-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      </motion.div>
                      <span className="text-sm">{place.rating}</span>
                    </motion.div>
                  </motion.div>
                  
                  <motion.p 
                    className="text-gray-600 text-sm mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {place.description}
                  </motion.p>
                  
                  <motion.div 
                    className="flex items-center justify-between"
                    initial={{ y: 10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center text-sm text-gray-500">
                      <motion.div
                        animate={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <Thermometer className="w-4 h-4 mr-1" />
                      </motion.div>
                      {place.temperature}
                    </div>
                    <motion.button 
                      className="text-green-600 hover:text-green-700 text-sm transition-colors duration-200"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More →
                    </motion.button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}