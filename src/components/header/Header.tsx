import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ChevronLeftIcon from '../../assets/img/chevron-left.svg';
import PropTypes, {InferProps} from 'prop-types';
import {fs_15_700, text_black} from '../../assets/style.ts';

export default function Header({
  title,
  handleGoBack,
  rightView,
}: InferProps<typeof Header.propTypes>) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        hitSlop={10}
        onPress={() => {
          if (handleGoBack) {
            handleGoBack();
          }
        }}>
        <ChevronLeftIcon width={20} height={20} />
      </TouchableOpacity>
      <Text style={[fs_15_700, text_black]}>{title}</Text>
      {rightView ? rightView : <View style={{width: 20, height: 20}} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
});

Header.propTypes = {
  title: PropTypes.string.isRequired,
  handleGoBack: PropTypes.func,
  rightView: PropTypes.element,
};
