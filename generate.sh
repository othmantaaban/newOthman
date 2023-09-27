echo ''
echo Enter School Alias :
read Alias

if [ -z "$Alias" ]
then
 echo "Threshold must be an integer value!"; exit 1;
fi

echo ''
echo "Enter School Config Folder (leave empty if same as alias) :"
read Config

echo ''
echo Enter School Name :
read Schoolname

if [ -z "$Schoolname" ]
then
 echo "Threshold must be an integer value!"; exit 2;
fi

echo ''
echo Enter Package Name
read Package

if [ -z "$Package" ]
then
 echo "Threshold must be an integer value!"; exit 3;
fi

echo ''
echo "Platform to build ( leave empty to skip build ) :"
read Platform

if [ -n "$Config" ]
then
cp "../boti_config/$Config/GoogleService-Info.plist" ./
cp "../boti_config/$Config/google-services.json" ./
cp "../boti_config/$Config/icon.png" ./resources/icon.png
cp "../boti_config/$Config/splash.png" ./resources/splash.png
else
cp "../boti_config/$Alias/GoogleService-Info.plist" ./
cp "../boti_config/$Alias/google-services.json" ./
cp "../boti_config/$Alias/icon.png" ./resources/icon.png
cp "../boti_config/$Alias/splash.png" ./resources/splash.png
fi


sed -i "s/export const apiUrl =.*/export const apiUrl = 'https:\/\/boti.education\/u\/$Alias\/botiapi\/';/g" "./src/environments/environment.prod.ts"
sed -i "s/export const schoolName =.*/export const schoolName = \"$Schoolname\";/g" "./src/environments/environment.prod.ts"
sed -i "s/appId: .*/appId: '$Package',/g" "./capacitor.config.ts"
sed -i "s/appName: .*/appName: '$Schoolname',/g" "./capacitor.config.ts"

if [ -n "$Platform" ]
then
    if [ $Platform = 'android' ]
    then
    sh build_android.sh
    fi

    if [ $Platform = 'ios' ]
    then
        sh build_ios.sh
    fi
    
    if [ $Platform = 'all' ]
    then
        sh build_android.sh
        sh build_ios.sh
    fi
else
    echo 'No Build Requested !'
fi