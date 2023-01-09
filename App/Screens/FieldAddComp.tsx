import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { closeIcon } from "../Assets/icons";
import { commonUI } from "../Assets/styles/mystyle";
import Button from "../Components/Button";
import Icon from "../Components/Icon";
import TextInputBox from "../Components/TextInputBox";
import colors from "../Constants/colors";
import fontSize from "../Constants/fontSize";

type FieldAddCompProps = {
  onAddNewField: () => void;
  onRemoveField: (index: number) => void;
  data: {
    categoryName: string;
    titleField: string;
    fields: {
      fieldName: string;
      type: string;
    }[];
  };
  onSetTitle: (data: any) => void;
  onRemoveCategory: () => void;
  onChangeType: (index: number) => void;
  onChangeCategoryName: (text: string) => void;
  onChangeFieldName: (text: string, index: number) => void;
};

const FieldAddComp: FC<FieldAddCompProps> = ({
  onAddNewField,
  onRemoveField,
  data,
  onSetTitle,
  onRemoveCategory,
  onChangeType,
  onChangeCategoryName,
  onChangeFieldName,
}: FieldAddCompProps) => {
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
          <View style={commonUI.container.flex1}>
            <TextInputBox
              placeholder="Field"
              title="Field Name"
              value={item.fieldName}
              onChangeText={(text) => onChangeFieldName(text, index)}
            />
          </View>
          <View style={commonUI.container.rowAlignSelfEnd}>
            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => onChangeType(index)}
            >
              <Text style={styles.buttonText}>{item.type}</Text>
            </TouchableOpacity>
            <Icon
              source={closeIcon}
              iconContainerStyle={styles.iconContainer}
              iconStyle={commonUI.image.imageStyle}
              onPress={() => onRemoveField(index)}
            />
          </View>
        </View>
      ))}
      <Button
        title={`Title Field: ${
          data.titleField !== "" ? data.titleField : "UNNAMED FIELD"
        }`}
        contentContainerStyle={commonUI.height.mt10}
        titleStyle={{ textTransform: "uppercase" }}
        onFullPress={() => onSetTitle(data.fields)}
      />
      <View style={commonUI.container.rowMt5}>
        <View style={commonUI.container.flex1}>
          <Button
            title="Add Field"
            contentContainerStyle={{ backgroundColor: colors.green }}
            onFullPress={onAddNewField}
          />
        </View>
        <View style={{ marginHorizontal: 5 }} />
        <View style={commonUI.container.flex1}>
          <Button
            title="Remove"
            contentContainerStyle={styles.btnColor}
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
  btnColor: { backgroundColor: colors.red },
});
