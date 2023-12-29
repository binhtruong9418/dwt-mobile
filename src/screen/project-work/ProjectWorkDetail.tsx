import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AdminTabBlock from '../../components/work/AdminTabBlock.tsx';
import {useConnection} from '../../redux/connection';
import Header from '../../components/header/Header.tsx';
import {useState} from 'react';
import WorkDetailBlock from '../../components/work/WorkDetailBlock.tsx';
import {fs_15_700, text_red} from '../../assets/style.ts';
import WorkReportTable from '../../components/common/table/WorkReportTable.tsx';
import {useQuery} from "@tanstack/react-query";
import {dwtApi} from "../../api/service/dwtApi.ts";
import dayjs from "dayjs";
import LoadingActivity from "../../components/common/loading/LoadingActivity.tsx";

export default function ProjectWorkDetail({route, navigation}: any) {
  const [currentManagerTab, setCurrentManagerTab] = useState(1);
  const {
    connection: {userInfo},
  } = useConnection();
  const {data} = route.params;
  const {
    data: projectWorkDetailData = {},
    isLoading,
  } = useQuery(['dwtApi.getProductionDiaryDetail', data], ({queryKey}) => dwtApi.getProductionDiaryDetail(+queryKey[1]));
  const {data: projectWorkDetail = {}} = projectWorkDetailData;

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
        <WorkDetailBlock
          data={[
            {
              label: 'Tên kế hoạch',
              value: projectWorkDetail?.name,
            },
            {
              label: 'Mục tiêu',
              value: projectWorkDetail?.goal,
            },
            {
              label: 'Người triển khai',
              value: projectWorkDetail?.assignee?.name,
            },
            {
              label: 'Phòng ban',
              value: projectWorkDetail?.assignee?.departement?.name,
            },
            {
              label: 'Người giao việc',
              value: projectWorkDetail?.assigner?.name,
            },
            {
              label: 'Phòng ban',
              value: projectWorkDetail?.assigner?.departement?.name,
            },
            {
              label: 'Ngày bắt đầu',
              value: dayjs(projectWorkDetail?.startDate).format('DD/MM/YYYY'),
            },
            {
              label: 'Hạn hoàn thành',
              value: dayjs(projectWorkDetail?.endDate).format('DD/MM/YYYY'),
            },
          ]}
        />

        <View style={styles.commentBlock}>
          <Text style={[fs_15_700, text_red]}>DANH SÁCH BÁO CÁO CÔNG VIỆC</Text>
          <WorkReportTable
            columns={[
              {
                title: 'Ngày báo cáo',
                key: 'logDate',
                width: 3 / 11,
              },
              {
                title: 'Người BC',
                key: 'userName',
                width: 2 / 11,
              },
              {
                title: 'Nội dung GV',
                key: 'assigneeContent',
                width: 3 / 11,
              },
              {
                title: 'Nội dung BC',
                key: 'assignerContent',
                width: 3 / 11,
              },
            ]}
            data={
              projectWorkDetail.project_work_logs?.map((item: any) => {
                if(item?.type === 1) {
                  //1 meams tbp giao viec
                  return {
                    key: item.id,
                    logDate: dayjs(item?.logDate).format('DD/MM/YYYY'),
                    userName: item?.user?.name + "(GV)",
                    assigneeContent: item?.content,
                    assignerContent: "",
                  }
                }
                //2 means ntk bao cao
                return {
                  key: item.id,
                  logDate: dayjs(item?.logDate).format('DD/MM/YYYY'),
                  userName: item?.user?.name + "(TK)",
                  assignerContent: item?.content,
                  assigneeContent: "",
                }
              })
            }
          />
        </View>
      </ScrollView>
      <LoadingActivity isLoading={isLoading} />
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
