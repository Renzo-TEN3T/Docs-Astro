@echo off
cd /d "%~dp0"
echo Compilando y sirviendo Aliv_Web en http://localhost:8080 ...
node build.mjs && python -m http.server 8080 -d dist
pause
