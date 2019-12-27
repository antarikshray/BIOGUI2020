echo "UPDATE script star"
path=$(pwd)
echo "path is $path"
cd $path/ && git fetch --all
cd $path/ && git reset --hard origin/master
cd $path/ && git checkout master


