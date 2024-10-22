import Selector from "@Components/LanguageSelector";
import { useGetPokemonByBa6a6Query, useGetPokemonByNameQuery } from "@Services/pokemon";
import { useThemeStore } from "@Zustand/useThemeStore";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, StyleSheet, Text, View } from "react-native";

const AppContainer = () => {
    const { theme, changeTheme } = useThemeStore();

    // const { data, error, isLoading } = useGetPokemonByBa6a6Query('bulbasaur')
    return (
        <View style={{flex:1,backgroundColor:theme.Background}}>
            <Text style={{color:theme.Text}}>{t("hello from maher")}</Text>
            <Button title="dark" onPress={()=>changeTheme("dark")}/>
            <Button title="light" onPress={()=>{changeTheme("light")}}/>
            <Selector/>
        </View>
    );
};
export default AppContainer;