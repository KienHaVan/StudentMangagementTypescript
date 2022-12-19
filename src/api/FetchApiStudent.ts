import AxiosClient from './AxiosClient';

const StudentAPI = {
  getListStudent(currentPage: number) {
    return AxiosClient.get(`students?page=${currentPage}&limit=5`);
  },
};

export default StudentAPI;
