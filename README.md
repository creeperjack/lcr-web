# lcr-web
### Web components for LCR App:
- Backend (top of source) - custom node.js application
- [Player](/player/README.md) - custom react front-end
- [Admin Dashboard](/dashboard/README.md) - 'Light Bootstrap Dashboard React'

## Installation 
#### Also see [guide for Ubuntu 20.04 LTS](installation.md)

Requirements:
node.js, npm, react-scripts, mongodb, pm2 (recommended)

### Assisted Installation

1. Clone from GitHub
2. Execute install.sh - `. install.sh`
3. Fill in config.json
4. Start the server with `pm2 start server --name lcr` (recommended)
    or `node server.js`

### Manual Installation

Try this if the `install.sh` file does not work

1. Copy `config.sample.json` into a new file `config.json`
2. Fill in your preferred port number and MongoDB settings into `config.json`
3. Open a console window in the `/dashboard` directory to install the React components for the admin pages
4. Run `npm install` and `npm build` in this folder
5. Enter `cd ../player` to go to the public web folder
6. Run `npm install` to set up the public web folder
7. Type `cd ..` to go back to the root directory
8. Enter `npm start` to start the server

### Updating

Execute `update.sh` to perform the following:

1. Pull the latest commit from GitHub
2. Update any dependencies
3. Rebuild React apps in `/dashboard` and `/player`

After updating, run `pm2 restart lcr` to restart the server

### Creating user profiles

A script is provided to make initial user accounts in order to log into the system.

This can be found by opening a console window in the `/script` folder and then executing `node newuser.js`. It will prompt you for a username and password
and, assuming the database is correctly configured, will create a new user.