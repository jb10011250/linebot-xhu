@echo off
echo ==========================================================
echo [1/3] Running build.js (Converting Excel) ...
node build.js
if %errorlevel% neq 0 (
    echo Build Failed! Please close Excel if it is open.
    pause
    exit /b
)

echo.
echo [2/3] Running git add and commit ...
git add .
git commit -m "Auto update content"

echo.
echo [3/3] Running git push ...
git push
if %errorlevel% neq 0 (
    echo Push Failed! Check your internet connection.
    pause
    exit /b
)

echo.
echo ==========================================================
echo All Done! Render will deploy in a few minutes.
echo ==========================================================
pause
