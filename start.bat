@echo off
SETLOCAL EnableDelayedExpansion
TITLE PhishGuard - Master Controller

:: Set Base Directory
SET "BASE_DIR=%~dp0"
CD /D "%BASE_DIR%"

echo ===================================================
echo PHISHGUARD SYSTEM STARTUP
echo ===================================================

:: 1. Prerequisite Checks
echo [1/5] Validating System Prerequisites...

:: Check Node.js
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js not found in PATH.
    pause
    exit /b 1
)

:: Check NPM
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] NPM not found in PATH.
    pause
    exit /b 1
)

:: Check Python
SET "PYTHON_EXE=python"
where python >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [WARN] Global 'python' not found. Checking for 'python3'...
    where python3 >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        SET "PYTHON_EXE=python3"
    ) else (
        echo [ERROR] Python not found. Please install Python.
        pause
        exit /b 1
    )
)
echo [OK] Prerequisites validated.

:: 2. Port Cleanup
echo [2/5] Clearing ports (3000, 5173, 8001)...
:: Using npx -y kill-port to clear common dev ports
call npx -y kill-port 3000 5173 8001 >nul 2>&1
timeout /t 2 /nobreak >nul

:: 3. Start AI Engine
echo [3/5] Launching Forensic AI Engine (Port 8001)...
SET "AI_PYTHON=%PYTHON_EXE%"
if exist "ai_engine\.venv\Scripts\python.exe" (
    SET "AI_PYTHON=%BASE_DIR%ai_engine\.venv\Scripts\python.exe"
    echo [OK] Using virtual environment for AI Engine.
)

if exist "ai_engine" (
    start "PhishGuard: AI Engine" cmd /k "cd /d "%BASE_DIR%ai_engine" && "%AI_PYTHON%" main.py"
) else (
    echo [SKIP] 'ai_engine' directory not found.
)

:: 4. Start Backend (NestJS)
echo [4/5] Launching Backend Mission Control (Port 3000)...
if exist "phishgaurd-server" (
    if not exist "phishgaurd-server\node_modules" (
        echo [WARN] node_modules missing in backend. Please run 'npm install' in phishgaurd-server.
    )
    start "PhishGuard: Backend" cmd /k "cd /d "%BASE_DIR%phishgaurd-server" && npm run start:dev"
) else (
    echo [SKIP] 'phishgaurd-server' directory not found.
)

:: 5. Start Frontend (Vite)
echo [5/5] Launching Frontend Dashboard (Port 5173)...
if exist "phishguard-web" (
    if not exist "phishguard-web\node_modules" (
        echo [WARN] node_modules missing in frontend. Please run 'npm install' in phishguard-web.
    )
    start "PhishGuard: Frontend" cmd /k "cd /d "%BASE_DIR%phishguard-web" && npm run dev"
) else (
    echo [SKIP] 'phishguard-web' directory not found.
)

echo.
echo ===================================================
echo [SUCCESS] All systems dispatched.
echo Check individual windows for output and errors.
echo ===================================================
echo.
pause
