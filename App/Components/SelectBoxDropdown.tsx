import React, {FC} from 'react';
import {
  FlatList,
  Image,
  ImageStyle,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {bottomArrowIcon, checkIcon} from '../Assets/icons';
import {commonUI} from '../Assets/styles/mystyle';
import {inLocalSearch} from '../Utils/basicFunctions/InitFunction';
import Button from './Button';
import Icon from './Icon';

const styles = StyleSheet.create({
  searchBoxStyle: {
    flex: 1,
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  clearButtonContainerStyle: {
    width: 100,
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 10,
  },
  clearButtonTextStyle: {
    flex: 0,
  },
  dropdownBoxContainerStyle: {
    flexDirection: 'row',
    width: '100%',
    minHeight: 50,
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdownSelectedItemContainerStyle: {
    borderRightWidth: 1,
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dropdownSelectedItemTextStyle: {
    minWidth: '28.33%',
  },
  dropdownSelectedItemContainerTextStyle: {
    borderRadius: 10,
    justifyContent: 'center',
    padding: 5,
    margin: 2,
  },
  placeholderContainerTextStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIconContainerStyle: {
    width: 50,
    minHeight: 50,
    justifyContent: 'center',
  },
  rightIconStyle: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  buttonContainerStyle: {
    width: 150,
    height: 40,
    borderRadius: 10,
  },
  listItemContainerStyle: {
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,

    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewContainerStyle: {
    flex: 1,
    padding: 10,
  },
  bottomButtonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
});
type SelectBoxDropdownProps = {
  data: any | [];
  multiSelect?: boolean;
  getSelectedData?: (value: any) => void;
  searchableKey?: string;
  listItemContainerStyle?: ViewStyle;
  modalSelectedItemTextStyle?: TextStyle;
  modalItemTextStyle?: TextStyle;
  checkIconStyle?: ImageStyle;
  checkIconContainerStyle?: ViewStyle;
  searchBoxStyle?: TextStyle;
  buttonContainerStyle?: ViewStyle;
  buttonTitleStyle?: TextStyle;
  dropdownBoxContainerStyle?: ViewStyle;
  dropdownSelectedItemContainerStyle?: ViewStyle;
  dropdownSelectedItemContainerTextStyle?: TextStyle;
  dropdownSelectedItemTextStyle?: TextStyle;
  rightIconContainerStyle?: ViewStyle;
  rightIconStyle?: ImageStyle;
  placeholderTextStyle?: TextStyle;
  placeholderContainerTextStyle?: ViewStyle;
  clearButtonContainerStyle?: ViewStyle;
  clearButtonTextStyle?: TextStyle;
  placeholder?: String;
  onConfirm?: ((value: any) => void) | undefined;
  onCancel?: (() => void) | undefined;
  onClearAll?: (() => void) | undefined;
  onDropDown?: (() => void) | undefined;
};
type filterDataTypes = {
  title?: string;
  selected?: boolean;
};
const SelectBoxDropdown: FC<SelectBoxDropdownProps> = ({
  data,
  multiSelect,
  getSelectedData,
  searchableKey,
  listItemContainerStyle,
  modalSelectedItemTextStyle,
  modalItemTextStyle,
  checkIconStyle,
  checkIconContainerStyle,
  searchBoxStyle,
  buttonContainerStyle,
  buttonTitleStyle,
  dropdownBoxContainerStyle,
  dropdownSelectedItemContainerStyle,
  dropdownSelectedItemContainerTextStyle,
  dropdownSelectedItemTextStyle,
  rightIconContainerStyle,
  rightIconStyle,
  placeholderTextStyle,
  placeholderContainerTextStyle,
  clearButtonContainerStyle,
  clearButtonTextStyle,
  placeholder,
  onConfirm,
  onCancel,
  onClearAll,
  onDropDown,
}: SelectBoxDropdownProps) => {
  const [filterData, setFilterData] = React.useState<filterDataTypes[]>([]);
  const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);
  const [multiSelected, setMultiSelected] = React.useState<filterDataTypes[]>(
    [],
  );
  const [singleSelected, setSingleSelected] = React.useState<{title: string}>();
  const [tempData, setTempData] = React.useState<filterDataTypes[]>([]);
  React.useEffect(() => {
    if (data.length !== 0 && data !== null) {
      const tempArray: {title?: string; selected?: boolean}[] = [];
      data.forEach((element: {title: string}) => {
        tempArray.push({title: element.title, selected: false});
      });
      setFilterData(tempArray);
    }
  }, [data]);
  const onPressSubmit = () => {
    const temp: filterDataTypes[] = filterData.filter(
      element => element.selected,
    );
    setMultiSelected(temp);
    setIsModalVisible(false);
    const returnableArray: any = [];
    data.forEach((element: any) => {
      temp.forEach(value => {
        if (value.title === element.title) {
          returnableArray.push(element);
        }
      });
    });
    if (getSelectedData) {
      getSelectedData(returnableArray);
    }
    if (onConfirm) {
      onConfirm(returnableArray);
    }
  };

  const onPressCancel = () => {
    setFilterData(tempData);
    setIsModalVisible(false);
    if (onCancel) {
      onCancel();
    }
  };
  const onPressDropDown = () => {
    setTempData(filterData);
    setIsModalVisible(!isModalVisible);
    if (onDropDown) {
      onDropDown();
    }
  };

  const onPressClearAll = () => {
    const resetArray = filterData.map(value => ({
      title: value.title,
      selected: false,
    }));
    setFilterData(resetArray);
    if (onClearAll) {
      onClearAll();
    }
  };
  const returningSingleData = (item: {title: any}) => {
    const temp: filterDataTypes[] = [];
    data.forEach((element: any) => {
      if (element.title === item.title) {
        temp.push(element);
      }
    });
    if (getSelectedData) {
      getSelectedData(temp);
    }
  };
  const renderItem = ({item, index}: any) => (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        if (multiSelect) {
          const temp: any = [];
          const update = {
            title: item.title,
            selected: !item.selected,
          };
          filterData.forEach((fData, dataIndex) => {
            if (dataIndex === index) {
              temp.push(update);
            } else {
              temp.push(fData);
            }
          });
          setFilterData(temp);
        } else {
          setSingleSelected(item);
          setIsModalVisible(false);
          returningSingleData(item);
        }
      }}
      style={[styles.listItemContainerStyle, listItemContainerStyle]}>
      <Text
        style={
          item.selected || singleSelected === item
            ? [modalSelectedItemTextStyle]
            : [modalItemTextStyle]
        }>
        {item.title.toUpperCase()}
      </Text>
      {(item.selected || singleSelected === item) && (
        <Icon
          source={checkIcon}
          iconStyle={[checkIconStyle]}
          iconContainerStyle={[checkIconContainerStyle]}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <Modal
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
        visible={isModalVisible}
        animationType="slide"
        onDismiss={() => {
          setIsModalVisible(false);
        }}>
        <SafeAreaView />
        <View style={styles.viewContainerStyle}>
          <View style={commonUI.container.flexRow}>
            <View style={commonUI.container.flex1Row}>
              <TextInput
                style={[styles.searchBoxStyle, searchBoxStyle]}
                placeholder="search"
                onFocus={() => {
                  setTempData(filterData);
                }}
                onChangeText={text => {
                  if (text !== '') {
                    setFilterData(
                      inLocalSearch(tempData, text, [searchableKey, 'title']),
                    );
                  } else {
                    setFilterData(tempData);
                  }
                }}
              />
              {multiSelect && (
                <Button
                  onFullPress={onPressClearAll}
                  title="Clear All"
                  contentContainerStyle={[
                    styles.clearButtonContainerStyle,
                    clearButtonContainerStyle,
                  ]}
                  titleStyle={[
                    styles.clearButtonTextStyle,
                    clearButtonTextStyle,
                  ]}
                />
              )}
            </View>
          </View>
          <View style={commonUI.container.flex1}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filterData}
              extraData={filterData}
              renderItem={renderItem}
              keyExtractor={(item, index) => String(index)}
            />
            {multiSelect && (
              <View style={styles.bottomButtonContainerStyle}>
                <Button
                  onFullPress={onPressCancel}
                  contentContainerStyle={{
                    ...styles.buttonContainerStyle,
                    ...buttonContainerStyle,
                  }}
                  titleStyle={buttonTitleStyle}
                  title="Cancel"
                />
                <Button
                  onFullPress={onPressSubmit}
                  contentContainerStyle={{
                    ...styles.buttonContainerStyle,
                    ...buttonContainerStyle,
                  }}
                  titleStyle={buttonTitleStyle}
                  title="Submit"
                />
              </View>
            )}
          </View>
        </View>
        <SafeAreaView />
      </Modal>
      <View
        style={[styles.dropdownBoxContainerStyle, dropdownBoxContainerStyle]}>
        <View
          style={[
            styles.dropdownSelectedItemContainerStyle,
            dropdownSelectedItemContainerStyle,
          ]}>
          {multiSelect ? (
            multiSelected.length !== 0 ? (
              <FlatList
                data={multiSelected}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => String(index)}
                renderItem={({item, index}: any) => (
                  <View
                    style={[
                      styles.dropdownSelectedItemContainerTextStyle,
                      dropdownSelectedItemContainerTextStyle,
                    ]}>
                    <Text
                      key={String(index)}
                      style={[
                        styles.dropdownSelectedItemTextStyle,
                        dropdownSelectedItemTextStyle,
                      ]}>
                      {item.title.toLocaleUpperCase()}
                    </Text>
                  </View>
                )}
              />
            ) : (
              <View
                style={[
                  styles.placeholderContainerTextStyle,
                  placeholderContainerTextStyle,
                ]}>
                <Text style={placeholderTextStyle}>
                  {placeholder || 'Select Item'}
                </Text>
              </View>
            )
          ) : (
            <View
              style={[
                styles.placeholderContainerTextStyle,
                placeholderContainerTextStyle,
              ]}>
              <Text style={placeholderTextStyle}>
                {singleSelected
                  ? singleSelected.title.toLocaleUpperCase()
                  : 'Select Item'}
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={onPressDropDown}
          activeOpacity={0.5}
          style={[styles.rightIconContainerStyle, rightIconContainerStyle]}>
          <Image
            source={bottomArrowIcon}
            style={[styles.rightIconStyle, rightIconStyle]}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SelectBoxDropdown;
