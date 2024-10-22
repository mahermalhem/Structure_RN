import React from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import { useTranslation} from 'react-i18next';
import { useThemeStore } from "@Zustand/useThemeStore";


const { width, height } = Dimensions.get("screen");

const NoInternetConnection = () => {

  const theme = useThemeStore();
  const {t} = useTranslation()

  const styles = StyleSheet.create({
    emptyView: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.Background,
      height: height,
    },
    empytText: {
      fontSize: 16,
      fontFamily: "NotoSansArabic-SemiBold",
      textAlign: "center",
      width: width * 0.75,
    },
  });

  return (
    <View style={styles.emptyView}>
      <Text style={styles.empytText}>
        {t("No_Internet")}
      </Text>
    </View>
  );
  
};

export default NoInternetConnection;
