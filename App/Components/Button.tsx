import React from 'react';
import {
  GestureResponderEvent,
  ImageStyle,
  ImageURISource,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import colors from '../Constants/colors';

import Icon from './Icon';

type ButtonProps = {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  width?: string | number | any;
  height?: string | number | any;
  rightSource?: ImageURISource;
  rightIconContainerStyle?: StyleProp<ViewStyle>;
  rightIconStyle?: StyleProp<ImageStyle>;
  onRightIconPress?:((event:GestureResponderEvent)=> void)| undefined
  rightComp?: React.ElementType;
  leftSource?: ImageURISource;
  leftIconContainerStyle?: StyleProp<ViewStyle>;
  leftIconStyle?: StyleProp<ImageStyle>;
  onLeftIconPress?:((event:GestureResponderEvent)=> void)| undefined;
  leftComp?: React.ElementType;
  contentContainerStyle?: StyleProp<ViewStyle>;
  // noEffect,
  onFullPress?:((event:GestureResponderEvent)=> void)| undefined;
  leftTintColor?: string;
  rightTintColor?: string;
  leftDisabled?: boolean;
  rightDisabled?: boolean;
  titleTextProps?: TextProps;
};
function Button({
  title,
  titleStyle,
  width = '100%',
  height = 50,
  rightSource,
  rightIconContainerStyle,
  rightIconStyle,
  onRightIconPress,
  rightComp,
  leftSource,
  leftIconContainerStyle,
  leftIconStyle,
  onLeftIconPress,
  leftComp,
  contentContainerStyle,
  onFullPress,
  leftTintColor,
  rightTintColor,
  leftDisabled,
  rightDisabled,
  titleTextProps,
}: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[
        {
          width,
          minHeight: height,
        },
        styles.contentContainerStyle,
        contentContainerStyle,
      ]}
      onPress={onFullPress}
    >
      <>
        {!leftComp && leftSource && leftSource !== null ? (
          <Icon
            source={leftSource}
            onPress={onLeftIconPress}
            iconContainerStyle={[
              {
                width: height,
                height,
              },
              styles.leftIconContainerStyle,
              leftIconContainerStyle,
            ]}
            iconStyle={[{ tintColor: colors.white }, leftIconStyle]}
            tintColor={leftTintColor}
            disabled={leftDisabled}
            resizeMode="cover"
            touchableOpacityProps={undefined}
          />
        ) : (
          !leftComp && <View style={{ width: height }} />
        )}
        {leftComp}
        {title && title !== '' && (
          <Text
            style={[styles.titleStyle, titleStyle]}
            adjustsFontSizeToFit
            numberOfLines={1}
            {...titleTextProps}
          >
            {title}
          </Text>
        )}

        {!rightComp && rightSource && rightSource !== null ? (
          <Icon
            source={rightSource}
            onPress={onRightIconPress}
            iconContainerStyle={[
              {
                width: height,
                height,
              },
              styles.rightIconContainerStyle,
              rightIconContainerStyle,
            ]}
            iconStyle={[{ tintColor: colors.secondary }, rightIconStyle]}
            resizeMode="cover"
            tintColor={rightTintColor}
            disabled={rightDisabled}
          />
        ) : (
          !rightComp && <View style={{ width: height }} />
        )}
        {rightComp}
      </>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  leftIconContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    flex: 1,
    textAlign: 'center',
    color: colors.white,
    fontSize: 16,

  },
  rightIconContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Button;
