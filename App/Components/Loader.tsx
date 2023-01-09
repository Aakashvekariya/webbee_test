import React, { FC } from 'react'
import { ActivityIndicator, Modal, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'

import { checkIcon } from '../Assets/icons'
import colors from '../Constants/colors'
import fontSize from '../Constants/fontSize'
import Icon from './Icon'

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainerStyle: {
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  titleStyle: {
    marginLeft: 10,
    color: colors.white,
    fontSize: fontSize.f14,
      
  },
})
type LoaderProps={
  isVisible?:boolean,
  isTrue?:boolean,
  title?:string,
  successTitle?:string,
  titleStyle?:TextStyle,
  indicatorSize?:number,
  modalBackgroundColor?:string,
  ActivityIndicatorColor?:string,
  contentContainerStyle?:ViewStyle,
  modalContainerStyle?:ViewStyle,
  
  animationType?:'none' | 'slide' | 'fade' | undefined,
}
const Loader:FC<LoaderProps>=({
  isVisible,
  isTrue,
  title,
  successTitle,
  titleStyle,
  indicatorSize,
  modalBackgroundColor,
  ActivityIndicatorColor,
  contentContainerStyle,
  modalContainerStyle,
  animationType,
}:LoaderProps)=> {

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType={animationType || 'fade'}
    
    >
      <View style={[styles.contentContainerStyle, contentContainerStyle]}>
        <View
          style={[
            {
              backgroundColor: modalBackgroundColor || colors.white,
            },
            styles.modalContainerStyle,
            modalContainerStyle,
          ]}
        >
          {isTrue ? (
            <Icon source={checkIcon} tintColor={colors.white} />
          ) : (
            <ActivityIndicator
              size={indicatorSize || 'small'}
              color={ActivityIndicatorColor || colors.white}
            />
          )}
          {((title && !isTrue) || (successTitle && isTrue)) && (
            <Text style={[styles.titleStyle, titleStyle]}>
              {isTrue ? successTitle : title}
            </Text>
          )}
        </View>
      </View>
    </Modal>
  )
}
export default Loader
