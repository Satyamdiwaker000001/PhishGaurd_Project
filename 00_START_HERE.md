# 🎯 PHISHGUARD - COMPLETE SETUP GUIDE

## ✅ SETUP STATUS: COMPLETE!

All components are installed, built, and ready to run.

---

## 🚀 **START HERE - RUN ALL SERVICES**

### **Option 1: Automatic (Easiest)**
```bash
Double-click: RUN_ALL.bat
```
This launches all 4 services in separate windows.

### **Option 2: Manual Start**

**Terminal 1 - AI Engine:**
```bash
RUN_AI_ENGINE.bat
# or manually:
cd ai_engine
python main.py
```

**Terminal 2 - Backend:**
```bash
RUN_BACKEND.bat
# or manually:
cd phishgaurd-server
npm run start:dev
```

**Terminal 3 - Frontend:**
```bash
RUN_FRONTEND.bat
# or manually:
cd phishguard-web
npm run dev
```

---

## 📋 **Installed Components**

| Component | Status | Port | Command |
|-----------|--------|------|---------|
| **AI Engine** (FastAPI) | ✅ Built | 8001 | `python main.py` |
| **Backend** (NestJS) | ✅ Built | 3000 | `npm run start:dev` |
| **Frontend** (React) | ✅ Built | 5173 | `npm run dev` |
| **Extension** (Chrome) | ✅ Built | - | Load unpacked |
| **Database** (MySQL) | ✅ Ready | 3306 | `Get-Service MySQL80` |

---

## 🌐 **Access Points**

Once services are running, open:

- **Frontend Dashboard**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Swagger Docs**: http://localhost:3000/api
- **AI Engine Docs**: http://localhost:8001

---

## 🔧 **Database Configuration**

```
Host:        localhost
Port:        3306
Username:    root
Password:    rbmi7466
Database:    phishguard_db
```

**File**: `phishgaurd-server/.env`

---

## 🎮 **Browser Extension Setup**

1. Open Chrome → `chrome://extensions/`
2. Toggle **"Developer mode"** (top-right corner)
3. Click **"Load unpacked"**
4. Select: `phishguard-extension/dist`
5. Extension is now active! ✅

**What it does:**
- Intercepts URLs before navigation
- Sends to backend for analysis
- Shows warning page for phishing sites
- Displays confidence & threat reasons

---

## 📁 **Files Created for You**

| File | Purpose |
|------|---------|
| `RUN_ALL.bat` | **Start everything** (Recommended) |
| `RUN_AI_ENGINE.bat` | Start AI Engine only |
| `RUN_BACKEND.bat` | Start Backend only |
| `RUN_FRONTEND.bat` | Start Frontend only |
| `VERIFY_SETUP.bat` | Check system status |
| `QUICK_START.md` | Quick reference guide |
| `SETUP_COMPLETE.md` | Detailed setup info |

---

## 🔄 **System Flow**

```
┌─────────────────────────────────────────────────────────┐
│  1. User visits website in Chrome                       │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│  2. Extension intercepts URL (background.ts)            │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│  3. Sends to Backend (http://localhost:3000/analysis)   │
│     AnalysisService forwards to AI Engine               │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│  4. AI Engine analyzes URL (http://localhost:8001)      │
│     - Tokenizes URL characters                          │
│     - Feeds to CNN model                                │
│     - Generates XAI explanations                        │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│  5. Returns: {                                          │
│       is_phishing: boolean,                             │
│       confidence: 0-1,                                  │
│       threat_level: "Low|Medium|High",                  │
│       reasons: [...]                                    │
│     }                                                   │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│  6. Backend stores in MySQL database                    │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│  7. If phishing detected:                               │
│     - Extension shows warning page (warning.html)       │
│     - User can see threat details                       │
│     - Option to proceed anyway or go back               │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 **ML Model Details**

**Model**: CNN (Convolutional Neural Network)
- **File**: `ai_engine/models/phishguard_model_cnn.h5`
- **Input**: Character-level tokenized URL (150 chars max)
- **Output**: Phishing probability (0-1)
- **Tokenizer**: `ai_engine/models/tokenizer_dictionary.json`

**Analysis Features:**
1. **Lexical Analysis**: URL structure patterns
2. **Keyword Detection**: Phishing keywords (login, verify, bank, etc.)
3. **TLD Analysis**: High-risk domain extensions
4. **Brand Impersonation**: Detecting spoofed brands
5. **URL Anomalies**: Suspicious patterns (hyphens, subdomains, etc.)

---

## 🔐 **Important Security Settings**

### **File: `phishgaurd-server/.env`**

```env
# Change these for production!
JWT_SECRET=your_super_secret_key_here
DB_PASSWORD=rbmi7466  # Change this!
ADMIN_EMAIL=admin@phishguard.com
```

---

## 🛠️ **Maintenance Commands**

### **Kill all services**
```powershell
taskkill /F /IM node.exe
taskkill /F /IM python.exe
```

### **Check if services are running**
```powershell
netstat -ano | findstr :3000    # Backend
netstat -ano | findstr :5173    # Frontend
netstat -ano | findstr :8001    # AI Engine
```

### **Rebuild components**
```bash
# Backend
cd phishgaurd-server && npm run build

