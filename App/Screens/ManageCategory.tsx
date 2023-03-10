import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCategory,
  addNewField,
  changeCategoryName,
  changeFieldName,
  onChangeDataType,
  removeCategory,
  removeField,
  setTitle,
} from '../Actions';
import { addIcon } from '../Assets/icons';
import ActionSheet from '../Components/ActionSheet';
import Header from '../Components/Header';
import Icon from '../Components/Icon';
import colors from '../Constants/colors';
import { fieldTypes } from '../Constants/env';
import { gWindowWidth } from '../Constants/fontSize';
import { CATEGORIES } from '../Reducers/reducersType';
import FieldAddComp from './FieldAddComp';

function ManageCategory() {
  const categoryListRD = useSelector(
    (state: { machineMgt: any }) => state.machineMgt.categoryList,
  );

  const dispatch: any = useDispatch();
  const [categoryList, setCategoryList] = useState<[]>(categoryListRD);
  const [isSelectType, setIsSelectType] = useState<boolean>(false);
  const [isSelectTitle, setIsSelectTitle] = useState<boolean>(false);

  const [fillTitleData, setFillTitleData] = useState([]);

  const selectedCategoryFieldRef = useRef<{
    categoryIndex: number;
    fieldIndex: number;
  }>({ categoryIndex: -1, fieldIndex: -1 });

  const fieldTypeData = [
    {
      title: fieldTypes.text,
      onPress: () => onSelectDataType(fieldTypes.text),
    },
    {
      title: fieldTypes.number,
      onPress: () => onSelectDataType(fieldTypes.number),
    },
    {
      title: fieldTypes.checkbox,
      onPress: () => onSelectDataType(fieldTypes.checkbox),
    },
    {
      title: fieldTypes.date,
      onPress: () => onSelectDataType(fieldTypes.date),
    },
  ];

  useEffect(() => {
    fhLoadCategory();
  }, [categoryListRD]);

  const fhLoadCategory = async () => {
    await AsyncStorage.setItem(CATEGORIES, JSON.stringify(categoryListRD));
    setCategoryList(categoryListRD);
  };

  const onSelectDataType = (type: string) => {
    setIsSelectType(false);
    if (selectedCategoryFieldRef.current.fieldIndex === -1) {
      dispatch(
        addNewField(selectedCategoryFieldRef.current.categoryIndex, type),
      );
    }
    dispatch(
      onChangeDataType(
        selectedCategoryFieldRef.current.categoryIndex,
        selectedCategoryFieldRef.current.fieldIndex,
        type,
      ),
    );
  };

  const onAddNewCategory = () => {
    dispatch(addCategory());
  };
  const onRemoveCategory = (index: number) => {
    dispatch(removeCategory(index));
  };
  const onAddNewField = (index: number) => {
    selectedCategoryFieldRef.current.categoryIndex = index;
    selectedCategoryFieldRef.current.fieldIndex = -1;
    setTimeout(() => {
      setIsSelectType(true);
    }, 400);
  };
  const onRemoveField = (categoryIndex: number, fieldIndex: number) => {
    dispatch(removeField(categoryIndex, fieldIndex));
  };
  const onChangeTypeOpener = (categoryIndex: number, fieldIndex: number) => {
    selectedCategoryFieldRef.current.categoryIndex = categoryIndex;
    selectedCategoryFieldRef.current.fieldIndex = fieldIndex;

    setTimeout(() => {
      setIsSelectType(true);
    }, 400);
  };
  const onChangeCategoryName = (
    categoryIndex: number,
    categoryName: string,
  ) => {
    dispatch(changeCategoryName(categoryIndex, categoryName));
  };

  const onChangeFieldName = (
    categoryIndex: number,
    fieldIndex: number,
    fieldName: string,
  ) => {
    dispatch(changeFieldName(categoryIndex, fieldIndex, fieldName));
  };

  const onSetTitleOpener = (categoryIndex: number, titleData: []) => {
    selectedCategoryFieldRef.current.categoryIndex = categoryIndex;

    let tempTitleData: {
      fieldName: string;
      title: string;
      onPress: () => {};
    }[] = titleData;
    tempTitleData = tempTitleData.map((item) => {
      if (item.fieldName !== '') {
        return {
          title: item.fieldName,
          onPress: () => onSetTitle(item.fieldName),
        };
      }
    });
    if (tempTitleData.length === 0) return;

    setFillTitleData([...tempTitleData]);
    setTimeout(() => {
      setIsSelectTitle(true);
    }, 300);
  };
  const onSetTitle = (titleName: string) => {
    dispatch(
      setTitle(selectedCategoryFieldRef.current.categoryIndex, titleName),
    );
    setIsSelectTitle(false);
  };
  function RightComp() {
    return (
      <Icon
        source={addIcon}
        onPress={onAddNewCategory}
        iconStyle={{ tintColor: colors.white }}
      />
    );
  }
  const onRenderItem = ({ item, index }) => (
    <View
      style={{
        width: Platform.isPad ? gWindowWidth / 2 : gWindowWidth,
      }}
    >
      <FieldAddComp
        onAddNewField={() => onAddNewField(index)}
        onRemoveField={(fieldIndex: number) => onRemoveField(index, fieldIndex)}
        onSetTitle={(titleData: []) => onSetTitleOpener(index, titleData)}
        onRemoveCategory={() => onRemoveCategory(index)}
        onChangeType={(fieldIndex: number) => onChangeTypeOpener(index, fieldIndex)}
        onChangeCategoryName={(name: string) => onChangeCategoryName(index, name)}
        onChangeFieldName={(name: string, fieldIndex: number) => onChangeFieldName(index, fieldIndex, name)}
        data={item}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <SafeAreaView style={{ backgroundColor: colors.primary }} />
      <Header title="Manage Categories" RightComp={RightComp} />
      <View style={{ flex: 1, marginTop: 10 }}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={100}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <FlatList
            data={categoryList}
            contentContainerStyle={{ flexGrow: 1 }}
            keyExtractor={(_, index) => String(index)}
            renderItem={onRenderItem}
            ListEmptyComponent={() => (
              <Text style={{ textAlign: 'center' }}>
                No Categories Available
              </Text>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            numColumns={Platform.isPad ? 2 : 1}
          />
        </KeyboardAvoidingView>
      </View>
      <ActionSheet
        data={fieldTypeData}
        isVisible={isSelectType}
        onBackdropPress={() => setIsSelectType(false)}
        onCancelPress={() => setIsSelectType(false)}
      />
      <ActionSheet
        data={fillTitleData}
        isVisible={isSelectTitle}
        onBackdropPress={() => setIsSelectTitle(false)}
        onCancelPress={() => setIsSelectTitle(false)}
      />
    </View>
  );
}

export default ManageCategory;
