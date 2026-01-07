import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, Star, MapPin, Phone, Clock, Shield, 
  CheckCircle, XCircle, QrCode, CreditCard,
  Calendar, Languages, Award, BookOpen
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BlockchainService } from './BlockchainService';

interface GuideDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  placeName?: string;
}

interface Guide {
  id: string;
  name: string;
  rating: number;
  experience: string;
  languages: string[];
  specialties: string[];
  price: string;
  availability: string;
  phone: string;
  image: string;
  verified: boolean;
  blockchainHash: string;
  certifications: string[];
  reviews: number;
  description: string;
}

const verifiedGuides: Guide[] = [
  {
    id: 'guide_001',
    name: 'Ramesh Kumar Munda',
    rating: 4.9,
    experience: '8 years',
    languages: ['Hindi', 'English', 'Santhali'],
    specialties: ['Wildlife Photography', 'Tribal Culture', 'Nature Walks'],
    price: '₹1,500/day',
    availability: 'Available Today',
    phone: '+91 98765 43210',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    verified: true,
    blockchainHash: 'bc1a2f3d4e5f6789012345678901234567890abcdef',
    certifications: ['Certified Nature Guide', 'First Aid Certified', 'Wildlife Expert'],
    reviews: 127,
    description: 'Expert guide with deep knowledge of Jharkhand\'s tribal culture and wildlife. Specializes in eco-tourism and cultural immersion experiences.'
  },
  {
    id: 'guide_002',
    name: 'Sunita Devi Oraon',
    rating: 4.8,
    experience: '6 years',
    languages: ['Hindi', 'English', 'Kurukh'],
    specialties: ['Cultural Heritage', 'Traditional Crafts', 'Food Tours'],
    price: '₹1,200/day',
    availability: 'Available Tomorrow',
    phone: '+91 87654 32109',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b641?w=300',
    verified: true,
    blockchainHash: 'bc2b3c4d5e6f7890123456789012345678901bcdef0',
    certifications: ['Cultural Heritage Guide', 'Handicrafts Expert', 'Tourism Board Certified'],
    reviews: 98,
    description: 'Passionate about preserving and sharing Jharkhand\'s rich cultural heritage. Expert in traditional crafts and local cuisine.'
  },
  {
    id: 'guide_003',
    name: 'Manoj Singh Kharwar',
    rating: 4.7,
    experience: '10 years',
    languages: ['Hindi', 'English', 'Kharwar'],
    specialties: ['Adventure Tours', 'Trekking', 'Waterfall Exploration'],
    price: '₹1,800/day',
    availability: 'Available',
    phone: '+91 76543 21098',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
    verified: true,
    blockchainHash: 'bc3c4d5e6f7890123456789012345678901cdef012',
    certifications: ['Adventure Guide', 'Mountain Rescue Certified', 'Safety Expert'],
    reviews: 156,
    description: 'Adventure specialist with extensive experience in trekking and waterfall exploration. Focus on safe and thrilling outdoor experiences.'
  }
];

