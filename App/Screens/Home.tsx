import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text } from "react-native";
import { connect, useDispatch } from "react-redux";
import { rootLoader } from "../Actions";
import Button from "../Components/Button";
import Header from "../Components/Header";
import TextInputBox from "../Components/TextInputBox";
import colors from "../Constants/colors";
import RouteStackParamsList from "../Navigations/RouteStackParamsList";

type OwnProps = {
  navigation: NativeStackNavigationProp<RouteStackParamsList>;
};
const Home = (props: OwnProps) => {
  const { navigation } = props;
  const dispatch: any = useDispatch();
  const [categoryList, setCategoryList] = useState<[]>([]);

  useEffect(() => {}, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <SafeAreaView style={{ backgroundColor: colors.primary }} />
      <Header title="Dashboard" />
      <View style={{ flex: 1, padding: 15 }}>
        {categoryList.map((item) => (
          <View></View>
        ))}
      </View>
    </View>
  );
};

export default Home;
