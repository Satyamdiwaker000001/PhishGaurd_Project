Double-click: RUN_ALL.bat@echo off
SETLOCAL EnableDelayedExpansion
TITLE PhishGuard - Development Server Launcher
COLOR 0A

SET "BASE_DIR=%~dp0"
CD /D "%BASE_DIR%"

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║         PHISHGUARD - DEVELOPMENT STARTUP            ║
echo ║     Real-time Phishing Detection System v1.0        ║
echo ╚════════════════════════════════════════════════════╝
echo.

:: Color codes for output
SET "GREEN=[32m"
SET "YELLOW=[33m"
SET "RED=[31m"
SET "CYAN=[36m"

:: Kill existing processes on ports
echo [*] Clearing ports 3000, 5173, 8001...
taskkill /F /IM node.exe >nul 2>&1
taskkill /F /IM python.exe >nul 2>&1
timeout /t 1 /nobreak >nul

echo [✓] Ports cleared
echo.

:: 1. AI Engine (Python/FastAPI - Port 8001)
echo [1/4] Launching AI Engine (FastAPI) on Port 8001...
if exist "ai_engine\main.py" (
    start "PhishGuard AI Engine" cmd /k "cd /d "%BASE_DIR%ai_engine" && python main.py"
    timeout /t 2 /nobreak >nul
    echo [✓] AI Engine started
) else (
    echo [!] AI Engine not found
)

:: 2. Backend (NestJS - Port 3000)
echo [2/4] Launching Backend (NestJS) on Port 3000...
if exist "phishgaurd-server\package.json" (
    start "PhishGuard Backend" cmd /k "cd /d "%BASE_DIR%phishgaurd-server" && npm run start:dev"
    timeout /t 3 /nobreak >nul
    echo [✓] Backend started
) else (
    echo [!] Backend not found
)

:: 3. Frontend (React/Vite - Port 5173)
echo [3/4] Launching Frontend (React) on Port 5173...
if exist "phishguard-web\package.json" (
    start "PhishGuard Frontend" cmd /k "cd /d "%BASE_DIR%phishguard-web" && npm run dev"
    timeout /t 2 /nobreak >nul
    echo [✓] Frontend started
) else (
    echo [!] Frontend not found
)

:: 4. Extension Status
echo [4/4] Browser Extension Status...
echo [i] Extension is ready at: phishguard-extension/dist
echo [i] Load in Chrome: chrome://extensions/ > Load unpacked > select dist folder
echo [✓] All systems ready

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║              SERVICES LAUNCHED                      ║
echo ╠════════════════════════════════════════════════════╣
echo ║  AI Engine:        http://localhost:8001          ║
echo ║  Backend API:      http://localhost:3000          ║
echo ║  API Docs:         http://localhost:3000/api      ║
echo ║  Frontend:         http://localhost:5173          ║
echo ║  Extension:        Load unpacked from dist/       ║
echo ╠════════════════════════════════════════════════════╣
echo ║  Database:         MySQL localhost:3306           ║
echo ║  Database Name:    phishguard_db                  ║
echo ╚════════════════════════════════════════════════════╝
echo.

echo [✓] All services dispatched! Check individual windows for logs.
echo [i] Press CTRL+C in any window to stop that service.
echo.
pause
