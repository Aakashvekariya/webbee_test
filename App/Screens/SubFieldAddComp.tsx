import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { closeIcon } from "../Assets/icons";
import Button from "../Components/Button";
import DateTimePickerComponent from "../Components/DateTimePickerComponent";
import Icon from "../Components/Icon";
import TextInputBox from "../Components/TextInputBox";
import colors from "../Constants/colors";
import { fieldTypes } from "../Constants/env";
import fontSize from "../Constants/fontSize";

const SubFieldAddComp = ({
  data,
  modalList,
  onValueChange,
  onRemoveSubCategory,
}) => {
  const hTitle = data[modalList[0].fieldName];
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.heading}>
        {hTitle === "" ? "Unnamed Field" : hTitle}
      </Text>
      {modalList.map((item, index) => {
        const title = item.fieldName;
        const type = item.type;
        const value = data[item.fieldName];

        if (type === fieldTypes.number || type === fieldTypes.text) {
          return (
            <View style={{ marginTop: 5 }}>
              <TextInputBox
                placeholder="Field"
                title={title}
                value={value}
                keyboardType={
                  type === fieldTypes.text ? "default" : "number-pad"
                }
                onChangeText={(text) => onValueChange(text, title)}
              />
            </View>
          );
        } else if (type === fieldTypes.checkbox) {
          return (
            <View style={{ marginTop: 5 }}>
              <Text>{title}</Text>
              <Switch
                value={value}
                onValueChange={(text) =>
                  onValueChange(value === "" ? true : !value, title)
                }
              />
            </View>
          );
        } else if (type === fieldTypes.date) {
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
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  buttonWrapper: {
    height: 50,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.red,
    borderRadius: 5,
  },
  heading: {
    marginBottom: 15,
    fontSize: fontSize.f20,
    fontWeight: "bold",
  },
});
