import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { closeIcon } from "../Assets/icons";
import Button from "../Components/Button";
import Icon from "../Components/Icon";
import TextInputBox from "../Components/TextInputBox";
import colors from "../Constants/colors";
import { fieldTypes } from "../Constants/env";
import fontSize from "../Constants/fontSize";

const FieldAddComp = ({
  onAddNewField,
  onRemoveField,
  data,
  onSetTitle,
  onRemoveCategory,
  onChangeType,
  onChangeCategoryName,
  onChangeFieldName,
}) => {
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.heading}>
        {data.categoryName === "" ? "New Category" : data.categoryName}
      </Text>
      <TextInputBox
        title="Category Name"
        placeholder="New Category"
        value={data.categoryName}
        onChangeText={(text) => onChangeCategoryName(text)}
      />
      {data.fields.map((item, index) => (
        <View key={String(index)} style={styles.fieldContainer}>
          <View style={{ flex: 1 }}>
            <TextInputBox
              placeholder="Field"
              title="Field Name"
              value={item.fieldName}
              onChangeText={(text) => onChangeFieldName(text, index)}
            />
          </View>
          <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => onChangeType(index)}
            >
              <Text style={styles.buttonText}>{item.type}</Text>
            </TouchableOpacity>
            <Icon
              source={closeIcon}
              iconContainerStyle={styles.iconContainer}
              iconStyle={{
                tintColor: colors.white,
              }}
              onPress={() => onRemoveField(index)}
            />
          </View>
        </View>
      ))}
      <Button
        title={`Title Field: ${
          data.titleField !== "" ? data.titleField : "UNNAMED FIELD"
        }`}
        contentContainerStyle={{ marginTop: 10 }}
        titleStyle={{ textTransform: "uppercase" }}
        onFullPress={() => onSetTitle(data.fields)}
      />
      <View style={{ flexDirection: "row", marginTop: 5 }}>
        <View style={{ flex: 1 }}>
          <Button
            title="Add Field"
            contentContainerStyle={{ backgroundColor: colors.green }}
            onFullPress={onAddNewField}
          />
        </View>
        <View style={{ marginHorizontal: 5 }} />
        <View style={{ flex: 1 }}>
          <Button
            title="Remove"
            contentContainerStyle={{ backgroundColor: colors.red }}
            onFullPress={onRemoveCategory}
          />
        </View>
      </View>
    </View>
  );
};
export default FieldAddComp;
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
