echo ''
echo "Enter Version Name (ex : 2.3.1) :"
read Version
echo ''
echo "Enter Version Code ( ex: 23000 ):"
read VersionCode

rm -rf ./android
ionic build
ionic cap add android
npx capacitor-assets generate --android
cp ./google-services.json ./android/app
ionic cap open android
xmlstarlet ed -L --append /manifest/application -t attr -n android:usesCleartextTraffic -v "true" ./android/app/src/main/AndroidManifest.xml
xmlstarlet ed -L --append /manifest/application -t attr -n android:requestLegacyExternalStorage -v "true" ./android/app/src/main/AndroidManifest.xml
xmlstarlet ed -L --append "/manifest/uses-permission[last()]" -t elem -n uses-permission ./android/app/src/main/AndroidManifest.xml
xmlstarlet ed -L --append "/manifest/uses-permission[last()]" -t attr -n android:name -v "android.permission.READ_MEDIA_IMAGES" ./android/app/src/main/AndroidManifest.xml
xmlstarlet ed -L --append "/manifest/uses-permission[last()]" -t elem -n uses-permission ./android/app/src/main/AndroidManifest.xml
xmlstarlet ed -L --append "/manifest/uses-permission[last()]" -t attr -n android:name -v "android.permission.READ_MEDIA_VIDEO" ./android/app/src/main/AndroidManifest.xml
xmlstarlet ed -L --append "/manifest/uses-permission[last()]" -t elem -n uses-permission ./android/app/src/main/AndroidManifest.xml
xmlstarlet ed -L --append "/manifest/uses-permission[last()]" -t attr -n android:name -v "android.permission.READ_EXTERNAL_STORAGE" ./android/app/src/main/AndroidManifest.xml
xmlstarlet ed -L --append "/manifest/uses-permission[last()]" -t elem -n uses-permission ./android/app/src/main/AndroidManifest.xml
xmlstarlet ed -L --append "/manifest/uses-permission[last()]" -t attr -n android:name -v "android.permission.WRITE_EXTERNAL_STORAGE" ./android/app/src/main/AndroidManifest.xml
xmlstarlet ed -L --append "/manifest/uses-permission[last()]" -t elem -n uses-permission ./android/app/src/main/AndroidManifest.xml
xmlstarlet ed -L --append "/manifest/uses-permission[last()]" -t attr -n android:name -v "android.permission.CAMERA" ./android/app/src/main/AndroidManifest.xml
xmlstarlet ed -L --append "/manifest/uses-permission[last()]" -t elem -n uses-feature ./android/app/src/main/AndroidManifest.xml
xmlstarlet ed -L --append "/manifest/uses-feature[last()]" -t attr -n android:name -v "android.hardware.camera" ./android/app/src/main/AndroidManifest.xml
xmlstarlet ed -L --append "/manifest/uses-feature[last()]" -t elem -n uses-feature ./android/app/src/main/AndroidManifest.xml
xmlstarlet ed -L --append "/manifest/uses-feature[last()]" -t attr -n android:name -v "android.hardware.camera.autofocus" ./android/app/src/main/AndroidManifest.xml
# sed -i "s/compileSdkVersion = .*/compileSdkVersion = 33/g" "./android/variables.gradle"
# sed -i "s/targetSdkVersion = .*/targetSdkVersion = 33/g" "./android/variables.gradle"

if [ -n $Version ]
then
    sed -i "s/versionName .*/versionName \"$Version\"/g" "./android/app/build.gradle"
fi
if [ -n $VersionCode ]
then
    sed -i "s/versionCode .*/versionCode "$VersionCode"/g" "./android/app/build.gradle"
fi

# code ./android/app/build.gradle
# sed -i "s/classpath 'com.android.tools.build:gradle.*/classpath 'com.android.tools.build:gradle:8.0.0'/g" ./android/build.gradle
# sed -i "s/classpath 'com.google.gms:google-services:.*/classpath 'com.google.gms:google-services:4.3.15'/g" ./android/build.gradle
# sed -i "s/distributionUrl=.*/"distributionUrl=https\://services.gradle.org/distributions/gradle-8.0.2-all.zip"/g" ./android/gradle/gradle-wrapper.properties
# code ./android/app/src/main/AndroidManifest.xml
