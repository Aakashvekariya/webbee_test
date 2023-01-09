import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubCategory,
  changeSubFieldValue,
  removeSubCategory,
} from "../Actions";
import { addIcon } from "../Assets/icons";
import Button from "../Components/Button";
import Header from "../Components/Header";
import colors from "../Constants/colors";
import fontSize from "../Constants/fontSize";
import RouteStackParamsList from "../Navigations/RouteStackParamsList";
import { CATEGORIES } from "../Reducers/reducersType";
import SubFieldAddComp from "./SubFieldAddComp";

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
    console.log(
      "🚀 ~ file: Home.tsx:35 ~ fhLoadCategory ~ categoryListRD",
      categoryListRD.length
    );
    await AsyncStorage.setItem(CATEGORIES, JSON.stringify(categoryListRD));
    setCategoryList(categoryListRD);
  };

  const onAddNewSubCategory = (hCategoryList: any, categoryIndex: number) => {
    let hRequest = {};
    hCategoryList.fields.forEach((element) => {
      hRequest = { ...hRequest, [element.fieldName]: "" };
    });
    dispatch(addSubCategory(categoryIndex, hRequest));
  };

  const onRemoveSubCategory = (categoryIndex: number, fieldIndex: number) => {
    dispatch(removeSubCategory(categoryIndex, fieldIndex));
  };
  const onValueChange = (
    data: any,
    field: any,
    categoryIndex: number,
    fieldIndex: number
  ) => {
    dispatch(changeSubFieldValue(categoryIndex, fieldIndex, data, field));
  };

  const onRenderItem = ({ item, index, categoryIndex, modalList }) => {
    return (
      <View style={{ flex: 1 }}>
        <SubFieldAddComp
          onValueChange={(data: any, field: any) =>
            onValueChange(data, field, categoryIndex, index)
          }
          onRemoveSubCategory={() => onRemoveSubCategory(categoryIndex, index)}
          modalList={modalList}
          data={item}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <SafeAreaView style={{ backgroundColor: colors.primary }} />
      <Header title="Dashboard" />
      <View style={{ flex: 1, marginTop: 15 }}>
        <ScrollView>
          {categoryList.map((item, index) => (
            <View key={String(index)}>
              <View style={styles.categoryContainer}>
                <Text style={styles.categoryNameText}>{item.categoryName}</Text>
                <Button
                  title="Add New Item"
                  height={30}
                  width={150}
                  leftSource={addIcon}
                  onFullPress={() => onAddNewSubCategory(item, index)}
                />
              </View>

              <FlatList
                data={categoryList[index].subCategory}
                renderItem={(data) =>
                  onRenderItem({
                    ...data,
                    categoryIndex: index,
                    modalList: categoryList[index],
                  })
                }
                contentContainerStyle={{ flexGrow: 1 }}
                keyExtractor={(_, index) => String(index)}
                ListEmptyComponent={() => (
                  <Text style={{ textAlign: "center" }}>
                    No Items Available
                  </Text>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  categoryContainer: {
    padding: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  categoryNameText: {
    fontSize: fontSize.f20,
    fontWeight: "bold",
    flex: 1,
  },
});
