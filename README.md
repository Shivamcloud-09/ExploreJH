# ExploreJH (Smart Tourism Experience Platform for Jharkhand)

Jharkhand is one of India’s most culturally rich and naturally beautiful states — yet hundreds of stunning destinations, local artisans, and cultural heritage remain undiscovered due to lack of digital visibility, smart guidance, and engaging tourism experience platforms.

Traditional tourism portals are outdated and lack personalization. Travelers struggle with:

- Scattered & unreliable information  
- No smart navigation or trip planning  
- Hidden destinations not highlighted  
- No digital empowerment for artisans & partners  

**ExploreJH** solves this critical gap by providing a **modern, intelligent, experience-driven digital tourism ecosystem**.

---

## Project Overview

**ExploreJH** is a smart tourism innovation platform designed to act as a **digital travel companion for Jharkhand visitors**.

<p align="center">
<img width="936" height="580" alt="image" src="https://github.com/user-attachments/assets/87a36f5f-065d-4759-bda8-d3718eb3bb07" />

---

The platform enables travelers to explore trending destinations, discover hidden gems, experience the culture, and support local artisans — while laying groundwork for future smart tourism and AI-based travel assistance.

Unlike conventional static tourism sites, **ExploreJH focuses on:**
- User Experience  
- Smart Discovery  
- Cultural Empowerment  
- Local Economic Growth  
- Future Scalability  

---

## Deployed Link

