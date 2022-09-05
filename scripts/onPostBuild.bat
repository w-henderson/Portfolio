@echo off

if %STUART_ENV%==development exit 0

cd scripts/embed
npm i && npm start