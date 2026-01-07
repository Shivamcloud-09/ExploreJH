import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Star, Send, ThumbsUp } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function Feedback() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    feedback: '',
    suggestion: ''
  });

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.feedback || rating === 0) {
      toast.error('Please fill all required fields and provide a rating');
      return;
    }

    // Mock feedback submission
    toast.success('Thank you for your feedback! We appreciate your input.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      experience: '',
      feedback: '',
      suggestion: ''
    });
    setRating(0);
  };

  const experienceOptions = [
    'Tourist Places',
    'Cultural Activities',
    'Marketplace',
    'Guide Services',
    'Transportation',
    'Accommodation',
    'Overall Experience'
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">Your Feedback Matters</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Help us improve your Jharkhand tourism experience by sharing your thoughts and suggestions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Experience Category */}
                  <div>
                    <Label htmlFor="experience">Which aspect would you like to review?</Label>
                    <select
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select an aspect</option>
                      {experienceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Rating */}
                  <div>
                    <Label>Overall Rating *</Label>
                    <div className="flex items-center space-x-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingClick(star)}
                          onMouseEnter={() => setHoveredRating(star)}
                          onMouseLeave={() => setHoveredRating(0)}
                          className="p-1 transition-colors"
                        >
                          <Star
                            className={`w-8 h-8 ${
                              star <= (hoveredRating || rating)
                                ? 'text-yellow-500 fill-yellow-500'
                                : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-3 text-sm text-gray-600">
                        {rating > 0 && `${rating} star${rating > 1 ? 's' : ''}`}
                      </span>
                    </div>
                  </div>

                  {/* Feedback */}
                  <div>
                    <Label htmlFor="feedback">Your Feedback *</Label>
                    <Textarea
                      id="feedback"
                      value={formData.feedback}
                      onChange={(e) => handleInputChange('feedback', e.target.value)}
                      placeholder="Please share your experience, what you loved, what could be improved..."
                      rows={5}
                      required
                    />
                  </div>

                  {/* Suggestions */}
                  <div>
                    <Label htmlFor="suggestion">Suggestions for Improvement</Label>
                    <Textarea
                      id="suggestion"
                      value={formData.suggestion}
                      onChange={(e) => handleInputChange('suggestion', e.target.value)}
                      placeholder="Any specific suggestions to make Jharkhand tourism better?"
                      rows={3}
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Submit Feedback</span>
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Feedback Stats & Info */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card className="bg-gradient-to-br from-green-500 to-blue-600 text-white">
              <CardContent className="p-6">
                <div className="text-center">
                  <ThumbsUp className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg mb-2">Community Feedback</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-2xl">4.8</div>
                      <div className="text-sm opacity-90">Average Rating</div>
                    </div>
                    <div>
                      <div className="text-2xl">2,450+</div>
                      <div className="text-sm opacity-90">Reviews Received</div>
                    </div>
                    <div>
                      <div className="text-2xl">98%</div>
                      <div className="text-sm opacity-90">Positive Feedback</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Testimonials */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg mb-4">Recent Reviews</h3>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">Priya S.</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      "Amazing cultural workshops! The Dokra art experience was unforgettable."
                    </p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">Raj K.</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      "Great guide service and beautiful waterfalls. Highly recommend!"
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-500">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} className="w-4 h-4 fill-current" />
                        ))}
                        <Star className="w-4 h-4 text-gray-300" />
                      </div>
                      <span className="ml-2 text-sm text-gray-600">Maya T.</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      "Loved the marketplace! Authentic handicrafts and friendly artisans."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg mb-4">Need Help?</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>📧 feedback@jharkhandexplorer.com</div>
                  <div>📞 +91 98765 43210</div>
                  <div>💬 Live Chat Available</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}