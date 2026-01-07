import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Bot, 
  Send, 
  User, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Bus, 
  Car, 
  Navigation
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  itinerary?: any;
}

interface TripPlan {
  totalCost: number;
  duration: number;
  people: number;
  places: string[];
  transportation: any[];
  accommodation: any[];
}

const mockPlaces = [
  'Hundru Falls', 'Dassam Falls', 'Netarhat Hill Station', 'Betla National Park',
  'Jagannath Temple', 'Rock Garden', 'Ranchi Lake', 'Palamau Tiger Reserve'
];

const mockTransportation = [
  {
    type: 'Public Bus',
    route: 'Ranchi → Netarhat',
    cost: 150,
    duration: '3 hours',
    availability: 'Available'
  },
  {
    type: 'Local Taxi',
    route: 'Netarhat → Betla',
    cost: 800,
    duration: '2 hours',
    availability: 'Available'
  },
  {
    type: 'Uber',
    route: 'City Center → Rock Garden',
    cost: 250,
    duration: '45 mins',
    availability: 'Available'
  }
];

export function AITravelBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your ExploreJH AI travel assistant for Jharkhand. I can help you plan the perfect itinerary based on your wishlist, budget, and preferences. Let's start by telling me which places you'd like to visit!",
      timestamp: new Date(),
      suggestions: ['Plan my trip', 'Show popular destinations', 'Budget planning help']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState('initial');
  const [tripData, setTripData] = useState<Partial<TripPlan>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (type: 'user' | 'bot', content: string, suggestions?: string[], itinerary?: any) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      suggestions,
      itinerary
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = (callback: () => void, delay = 1500) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const generateItinerary = (places: string[], budget: number, days: number, people: number) => {
    const transportation = mockTransportation.slice(0, Math.min(places.length, 3));
    const totalTransportCost = transportation.reduce((sum, t) => sum + t.cost, 0);
    const accommodationCost = (budget * 0.4) / days; // 40% of budget for accommodation
    const foodCost = (budget * 0.3) / days; // 30% of budget for food
    const dailyActivityCost = Math.round((budget - totalTransportCost) / days);

    // Enhanced daily plan generation for all requested days
    const dailyPlan = [];
    
    for (let day = 1; day <= days; day++) {
      if (day <= places.length) {
        // Assign specific places to days
        const place = places[day - 1];
        const activities = getActivitiesForPlace(place);
        dailyPlan.push({
          day,
          destination: place,
          activities,
          estimatedCost: dailyActivityCost,
          timeSlots: {
            morning: `Visit ${place} - Main attraction`,
            afternoon: `Explore local markets and cuisine`,
            evening: `Sunset photography and relaxation`
          },
          meals: {
            breakfast: `Local breakfast near ${place}`,
            lunch: `Traditional Jharkhandi thali`,
            dinner: `Regional specialties`
          }
        });
      } else {
        // For extra days, revisit favorite places or explore nearby areas
        const revisitPlace = places[Math.floor(Math.random() * places.length)];
        dailyPlan.push({
          day,
          destination: `Explore more of ${revisitPlace} area`,
          activities: ['Deep exploration', 'Hidden gems discovery', 'Local interaction'],
          estimatedCost: dailyActivityCost * 0.8, // Slightly less for revisit days
          timeSlots: {
            morning: `Discover hidden spots around ${revisitPlace}`,
            afternoon: `Visit nearby villages and interact with locals`,
            evening: `Cultural activities and folk performances`
          },
          meals: {
            breakfast: `Village-style breakfast`,
            lunch: `Picnic lunch in scenic location`,
            dinner: `Home-style dinner with local family`
          }
        });
      }
    }

    // Generate multiple accommodation options based on days
    const accommodations = [];
    for (let i = 0; i < Math.ceil(days / 2); i++) {
      accommodations.push({
        name: i === 0 ? 'Hotel Ranchi Plaza' : `${places[i % places.length]} Guest House`,
        cost: accommodationCost,
        rating: 4.2 - (i * 0.1),
        location: i === 0 ? 'Ranchi City Center' : `Near ${places[i % places.length]}`,
        nights: Math.min(2, days - (i * 2))
      });
    }

    return {
      places,
      duration: days,
      people,
      totalCost: budget,
      transportation,
      accommodation: accommodations,
      dailyPlan,
      costBreakdown: {
        accommodation: accommodationCost * days,
        food: foodCost * days,
        transportation: totalTransportCost,
        activities: dailyActivityCost * days - (foodCost * days),
        miscellaneous: budget * 0.1
      }
    };
  };

  const getActivitiesForPlace = (place: string) => {
    const activityMap: { [key: string]: string[] } = {
      'Hundru Falls': ['Waterfall trekking', 'Photography', 'Picnic by the falls'],
      'Dassam Falls': ['Nature walks', 'Rock climbing', 'Swimming'],
      'Netarhat Hill Station': ['Sunrise viewing', 'Hill trekking', 'Pine forest walks'],
      'Betla National Park': ['Wildlife safari', 'Bird watching', 'Nature photography'],
      'Jagannath Temple': ['Temple visit', 'Religious ceremonies', 'Architecture study'],
      'Rock Garden': ['Garden walks', 'Rock formations', 'Peaceful meditation'],
      'Ranchi Lake': ['Boating', 'Lake-side walks', 'Sunset viewing'],
      'Palamau Tiger Reserve': ['Tiger spotting', 'Jeep safari', 'Wildlife photography']
    };
    
    return activityMap[place] || ['Sightseeing', 'Photography', 'Local cuisine exploration'];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage('user', inputValue);
    const userInput = inputValue.toLowerCase();
    setInputValue('');

    simulateTyping(() => {
      processUserInput(userInput);
    });
  };

  const processUserInput = (input: string) => {
    // Handle general questions and help first
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      addMessage('bot', "Hello! I'm your AI travel assistant for Jharkhand. I can help you plan amazing trips, answer questions about places, transportation, and local culture. How can I assist you today?",
        ['Plan a trip', 'Ask about places', 'Transportation info', 'Local culture']);
      return;
    }
    
    if (input.includes('help') || input.includes('what can you do')) {
      addMessage('bot', 
        "I'm here to be your complete Jharkhand travel companion! Here's what I can help you with:\n\n🗺️ **Trip Planning**: Create detailed day-by-day itineraries\n🚌 **Transportation**: Find the best routes and transport options\n💰 **Budget Planning**: Get accurate cost estimates\n🏨 **Accommodation**: Suggest hotels and stays\n📍 **Places**: Information about tourist attractions\n🍽️ **Food**: Local cuisine recommendations\n🎭 **Culture**: Learn about local traditions and festivals\n⚠️ **Safety**: Travel tips and emergency contacts\n\nWhat would you like to explore?",
        ['Plan my trip', 'Show famous places', 'Transportation options', 'Local food guide', 'Cultural information']
      );
      return;
    }

    // Handle specific information requests
    if (input.includes('famous') || input.includes('popular') || input.includes('best places') || input.includes('tourist')) {
      addMessage('bot', 
        "Jharkhand has amazing tourist destinations! Here are the most popular ones:\n\n🏔️ **Hill Stations**: Netarhat, Parasnath Hills\n💧 **Waterfalls**: Hundru Falls, Dassam Falls, Jonha Falls\n🐅 **Wildlife**: Betla National Park, Palamau Tiger Reserve\n🏛️ **Religious Sites**: Jagannath Temple, Baidyanath Dham\n🌸 **Gardens**: Rock Garden Ranchi, Jubilee Park\n⛰️ **Adventure**: Dalma Wildlife Sanctuary, Ranchi Hills\n\nWhich type of destination interests you most?",
        ['Plan trip to these places', 'Tell me about waterfalls', 'Wildlife safaris', 'Religious sites', 'Adventure activities']
      );
      return;
    }

    if (input.includes('food') || input.includes('cuisine') || input.includes('eat') || input.includes('restaurant')) {
      addMessage('bot', 
        "Jharkhand offers delicious traditional cuisine! Must-try local foods:\n\n🍚 **Main Dishes**: Litti Chokha, Dhuska, Pitha\n🥘 **Curries**: Santhal Chicken, Rugra (mushroom curry)\n🍜 **Tribal Delicacies**: Handia (rice beer), Mahua flowers\n🥗 **Vegetables**: Bamboo shoots, wild greens\n🍰 **Sweets**: Thekua, Tilkut, Khaja\n\nWould you like me to include food experiences in your trip planning?",
        ['Yes, plan food tour', 'Best restaurants', 'Local markets', 'Cooking experiences']
      );
      return;
    }

    if (input.includes('culture') || input.includes('festival') || input.includes('tradition') || input.includes('tribal')) {
      addMessage('bot', 
        "Jharkhand has rich tribal culture and vibrant festivals:\n\n🎭 **Major Festivals**: Sarhul (spring festival), Karma, Sohrai\n👥 **Tribal Communities**: Santhal, Munda, Oraon, Ho\n🎨 **Arts & Crafts**: Sohrai paintings, tribal jewelry, bamboo crafts\n🎵 **Music & Dance**: Santhal dance, Mundari music, Karma dance\n🏛️ **Heritage Sites**: Tribal museums, ancient temples\n\nWhen are you planning to visit? I can suggest festivals happening during your trip!",
        ['Plan cultural tour', 'Festival calendar', 'Art and crafts', 'Tribal experiences']
      );
      return;
    }

    if (input.includes('transport') || input.includes('how to reach') || input.includes('bus') || input.includes('train')) {
      addMessage('bot', 
        "Here are the transportation options in Jharkhand:\n\n✈️ **Airport**: Birsa Munda Airport (Ranchi)\n🚂 **Railways**: Major stations - Ranchi, Dhanbad, Jamshedpur\n🚌 **Buses**: State transport, private operators\n🚗 **Road**: Well-connected highways\n🏍️ **Local**: Auto-rickshaws, taxis, bike rentals\n\nWhich route are you looking for?",
        ['Plan my route', 'Bus timings', 'Train bookings', 'Local transport']
      );
      return;
    }

    if (input.includes('safety') || input.includes('emergency') || input.includes('contact') || input.includes('sos')) {
      addMessage('bot', 
        "Safety is important! Here are emergency contacts and tips:\n\n🚨 **Emergency Numbers**:\n• Police: 100\n• Medical: 108\n• Tourist Helpline: 1363\n\n⚠️ **Safety Tips**:\n• Carry ID and emergency contacts\n• Inform someone about your itinerary\n• Stay hydrated in tribal areas\n• Respect local customs\n• Use registered tour guides\n\nWould you like me to include safety checkpoints in your itinerary?",
        ['Yes, add safety info', 'Emergency contacts', 'Travel insurance', 'Local guide contacts']
      );
      return;
    }

    // Trip planning flow
    if (currentStep === 'initial' || input.includes('plan') || input.includes('trip') || input.includes('itinerary')) {
      setCurrentStep('places');
      addMessage('bot', 
        "Excellent! Let's plan your perfect Jharkhand adventure. Here are some amazing destinations to choose from. You can select multiple places - just tell me which ones catch your interest:",
        mockPlaces
      );
    } else if (currentStep === 'places') {
      const selectedPlaces = mockPlaces.filter(place => 
        input.includes(place.toLowerCase()) || 
        place.toLowerCase().includes(input.split(' ')[0])
      );
      
      if (selectedPlaces.length === 0) {
        // Try to extract any mentioned places or use defaults
        const words = input.toLowerCase().split(' ');
        const foundPlaces = mockPlaces.filter(place => 
          words.some(word => place.toLowerCase().includes(word))
        );
        setTripData(prev => ({ ...prev, places: foundPlaces.length > 0 ? foundPlaces : ['Hundru Falls', 'Netarhat Hill Station', 'Betla National Park'] }));
      } else {
        setTripData(prev => ({ ...prev, places: selectedPlaces }));
      }
      
      setCurrentStep('budget');
      addMessage('bot', 
        `Perfect! I've noted ${selectedPlaces.length > 0 ? selectedPlaces.join(', ') : 'some great destinations'} for your trip. Now, what's your budget for this adventure? This will help me suggest the best options for accommodation, food, and activities.`,
        ['₹5,000', '₹10,000', '₹15,000', '₹20,000+']
      );
    } else if (currentStep === 'budget') {
      const budget = parseInt(input.replace(/[^\d]/g, '')) || 10000;
      setTripData(prev => ({ ...prev, totalCost: budget }));
      setCurrentStep('duration');
      addMessage('bot', 
        `Great! With a budget of ₹${budget.toLocaleString()}, I can plan a wonderful trip for you. How many days are you planning to explore Jharkhand? More days mean we can cover more places at a relaxed pace.`,
        ['2 days', '3 days', '4 days', '5 days', '7+ days']
      );
    } else if (currentStep === 'duration') {
      const days = parseInt(input.replace(/[^\d]/g, '')) || 3;
      setTripData(prev => ({ ...prev, duration: days }));
      setCurrentStep('people');
      addMessage('bot', 
        `${days} days is perfect for a comprehensive Jharkhand experience! How many people will be traveling? This helps me calculate costs and suggest appropriate accommodations.`,
        ['Just me (Solo)', '2 people (Couple)', '3-4 people (Small group)', '5+ people (Large group)']
      );
    } else if (currentStep === 'people') {
      const people = parseInt(input.replace(/[^\d]/g, '')) || 1;
      setTripData(prev => ({ ...prev, people }));
      
      // Generate complete itinerary
      const completeTrip = { ...tripData, people };
      const itinerary = generateItinerary(
        completeTrip.places || ['Hundru Falls', 'Netarhat Hill Station'],
        completeTrip.totalCost || 10000,
        completeTrip.duration || 3,
        people
      );
      
      setCurrentStep('complete');
      addMessage('bot', 
        `Fantastic! I've created a comprehensive ${itinerary.duration}-day itinerary for ${people} ${people === 1 ? 'person' : 'people'}. This includes detailed daily plans, transportation options, accommodation suggestions, and cost breakdowns. Your adventure awaits!`,
        ['Modify itinerary', 'Book accommodations', 'Get guide contacts', 'Start new planning'],
        itinerary
      );
    } else {
      // Default response for unrecognized input
      const responses = [
        "I'd love to help you with that! Could you be more specific about what you're looking for?",
        "That's interesting! How can I assist you with your Jharkhand travel plans?",
        "I'm here to help! What aspect of Jharkhand travel would you like to know about?",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      addMessage('bot', randomResponse,
        ['Plan a trip', 'Ask about places', 'Transportation info', 'Food & culture', 'Emergency help']);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    handleSendMessage();
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Bot className="w-12 h-12 text-blue-600 mr-3" />
            <h2 className="text-4xl">AI Travel Assistant</h2>
          </div>
          <p className="text-xl text-gray-600">
            Get personalized itineraries, transportation options, and budget planning powered by AI
          </p>
        </div>

        <Card className="h-[600px] flex flex-col">
          {/* Chat Messages */}
          <CardContent className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user' ? 'bg-blue-600' : 'bg-green-600'
                      }`}>
                        {message.type === 'user' ? 
                          <User className="w-4 h-4 text-white" /> : 
                          <Bot className="w-4 h-4 text-white" />
                        }
                      </div>
                      <div className={`p-3 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white border shadow-sm'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    
                    {/* Suggestions */}
                    {message.suggestions && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    {/* Itinerary Display */}
                    {message.itinerary && (
                      <Card className="mt-4 bg-green-50 border-green-200">
                        <CardContent className="p-4">
                          <h4 className="text-lg mb-3 text-green-800">Your Personalized Itinerary</h4>
                          
                          {/* Trip Overview */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-center">
                              <Calendar className="w-5 h-5 mx-auto mb-1 text-green-600" />
                              <div className="text-sm font-medium">{message.itinerary.duration} Days</div>
                            </div>
                            <div className="text-center">
                              <Users className="w-5 h-5 mx-auto mb-1 text-green-600" />
                              <div className="text-sm font-medium">{message.itinerary.people} People</div>
                            </div>
                            <div className="text-center">
                              <DollarSign className="w-5 h-5 mx-auto mb-1 text-green-600" />
                              <div className="text-sm font-medium">₹{message.itinerary.totalCost.toLocaleString()}</div>
                            </div>
                            <div className="text-center">
                              <MapPin className="w-5 h-5 mx-auto mb-1 text-green-600" />
                              <div className="text-sm font-medium">{message.itinerary.places.length} Places</div>
                            </div>
                          </div>
                          
                          {/* Transportation */}
                          <div className="mb-4">
                            <h5 className="text-sm font-medium mb-2 text-green-800">Transportation</h5>
                            <div className="space-y-2">
                              {message.itinerary.transportation.map((transport: any, index: number) => (
                                <div key={index} className="flex items-center justify-between bg-white p-2 rounded text-sm">
                                  <div className="flex items-center">
                                    {transport.type === 'Public Bus' && <Bus className="w-4 h-4 mr-2 text-blue-600" />}
                                    {transport.type === 'Local Taxi' && <Car className="w-4 h-4 mr-2 text-yellow-600" />}
                                    {transport.type === 'Uber' && <Navigation className="w-4 h-4 mr-2 text-green-600" />}
                                    <span>{transport.route}</span>
                                  </div>
                                  <div className="text-right">
                                    <div>₹{transport.cost}</div>
                                    <div className="text-xs text-gray-500">{transport.duration}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Cost Breakdown */}
                          {message.itinerary.costBreakdown && (
                            <div className="mb-4">
                              <h5 className="text-sm font-medium mb-2 text-green-800">Cost Breakdown</h5>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="bg-white p-2 rounded">
                                  <span className="text-gray-600">Accommodation:</span>
                                  <span className="float-right">₹{Math.round(message.itinerary.costBreakdown.accommodation).toLocaleString()}</span>
                                </div>
                                <div className="bg-white p-2 rounded">
                                  <span className="text-gray-600">Food:</span>
                                  <span className="float-right">₹{Math.round(message.itinerary.costBreakdown.food).toLocaleString()}</span>
                                </div>
                                <div className="bg-white p-2 rounded">
                                  <span className="text-gray-600">Transport:</span>
                                  <span className="float-right">₹{Math.round(message.itinerary.costBreakdown.transportation).toLocaleString()}</span>
                                </div>
                                <div className="bg-white p-2 rounded">
                                  <span className="text-gray-600">Activities:</span>
                                  <span className="float-right">₹{Math.round(message.itinerary.costBreakdown.activities).toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {/* Accommodation Details */}
                          <div className="mb-4">
                            <h5 className="text-sm font-medium mb-2 text-green-800">Accommodation Options</h5>
                            <div className="space-y-2">
                              {message.itinerary.accommodation.map((hotel: any, index: number) => (
                                <div key={index} className="bg-white p-2 rounded text-sm">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <div className="font-medium">{hotel.name}</div>
                                      <div className="text-xs text-gray-600">{hotel.location}</div>
                                      <div className="text-xs text-yellow-600">★ {hotel.rating} • {hotel.nights} nights</div>
                                    </div>
                                    <div className="text-right">
                                      <div>₹{Math.round(hotel.cost)}/night</div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Daily Plan */}
                          <div>
                            <h5 className="text-sm font-medium mb-3 text-green-800">Detailed Daily Itinerary</h5>
                            <div className="space-y-3">
                              {message.itinerary.dailyPlan.map((day: any, index: number) => (
                                <div key={index} className="bg-white p-3 rounded border border-green-200">
                                  <div className="flex justify-between items-center mb-2">
                                    <div className="font-medium text-green-700">Day {day.day}: {day.destination}</div>
                                    <Badge variant="outline" className="bg-green-50">₹{day.estimatedCost}</Badge>
                                  </div>
                                  
                                  <div className="grid md:grid-cols-2 gap-3 text-xs">
                                    <div>
                                      <div className="font-medium text-gray-700 mb-1">Time Schedule</div>
                                      <div className="space-y-1">
                                        <div><span className="text-orange-600">🌅 Morning:</span> {day.timeSlots?.morning || 'Sightseeing'}</div>
                                        <div><span className="text-yellow-600">☀️ Afternoon:</span> {day.timeSlots?.afternoon || 'Local exploration'}</div>
                                        <div><span className="text-purple-600">🌆 Evening:</span> {day.timeSlots?.evening || 'Relaxation'}</div>
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <div className="font-medium text-gray-700 mb-1">Meals Included</div>
                                      <div className="space-y-1">
                                        <div><span className="text-green-600">🍳 Breakfast:</span> {day.meals?.breakfast || 'Local breakfast'}</div>
                                        <div><span className="text-blue-600">🍛 Lunch:</span> {day.meals?.lunch || 'Regional cuisine'}</div>
                                        <div><span className="text-red-600">🍽️ Dinner:</span> {day.meals?.dinner || 'Traditional dinner'}</div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-2 pt-2 border-t border-gray-100">
                                    <div className="font-medium text-gray-700 mb-1">Activities</div>
                                    <div className="flex flex-wrap gap-1">
                                      {day.activities.map((activity: string, actIndex: number) => (
                                        <Badge key={actIndex} variant="secondary" className="text-xs">{activity}</Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white border p-3 rounded-lg shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          
          {/* Input Area */}
          <div className="p-6 border-t bg-gray-50">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message here..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}