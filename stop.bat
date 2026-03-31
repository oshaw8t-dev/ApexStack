@echo off
taskkill /f /im pythonw.exe /fi "WINDOWTITLE eq ApexStacks*" >nul 2>&1
taskkill /f /im pythonw.exe >nul 2>&1
echo ApexStacks terminato.
timeout /t 1 >nul
