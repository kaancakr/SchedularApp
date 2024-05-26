import React, { useEffect } from "react";
import { View, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaultStyles } from "@/constants/Styles";

const SettingsScreen: React.FC = () => {
  useEffect(() => {
    StatusBar.setBarStyle("light-content");
  }, []);

  return (
    <SafeAreaView style={defaultStyles.container}>
      <Text>SettingsScreen</Text>
    </SafeAreaView>
  );
};

export default SettingsScreen;
