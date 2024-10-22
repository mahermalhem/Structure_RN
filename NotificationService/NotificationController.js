import React, { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";
import { localNotificationService } from "./LocalNotificationService";
import { fcmService } from "./FCMService";
import { requestNotificationPermission } from "./requestNotificationPermission";

const NotificationController = (props) => {
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);
    requestNotificationPermission();
    async function onRegister(token) {
      console.log("[App] onRegister: ", token);
    }

    function onNotification(notify) {
      console.log("onNotification",notify);
    }

    function onOpenNotification(notify) {
      console.log("[App] onOpenNotification: ", notify);
      console.log("Open Notification: " + notify?.body);
    }

    return () => {
      console.log("[App] unRegister");
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);

  // handle notification when forground
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // console.log(remoteMessage, "remoteMessage");
      PushNotification.localNotification({
        message: remoteMessage?.notification?.body,
        title: remoteMessage?.notification?.title,
        bigPictureUrl: remoteMessage?.notification?.android?.imageUrl,
        smallIcon: remoteMessage?.notification?.android?.imageUrl,
        channelId: 1,
      });
    });
    return unsubscribe;
  }, []);

  return null;
};

export default NotificationController;
