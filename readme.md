---- Generation Process ----

- PUT THE ICON AND SPLASH IN [RESOURCES FOLDER](./resources/)  <!-- SCRIPTED -->

- EDIT APP LINK AND NAME IN [ENVIRONEMENT FILE](./src/environments/environment.prod.ts)   <!-- SCRIPTED -->

- EDIT APP PACKAGE ID AND NAME IN [CAPACITOR CONFIG FILE](./capacitor.config.ts) <!-- SCRIPTED --

- EDIT APP COLORS IN [SCSS VARIABLES FILE](./src/theme/variables.scss)




#### ---- Generate ANDROID ----


- DELETE [ANDROID FOLDER](./android/)  <!-- SCRIPTED -->


- RUN IN CONSOLE THE FOLLOWING COMMAND: <!-- SCRIPTED -->

# ionic cap add android


- COPY googles-services.json FILE TO [ANDROID APP FOLDER](./android/app/)  <!-- SCRIPTED -->


- ADD TO [ANDROID MANIFEST](./android/app/src/main/AndroidManifest.xml) <!-- SCRIPTED -->

AS ATTRIBUT TO <application> TAG :

<application
...
android:usesCleartextTraffic="true"
android:requestLegacyExternalStorage="true"
>

AFTER <uses-permission android:name="android.permission.INTERNET" /> :

<uses-permission android:name="android.permission.READ_MEDIA_IMAGES"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" />
<uses-feature android:name="android.hardware.camera.autofocus" />


- CHANGE VERSION AND VERSION CODE IN [ANDROID BUILD GRADLE FILE](./android/app/build.gradle) <!-- LINE 9 AND 10 --> <!-- SCRIPTED -->




### ---- Generate IOS ----

- DELETE [ANDROID FOLDER](./ios/) <!-- SCRIPTED -->


- RUN IN CONSOLE THE FOLLOWING COMMAND: <!-- SCRIPTED -->

# ionic cap add ios


- COPY GoogleService-Info.plist FILE TO [IOS APP FOLDER](./ios/App/App/) <!-- SCRIPTED -->


- ADD TO [IOS INFO.PLIST](./ios/App/App/Info.plist) <!-- SCRIPTED -->

<key>UIFileSharingEnabled</key>
<true/>
<key>LSSupportsOpeningDocumentsInPlace</key>
<true/>
<key>NSPhotoLibraryUsageDescription</key>
<string>This app requires access to the photo library.</string>
<key>NSMicrophoneUsageDescription</key>
<string>This app requires access to the microphone.</string>
<key>NSCameraUsageDescription</key>
<string> We do need take picture to share didactic ressources or homework with student. </string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string> We do need take picture to share didactic ressources or homework with student. </string>
<key>UIRequiresFullScreen</key>
<true />


---------------------