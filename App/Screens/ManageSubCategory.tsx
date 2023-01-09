import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addSubCategory,
  changeSubFieldValue,
  removeSubCategory,
} from "../Actions";
import { addIcon } from "../Assets/icons";
import ActionSheet from "../Components/ActionSheet";
import Header from "../Components/Header";
import Icon from "../Components/Icon";
import colors from "../Constants/colors";
import { fieldTypes } from "../Constants/env";
import { CATEGORIES } from "../Reducers/reducersType";
import SubFieldAddComp from "./SubFieldAddComp";

type OwnProps = {};
const ManageSubCategory = (props: OwnProps) => {
  const { categoryIndex } = props.route.params;

  const categoryListRD = useSelector((state) => state.machineMgt.categoryList);
  const categoryName = categoryListRD[categoryIndex].categoryName;
  const dispatch: any = useDispatch();
  const [categoryList, setCategoryList] = useState<[]>(categoryListRD);

  useEffect(() => {
    fhLoadCategory();
  }, [categoryListRD]);

  const fhLoadCategory = async () => {
    await AsyncStorage.setItem(CATEGORIES, JSON.stringify(categoryListRD));

    setCategoryList(categoryListRD[categoryIndex]);
  };

  const onAddNewSubCategory = () => {
    let hRequest = {};
    categoryList.fields.forEach((element) => {
      hRequest = { ...hRequest, [element.fieldName]: "" };
    });
    dispatch(addSubCategory(categoryIndex, hRequest));
  };

  const onRemoveSubCategory = (fieldIndex: number) => {
    dispatch(removeSubCategory(categoryIndex, fieldIndex));
  };
  const onValueChange = (data: any, field: any, fieldIndex: number) => {
    dispatch(changeSubFieldValue(categoryIndex, fieldIndex, data, field));
  };
  const RightComp = () => (
    <Icon
      source={addIcon}
      onPress={onAddNewSubCategory}
      iconStyle={{ tintColor: colors.white }}
    />
  );
  const onRenderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1 }}>
        <SubFieldAddComp
          onValueChange={(data: any, field: any) =>
            onValueChange(data, field, index)
          }
          onRemoveSubCategory={() => onRemoveSubCategory(index)}
          modalList={categoryList}
          data={item}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <SafeAreaView style={{ backgroundColor: colors.primary }} />
      <Header title={categoryName} RightComp={RightComp} />
      <View style={{ marginTop: 10 }} />

      <FlatList
        data={categoryList.subCategory}
        renderItem={onRenderItem}
        contentContainerStyle={{ flexGrow: 1 }}
        keyExtractor={(_, index) => String(index)}
        ListEmptyComponent={() => (
          <Text style={{ textAlign: "center" }}>No Items Available</Text>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
};

export default ManageSubCategory;