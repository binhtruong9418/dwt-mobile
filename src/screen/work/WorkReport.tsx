import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/header/Header.tsx';
import {
  fs_14_400,
  fs_15_400,
  fs_15_700,
  text_black,
  text_center,
  text_red,
  text_white,
} from '../../assets/style.ts';
import {useState} from 'react';
import PrimaryCheckbox from '../../components/common/checkbox/PrimaryCheckbox.tsx';
import PrimaryButton from '../../components/common/button/PrimaryButton.tsx';
import UploadFileModal from '../../components/common/modal/UploadFileModal.tsx';
import TrashIcon from '../../assets/img/trash.svg';
import ImageIcon from '../../assets/img/image-icon.svg';
import DeleteFileModal from '../../components/common/modal/DeleteFileModal.tsx';
import ConfirmUploadWorkReportModal from '../../components/common/modal/ConfirmUploadWorkReportModal.tsx';

export default function WorkReport({navigation}: any) {
  const [note, setNote] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCompletedAndReport, setIsCompletedAndReport] = useState(false);
  const [kpi, setKpi] = useState('');
  const [isOpenUploadFileModal, setIsOpenUploadFileModal] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [isOpenDeleteFileModal, setIsOpenDeleteFileModal] = useState(false);
  const [fileDeleteIndex, setFileDeleteIndex] = useState<number | null>(null);
  const [
    isOpenConfirmUploadWorkReportModal,
    setIsOpenConfirmUploadWorkReportModal,
  ] = useState(false);
  const handleUploadFile = () => {
    setIsOpenUploadFileModal(false);
    setFiles([...files, `Ảnh ${files.length + 1}`]);
  };

  const handleDeleteFile = () => {
    if (fileDeleteIndex !== null) {
      const newFiles = files.filter((item, index) => index !== fileDeleteIndex);
      setFiles(newFiles);
      setIsOpenDeleteFileModal(false);
    }
  };

  const handlePressOk = () => {
    setIsOpenConfirmUploadWorkReportModal(false);
    navigation.navigate('Work');
  };
  return (
    <View style={styles.wrapper}>
      <Header
        title="BÁO CÁO CÔNG VIỆC"
        handleGoBack={() => {
          navigation.navigate('Work');
        }}
        rightView={
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => {
              setIsOpenConfirmUploadWorkReportModal(true);
            }}>
            <Text style={[fs_15_700, text_white, text_center]}>Gửi</Text>
          </TouchableOpacity>
        }
      />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[fs_15_700, text_black, text_center]}>
          Ngày 15/12/2023
        </Text>

        <View style={styles.inputBox}>
          <Text style={[fs_15_700, text_black]}>Tên nhiệm vụ:</Text>
          <TextInput
            style={[styles.input, text_black, fs_15_400, styles.disable]}
            placeholderTextColor={'#787878'}
            placeholder={'Chào giá xe'}
            editable={false}
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={[fs_15_700, text_black]}>
            Ghi chú <Text style={text_red}>*</Text>:
          </Text>
          <TextInput
            style={[styles.input, text_black, fs_15_400]}
            placeholderTextColor={'#787878'}
            placeholder={'Ghi chú'}
            value={note}
            onChangeText={setNote}
            multiline={true}
          />
        </View>

        <View style={styles.inputBox}>
          <PrimaryCheckbox
            label={'Hoàn thành'}
            checked={isCompleted}
            onChange={setIsCompleted}
            labelStyle={styles.labelStyle}
          />
          {isCompleted && (
            <TextInput
              style={[styles.input, text_black, fs_15_400]}
              placeholderTextColor={'#787878'}
              placeholder={'Đạt giá trị'}
              value={kpi}
              onChangeText={setKpi}
              keyboardType="numeric"
            />
          )}
        </View>

        <View style={styles.inputBox}>
          <PrimaryCheckbox
            label={'Hoàn thành và gửi báo cáo'}
            checked={isCompletedAndReport}
            onChange={setIsCompletedAndReport}
            labelStyle={styles.labelStyle}
          />
          <View style={styles.listFile}>
            {files.map((item, index) => (
              <View key={index} style={styles.fileBox}>
                <View style={styles.row_gap3}>
                  <ImageIcon width={20} height={20} />
                  <Text style={[fs_15_400, text_black]}>{item}</Text>
                </View>
                <TouchableOpacity
                  hitSlop={10}
                  onPress={() => {
                    setFileDeleteIndex(index);
                    setIsOpenDeleteFileModal(true);
                  }}>
                  <TrashIcon width={20} height={20} />
                </TouchableOpacity>
              </View>
            ))}
            <PrimaryButton
              textColor={'#D20019'}
              borderColor={'#DD0013'}
              bgColor={'#FFF'}
              onPress={() => {
                setIsOpenUploadFileModal(true);
              }}
              text={'+ Thêm tệp đính kèm'}
              buttonStyle={styles.buttonStyle}
            />
          </View>
        </View>
      </ScrollView>
      <UploadFileModal
        handleUploadFile={handleUploadFile}
        visible={isOpenUploadFileModal}
        setVisible={setIsOpenUploadFileModal}
      />
      <DeleteFileModal
        visible={isOpenDeleteFileModal}
        setVisible={setIsOpenDeleteFileModal}
        handleDelete={handleDeleteFile}
      />
      <ConfirmUploadWorkReportModal
        visible={isOpenConfirmUploadWorkReportModal}
        setVisible={setIsOpenConfirmUploadWorkReportModal}
        handlePressOk={handlePressOk}
      />
    </View>
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
});
