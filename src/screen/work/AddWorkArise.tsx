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
  mt20,
  row_between,
  text_black,
  text_center,
  text_gray,
  text_red,
  text_white,
} from '../../assets/style.ts';
import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useConnection} from '../../redux/connection';
import ToastSuccessModal from '../../components/common/modal/ToastSuccessModal.tsx';
import ToastConfirmModal from '../../components/common/modal/ToastConfirmModal.tsx';

export default function AddWorkArise({route, navigation}: any) {
  const {
    connection: {userInfo},
  } = useConnection();
  const [isOpenCancelAddWorkAriseModal, setIsOpenCancelAddWorkAriseModal] =
    useState(false);

  const handleAddWorkArise = () => {};
  return (
    <SafeAreaView style={styles.wrapper}>
      <Header
        title="Thêm mới nhiệm vụ phát sinh"
        handleGoBack={() => {
          setIsOpenCancelAddWorkAriseModal(true);
        }}
        rightView={
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleAddWorkArise}>
            <Text style={[fs_15_700, text_white, text_center]}>Lưu</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.inputBox}>
          <Text style={[fs_15_700, text_black]}>
            Tên nhiệm vụ <Text style={text_red}>*</Text>:
          </Text>
          <TextInput
            style={[styles.input, text_black, fs_15_400]}
            placeholderTextColor={'#787878'}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={[fs_15_700, text_black]}>
            Mô tả/ Diễn giải <Text style={text_red}>*</Text>:
          </Text>
          <TextInput
            style={[styles.input, text_black, fs_15_400]}
            placeholderTextColor={'#787878'}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={[fs_15_700, text_black]}>
            Người đảm nhiệm <Text style={text_red}>*</Text>:
          </Text>
          <TextInput
            style={[styles.input, text_black, fs_15_400]}
            placeholderTextColor={'#787878'}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={[fs_15_700, text_black]}>
            ĐVT <Text style={text_red}>*</Text>:
          </Text>
          <TextInput
            style={[styles.input, text_black, fs_15_400]}
            placeholderTextColor={'#787878'}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={[fs_15_700, text_black]}>
            Giờ công <Text style={text_red}>*</Text>:
          </Text>
          <TextInput
            style={[styles.input, text_black, fs_15_400]}
            placeholderTextColor={'#787878'}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={[fs_15_700, text_black]}>
            Mục tiêu <Text style={text_red}>*</Text>:
          </Text>
          <TextInput
            style={[styles.input, text_black, fs_15_400]}
            placeholderTextColor={'#787878'}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={[fs_15_700, text_black]}>
            Số lượng <Text style={text_red}>*</Text>:
          </Text>
          <TextInput
            style={[styles.input, text_black, fs_15_400]}
            placeholderTextColor={'#787878'}
          />
        </View>
        <View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
            mt20,
          ]}>
          <Text style={[fs_15_700, text_black]}>Chọn thời gian:</Text>
          <View style={styles.w_60}>
            <Pressable style={[row_between]}>
              <Text style={[fs_15_400, text_black]}>Từ:</Text>
              <View style={styles.rowGap3}>
                <View style={styles.boxTime}>
                  <Text style={[fs_15_400, text_black]}>08:00</Text>
                </View>

                <View style={styles.boxTime}>
                  <Text style={[fs_15_400, text_black]}>17/12/2023</Text>
                </View>
              </View>
            </Pressable>

            <Pressable style={[row_between]}>
              <Text style={[fs_15_400, text_black]}>Đến:</Text>
              <View style={styles.rowGap3}>
                <View style={styles.boxTime}>
                  <Text style={[fs_15_400, text_black]}>08:00</Text>
                </View>

                <View style={styles.boxTime}>
                  <Text style={[fs_15_400, text_black]}>17/12/2023</Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <ToastConfirmModal
        visible={isOpenCancelAddWorkAriseModal}
        handleCancel={() => {
          setIsOpenCancelAddWorkAriseModal(false);
          navigation.navigate('Work');
        }}
        handleOk={() => {
          setIsOpenCancelAddWorkAriseModal(false);
        }}
        okText={'Tiếp tục tạo nhiệm vụ'}
        cancelText={'Hủy tạo mới'}
      />
      {/*<ToastSuccessModal*/}
      {/*  visible={isOpenConfirmUploadWorkReportModal}*/}
      {/*  handlePressOk={handlePressOk}*/}
      {/*  description={'Báo cáo thành công'}*/}
      {/*/>*/}
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
  row_gap3: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: '80%',
  },
  row_gap10: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-end',
  },
  rowGap3: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  w_60: {
    width: '60%',
    gap: 10,
  },
  boxTime: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
});
