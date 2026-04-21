@echo off
SETLOCAL EnableDelayedExpansion
TITLE PhishGuard - System Verification

cls
echo ╔═══════════════════════════════════════════════════════╗
echo ║  PHISHGUARD - SYSTEM VERIFICATION CHECKLIST          ║
echo ║  Version: 1.0 - April 21, 2026                       ║
echo ╚═══════════════════════════════════════════════════════╝
echo.

SET "BASE_DIR=%~dp0"
CD /D "%BASE_DIR%"

SET "PASS=[✓]"
SET "FAIL=[✗]"

echo Checking Prerequisites...
echo.

:: Check Node.js
node --version >nul 2>&1
if !errorlevel! equ 0 (
    echo %PASS% Node.js installed: 
    node --version
) else (
    echo %FAIL% Node.js NOT installed
)

:: Check Python
python --version >nul 2>&1
if !errorlevel! equ 0 (
    echo %PASS% Python installed:
    python --version
) else (
    echo %FAIL% Python NOT installed
)

:: Check MySQL
mysql --version >nul 2>&1
if !errorlevel! equ 0 (
    echo %PASS% MySQL installed:
    mysql --version
) else (
    echo %FAIL% MySQL NOT installed
)

echo.
echo Checking Project Structure...
echo.

:: Check Backend
if exist "phishgaurd-server\node_modules" (
    echo %PASS% Backend dependencies installed
) else (
    echo %FAIL% Backend dependencies NOT installed
)

if exist "phishgaurd-server\dist" (
    echo %PASS% Backend built
) else (
    echo %FAIL% Backend NOT built
)

if exist "phishgaurd-server\.env" (
    echo %PASS% Backend .env configured
) else (
    echo %FAIL% Backend .env NOT found
)

:: Check Frontend
if exist "phishguard-web\node_modules" (
    echo %PASS% Frontend dependencies installed
) else (
    echo %FAIL% Frontend dependencies NOT installed
)

if exist "phishguard-web\dist" (
    echo %PASS% Frontend built
) else (
    echo %FAIL% Frontend NOT built
)

:: Check Extension
if exist "phishguard-extension\node_modules" (
    echo %PASS% Extension dependencies installed
) else (
    echo %FAIL% Extension dependencies NOT installed
)

if exist "phishguard-extension\dist" (
    echo %PASS% Extension built
) else (
    echo %FAIL% Extension NOT built
)

:: Check AI Engine
if exist "ai_engine\main.py" (
    echo %PASS% AI Engine source found
) else (
    echo %FAIL% AI Engine source NOT found
)

if exist "ai_engine\models\phishguard_model_cnn.h5" (
    echo %PASS% ML Model found
) else (
    echo %FAIL% ML Model NOT found
)

if exist "ai_engine\models\tokenizer_dictionary.json" (
    echo %PASS% Tokenizer found
) else (
    echo %FAIL% Tokenizer NOT found
)

echo.
echo Checking Database...
echo.

:: Check MySQL Connection
mysql -u root -prbmi7466 -e "SELECT 1" >nul 2>&1
if !errorlevel! equ 0 (
    echo %PASS% MySQL connection OK
    
    :: Check Database
    mysql -u root -prbmi7466 -e "USE phishguard_db; SHOW TABLES;" >nul 2>&1
    if !errorlevel! equ 0 (
        echo %PASS% Database phishguard_db exists
    ) else (
        echo %FAIL% Database phishguard_db NOT found
    )
) else (
    echo %FAIL% MySQL connection FAILED
    echo         Credentials: root / rbmi7466
)

echo.
echo ╔═══════════════════════════════════════════════════════╗
echo ║              SERVICE CHECK                            ║
echo ╚═══════════════════════════════════════════════════════╝
echo.

:: Check Ports
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo %PASS% Backend running on port 3000
    goto port3000done
)
echo %FAIL% Backend NOT running on port 3000
:port3000done

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173') do (
    echo %PASS% Frontend running on port 5173
    goto port5173done
)
echo %FAIL% Frontend NOT running on port 5173
:port5173done

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8001') do (
    echo %PASS% AI Engine running on port 8001
    goto port8001done
)
echo %FAIL% AI Engine NOT running on port 8001
:port8001done

echo.
echo ╔═══════════════════════════════════════════════════════╗
echo ║              READY TO LAUNCH?                         ║
echo ╚═══════════════════════════════════════════════════════╝
echo.

echo If most items have [✓], you're ready to run:
echo.
echo   RUN_ALL.bat
echo.
echo This will start all services automatically.
echo.
pause
