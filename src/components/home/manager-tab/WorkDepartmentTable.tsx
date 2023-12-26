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
    key: 'business_standard_quantity_display',
    title: 'Số lượng',
    width: 0.25,
  },
  {
    key: 'business_standard_score_tmp',
    title: 'NS/KPI',
    width: 0.25,
  },
];
export default function WorkDepartmentTable({
  listWork,
}: InferProps<typeof WorkDepartmentTable.propTypes>) {
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
        Báo cáo của đơn vị
      </Text>
      <PrimaryTable
        columns={columns}
        data={listWork.map((item: any, index: number) => {
          return {
            ...item,
            index: index + 1,
            bgColor: item.actual_state
              ? // @ts-ignore
                WORK_STATUS_COLOR[item.actual_state]
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
    backgroundColor: '#F5F5F5',
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
});

WorkDepartmentTable.propTypes = {
  listWork: PropTypes.array.isRequired,
};
