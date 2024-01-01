import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header/Header.tsx';
import {useState} from 'react';
import AdminTabBlock from '../../components/work/AdminTabBlock.tsx';
import {useConnection} from '../../redux/connection';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import MeetingInformation from "../../components/meeting/MeetingInformation.tsx";
import ListUserTable from "../../components/meeting/ListUserTable.tsx";
import InformationBox from "../../components/meeting/InformationBox.tsx";
import {fs_15_700, text_red} from "../../assets/style.ts";
import CircleInfoIcon from "../../assets/img/circle-info.svg";
import PrimaryTable from "../../components/common/table/PrimaryTable.tsx";

export default function MeetingDetail({navigation}: any) {
    const {
        connection: {currentTabManager},
    } = useConnection();

    return (
        <SafeAreaView style={styles.wrapper}>
            <AdminTabBlock
                secondLabel={'Quản lý'}
            />
            <Header title={'BIÊN BẢN HỌP'} handleGoBack={() => navigation.goBack()}/>
            <ScrollView contentContainerStyle={styles.content}>
                <MeetingInformation
                    data={[
                        {
                            label: 'Phòng ban',
                            value: 'Phòng kinh doanh',
                        },
                        {
                            label: 'Mã',
                            value: 'BBH.001',
                        },
                        {
                            label: 'Loại',
                            value: 'Họp nhóm',
                        },
                        {
                            label: 'Chủ đề',
                            value: 'Kế hoạch tháng 12',
                        },
                        {
                            label: 'Thời gian',
                            value: '01/12/2023 09:00 - 01/12/2023 10:00'
                        },
                        {
                            label: 'Chủ trì',
                            value: 'Nguyễn Văn A'
                        },
                        {
                            label: 'Thư ký:',
                            value: 'Nguyễn Văn B'
                        }
                    ]}
                />
                <ListUserTable
                    data={[
                        'Nguyễn Văn A',
                        'Nguyễn Văn B',
                        'Nguyễn Văn C',
                    ]}
                    headerTitle={'THÀNH VIÊN THAM GIA'}
                />

                <ListUserTable
                    data={[
                        'Nguyễn Văn A',
                        'Nguyễn Văn B',
                        'Nguyễn Văn C',
                    ]}
                    headerTitle={'THÀNH VIÊN VẮNG'}
                />
                <InformationBox
                    headerTitle={'NỘI DUNG TRAO ĐỔI'}
                    hasDot={true}
                    listText={[
                        'Nội dung 1',
                        'Nội dung 2',
                        'Nội dung 3',
                    ]}
                    textStyle={{
                        fontSize: 15,
                        color: '#000',
                    }}
                />

                <InformationBox
                    headerTitle={'FILE ĐÍNH KÈM'}
                    hasDot={true}
                    listText={[
                        'File 1',
                        'File 2',
                        'File 3',
                    ]}
                    textStyle={{
                        fontSize: 15,
                        color: '#0070FF',
                        fontStyle: 'italic',
                        textDecorationLine: 'underline',
                    }}
                />
                <View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 7,
                        marginBottom: 7,
                    }}>
                        <Text style={[fs_15_700, text_red]}>VẤN ĐỀ TỒN ĐỌNG</Text>
                        <TouchableOpacity>
                            <CircleInfoIcon/>
                        </TouchableOpacity>
                    </View>
                    <PrimaryTable
                        data={[
                            {
                                problem: 'Chưa có catalog',
                                solve: 'Thiết kế',
                                responsible: 'Nguyễn Văn A',
                                bgColor: '#FAF5D3'
                            }
                        ]}
                        columns={[
                            {
                                key: 'problem',
                                title: 'Vấn đề tồn đọng',
                                width: 1/3,
                            },
                            {
                                key: 'solve',
                                title: 'Giải quyết',
                                width: 1/3,
                            },
                            {
                                key: 'responsible',
                                title: 'Người đảm nhiệm',
                                width: 1/3,
                            },
                        ]}
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
    content: {
        paddingHorizontal: 15,
        gap: 20,
        paddingVertical: 20,
    }
});
