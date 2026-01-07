import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  MapPin, 
  CheckCircle, 
  Circle, 
  Calendar, 
  Clock, 
  Star,
  Camera,
  Navigation,
  Trophy,
  Share2
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TripCheckpoint {
  id: string;
  name: string;
  location: string;
  image: string;
  completed: boolean;
  completedAt?: Date;
  estimatedDuration: string;
  description: string;
  rating?: number;
  photos?: string[];
}

const mockTrip = {
  id: 'trip-001',
  name: 'Jharkhand Nature Explorer',
  startDate: '2025-01-10',
  endDate: '2025-01-13',
  totalDays: 4,
  completedCheckpoints: 2,
  totalCheckpoints: 5,
  status: 'In Progress' as const,
  checkpoints: [
    {
      id: 'cp1',
      name: 'Hundru Falls',
      location: 'Ranchi',
      image: 'https://images.unsplash.com/photo-1652975247627-a29239ba56be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmZhbGwlMjBuYXR1cmUlMjBzY2VuaWN8ZW58MXx8fHwxNzU3MjcyNDUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      completed: true,
      completedAt: new Date('2025-01-10T14:30:00'),
      estimatedDuration: '3 hours',
      description: 'Magnificent 98-foot waterfall perfect for photography',
      rating: 5,
      photos: ['photo1.jpg', 'photo2.jpg']
    },
    {
      id: 'cp2',
      name: 'Rock Garden',
      location: 'Ranchi',
      image: 'https://images.unsplash.com/photo-1740036470869-a4e5495abd42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqaGFya2hhbmQlMjBuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU3MjcyNDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      completed: true,
      completedAt: new Date('2025-01-11T11:15:00'),
      estimatedDuration: '2 hours',
      description: 'Beautiful rock formations and artistic gardens',
      rating: 4,
      photos: ['photo3.jpg']
    },
    {
      id: 'cp3',
      name: 'Netarhat Hill Station',
      location: 'Latehar',
      image: 'https://images.unsplash.com/photo-1740036470869-a4e5495abd42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqaGFya2hhbmQlMjBuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU3MjcyNDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      completed: false,
      estimatedDuration: '4 hours',
      description: 'Queen of Chotanagpur - stunning sunrise and sunset views'
    },
    {
      id: 'cp4',
      name: 'Betla National Park',
      location: 'Latehar',
      image: 'https://images.unsplash.com/photo-1740036470869-a4e5495abd42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqaGFya2hhbmQlMjBuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU3MjcyNDQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      completed: false,
      estimatedDuration: '6 hours',
      description: 'Wildlife sanctuary with tigers, elephants and diverse flora'
    },
    {
      id: 'cp5',
      name: 'Dassam Falls',
      location: 'Taimara',
      image: 'https://images.unsplash.com/photo-1652975247627-a29239ba56be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqaGFya2hhbmQlMjBuYXR1cmUlMjBzY2VuaWN8ZW58MXx8fHwxNzU3MjcyNDUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      completed: false,
      estimatedDuration: '3 hours',
      description: 'Spectacular 144-foot cascade perfect for nature lovers'
    }
  ] as TripCheckpoint[]
};

