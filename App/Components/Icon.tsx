import React from 'react';

import {
  Image,
  ImageURISource,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  ImageStyle,
  ImageResizeMode,
  TouchableOpacityProps,
  GestureResponderEvent,
} from 'react-native';

type IconProps = {
  source?: ImageURISource;
  iconContainerStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  tintColor?: string | '';
  disabled?: boolean | false;
  iconSize?: number | 16;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  resizeMode?: ImageResizeMode;
  touchableOpacityProps?: TouchableOpacityProps | undefined;
};

const Icon: React.FC<IconProps> = ({
  source,
  iconContainerStyle,
  iconStyle,
  tintColor,
  disabled,
  iconSize,
  onPress,
  resizeMode,
  touchableOpacityProps,
}) => (
  <TouchableOpacity
    disabled={disabled}
    style={iconContainerStyle}
    onPress={onPress}
    {...touchableOpacityProps}
  >
    <Image
      source={source}
      style={[
        {
          width: iconSize || 16,
          height: iconSize || 16,
          tintColor,
        },
        iconStyle,
      ]}
      resizeMode={resizeMode || 'contain'}
    />
  </TouchableOpacity>
);
export default Icon;
