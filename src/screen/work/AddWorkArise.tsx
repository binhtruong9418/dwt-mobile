import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/header/Header.tsx';
import {
  fs_15_400,
  fs_15_700,
  row_between,
  text_black,
  text_center,
  text_red,
  text_white,
} from '../../assets/style.ts';
import { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useConnection } from '../../redux/connection';
import ToastSuccessModal from '../../components/common/modal/ToastSuccessModal.tsx';
import ToastConfirmModal from '../../components/common/modal/ToastConfirmModal.tsx';
import dayjs from 'dayjs';
import DatePickerModal from '../../components/common/modal/DatePickerModal.tsx';
import { useQuery } from '@tanstack/react-query';
import { dwtApi } from '../../api/service/dwtApi.ts';
import PrimaryDropdown from '../../components/common/dropdown/PrimaryDropdown.tsx';
import PrimaryLoading from '../../components/common/loading/PrimaryLoading.tsx';
import LoadingActivity from '../../components/common/loading/LoadingActivity.tsx';
import { showToast } from '../../utils';

export default function AddWorkArise({ navigation }: any) {
  const {
    connection: { userInfo },
  } = useConnection();
  const [isOpenCancelAddWorkAriseModal, setIsOpenCancelAddWorkAriseModal] =
    useState(false);
  const [isOpenSelectFromDateModal, setOpenSelectFromDateModal] =
    useState(false);
  const [isOpenSelectToDateModal, setOpenSelectToDateModal] = useState(false);
  const [isOpenUpWorkModalSuccess, setOpenUpWorkModalSuccess] = useState(false);

  // upload field
  const [currentUnit, setCurrentUnit] = useState(0);
  const [currentType, setCurrentType] = useState(0);
  const [currentWorker, setCurrentWorker] = useState(0);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [workingHour, setWorkingHour] = useState('');
  const [quantity, setQuantity] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const { data: listUnit = [], isLoading: isLoadingListUnit } = useQuery(
    ['listUnit'],
    async () => {
      const res = await dwtApi.getListUnit();
      return res.data.data;
    }
  );

  const { data: listUserData = {}, isLoading: isLoadingListUser } = useQuery(
    ['listUser'],
    async () => {
      if (userInfo.role === 'manager') {
        return await dwtApi.getListAllUser();
      } else {
        return await dwtApi.getListUserDepartment(userInfo.department_id);
      }
    },
    {
      enabled: !!userInfo,
    }
  );

  const listUser = useMemo(() => {
    return listUserData?.data?.data || [];
  }, [listUserData]);

  const handleAddWorkArise = async () => {
    if (!name) {
      showToast('Vui lòng nhập tên nhiệm vụ');
      return;
    }

    if (currentWorker === 0) {
      showToast('Vui lòng chọn người đảm nhiệm');
      return;
    }

    if (currentUnit === 0) {
      showToast('Vui lòng chọn đơn vị tính');
      return;
    }

    if (workingHour === '' || workingHour === '0') {
      showToast('Vui lòng nhập giờ công');
      return;
    }

    if (quantity === '' || quantity === '0') {
      showToast('Vui lòng nhập số lượng');
      return;
    }

    if (currentType === 0) {
      showToast('Vui lòng chọn mục tiêu');
      return;
    }

    if (!fromDate) {
      showToast('Vui lòng chọn thời gian bắt đầu');
      return;
    }

    if (!toDate) {
      showToast('Vui lòng chọn thời gian kết thúc');
      return;
    }

    try {
      setIsLoading(true);
      const requestData = {
        name: name,
        desc: description,
        working_hours: workingHour,
        quantity: quantity,
        type: currentType,
        start_time: dayjs(fromDate).format('YYYY-MM-DD'),
        end_time: dayjs(toDate).format('YYYY-MM-DD'),
        unit_id: currentUnit,
        user_id: currentWorker,
        created_by: userInfo.id,
        updated_by: userInfo.id,
      };

      const res = await dwtApi.addWorkArise(requestData);
      if (res.status === 200) {
        setIsLoading(false);
        setOpenUpWorkModalSuccess(true);
      }
    } catch (err: any) {
      console.log(err);
      showToast(err.message);
      setIsLoading(false);
    }
  };

  const handleClearData = () => {
    setName('');
    setDescription('');
    setWorkingHour('');
    setQuantity('');
    setCurrentType(0);
    setCurrentUnit(0);
    setCurrentWorker(0);
    setFromDate(null);
    setToDate(null);
  };

  const handlePressCancel = () => {
    setIsOpenCancelAddWorkAriseModal(false);
    handleClearData();
    navigation.goBack();
  };

  const handlePressOk = () => {
    setOpenUpWorkModalSuccess(false);
    handleClearData();
    navigation.goBack();
  };

  if (isLoadingListUnit || isLoadingListUser) {
    return <PrimaryLoading />;
  }
  return (
    <SafeAreaView style={styles.wrapper}>
      <Header
        title="Việc phát sinh"
        handleGoBack={() => {
          setIsOpenCancelAddWorkAriseModal(true);
        }}
        rightView={
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleAddWorkArise}
          >
            <Text style={[fs_15_700, text_white, text_center]}>Lưu</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inputBox}>
          <Text style={[fs_15_700, text_black]}>
            Tên nhiệm vụ <Text style={text_red}>*</Text>:
          </Text>
          <TextInput
            style={[styles.input, text_black, fs_15_400]}
            placeholderTextColor={'#787878'}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={[fs_15_700, text_black]}>Mô tả/ Diễn giải:</Text>
          <TextInput
            style={[styles.input, text_black, fs_15_400]}
            placeholderTextColor={'#787878'}
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={[fs_15_700, text_black]}>
            Người đảm nhiệm <Text style={text_red}>*</Text>:
          </Text>
          <PrimaryDropdown
            data={listUser.map((user: any) => {
              return {
                label: user.name,
                value: user.id,
              };
            })}
            value={currentWorker}
            changeValue={setCurrentWorker}
            dropdownStyle={styles.dropdownStyle}
            isSearch={true}
          />
        </View>

        <View style={styles.rowBetweenGap20}>
          <View style={[styles.inputBox, styles.w_50]}>
            <Text style={[fs_15_700, text_black]}>
              ĐVT <Text style={text_red}>*</Text>:
            </Text>
            <PrimaryDropdown
              data={listUnit.map((unit: any) => {
                return {
                  label: unit.name,
                  value: unit.id,
                };
              })}
              value={currentUnit}
              changeValue={setCurrentUnit}
              dropdownStyle={styles.dropdownStyle}
              isSearch={true}
            />
          </View>

          <View style={[styles.inputBox, styles.w_50]}>
            <Text style={[fs_15_700, text_black]}>
              Giờ công <Text style={text_red}>*</Text>:
            </Text>
            <TextInput
              style={[styles.input, text_black, fs_15_400]}
              placeholderTextColor={'#787878'}
              inputMode={'numeric'}
              keyboardType={'numeric'}
              value={workingHour}
              onChangeText={setWorkingHour}
            />
          </View>
        </View>

        <View style={styles.rowBetweenGap20}>
          <View style={[styles.inputBox, styles.w_50]}>
            <Text style={[fs_15_700, text_black]}>
              Mục tiêu <Text style={text_red}>*</Text>:
            </Text>
            <PrimaryDropdown
              data={[
                {
                  label: '1 lần',
                  value: 1,
                },
                {
                  label: 'Liên tục',
                  value: 2,
                },
                {
                  label: 'Đạt giá trị',
                  value: 3,
                },
              ]}
              value={currentType}
              changeValue={setCurrentType}
              dropdownStyle={styles.dropdownStyle}
              isSearch={false}
            />
          </View>

          <View style={[styles.inputBox, styles.w_50]}>
            <Text style={[fs_15_700, text_black]}>
              Số lượng <Text style={text_red}>*</Text>:
            </Text>
            <TextInput
              style={[styles.input, text_black, fs_15_400]}
              placeholderTextColor={'#787878'}
              inputMode={'numeric'}
              keyboardType={'numeric'}
              value={quantity}
              onChangeText={setQuantity}
            />
          </View>
        </View>

        <View style={styles.inputBox}>
          <Text style={[fs_15_700, text_black]}>Chọn thời gian:</Text>
          <View style={styles.rowBetweenGap20}>
            <Pressable
              style={[row_between, styles.w_50]}
              onPress={() => {
                setOpenSelectFromDateModal(true);
              }}
            >
              <Text style={[fs_15_400, text_black]}>Từ:</Text>

              <View style={styles.boxTime}>
                <Text style={[fs_15_400, text_black]}>
                  {fromDate ? dayjs(fromDate).format('DD/MM/YYYY') : ''}
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={[row_between, styles.w_50]}
              onPress={() => {
                setOpenSelectToDateModal(true);
              }}
            >
              <Text style={[fs_15_400, text_black]}>Đến:</Text>

              <View style={styles.boxTime}>
                <Text style={[fs_15_400, text_black]}>
                  {toDate ? dayjs(toDate).format('DD/MM/YYYY') : ''}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <LoadingActivity isLoading={isLoading} />
      <ToastConfirmModal
        visible={isOpenCancelAddWorkAriseModal}
        handleCancel={handlePressCancel}
        handleOk={() => {
          setIsOpenCancelAddWorkAriseModal(false);
        }}
        description={'Bạn có muốn hủy tạo mới nhiệm vụ này?'}
        okText={'Tiếp tục tạo nhiệm vụ'}
        cancelText={'Hủy tạo mới'}
      />
      <DatePickerModal
        visible={isOpenSelectFromDateModal}
        setVisible={setOpenSelectFromDateModal}
        currentDate={fromDate}
        setCurrentDate={setFromDate}
      />
      <DatePickerModal
        visible={isOpenSelectToDateModal}
        setVisible={setOpenSelectToDateModal}
        currentDate={toDate}
        setCurrentDate={setToDate}
      />
      <ToastSuccessModal
        visible={isOpenUpWorkModalSuccess}
        handlePressOk={handlePressOk}
        description={'Thêm mới thành công'}
      />
      <LoadingActivity isLoading={isLoading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  sendButton: {
    backgroundColor: '#BC2426',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  content: {
    paddingTop: 10,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  disable: {
    backgroundColor: '#F0EEEE',
  },
  labelStyle: {
    ...fs_15_700,
    ...text_black,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  dropdownStyle: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  inputBox: {
    gap: 6,
    marginTop: 20,
  },
  buttonStyle: {
    borderRadius: 5,
    paddingVertical: 12,
  },
  listFile: {
    marginTop: 20,
    gap: 12,
  },
  rowBetweenGap20: {
    flexDirection: 'row',
    gap: 20,
  },
  fileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 10,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: '#787878',
    borderRadius: 5,
  },
  w_50: {
    flex: 0.5,
  },
  boxTime: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
    paddingVertical: 10,
    width: '70%',
    alignItems: 'center',
  },
});
