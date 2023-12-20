import {Dropdown} from 'react-native-element-dropdown';
import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes, {InferProps} from 'prop-types';
import {fs_13_400, text_black} from '../../../assets/style.ts';

export default function PrimaryDropdown({
  data,
  value,
  changeValue,
  dropdownStyle,
}: InferProps<typeof PrimaryDropdown.propTypes>) {
  return (
    <Dropdown
      style={[dropdownStyle]}
      itemTextStyle={[text_black, fs_13_400]}
      selectedTextStyle={[text_black, fs_13_400, styles.pl10]}
      data={data}
      labelField="label"
      valueField="value"
      value={value}
      onChange={item => {
        changeValue(item.value);
      }}
    />
  );
}

const styles = StyleSheet.create({
  pl10: {
    paddingLeft: 10,
  },
});

PrimaryDropdown.propTypes = {
  data: PropTypes.array.isRequired,
  value: PropTypes.any.isRequired,
  changeValue: PropTypes.func.isRequired,
  dropdownStyle: PropTypes.any,
};
