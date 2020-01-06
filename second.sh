#!/usr/bin/env bash
myip=$(hostname -I)
path=$(pwd)
echo "MY IP IS : $myip"
jetsonIP=$(python3 $path/gui2.py $myip) 
checkupdate=0000
if [ $jetsonIP == $checkupdate ]; then
    echo "update Script called"
    bash update.sh
    exit
fi


echo "Attempt to start GUI"
export ROS_MASTER_URI=http://$jetsonIP:11311
echo ROS_MASTER_URI=http://$jetsonIP:11311
export ROS_IP=$myip
echo ROS_IP=$myip
echo "Exports done"
echo "If taking time please check the network u r connected to...."
echo "Searching for master..."
source /opt/ros/melodic/setup.bash
source ~/git_ws/devel/setup.bash


line=$(/opt/ros/melodic/bin/rostopic list /rosout)

#line=$(rostopic list /rosout)
if [ -z $line ] ; then
           echo "master not running!!! "
else
           echo "master running"
	   echo "Starting the GUI"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This load$


cd $path && npm start
fi
