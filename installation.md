# Recommended Installation Guide
## for Ubuntu Server 20.04 LTS
#### These instructions assume the host will only be running lcr-web and that MongoDB will not be shared with other applications.

### Install git, node.js & MongoDB

If git isn't already installed, get it with apt:

`sudo apt install git`

Install node.js + npm:

`sudo apt install nodejs npm`

Install MongoDB - ['Install MongoDB' section of this guide](https://www.howtoforge.com/how-to-install-and-use-mongodb-on-ubuntu-2004/):

For security purposes - setup MongoDB to only allow requests from localhost:

Open MongoDB config: `sudo nano /etc/mongod.conf`

Add the line `bind_ip = 127.0.0.1`, save and exit

Then run `systemctl restart mongodb`

### Install PM2

Install PM2 from npm

`sudo npm intall -g pm2`

Add pm2 to startup applications

`pm2 startup systemd`

### Clone repository

Move to the /var/www directory

`cd /var/www`

Clone the master branch

`git clone https://github.com/lsumedia/lcr-web.git`

Move into the new folder 

`cd lcr-web`

### Configure server

Run the installation script

`. install.sh`

Edit the configuration file (fill in ALL fields)

`nano config.json`

Start the server

`pm2 start server.js --name lcr-web`

Save PM2 config to start server on reboot

`pm2 save`

Hopefully, you're up and running!

## Maintenance

### Updating the server

Run the update script to pull changes and install dependencies

`. update.sh`

Restart the server

`pm2 restart lcr-web`


### Checking server status

To see general server status

`pm2 list` or `pm2 show lcr-web`

To see logs

`pm2 logs lcr-web`
