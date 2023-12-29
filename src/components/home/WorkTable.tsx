import {StyleSheet, Text, View} from 'react-native';
import {text_center, text_red, fs_14_500} from '../../assets/style.ts';
import PropTypes, {InferProps} from 'prop-types';
import PrimaryTable from '../common/table/PrimaryTable.tsx';
import {WORK_STATUS_COLOR} from '../../assets/constant.ts';

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
export default function WorkTable({
  listWork,
}: InferProps<typeof WorkTable.propTypes>) {
  return (
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
          isWorkArise: item.isWorkArise ? item.isWorkArise : false,
        };
      })}
    />
  );
}

WorkTable.propTypes = {
  listWork: PropTypes.array.isRequired,
};