# Frontend
cd phishguard-web && npm run build

# Extension
cd phishguard-extension && npm run build
```

### **Install missing dependencies**
```bash
# Backend
cd phishgaurd-server && npm install

# Frontend
cd phishguard-web && npm install

# Extension
cd phishguard-extension && npm install

# AI Engine
cd ai_engine && python -m pip install -r requirements.txt
```

---

## 🐛 **Troubleshooting**

### **"Port already in use"**
```powershell
taskkill /F /IM node.exe
taskkill /F /IM python.exe
```

### **"Cannot connect to database"**
1. Check MySQL is running: `Get-Service MySQL80`
2. If stopped: `Start-Service MySQL80`
3. Test connection: `mysql -u root -prbmi7466`

### **"Extension not loading"**
1. Make sure `phishguard-extension/dist` exists
2. Rebuild: `cd phishguard-extension && npm run build`
3. Clear Chrome cache: `chrome://settings/clearBrowserData`
4. Reload extension in `chrome://extensions/`

### **"AI Engine crashes on startup"**
1. Check Python: `python --version`
2. Install missing packages: `cd ai_engine && python -m pip install -r requirements.txt`
3. Check models exist: `ls ai_engine/models/`

### **"Cannot build extension"**
1. Clear cache: `rm -r phishguard-extension/dist`
2. Rebuild: `cd phishguard-extension && npm run build`

---

## 📈 **Performance Tips**

1. **Ensure MySQL is running** for best performance
2. **Close unnecessary applications** to free up resources
3. **Extension caches results** for 1 session
4. **Backend auto-reloads** on code changes (dev mode)
5. **Frontend hot-reloads** on save

---

## 🎓 **Usage Scenarios**

### **Scenario 1: Test Phishing Detection**
1. Start all services with `RUN_ALL.bat`
2. Open Dashboard at http://localhost:5173
3. Enter a test URL (e.g., `paypa1.com` - typosquatting)
4. See analysis results

### **Scenario 2: Real-time Extension Protection**
1. Load extension in Chrome
2. Browse normally
3. Extension intercepts URLs automatically
4. Warning page appears for phishing sites

### **Scenario 3: Review Analysis History**
1. Open Dashboard
2. Login with credentials
3. View "Analysis Records"
4. See all previous detections

---

## 📞 **Quick Reference**

```bash
# View all service logs
netstat -ano

# Check specific port
netstat -ano | findstr :PORT_NUMBER

# View MySQL databases
mysql -u root -prbmi7466 -e "SHOW DATABASES;"

# View tables in phishguard_db
mysql -u root -prbmi7466 -e "USE phishguard_db; SHOW TABLES;"

# Clear Node cache
rmdir node_modules /s
npm install

# Clear Python cache
python -m pip cache purge
```

---

## ✨ **Features Summary**

✅ **Real-time Phishing Detection** - URLs analyzed instantly  
✅ **CNN ML Model** - Character-level lexical analysis  
✅ **Explainable AI** - Shows why URL is flagged  
✅ **Browser Integration** - Chrome extension  
✅ **Dashboard** - Web interface for analysis  
✅ **API** - REST endpoints for custom integration  
✅ **Authentication** - JWT-based security  
✅ **Database** - MySQL for persistence  
✅ **Hot Reload** - Dev mode auto-recompile  
✅ **Swagger Docs** - Interactive API documentation  

---

## 🎉 **You're All Set!**

### **Next Steps:**

1. **Run**: `RUN_ALL.bat`
2. **Wait**: ~10 seconds for services to start
3. **Open**: http://localhost:5173
4. **Login**: Create account or use demo credentials
5. **Test**: Paste a URL to analyze
6. **Install Extension**: Load from `phishguard-extension/dist`

---

## 📝 **Notes**

- Database credentials are in `phishgaurd-server/.env`
- Models are pre-trained and ready to use
- All dependencies are installed
- All projects are built and compiled
- MySQL service must be running

---

**PhishGuard v1.0 - Real-time Phishing Detection System**  
**Setup Complete: April 21, 2026**  
**Status: ✅ READY TO RUN**

---

For detailed component information, see:
- `QUICK_START.md` - Quick reference
- `SETUP_COMPLETE.md` - Detailed setup info
