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
import { WORK_STATUS, WORK_STATUS_OFFICE } from '../../assets/constant.ts';
import { useMemo } from 'react';
import NoDataScreen from '../../components/common/no-data/NoDataScreen.tsx';
import { useQuery } from '@tanstack/react-query';
import { dwtApi } from '../../api/service/dwtApi.ts';
import PrimaryLoading from '../../components/common/loading/PrimaryLoading.tsx';
import { useRefreshOnFocus } from '../../hook/useRefeshOnFocus.ts';
import dayjs from "dayjs";

export default function WorkDetailDepartment({ route, navigation }: any) {
  const { data } = route.params;
  const {
    connection: { userInfo },
  } = useConnection();

  const {
    data: workDetailData = {},
    isLoading: isLoadingWorkDetail,
    refetch,
  } = useQuery(
    ['workDetailOffice', data.id],
    async ({ queryKey }: any) => {
      if (data.isWorkArise) {
        const res = await dwtApi.getOfficeWorkAriseDetail(queryKey[1]);
        return res.data;
      } else {
        const res = await dwtApi.getOfficeWorkDetail(queryKey[1]);
        return res.data;
      }
    },
    {
      enabled: !!userInfo && !!data.id && !!userInfo.id,
    }
  );

  const workDetail = useMemo(() => {
    return {
      name: workDetailData?.target?.name,
      workType: workDetailData.name,
      desc: workDetailData?.target?.description,
      workerName: workDetailData?.user_name,
      startDate: workDetailData?.startDate,
      deadline: workDetailData?.deadline,
      workPerComplete: `${workDetailData?.manday} giờ (${workDetailData?.kpiTmp} KPI)`,
      criteria: workDetailData?.criteria,
      totalExpected: `${workDetailData?.criteria_required} ${workDetailData?.unit_name}`,
      totalExpectedKpi: workDetailData?.expected_kpi,
      workStatus: workDetailData.actual_state
        ? // @ts-ignore
          WORK_STATUS_OFFICE[workDetailData?.actual_state]
        : WORK_STATUS_OFFICE[1],
      totalReport: workDetailData?.count_report,
      totalCompletedValue: `${workDetailData?.keysPassed} / ${workDetailData?.criteria_required}`,
      totalWorker: workDetailData?.users ? workDetailData?.users.length : 0,
      totalTmpKpi: workDetailData?.kpiValue,
      managerComment: workDetailData?.managerComment,
      managerKpi: workDetailData?.managerManDay,
      targetLogs: workDetailData?.targetLogs?.map((item: any) => {
        return {
          ...item,
          date: item.reportedDate,
          criteria: item?.targetLogDetails[0]?.kpiKeys[0]?.name,
          quantity: item?.targetLogDetails[0]?.kpiKeys[0]?.quantity,
        };
      }),
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
          navigation.goBack();
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
              label: 'Thuộc định mức lao động',
              value: workDetail?.workType,
            },
            {
              label: 'Mô tả',
              value: workDetail?.desc,
            },
            {
              label: 'Người đảm nhiệm',
              value: workDetail?.workerName,
            },
            {
              label: 'Ngày bắt đầu',
              value: workDetail?.startDate,
            },
            {
              label: 'Thời hạn',
              value: workDetail?.deadline,
            },
            {
              label: 'Giờ công 1 lượt hoàn thành',
              value: workDetail?.workPerComplete,
            },
            {
              label: 'Tiêu chí',
              value: workDetail?.criteria,
            },
            {
              label: 'Tổng giá trị dự kiến',
              value: workDetail?.totalExpected,
            },
            {
              label: 'Tổng KPI dự kiến',
              value: workDetail?.totalExpectedKpi,
            },
            {
              label: 'Trạng thái',
              value: workDetail?.workStatus,
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
              label: `Giá trị đạt được trong tháng (${dayjs().month() + 1})`,
              value: workDetail?.totalCompletedValue || '',
            },
            {
              label: 'Số nhân sự thực hiện',
              value: workDetail?.totalWorker + ' nhân sự',
            },
            {
              label: 'Điểm KPI tạm tính',
              value: workDetail?.totalTmpKpi || '',
            },
          ]}
        />

        <View style={styles.commentBlock}>
          <Text style={[fs_15_700, text_red]}>NHẬN XÉT NHIỆM VỤ</Text>
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
            DANH SÁCH TIÊU CHÍ CÔNG VIỆC
          </Text>
          <WorkReportTable
            columns={[
              {
                title: 'Ngày báo cáo',
                key: 'date',
                width: 0.3,
              },
              {
                title: 'Tiêu chí',
                key: 'criteria',
                width: 0.5,
              },
              {
                title: 'Giá trị',
                key: 'quantity',
                width: 0.2,
              },
            ]}
            data={workDetail.targetLogs}
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
