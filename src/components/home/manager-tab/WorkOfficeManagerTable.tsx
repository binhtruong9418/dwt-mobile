import {StyleSheet, Text, View} from 'react-native';
import {text_center, text_red, fs_14_500} from '../../../assets/style.ts';
import PropTypes, {InferProps} from 'prop-types';
import PrimaryTable from '../../common/table/PrimaryTable.tsx';
import {WORK_STATUS_COLOR} from '../../../assets/constant.ts';

const columns = [
  {
    key: 'index',
    title: 'STT',
    width: 0.1,
  },
  {
    key: 'name',
    title: 'Tên',
    width: 0.4,
  },
  {
    key: 'amount',
    title: 'Số lượng',
    width: 0.25,
  },
  {
    key: 'kpi',
    title: 'NS/KPI',
    width: 0.25,
  },
];
export default function WorkOfficeManagerTable({
  listWork,
}: InferProps<typeof WorkOfficeManagerTable.propTypes>) {
  return (
    <View style={styles.wrapper}>
      <Text
        style={[
          fs_14_500,
          text_red,
          text_center,
          {
            marginBottom: 5,
          },
        ]}>
        Báo cáo của văn phòng
      </Text>
      <PrimaryTable
        columns={columns}
        headerColor={'#FFF'}
        data={listWork.map((item: any, index: number) => {
          return {
            ...item,
            index: index + 1,
            amount: item.quantity_display,
            kpi: item.kpiValue,
            bgColor: item.work_status
              ? // @ts-ignore
                WORK_STATUS_COLOR[item.work_status]
              : '#FFF',
          };
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: '#F9CCCC',
    borderRadius: 6,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    padding: 7,
    gap: 10,
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

WorkOfficeManagerTable.propTypes = {
  listWork: PropTypes.array.isRequired,
};
