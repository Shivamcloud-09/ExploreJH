import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { MapPin, Users, Calendar, Star, Leaf, TreePine, Navigation, Globe } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { motion } from 'motion/react';
import landingBg from 'figma:asset/06ab1ed9ab16e1720a2fabd18decf8294905340b.png';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 50, 0, 0.6), rgba(0, 80, 0, 0.7)), url(${landingBg})`
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      />

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-green-300 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20],
            x: [-10, 10],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Minimal Header with Logo */}
      <motion.header 
        className="relative z-20 bg-transparent"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center pt-8">
            {/* Logo - Made Bigger */}
            <motion.div 
              className="flex items-center space-x-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative">
                <motion.div 
                  className="bg-green-600 p-4 rounded-full shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <TreePine className="w-12 h-12 text-white" />
                </motion.div>
                <motion.div 
                  className="absolute -top-2 -right-2 bg-yellow-400 p-2 rounded-full shadow-md"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Leaf className="w-5 h-5 text-green-800" />
                </motion.div>
              </div>
              <div>
                <h1 className="text-4xl text-white">ExploreJH</h1>
                <p className="text-sm text-green-200">Smart Tourism Platform</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>
      
      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 pt-20">
        {/* Hero Content */}
        <motion.div 
          className="text-center text-white mb-16 max-w-5xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1 
            className="text-7xl mb-6 leading-tight"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
          >
            Discover Jharkhand with ExploreJH –{' '}
            <motion.span 
              className="block text-green-300"
              animate={{ 
                textShadow: [
                  "0 0 10px rgba(34, 197, 94, 0.5)",
                  "0 0 20px rgba(34, 197, 94, 0.8)",
                  "0 0 10px rgba(34, 197, 94, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Nature, Culture, and Beyond
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-2xl max-w-4xl mx-auto leading-relaxed opacity-90"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 0.9 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            An AI-powered eco-cultural tourism platform connecting hidden gems,{' '}
            <motion.span 
              className="text-yellow-300"
              animate={{ color: ["#fcd34d", "#f59e0b", "#fcd34d"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              smart mobility
            </motion.span>
            , and local culture.
          </motion.p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 max-w-7xl w-full"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          {[
            { icon: MapPin, title: '50+ Destinations', desc: 'Explore waterfalls, hills, forests and tribal villages', color: 'text-green-400' },
            { icon: Users, title: 'Expert Guides', desc: 'Local tribal guides with authentic cultural insights', color: 'text-blue-400' },
            { icon: Calendar, title: 'Cultural Events', desc: 'Seasonal festivals and traditional workshops', color: 'text-orange-400' },
            { icon: Star, title: 'Eco-Tourism', desc: 'Sustainable travel with community support', color: 'text-yellow-400' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 1.3 + index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white p-8 text-center h-full relative overflow-hidden group">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10"
                >
                  <feature.icon className={`w-12 h-12 mx-auto mb-4 ${feature.color}`} />
                </motion.div>
                <h3 className="mb-3 text-xl relative z-10">{feature.title}</h3>
                <p className="text-sm opacity-90 leading-relaxed relative z-10">{feature.desc}</p>
                
                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 border-2 border-transparent"
                  whileHover={{
                    borderColor: feature.color === 'text-green-400' ? '#4ade80' :
                                feature.color === 'text-blue-400' ? '#60a5fa' :
                                feature.color === 'text-orange-400' ? '#fb923c' : '#facc15',
                    transition: { duration: 0.3 }
                  }}
                  style={{ borderRadius: '0.625rem' }}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistics */}
        <motion.div 
          className="grid grid-cols-3 gap-12 text-center text-white mb-16"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          {[
            { number: '500K+', label: 'Happy Travelers' },
            { number: '98%', label: 'Satisfaction Rate' },
            { number: '24/7', label: 'Support Available' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: 1.7 + index * 0.1,
                type: "spring",
                stiffness: 120
              }}
              whileHover={{ scale: 1.1 }}
              className="group"
            >
              <motion.div 
                className="text-5xl mb-3 bg-gradient-to-br from-green-300 to-yellow-300 bg-clip-text text-transparent"
                animate={{ 
                  textShadow: [
                    "0 0 10px rgba(34, 197, 94, 0.3)",
                    "0 0 20px rgba(34, 197, 94, 0.6)",
                    "0 0 10px rgba(34, 197, 94, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {stat.number}
              </motion.div>
              <div className="text-base opacity-90 group-hover:opacity-100 transition-opacity">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Get Started Button */}
        <motion.div 
          className="flex justify-center w-full"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.button
            onClick={onGetStarted}
            className="group relative bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-12 py-5 text-xl rounded-full overflow-hidden transition-all duration-300 transform"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              initial={false}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                repeatDelay: 2,
                ease: "linear"
              }}
            />
            <span className="relative z-10 flex items-center space-x-3">
              <span>Get Started</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}