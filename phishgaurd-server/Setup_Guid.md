### 🛡️ PhishGuard-Server (Universal Backend)

Welcome to the core engine of **PhishGuard**. This is a **NestJS** powered universal backend built to serve the Web Dashboard, Mobile App (Flutter), and Browser Extension.

---

## 🚀 Setup Guide

Follow these steps to get the server running on your local machine.

### **1. Prerequisites**

Ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (Standard package manager)
- **MongoDB** (Local instance or Atlas connection string)

### **2. Installation**

Clone the repository and install the dependencies:

```bash
# Navigate to the server directory
cd PhishGuard-server

# Install all necessary packages
npm install

```

### **3. Environment Configuration**

Create a `.env` file in the root directory and add your credentials. Use the provided `.env.example` as a template:

```bash
# Copy example to real .env
cp .env.example .env

```

_Note: Ensure the `.env` file is included in your `.gitignore` to prevent leaking sensitive credentials._

### **4. Running the Application**

```bash
# Development mode (with Hot Reload)
npm run start:dev

# Production build
npm run build

# Start production server
npm run start:prod

```

The server will be live at: `http://localhost:3000`

---

## 🛠 Tech Stack

- **Framework:** NestJS (Node.js)
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose)
- **Security:** JWT Authentication & SOC-standard validation
- **API Documentation:** Swagger / OpenAPI
- **AI Integration:** Python/FastAPI Bridge

---

## 📂 Project Structure

```text
src/
├── auth/           # JWT Login & Security logic
├── users/          # Profile & User management
├── detection/      # Core Phishing Detection Logic (AI Bridge)
├── common/         # Global Middlewares, Filters & Interceptors
├── main.ts         # Application entry point
└── app.module.ts   # Main root module

```

---

## 📡 Team Collaboration Workflow

To ensure a smooth development process, please follow these steps:

1. **Branching:** Always create a new branch for your task:
   `git checkout -b feature/your-feature-name`
2. **Commit:** Use clear and descriptive commit messages:
   `git commit -m "feat: added phishing URL validation endpoint"`
3. **Pull Request:** Push your branch and open a PR on GitHub for review.

---

> **Tip for Developers:** Once the server is running, you can access the interactive API documentation at `http://localhost:3000/api`. Use this to test endpoints without needing external tools like Postman.

```

---

### **Next Step:**
Would you like me to provide the **Swagger setup code** for your `main.ts` so your team can access the API documentation at the `/api` route?

```
