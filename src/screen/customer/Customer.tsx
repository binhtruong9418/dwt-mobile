import Header from '../../components/header/Header.tsx';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {fs_14_400, text_black} from '../../assets/style.ts';
import DropdownIcon from '../../assets/img/dropdown-icon.svg';
import AddIcon from '../../assets/img/add.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useMemo, useState} from 'react';
import CustomerSummary from "../../components/customer/CustomerSummary.tsx";
import CustomerItem from "../../components/customer/CustomerItem.tsx";
import dayjs from "dayjs";
import {useQuery} from "@tanstack/react-query";
import {dwtApi} from "../../api/service/dwtApi.ts";
import AdminTabBlock from "../../components/common/tab/AdminTabBlock.tsx";

export default function Customer({navigation}: any) {
    const [classify, setClassify] = useState({
        label: 'Tất cả',
        value: 0,
    });
    const [isOpenClassify, setIsOpenClassify] = useState(false);

    const [address, setAddress] = useState({
        label: 'Tất cả',
        value: 0,
    });
    const [isOpenAddressSelect, setIsOpenAddressSelect] = useState(false);

    const [process, setProcess] = useState({
        label: 'Tất cả',
        value: 0,
    });

    const [isOpenProcessSelect, setIsOpenProcessSelect] = useState(false);

    const [customerType, setCustomerType] = useState({
        label: 'Tất cả',
        value: 0,
    });
    const [isOpenCustomerTypeSelect, setIsOpenCustomerTypeSelect] = useState(false);

    const [fromDate, setFromDate] = useState(dayjs().startOf('week'));
    const [toDate, setToDate] = useState(dayjs());
    const [isOpenSelectDate, setIsOpenSelectDate] = useState(false);


    const {
        data: customerData = {},
    } = useQuery(['listCustomer'], async () => {
        const res = await dwtApi.getListCustomer();
        return res.data;
    });
    const {customer: {data: listCustomer = []} = {}} = customerData;

    return (
        <SafeAreaView style={styles.wrapper}>
            <AdminTabBlock />
            <Header
                title={'DANH SÁCH KHÁCH HÀNG'}
                handleGoBack={() => {
                    navigation.navigate('Menu');
                }}
            />
            <View>
                <CustomerSummary
                    totalCustomer={customerData?.customer?.total ?? 0}
                    totalPotential={customerData?.potential ?? 0}
                    totalCare={customerData?.takingCare ?? 0}
                    totalCooperation={customerData?.cooperating ?? 0}
                />
            </View>
            <View style={styles.content}>
                <View>
                    <ScrollView
                        horizontal={true}
                        contentContainerStyle={styles.filter_wrapper}
                        showsHorizontalScrollIndicator={false}
                    >
                        <TouchableOpacity
                            style={[styles.dropdown, {width: 120}]}
                            onPress={() => {
                                setIsOpenClassify(true);
                            }}>
                            <Text style={[text_black, fs_14_400]}>{classify.label}</Text>
                            <DropdownIcon width={20} height={20}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.dropdown, {width: 120}]}
                            onPress={() => {
                                setIsOpenAddressSelect(true);
                            }}>
                            <Text style={[text_black, fs_14_400]}>
                                {address.label}
                            </Text>
                            <DropdownIcon width={20} height={20}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.dropdown, {width: 120}]}
                            onPress={() => {
                                setIsOpenProcessSelect(true);
                            }}>
                            <Text style={[text_black, fs_14_400]}>
                                {process.label}
                            </Text>
                            <DropdownIcon width={20} height={20}/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.dropdown, {width: 120}]}
                            onPress={() => {
                                setIsOpenCustomerTypeSelect(true);
                            }}>
                            <Text style={[text_black, fs_14_400]}>
                                {customerType.label}
                            </Text>
                            <DropdownIcon width={20} height={20}/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.dropdown, {width: 200}]}
                            onPress={() => {
                                setIsOpenSelectDate(true);
                            }}>
                            <Text style={[text_black, fs_14_400]}>
                                {dayjs(fromDate).format('DD/MM/YYYY')} -{' '}
                                {dayjs(toDate).format('DD/MM/YYYY')}
                            </Text>
                            <DropdownIcon width={20} height={20}/>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <FlatList
                    data={listCustomer}
                    renderItem={({item}) => {
                        return (
                            <CustomerItem item={item} />
                        )
                    }}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={() => <View style={{height: 10}}/>}
                    contentContainerStyle={{
                        paddingVertical: 10,
                    }}
                />
            </View>
            <TouchableOpacity
                style={styles.align_end}
                onPress={() => {
                    navigation.navigate('AddCustomer');
                }}>
                <AddIcon width={32} height={32}/>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#FFF',
        position: 'relative',
    },
    content: {
        paddingTop: 10,
        borderTopColor: 'rgba(228, 229, 231, 0.57)',
        borderTopWidth: 10,
        flex: 1,
        gap: 10,
    },
    filter_wrapper: {
        gap: 10,
        paddingHorizontal: 15,
    },
    dropdown: {
        borderRadius: 5,
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.25)',
    },
    align_end: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 10,
        right: 15,
    },
});
