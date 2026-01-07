import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Star, MapPin, ShoppingBag, Phone, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';
import { StoreMap } from './StoreMap';

const topShops = [
  {
    id: 1,
    name: "Santal Handicrafts",
    owner: "Rajesh Murmu",
    category: "Traditional Crafts",
    rating: 4.9,
    location: "Dumka",
    image: "https://images.unsplash.com/photo-1723864448185-218d7b07e3d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmliYWwlMjBoYW5kaWNyYWZ0cyUyMG1hcmtldHBsYWNlfGVufDF8fHx8MTc1NzI3MjQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Authentic Santal tribal handicrafts including dokra art, bamboo products, and traditional textiles made by local artisans.",
    products: ["Dokra Figurines", "Bamboo Baskets", "Traditional Jewelry", "Wall Hangings"],
    phone: "+91 98765 43210",
    hours: "9:00 AM - 7:00 PM",
    speciality: "Dokra Metal Casting"
  },
  {
    id: 2,
    name: "Jharkhand Textiles",
    owner: "Sunita Devi",
    category: "Handloom",
    rating: 4.8,
    location: "Ranchi",
    image: "https://images.unsplash.com/photo-1723864448185-218d7b07e3d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmliYWwlMjBoYW5kaWNyYWZ0cyUyMG1hcmtldHBsYWNlfGVufDF8fHx8MTc1NzI3MjQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Beautiful handwoven textiles featuring traditional tribal patterns and natural dyes sourced from local materials.",
    products: ["Handloom Sarees", "Tribal Shawls", "Cushion Covers", "Table Runners"],
    phone: "+91 87654 32109",
    hours: "10:00 AM - 8:00 PM",
    speciality: "Natural Dye Textiles"
  },
  {
    id: 3,
    name: "Forest Treasures",
    owner: "Manoj Oraon",
    category: "Natural Products",
    rating: 4.7,
    location: "Chaibasa",
    image: "https://images.unsplash.com/photo-1723864448185-218d7b07e3d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmliYWwlMjBoYW5kaWNyYWZ0cyUyMG1hcmtldHBsYWNlfGVufDF8fHx8MTc1NzI3MjQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Organic forest products including honey, herbs, and traditional medicines collected sustainably from Jharkhand forests.",
    products: ["Wild Honey", "Medicinal Herbs", "Forest Tea", "Natural Oils"],
    phone: "+91 76543 21098",
    hours: "8:00 AM - 6:00 PM",
    speciality: "Organic Forest Products"
  },
  {
    id: 4,
    name: "Tribal Art Gallery",
    owner: "Kavita Munda",
    category: "Art & Paintings",
    rating: 4.6,
    location: "Jamshedpur",
    image: "https://images.unsplash.com/photo-1723864448185-218d7b07e3d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmliYWwlMjBoYW5kaWNyYWZ0cyUyMG1hcmtldHBsYWNlfGVufDF8fHx8MTc1NzI3MjQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Contemporary and traditional tribal art including Paitkar scroll paintings, Gond art, and modern interpretations.",
    products: ["Paitkar Scrolls", "Gond Paintings", "Tribal Masks", "Canvas Art"],
    phone: "+91 65432 10987",
    hours: "11:00 AM - 9:00 PM",
    speciality: "Paitkar Scroll Paintings"
  }
];

const allShops = [
  ...topShops,
  {
    id: 5,
    name: "Bamboo Craft Corner",
    owner: "Ravi Kumar",
    category: "Bamboo Products",
    rating: 4.5,
    location: "Hazaribagh",
    image: "https://images.unsplash.com/photo-1723864448185-218d7b07e3d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmliYWwlMjBoYW5kaWNyYWZ0cyUyMG1hcmtldHBsYWNlfGVufDF8fHx8MTc1NzI3MjQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Eco-friendly bamboo products crafted by skilled artisans, promoting sustainable living.",
    products: ["Bamboo Furniture", "Kitchen Utensils", "Decorative Items", "Storage Solutions"],
    phone: "+91 54321 09876",
    hours: "9:30 AM - 7:30 PM",
    speciality: "Bamboo Furniture"
  },
  {
    id: 6,
    name: "Stone Craft Studio",
    owner: "Deepak Singh",
    category: "Stone Work",
    rating: 4.4,
    location: "Dhanbad",
    image: "https://images.unsplash.com/photo-1723864448185-218d7b07e3d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmliYWwlMjBoYW5kaWNyYWZ0cyUyMG1hcmtldHBsYWNlfGVufDF8fHx8MTc1NzI3MjQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Beautiful stone sculptures and architectural elements crafted from local stones.",
    products: ["Stone Sculptures", "Garden Decorations", "Religious Idols", "Architectural Elements"],
    phone: "+91 43210 98765",
    hours: "8:00 AM - 5:00 PM",
    speciality: "Religious Stone Sculptures"
  }
];

