import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Clock, Users, MapPin, Download, Bell, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const culturalActivities = [
  {
    id: 1,
    name: "Santal Folk Dance Workshop",
    type: "Workshop",
    date: "2025-01-15",
    time: "10:00 AM - 2:00 PM",
    location: "Dumka Cultural Center",
    instructor: "Master Jatin Murmu",
    price: "₹500",
    capacity: 20,
    enrolled: 12,
    image: "https://images.unsplash.com/photo-1717011969223-0217a302ec6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGRhbmNlJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzU3MjcyNDU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Learn traditional Santal folk dances including Dong, Lagre, and Karam dances with authentic music and costumes."
  },
  {
    id: 2,
    name: "Dokra Metal Casting Experience",
    type: "Hands-on Workshop",
    date: "2025-01-18",
    time: "9:00 AM - 5:00 PM",
    location: "Tribal Art Village, Ranchi",
    instructor: "Artisan Rajesh Kumar",
    price: "₹800",
    capacity: 15,
    enrolled: 8,
    image: "https://images.unsplash.com/photo-1723864448185-218d7b07e3d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmliYWwlMjBoYW5kaWNyYWZ0cyUyMG1hcmtldHBsYWNlfGVufDF8fHx8MTc1NzI3MjQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Create your own Dokra metal figurines using the ancient lost-wax casting technique passed down through generations."
  },
  {
    id: 3,
    name: "Tribal Cuisine Cooking Class",
    type: "Culinary Experience",
    date: "2025-01-20",
    time: "11:00 AM - 3:00 PM",
    location: "Traditional Kitchen, Chaibasa",
    instructor: "Chef Sunita Oraon",
    price: "₹600",
    capacity: 12,
    enrolled: 10,
    image: "https://images.unsplash.com/photo-1717011969223-0217a302ec6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGRhbmNlJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzU3MjcyNDU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Learn to prepare authentic tribal dishes using traditional ingredients and cooking methods, including bamboo shoot curry and rice beer."
  },
  {
    id: 4,
    name: "Paitkar Scroll Painting",
    type: "Art Workshop",
    date: "2025-01-22",
    time: "2:00 PM - 6:00 PM",
    location: "Art Center, Jamshedpur",
    instructor: "Master Painter Gopal Chitrakar",
    price: "₹700",
    capacity: 18,
    enrolled: 14,
    image: "https://images.unsplash.com/photo-1717011969223-0217a302ec6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGRhbmNlJTIwcGVyZm9ybWFuY2V8ZW58MXx8fHwxNzU3MjcyNDU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Master the art of Paitkar scroll painting, depicting mythological stories and tribal legends on traditional cloth scrolls."
  }
];

export function CulturalExperience() {
  const [enrolledActivities, setEnrolledActivities] = useState<number[]>([]);
  const [reminders, setReminders] = useState<any[]>([]);

  const enrollInActivity = (activity: any) => {
    if (!enrolledActivities.includes(activity.id)) {
      setEnrolledActivities(prev => [...prev, activity.id]);
      
      // Add reminder
      const reminder = {
        id: activity.id,
        name: activity.name,
        date: activity.date,
        time: activity.time,
        location: activity.location
      };
      setReminders(prev => [...prev, reminder]);
    }
  };

  const removeReminder = (id: number) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const downloadCulturalGuide = () => {
    // Mock PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'jharkhand-cultural-guide.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl mb-4">Cultural Experiences</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Immerse yourself in the rich tribal culture of Jharkhand through authentic workshops and activities
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Activities Grid */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {culturalActivities.map((activity) => (
                <Card key={activity.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <ImageWithFallback
                      src={activity.image}
                      alt={activity.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-purple-500 text-white">{activity.type}</Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90 text-gray-800">
                        {activity.price}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl mb-2">{activity.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(activity.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {activity.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {activity.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {activity.enrolled}/{activity.capacity} enrolled
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">By {activity.instructor}</span>
                      <Button
                        onClick={() => enrollInActivity(activity)}
                        disabled={enrolledActivities.includes(activity.id)}
                        className={`${
                          enrolledActivities.includes(activity.id) 
                            ? 'bg-green-500 text-white' 
                            : 'bg-purple-600 hover:bg-purple-700'
                        }`}
                      >
                        {enrolledActivities.includes(activity.id) ? 'Enrolled ✓' : 'Enroll Now'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Cultural Guide Download */}
            <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl mb-2">Jharkhand Cultural Guide</h3>
                    <p className="text-orange-100 text-sm">
                      Download our comprehensive guide to understand the rich cultural heritage, 
                      traditions, festivals, and tribal communities of Jharkhand.
                    </p>
                  </div>
                  <Button
                    onClick={downloadCulturalGuide}
                    variant="secondary"
                    className="bg-white text-orange-600 hover:bg-orange-50 flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reminders Sidebar */}
          <div className="lg:w-1/3">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Bell className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="text-lg">Your Reminders</h3>
                </div>
                
                {reminders.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-8">
                    No reminders yet. Enroll in cultural activities to get reminders.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {reminders.map((reminder) => (
                      <div key={reminder.id} className="bg-purple-50 p-4 rounded-lg">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm mb-1">{reminder.name}</h4>
                            <div className="text-xs text-gray-600 space-y-1">
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(reminder.date).toLocaleDateString()}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {reminder.time}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {reminder.location}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeReminder(reminder.id)}
                            className="text-gray-400 hover:text-red-500 ml-2"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}