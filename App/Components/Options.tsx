import React from 'react'
import { GestureResponderEvent, Image, ImageSourcePropType, ImageStyle, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import { checkIcon } from '../Assets/icons'
import colors from '../Constants/colors'

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  radioStyle:{
    backgroundColor: colors.primary,
  }
})
type OptionsProps={
  title?:string,
  onPress?:((event: GestureResponderEvent) => void) | undefined,
  isRadio?:boolean,
  status?:boolean,
  size?:number,
  source?:ImageSourcePropType,
  optionPosition?:'left'|'right',
  shape?:'round'|'square',
  titleStyle?:TextStyle,
  containerStyle?:ViewStyle,
  contentContainerStyle?:ViewStyle,
  checkIconStyle?:ImageStyle,
  checkContainerStyle?:ViewStyle,
  radioStyle?:ViewStyle,
  
}
const Options=({
  title,
  onPress,
  isRadio,
  status,
  size=20,
  source,
  optionPosition,
  shape,
  titleStyle,
  containerStyle,
  contentContainerStyle,
  checkIconStyle,
  checkContainerStyle,
  radioStyle,
  
}:OptionsProps)=>{
  
  
  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <View style={[styles.contentContainerStyle, contentContainerStyle]}>
        {(optionPosition === undefined || optionPosition === 'left') && (
          <View
            style={[
              {
                width: size,
                height: size,
                borderRadius: shape === 'round' ? size : 0,
                marginRight: 10,
              },
              styles.checkContainerStyle,
              checkContainerStyle,
            ]}
          >
            {!isRadio
              ? status && (
              <Image
                source={source || checkIcon}
                style={[
                  {
                    width: size - 10,
                    height: size - 10,
                  },
                  checkIconStyle,
                ]}
              />
              )
              : status && (
              <View
                style={[
                  {
                    width: size - 10,
                    height: size - 10,
                    borderRadius: shape === 'round' ? size : 0,
                  },
                  styles.radioStyle,
                  radioStyle,
                ]}
              />
              )}
          </View>
        )}
        {title && <Text style={titleStyle}>{title}</Text>}
        {optionPosition === 'right' && (
          <View
            style={[
              {
                width: size,
                height: size,
                borderRadius: shape === 'round' ? size : 0,
                marginLeft: 10,
              },
              styles.checkContainerStyle,
              checkContainerStyle,
            ]}
          >
            {!isRadio
              ? status && (
              <Image
                source={source || checkIcon}
                style={[
                  {
                    width: size - 10,
                    height: size - 10,
                  },
                  checkIconStyle,
                ]}
              />
              )
              : status && (
              <View
                style={[
                  {
                    width: size - 10,
                    height: size - 10,
                    borderRadius: shape === 'round' ? size : 0,
                  },
                  styles.radioStyle,
                  radioStyle,
                ]}
              />
              )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default Options
