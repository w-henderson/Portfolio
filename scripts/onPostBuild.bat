@echo off

if %STUART_ENV%==development exit 0

cd scripts/rss
python build_rss_feed.py

cd ../../scripts/embed
npm i && npm start