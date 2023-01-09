import React, {FC, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';

import FastImage, {ImageStyle} from 'react-native-fast-image';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import {calendarIcon, watchIcon} from '../Assets/icons';

const styles = StyleSheet.create({
  contentContainerStyle: {
    width: '100%',
    height: 48,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 15,
  },
  titleContainerStyle: {
    position: 'absolute',
    top: -10,
    left: 10,
    paddingHorizontal: 5,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
});
type DateTimePickerComponentProps = {
  title?: string;
  onPress?: () => void;
  selectedDate?: Date;
  getSelectedDate?: (value: Date) => void | undefined;
  selectedTime?: Date;
  getSelectedTime?: (value: Date) => void | undefined;
  mode?: 'date' | 'time';
  contentContainerStyle?: ViewStyle;
  titleContainerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  selectTextStyle?: TextStyle;
  selectContainerStyle?: ViewStyle;
  iconContainerStyle?: ViewStyle;
  iconStyle?: ImageStyle;
};
const DateTimePickerComponent: FC<DateTimePickerComponentProps> = ({
  title,
  onPress,
  selectedDate,
  getSelectedDate,
  selectedTime,
  getSelectedTime,
  mode,
  contentContainerStyle,
  titleContainerStyle,
  titleStyle,
  selectTextStyle,
  selectContainerStyle,
  iconContainerStyle,
  iconStyle,
}) => {
  const [isDateTimePicker, setIsDateTimePicker] = useState(false);
  mode = mode === undefined ? 'date' : mode;
  return (
    <>
      <DateTimePicker
        isVisible={isDateTimePicker}
        onCancel={() => setIsDateTimePicker(false)}
        mode={mode}
        date={selectedDate ? selectedDate : selectedTime}
        onConfirm={date => {
          setIsDateTimePicker(false);
          if (getSelectedDate) {
            getSelectedDate(date);
          }
          if (getSelectedTime) {
            getSelectedTime(date);
          }
        }}
      />
      <TouchableOpacity
        onPress={() => {
          setIsDateTimePicker(true);
          if (onPress) {
            onPress();
          }
        }}
        style={[styles.contentContainerStyle, contentContainerStyle]}>
        {title && (
          <View style={[styles.titleContainerStyle, titleContainerStyle]}>
            <Text style={titleStyle}>{title}</Text>
          </View>
        )}
        <View style={selectContainerStyle}>
          {mode === 'date' && (
            <Text style={selectTextStyle}>
              {selectedDate
                ? moment(selectedDate).format('DD-MM-YYYY')
                : 'Select Date'}
            </Text>
          )}
          {mode === 'time' && (
            <Text style={selectTextStyle}>
              {selectedTime
                ? moment(selectedTime).format('hh:mm A')
                : 'Select Time'}
            </Text>
          )}
        </View>
        <View style={iconContainerStyle}>
          <FastImage
            source={
              mode === 'date' ? calendarIcon : mode === 'time' && watchIcon
            }
            style={[styles.iconStyle, iconStyle]}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default DateTimePickerComponent;
