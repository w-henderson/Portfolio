cd scripts/rss
python3 build_rss_feed.py

cd ../../scripts/variant
python3 build_variants.py

if [ "$STUART_ENV" == "development" ]; then
  exit 0
fi

cd ../../scripts/embed
npm i && npm start