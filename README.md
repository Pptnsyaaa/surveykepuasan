# Project Pipit — Smart Campus Survey & AI Face Emotion Detection System

An enterprise-grade, AI-powered satisfaction evaluation platform built specifically for **Politeknik Baja Tegal**. This system bridges real-time artificial intelligence facial recognition with dynamic survey analytics to deliver actionable, objective insights into academic and administrative service quality.

---

## 🌟 Executive Summary

Traditional satisfaction surveys often suffer from response bias and fatigue. **Project Pipit** solves this by integrating **AI Face Emotion Detection** directly into the survey flow. As students evaluate institutional services (such as Academic Administration, Teaching Quality, Library Facilities, and IT Infrastructure), the system analyzes their facial expressions in real-time (`Happy`, `Surprised`, `Neutral`, `Sad`, `Angry`) to verify and enrich their feedback.

### Key Highlights
- **Real-Time Facial Expression Mapping**: Powered by lightweight TensorFlow neural networks (`@vladmandic/face-api`) executing directly in the client browser with zero server latency.
- **Full Administrative Governance**: Dynamic control panel allowing administrators to add, edit, categorize, and reorder survey questions and academic departments on the fly without code redeployment.
- **Deep Analytical Dashboard**: High-fidelity data visualization suite displaying time-series satisfaction trends, cross-department comparisons, and granular respondent analytics.
- **High-Availability Architecture**: Engineered with unified MySQL connection pooling and automated fallback strategies for maximum reliability under high concurrent load.

---

## 🏗️ System Architecture & Technology Stack

```
+-------------------------------------------------------------------------+
|                              CLIENT LAYER                               |
|   React 18 + Vite | Tailwind CSS | Framer Motion | Chart.js / Canvas    |
|   Edge AI Inference: @vladmandic/face-api (Client-side WebGL/WASM)       |
+-------------------------------------------------------------------------+
                                     │
                                     ▼ (REST API / JSON / Cloudflare Tunnel)
+-------------------------------------------------------------------------+
|                              SERVER LAYER                               |
|   Node.js + Express.js | Unified Connection Pooling | CORS & Route Guard |
+-------------------------------------------------------------------------+
                                     │
                                     ▼ (SQL Queries)
+-------------------------------------------------------------------------+
|                             DATABASE LAYER                              |
|   MySQL Relational Database (Surveys, Departments, Questions, Admins)   |
+-------------------------------------------------------------------------+
```

### Core Technologies
* **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Chart.js.
* **Artificial Intelligence**: `@vladmandic/face-api` (SSD Mobilenet V1, Face Landmark 68, Expression Recognition).
* **Backend API**: Node.js (ES Modules), Express.js v5, `mysql2/promise` (Unified Pool).
* **Network & Tunneling**: Cloudflare Tunnel (`cloudflared`) for secure public ingress over HTTP/3 QUIC.

---

## 🚀 Key Features & Capabilities

### 1. AI-Powered Survey Flow (`/`)
* **Dynamic Student Profile Entry**: Synchronized academic department selector linked to live database records.
* **Interactive Question Panel**: Smooth card-based navigation with progress tracking and intuitive UX.
* **Live Camera Emotion Capture**: Evaluates micro-expressions via webcam, providing objective emotional context alongside numeric ratings (`1 - 5 Stars`).
* **Instant Analytical Summary**: Displays response recap immediately upon completion before secure database submission.

### 2. Comprehensive Admin Dashboard (`/admin/dashboard`)
* **Executive Overview**: Key performance indicators including Total Respondents, Overall Satisfaction Index, and Service Benchmarks.
* **Survey Management (`Kelola Survei`)**: Complete CRUD operations for:
  * **Questions & Categories**: Add, modify, or deactivate evaluation criteria.
  * **Academic Departments (`Program Studi`)**: Add or update study programs (`TI`, `TM`, `TO`, `TEI`, etc.) dynamically reflected across all student forms.
* **Trend Analysis (`Tren Waktu`)**: Animated time-series charts illustrating satisfaction trajectories over custom date ranges.
* **Granular Respondent Records (`Data Responden`)**: Detailed audit trail of all survey entries with quick search and export capabilities.

---

## 🛠️ Quick Start Guide

### Prerequisites
* **Node.js** `v18.x` or higher
* **MySQL Server** `v8.x` (e.g., XAMPP, Laragon, or standalone MySQL)

### 1. Database Initialization
1. Create a MySQL database named `db_survey_ai`.
2. Import the main schema located at `database/survey_ai.sql`:
   ```bash
   mysql -u root -p db_survey_ai < database/survey_ai.sql
   ```

### 2. Backend Server Setup
Navigate to the backend directory, install dependencies, and start the API server:
```bash
cd backend
npm install
npm run dev
```
> The backend server will initialize on `http://localhost:5000` with unified MySQL connection pooling (`Pool Active`).

### 3. Frontend Application Setup
Open a new terminal, navigate to the frontend directory, install dependencies, and launch the Vite dev server:
```bash
cd frontend
npm install
npm run dev -- --host --port 5173
```
> Access the local survey interface at `http://localhost:5173/` and the admin portal at `http://localhost:5173/admin/login`.

---

## 🌐 Public Tunneling (Cloudflare Tunnel)

To make the application securely accessible across external mobile devices or external networks without port forwarding:

```bash
cloudflared tunnel --url http://localhost:5173
```
* Cloudflare will generate an encrypted public domain (e.g., `https://<unique-id>.trycloudflare.com`).
* All API calls (`/api/*` and `/analyze`) are automatically proxied through Vite's built-in proxy directly to your local backend (`http://localhost:5000`).

---

## 📁 Directory Structure

```
projectpipit/
├── backend/
│   ├── controllers/
│   │   ├── notificationsController.js  # System alert logic
│   │   ├── settingsController.js       # Dynamic questions & departments CRUD
│   │   └── surveyController.js         # Survey submission & aggregation
│   ├── routes/                         # Express API route declarations
│   ├── scripts/                        # Database seeding & migration utilities
│   ├── db.js                           # Unified MySQL connection pool
│   └── server.js                       # Main application entry point
├── database/
│   └── survey_ai.sql                   # Core relational database schema
├── docs/                               # System documentation & change logs
└── frontend/
    ├── public/                         # Static assets & AI model weights
    └── src/
        ├── components/
        │   ├── dashboard/              # Admin analytical widgets & tables
        │   ├── survey/                 # Student evaluation forms & AI camera panel
        │   └── ui/                     # Reusable design components & background effects
        ├── pages/                      # Application route views
        │   ├── AboutSystem.jsx         # Platform methodology overview
        │   ├── SurveyPage.jsx          # Main student evaluation experience
        │   └── admin/                  # Secure administrative views
        ├── api.js                      # Centralized API endpoint configurations
        └── App.jsx                     # Application routing & layout controller
```

---

## 🔒 Security & Best Practices
* **Unified Database Pooling**: Prevents connection leaks and handles database idle disconnects automatically.
* **Strict Route Guards**: Protects administrative endpoints against unauthenticated access via reactive route verification.
* **Sanitized State Handling**: Full defensive programming checks on all dynamic JSON parsing and DOM manipulations to guarantee zero-crash rendering.

---
*Developed for Politeknik Baja Tegal — Empowering Academic Excellence through Smart Technology.*
