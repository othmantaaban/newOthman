import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.botieducation.ensit',
  appName: 'ensit',
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
