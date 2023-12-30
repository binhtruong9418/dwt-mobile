import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
    fs_13_400, fs_13_500,
    fs_13_700,
    text_black,
    text_center, text_white,
} from '../../assets/style.ts';
import {useNavigation} from '@react-navigation/native';

export default function WorkStorageRowDetail({data}: any) {
    const navigation = useNavigation();
    return (
        <View style={styles.wrapper}>
            <View style={styles.row}>
                <Text style={[fs_13_700, text_black, styles.title]}>Tên nhiệm vụ:</Text>
                <Text style={[fs_13_400, text_black, styles.value]}>Chào hàng xe</Text>
            </View>

            <View style={styles.row}>
                <Text style={[fs_13_700, text_black, styles.title]}>Mô tả:</Text>
                <Text style={[fs_13_400, text_black, styles.value]}>Chào hàng xe miền Bắc</Text>
            </View>

            <View style={styles.row}>
                <Text style={[fs_13_700, text_black, styles.title]}>Thời gian:</Text>
                <Text style={[fs_13_400, text_black, styles.value]}>
                    01/12/2023 - 25/12/2023
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={[fs_13_700, text_black, styles.title]}>Người đảm nhiệm:</Text>
                <Text style={[fs_13_400, text_black, styles.value]}>
                    Nguyễn Văn A
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={[fs_13_700, text_black, styles.title]}>
                    Mục tiêu:
                </Text>
                <Text style={[fs_13_400, text_black, styles.value]}>
                    Đạt giá trị
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={[fs_13_700, text_black, styles.title]}>
                    Giờ công:
                </Text>
                <Text style={[fs_13_400, text_black, styles.value]}>
                    8
                </Text>
            </View>

            <View style={styles.row}>
                <Text style={[fs_13_700, text_black, styles.title]}>
                    Chỉ tiêu:
                </Text>
                <Text style={[fs_13_400, text_black, styles.value]}>
                    2
                </Text>
            </View>


            <View style={styles.row}>
                <Text style={[fs_13_700, text_black, styles.title]}>
                    ĐVT:
                </Text>
                <Text style={[fs_13_400, text_black, styles.value]}>
                    Cuộc gọi
                </Text>
            </View>


            <View style={styles.row}>
                <Text style={[fs_13_700, text_black, styles.title]}>
                    Người giao:
                </Text>
                <Text style={[fs_13_400, text_black, styles.value]}>
                    Lê Thị B
                </Text>
            </View>

            <View style={styles.listButton}>
                <TouchableOpacity
                    style={styles.button}>
                    <Text style={[fs_13_500, text_white]}>Nhận việc</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        borderLeftColor: '#D9D9D9',
        borderLeftWidth: 1,
        borderRightColor: '#D9D9D9',
        borderRightWidth: 1,
        paddingTop: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#D9D9D9',
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 20,
    },
    title: {
        width: '40%',
    },
    value: {
        width: '60%',
    },
    listButton: {
        flexDirection: 'row',
        flex: 1,
        marginTop: 10,
        justifyContent: 'flex-end'
    },
    button: {
        backgroundColor: '#BC2426',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5 ,
        paddingVertical: 7,
        paddingHorizontal: 10,
    },
});
