@echo off
echo Running npm install...
call npm install
if %errorlevel% neq 0 exit /b %errorlevel%

echo Installing prisma and dependencies...
call npm install prisma @prisma/client bcryptjs jsonwebtoken zod
if %errorlevel% neq 0 exit /b %errorlevel%

echo Installing dev dependencies...
call npm install -D @types/bcryptjs @types/jsonwebtoken tsx
if %errorlevel% neq 0 exit /b %errorlevel%

echo Running prisma db push...
call npx prisma db push
if %errorlevel% neq 0 exit /b %errorlevel%

echo Running prisma db seed...
call npx tsx prisma/seed.ts
if %errorlevel% neq 0 exit /b %errorlevel%

echo Installation complete.