**Live Demo:** [explorejh.vercel.app](https://explorejh.vercel.app/)  

---

## Key Features

### Trending Tourist Destinations
- Highlights popular travel locations  
- Rich visual tourism cards  
- Smooth interactive browsing  

---

### Explore Places – Discover Hidden Jharkhand
- Waterfalls  
- Wildlife & Forest Tourism  
- Heritage & Cultural Sites  
- Scenic Nature Spots  
- Smart search experience  

---

### Jharkhand Handicraft Marketplace
A dedicated platform to **empower local tribal artisans**

- Displays authentic handicrafts  
- Promotes culture globally  
- Built to support future:
  - Online shopping  
  - Secure payment integration  
  - Artisan onboarding dashboard  

---

### Planned Smart Travel Enhancements
- Route planning ecosystem  
- AI-powered travel recommendations  
- Personalized tourist assistance  

---

### Partner Ecosystem
- Tourist Guides  
- Drivers / Transport Partners  
- Local Artisans  

Promoting a **sustainable smart tourism economy**.

---

### Government Dashboard (Future Scope)
Designed to enable:
- Tourism analytics  
- Visitor trends  
- Event monitoring  
- Emergency tourism support  

---

## Experience Vision

> ExploreJH is not just a tourism website —  
> It is a **smart digital tourism platform** built to enhance traveler experience, preserve culture, and create real-world social impact.

---

## Getting Started

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm or yarn
- Git
- Google AI API key ([Get free key](https://aistudio.google.com/apikey))

### Setup & Installation

```bash
# Clone the repository
git clone https://github.com/Shivamcloud-09/ExploreJH.git
cd ExploreJH
# Install dependencies
npm install

```

#### Getting Your API Keys:

**Gemini API:**
1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Click "Create API Key"
3. Copy the generated key

### Run the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start

```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## WorkFlow Diagram

---

**The following diagram illustrates the end-to-end workflow of the ExploreJh Smart Tourism Platform, covering users, partners, and government monitoring**

```text
┌───────────────────────────────────────────────────────────────────────────────┐
│                              EXPLOREJH WORKFLOW                                │
└───────────────────────────────────────────────────────────────────────────────┘

                                  ┌──────────────┐
                                  │     USER     │
                                  └──────┬───────┘
                                         │
         ┌───────────────────────────────┼───────────────────────────────┐
         │                               │                               │
         ▼                               ▼                               ▼
┌────────────────────┐      ┌─────────────────────┐     ┌────────────────────┐
│ 1. SIGN UP / LOGIN │      │ 2. EXPLORE PLATFORM │     │ 3. AI ASSISTANT    │
│                    │      │                     │     │                    │
│ Email / OTP        │────▶│ Places / Culture    │────▶│ Multilingual AI    │
│ Secure Auth        │      │ Transport / Events  │     │ Itinerary Planner  │
└────────────────────┘      └─────────────────────┘     └──────────┬─────────┘
                                                                  │
                                          ┌───────────────────────┘
                                          ▼
                           ┌──────────────────────────────────┐
                           │ 4. TRANSPORT & DAY-WISE PLAN     │
                           │                                  │
                           │ Bus • E-Rickshaw • Taxi          │
                           │ Eco Score + Cheapest Route       │
                           └──────────────┬───────────────────┘
                                          │
                                          ▼
                           ┌──────────────────────────────────┐
                           │ 5. SELECT EXPERIENCE             │
                           │                                  │
                           │ Cultural Events • Marketplace    │
                           │ Local Shops & Activities         │
                           └──────────────┬───────────────────┘
                                          │
                                          ▼
                           ┌──────────────────────────────────┐
                           │ 6. GUIDE SELECTION               │
                           │                                  │
                           │ Availability Check               │
                           └──────────────┬───────────────────┘
                                          │
                                          ▼
                           ┌──────────────────────────────────┐
                           │ 7. VERIFICATION                  │
                           │                                  │
                           │ Admin + Blockchain Validation    │
                           └──────────────┬───────────────────┘
                              Verified ✓  │   ✗ Rejected
                                          │
                                          ▼
                           ┌──────────────────────────────────┐
                           │ 8. PAYMENT & BOOKING             │
                           │                                  │
                           │ Razorpay Secure Payment          │
                           └──────────────┬───────────────────┘
                                          │
                                          ▼
                           ┌──────────────────────────────────┐
                           │ 9. TRIP PROGRESS & FEEDBACK      │
                           │                                  │
                           │ Live Updates & Ratings           │
                           └──────────────┬───────────────────┘
                                          │
                                          ▼
                           ┌──────────────────────────────────┐
                           │ 10. SOS & SAFETY SYSTEM          │
                           │                                  │
                           │ Emergency Alerts via Twilio      │
                           └──────────────────────────────────┘


┌───────────────────────────────────────────────────────────────────────────────┐
│                          PARTNER ONBOARDING FLOW                              │
└───────────────────────────────────────────────────────────────────────────────┘

┌────────────────────┐
│ Partner Register   │
│ (Guide / Driver /  │
│  Artisan)          │
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│ Upload Documents   │
│ Aadhaar / License  │
└─────────┬──────────┘
          │
          ▼
┌──────────────────────────────────┐
│ OCR + e-KYC Verification         │
│ AI Validation                    │
└─────────┬────────────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│ Blockchain Hash (Polygon)        │
│ Tamper-proof Record              │
└─────────┬────────────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│ Digital Certificate + QR Code    │
└─────────┬────────────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│ Partner Dashboard                │
│ List Services / Products         │
└──────────────────────────────────┘


┌───────────────────────────────────────────────────────────────────────────────┐
│                        GOVERNMENT DASHBOARD FLOW                              │
└───────────────────────────────────────────────────────────────────────────────┘

┌────────────────────┐
│ Govt Login         │
└─────────┬──────────┘
          │
          ▼
┌──────────────────────────────────────────────────┐
│ Real-Time Monitoring Dashboard                   │
│                                                  │
│ • Tourist Footfall                               │
│ • Revenue Generated                              │
│ • Eco-Transport Usage                            │
│ • Partner Performance                            │
│ • SOS & Feedback Analytics                       │
└──────────────────────────────────────────────────┘

```

---

## Tech Stack

| Layer            | Technology                                   |
|------------------|----------------------------------------------|
| Frontend         | React.js, TypeScript                         |
| UI / Styling     | Tailwind CSS, Framer Motion                  |
| Icons            | Lucide React                                 |
| AI Chatbot       | Rasa AI                                      |
| AI Validation    | Google Gemini 2.5 Flash                      |
| AR / VR          | Three.js                                     |
| Authentication   | Supabase Auth                                |
| Database         | Supabase (PostgreSQL)                        |
| Blockchain       | Polygon (Mumbai), Hardhat                    |
| OCR              | Tesseract.js                                 |
| Payments         | Razorpay                                     |
| Notifications    | Twilio (SMS / SOS)                           |
| Maps & Geo       | Leaflet.js, OpenStreetMap                    |
| Deployment       | Vercel / Cloud Workstations (IDX)            |
 

---

## Deployed Prototype

```
https://depict-forest-13891461.figma.site

```

---

## Usage Instructions

1. Launch the web application  

2. Explore:

   - Trending Places  
   - Explore More Tourism Categories  
   - Handicraft Marketplace  
   - Partner Modules  

3. Discover destinations  
4. Experience smart digital tourism  

---

## Social Impact

- Promotes Jharkhand tourism globally  
- Empowers local artisans economically  
- Digitally preserves culture & heritage  
- Builds sustainable tourism infrastructure  

---

## Conclusion

**ExploreJH** transforms tourism from static browsing into a **smart, engaging, culturally rich digital travel experience**.

By combining:

- Modern digital tourism  
- Artisan empowerment  
- Future AI capabilities  

The platform delivers **strong tourism impact**, **community value**, and a foundation for **smart tourism evolution**.

---

## Contributing

Contributions are welcome and appreciated!  
If you have ideas to improve ExploreJH, enhance UI, or add features, feel free to fork the repo and submit a pull request.

---

 
