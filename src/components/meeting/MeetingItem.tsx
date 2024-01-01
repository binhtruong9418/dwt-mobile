import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ChevronUpIcon from "../../assets/img/chevron-up.svg";
import ChevronDownIcon from "../../assets/img/chevron-down.svg";
import {useState} from "react";
import {fs_12_400, fs_12_700, row_between, text_black, text_gray, text_red} from "../../assets/style.ts";
import {useNavigation} from "@react-navigation/native";

export default function MeetingItem({item}: any) {
    const navigation = useNavigation();
    const [isMore, setIsMore] = useState<boolean>(false);
    return (
        <View
            style={[styles.item]}
        >
            <View style={[styles.content, {
                backgroundColor: '#FEF3F5'
            }]}>
                <View style={styles.gap3}>
                    <Text style={[fs_12_700, text_black]}>Kế hoạch kinh doanh tháng 12</Text>
                    <Text style={[fs_12_400, text_gray]}> • Thời gian: 01/12/2023 08:00</Text>
                    <Text style={[fs_12_400, text_gray]}> • Phòng ban: Kinh doanh 1</Text>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        setIsMore(!isMore);
                    }}
                    hitSlop={10}
                >
                    {isMore ? <ChevronUpIcon/> : <ChevronDownIcon/>}
                </TouchableOpacity>
            </View>
            {
                isMore && (
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