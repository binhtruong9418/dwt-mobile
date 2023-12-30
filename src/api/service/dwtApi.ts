import axiosClient from '../config/axiosClient.ts';
import axios from 'axios';

export const dwtApi = {
  login: async (email: string, password: string): Promise<any> => {
    const url = 'auth/login';
    return await axiosClient.post(url, { email, password });
  },
  forgetPassword: async (phone: string): Promise<any> => {
    const url = 'forget-password';
    return await axiosClient.post(url, { phone });
  },
  logout: async () => {
    const url = 'auth/logout';
    return await axiosClient.post(url);
  },
  getMe: async (): Promise<any> => {
    const url = 'auth/me';
    return await axiosClient.get(url);
  },
  getUserById: async (id: number): Promise<any> => {
    const url = `users/${id}`;
    return await axiosClient.get(url);
  },

  updateUserById: async (id: number, data: any): Promise<any> => {
    const url = `users/${id}`;
    return await axiosClient.put(url, data);
  },

  //API lấy danh sách các đơn vị tính
  getListUnit: async (): Promise<any> => {
    const url = 'units';
    return await axiosClient.get(url);
  },

  //API laaysys danh sách tất cả nhân viên
  getListAllUser: async (): Promise<any> => {
    const url = 'users/all';
    return await axiosClient.get(url);
  },

  //API lấy danh sách nhân viên của văn phòng
  getListUserDepartment: async (departmentId: string): Promise<any> => {
    const url = 'users';
    return await axiosClient.get(url, {
      params: {
        department_id: departmentId,
      },
    });
  },

  //API lấy danh sách doanh nghiệp
  getListDepartment: async (): Promise<any> => {
    const url = 'departments/all';
    return await axiosClient.get(url);
  },

  //API lấy thông tin chấm công cá nhân theo ngày
  getAttendanceByDate: async (userId: string, date: string): Promise<any> => {
    const url = 'attendances/personal/search';
    return await axiosClient.get(url, {
      params: {
        user_id: userId,
        datetime: date,
      },
    });
  },

  getOfficeWork: async (params = {}): Promise<any> => {
    const url = 'mobile/office-diary';
    return await axiosClient.get(url, { params });
  },

  //API lấy thông tin Ngày công, Đã nghỉ / vắng, Dự kiến bù - tăng ca(Lấy data theo token đăng nhập)
  getAttendanceInfo: async (): Promise<any> => {
    const url = 'info-attendance/day-of-work-by-user';
    return await axiosClient.get(url);
  },

  //API Lấy SL khen, sự cố, vị phạm
  getRewardAndPunish: async (): Promise<any> => {
    const url = 'rewards-and-punishment/getTotal';
    return await axiosClient.get(url);
  },

  //API Lấy danh sách công việc, lượng điểm
  getWorkListAndPoint: async (): Promise<any> => {
    const url = 'business-standard-history/personal-mobile';
    return await axiosClient.get(url);
  },

  //API lấy danh sách công việc của cá nhân ( key, nonkey)
  getListWork: async (params = {}): Promise<any> => {
    const url = 'business-standard-history/personal';
    return await axiosClient.get(url, { params });
  },

  getWorkDetail: async (
    workId: number,
    userId: number,
    date?: string
  ): Promise<any> => {
    const url = 'business-standard-history/report-detail';
    return await axiosClient.get(url, {
      params: {
        business_standard_id: workId,
        user_id: userId,
        date: date,
      },
    });
  },

  getWorkAriseDetail: async (workId: number, date?: string): Promise<any> => {
    const url = `/business-standard-work-arise/detail/${workId}`;
    return await axiosClient.get(url, {
      params: {
        date: date,
      },
    });
  },

  getOfficeWorkDetail: async (workId: number): Promise<any> => {
    const url = '/mobile/target/details/' + workId;
    return await axiosClient.get(url);
  },

  getOfficeWorkAriseDetail: async (workId: number): Promise<any> => {
    const url = 'mobile/report-task/details/' + workId;
    return await axiosClient.get(url);
  },

  //API lấy danh sách công việc của đơn vị ( key, nonkey)
  getListWorkDepartment: async (params = {}): Promise<any> => {
    const url = 'business-standard-history/department';
    return await axiosClient.get(url, { params });
  },

  //API lấy danh sách công việc phát sinh của cá nhân
  getListWorkArise: async (params = {}): Promise<any> => {
    const url = 'business-standard-work-arise/user-report';
    return await axiosClient.get(url, { params });
  },

  //API lấy danh sách công việc phát sinh của đơn vị
  getListWorkAriseDepartment: async (params = {}): Promise<any> => {
    const url = 'business-standard-work-arise/admin-report';
    return await axiosClient.get(url, { params });
  },

  //API thêm báo cáo cá nhân(Non key, key)
  addPersonalReport: async (data: any): Promise<any> => {
    const url = 'business-standard-report-log/storev3';
    return await axiosClient.post(url, data);
  },

  addPersonalReportArise: async (data: any): Promise<any> => {
    const url = '/business-standard-work-arise/store-report';
    return await axiosClient.post(url, data);
  },

  uploadFile: async (data: any): Promise<any> => {
    const url = 'https://report.sweetsica.com/api/report/upload';
    const formData = new FormData();
    formData.append('files', data);
    const res = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data.downloadLink.replace('http://', 'https://');
  },

  getDailyReportDepartment: async (params = {}): Promise<any> => {
    const url = 'daily-report/department';
    return await axiosClient.get(url, { params });
  },

  addWorkArise: async (data: any): Promise<any> => {
    const url = 'business-standard-work-arise/store';
    return await axiosClient.post(url, data);
  },

  getSalaryHistory: async (params = {}): Promise<any> => {
    const url = 'salary-history';
    return await axiosClient.get(url, { params });
  },
  getSalaryById: async (id: number): Promise<any> => {
    const url = 'salary-history/detail/' + id;
    return await axiosClient.get(url);
  },
  getPersonalDailyReport: async (params = {}): Promise<any> => {
    const url = 'daily-report/personal';
    return await axiosClient.get(url, { params });
  },
  createPersonalDailyReport: async (data: any): Promise<any> => {
    const url = 'daily-report/store';
    return await axiosClient.post(url, data);
  },
  getDepartmentDailyReport: async (params = {}): Promise<any> => {
    const url = 'daily-report/department';
    console.log(params);
    return await axiosClient.get(url, { params });
  },

  // Cham cong
  checkInOut: async (checkIn: string, checkOut?: string) => {
    const url = 'mobile/attendance/store-check-in-out';
    return await axiosClient.post(url, {
      checkIn: checkIn,
      checkOut: checkOut,
    });
  },

  //API lấy thông tin chấm công cá nhân theo ngày
  getCheckInOutByDate: async (userId: number, date: string) => {
    const url = 'attendances/personal/search';
    return await axiosClient.get(url, {
      params: {
        user_id: userId,
        datetime: date,
      },
    });
  },

  //API lấy danh sách chấm công của người dùng theo tháng
  getAttendanceByMonth: async (date: string): Promise<any> => {
    const url = 'mobile/attendance/self';
    return await axiosClient.get(url, {
      params: {
        date: date,
      },
    });
  },
  //API lấy tổng quan chấm công theo phòng ban
  getAttendanceSummaryDepartment: async (params = {}): Promise<any> => {
    const url = 'attendances/department/search';
    return await axiosClient.get(url, { params });
  },

  //API lấy lịch sử chấm công theo phòng ban
  getAttendanceHistoryDepartment: async (params = {}): Promise<any> => {
    const url = 'attendances';
    return await axiosClient.get(url, { params });
  },

  //daily-report báo cáo ngày
  getDailyReportPersonalPerMonth: async (params = {}): Promise<any> => {
    const url = 'daily-report/personal-by-month';
    return await axiosClient.get(url, { params });
  },
  //trang home -> tab quản lý -> sub tab sản xuất:  nhật ký sản xuất ( cái này ngày xưa entity là project work logs) mà giờ đổi thành production diary
  getProductionDiaryPerMonth: async (params = {}): Promise<any> => {
    const url = 'mobile/production-diary/by-month';
    return await axiosClient.get(url, { params });
  },
  // trang home -> tab quản lý -> sub tab sản xuất bấm vào 1 cái log
  getProductionDiaryDetail: async (id: number): Promise<any> => {
    const url = `mobile/production-diary/project-work-detail/${id}`;
    return await axiosClient.get(url);
  },

  createNewPropose: async (data: any): Promise<any> => {
    const url = 'quick-reports';
    return await axiosClient.post(url, data);
  },
  getAllPropose: async (params = {}): Promise<any> => {
    const url = 'quick-reports';
    return await axiosClient.get(url, { params });
  },
};
