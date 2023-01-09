import AsyncStorage from '@react-native-async-storage/async-storage';
import { fieldTypes } from '../Constants/env';
import { CATEGORIES } from '../Reducers/reducersType';

export function addCategory() {
  return async (dispatch, state) => {
    const { categoryList } = state().machineMgt;

    const request = {
      categoryName: '',
      titleField: '',
      fields: [
        {
          fieldName: '',
          type: fieldTypes.text,
        },
      ],
      subCategory: [],
    };

    dispatch({ type: CATEGORIES, payload: [...categoryList, request] });
  };
}

export function removeCategory(index:number) {
  return async (dispatch, state) => {
    const { categoryList } = state().machineMgt;
    const tempList = categoryList.filter((_, fIndex) => fIndex !== index);
    if (tempList.length === 0) {
      await AsyncStorage.removeItem(CATEGORIES);
    }
    dispatch({ type: CATEGORIES, payload: [...tempList] });
  };
}

export function addNewField(index:number, type:string) {
  return async (dispatch:any, state:any) => {
    const { categoryList } = state().machineMgt;
    categoryList[index] = {
      ...categoryList[index],
      fields: [
        ...categoryList[index].fields,
        {
          fieldName: '',
          type,
          value: '',
        },
      ],
    };

    dispatch({ type: CATEGORIES, payload: [...categoryList] });
  };
}

export function removeField(categoryIndex:number, fieldIndex:number) {
  return async (dispatch:any, state:any) => {
    const { categoryList } = state().machineMgt;
    const tempData = categoryList[categoryIndex].fields.filter((_, fIndex:number) => fieldIndex !== fIndex);

    categoryList[categoryIndex] = {
      ...categoryList[categoryIndex],
      fields: tempData,
    };

    dispatch({ type: CATEGORIES, payload: [...categoryList] });
  };
}
export function onChangeDataType(categoryIndex:number, fieldIndex:number, type:string) {
  return async (dispatch:any, state:any) => {
    const { categoryList } = state().machineMgt;
    const tempData = categoryList[categoryIndex].fields.map((item, index) => {
      if (index === fieldIndex) {
        item.type = type;
      }
      return item;
    });

    categoryList[categoryIndex] = {
      ...categoryList[categoryIndex],
      fields: tempData,
    };

    dispatch({ type: CATEGORIES, payload: [...categoryList] });
  };
}

export function changeCategoryName(categoryIndex:number, categoryName:string) {
  return async (dispatch:any, state:any) => {
    const { categoryList } = state().machineMgt;
    categoryList.map((item, index) => {
      if (index === categoryIndex) {
        	item.categoryName = categoryName;
      	}
      	return item;
    	});
    dispatch({ type: CATEGORIES, payload: [...categoryList] });
  };
}

export function changeFieldName(categoryIndex:number, fieldIndex:number, fieldName:string) {
  return async (dispatch:any, state:any) => {
    const { categoryList } = state().machineMgt;
    const tempData = categoryList[categoryIndex].fields.map((item, index) => {
      if (index === fieldIndex) {
        item.fieldName = fieldName;
      }
      return item;
    });

    categoryList[categoryIndex] = {
      ...categoryList[categoryIndex],
      fields: tempData,
    };
    dispatch({ type: CATEGORIES, payload: [...categoryList] });
  };
}

export function setTitle(categoryIndex:number, titleField:string) {
  return async (dispatch:any, state:any) => {
    const { categoryList } = state().machineMgt;
    console.log('🚀 ~ file: machineMgt.ts:132 ~ setTitle ~ categoryIndex', categoryIndex);
    categoryList.map((item, index) => {
      if (index === categoryIndex) {
        	item.titleField = titleField;
      	}
      	return item;
    	});
    dispatch({ type: CATEGORIES, payload: [...categoryList] });
  };
}

// Subcategory

export function addSubCategory(categoryIndex:number, data:{}) {
  return async (dispatch, state) => {
    const { categoryList } = state().machineMgt;
    const tempData = categoryList;

    tempData[categoryIndex].subCategory = [...tempData[categoryIndex].subCategory, data];

    dispatch({ type: CATEGORIES, payload: [...tempData] });
  };
}

export function removeSubCategory(categoryIndex:number, fieldIndex:number) {
  return async (dispatch, state) => {
    const { categoryList } = state().machineMgt;
    const tempData = categoryList;
    tempData[categoryIndex].subCategory = tempData[categoryIndex].subCategory.filter((_, fIndex) => fIndex !== fieldIndex);

    dispatch({ type: CATEGORIES, payload: [...tempData] });
  };
}
export function changeSubFieldValue(categoryIndex:number, fieldIndex:number, data:any, field:any) {
  return async (dispatch, state) => {
    const { categoryList } = state().machineMgt;
    const tempData = categoryList;

    tempData[categoryIndex].subCategory[fieldIndex] = { ...tempData[categoryIndex].subCategory[fieldIndex], [field]: data };
    dispatch({ type: CATEGORIES, payload: [...tempData] });
  };
}
