import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSubCategory,
  changeSubFieldValue,
  removeSubCategory,
} from '../Actions';
import { addIcon } from '../Assets/icons';
import Button from '../Components/Button';
import Header from '../Components/Header';
import KeyboardAvoidScrollView from '../Components/KeyboardAvoidScrollView';
import colors from '../Constants/colors';
import fontSize, { gWindowWidth } from '../Constants/fontSize';
import { CATEGORIES } from '../Reducers/reducersType';
import SubFieldAddComp from './SubFieldAddComp';

type OwnProps = {};
function Home(props: OwnProps) {
  const dispatch: any = useDispatch();
  const categoryListRD = useSelector(
    (state: { machineMgt: any }) => state.machineMgt.categoryList,
  );
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
    await AsyncStorage.setItem(CATEGORIES, JSON.stringify(categoryListRD));
    setCategoryList(categoryListRD);
  };

  const onAddNewSubCategory = (
    hCategoryList: {
      fields: { fieldName: string }[];
    },
    categoryIndex: number,
  ) => {
    let hRequest = {};
    hCategoryList.fields.forEach((element) => {
      hRequest = { ...hRequest, [element.fieldName]: '' };
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
    fieldIndex: number,
  ) => {
    dispatch(changeSubFieldValue(categoryIndex, fieldIndex, data, field));
  };

  type RenderProps = {
    item: any;
    index: number;
    categoryIndex: number;
    modalList: any;
  };
  const onRenderItem = ({
    item,
    index,
    categoryIndex,
    modalList,
  }: RenderProps) => (
    <View style={{ width: Platform.isPad ? gWindowWidth / 2 : gWindowWidth }}>
      <SubFieldAddComp
        onValueChange={(data: any, field: any) => onValueChange(data, field, categoryIndex, index)}
        onRemoveSubCategory={() => onRemoveSubCategory(categoryIndex, index)}
        modalList={modalList}
        data={item}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <SafeAreaView style={{ backgroundColor: colors.primary }} />
      <Header title="Dashboard" />
      <View style={{ flex: 1, marginTop: 15 }}>
        <KeyboardAvoidScrollView>
          {categoryList.map((item: { categoryName: string }, index) => (
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
                renderItem={(data) => onRenderItem({
                  ...data,
                  categoryIndex: index,
                  modalList: categoryList[index],
                })}
                scrollEnabled={false}
                contentContainerStyle={{ flexGrow: 1 }}
                keyExtractor={(_, index) => String(index)}
                ListEmptyComponent={() => (
                  <Text style={{ textAlign: 'center' }}>
                    No Items Available
                  </Text>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                numColumns={Platform.isPad ? 2 : 1}
              />
            </View>
          ))}
        </KeyboardAvoidScrollView>
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  categoryContainer: {
    padding: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  categoryNameText: {
    fontSize: fontSize.f20,
    fontWeight: 'bold',
    flex: 1,
  },
});
