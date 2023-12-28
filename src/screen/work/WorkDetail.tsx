import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import Header from '../../components/header/Header.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import WorkDetailBlock from '../../components/work/WorkDetailBlock.tsx';
import SummaryReportBlock from '../../components/work/SummaryReportBlock.tsx';
import {
  fs_15_400,
  fs_15_700,
  text_black,
  text_red,
} from '../../assets/style.ts';
import WorkReportTable from '../../components/common/table/WorkReportTable.tsx';
import {useConnection} from '../../redux/connection';
import {WORK_STATUS} from '../../assets/constant.ts';
import {useMemo} from 'react';
import NoDataScreen from '../../components/common/no-data/NoDataScreen.tsx';

export default function WorkDetail({route, navigation}: any) {
  const {data} = route.params;
  const {
    connection: {userInfo},
  } = useConnection();
  const listLogs = data.business_standard_report_logs
    ? data.business_standard_report_logs
    : data.business_standard_arise_logs
    ? data.business_standard_arise_logs
    : [];

  const {workStatus, workType} = useMemo(() => {
    let workStatus = WORK_STATUS['1'];
    let workType = 'Công việc đạt giá trị';
    const report =
      data.business_standard_reports &&
      data.business_standard_reports.length > 0
        ? data.business_standard_reports[0]
        : null;
    if (report) {
      // @ts-ignore
      workStatus = WORK_STATUS[report.actual_state];
    }
    if (data.type === 2) {
      workType = 'Công việc liên tục';
    } else if (data.type === 3) {
      workType = 'Công việc đạt giá trị';
    } else if (data.type === 1) {
      workType = 'Công việc 1 lần';
    }
    return {
      workStatus,
      workType,
    };
  }, [data]);

  if (!data) {
    return <NoDataScreen text={'Không có dữ liệu'} />;
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header
        title="CHI TIẾT KẾ HOẠCH"
        handleGoBack={() => {
          navigation.goBack();
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <WorkDetailBlock
          data={[
            {
              label: 'Tên nhiệm vụ',
              value: data.name,
            },
            {
              label: 'Mô tả',
              value: data.desc,
            },
            {
              label: 'Mục tiêu',
              value: workType,
            },
            {
              label: 'Người đảm nhiệm',
              value: userInfo.name,
            },
            {
              label: 'Trạng thái',
              value: workStatus,
            },
            {
              label: 'Tổng thời gian tạm tính',
              value: data.working_hours + ' giờ',
            },
            {
              label: 'ĐVT',
              value: data.unit_name,
            },
            {
              label: 'Chỉ tiêu',
              value: data.totalTarget,
            },
            {
              label: 'Tổng KPI dự kiến',
              value: data.business_standard_expected_score,
            },
          ]}
        />
        <SummaryReportBlock
          data={[
            {
              label: 'Số báo cáo đã lập trong tháng',
              value: listLogs.length + ' báo cáo',
            },
            {
              label: 'Giá trị đạt được trong tháng (12)',
              value: data.totalComplete + '/' + data.totalTarget,
            },
            {
              label: '% hoàn thành công việc',
              value:
                ((data.totalComplete / data.totalTarget) * 100).toFixed(0) +
                '%',
            },
            {
              label: 'Điểm KPI tạm tính',
              value: data.business_standard_score_tmp,
            },
          ]}
        />

        <View style={styles.commentBlock}>
          <Text style={[fs_15_700, text_red]}>
            NHẬN XÉT NHIỆM VỤ CỦA TRƯỞNG BỘ PHẬN
          </Text>
          <View style={styles.inputBox}>
            <TextInput
              style={[
                styles.inputContent,
                text_black,
                fs_15_400,
                styles.disableInput,
              ]}
              placeholderTextColor={'#787878'}
              placeholder={'Nhập nội dung'}
              multiline={true}
              editable={false}
            />
            <TextInput
              style={[
                styles.inputGrade,
                text_black,
                fs_15_400,
                styles.disableInput,
              ]}
              placeholderTextColor={'#787878'}
              placeholder={'Điểm KPI'}
              keyboardType="numeric"
              editable={false}
            />
          </View>
        </View>

        <View style={styles.commentBlock}>
          <Text style={[fs_15_700, text_red]}>
            NHẬN XÉT NHIỆM VỤ CỦA KIỂM SOÁT
          </Text>
          <View style={styles.inputBox}>
            <TextInput
              style={[
                styles.inputContent,
                text_black,
                fs_15_400,
                styles.disableInput,
              ]}
              placeholderTextColor={'#787878'}
              placeholder={'Nhập nội dung'}
              multiline={true}
              editable={false}
            />
            <TextInput
              style={[
                styles.inputGrade,
                text_black,
                fs_15_400,
                styles.disableInput,
              ]}
              placeholderTextColor={'#787878'}
              placeholder={'Điểm KPI'}
              keyboardType="numeric"
              editable={false}
            />
          </View>
        </View>

        <View style={styles.commentBlock}>
          <Text style={[fs_15_700, text_red]}>DANH SÁCH BÁO CÁO CÔNG VIỆC</Text>
          <WorkReportTable
            columns={[
              {
                title: 'Ngày báo cáo',
                key: 'date',
                width: 3 / 11,
              },
              {
                title: 'Giá trị',
                key: 'value',
                width: 2 / 11,
              },
              {
                title: 'GT nghiệm thu',
                key: 'valueDone',
                width: 3 / 11,
              },
              {
                title: 'Ngày nghiệm thu',
                key: 'dateDone',
                width: 3 / 11,
              },
            ]}
            data={listLogs.map((item: any) => {
              return {
                ...item,
                date: item.reported_date || '',
                value: item.quantity,
                dateDone: item.updated_date,
                valueDone: item.manager_quantity,
              };
            })}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 15,
    gap: 25,
  },
  commentBlock: {
    gap: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    width: '100%',
  },
  inputContent: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#787878',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  inputGrade: {
    width: '30%',
    borderWidth: 1,
    borderColor: '#787878',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  disableInput: {
    backgroundColor: '#D9D9D9',
  },
});
