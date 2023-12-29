import {fs_12_400, text_black, text_center} from '../../../assets/style.ts';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RowDetail from './RowDetail.tsx';
import {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function RowTable({
  item,
  columns,
  bgColor,
  canShowMore,
  isWorkArise,
}: any) {
  const [moreSectionHeight, setMoreSectionHeight] = useState(0);
  const shareValue = useRef(new Animated.Value(0)).current;
  const [isMore, setIsMore] = useState(false);
  const toggleMore = () => {
    if (!canShowMore) {
      item.onRowPress && item.onRowPress(item);
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

  useEffect(() => {
    if (isMore) {
      Animated.timing(shareValue, {
        toValue: 0,
        duration: 0,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  }, [item]);

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
              ]}>
              <Text
                style={[
                  fs_12_400,
                  item.textColor ? item.textColor : text_black,
                  text_center,
                ]}>
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
          <RowDetail data={item} isWorkArise={isWorkArise} />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#D9D9D9',
    flex: 1,
  },
  cell: {
    paddingVertical: 7,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#D9D9D9',
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
