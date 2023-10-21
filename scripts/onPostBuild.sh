if [ "$STUART_ENV" == "development" ]; then
  exit 0
fi

cd scripts/rss
python3 build_rss_feed.py

cd ../../scripts/embed
npm i && npm start