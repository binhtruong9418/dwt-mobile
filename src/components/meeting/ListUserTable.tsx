import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PrimaryTable from "../common/table/PrimaryTable.tsx";
import {fs_15_700, row_between, text_red} from "../../assets/style.ts";
import ChevronUpIcon from "../../assets/img/chevron-up.svg";
import ChevronDownIcon from "../../assets/img/chevron-down.svg";
import {useState} from "react";

export default function ListUserTable({data, headerTitle}: any) {
    const [isMore, setIsMore] = useState<boolean>(true);
    return (
        <View style={styles.wrapper}>
            <View style={row_between}>
                <Text style={[fs_15_700, text_red]}>{headerTitle}</Text>
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
                isMore && data && data.length > 0 && (
                    <PrimaryTable
                        data={data.map((item: any, index: number) => {
                            return {
                                name: item,
                                index: index + 1,
                            };
                        })}
                        columns={[
                            {
                                key: 'index',
                                title: 'STT',
                                width: 0.1,
                            },
                            {
                                key: 'name',
                                title: 'Tên',
                                width: 0.9,
                            },
                        ]}
                        headerColor={'#FFF'}
                    />
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#F3F4F4',
        gap: 10,
    },
});