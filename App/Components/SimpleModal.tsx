import React, { FC } from 'react'
import { Modal, StyleSheet, View, ViewStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { commonColorUi } from '../Assets/styles/mystyle'
import colors from '../Constants/colors'

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  itemContainer: {
    overflow: 'hidden',
    minWidth: 100,
    minHeight: 100,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
})
type SimpleModalProps={
  isVisible?:boolean,
  onDismiss?:(value:boolean)=>void,
  modalContainerStyle?:ViewStyle,
  containerStyle?:ViewStyle,
  itemContainerStyle?:ViewStyle,
  children?:any,
}
 const SimpleModal:FC<SimpleModalProps>=({
  isVisible,
  onDismiss,
  modalContainerStyle,
  containerStyle,
  itemContainerStyle,
  children
})=>{
  return (
    <Modal
      visible={isVisible}
      transparent
      onDismiss={() =>onDismiss? onDismiss(false):null}
      onRequestClose={() =>onDismiss? onDismiss(false):null}
      style={modalContainerStyle}
    >
      <View style={[styles.containerStyle, containerStyle]}>
        <View style={[styles.itemContainer, itemContainerStyle]}>
          {children}
        </View>
        <SafeAreaView style={commonColorUi.backgroundColor.white} />
      </View>
    </Modal>
  )
}

export default SimpleModal