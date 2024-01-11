import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes, { InferProps } from 'prop-types';
import { ReactNativeModal } from 'react-native-modal';
import {
  fs_14_700,
  fs_15_400,
  fs_15_700,
  text_black,
  text_center,
  text_gray,
  text_red,
} from '../../assets/style.ts';
import CloseIcon from '../../assets/img/close-icon.svg';
import { useEffect, useMemo, useState } from 'react';
import PrimaryButton from '../common/button/PrimaryButton.tsx';
import dayjs from "dayjs";
import { useQuery } from '@tanstack/react-query';
import { dwtApi } from '../../api/service/dwtApi.ts';
import PrimaryDropdown from "../common/dropdown/PrimaryDropdown.tsx";
import { useConnection } from '../../redux/connection';
import PrimaryCheckbox from "../common/checkbox/PrimaryCheckbox.tsx";

export default function CreateFactoryDailyReportModal({
  visible,
  setVisible,
  today,
  refetchListData,
}: InferProps<typeof CreateFactoryDailyReportModal.propTypes>) {
  const {
    connection: { userInfo },
  } = useConnection();
  const [note, setNote] = useState('');
  const [currentWork, setCurrentWork] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [listMechanicReport, setListMechanicReport] = useState<
    {
      type: number;
      mechanicRuleReport: number;
      mechanicQuantity: string;
      unitName: string;
      total: number;
    }[]
  >([
    {
      type: -1,
      mechanicRuleReport: 0,
      mechanicQuantity: '',
      unitName: '',
      total: 0,
    },
  ]);

  const { data: listWork = [] } = useQuery(
    ['getListWorkFactoryBySelf', today],
    async ({ queryKey }) => {
      const response = await dwtApi.getListWorkFactoryBySelf({
        date: today.format('YYYY-MM-DD'),
      });
      return response.data;
    }
  );

  const { data: { mechanicRuleReport0 = [], mechanicRuleReport1 = [] } = {} } =
    useQuery(['getMechanicRuleReport'], async () => {
      const response1 = await dwtApi.getMechanicRuleReport({
        type: 1,
      });
      const response0 = await dwtApi.getMechanicRuleReport({
        type: 0,
      });
      return {
        mechanicRuleReport0: response0.data,
        mechanicRuleReport1: response1.data,
      };
    });

  const currentGoal = useMemo(() => {
    if (!currentWork) {
      return '';
    }
    const currentWorkItem = listWork.find(
      (item: any) => item.id === Number(currentWork)
    );
    if (!currentWorkItem) {
      return '';
    }
    return currentWorkItem?.goal;
  }, [currentWork]);
  const handleSave = async () => {
    if (!currentWork) {
      return Alert.alert('Vui lòng chọn công việc');
    }
    if (!note) {
      return Alert.alert('Vui lòng nhập nội dung báo cáo');
    }

    if (isCompleted) {
      for (let i = 0; i < listMechanicReport.length; i++) {
        if (listMechanicReport[i].type === -1) {
          return Alert.alert('Vui lòng chọn loại báo cáo');
        }
        if (listMechanicReport[i].mechanicRuleReport === 0) {
          return Alert.alert('Vui lòng chọn kết quả hoàn thành');
        }
        if (listMechanicReport[i].mechanicQuantity === '') {
          return Alert.alert('Vui lòng nhập số lượng hoàn thành');
        }
      }
    }
    try {
      const mechanicReport = listMechanicReport.map((item) => {
        return {
          mechanic_rule_report_type: item.type,
          mechanic_rule_report_id: item.mechanicRuleReport,
          mechanic_report_amount: Number(item.mechanicQuantity),
        };
      });
      const response = await dwtApi.createProductionReport({
        project_work_id: currentWork,
        logDate: today.format('YYYY-MM-DD'),
        content: note,
        user_id: userInfo?.id,
        status: isCompleted ? 1 : 0,
        mechanic_reports: isCompleted ? mechanicReport : [],
      });
      if (response.status === 200) {
        Alert.alert('Báo cáo thành công');
        setNote('');
        setCurrentWork('');
        setIsCompleted(false);
        setListMechanicReport([
          {
            type: -1,
            mechanicRuleReport: 0,
            mechanicQuantity: '',
            unitName: '',
            total: 0,
          },
        ]);
        setVisible(false);
        refetchListData && (await refetchListData());
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Báo cáo thất bại');
    }
  };
  const handleClose = () => {
    setNote('');
    setCurrentWork('');
    setIsCompleted(false);
    setListMechanicReport([
      {
        type: -1,
        mechanicRuleReport: 0,
        mechanicQuantity: '',
        unitName: '',
        total: 0,
      },
    ]);
    setVisible(false);
  };

  useEffect(() => {
    if (!isCompleted) {
      setListMechanicReport([
        {
          type: -1,
          mechanicRuleReport: 0,
          mechanicQuantity: '',
          unitName: '',
          total: 0,
        },
      ]);
    }
  }, [isCompleted]);
  return (
    <ReactNativeModal
      animationInTiming={200}
      animationOutTiming={200}
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      swipeDirection={'down'}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={200}
      onSwipeComplete={handleClose}
      style={styles.wrapper}
      isVisible={visible}
      onBackdropPress={handleClose}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[fs_14_700, text_red, text_center]}>
            BÁO CÁO CÔNG VIỆC
          </Text>
          <Pressable hitSlop={10} onPress={handleClose}>
            <CloseIcon width={20} height={20} style={styles.closeIcon} />
          </Pressable>
        </View>
        <View style={styles.row_container}>
          <Text style={[fs_15_400, text_center, text_gray]}>
            Ngày {today.format('DD/MM/YYYY')}
          </Text>
          <View style={styles.inputContainer}>
            <Text style={[fs_15_700, text_black]}>Tên công việc:</Text>
            <PrimaryDropdown
              dropdownStyle={styles.input}
              data={listWork.map((item: any) => {
                return {
                  label: item.name,
                  value: item.id,
                };
              })}
              changeValue={(value) => {
                setCurrentWork(value);
              }}
              value={currentWork}
              isSearch={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={[fs_15_700, text_black]}>Mục tiêu:</Text>
            <TextInput
              style={[
                styles.input,
                styles.bgGray,
                {
                  color: '#787878',
                },
              ]}
              value={currentGoal}
              editable={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={[fs_15_700, text_black]}>
              Báo cáo<Text style={[text_red]}>*</Text>:
            </Text>
            <TextInput
              style={[styles.input]}
              onChangeText={setNote}
              value={note}
              multiline={true}
              placeholder={'Nội dung báo cáo*'}
            />
          </View>

          <View style={styles.inputContainer}>
            <PrimaryCheckbox
              label={'Hoàn thành'}
              checked={isCompleted}
              onChange={setIsCompleted}
              labelStyle={styles.labelStyle}
            />
          </View>
          {isCompleted &&
            listMechanicReport.map((item, index) => {
              return (
                <View
                  style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    gap: 5,
                    alignItems: 'center',
                  }}
                  key={index}
                >
                  <PrimaryDropdown
                    data={[
                      { value: 0, label: 'Định mức' },
                      { value: 1, label: 'Đơn giá' },
                    ]}
                    value={item.type}
                    changeValue={(value) => {
                      const newList = [...listMechanicReport];
                      newList[index].type = value;
                      setListMechanicReport(newList);
                    }}
                    dropdownStyle={{
                      ...styles.dropdownStyle,
                      width: 80,
                    }}
                    isSearch={false}
                  />
                  <PrimaryDropdown
                    data={
                      item.type === 0
                        ? mechanicRuleReport0.map((item: any) => {
                            return {
                              label: item.accessory_name,
                              value: item.id,
                            };
                          })
                        : item.type === 1
                        ? mechanicRuleReport1.map((item: any) => {
                            return {
                              label: item.accessory_name,
                              value: item.id,
                            };
                          })
                        : []
                    }
                    placeholder={'Kết quả HT'}
                    value={item.mechanicRuleReport}
                    changeValue={(value) => {
                      const newList = [...listMechanicReport];
                      newList[index].mechanicRuleReport = value;
                      newList[index].unitName =
                        newList[index].type === 0
                          ? mechanicRuleReport0.find(
                              (item: any) => item.id === value
                            )?.accessory_unit
                          : newList[index].type === 1
                          ? mechanicRuleReport1.find(
                              (item: any) => item.id === value
                            )?.accessory_unit
                          : '';
                      setListMechanicReport(newList);
                    }}
                    dropdownStyle={{
                      ...styles.dropdownStyle,
                      width: 120,
                    }}
                    isSearch={true}
                  />
                  <Text style={[fs_15_400, text_black]}>{item?.unitName}</Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        width: 45,
                        color: '#000',
                      },
                    ]}
                    value={item.mechanicQuantity}
                    onChangeText={(value) => {
                      const newList = [...listMechanicReport];
                      newList[index].mechanicQuantity = value;
                      let perAmount = 0;
                      if (item.type === 0) {
                        perAmount = mechanicRuleReport0.find(
                          (item: any) =>
                            item.id === newList[index].mechanicRuleReport
                        )?.kpi;
                      } else if (item.type === 1) {
                        perAmount = mechanicRuleReport1.find(
                          (item: any) =>
                            item.id === newList[index].mechanicRuleReport
                        )?.wage;
                      }
                      newList[index].total =
                        Number(value) * Number(perAmount ?? 0);
                      setListMechanicReport(newList);
                    }}
                    keyboardType={'numeric'}
                    inputMode={'numeric'}
                    placeholder={'SL'}
                  />
                  <Text
                    style={[
                      fs_15_400,
                      text_black,
                      {
                        width: 80,
                      },
                    ]}
                  >
                    {item.total !== 0
                      ? item.type === 0
                        ? `= ${item.total} kpi`
                        : `= ${item.total} VND`
                      : ''}
                  </Text>
                </View>
              );
            })}

          {isCompleted && (
            <TouchableOpacity
              onPress={() => {
                setListMechanicReport([
                  ...listMechanicReport,
                  {
                    type: -1,
                    mechanicRuleReport: 0,
                    mechanicQuantity: '',
                    unitName: '',
                    total: 0,
                  },
                ]);
              }}
            >
              <Text
                style={[
                  fs_15_400,
                  {
                    color: '#0070FF',
                    textAlign: 'center',
                    marginTop: 20,
                  },
                ]}
              >
                Thêm
              </Text>
            </TouchableOpacity>
          )}

          <PrimaryButton
            onPress={handleSave}
            text={'Gửi'}
            buttonStyle={styles.button}
          />
        </View>
      </View>
    </ReactNativeModal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(217, 217, 217, 0.75)',
    justifyContent: 'center',
    margin: 0,
  },
  content: {
    backgroundColor: '#FFF',
    borderRadius: 15,
  },
  header: {
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  row_container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 30,
  },
  inputContainer: {
    gap: 6,
    marginTop: 20,
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  bgGray: {
    backgroundColor: '#F0EEEE',
  },
  labelStyle: {
    ...fs_15_700,
    ...text_black,
  },

  dropdownStyle: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
});

CreateFactoryDailyReportModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  today: PropTypes.any.isRequired,
  refetchListData: PropTypes.func,
};
