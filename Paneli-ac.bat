@echo off
chcp 65001 >nul
title Ogretmenin Yapay Zeka Rehberi - Yonetim Paneli
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo   Node.js bulunamadi.
  echo.
  echo   Panelin dosyalari kendi basina kaydedebilmesi icin Node.js gerekir.
  echo   https://nodejs.org adresinden "LTS" surumunu kurup bu dosyayi yeniden calistir.
  echo.
  echo   Node kurmak istemiyorsan yonetim.html dosyasina cift tiklayarak da
  echo   paneli kullanabilirsin; o zaman degisiklikleri dosya olarak indirirsin.
  echo.
  pause
  exit /b 1
)

echo.
echo   Sunucu baslatiliyor... Bu pencereyi KAPATMA.
echo   Isin bitince bu pencerede Ctrl + C yap ya da pencereyi kapat.
echo.

start "" http://localhost:8731/yonetim.html
node yerel-sunucu.js
pause
