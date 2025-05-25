# 🌱 Civic Platform

The **Civic Platform** is a full-stack web application that empowers individuals and organizations to create, manage, and support campaigns for social, environmental, and civic causes. With integrated AI, NGO networking, and evidence validation, it transforms civic ideas into actionable movements.

---

## 📚 Table of Contents

- [✨ Features](#-features)
- [🧰 Tech Stack](#-tech-stack)
- [⚙️ Setup Instructions](#-setup-instructions)
- [🔐 Environment Variables](#-environment-variables)
- [📡 API Endpoints](#-api-endpoints)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

### 🌍 Frontend

- 🗳️ **Campaign Management**: Create, view, and manage civic campaigns.
- 🔍 **Smart Search & Filters**: Search by category, location, status, etc.
- 🙋 **Supporter Interaction**: Users can support campaigns publicly or anonymously.
- 📎 **Evidence Uploads**: Photos, documents, and testimonials to boost credibility.
- 🧾 **Activity Timeline**: Track milestones, updates, and major events.
- 👤 **User Profiles**: View campaign contributions and supporter metrics.

### 🧠 Backend

- 📡 **Campaign API**: CRUD + filters, sorting, and pagination.
- 🧪 **AI-Powered Evidence Validation**: Uses Google GenAI to verify media/doc authenticity.
- 📊 **Impact Analytics**: Metrics to measure real-world impact.
- 🧑‍💼 **User Authentication**: JWT-based login, signup, and profile control.
- 🧠 **Network AI (NGO Connector)**:  
  - 🤝 Match campaigns with local NGOs.  
  - 🚨 Facilitate collaboration during natural disasters.  
  - 🗺️ Location-aware support for faster civic responses.

---

## 🧰 Tech Stack

### 🎨 Frontend

- **React** (via Vite)
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Framer Motion** for animations
- **React Icons** for UI assets
- **Context API** for state management

### ⚙️ Backend

- **Express.js**
- **MongoDB** (via Mongoose)
- **JWT** for auth
- **Multer + Cloudinary** for media uploads
- **Redis** for background task queues
- **Google Generative AI** for smart evidence validation

---

## ⚙️ Setup Instructions

### 🧱 Prerequisites

- Node.js `v16+`
- MongoDB instance
- Redis (optional for task queues)
- Cloudinary account

### 🛠️ Installation

git clone    https://github.com/Abhishhek-Verma/Civic-Platform.git

cd civic-platform

Frontend :--

cd frontend

npm install

npm run dev


Backend :-

cd backend

npm install

npm run dev

---
🔐 Environment Variables
You’ll need the following .env variables:
MONGO_URI=your-mongodb-uri

JWT_SECRET=your-secret-key

CLOUDINARY_API_KEY=xxx

CLOUDINARY_API_SECRET=xxx

CLOUDINARY_CLOUD_NAME=your-cloud

GOOGLE_GENAI_KEY=your-api-key

REDIS_URL=redis://localhost:6379

---
📡 API Endpoints
📢 Campaigns
GET /api/campaigns → Fetch with filters

POST  /api/campaigns → Create new

PUT  /api/campaigns/:id → Update

DELETE  /api/campaigns/:id → Remove

🧾 Evidence

POST /api/evidence → Upload

GET /api/evidence/:id → Fetch details

👥 Users
POST  /api/auth/register → New user

POST  /api/auth/login → Authenticate

---
🤝 Contributing
We love community contributions! Here's how:

🍴 Fork the repo

🛠️ Create a feature branch

✅ Commit your changes

🚀 Push and open a PR




