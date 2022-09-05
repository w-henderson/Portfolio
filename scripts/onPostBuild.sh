if [ "$STUART_ENV" == "development" ]; then
  exit 0
fi

cd scripts/embed
npm i && npm start