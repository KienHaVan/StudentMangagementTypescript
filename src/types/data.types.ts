export interface StudentType {
  age: number | string;
  avatar?: string;
  createdAt: string;
  email: string;
  id?: string;
  name: string;
  subjects?: (SubjectType | undefined)[];
}

export interface StudentState {
  loading: boolean;
  refreshinng: boolean;
  endList: boolean;
  StudentList: StudentType[];
  enrolledSubjects: SubjectType[];
}

export interface SubjectType {
  id?: string;
  createdAt: string;
  name: string;
  avatar: string;
  teacher: number | string;
  classroom: number | string;
  students?: StudentType[];
}

export interface SubjectState {
  refreshing: boolean;
  SubjectList: SubjectType[];
}
