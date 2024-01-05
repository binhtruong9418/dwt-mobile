import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Header from '../../components/header/Header.tsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import WorkDetailBlock from '../../components/work/WorkDetailBlock.tsx';
import SummaryReportBlock from '../../components/work/SummaryReportBlock.tsx';
import {
  fs_15_400,
  fs_15_700,
  text_black,
  text_red,
} from '../../assets/style.ts';
import WorkReportTable from '../../components/common/table/WorkReportTable.tsx';
import { useConnection } from '../../redux/connection';
import { WORK_STATUS } from '../../assets/constant.ts';
import { useMemo } from 'react';
import NoDataScreen from '../../components/common/no-data/NoDataScreen.tsx';
import { useQuery } from '@tanstack/react-query';
import { dwtApi } from '../../api/service/dwtApi.ts';
import PrimaryLoading from '../../components/common/loading/PrimaryLoading.tsx';
import { useRefreshOnFocus } from '../../hook/useRefeshOnFocus.ts';
import dayjs from "dayjs";

export default function WorkDetailDepartment({ route, navigation }: any) {
  const { data, managerWorkId, date, routeGoBack } = route.params;
  const {
    connection: { userInfo },
  } = useConnection();

  console.log(managerWorkId, userInfo.id, data.isWorkArise);

  const {
    data: workDetailData = {},
    isLoading: isLoadingWorkDetail,
    refetch,
  } = useQuery(
    ['workDetailDepartment', data.id, date],
    async ({ queryKey }: any) => {
      if (data.isWorkArise) {
        const res = await dwtApi.getWorkAriseDetail(queryKey[1], queryKey[2]);
        const usernameData = await dwtApi.getUserById(res.data.user_id);
        return {
          ...res.data,
          username: usernameData.data.name,
        };
      } else {
        const res = await dwtApi.getWorkDetail(
          managerWorkId,
          userInfo.id,
          queryKey[2]
        );
        return res.data;
      }
    },
    {
      enabled: !!userInfo && !!data.id && !!userInfo.id,
    }
  );

  const workDetail = useMemo(() => {
    let listLogs = [];
    let workType = 'Đạt giá trị';
    let target = 0;
    let totalReport = 0;
    if (data.isWorkArise) {
      listLogs = workDetailData?.business_standard_arise_logs ?? [];
      workType = workDetailData?.type === 2 ? 'Đạt giá trị' : '1 lần';
      target = workDetailData?.quantity;
      totalReport = workDetailData?.total_reports;
    } else {
      listLogs = workDetailData?.business_standard_report_logs ?? [];
      workType =
        workDetailData?.type === 2
          ? 'Liên tục'
          : workDetailData?.type === 3
          ? 'Đạt giá trị'
          : '1 lần';
      target = workDetailData?.targets;
      totalReport = workDetailData?.count_report;
    }
    return {
      name: workDetailData?.name,
      desc: workDetailData?.desc,
      workType: workType,
      workerName: workDetailData?.username,
      workStatus: workDetailData?.actual_state
        ? // @ts-ignore
          WORK_STATUS[workDetailData?.actual_state.toString()]
        : WORK_STATUS['1'],
      totalWorkingHours: workDetailData?.total_working_hours,
      unitName: workDetailData?.unit_name,
      target: target,
      totalKpiExpect: workDetailData?.kpi_expected,
      totalReport: totalReport,
      totalCompletedValue: workDetailData?.achieved_value,
      totalPercent: workDetailData?.percent,
      totalTmpKpi: workDetailData?.kpi_tmp,
      listLogs: listLogs,
      adminComment: workDetailData?.admin_comment,
      adminKpi: workDetailData?.admin_kpi,
      managerComment: workDetailData?.comment,
      managerKpi: workDetailData?.kpi,
    };
  }, [workDetailData, data.isWorkArise]);

  useRefreshOnFocus(refetch);

  if (isLoadingWorkDetail) {
    return <PrimaryLoading />;
  }
  if (!data) {
    return <NoDataScreen text={'Không có dữ liệu'} />;
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <Header
        title="CHI TIẾT KẾ HOẠCH"
        handleGoBack={() => {
          navigation.navigate(routeGoBack);
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <WorkDetailBlock
          data={[
            {
              label: 'Tên nhiệm vụ',
              value: workDetail?.name,
            },
            {
              label: 'Mô tả',
              value: workDetail?.desc,
            },
            {
              label: 'Mục tiêu',
              value: workDetail?.workType,
            },
            {
              label: 'Người đảm nhiệm',
              value: workDetail?.workerName,
            },
            {
              label: 'Trạng thái',
              value: workDetail?.workStatus,
            },
            {
              label: 'Tổng thời gian tạm tính',
              value: workDetail?.totalWorkingHours + ' giờ',
            },
            {
              label: 'ĐVT',
              value: workDetail?.unitName,
            },
            {
              label: 'Chỉ tiêu',
              value: workDetail?.target,
            },
            {
              label: 'Tổng KPI dự kiến',
              value: workDetail?.totalKpiExpect,
            },
          ]}
        />
        <SummaryReportBlock
          data={[
            {
              label: 'Số báo cáo đã lập trong tháng',
              value: workDetail?.totalReport + ' báo cáo',
            },
            {
              label: 'Giá trị đạt được trong tháng (12)',
              value: workDetail?.totalCompletedValue || '',
            },
            {
              label: '% hoàn thành công việc',
              value: workDetail?.totalPercent + '%',
            },
            {
              label: 'Điểm KPI tạm tính',
              value: workDetail?.totalTmpKpi,
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
              placeholder={workDetail?.managerComment || ''}
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
              placeholder={workDetail?.managerKpi || ''}
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
              placeholder={workDetail?.adminComment || ''}
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
              placeholder={workDetail.adminKpi || ''}
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
            data={workDetail.listLogs
              .map((item: any) => {
                return {
                  ...item,
                  date: dayjs(item.reported_date).format('DD/MM/YYYY') || '',
                  value: item.quantity,
                  dateDone: item.updated_date,
                  valueDone: item.manager_quantity,
                };
              })
              .sort((a: any, b: any) => {
                return (
                  dayjs(b?.reported_date).unix() -
                  dayjs(a?.reported_date).unix()
                );
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
