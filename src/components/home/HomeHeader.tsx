import {StyleSheet, TouchableOpacity, View} from 'react-native';
import SmallLogo from '../../assets/img/small-logo.svg';
import SearchIcon from '../../assets/img/search-icon.svg';
import NotiIcon from '../../assets/img/noti-icon.svg';
import AvatarIcon from '../../assets/img/avatar.svg';

export default function HomeHeader({}) {
  return (
    <View style={styles.wrapper}>
      <SmallLogo width={140} height={60} />
      <View style={styles.row}>
        <TouchableOpacity style={styles.iconButton}>
          <SearchIcon width={20} height={20} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <NotiIcon width={20} height={20} />
        </TouchableOpacity>

        <TouchableOpacity>
          <AvatarIcon width={35} height={35} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
    borderRadius: 999,
    backgroundColor: '#F5F5F5',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
