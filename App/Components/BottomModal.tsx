import React, {FC} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {closeIcon} from '../Assets/icons';
import {commonColorUi, commonUI} from '../Assets/styles/mystyle';
import colors from '../Constants/colors';
import Icon from './Icon';
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  itemContainer: {
    overflow: 'hidden',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 20,
    paddingTop: 20,

    width: '100%',
    backgroundColor: colors.white,
  },

  titleStyle: {
    marginBottom: 30,
  },

  cancelStyle: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginBottom: 15,
    borderRadius: 25,
    alignSelf: 'center',
  },
});
type BottomModalProps = {
  isVisible?: boolean;
  title?: string;
  onCancel?: (value: boolean) => void;
  onDismiss?: (value: boolean) => void;
  itemContainerStyle?: ViewStyle;
  cancelStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  children?: any;
};
const BottomModal: FC<BottomModalProps> = ({
  isVisible,
  title,
  onCancel,
  onDismiss,
  itemContainerStyle,
  cancelStyle,
  containerStyle,
  titleStyle,
  children,
}) => {
  return (
    <Modal
      visible={isVisible}
      style={commonUI.modal.containerStyle}
      onDismiss={() => (onDismiss ? onDismiss(false) : null)}
      onRequestClose={() => (onDismiss ? onDismiss(false) : null)}
      transparent>
      <View style={[styles.containerStyle, containerStyle]}>
        <View style={commonUI.container.flex1} />
        {onCancel && (
          <>
            <View style={commonUI.height.height10} />
            <TouchableOpacity
              onPress={() => (onCancel ? onCancel(false) : null)}
              style={[styles.cancelStyle, cancelStyle]}>
              <Icon source={closeIcon} disabled />
            </TouchableOpacity>
          </>
        )}
        <View style={[styles.itemContainer, itemContainerStyle]}>
          {title && (
            <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
          )}
          {children}
        </View>
      </View>
      <SafeAreaView style={commonColorUi.backgroundColor.white} />
    </Modal>
  );
};
export default BottomModal;
