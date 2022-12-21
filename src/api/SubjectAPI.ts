import {StudentType, SubjectType} from '../types/data.types';
import AxiosClient from './AxiosClient';

const SubjectAPI = {
  getListSubject() {
    return AxiosClient.get('subjects');
  },
  getASubject(id: string) {
    return AxiosClient.get(`subjects/${id}`);
  },
  postNewSubject(data: SubjectType) {
    return AxiosClient.post('subjects', data);
  },
  updateStudentEnrolled(id: string, studentList: StudentType[]) {
    return AxiosClient.patch(`subjects/${id}`, {
      students: studentList,
    });
  },
};

export default SubjectAPI;
