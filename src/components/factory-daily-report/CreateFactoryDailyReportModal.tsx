import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import PropTypes, {InferProps} from 'prop-types';
import {ReactNativeModal} from 'react-native-modal';
import {fs_14_700, fs_15_400, fs_15_700, text_black, text_center, text_gray, text_red} from '../../assets/style.ts';
import CloseIcon from '../../assets/img/close-icon.svg';
import {useMemo, useState} from 'react';
import PrimaryButton from '../common/button/PrimaryButton.tsx';
import dayjs from "dayjs";
import {useQuery} from "@tanstack/react-query";
import {dwtApi} from "../../api/service/dwtApi.ts";
import PrimaryDropdown from "../common/dropdown/PrimaryDropdown.tsx";
import {showToast} from "../../utils";
import {useConnection} from "../../redux/connection";

export default function CreateFactoryDailyReportModal(
    {
        visible,
        setVisible,
        today,
        refetchListData
    }: InferProps<typeof CreateFactoryDailyReportModal.propTypes>) {
    const [note, setNote] = useState('');
    const [currentWork, setCurrentWork] = useState('');

    const {
        data: listWork = []
    } = useQuery(['getListWorkFactoryBySelf', today], async ({queryKey}) => {
        const response = await dwtApi.getListWorkFactoryBySelf({
            date: today.format('YYYY-MM')
        })
        return response.data
    })

    const currentGoal = useMemo(() => {
        if(!currentWork) return ''
        const currentWorkItem = listWork.find((item: any) => item.id === currentWork)
        if(!currentWorkItem) return ''
        return currentWorkItem?.goal
    }, [currentWork])
    const handleSave = async () => {
        if(!currentWork) {
            showToast('Vui lòng chọn công việc')
            return;
        }
        if(!note) {
            showToast('Vui lòng nhập nội dung báo cáo')
            return;
        }
        try {
            const response = await dwtApi.createProductionReport({
                project_work_id: currentWork,
                logDate: today.format('YYYY-MM-DD'),
                content: note,
            })
            if(response.status === 200) {
                showToast('Báo cáo thành công')
                setVisible(false)
                refetchListData && await refetchListData()
            }
        } catch (e) {
            console.log(e)
            showToast('Báo cáo thất bại')
        }
    }
    return (
        <ReactNativeModal
            animationInTiming={200}
            animationOutTiming={200}
            animationIn={'fadeInUp'}
            animationOut={'fadeOutDown'}
            swipeDirection={'down'}
            backdropTransitionInTiming={200}
            backdropTransitionOutTiming={200}
            onSwipeComplete={() => {
                setVisible(false);
            }}
            style={styles.wrapper}
            isVisible={visible}
            onBackdropPress={() => {
                setVisible(false);
            }}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={[fs_14_700, text_red, text_center]}>BÁO CÁO CÔNG VIỆC</Text>
                    <Pressable
                        hitSlop={10}
                        onPress={() => {
                            setVisible(false);
                        }}>
                        <CloseIcon width={20} height={20} style={styles.closeIcon}/>
                    </Pressable>
                </View>
                <View style={styles.row_container}>
                    <Text style={[fs_15_400, text_center, text_gray]}>Ngày {today.format('DD/MM/YYYY')}</Text>
                    <View style={styles.inputContainer}>
                        <Text style={[fs_15_700, text_black]}>Tên công việc:</Text>
                        <PrimaryDropdown
                            dropdownStyle={styles.input}
                            data={
                                listWork.map((item: any) => {
                                    return {
                                        label: item.name,
                                        value: item.id
                                    }
                                })}
                            changeValue={(value) => {
                                setCurrentWork(value)
                            }}
                            value={currentWork}/>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={[fs_15_700, text_black]}>Mục tiêu:</Text>
                        <TextInput
                            style={[styles.input, styles.bgGray]}
                            value={currentGoal}
                            editable={false}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={[fs_15_700, text_black]}>Báo cáo<Text style={[text_red]}>*</Text>:</Text>
                        <TextInput
                            style={[styles.input]}
                            onChangeText={setNote}
                            value={note}
                            multiline={true}
                            placeholder={'Nội dung báo cáo*'}
                        />
                    </View>
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
        backgroundColor: '#F0EEEE'
    }
});

CreateFactoryDailyReportModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisible: PropTypes.func.isRequired,
    today: PropTypes.any.isRequired,
    refetchListData: PropTypes.func,
};
