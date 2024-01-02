import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ChevronUpIcon from "../../assets/img/chevron-up.svg";
import ChevronDownIcon from "../../assets/img/chevron-down.svg";
import {useState} from "react";
import {fs_12_400, fs_12_700, row_between, text_black, text_gray, text_red} from "../../assets/style.ts";
import {useNavigation} from "@react-navigation/native";
import dayjs from "dayjs";
import {useQuery} from "@tanstack/react-query";
import {dwtApi} from "../../api/service/dwtApi.ts";

export default function MeetingItem({item}: any) {
    const navigation = useNavigation();
    const [isMore, setIsMore] = useState<boolean>(false);
    const startTime = item?.start_time && dayjs(item?.start_time?.split(' ')[0]).format('DD/MM/YYYY')
        + ' ' + (item?.start_time?.split(' ')[1]).substring(0, 5)
    return (
        <View
            style={[styles.item]}
        >
            <View style={[styles.content, {
                backgroundColor: item?.status === 0 ? '#D4F3D5' : '#FEF3F5'
            }]}>
                <View style={styles.gap3}>
                    <Text style={[fs_12_700, text_black]}>{item?.title}</Text>
                    <Text style={[fs_12_400, text_gray]}> • Thời gian: {startTime}</Text>
                    <Text style={[fs_12_400, text_gray]}> • Phòng ban: {item?.departement?.name}</Text>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        if(item.status !== 0) {
                            setIsMore(!isMore);
                        }
                    }}
                    hitSlop={10}
                >
                    {isMore ? <ChevronUpIcon/> : <ChevronDownIcon/>}
                </TouchableOpacity>
            </View>
            {
                isMore && item?.reports?.length > 0 &&  (
                    <View style={styles.detail}>
                        <View style={styles.detailText}>
                            <Text style={[fs_12_400, text_black]}>Vấn đề tồn đọng: Chưa có catalog</Text>
                            <Text style={[fs_12_400, text_black]}>Giải quyết: Thiết kế</Text>
                            <Text style={[fs_12_400, text_black]}>Người đảm nhiệm: Nguyễn Văn A</Text>
                        </View>
                        <TouchableOpacity style={styles.detailButton} onPress={() => {
                            // @ts-ignore
                            navigation.navigate('MeetingDetail')
                        }}>
                            <Text style={[fs_12_400, text_red]}>Xem biên bản</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </View>
    )
}
const styles = StyleSheet.create({
    item: {
        shadowColor: '#rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '100%',
        borderColor: '#D9D9D9',
        borderWidth: 1,
    },
    content: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    gap3: {
        gap: 3,
    },
    detail: {
        backgroundColor: '#fff',
    },
    detailText: {
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#D9D9D9',
        paddingVertical: 10,
    },
    detailButton: {
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
})