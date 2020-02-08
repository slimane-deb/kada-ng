REM WARNING: use NSSM to install backend as service
@echo off
REM START "Backend" /B "back\kada4j.exe"
REM SC CREATE Backend Displayname= "Backend-AutoEcole" binpath= "%LOCALAPPDATA%\Programs\kada-ng\back\kada4j.exe" start= auto
start "nssm\win64\nssm.exe" install Backend kada4j.exe
pause
