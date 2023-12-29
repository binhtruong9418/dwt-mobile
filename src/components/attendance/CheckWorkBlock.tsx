import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  fs_12_500,
  fs_15_400,
  fs_15_700,
  row_between,
  text_black,
  text_gray,
  text_white,
} from '../../assets/style.ts';
import CheckInDoorIcon from '../../assets/img/check-in-door.svg';
import CheckOutDoorIcon from '../../assets/img/check-out-door.svg';

export default function CheckWorkBlock({}) {
  return (
    <View style={styles.wrapper}>
      <View
        style={[
          row_between,
          {
            paddingBottom: 10,
            borderBottomColor: '#D9D9D9',
            borderBottomWidth: 1,
          },
        ]}>
        <Text style={[fs_15_400, text_black]}>Ca làm việc</Text>
        <Text style={[fs_15_400, text_black]}>08:00 - 17:00</Text>
      </View>
      <View style={styles.checkinoutContainer}>
        <View style={[styles.col]}>
          <Text style={[fs_15_700, text_black]}>GIỜ VÀO</Text>
          <Text style={[fs_15_700, text_black]}>08:00</Text>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: '#D1D1D1',
              },
            ]}>
            <Text style={[fs_12_500, text_gray]}>Vào ca</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '40%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <CheckInDoorIcon />
          <View
            style={{
              width: 50,
              height: 1,
              backgroundColor: '#D9D9D9',
            }}
          />
          <CheckOutDoorIcon />
        </View>
        <View style={[styles.col]}>
          <Text style={[fs_15_700, text_black]}>GIỜ RA</Text>
          <Text style={[fs_15_700, text_black]}>--:--</Text>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: '#BC2426',
              },
            ]}>
            <Text style={[fs_12_500, text_white]}>Tan ca</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 6,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 8,
  },
  checkinoutContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  col: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    width: '30%',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
