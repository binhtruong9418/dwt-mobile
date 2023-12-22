import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import Header from '../../components/header/Header.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import WorkDetailBlock from '../../components/work/WorkDetailBlock.tsx';
import SummaryReportBlock from '../../components/work/SummaryReportBlock.tsx';
import {
  fs_15_400,
  fs_15_500,
  fs_15_700,
  text_black,
  text_red,
} from '../../assets/style.ts';
import WorkReportTable from '../../components/common/table/WorkReportTable.tsx';

export default function WorkDetail({navigation}: any) {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Header
        title="CHI TIẾT KẾ HOẠCH"
        handleGoBack={() => {
          navigation.navigate('Work');
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <WorkDetailBlock
          data={[
            {
              label: 'Tên nhiệm vụ',
              value: 'Nhiệm vụ 1',
            },
            {
              label: 'Mô tả',
              value: 'Xe đẩy điện',
            },
            {
              label: 'Mục tiêu',
              value: 'Liên tục',
            },
            {
              label: 'Người đảm nhiệm',
              value: 'Nguyễn Văn A',
            },
            {
              label: 'Tổng thời gian tạm tính',
              value: '5 giờ',
            },
            {
              label: 'KPI',
              value: 'KPI nhiệm vụ',
            },
          ]}
        />
        <SummaryReportBlock
          data={[
            {
              label: 'Số báo cáo đã lập trong tháng',
              value: '1 báo cáo',
            },
            {
              label: 'Giá trị đạt được trong tháng (12)',
              value: '5/10',
            },
            {
              label: '% hoàn thành công việc',
              value: '50%',
            },
            {
              label: 'Điểm KPI tạm tính',
              value: '1.75',
            },
          ]}
        />

        <View style={styles.commentBlock}>
          <Text style={[fs_15_700, text_red]}>
            NHẬN XÉT NHIỆM VỤ CỦA TRƯỞNG BỘ PHẬN
          </Text>
          <View style={styles.inputBox}>
            <TextInput
              style={[styles.inputContent, text_black, fs_15_400]}
              placeholderTextColor={'#787878'}
              placeholder={'Nhập nội dung'}
              multiline={true}
            />
            <TextInput
              style={[styles.inputGrade, text_black, fs_15_400]}
              placeholderTextColor={'#787878'}
              placeholder={'Điểm KPI'}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.commentBlock}>
          <Text style={[fs_15_700, text_red]}>
            NHẬN XÉT NHIỆM VỤ CỦA KIỂM SOÁT
          </Text>
          <View style={styles.inputBox}>
            <TextInput
              style={[styles.inputContent, text_black, fs_15_400]}
              placeholderTextColor={'#787878'}
              placeholder={'Nhập nội dung'}
              multiline={true}
            />
            <TextInput
              style={[styles.inputGrade, text_black, fs_15_400]}
              placeholderTextColor={'#787878'}
              placeholder={'Điểm KPI'}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.commentBlock}>
          <Text style={[fs_15_700, text_red]}>DANH SÁCH BÁO CÁO CÔNG VIỆC</Text>
          <WorkReportTable
            columns={[
              {
                title: 'Ngày báo cáo',
                key: 'data',
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
            data={[
              {
                data: '01/01/2021',
                value: '5',
                valueDone: '5',
                dateDone: '01/01/2021',
              },
              {
                data: '01/01/2021',
                value: '5',
                valueDone: '5',
                dateDone: '01/01/2021',
              },
              {
                data: '01/01/2021',
                value: '5',
                valueDone: '5',
                dateDone: '01/01/2021',
              },
              {
                data: '01/01/2021',
                value: '5',
                valueDone: '5',
                dateDone: '01/01/2021',
              },
              {
                data: '01/01/2021',
                value: '5',
                valueDone: '5',
                dateDone: '01/01/2021',
              },
              {
                data: '01/01/2021',
                value: '5',
                valueDone: '5',
                dateDone: '01/01/2021',
              },
              {
                data: '01/01/2021',
                value: '5',
                valueDone: '5',
                dateDone: '01/01/2021',
              },
              {
                data: '01/01/2021',
                value: '5',
                valueDone: '5',
                dateDone: '01/01/2021',
              },
            ]}
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
});
