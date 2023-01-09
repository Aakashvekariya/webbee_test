import React, { FC } from 'react';
import {
  StyleSheet, Switch, Text, View,
} from 'react-native';
import Button from '../Components/Button';
import DateTimePickerComponent from '../Components/DateTimePickerComponent';
import TextInputBox from '../Components/TextInputBox';
import colors from '../Constants/colors';
import { fieldTypes } from '../Constants/env';
import fontSize from '../Constants/fontSize';

type SubFieldAddCompProps = {
  data: any;
  modalList: any;
  onValueChange: (text: string | number | boolean | Date, title: any) => void;
  onRemoveSubCategory: () => void;
};

const SubFieldAddComp: FC<SubFieldAddCompProps> = ({
  data,
  modalList,
  onValueChange,
  onRemoveSubCategory,
}: SubFieldAddCompProps) => {
  const hTitle = data[modalList.titleField];
  const fieldList: {
    fieldName: string;
    type: string;
  }[] = modalList.fields;
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.heading}>
        {hTitle === '' ? 'Unnamed Field' : hTitle}
      </Text>
      {fieldList.map((item) => {
        const title = item.fieldName;
        const { type } = item;
        const value = data[item.fieldName];

        if (type === fieldTypes.number || type === fieldTypes.text) {
          return (
            <View style={{ marginTop: 5 }}>
              <TextInputBox
                placeholder="Field"
                title={title}
                value={value}
                keyboardType={
                  type === fieldTypes.text ? 'default' : 'number-pad'
                }
                onChangeText={(text) => onValueChange(text, title)}
              />
            </View>
          );
        } if (type === fieldTypes.checkbox) {
          return (
            <View style={{ marginTop: 5 }}>
              <Text>{title}</Text>
              <Switch
                value={value}
                onValueChange={(text) => onValueChange(value === '' ? true : !value, title)}
              />
            </View>
          );
        } if (type === fieldTypes.date) {
          return (
            <View style={{ marginTop: 5 }}>
              <Text>{title}</Text>
              <DateTimePickerComponent
                selectedDate={value}
                getSelectedDate={(date) => onValueChange(date, title)}
              />
            </View>
          );
        }
      })}
      <Button
        title="Remove"
        contentContainerStyle={{ backgroundColor: colors.red, marginTop: 10 }}
        onFullPress={onRemoveSubCategory}
      />
    </View>
  );
  //   console.log(data);
};
export default SubFieldAddComp;
const styles = StyleSheet.create({
  categoryContainer: {
    padding: 10,
    backgroundColor: colors.aliceBlue,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  buttonWrapper: {
    height: 50,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: colors.white,
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red,
    borderRadius: 5,
  },
  heading: {
    marginBottom: 15,
    fontSize: fontSize.f20,
    fontWeight: 'bold',
  },
});
