# BIOGUI2020
This repository deals with the BIO sensor plotting and servo motors in bio box

BIOGUI2020 using electron app to render plotly.js module.

## Install npm environment
```curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash``` to install nvm from curl repository

```nvm install v10.16.3``` to install specific version of node

```nvm --version &&node -v && npm -v``` to check versions

```npm install -g yarn``` to install yarn


## Scripts on GUI side
```git clone {paste the url for git clone}```  

```git add .``` to update all the changes to repo to the index file

```git commit -m "{any message}"``` to commit the changes to local repo

```git push {branch name}``` to push the local repo to github repo

```export ROS_MASTER_URI=http://192.168.1.31(jetson IP):11311```

```export ROS_IP=10.4.168.192(GUI PC IP)```

```npm install``` will install node_modules and other dependencies in package.json.

```npm start``` will start the Electron app and the React app at the same time.

## Read more
if libgconf-2.so.4 is missing
```sudo apt -y install libgconf2-4```
