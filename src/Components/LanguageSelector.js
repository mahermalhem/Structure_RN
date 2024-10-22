import React from "react";
import {
  I18nManager,
  Dimensions,
  StyleSheet,
  Text,
  Pressable,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import Icon from "react-native-remix-icon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import RNRestart from "react-native-restart";
import { useThemeStore } from "@src/Zustand/useThemeStore";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "ar", label: "عربي" },
];

const { width } = Dimensions.get("screen");

const Selector = () => {
  //const [changingLang, setChangingLang] = useState(false);
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;
  const theme = useThemeStore((state) => state.theme)

  const {email} = useSelector(
    (state) => state.userReducer.user
  );
  
  const handleLanguageChange = () => {
    RNRestart.restart();
  };

  const setLanguage = async (code) => {
    try {
      await i18n.changeLanguage(code);
      await AsyncStorage.setItem("user-language", code);
      I18nManager.forceRTL(code === "ar");
      handleLanguageChange();
    } catch (error) {
      console.error("Error setting language preference:", error);
    }
  };

  const selectedLanguage = LANGUAGES.find(
    (language) => language.code !== selectedLanguageCode
  );

  const drawerIconSize = Dimensions.get("screen").width <= 500 ? 22 : 28;

  const onPressLanguage = () => {
    //!changingLang &&
    setLanguage(selectedLanguage.code);
    //setChangingLang(true);
  };

  return (
    <Pressable onPress={onPressLanguage} style={styles.row}>
      <>
        <Icon
          name="global-fill"
          size={drawerIconSize}
          color={theme.Text}
        />
        <Text style={[styles.selectedText,{color:theme.Text}]}>{selectedLanguage.label}</Text>
      </>
    </Pressable>
  );
};


export default Selector;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },

  selectedText: {
    textAlign: "left",
    marginLeft: width <= 500 ? width * 0.06 : width * 0.028,
    fontFamily: "NotoSansArabic-Bold",
    fontSize: 15,
  },
});
