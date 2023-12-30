import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../components/header/Header.tsx';
import DropdownIcon from '../../assets/img/dropdown-icon.svg';
import {fs_14_400, text_black, text_gray} from "../../assets/style.ts";
import {useState} from "react";
import NoSalaryIcon from "../../assets/img/absence/no-salary.svg";
import AllowIcon from "../../assets/img/absence/allow.svg";
import WorkIcon from "../../assets/img/absence/work.svg";
import {LIST_ABSENCE_TYPE, LIST_ABSENCE_TYPE_COLOR} from "../../assets/constant.ts";
import AddIcon from "../../assets/img/add.svg";
import PlusButtonModal from "../../components/work/PlusButtonModal.tsx";
import AbsenceTypeFilterModal from "../../components/common/modal/AbsenceTypeFilterModal.tsx";
import AdminTabBlock from "../../components/work/AdminTabBlock.tsx";
import {useConnection} from "../../redux/connection";
import {useQuery} from "@tanstack/react-query";
import {dwtApi} from "../../api/service/dwtApi.ts";
import {useRefreshOnFocus} from "../../hook/useRefeshOnFocus.ts";
import dayjs from "dayjs";

export default function AbsenceInfo({navigation}: any) {
    const {
        connection: {currentTabManager},
    } = useConnection();
    const [absentType, setAbsentType] = useState(LIST_ABSENCE_TYPE[0]);
    const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);

    const {
        data: listAbsenceData = [],
        isLoading: isLoadingListAbsence,
        refetch: refetchListAbsence,
    } = useQuery(['getListAbsence', absentType.value, currentTabManager], async ({queryKey}) => {
        if (queryKey[2] === 'manager' || queryKey[2] === 'admin') {
            const res = await dwtApi.getAllAbsenceManager({
                absent_type: Number(queryKey[1])
            });
            return res.data;
        } else {
            const res = await dwtApi.getAllAbsencePersonal({
                absent_type: Number(queryKey[1])
            });
            return res.data;
        }
    });

    useRefreshOnFocus(refetchListAbsence);

    return (
        <SafeAreaView style={styles.wrapper}>
            <AdminTabBlock
                secondLabel={'Quản lý'}
            />
            <Header
                title={'Nghỉ & Phép'}
                handleGoBack={() => navigation.navigate('Profile')}
            />
            <TouchableOpacity style={styles.dropdown} onPress={() => {
                setIsOpenFilterModal(true)
            }}>
                <Text style={[fs_14_400, text_black]}>{absentType.label}</Text>
                <DropdownIcon/>
            </TouchableOpacity>
            <FlatList
                contentContainerStyle={{paddingBottom: 20}}
                data={listAbsenceData.map((item: any) => {
                    return {
                        ...item,
                        type: item.absent_type,
                        date: dayjs(item.day_off).format('DD/MM/YYYY'),
                    }
                })}
                ItemSeparatorComponent={() => <View style={{height: 5}}/>}
                renderItem={({item}) => {
                    return (
                        <View style={[styles.item, {
                            backgroundColor: LIST_ABSENCE_TYPE_COLOR[item.type]
                        }]}>
                            <View style={styles.leftItem}>
                                {
                                    item.type === 1 ?
                                        <NoSalaryIcon width={30} height={30}/> :
                                        item.type === 2 ?
                                            <WorkIcon width={30} height={30}/> :
                                            item.type === 3 &&
                                            <AllowIcon width={30} height={30}/>
                                }
                            </View>
                            <View style={[styles.rightItem]}>
                                <View style={[styles.gap5, {flex: 0.4}]}>
                                    <Text style={[fs_14_400, text_gray]}>Loại nghỉ:</Text>
                                    <Text style={[fs_14_400, text_gray]}>Ngày áp dụng:</Text>
                                    <Text style={[fs_14_400, text_gray]}>Lý do nghỉ:</Text>
                                </View>
                                <View style={[styles.gap5, {flex: 0.6}]}>
                                    <Text style={[fs_14_400, text_black]}>{LIST_ABSENCE_TYPE[item.type].label}</Text>
                                    <Text style={[fs_14_400, text_black]}>{item.date}</Text>
                                    <Text style={[fs_14_400, text_black]}>{item.note}</Text>
                                </View>
                            </View>
                        </View>
                    )
                }}
            />

            <TouchableOpacity
                style={styles.align_end}
                onPress={() => {
                    navigation.navigate('AddAbsence')
                }}
            >
                <AddIcon width={32} height={32}/>
            </TouchableOpacity>
            <AbsenceTypeFilterModal
                visible={isOpenFilterModal}
                setVisible={setIsOpenFilterModal}
                setStatusValue={setAbsentType}
                statusValue={absentType}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
        position: 'relative',
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 5,
        paddingHorizontal: 7,
        gap: 10,
        paddingVertical: 7,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        marginVertical: 10
    },
    item: {
        flexDirection: 'row',
        flex: 1,
        padding: 10,
        gap: 10
    },
    leftItem: {
        flex: 0.1,
        justifyContent: 'center',
    },
    rightItem: {
        flex: 0.9,
        flexDirection: 'row'
    },
    gap5: {
        gap: 5
    },
    align_end: {
        position: 'absolute',
        bottom: 10,
        right: 15,
        zIndex: 2,
    },
});
