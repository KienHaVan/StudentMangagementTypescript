import AxiosClient from './AxiosClient';

const SubjectAPI = {
  getListSubject() {
    return AxiosClient.get('subjects');
  },
};

export default SubjectAPI;
