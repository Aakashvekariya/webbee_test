import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addIcon } from "../Assets/icons";
import Button from "../Components/Button";
import Header from "../Components/Header";
import colors from "../Constants/colors";
import fontSize from "../Constants/fontSize";
import RouteStackParamsList from "../Navigations/RouteStackParamsList";
import { CATEGORIES } from "../Reducers/reducersType";

type OwnProps = {
  navigation: NativeStackNavigationProp<RouteStackParamsList>;
};
const Home = (props: OwnProps) => {
  const { navigation } = props;
  const dispatch: any = useDispatch();
  const categoryListRD = useSelector((state) => state.machineMgt.categoryList);
  const [categoryList, setCategoryList] = useState<[]>([]);

  useEffect(() => {
    fhLoadCategory();
  }, [categoryListRD]);

  const fhLoadCategory = async () => {
    if (categoryListRD.length === 0) {
      let hData = await AsyncStorage.getItem(CATEGORIES);
      if (hData) {
        hData = JSON.parse(hData);
        dispatch({ type: CATEGORIES, payload: hData });
      }
    }
    setCategoryList(categoryListRD);
  };
  const onAddNewItem = (item: any, index: number) => {
    // navigation.navigate("")
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <SafeAreaView style={{ backgroundColor: colors.primary }} />
      <Header title="Dashboard" />
      <View style={{ flex: 1, marginTop: 15 }}>
        {categoryList.map((item, index) => (
          <View key={String(index)}>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryNameText}>{item.categoryName}</Text>
              <Button
                title="Add New Item"
                height={30}
                width={150}
                leftSource={addIcon}
                onFullPress={() => onAddNewItem(item, index)}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  categoryContainer: {
    padding: 10,
    backgroundColor: colors.aliceBlue,
    borderRadius: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryNameText: {
    fontSize: fontSize.f20,
    fontWeight: "bold",
    flex: 1,
  },
});
