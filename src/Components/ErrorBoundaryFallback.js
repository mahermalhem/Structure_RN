import React from "react";
import { Button, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import RNRestart from "react-native-restart";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "@Zustand/useThemeStore";

const ErrorBoundaryFallback = () => {
  const { t } = useTranslation();
  const theme = useThemeStore();

  const restart = () => {
    RNRestart.restart();
  };

  return (
    <View style={[styles.container,{backgroundColor:theme.Background}]}>
      <Text style={styles.text}>{t("ErrorBoundaryMessage")}</Text>
    </View>
  );
};

export default ErrorBoundaryFallback;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    width:'100%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center'
  },
  text: {
    textAlign: "center",
    fontSize: 22,
    alignSelf:'center',
  },
  buttonContainer: {
    alignSelf: "center",
    borderRadius: 20,
    width: 250,
    paddingVertical: 5,
  },
  buttonText: { 
    fontSize: 16,
    paddingVertical: 5
  },
});
