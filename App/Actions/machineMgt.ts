import AsyncStorage from '@react-native-async-storage/async-storage'
import { fieldTypes } from '../Constants/env'
import { CATEGORIES } from '../Reducers/reducersType'



export function getCategories() {
  return async (dispatch,state) => {
    // console.log("🚀 ~ file: machineMgt.ts:8 ~ return ~ state", state())
  }
}

export function addCategory() {
  return async (dispatch,state) => {
    const categoryList = state().machineMgt.categoryList
    
    const request = {
      categoryName:'',
      titleField:'',
      fields:[
        {
          fieldName:'',
          type:fieldTypes.text,
          value:''
        }
      ]
    }

    dispatch({ type: CATEGORIES, payload: [...categoryList,request] })
  }
}

export function removeCategory(index:number) {
  return async (dispatch,state) => {
    const categoryList = state().machineMgt.categoryList
    const tempList = categoryList.filter((_,fIndex)=>fIndex!==index)
    dispatch({ type: CATEGORIES, payload: tempList })
  }
}

export function addNewField(index:number) {
  return async (dispatch:any,state:any) => {
    let categoryList = state().machineMgt.categoryList
    categoryList[index]={
      ...categoryList[index],
      fields:[
        ...categoryList[index].fields,
        {
          fieldName:'',
          type:fieldTypes.text,
          value:''
        }
      ]
    }

    dispatch({ type: CATEGORIES, payload: [...categoryList] })
  }
}

export function removeField(categoryIndex:number,fieldIndex:number) {
  return async (dispatch:any,state:any) => {
    
    let categoryList = state().machineMgt.categoryList
    let tempData = categoryList[categoryIndex].fields.filter((_,fIndex:number)=>fieldIndex!==fIndex)
    
    
    categoryList[categoryIndex]={
      ...categoryList[categoryIndex],
      fields:tempData
    }
    
    dispatch({ type: CATEGORIES, payload: [...categoryList] })
  }
}
export function onChangeDataType(categoryIndex:number,fieldIndex:number,type:string) {
  return async (dispatch:any,state:any) => {
    
    let categoryList = state().machineMgt.categoryList
    let tempData = categoryList[categoryIndex].fields.map((item,index)=>{
      if(index===fieldIndex){
        item.type=type
      }
      return item
    })
    
    
    categoryList[categoryIndex]={
      ...categoryList[categoryIndex],
      fields:tempData
    }
    
    dispatch({ type: CATEGORIES, payload: [...categoryList] })
  }
}


export function changeCategoryName(categoryIndex:number,categoryName:string) {
  
  return async (dispatch:any,state:any) => {
    
    let categoryList = state().machineMgt.categoryList
     categoryList.map((item,index) => {
       if(index===categoryIndex){
        	item.categoryName=categoryName
      	}
      	return item
    	})
    dispatch({ type: CATEGORIES, payload: [...categoryList] })
  }
}

export function changeFieldName(categoryIndex:number,fieldIndex:number,fieldName:string) {
  
  return async (dispatch:any,state:any) => {
    
    let categoryList = state().machineMgt.categoryList
    let tempData = categoryList[categoryIndex].fields.map((item,index)=>{
      if(index===fieldIndex){
        item.fieldName=fieldName
      }
      return item
    })
    
    
    categoryList[categoryIndex]={
      ...categoryList[categoryIndex],
      fields:tempData
    }
    dispatch({ type: CATEGORIES, payload: [...categoryList] })
  }
}

export function setTitle(categoryIndex:number,titleField:string) {
  
  return async (dispatch:any,state:any) => {
    
    let categoryList = state().machineMgt.categoryList
     categoryList.map((item,index) => {
       if(index===categoryIndex){
        	item.titleField=titleField
      	}
      	return item
    	})
    dispatch({ type: CATEGORIES, payload: [...categoryList] })
  }
}
