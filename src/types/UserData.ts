export type UserData = {
  id: string;
  roleName: string;
  role: {
    id: number;
    name: string;
  };
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  notice: boolean;
};
