import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ChevronDownIcon from '../../assets/img/chevron-down.svg';
import ChevronUpIcon from '../../assets/img/chevron-up.svg';
import {
  fs_12_400,
  fs_14_500,
  text_black,
  text_gray,
} from '../../assets/style.ts';
import RowDetail from '../common/table/RowDetail.tsx';
import {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import PersonalReportDetail from './PersonalReportDetail.tsx';
export default function UserReportDetail({}) {
  const [moreSectionHeight, setMoreSectionHeight] = useState(0);
  const shareValue = useRef(new Animated.Value(0)).current;
  const [isMore, setIsMore] = useState(false);
  const toggleMore = () => {
    if (!isMore) {
      Animated.timing(shareValue, {
        toValue: 1,
        duration: 50,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
      setIsMore(true);
    } else {
      Animated.timing(shareValue, {
        toValue: 0,
        duration: 50,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
      setIsMore(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <View style={styles.leftBox}>
          <View style={styles.avatar} />
          <View style={{gap: 2}}>
            <Text style={[fs_14_500, text_black]}>Nguyễn Văn A</Text>
            <Text style={[fs_12_400, text_gray]}>
              Vị trí: Nhân viên lắp ráp
            </Text>
            <Text style={[fs_12_400, text_gray]}>15/01/2023 9:30</Text>
          </View>
        </View>
        <TouchableOpacity onPress={toggleMore}>
          <ChevronDownIcon />
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 15}}>
        {isMore && (
          <PersonalReportDetail
            data={{
              key: 1,
              label: 'dada',
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 8,
    borderColor: '#787878',
    borderWidth: 1,
    padding: 10,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 999,
    backgroundColor: '#ccc',
  },
  moreWrapper: {
    overflow: 'hidden',
    position: 'relative',
  },
  moreContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    paddingHorizontal: 1,
  },
});
