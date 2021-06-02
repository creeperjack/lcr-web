npm install
cd player || { echo "Directory player missing"; exit 1; }
npm install
npm run build
cd ../dashboard || { echo "Directory ../dashboard missing"; exit 1; }
npm install
npm run build
cd ..