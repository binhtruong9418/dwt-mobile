import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {
    fs_10_400,
    fs_10_500,
    fs_12_400,
    row_between,
    text_black,
    text_center, text_gray,
    text_white
} from "../../../assets/style.ts";
import dayjs from "dayjs";

export default function FactoryReportDetail({data, navigation}: any) {
    return (
        <TouchableOpacity
            style={styles.boxContainer}
            onPress={() => {
                navigation.navigate('ProjectWorkDetail', {
                    data: data.project_work_id,
                });
            }}
        >
            <View style={row_between}>
                <View style={[styles.button,
                    {
                        backgroundColor:
                            data?.type === 1 ? '#C02626' : '#7CB8FF',
                    }]}>
                    <Text style={[fs_10_500, text_white, text_center]}>
                        {data?.type === 1 ? 'Giao việc' : 'Báo cáo'}
                    </Text>
                </View>
                <Text style={[fs_10_500, text_gray]}>{dayjs(data?.logDate).format('DD/MM/YYYY')}</Text>
            </View>
            <Text style={[fs_12_400, text_black]}>{data?.content}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    boxContainer: {
        width: '100%',
        borderRadius: 12,
        backgroundColor: '#F4F4F4',
        paddingLeft: 15,
        paddingRight: 10,
        paddingVertical: 10,
        elevation: 5,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 1,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        gap: 5,
    },
    button: {
        borderRadius: 4,
        backgroundColor: '#DD0013',
        paddingVertical: 5,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
});