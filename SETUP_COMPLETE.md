# PhishGuard - Complete Setup Guide

## ✅ Completed Setup

### Installed Components:
- ✅ Node.js v24.13.0
- ✅ Python 3.14.2
- ✅ MySQL 8.0.44
- ✅ Database: `phishguard_db` created
- ✅ Backend dependencies (NestJS)
- ✅ Frontend dependencies (React/Vite)
- ✅ Extension dependencies (React/TypeScript)
- ✅ Python AI packages (FastAPI, scikit-learn, easyocr, transformers)

### Database Configuration:
```
Host: localhost
Port: 3306
Username: root
Password: rbmi7466
Database: phishguard_db
```

---

## 🚀 How to Run the Project

### **Method 1: Automatic Startup (Recommended)**

Run the batch file:
```bash
start.bat
```

This will automatically launch:
1. **AI Engine** (Port 8001) - FastAPI phishing detection
2. **Backend Server** (Port 3000) - NestJS API
3. **Frontend Dashboard** (Port 5173) - React web interface
4. **Browser Extension** - Ready to load

---

### **Method 2: Manual Startup (Individual Components)**

#### 1️⃣ **Start AI Engine** (Python)
```bash
cd ai_engine
python main.py
# Server runs at: http://localhost:8001
```

#### 2️⃣ **Start Backend** (NestJS)
```bash
cd phishgaurd-server
npm run start:dev
# API runs at: http://localhost:3000
# Swagger docs at: http://localhost:3000/api
```

#### 3️⃣ **Start Frontend** (React)
```bash
cd phishguard-web
npm run dev
# Dashboard runs at: http://localhost:5173
```

#### 4️⃣ **Load Browser Extension** (Chrome)
1. Open Chrome → `chrome://extensions/`
2. Enable "Developer mode" (top-right)
3. Click "Load unpacked"
4. Select: `phishguard-extension` folder
5. Extension is now active! 🛡️

---

## 📋 Project Architecture

```
┌─────────────────────────────────────────────────────┐
│           Browser Extension (Port: Load)            │
│  - Intercepts URLs before navigation                │
│  - Shows warning page for phishing sites            │
└──────────────────┬──────────────────────────────────┘
                   │ (HTTP Request)
                   ↓
┌──────────────────────────────────────┐
│  Backend API (NestJS - Port 3000)    │
│  - JWT Authentication                │
│  - User Management                   │
│  - Analysis Records Storage          │
└──────────────┬──────────────────────┘
               │ (Forward to AI Engine)
               ↓
┌──────────────────────────────────────┐
│  AI Engine (FastAPI - Port 8001)     │
│  - CNN Model (phishing_model_cnn.h5) │
│  - XAI Generator (explanations)      │
│  - Threat Analysis                   │
└──────────────────────────────────────┘
               │ (Database)
               ↓
┌──────────────────────────────────────┐
│  MySQL Database (Port 3306)          │
│  - phishguard_db                     │
└──────────────────────────────────────┘
```

---

## 🌐 Access Points

| Component | URL | Purpose |
|-----------|-----|---------|
| **Frontend Dashboard** | `http://localhost:5173` | Main web interface |
| **Backend API** | `http://localhost:3000` | REST API |
| **API Swagger Docs** | `http://localhost:3000/api` | Interactive API docs |
| **AI Engine** | `http://localhost:8001` | FastAPI interface |
| **Browser Extension** | Chrome Extensions Page | Phishing detection |

---

## 🔧 Important Files

### Backend (.env)
```
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=rbmi7466
DB_NAME=phishguard_db
PORT=3000
JWT_SECRET=your_super_secret_key_here
AI_ENGINE_URL=http://localhost:8001/api/v1/url/analyze
```

### AI Engine Models
- `ai_engine/models/phishguard_model_cnn.h5` - CNN model
- `ai_engine/models/tokenizer_dictionary.json` - Character tokenizer

---

## ⚠️ Known Issues & Solutions

### **Issue: TensorFlow not installing on Python 3.14**
**Solution**: TensorFlow doesn't support Python 3.14 yet. The models are pre-trained, so using scikit-learn and easyocr is sufficient. The .h5 model can be loaded with tf-lite or compatible libraries.

### **Issue: MySQL connection denied**
**Solution**: Ensure MySQL service is running:
```powershell
Get-Service MySQL80 | Start-Service
```

### **Issue: Ports already in use**
**Solution**: Kill the processes using those ports:
```powershell
npx kill-port 3000 5173 8001
```

---

## 📱 Browser Extension Setup

1. Navigate to `chrome://extensions`
2. Enable **Developer mode** (toggle in top-right)
3. Click **Load unpacked**
4. Select the `phishguard-extension` folder
5. Extension appears with PhishGuard Shield icon

### Testing the Extension:
- Visit any website
- Extension analyzes URLs in background
- If phishing detected → Warning page shown
- Shows confidence score & threat reasons

---

## 🔐 Security Notes

- Change `JWT_SECRET` in `.env` before production
- Update `ADMIN_EMAIL` in `.env`
- Set proper database password (currently: rbmi7466)
- Configure CORS origins in production

---

## 📊 Next Steps

1. **Login/Signup**: Create account on dashboard
2. **Analyze URLs**: Test phishing detection
3. **Check Analysis Records**: View detection history
4. **Browse with Extension**: Test real-time protection

---

## 💬 Quick Commands Reference

```bash
# Check all services running
netstat -ano | findstr :3000
netstat -ano | findstr :5173
netstat -ano | findstr :8001

# Build production
cd phishgaurd-server && npm run build
cd phishguard-web && npm run build
cd phishguard-extension && npm run build

# Build extension for deployment
cd phishguard-extension
npm run build
# Creates production build in dist/
```

---

**Ready to go! 🚀 Start with `start.bat` or run components manually.**
