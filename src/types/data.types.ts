export interface StudentType {
  age: number;
  avatar: string;
  createdAt: string;
  email: string;
  id?: string;
  name: string;
}

export interface StudentState {
  loading: boolean;
  refreshinng: boolean;
  endList: boolean;
  StudentList: StudentType[];
}

export interface SubjectType {
  id?: string;
  createdAt: string;
  name: string;
  avatar: string;
  teacher: number;
  classroom: number;
}

export interface SubjectState {
  refreshing: boolean;
  SubjectList: SubjectType[];
}
