# 🛡️ PhishGuard - Quick Start Guide

**Status**: ✅ Setup Complete & Ready to Run!

---

## 🚀 **FASTEST WAY TO RUN**

**Double-click this file:**
```
RUN_ALL.bat
```

This will launch all 4 components in separate windows automatically!

---

## 📋 **What's Installed & Ready**

✅ **Backend**: NestJS (Port 3000)  
✅ **Frontend**: React + Vite (Port 5173)  
✅ **AI Engine**: FastAPI (Port 8001)  
✅ **Browser Extension**: Ready to load  
✅ **Database**: MySQL phishguard_db  

---

## 🎯 **Run Options**

### **Option 1: Run Everything (Recommended)**
```bash
RUN_ALL.bat
```
Launches all 4 components in separate windows.

### **Option 2: Run Individual Components**

#### **Start AI Engine Only**
```bash
RUN_AI_ENGINE.bat
```
Or:
```bash
cd ai_engine
python main.py
```

#### **Start Backend Only**
```bash
RUN_BACKEND.bat
```
Or:
```bash
cd phishgaurd-server
npm run start:dev
```

#### **Start Frontend Only**
```bash
RUN_FRONTEND.bat
```
Or:
```bash
cd phishguard-web
npm run dev
```

---

## 🌐 **Access Points**

| Component | URL | Purpose |
|-----------|-----|---------|
| **Frontend** | http://localhost:5173 | Main Dashboard |
| **Backend API** | http://localhost:3000 | REST API |
| **API Docs** | http://localhost:3000/api | Swagger Docs |
| **AI Engine** | http://localhost:8001 | FastAPI Docs |

---

## 🔌 **Load Browser Extension**

1. Open **Chrome** (or Edge)
2. Go to `chrome://extensions/`
3. Toggle **"Developer mode"** (top-right)
4. Click **"Load unpacked"**
5. Select the **`phishguard-extension/dist`** folder
6. Extension is now active! 🎉

---

## 🔑 **Database Credentials**

```
Host:     localhost
Port:     3306
User:     root
Password: rbmi7466
Database: phishguard_db
```

Located in: `phishgaurd-server/.env`

---

## 📊 **System Architecture**

```
Browser Extension (localhost:load)
    ↓ (intercepts URLs)
    ↓
Backend API (localhost:3000)
    ↓ (forwards to AI)
    ↓
AI Engine (localhost:8001)
    ↓ (CNN model analysis)
    ↓
MySQL Database (localhost:3306)
```

---

## ✨ **Features**

- **Real-time URL Analysis**: Detects phishing URLs instantly
- **CNN Model**: Character-level lexical analysis
- **XAI (Explainable AI)**: Shows why a URL is flagged
- **Browser Protection**: Extension blocks dangerous sites
- **Dashboard**: View analysis history
- **User Authentication**: JWT-based security

---

## 🐛 **Troubleshooting**

### **Issue: "Port already in use"**
```powershell
# Kill processes on ports
taskkill /F /IM node.exe
taskkill /F /IM python.exe
```

### **Issue: Database connection failed**
- Check MySQL is running: `Get-Service MySQL80`
- Verify credentials in `.env`
- Test connection: `mysql -u root -prbmi7466`

### **Issue: Python dependencies not found**
```bash
cd ai_engine
python -m pip install -r requirements.txt
```

### **Issue: Extension not showing**
- Make sure `phishguard-extension/dist` folder exists
- Try `npm run build` in extension folder
- Clear Chrome cache and reload extension

---

## 📁 **Project Structure**

```
phishgaurd-server/     → Backend (NestJS)
phishguard-web/        → Frontend (React)
ai_engine/             → AI Logic (FastAPI + ML)
phishguard-extension/  → Browser Extension (Chrome)
```

---

## 🎓 **How It Works**

1. **You visit a website**
2. **Extension intercepts the URL**
3. **Sends to Backend API** (http://localhost:3000/analysis/url)
4. **Backend forwards to AI Engine** (http://localhost:8001/api/v1/url/analyze)
5. **AI analyzes using CNN model** (phishguard_model_cnn.h5)
6. **Returns threat assessment**
7. **If phishing: Warning page shown** 🚫
8. **Analysis saved to MySQL database**

---

## 🔐 **Security Notes**

- Change `JWT_SECRET` in `.env` for production
- Update `ADMIN_EMAIL` in `.env`
- Database password: `rbmi7466` (change in production!)
- Models are pre-trained in `ai_engine/models/`

---

## 📞 **Quick Commands**

```bash
# Kill all services
taskkill /F /IM node.exe & taskkill /F /IM python.exe

# Check if ports are in use
netstat -ano | findstr :3000
netstat -ano | findstr :5173
netstat -ano | findstr :8001

# Check MySQL service
Get-Service MySQL80

# Install missing Python packages
python -m pip install easyocr transformers torch

# Rebuild frontend
cd phishguard-web && npm run build

# Rebuild extension
cd phishguard-extension && npm run build
```

---

## 🎉 **Ready to Go!**

**Just run:** `RUN_ALL.bat`

Then open: `http://localhost:5173`

Happy hunting! 🛡️🦅

---

*PhishGuard v1.0 - Real-time Phishing Detection System*
