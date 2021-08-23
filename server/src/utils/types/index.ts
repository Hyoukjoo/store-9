export type JwtSignPayload = {
  role: 'Master' | 'User' | 'Admin' | 'NotUser';
  id: number;
  login_id: string;
  email: string;
  name: string;
};

export type UserObj = {
  login_id: string;
  role: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone_number: string;
  birth: string;
  address: string;
  call_number: string;
};