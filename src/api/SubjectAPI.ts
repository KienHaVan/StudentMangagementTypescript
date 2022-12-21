import {SubjectType} from '../types/data.types';
import AxiosClient from './AxiosClient';

const SubjectAPI = {
  getListSubject() {
    return AxiosClient.get('subjects');
  },
  postNewSubject(data: SubjectType) {
    return AxiosClient.post('subjects', data);
  },
};

export default SubjectAPI;
