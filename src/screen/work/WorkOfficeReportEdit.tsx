import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';
import Header from '../../components/header/Header.tsx';
import {fs_15_400, fs_15_700, text_black, text_center, text_gray, text_red, text_white,} from '../../assets/style.ts';
import {useEffect, useState} from 'react';
import PrimaryCheckbox from '../../components/common/checkbox/PrimaryCheckbox.tsx';
import PrimaryButton from '../../components/common/button/PrimaryButton.tsx';
import UploadFileModal from '../../components/common/modal/UploadFileModal.tsx';
import TrashIcon from '../../assets/img/trash.svg';
import ImageIcon from '../../assets/img/image-icon.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import dayjs from 'dayjs';
import ToastConfirmModal from '../../components/common/modal/ToastConfirmModal.tsx';
import {showToast} from '../../utils';
import {useConnection} from '../../redux/connection';
import ToastSuccessModal from '../../components/common/modal/ToastSuccessModal.tsx';
import {dwtApi} from '../../api/service/dwtApi.ts';
import ErrorScreen from '../../components/common/no-data/ErrorScreen.tsx';
import LoadingActivity from '../../components/common/loading/LoadingActivity.tsx';
import {useQuery} from "@tanstack/react-query";

export default function WorkOfficeReportEdit({ route, navigation }: any) {
    const { data } = route.params;
    const {connection: {userInfo}} = useConnection();
    const [note, setNote] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [quantity, setQuantity] = useState('');
    const [isOpenUploadFileModal, setIsOpenUploadFileModal] = useState(false);
    const [files, setFiles] = useState<any[]>([]);
    const [isOpenCancelReportModal, setIsOpenCancelReportModal] = useState(false);
    const [
        isOpenConfirmUploadWorkReportModal,
        setIsOpenConfirmUploadWorkReportModal,
    ] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleUploadFile = (newFiles: any[]) => {
        setIsOpenUploadFileModal(false);
        setFiles([...files, ...newFiles]);
    };

    useEffect(() => {
        if(data) {
            setNote(data?.target_log_details ? data?.target_log_details[0]?.note : '');
            setIsCompleted(true);
            setFiles(data?.target_log_details[0]?.files ? data?.target_log_details[0]?.files.split(',') : []);
            setQuantity(data?.target_log_details[0]?.kpi_keys[0]?.pivot?.quantity.toString());
        }
    }, [data]);

    const handleDeleteFile = (fileDeleteIndex: number) => {
        if (fileDeleteIndex !== null) {
            const newFiles = files.filter((item, index) => index !== fileDeleteIndex);
            setFiles(newFiles);
        }
    };

    const {
        data: unitData
    } = useQuery(['unit', data?.kpi_keys[0]?.unit_id], () =>
        dwtApi.getUnitById(data?.kpi_keys[0]?.unit_id), {
        enabled: !!data,
    })

    const unitName = unitData?.data?.name

    const handlePressOk = () => {
        setQuantity('');
        setNote('');
        setFiles([]);
        setIsCompleted(false);
        setIsOpenConfirmUploadWorkReportModal(false);
        navigation.navigate('Work');
    };

    const handleCancelUploadReport = () => {
        setQuantity('');
        setIsCompleted(false);
        setFiles([]);
        setNote('');
        setIsOpenCancelReportModal(false);
        navigation.navigate('Work');
    };

    const handleUploadReport = async () => {
        if (!note) {
            showToast('Vui lòng nhập ghi chú');
            return;
        }

        if (isCompleted && !quantity) {
            showToast('Vui lòng nhập giá trị');
            return;
        }

        try {
            setIsLoading(true);
            let listImages = null;
            if (files.length > 0) {
                listImages = await Promise.all(
                    files.map(async (item: any) => {
                        return await dwtApi.uploadFile(item);
                    })
                );
            }

            const targetLogDetailRequest = {
                target_log_id: data.id,
                note: note,
                files: listImages ? listImages.join(',') : null,
                kpiKeys: [
                    {
                        id: data.target_log_details[0].kpi_keys[0].id,
                        quantity: quantity ? quantity : 0,
                    },
                ]
            }

            const res = await dwtApi.editOfficeTargetLogDetail(data?.target_detail_id, targetLogDetailRequest);

            if (res.status === 200) {
                setIsOpenConfirmUploadWorkReportModal(true);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!data) {
        return <ErrorScreen text={'Không có dữ liệu'} />;
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <Header
                title="BÁO CÁO CÔNG VIỆC"
                handleGoBack={() => {
                    setIsOpenCancelReportModal(true);
                }}
                rightView={
                    (userInfo?.id === data?.user?.id ? (
                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={handleUploadReport}
                    >
                        <Text style={[fs_15_700, text_white, text_center]}>Gửi</Text>
                    </TouchableOpacity>
                    ) : null)
                }
            />
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={[fs_15_700, text_black, text_center]}>
                    Ngày {dayjs(data.reportedDate).format('DD/MM/YYYY')}
                </Text>

                <View style={styles.inputBox}>
                    <Text style={[fs_15_700, text_black]}>Tên nhiệm vụ:</Text>
                    <TextInput
                        style={[styles.input, text_black, fs_15_400, styles.disable]}
                        placeholderTextColor={'#787878'}
                        placeholder={data.name}
                        editable={false}
                    />
                </View>

                <View style={styles.inputBox}>
                    <Text style={[fs_15_700, text_black]}>
                        Ghi chú <Text style={text_red}>*</Text>:
                    </Text>
                    <TextInput
                        style={[styles.input, text_black, fs_15_400,
                            userInfo?.id !== data?.user?.id && styles.disable
                        ]}
                        placeholderTextColor={'#787878'}
                        placeholder={'Ghi chú'}
                        value={note}
                        onChangeText={setNote}
                        multiline={true}
                        editable={userInfo?.id === data?.user?.id}
                    />
                </View>

                <View style={styles.inputBox}>
                    <PrimaryCheckbox
                        label={'Hoàn thành'}
                        checked={isCompleted}
                        onChange={setIsCompleted}
                        labelStyle={styles.labelStyle}
                        disabled={userInfo?.id !== data?.user?.id}
                    />
                    {isCompleted && (
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}
                        >
                            <View
                                style={[
                                    styles.row_gap10,
                                    {
                                        alignItems: 'center',
                                        width: '50%',
                                        height: 'auto',
                                    },
                                ]}
                            >
                                <TextInput
                                    style={[
                                        styles.input,
                                        text_black,
                                        fs_15_400,
                                        userInfo?.id !== data?.user?.id && styles.disable
                                    ]}
                                    placeholderTextColor={'#787878'}
                                    placeholder={'Đạt giá trị'}
                                    value={quantity}
                                    inputMode="numeric"
                                    onChangeText={(value) => setQuantity(value)}
                                    keyboardType="numeric"
                                    editable={userInfo?.id === data?.user?.id}
                                />
                                <Text style={[fs_15_400, text_gray]}>/{data?.kpi_keys[0].pivot?.quantity}</Text>
                            </View>
                            <View
                                style={[
                                    styles.input,
                                    styles.disable,
                                    {
                                        width: '50%',
                                        height: 'auto',
                                        justifyContent: 'center',
                                    },
                                ]}
                            >
                                <Text style={[fs_15_400, text_gray, text_center]}>
                                    {unitName}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>

                <View style={styles.inputBox}>
                    <View style={styles.listFile}>
                        {files.map((item, index) => (
                            <View key={index} style={styles.fileBox}>
                                <View style={styles.row_gap3}>
                                    <ImageIcon width={20} height={20} />
                                    <Text style={[fs_15_400, text_black]}>{item.name}</Text>
                                </View>
                                <TouchableOpacity
                                    hitSlop={10}
                                    onPress={() => handleDeleteFile(index)}
                                >
                                    <TrashIcon width={20} height={20} />
                                </TouchableOpacity>
                            </View>
                        ))}
                        {

                            userInfo?.id === data?.user?.id &&
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
                        }
                    </View>
                </View>
            </ScrollView>
            <UploadFileModal
                handleUploadFile={handleUploadFile}
                visible={isOpenUploadFileModal}
                setVisible={setIsOpenUploadFileModal}
            />
            <ToastConfirmModal
                visible={isOpenCancelReportModal}
                handleCancel={handleCancelUploadReport}
                handleOk={() => {
                    setIsOpenCancelReportModal(false);
                }}
                description={'Bạn thực sự muốn hủy báo cáo?'}
                okText={'Tiếp tục báo cáo'}
                cancelText={'Hủy báo cáo'}
            />
            <ToastSuccessModal
                visible={isOpenConfirmUploadWorkReportModal}
                handlePressOk={handlePressOk}
                description={'Báo cáo thành công'}
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
});
