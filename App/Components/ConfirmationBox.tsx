import React, {FC} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextStyle,
  ViewStyle,
  ImageSourcePropType,
  ImageStyle,
  GestureResponderEvent,
} from 'react-native';
import colors from '../Constants/colors';

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainerStyle: {
    padding: 15,
    marginHorizontal: 30,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  iconStyle: {
    width: 50,
    height: 50,
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonStyle: {
    marginLeft: 10,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  titleStyle: {
    textAlign: 'center',
    marginBottom: 10,
  },
  descriptionStyle: {
    marginVertical: 10,
  },
});
type ConfirmationBoxProps = {
  isVisible?: boolean;
  title?: string;
  titleStyle?: TextStyle;
  description?: string;
  descriptionStyle?: TextStyle;
  onConfirm?: (event: GestureResponderEvent) => void | undefined;
  onDismiss?: (value: boolean) => void | undefined;
  confirmButtonTitle?: string;
  confirmButtonTitleStyle?: TextStyle;
  dismissButtonTitle?: string;
  dismissButtonTitleStyle?: TextStyle;
  modalContainerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  dismissButtonStyle?: ViewStyle;
  confirmButtonStyle?: ViewStyle;
  iconContainerStyle?: ViewStyle;
  source?: ImageSourcePropType;
  iconStyle?: ImageStyle;
  buttonContainerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
};
const ConfirmationBox: FC<ConfirmationBoxProps> = ({
  isVisible,
  title,
  titleStyle,
  description,
  descriptionStyle,
  onConfirm,
  onDismiss,
  confirmButtonTitle,
  confirmButtonTitleStyle,
  dismissButtonTitle,
  dismissButtonTitleStyle,
  modalContainerStyle,
  contentContainerStyle,
  dismissButtonStyle,
  confirmButtonStyle,
  iconContainerStyle,
  source,
  iconStyle,
  buttonContainerStyle,
  buttonStyle,
}) => {
  return (
    <Modal
      transparent
      visible={isVisible}
      supportedOrientations={['landscape', 'portrait']}>
      <View style={[styles.contentContainerStyle, contentContainerStyle]}>
        <View style={[styles.modalContainerStyle, modalContainerStyle]}>
          {source && (
            <View style={iconContainerStyle}>
              <Image source={source} style={[styles.iconStyle, iconStyle]} />
            </View>
          )}
          <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>

          {description && (
            <Text style={[styles.descriptionStyle, descriptionStyle]}>
              {description}
            </Text>
          )}
          <View style={[styles.buttonContainerStyle, buttonContainerStyle]}>
            <TouchableOpacity
              style={[styles.buttonStyle, buttonStyle, dismissButtonStyle]}
              onPress={() => (onDismiss ? onDismiss(false) : null)}>
              <Text style={[dismissButtonTitleStyle]}>
                {dismissButtonTitle}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonStyle, buttonStyle, confirmButtonStyle]}
              onPress={onConfirm}>
              <Text style={confirmButtonTitleStyle}>{confirmButtonTitle}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationBox;
