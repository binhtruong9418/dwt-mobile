import {Dropdown} from 'react-native-element-dropdown';
import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes, {InferProps} from 'prop-types';
import {fs_15_400, text_black} from '../../../assets/style.ts';

export default function PrimaryDropdown({
  data,
  value,
  changeValue,
  dropdownStyle,
  placeholder,
}: InferProps<typeof PrimaryDropdown.propTypes>) {
  return (
    <Dropdown
      style={[dropdownStyle]}
      itemTextStyle={[text_black, fs_15_400]}
      selectedTextStyle={[text_black, fs_15_400, styles.pl3]}
      data={data}
      labelField="label"
      valueField="value"
      value={value}
      maxHeight={200}
      onChange={item => {
        changeValue(item.value);
      }}
      search
      searchPlaceholder={'Tìm kiếm'}
      placeholder={placeholder || 'Chọn'}
    />
  );
}

const styles = StyleSheet.create({
  pl3: {
    paddingLeft: 3,
  },
});

PrimaryDropdown.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.any.isRequired,
  changeValue: PropTypes.func.isRequired,
  dropdownStyle: PropTypes.any,
  placeholder: PropTypes.string,
};
