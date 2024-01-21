import {Alert, Linking, StyleSheet} from 'react-native';
import HomeHeader from '../../components/home/HomeHeader.tsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from '@tanstack/react-query';
import {useConnection} from '../../redux/connection';
import {dwtApi} from '../../api/service/dwtApi.ts';
import PrimaryLoading from '../../components/common/loading/PrimaryLoading.tsx';
import dayjs from 'dayjs';
import {useRefreshOnFocus} from '../../hook/useRefeshOnFocus.ts';
import TabBlock from '../../components/home/TabBlock.tsx';
import {useEffect, useState} from 'react';
import AdminTabBlock from '../../components/common/tab/AdminTabBlock.tsx';
import UserBusiness from "../../components/home/user/UserBusiness.tsx";
import UserOffice from "../../components/home/user/UserOffice.tsx";
import UserFactory from "../../components/home/user/UserFactory.tsx";
import ManagerBusiness from "../../components/home/manager/ManagerBusiness.tsx";
import ManagerOffice from "../../components/home/manager/ManagerOffice.tsx";
import ManagerFactory from "../../components/home/manager/ManagerFactory.tsx";
import AdminBusiness from "../../components/home/admin/AdminBusiness.tsx";
import AdminOffice from "../../components/home/admin/AdminOffice.tsx";
import AdminFactory from "../../components/home/admin/AdminFactory.tsx";
import VersionCheck from "react-native-version-check";
import axios from "axios";
import ToastConfirmModal from "../../components/common/modal/ToastConfirmModal.tsx";

export default function Home({navigation}: any) {
    const {
        onSetListDepartmentGroup, connection: {userInfo, currentTabManager, listDepartmentGroup},
    } = useConnection();
    const [currentMenuTab, setCurrentMenuTab] = useState(0);
    const [isOpenUpdateVersion, setIsOpenUpdateVersion] = useState(false);
    const {
        data: {checkInTime, checkOutTime} = {},
        isLoading: isLoadingAttendanceDay,
        refetch: refetchAttendanceDay,
    } = useQuery(['getAttendanceByDate'], async () => {
        const currentDate = new Date();
        const dateDay = dayjs(currentDate).format('YYYY-MM-DD');
        try {
            const res = await dwtApi.getAttendanceByDate(userInfo.id, dateDay);
            if (res.status === 200) {
                return {
                    checkInTime: res.data.checkIn,
                    checkOutTime: res.data.checkOut,
                };
            }
        } catch {
            return {
                checkInTime: null,
                checkOutTime: null,
            };
        }
    });

    const {
        data: attendanceData,
        isLoading: isLoadingAttendance,
        refetch: refetchAttendanceData,
    } = useQuery(['getAttendanceInfo'], async () => {
        const res = await dwtApi.getAttendanceInfo();
        return res.data;
    });

    const {
        data: rewardAndPunishData,
        isLoading: isLoadingReward,
        refetch: refetchRewardAndPunish,
    } = useQuery(['getRewardAndPunish'], async () => {
        const response = await dwtApi.getRewardAndPunish();
        return response.data;
    });

    const handleUpdateVersion = async () => {
        try {
            const newLink = await axios.get('https://zombie-game.fun/api/release');
            const downloadUrl = newLink.data.data.url;
            await Linking.openURL(downloadUrl);
        } catch (err: any) {
            console.log(err);
            Alert.alert('Không thể mở liên kết');
        }
    }

    const handleCheckUpdateVersion = async () => {
        const currentVersion = VersionCheck.getCurrentVersion()
        const res = await axios.get('https://zombie-game.fun/api/release');
        const newVersion = res.data.data.version;
        if (currentVersion !== newVersion) {
            setIsOpenUpdateVersion(true);
        }
    }

    useEffect(() => {
        handleCheckUpdateVersion().then();
    }, []);

    useRefreshOnFocus(() => {
        refetchAttendanceDay();
        refetchAttendanceData();
        refetchRewardAndPunish();
    });

    if (isLoadingAttendance || isLoadingReward || isLoadingAttendanceDay) {
        return <PrimaryLoading/>;
    }

    return (
        userInfo && listDepartmentGroup && (
            <SafeAreaView style={styles.wrapper}>
                <HomeHeader navigation={navigation}/>
                <AdminTabBlock secondLabel={'Quản lý'}/>
                {userInfo?.role === 'admin' && currentTabManager === 1 && (
                    <TabBlock
                        currentTab={currentMenuTab}
                        setCurrentTab={setCurrentMenuTab}
                    />
                )}
                {currentTabManager === 0 ? (
                    listDepartmentGroup?.business.includes(userInfo.departement_id) ? (
                        <UserBusiness
                            attendanceData={attendanceData}
                            checkInTime={checkInTime}
                            checkOutTime={checkOutTime}
                            rewardAndPunishData={rewardAndPunishData}
                        />
                    ) : listDepartmentGroup?.office.includes(userInfo.departement_id) ? (
                        <UserOffice
                            attendanceData={attendanceData}
                            rewardAndPunishData={rewardAndPunishData}
                            checkInTime={checkInTime}
                            checkOutTime={checkOutTime}
                        />
                    ) : listDepartmentGroup?.mechan.includes(userInfo.departement_id) ? (
                        <UserFactory
                            navigation={navigation}
                            attendanceData={attendanceData}
                            rewardAndPunishData={rewardAndPunishData}
                            checkInTime={checkInTime}
                            checkOutTime={checkOutTime}
                        />
                    ) : null
                ) : userInfo?.role === 'admin' ? (
                    currentMenuTab === 0 ? (
                        <AdminOffice
                            attendanceData={attendanceData}
                            rewardAndPunishData={rewardAndPunishData}
                            navigation={navigation}
                        />
                    ) : currentMenuTab === 1 ? (
                        <AdminBusiness
                            attendanceData={attendanceData}
                            rewardAndPunishData={rewardAndPunishData}
                        />
                    ) : currentMenuTab === 2 ? (
                        <AdminFactory
                            attendanceData={attendanceData}
                            rewardAndPunishData={rewardAndPunishData}
                            navigation={navigation}
                        />
                    ) : null
                ) : listDepartmentGroup?.business.includes(userInfo.departement_id) ? (
                    <ManagerBusiness
                        attendanceData={attendanceData}
                        rewardAndPunishData={rewardAndPunishData}
                    />
                ) : listDepartmentGroup?.office.includes(userInfo.departement_id) ? (
                    <ManagerOffice
                        attendanceData={attendanceData}
                        rewardAndPunishData={rewardAndPunishData}
                        navigation={navigation}
                    />
                ) : listDepartmentGroup?.mechan.includes(userInfo.departement_id) ? (
                    <ManagerFactory
                        attendanceData={attendanceData}
                        rewardAndPunishData={rewardAndPunishData}
                        navigation={navigation}
                    />
                ) : null}
                <ToastConfirmModal
                    visible={isOpenUpdateVersion}
                    handleOk={handleUpdateVersion}
                    handleCancel={() => {
                        setIsOpenUpdateVersion(false)
                    }}
                    okText={'Cập nhật'}
                    cancelText={'Để sau'}
                    description={'Bạn có muốn nâng cấp phiên bản mới không?'}
                />
            </SafeAreaView>
        )
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
