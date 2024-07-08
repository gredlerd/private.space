export type Inputs = {
  identifier: string;
  password: string;
};

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  firstname: string;
  lastname: string;
}
