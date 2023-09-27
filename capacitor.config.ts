import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.smartux.botischool',
  appName: 'demo',
  webDir: 'www',
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
  android:{
    webContentsDebuggingEnabled: true,
  },
  ios:{
    webContentsDebuggingEnabled: true,
  }
};

export default config;