export function Marketplace() {
  const [showAllShops, setShowAllShops] = useState(false);
  const [selectedShop, setSelectedShop] = useState<any>(null);
  const [showStoreMap, setShowStoreMap] = useState(false);

  const displayShops = showAllShops ? allShops : topShops;

  const ShopCard = ({ shop, index = 0 }: { shop: any; index?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6,
        delay: index * 0.15,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -12,
        scale: 1.03,
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
              src={shop.image}
              alt={shop.name}
              className="w-full h-48 object-cover group-hover:brightness-110 transition-all duration-500"
              onClick={() => setSelectedShop(shop)}
            />
          </motion.div>
          
          <motion.div 
            className="absolute top-4 left-4"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-orange-500 text-white shadow-lg">
              <motion.span
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Top Rated
              </motion.span>
            </Badge>
          </motion.div>
          
          <motion.div 
            className="absolute top-4 right-4"
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            viewport={{ once: true }}
          >
            <Badge variant="secondary" className="bg-white/90 text-gray-800 shadow-lg">
              {shop.category}
            </Badge>
          </motion.div>
        </div>
        
        <CardContent className="p-6" onClick={() => setSelectedShop(shop)}>
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
                {shop.name}
              </motion.h3>
              <p className="text-sm text-gray-600 mb-1">By {shop.owner}</p>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                {shop.location}
              </div>
            </div>
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.1 }}
            >
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-sm">{shop.rating}</span>
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-gray-600 text-sm mb-4 line-clamp-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            viewport={{ once: true }}
          >
            {shop.description}
          </motion.p>
          
          <motion.div 
            className="flex items-center justify-between"
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 + index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-sm text-green-600">
              {shop.speciality}
            </div>
            <motion.span 
              className="text-green-600 hover:text-green-700 text-sm transition-colors cursor-pointer"
              whileHover={{ x: 5 }}
            >
              Visit Shop →
            </motion.span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <>
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
              className="text-4xl mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Artisan Marketplace
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Discover authentic handicrafts and traditional products made by local artisans
            </motion.p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
              layout
              key={displayShops.length}
            >
              {displayShops.map((shop, index) => (
                <ShopCard key={shop.id} shop={shop} index={index} />
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
              onClick={() => setShowAllShops(!showAllShops)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(234, 88, 12, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-2">
                <span>{showAllShops ? 'Show Top Shops' : 'Explore Whole Marketplace'}</span>
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

      {/* Shop Details Dialog */}
      <Dialog open={!!selectedShop} onOpenChange={() => setSelectedShop(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedShop?.name}</span>
              <Button
                variant="outline"
                size="sm"
                className="text-orange-600 border-orange-600 hover:bg-orange-50"
                onClick={() => setShowStoreMap(true)}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Visit Store
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          {selectedShop && (
            <div className="space-y-6">
              <ImageWithFallback
                src={selectedShop.image}
                alt={selectedShop.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="mb-2">About</h4>
                  <p className="text-gray-600 text-sm mb-4">{selectedShop.description}</p>
                  
                  <h4 className="mb-2">Speciality</h4>
                  <p className="text-green-600 text-sm mb-4">{selectedShop.speciality}</p>
                  
                  <h4 className="mb-2">Products</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedShop.products.map((product: string, index: number) => (
                      <Badge key={index} variant="outline">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2">Owner</h4>
                    <p className="text-gray-600 text-sm">{selectedShop.owner}</p>
                  </div>
                  
                  <div>
                    <h4 className="mb-2">Location</h4>
                    <p className="text-gray-600 text-sm flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {selectedShop.location}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="mb-2">Contact</h4>
                    <p className="text-gray-600 text-sm flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {selectedShop.phone}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="mb-2">Hours</h4>
                    <p className="text-gray-600 text-sm flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {selectedShop.hours}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="mb-2">Rating</h4>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 mr-2" />
                      <span>{selectedShop.rating} / 5.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Store Map Dialog */}
      <StoreMap
        isOpen={showStoreMap}
        onClose={() => setShowStoreMap(false)}
        store={selectedShop}
      />
    </>
  );
}