export function MyTrip() {
  const [trip, setTrip] = useState(mockTrip);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<TripCheckpoint | null>(null);

  const progressPercentage = (trip.completedCheckpoints / trip.totalCheckpoints) * 100;

  const markCheckpointComplete = (checkpointId: string, rating: number) => {
    setTrip(prev => ({
      ...prev,
      checkpoints: prev.checkpoints.map(cp => 
        cp.id === checkpointId 
          ? { 
              ...cp, 
              completed: true, 
              completedAt: new Date(),
              rating: rating 
            }
          : cp
      ),
      completedCheckpoints: prev.completedCheckpoints + 1
    }));
    setSelectedCheckpoint(null);
  };

  const shareProgress = () => {
    const shareText = `I'm exploring Jharkhand! ${trip.completedCheckpoints}/${trip.totalCheckpoints} destinations completed. Check out my journey! #JharkhandTourism`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Jharkhand Trip Progress',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
    }
  };

  const getTripStatus = () => {
    if (trip.completedCheckpoints === 0) return 'Not Started';
    if (trip.completedCheckpoints === trip.totalCheckpoints) return 'Completed';
    return 'In Progress';
  };

  const getStatusColor = () => {
    const status = getTripStatus();
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'In Progress': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="w-12 h-12 text-green-600 mr-3" />
            <h2 className="text-4xl">My Trip Progress</h2>
          </div>
          <p className="text-xl text-gray-600">
            Track your journey through Jharkhand's beautiful destinations
          </p>
        </div>

        {/* Trip Overview */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl mb-2">{trip.name}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {trip.totalDays} days
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                <Badge className={getStatusColor()}>
                  {getTripStatus()}
                </Badge>
                <Button
                  onClick={shareProgress}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Progress</span>
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Trip Progress</span>
                <span className="text-sm text-gray-600">
                  {trip.completedCheckpoints}/{trip.totalCheckpoints} destinations
                </span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <div className="text-center mt-2">
                <span className="text-lg">{Math.round(progressPercentage)}% Complete</span>
              </div>
            </div>

            {getTripStatus() === 'Completed' && (
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <Trophy className="w-12 h-12 text-green-600 mx-auto mb-2" />
                <h4 className="text-lg text-green-800 mb-2">🎉 Trip Completed!</h4>
                <p className="text-green-700">
                  Congratulations! You've successfully visited all destinations in your Jharkhand adventure.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Checkpoints */}
        <div className="space-y-6">
          {trip.checkpoints.map((checkpoint, index) => (
            <Card key={checkpoint.id} className={`overflow-hidden ${
              checkpoint.completed ? 'bg-green-50 border-green-200' : 'bg-white'
            }`}>
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Image */}
                  <div className="lg:w-1/3 relative">
                    <ImageWithFallback
                      src={checkpoint.image}
                      alt={checkpoint.name}
                      className="w-full h-48 lg:h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      {checkpoint.completed ? (
                        <div className="bg-green-500 text-white p-2 rounded-full">
                          <CheckCircle className="w-6 h-6" />
                        </div>
                      ) : (
                        <div className="bg-gray-300 text-gray-600 p-2 rounded-full">
                          <Circle className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90">
                        Checkpoint {index + 1}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-xl mb-2">{checkpoint.name}</h4>
                        <div className="flex items-center text-gray-600 text-sm mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          {checkpoint.location}
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          {checkpoint.estimatedDuration}
                        </div>
                      </div>
                      
                      {checkpoint.completed && checkpoint.rating && (
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= checkpoint.rating! 
                                  ? 'text-yellow-500 fill-yellow-500' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm mb-4">{checkpoint.description}</p>

                    {checkpoint.completed ? (
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-green-600">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          <span>
                            Completed on {checkpoint.completedAt?.toLocaleDateString()} at{' '}
                            {checkpoint.completedAt?.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </span>
                        </div>
                        
                        {checkpoint.photos && checkpoint.photos.length > 0 && (
                          <div className="flex items-center text-sm text-gray-600">
                            <Camera className="w-4 h-4 mr-2" />
                            <span>{checkpoint.photos.length} photo{checkpoint.photos.length > 1 ? 's' : ''} captured</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Not visited yet</span>
                        <div className="space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center space-x-2"
                          >
                            <Navigation className="w-4 h-4" />
                            <span>Get Directions</span>
                          </Button>
                          <Button
                            onClick={() => setSelectedCheckpoint(checkpoint)}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Mark as Visited
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Completion Modal/Dialog would go here */}
        {selectedCheckpoint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardContent className="p-6">
                <h3 className="text-lg mb-4">Mark "{selectedCheckpoint.name}" as Visited</h3>
                <p className="text-sm text-gray-600 mb-4">
                  How would you rate your experience at this destination?
                </p>
                
                <div className="flex justify-center space-x-2 mb-6">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => markCheckpointComplete(selectedCheckpoint.id, rating)}
                      className="p-2 hover:bg-gray-100 rounded"
                    >
                      <Star className="w-6 h-6 text-yellow-500 hover:fill-yellow-500" />
                    </button>
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedCheckpoint(null)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => markCheckpointComplete(selectedCheckpoint.id, 5)}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Mark Complete
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}