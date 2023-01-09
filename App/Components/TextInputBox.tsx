import React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  TextInput,
  StyleSheet,
  TextStyle,
  ViewStyle,
  ImageURISource,
  ImageStyle,
  GestureResponderEvent,
} from 'react-native';
import colors from '../Constants/colors';

const styles = StyleSheet.create({
  inputContainerStyle: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
    borderRadius: 10,
  },
  leftIconContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',

    width: 50,
  },
  leftIconStyle: {
    width: 16,
    height: 16,

    resizeMode: 'contain',
  },
  rightIconContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',

    width: 50,
  },
  inputStyle: {
    flex: 1,
    height: 50,
    paddingVertical: 0,
    paddingHorizontal: 15,
  },
  rightIconStyle: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  fullPressStyle: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  titleStyle: {
    marginBottom: 2,
  },
});

type TextInputBoxProps = {
  title?: string;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
  inputContainerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  leftSource?: ImageURISource;
  leftIconStyle?: ImageStyle;
  leftIconContainerStyle?: ViewStyle;
  onPressLeft?: ((event: GestureResponderEvent) => void) | undefined;
  rightSource?: ImageURISource;
  rightIconStyle?: ImageStyle;
  rightIconContainerStyle?: ViewStyle;
  onPressRight?: ((event: GestureResponderEvent) => void) | undefined;
  onFullPress?: ((event: GestureResponderEvent) => void) | undefined;
  animated?: boolean;
  onChangeText?: ((event: string) => void) | undefined;
  secureTextEntry?: boolean;
  value?: string | '';
  placeholder?: string;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad';
};

const TextInputBox: React.FC<TextInputBoxProps> = ({
  title,
  titleStyle,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  leftSource,
  leftIconStyle,
  leftIconContainerStyle,
  onPressLeft,
  rightSource,
  rightIconStyle,
  rightIconContainerStyle,
  onPressRight,
  onFullPress,
  onChangeText,
  secureTextEntry,
  value,
  keyboardType,
  placeholder,
  ...other
}: TextInputBoxProps) => (
  <View style={containerStyle}>
    {title && <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>}
    <View style={[styles.inputContainerStyle, inputContainerStyle]}>
      {leftSource && (
      <TouchableOpacity
        onPress={onPressLeft}
        activeOpacity={onPressLeft ? 0 : 1}
        style={[styles.leftIconContainerStyle, leftIconContainerStyle]}
      >
        <Image
          source={leftSource}
          style={[styles.leftIconStyle, leftIconStyle]}
          resizeMode={leftIconStyle?.resizeMode || 'contain'}
        />
      </TouchableOpacity>
      )}
      <TextInput
        style={[styles.inputStyle, inputStyle]}
        placeholderTextColor={colors.black}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        {...other}
      />
      {rightSource && (
      <TouchableOpacity
        onPress={onPressRight}
        activeOpacity={onPressRight ? 0 : 1}
        style={[styles.rightIconContainerStyle, rightIconContainerStyle]}
      >
        <Image
          source={rightSource}
          style={[styles.rightIconStyle, rightIconStyle]}
          resizeMode={rightIconStyle?.resizeMode || 'contain'}
        />
      </TouchableOpacity>
      )}

      {onFullPress && (
      <TouchableOpacity
        onPress={onFullPress}
        style={styles.fullPressStyle}
      />
      )}
    </View>
  </View>
);
export default TextInputBox;
