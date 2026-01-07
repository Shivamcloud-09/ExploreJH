import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { 
  Car, 
  Users, 
  ShoppingBag, 
  ArrowRight, 
  TreePine, 
  Leaf,
  Star,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

interface PartnerWithUsProps {
  onPartnerTypeSelect: (type: 'driver' | 'guide' | 'artisan') => void;
  onBack: () => void;
}

const partnerTypes = [
  {
    id: 'driver',
    title: 'Become a Driver',
    description: 'Provide safe and reliable transportation services to tourists',
    icon: Car,
    benefits: [
      'Flexible working hours',
      'Competitive earnings',
      'Insurance coverage',
      'GPS navigation support'
    ],
    earning: '₹15,000 - ₹40,000/month',
    gradient: 'from-blue-500 to-blue-700'
  },
  {
    id: 'guide',
    title: 'Become a Tourist Guide',
    description: 'Share your local knowledge and help tourists explore Jharkhand',
    icon: Users,
    benefits: [
      'Share cultural heritage',
      'Meet people worldwide',
      'Build your reputation',
      'Official certification'
    ],
    earning: '₹800 - ₹2,500/day',
    gradient: 'from-green-500 to-green-700'
  },
  {
    id: 'artisan',
    title: 'Become an Artisan/Handicraft Seller',
    description: 'Showcase and sell your traditional handicrafts to tourists',
    icon: ShoppingBag,
    benefits: [
      'Global marketplace',
      'Preserve traditions',
      'Zero commission fees',
      'Marketing support'
    ],
    earning: '₹20,000 - ₹80,000/month',
    gradient: 'from-orange-500 to-orange-700'
  }
];

export function PartnerWithUs({ onPartnerTypeSelect, onBack }: PartnerWithUsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
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
              <TreePine className="w-4 h-4 text-green-300 opacity-30" />
            ) : (
              <Leaf className="w-3 h-3 text-green-400 opacity-40" />
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center space-x-2 text-green-700 hover:text-green-800"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>Back to Home</span>
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-8">
              <h1 className="text-5xl mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Partner With Us
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Join our network and grow with us. Be part of Jharkhand's tourism revolution 
                and help visitors discover the beauty of our state while building your own successful business.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl text-green-700 mb-1">500+</div>
                <div className="text-gray-600 text-sm">Active Partners</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl text-green-700 mb-1">4.8/5</div>
                <div className="text-gray-600 text-sm">Average Rating</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <CheckCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl text-green-700 mb-1">95%</div>
                <div className="text-gray-600 text-sm">Partner Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Partner Types */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {partnerTypes.map((partner) => {
                const Icon = partner.icon;
                return (
                  <Card 
                    key={partner.id}
                    className="group cursor-pointer hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden border-0"
                    onClick={() => onPartnerTypeSelect(partner.id as 'driver' | 'guide' | 'artisan')}
                  >
                    <div className={`h-2 bg-gradient-to-r ${partner.gradient}`} />
                    <CardContent className="p-8">
                      <div className="text-center mb-6">
                        <div className={`bg-gradient-to-r ${partner.gradient} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl mb-3 text-gray-800">{partner.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{partner.description}</p>
                      </div>

                      <div className="mb-6">
                        <div className={`text-lg bg-gradient-to-r ${partner.gradient} bg-clip-text text-transparent mb-3`}>
                          Earning Potential: {partner.earning}
                        </div>
                        
                        <div className="space-y-2">
                          <h4 className="text-sm text-gray-700 mb-3">Key Benefits:</h4>
                          {partner.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button 
                        className={`w-full bg-gradient-to-r ${partner.gradient} hover:opacity-90 text-white border-0 group-hover:shadow-lg transition-all duration-300`}
                      >
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Partner With Us */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl mb-4 text-gray-800">Why Partner With ExploreJH?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're committed to supporting our partners with the tools, technology, and resources needed to succeed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: 'Technology Support',
                  description: 'Modern tools and apps to manage your business efficiently',
                  icon: '🚀'
                },
                {
                  title: '24/7 Support',
                  description: 'Round-the-clock assistance whenever you need help',
                  icon: '🛠️'
                },
                {
                  title: 'Marketing Help',
                  description: 'We promote your services to tourists across India',
                  icon: '📢'
                },
                {
                  title: 'Fair Payments',
                  description: 'Transparent pricing with quick and secure payments',
                  icon: '💰'
                }
              ].map((feature, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="text-lg mb-2 text-gray-800">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-green-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl text-white mb-4">Ready to Start Your Journey?</h2>
            <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of successful partners who are already earning and growing with ExploreJH.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              {partnerTypes.map((partner) => (
                <Button
                  key={partner.id}
                  variant="outline"
                  className="bg-white text-green-700 hover:bg-green-50 border-white"
                  onClick={() => onPartnerTypeSelect(partner.id as 'driver' | 'guide' | 'artisan')}
                >
                  Join as {partner.title.split(' ')[2] || partner.title.split(' ')[1]}
                </Button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}