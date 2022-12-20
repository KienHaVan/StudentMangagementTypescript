import {StudentType} from '../types/data.types';
import AxiosClient from './AxiosClient';

const StudentAPI = {
  getListStudent(currentPage: number) {
    return AxiosClient.get(`students?page=${currentPage}&limit=5`);
  },
  postNewStudent(data: StudentType) {
    return AxiosClient.post('students', data);
  },
};

export default StudentAPI;
