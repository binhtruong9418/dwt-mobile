import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AdminTabBlock from '../../components/work/AdminTabBlock.tsx';
import {useConnection} from '../../redux/connection';
import Header from '../../components/header/Header.tsx';
import {useState} from 'react';
import WorkDetailBlock from '../../components/work/WorkDetailBlock.tsx';
import {fs_15_700, text_red} from '../../assets/style.ts';
import WorkReportTable from '../../components/common/table/WorkReportTable.tsx';

export default function ProjectWorkDetail({route, navigation}: any) {
  const [currentManagerTab, setCurrentManagerTab] = useState(0);
  const {
    connection: {userInfo},
  } = useConnection();
  const {data} = route.params;
  console.log(data, 'data');
  return (
    <SafeAreaView style={styles.wrapper}>
      {(userInfo.role === 'admin' || userInfo.role === 'manager') && (
        <AdminTabBlock
          currentTab={currentManagerTab}
          setCurrentTab={setCurrentManagerTab}
          secondLabel={'Quản lý'}
        />
      )}
      <Header
        title={'CHI TIẾT KẾ HOẠCH'}
        handleGoBack={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        {/*<WorkDetailBlock*/}
        {/*    data={[*/}
        {/*        {*/}
        {/*            label: 'Tên nhiệm vụ',*/}
        {/*            value: workDetail?.name,*/}
        {/*        },*/}
        {/*        {*/}
        {/*            label: 'Mô tả',*/}
        {/*            value: workDetail?.desc,*/}
        {/*        },*/}
        {/*        {*/}
        {/*            label: 'Mục tiêu',*/}
        {/*            value: workDetail?.workType,*/}
        {/*        },*/}
        {/*        {*/}
        {/*            label: 'Người đảm nhiệm',*/}
        {/*            value: workDetail?.workerName,*/}
        {/*        },*/}
        {/*        {*/}
        {/*            label: 'Trạng thái',*/}
        {/*            value: workDetail?.workStatus,*/}
        {/*        },*/}
        {/*        {*/}
        {/*            label: 'Tổng thời gian tạm tính',*/}
        {/*            value: workDetail?.totalWorkingHours + ' giờ',*/}
        {/*        },*/}
        {/*        {*/}
        {/*            label: 'ĐVT',*/}
        {/*            value: workDetail?.unitName,*/}
        {/*        },*/}
        {/*        {*/}
        {/*            label: 'Chỉ tiêu',*/}
        {/*            value: workDetail?.target,*/}
        {/*        },*/}
        {/*        {*/}
        {/*            label: 'Tổng KPI dự kiến',*/}
        {/*            value: workDetail?.totalKpiExpect,*/}
        {/*        },*/}
        {/*    ]}*/}
        {/*/>*/}

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
            data={
              []
              //   workDetail.listLogs.map((item: any) => {
              //   return {
              //     ...item,
              //     date: item.reported_date || '',
              //     value: item.quantity,
              //     dateDone: item.updated_date,
              //     valueDone: item.manager_quantity,
              //   };
              // })
            }
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
  commentBlock: {
    gap: 6,
  },
  content: {
    padding: 15,
    gap: 25,
  },
});
