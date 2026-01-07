import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Users, 
  Car, 
  ShoppingBag, 
  Upload, 
  CheckCircle,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  Star
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PartnerRegistrationProps {
  onBack: () => void;
}

type PartnerType = 'guide' | 'driver' | 'artisan';

interface FormData {
  personalInfo: {
    fullName: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  professionalInfo: {
    experience: string;
    languages: string;
    specialization: string;
    availability: string;
    pricing: string;
    description: string;
  };
  documents: {
    idProof: File | null;
    addressProof: File | null;
    certificate: File | null;
    photo: File | null;
  };
}

const partnerTypes = {
  guide: {
    title: 'Tourist Guide',
    icon: Users,
    description: 'Share your local knowledge and help tourists explore Jharkhand',
    requirements: [
      'Local knowledge of tourist destinations',
      'Good communication skills',
      'Valid ID proof and address proof',
      'Tourism/hospitality certification (preferred)'
    ],
    specializations: [
      'Wildlife & Nature',
      'Cultural Heritage',
      'Adventure Tourism',
      'Photography Tours',
      'Trekking & Hiking',
      'Historical Sites'
    ]
  },
  driver: {
    title: 'Driver Partner',
    icon: Car,
    description: 'Provide safe and reliable transportation services to tourists',
    requirements: [
      'Valid driving license (minimum 3 years)',
      'Clean driving record',
      'Own vehicle or willing to drive provided vehicle',
      'Good knowledge of local routes'
    ],
    specializations: [
      'City Tours',
      'Inter-city Travel',
      'Airport Transfers',
      'Multi-day Trips',
      'Luxury Transportation',
      'Group Transportation'
    ]
  },
  artisan: {
    title: 'Artisan Partner',
    icon: ShoppingBag,
    description: 'Showcase and sell your traditional handicrafts to tourists',
    requirements: [
      'Authentic traditional craft skills',
      'Quality handmade products',
      'Business registration (preferred)',
      'Portfolio of your work'
    ],
    specializations: [
      'Dokra Metal Casting',
      'Tribal Textiles',
      'Bamboo Crafts',
      'Stone Carving',
      'Pottery & Ceramics',
      'Tribal Jewelry'
    ]
  }
};

export function PartnerRegistration({ onBack }: PartnerRegistrationProps) {
  const [selectedType, setSelectedType] = useState<PartnerType | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      fullName: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: 'Jharkhand',
      pincode: ''
    },
    professionalInfo: {
      experience: '',
      languages: '',
      specialization: '',
      availability: '',
      pricing: '',
      description: ''
    },
    documents: {
      idProof: null,
      addressProof: null,
      certificate: null,
      photo: null
    }
  });

  const updateFormData = (section: keyof FormData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleFileUpload = (field: keyof FormData['documents'], file: File) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitApplication = () => {
    // Mock submission
    toast.success('Application submitted successfully! We will review and contact you within 3-5 business days.');
    onBack();
  };

  const FileUploadField = ({ 
    label, 
    field, 
    required = false, 
    accept = ".pdf,.jpg,.jpeg,.png" 
  }: { 
    label: string; 
    field: keyof FormData['documents']; 
    required?: boolean;
    accept?: string;
  }) => (
    <div>
      <Label htmlFor={field}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
        <div className="space-y-1 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-gray-600">
            <label
              htmlFor={field}
              className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
            >
              <span>Upload a file</span>
              <input
                id={field}
                name={field}
                type="file"
                className="sr-only"
                accept={accept}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(field, file);
                }}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">
            PNG, JPG, PDF up to 10MB
          </p>
          {formData.documents[field] && (
            <div className="flex items-center text-green-600 text-sm">
              <CheckCircle className="w-4 h-4 mr-1" />
              {formData.documents[field]!.name}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (!selectedType) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center space-x-2 mr-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <div className="text-center flex-1">
              <h2 className="text-4xl mb-4">Partner with Us</h2>
              <p className="text-xl text-gray-600">
                Join our network and help tourists discover the beauty of Jharkhand
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(partnerTypes).map(([type, info]) => {
              const Icon = info.icon;
              return (
                <Card 
                  key={type} 
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
                  onClick={() => setSelectedType(type as PartnerType)}
                >
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-2xl mb-2">{info.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{info.description}</p>
                    </div>

                    <div className="text-left">
                      <h4 className="text-sm mb-3">Requirements:</h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {info.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                      Apply as {info.title}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  const currentPartner = partnerTypes[selectedType];
  const Icon = currentPartner.icon;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => currentStep === 1 ? setSelectedType(null) : prevStep()}
            className="flex items-center space-x-2 mr-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <div className="flex items-center flex-1">
            <Icon className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h2 className="text-3xl">{currentPartner.title} Registration</h2>
              <p className="text-gray-600">Step {currentStep} of 4</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center">
            {[1, 2, 3, 4].map((step) => (
              <React.Fragment key={step}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>Personal Info</span>
            <span>Professional Info</span>
            <span>Documents</span>
            <span>Review & Submit</span>
          </div>
        </div>

        <Card>
          <CardContent className="p-8">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <User className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <h3 className="text-xl">Personal Information</h3>
                  <p className="text-gray-600">Please provide your basic details</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.personalInfo.fullName}
                      onChange={(e) => updateFormData('personalInfo', 'fullName', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.personalInfo.phone}
                      onChange={(e) => updateFormData('personalInfo', 'phone', e.target.value)}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.personalInfo.email}
                      onChange={(e) => updateFormData('personalInfo', 'email', e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.personalInfo.city}
                      onChange={(e) => updateFormData('personalInfo', 'city', e.target.value)}
                      placeholder="Enter your city"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Full Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.personalInfo.address}
                    onChange={(e) => updateFormData('personalInfo', 'address', e.target.value)}
                    placeholder="Enter your complete address"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={formData.personalInfo.state}
                      onChange={(e) => updateFormData('personalInfo', 'state', e.target.value)}
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">PIN Code *</Label>
                    <Input
                      id="pincode"
                      value={formData.personalInfo.pincode}
                      onChange={(e) => updateFormData('personalInfo', 'pincode', e.target.value)}
                      placeholder="834001"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Professional Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Star className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <h3 className="text-xl">Professional Information</h3>
                  <p className="text-gray-600">Tell us about your skills and experience</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <select
                      id="experience"
                      value={formData.professionalInfo.experience}
                      onChange={(e) => updateFormData('professionalInfo', 'experience', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select experience</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="languages">Languages Spoken *</Label>
                    <Input
                      id="languages"
                      value={formData.professionalInfo.languages}
                      onChange={(e) => updateFormData('professionalInfo', 'languages', e.target.value)}
                      placeholder="Hindi, English, Santhali, etc."
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="specialization">Specialization *</Label>
                  <select
                    id="specialization"
                    value={formData.professionalInfo.specialization}
                    onChange={(e) => updateFormData('professionalInfo', 'specialization', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select specialization</option>
                    {currentPartner.specializations.map((spec) => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="availability">Availability *</Label>
                    <select
                      id="availability"
                      value={formData.professionalInfo.availability}
                      onChange={(e) => updateFormData('professionalInfo', 'availability', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select availability</option>
                      <option value="part-time">Part-time</option>
                      <option value="full-time">Full-time</option>
                      <option value="weekends">Weekends only</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="pricing">Expected Pricing (per day) *</Label>
                    <Input
                      id="pricing"
                      value={formData.professionalInfo.pricing}
                      onChange={(e) => updateFormData('professionalInfo', 'pricing', e.target.value)}
                      placeholder="₹1000 - ₹2000"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">About Yourself *</Label>
                  <Textarea
                    id="description"
                    value={formData.professionalInfo.description}
                    onChange={(e) => updateFormData('professionalInfo', 'description', e.target.value)}
                    placeholder="Tell us about your experience, skills, and what makes you special..."
                    rows={4}
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 3: Documents */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <FileText className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <h3 className="text-xl">Document Upload</h3>
                  <p className="text-gray-600">Please upload the required documents</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FileUploadField
                    label="ID Proof (Aadhar/PAN/Passport)"
                    field="idProof"
                    required
                  />
                  <FileUploadField
                    label="Address Proof"
                    field="addressProof"
                    required
                  />
                  <FileUploadField
                    label="Professional Certificate"
                    field="certificate"
                  />
                  <FileUploadField
                    label="Profile Photo"
                    field="photo"
                    accept=".jpg,.jpeg,.png"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-2" />
                  <h3 className="text-xl">Review & Submit</h3>
                  <p className="text-gray-600">Please review your information before submitting</p>
                </div>

                <div className="space-y-4">
                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Personal Information</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Name: {formData.personalInfo.fullName}</div>
                        <div>Phone: {formData.personalInfo.phone}</div>
                        <div>Email: {formData.personalInfo.email}</div>
                        <div>City: {formData.personalInfo.city}</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-50">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Professional Information</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Experience: {formData.professionalInfo.experience} years</div>
                        <div>Languages: {formData.professionalInfo.languages}</div>
                        <div>Specialization: {formData.professionalInfo.specialization}</div>
                        <div>Availability: {formData.professionalInfo.availability}</div>
                        <div>Pricing: {formData.professionalInfo.pricing}</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2 text-blue-800">Next Steps</h4>
                      <div className="text-sm text-blue-700 space-y-1">
                        <div>• We will review your application within 3-5 business days</div>
                        <div>• You will receive an email confirmation after submission</div>
                        <div>• Our team may contact you for additional verification</div>
                        <div>• Once approved, you'll receive login credentials</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < 4 ? (
                <Button onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                  Next
                </Button>
              ) : (
                <Button onClick={submitApplication} className="bg-green-600 hover:bg-green-700">
                  Submit Application
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}