export function GuideDetails({ isOpen, onClose, placeName }: GuideDetailsProps) {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [verificationStep, setVerificationStep] = useState<'select' | 'qr' | 'verified' | 'invalid' | 'booking' | 'booked'>('select');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const handleGuideSelect = (guide: Guide) => {
    setSelectedGuide(guide);
    setVerificationStep('qr');
  };

  const simulateQRVerification = async () => {
    if (!selectedGuide) return;
    
    setIsVerifying(true);
    
    try {
      // Real blockchain verification using our service
      const result = await BlockchainService.verifyGuide(selectedGuide.blockchainHash);
      
      if (result.isValid && result.guide) {
        setVerificationStep('verified');
      } else {
        setVerificationStep('invalid');
      }
    } catch (error) {
      console.error('Blockchain verification failed:', error);
      setVerificationStep('invalid');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleBookGuide = async () => {
    setIsBooking(true);
    
    // Simulate booking process
    setTimeout(() => {
      setVerificationStep('booked');
      setIsBooking(false);
    }, 2000);
  };

  const resetDialog = () => {
    setSelectedGuide(null);
    setVerificationStep('select');
    setIsVerifying(false);
    setIsBooking(false);
  };

  const handleClose = () => {
    resetDialog();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {placeName ? `Verified Guides for ${placeName}` : 'Verified Guides'}
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {verificationStep === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid gap-4">
                {verifiedGuides.map((guide, index) => (
                  <motion.div
                    key={guide.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="cursor-pointer hover:shadow-lg transition-all duration-300" 
                          onClick={() => handleGuideSelect(guide)}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="relative">
                            <ImageWithFallback
                              src={guide.image}
                              alt={guide.name}
                              className="w-20 h-20 rounded-full object-cover"
                            />
                            {guide.verified && (
                              <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                                <Shield className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-lg font-semibold">{guide.name}</h3>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                  <Star className="w-4 h-4 text-yellow-500" />
                                  <span>{guide.rating}</span>
                                  <span>({guide.reviews} reviews)</span>
                                  <span>•</span>
                                  <span>{guide.experience}</span>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <div className="text-lg font-semibold text-green-600">{guide.price}</div>
                                <Badge variant={guide.availability.includes('Today') ? 'default' : 'secondary'}>
                                  {guide.availability}
                                </Badge>
                              </div>
                            </div>
                            
                            <p className="text-gray-600 text-sm mt-2">{guide.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mt-3">
                              {guide.specialties.map((specialty) => (
                                <Badge key={specialty} variant="outline" className="text-xs">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <Languages className="w-4 h-4 mr-1" />
                                  {guide.languages.join(', ')}
                                </div>
                                <div className="flex items-center">
                                  <Phone className="w-4 h-4 mr-1" />
                                  {guide.phone}
                                </div>
                              </div>
                              
                              <Button variant="outline" size="sm">
                                Select Guide →
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {verificationStep === 'qr' && selectedGuide && (
            <motion.div
              key="qr"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-6"
            >
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Verify Guide Credentials</h3>
                <p className="text-gray-600 mb-6">
                  Scan the QR code to verify {selectedGuide.name}'s credentials against our secure blockchain database
                </p>
                
                <motion.div
                  className="bg-white p-8 rounded-lg shadow-lg mx-auto max-w-sm"
                  animate={isVerifying ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 1, repeat: isVerifying ? Infinity : 0 }}
                >
                  <QrCode className="w-32 h-32 mx-auto mb-4 text-gray-800" />
                  <p className="text-sm text-gray-600 mb-2">
                    Blockchain Hash:
                  </p>
                  <p className="text-xs font-mono bg-gray-100 p-2 rounded break-all">
                    {selectedGuide.blockchainHash}
                  </p>
                </motion.div>
                
                <div className="mt-6 space-x-4">
                  <Button 
                    onClick={simulateQRVerification}
                    disabled={isVerifying}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isVerifying ? 'Verifying...' : 'Simulate QR Scan'}
                  </Button>
                  <Button variant="outline" onClick={() => setVerificationStep('select')}>
                    Back to Guides
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {verificationStep === 'verified' && selectedGuide && (
            <motion.div
              key="verified"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="text-green-600"
              >
                <CheckCircle className="w-24 h-24 mx-auto mb-4" />
              </motion.div>
              
              <div>
                <h3 className="text-2xl font-semibold text-green-600 mb-2">
                  Guide Verified Successfully!
                </h3>
                <p className="text-gray-600 mb-6">
                  {selectedGuide.name}'s credentials have been verified against our blockchain database.
                  This guide is certified and trusted.
                </p>
                
                <div className="bg-green-50 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold mb-3">Verified Certifications:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedGuide.certifications.map((cert, index) => (
                      <motion.div
                        key={cert}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-green-700"
                      >
                        <Award className="w-4 h-4 mr-2" />
                        {cert}
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  onClick={() => setVerificationStep('booking')}
                  className="bg-green-600 hover:bg-green-700 mr-4"
                  size="lg"
                >
                  Book This Guide
                </Button>
                <Button variant="outline" onClick={() => setVerificationStep('select')}>
                  Choose Different Guide
                </Button>
              </div>
            </motion.div>
          )}

          {verificationStep === 'invalid' && (
            <motion.div
              key="invalid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="text-red-600"
              >
                <XCircle className="w-24 h-24 mx-auto mb-4" />
              </motion.div>
              
              <div>
                <h3 className="text-2xl font-semibold text-red-600 mb-2">
                  Verification Failed
                </h3>
                <p className="text-gray-600 mb-6">
                  The guide's credentials could not be verified against our blockchain database.
                  Please try with a different verified guide.
                </p>
                
                <Button 
                  onClick={() => setVerificationStep('select')}
                  variant="outline"
                >
                  Choose Different Guide
                </Button>
              </div>
            </motion.div>
          )}

          {verificationStep === 'booking' && selectedGuide && (
            <motion.div
              key="booking"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Book Your Guide</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Guide Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-600" />
                        {selectedGuide.name}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-2 text-yellow-500" />
                        {selectedGuide.rating} ({selectedGuide.reviews} reviews)
                      </div>
                      <div className="flex items-center">
                        <CreditCard className="w-4 h-4 mr-2 text-gray-600" />
                        {selectedGuide.price}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-600" />
                        {selectedGuide.phone}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Payment Method</h4>
                    <div className="bg-white p-4 rounded-lg border">
                      <div className="flex items-center">
                        <CreditCard className="w-5 h-5 mr-3 text-green-600" />
                        <div>
                          <p className="font-medium">Onsite Hand Payment</p>
                          <p className="text-sm text-gray-600">Pay directly to the guide in cash</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Important Notes:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Payment to be made directly to the guide in cash</li>
                    <li>• Guide will contact you within 2 hours to confirm booking</li>
                    <li>• Cancellation allowed up to 24 hours before the tour</li>
                  </ul>
                </div>
                
                <div className="mt-6 space-x-4">
                  <Button 
                    onClick={handleBookGuide}
                    disabled={isBooking}
                    className="bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    {isBooking ? 'Confirming Booking...' : 'Confirm Booking'}
                  </Button>
                  <Button variant="outline" onClick={() => setVerificationStep('verified')}>
                    Back
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {verificationStep === 'booked' && selectedGuide && (
            <motion.div
              key="booked"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="text-green-600"
              >
                <CheckCircle className="w-24 h-24 mx-auto mb-4" />
              </motion.div>
              
              <div>
                <h3 className="text-2xl font-semibold text-green-600 mb-2">
                  Booking Confirmed! ✓
                </h3>
                <p className="text-gray-600 mb-6">
                  Your guide {selectedGuide.name} has been successfully booked.
                  They will contact you shortly to finalize the details.
                </p>
                
                <div className="bg-green-50 rounded-lg p-6 mb-6 text-left">
                  <h4 className="font-semibold mb-3">Booking Details:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Guide:</span>
                      <span>{selectedGuide.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rate:</span>
                      <span>{selectedGuide.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment:</span>
                      <span>Onsite Cash Payment</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="text-green-600 font-medium">✓ Confirmed</span>
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleClose} size="lg">
                  Close
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}