import {StyleSheet, Text, View} from "react-native";
import {fs_14_400, fs_14_700, text_black} from "../../assets/style.ts";

export default function CustomerItem({item}: any) {
    return (
        <View style={[styles.container, {
            backgroundColor: '#F9F2CE'
        }]}>
            <Text style={[styles.nameText]}>{item?.name}</Text>
            <Text style={[styles.description]}>Mã KH: {item?.code}</Text>
            <Text style={[styles.description]}>{item?.phone}</Text>
            <Text style={[styles.description]}>Địa chỉ: {item?.address}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    nameText: {
        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 0.5,
        ...fs_14_700,
        ...text_black,
        paddingBottom: 5,
        marginBottom: 5,
    },
    description: {
        ...fs_14_400,
        ...text_black,
        paddingLeft: 10,
    }
})