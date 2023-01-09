import React, { FC } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';
import Modal from 'react-native-modal';
import { closeIcon } from '../Assets/icons';
import { commonUI } from '../Assets/styles/mystyle';
import colors from '../Constants/colors';
import fontSize from '../Constants/fontSize';
import Icon from './Icon';

const styles = StyleSheet.create({
  itemContainerStyle: {
    overflow: 'hidden',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: colors.white,
  },
  itemStyle: {
    height: 50,
    alignItems: 'center',
    backgroundColor: colors.white,
    flexDirection: 'row',
  },
  itemTextStyle: {
    marginLeft: 15,
    fontSize: fontSize.f14,
    color: colors.darkBlack,
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
  containerStyle: {
    margin: 0,
  },
  itemIconStyle: {
    width: 20,
    height: 20,
  },
  bottomSafeAreaStyle: {
    backgroundColor: colors.white,
  },
});
type ActionSheetProps = {
  isVisible?: boolean;
  data?: any;
  onCancelPress?: (value: boolean) => void | undefined;
  onBackdropPress?: (value: boolean) => void | undefined;
  selectedOption?: any;
  itemStyle?: ViewStyle;
  itemTextStyle?: TextStyle;
  cancelStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  itemContainerStyle?: ViewStyle;
  cancelIconStyle?: ImageStyle;
  itemIconStyle?: ImageStyle;
  bottomSafeAreaStyle?: ViewStyle;
};
const ActionSheet: FC<ActionSheetProps> = ({
  isVisible = false,
  data,
  onCancelPress,
  onBackdropPress,
  selectedOption,
  itemStyle,
  itemTextStyle,
  cancelStyle,
  containerStyle,
  itemContainerStyle,
  cancelIconStyle,
  itemIconStyle,
  bottomSafeAreaStyle,
}) => (
  <Modal
    isVisible={isVisible}
    style={commonUI.modal.containerStyle}
    useNativeDriver
    swipeDirection={['down']}
    onBackdropPress={() => (onBackdropPress ? onBackdropPress(false) : null)}
    onBackButtonPress={() => (onBackdropPress ? onBackdropPress(false) : null)}
  >
    <View style={[styles.containerStyle, containerStyle]}>
      <View style={commonUI.container.flex1} />
      {onCancelPress && (
      <>
        <View style={commonUI.height.height10} />

        <Icon
          onPress={() => onCancelPress(false)}
          source={closeIcon}
          disabled
          iconContainerStyle={{ ...styles.cancelStyle, ...cancelStyle }}
          iconStyle={cancelIconStyle}
        />
      </>
      )}
      <View style={[styles.itemContainerStyle, itemContainerStyle]}>
        {data.map((item: any, index: number) => (
          <View key={String(`${index}`)}>
            <TouchableOpacity
              style={[styles.itemStyle, itemStyle]}
              onPress={item.onPress}
            >
              <Icon
                disabled
                source={item.icon}
                iconStyle={{
                  tintColor:
                      item.title === selectedOption
                        ? colors.primary
                        : colors.black,
                  ...styles.itemIconStyle,
                  ...itemIconStyle,
                }}
              />
              <Text
                style={[
                  styles.itemTextStyle,
                  selectedOption && {
                    color:
                        item.title === selectedOption
                          ? colors.primary
                          : colors.black,
                  },
                  itemTextStyle,
                ]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <SafeAreaView
        style={[styles.bottomSafeAreaStyle, bottomSafeAreaStyle]}
      />
    </View>
  </Modal>
);
export default ActionSheet;
