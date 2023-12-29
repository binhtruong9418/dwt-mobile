import Header from '../../components/header/Header.tsx';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  fs_15_400,
  fs_15_700,
  text_black,
  text_center,
  text_red,
  text_white,
} from '../../assets/style.ts';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useState} from 'react';
import ToastSuccessModal from '../../components/common/modal/ToastSuccessModal.tsx';
import PrimaryDropdown from '../../components/common/dropdown/PrimaryDropdown.tsx';

export default function AddPropose({}) {
  const [isOpenCancelReportModal, setIsOpenCancelReportModal] = useState(false);
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const [currentType, setCurrentType] = useState(1);
  const [note, setNote] = useState('');
  return (
    <SafeAreaView style={styles.wrapper}>
      <Header
        title="THÊM ĐỀ XUẤT"
        handleGoBack={() => {
          setIsOpenCancelReportModal(true);
        }}
        rightView={
          <TouchableOpacity style={styles.sendButton} onPress={() => {}}>
            <Text style={[fs_15_700, text_white, text_center]}>Gửi</Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.content}>
        <View style={[styles.inputBox]}>
          <Text style={[fs_15_700, text_black]}>
            Phân loại <Text style={text_red}>*</Text>:
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

        <View style={[styles.inputBox]}>
          <Text style={[fs_15_700, text_black]}>
            Vấn đề tồn đọng<Text style={text_red}>*</Text>:
          </Text>
          <TextInput
            style={[styles.input, text_black, fs_15_400]}
            placeholderTextColor={'#787878'}
            value={note}
            onChangeText={setNote}
          />
        </View>
      </View>
      <ToastSuccessModal
        visible={isOpenSuccessModal}
        handlePressOk={() => {}}
        description={'Thêm đề xuất thành công'}
      />
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
    paddingHorizontal: 15,
    marginTop: 20,
    gap: 20,
  },
  inputBox: {
    gap: 6,
  },
  dropdownStyle: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
});
