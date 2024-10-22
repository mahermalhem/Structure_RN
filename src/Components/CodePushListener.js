import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import codePush from "react-native-code-push";
import { Colors } from "../Constants/Colors";
import Progress from "./Progress";

const CodePushListener = () => {
  const [downloadingCodePushBundleStatus, setDownloadingCodePushBundleStatus] = useState("");
  const [downloadingCodePushBundleSize, setDownloadingCodePushBundleSize] = useState("0");
  const [downloadingCodePushBundleProgress, setDownloadingCodePushBundleProgress] = useState("");
  const checkStatus = async ()=>{
    await codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
    },(status) => {
      switch (status) {
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        setDownloadingCodePushBundleStatus("DOWNLOADING");
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        setDownloadingCodePushBundleStatus("INSTALLING");
        break;
      }
    },
    ({ receivedBytes, totalBytes }) => {
      const progress = (receivedBytes / totalBytes) * 100;
      setDownloadingCodePushBundleSize(totalBytes/1024);
      setDownloadingCodePushBundleProgress(progress);
    });
  };
  useEffect(()=>{
    setInterval(() => {
      checkStatus();     
    }, 505000);
  });
  useEffect(()=>{
    checkStatus();     
  });
  return (
    downloadingCodePushBundleStatus && downloadingCodePushBundleProgress &&
      <View style={styles.Container}>
        <Progress progress={downloadingCodePushBundleProgress} />
        <Text style={styles.msgTxt}>  {downloadingCodePushBundleStatus}  </Text>
        <Text style={styles.msgTxt}>( {Number(downloadingCodePushBundleSize).toFixed(2)}.KB )  </Text>
      </View>
  );
};
export default CodePushListener;

const styles = StyleSheet.create({
  Container: {
    flex:1,
    alignSelf:'center',
    zIndex:10,
    position:"absolute",
    borderColor:Colors.AliceBlue,
    justifyContent:"center",
    alignItems:"center",
    padding:15,
    gap:15,
    backgroundColor:Colors.Opacity
  },
  msgTxt: {
    color: "white",
    fontSize: 25,
  },
});
