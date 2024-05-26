import { View, Text, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../constants/types";
import { defaultStyles } from "@/constants/Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import { ActivityIndicator } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type OpenScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "OpenScreen"
>;

type Props = {
  navigation: OpenScreenNavigationProp;
};

const OpenScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("MainScreen");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
  }, []);

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View>
        <Text style={defaultStyles.headingText}>Welcome to Schedular</Text>
        <ActivityIndicator
          size={wp(20)}
          animating={true}
          color={Colors.green}
        />
      </View>
    </SafeAreaView>
  );
};

export default OpenScreen;
