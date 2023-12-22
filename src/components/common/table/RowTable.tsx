import {fs_12_400, text_black, text_center} from '../../../assets/style.ts';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RowDetail from './RowDetail.tsx';
import {useRef, useState} from 'react';

export default function RowTable({item, columns, bgColor, canShowMore}: any) {
  const [moreSectionHeight, setMoreSectionHeight] = useState(0);
  const shareValue = useRef(new Animated.Value(0)).current;
  const [isMore, setIsMore] = useState(false);

  const toggleMore = () => {
    if (!canShowMore) {
      return;
    }
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
    <View>
      <Pressable style={[styles.row]} onPress={toggleMore}>
        {columns.map((column: any, index: any) => {
          return (
            <View
              key={index}
              style={[
                {
                  flex: column.width,
                  backgroundColor: bgColor,
                  height: 'auto',
                },
                styles.cell,
                index !== 0 && styles.borderLeft,
              ]}>
              <Text style={[fs_12_400, text_black, text_center]}>
                {item[column.key]}
              </Text>
            </View>
          );
        })}
      </Pressable>
      <Animated.View
        style={[
          styles.moreWrapper,
          {
            height: shareValue.interpolate({
              inputRange: [0, 1],
              outputRange: [0, moreSectionHeight],
            }),
          },
        ]}>
        <View
          onLayout={e => {
            setMoreSectionHeight(e.nativeEvent.layout.height);
          }}
          style={styles.moreContainer}>
          <RowDetail />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    flex: 1,
  },
  cell: {
    paddingVertical: 7,
    justifyContent: 'center',
  },
  borderLeft: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.50)',
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
