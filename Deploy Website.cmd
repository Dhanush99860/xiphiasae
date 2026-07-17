@echo off
title XIPHIAS Website Deployment

net session >nul 2>&1
if not "%ERRORLEVEL%"=="0" (
  powershell.exe -NoProfile -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
  exit /b
)

cd /d "%~dp0"

echo XIPHIAS production deployment
echo Domain: https://xiphiasimmigration.ae
echo.

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0deploy-production.ps1"
set "DEPLOY_EXIT=%ERRORLEVEL%"

echo.
if not "%DEPLOY_EXIT%"=="0" (
  echo Deployment did not complete. Review the error shown above.
) else (
  echo The deployment finished successfully.
)
echo.
pause
exit /b %DEPLOY_EXIT%
