cp config.sample.json config.json
npm install --unsafe-perm=true --allow-root
cd player || { echo "Directory 'player' missing"; exit 1; }
npm install --unsafe-perm=true --allow-root
npm run build --unsafe-perm=true --allow-root
cd ../dashboard || { echo "Directory '../dashboard' missing"; exit 1; }
npm install --unsafe-perm=true --allow-root
npm run build --unsafe-perm=true --allow-root
