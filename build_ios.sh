rm -rf ./ios
ionic cap add ios
npx capacitor-assets generate --ios
cp ./GoogleService-Info.plist ./ios/App/App
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n key -v UIFileSharingEnabled ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n "true" ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n key -v LSSupportsOpeningDocumentsInPlace ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n "true" ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n key -v UIRequiresFullScreen ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n "true" ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n key -v NSPhotoLibraryUsageDescription ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n string -v "This app requires access to the photo library to send images in pages such as message and profile." ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n key -v NSMicrophoneUsageDescription ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n string -v "This app requires access to the microphone to send an audio recording in pages such as message." ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n key -v NSCameraUsageDescription ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n string -v "This app requires access to the camera to take pictures in pages such as message and profile." ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n key -v NSPhotoLibraryAddUsageDescription ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n string -v "This app requires access to the photo library to send images in pages such as message and profile." ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n key -v "NSAppTransportSecurity" ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict" -t elem -n dict ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict/dict" -t elem -n key -v "NSAllowsArbitraryLoads" ./ios/App/App/Info.plist
xmlstarlet ed -L --subnode "/plist/dict/dict" -t elem -n "true" ./ios/App/App/Info.plist
ionic cap open ios