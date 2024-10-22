import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  I18nManager,
  Modal,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {I18nextProvider, useTranslation} from 'react-i18next';
import CodePushListener from './src/Components/CodePushListener';
import NotificationController from './NotificationService/NotificationController';
import "./src/localization/IMLocalize"
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from 'src/Redux/store';
import ErrorBoundary from 'react-native-error-boundary';
import { NetworkInfo } from "react-native-network-info";
import { blockedIpAddress } from '@utils/constants';
import codePush from 'react-native-code-push';
import { pinning } from '@utils/helpers/pinning';
import DeviceInfo from 'react-native-device-info';
import { useNetInfo } from "@react-native-community/netinfo";
import NoInternetConnection from '@Components/NoInternetConnection';
import AppContainer from '@src/Navigation/AppContainer';
import { useThemeStore } from '@Zustand/useThemeStore';

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
  updateDialog: true,
  installMode: codePush.InstallMode.IMMEDIATE
};


const App = () => {
  const netInfo = useNetInfo();
  const theme = useThemeStore();

  const {t} = useTranslation()
 
  const [Loading, setLoading] = useState(true);
  const [isRooted, setIsRooted] = useState(false);
  const [blockMessage, setBlockMessage] = useState("");

  const checkRooted = () => {
    const jailMonkeyStats = [
      { reason: "hookDetected", func: JailMonkey.hookDetected() },
      { reason: "isJailBroken", func: JailMonkey.isJailBroken() },
    ];
    jailMonkeyStats.forEach((check) => {
      if (check.func) {
        console.log(check.reason, "resaon");
        setBlockMessage(check.reason);
        setIsRooted(true);
      }
    });
  };

  const checkEmulator = async ()=>{
    DeviceInfo.isEmulator()
      .then(async (isEmulator) => {
        const ipAddress = await NetworkInfo.getIPAddress();
        let checkDeviceIP = false ;
        blockedIpAddress.forEach(ip => {
          if(ipAddress.toString().toLowerCase().includes(ip)){
            checkDeviceIP = true ;
          }
        });
        if (isEmulator || checkDeviceIP ) {
          setBlockMessage("usingEmulator");
          setIsRooted(true);
        }else{
          checkRooted();
        }
      });
  };

  // check if application working on rooted device
  useEffect(() => {
    // eslint-disable-next-line no-undef
    if(!__DEV__) {checkEmulator();}
    pinning();
  }, []);


  useEffect(() => {
    if (netInfo.isConnected !== null) {
      setLoading(false);
    }
  }, [netInfo.isConnected]);


  return (
    <Provider store={store}>
      <ErrorBoundary>
        <SafeAreaView style={[styles.SafeAreaView,{ backgroundColor: theme.Background,}]}>
          <StatusBar barStyle="dark-content" />
          {/* {/*<PersistGate persistor={persistor}> */}
          {Loading ? (
            <ActivityIndicator
              size="large"
              color={theme.Text}
              style={styles.activityIndicator}
            />
          ) : netInfo.isConnected ? (
            <AppContainer />
          ) : (
            <NoInternetConnection />
          )}
        </SafeAreaView>
        <Modal transparent visible={isRooted} animationType="slide">
          <View style={[styles.modalCont,{backgroundColor: theme.Opacity,}]}>
            <Text style={styles.msgTxt}>{t(`${blockMessage}`)}</Text>
          </View>
        </Modal>
        {/* <CodePushListener/> */}
        {/* <NotificationController/> */}
      </ErrorBoundary>
    </Provider>
  );
};

export default codePush(codePushOptions)(App);


const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    display: "flex",
  },
  modalCont: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  activityIndicator: { marginTop: "70%" },
  msgTxt: {
    color: "white",
    fontSize: 25,
  },
});
  