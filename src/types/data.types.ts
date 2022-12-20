export interface StudentType {
  age: number;
  avatar: string;
  createdAt: string;
  email: string;
  id: string;
  name: string;
}

export interface StudentState {
  loading: boolean;
  refreshinng: boolean;
  endList: boolean;
  StudentList: StudentType[];
}
